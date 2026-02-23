const mongoose = require('mongoose');
const Species = require('../models/Species');
const SeasonalGuide = require('../models/SeasonalGuide');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

const speciesData = [
  {
    name: 'Ficus',
    scientific_name: 'Ficus retusa',
    description:
      'A popular indoor bonsai species known for its glossy leaves and aerial roots. Very forgiving for beginners.',
    difficulty: 'beginner',
    care: {
      watering: 'Water when the top soil feels slightly dry. Avoid overwatering.',
      fertilizing: 'Feed every two weeks during growing season with a balanced fertiliser.',
      pruning: 'Prune new growth regularly to maintain shape. Can be styled year-round indoors.',
    },
    origin: 'Tropical Asia',
    characteristics: 'Glossy oval leaves, grey bark, can develop impressive aerial roots over time.',
  },
  {
    name: 'Japanese Maple',
    scientific_name: 'Acer palmatum',
    description:
      'Prized for its stunning autumn foliage and delicate leaf shape. A rewarding species for those with some experience.',
    difficulty: 'intermediate',
    care: {
      watering: 'Keep soil evenly moist; never allow to dry out completely. Protect from hot afternoon sun.',
      fertilizing: 'Feed monthly from spring to midsummer. Stop feeding in late summer to harden new growth.',
      pruning: 'Prune in late autumn or early spring when dormant. Pinch new shoots in spring.',
    },
    origin: 'Japan, Korea, China',
    characteristics: 'Deeply lobed palmate leaves, spectacular red/orange autumn colour, fine twiggy branch structure.',
  },
  {
    name: 'Larch',
    scientific_name: 'Larix decidua',
    description:
      'A deciduous conifer that produces fresh green needles in spring and golden colour in autumn. Hardy and rewarding.',
    difficulty: 'intermediate',
    care: {
      watering: 'Water freely during the growing season. Reduce in winter but never let the roots dry out completely.',
      fertilizing: 'Feed with a balanced fertiliser from bud break until midsummer, then switch to a low-nitrogen feed.',
      pruning: 'Prune new candles in spring. Major structural pruning in winter when dormant.',
    },
    origin: 'European Alps',
    characteristics: 'Soft deciduous needles, reddish-brown bark, excellent for deadwood (jin and shari) techniques.',
  },
  {
    name: 'Scots Pine',
    scientific_name: 'Pinus sylvestris',
    description:
      'A native UK species well-suited to outdoor bonsai. Develops distinctive orange-red bark with age.',
    difficulty: 'advanced',
    care: {
      watering: 'Allow the soil to approach dryness between waterings. Excellent drainage is essential.',
      fertilizing: 'Use a low-nitrogen feed throughout the season. High nitrogen encourages overly long needles.',
      pruning: 'Candle-pinch in spring to control growth and needle length. Prune old needles in autumn.',
    },
    origin: 'Europe and Asia',
    characteristics: 'Blue-green paired needles, flaky orange-red bark on upper branches, rugged natural appearance.',
  },
  {
    name: 'Juniper',
    scientific_name: 'Juniperus chinensis',
    description:
      'One of the most iconic bonsai species. Responds well to wiring and is very suitable for dramatic deadwood styling.',
    difficulty: 'intermediate',
    care: {
      watering: 'Water thoroughly then allow the soil to partially dry. Never leave sitting in water.',
      fertilizing: 'Feed fortnightly during the growing season. Reduce in late summer.',
      pruning: 'Pinch out new growth tips throughout the growing season. Avoid cutting into bare wood.',
    },
    origin: 'China, Japan',
    characteristics: 'Scale-like or needle-like foliage, reddish-brown shredding bark, excellent for jin and shari.',
  },
  {
    name: 'Trident Maple',
    scientific_name: 'Acer buergerianum',
    description:
      'A vigorous maple species that develops excellent taper and surface roots (nebari) quickly. Great for shohin.',
    difficulty: 'intermediate',
    care: {
      watering: 'Water generously during the growing season. Reduce in winter.',
      fertilizing: 'Feed with a balanced fertiliser in spring and early summer. Low-nitrogen in late summer.',
      pruning: 'Hard prune in late winter. Pinch new shoots throughout spring and summer to build ramification.',
    },
    origin: 'China, Japan, Korea',
    characteristics: 'Three-lobed leaves, attractive flaking bark on mature specimens, good autumn colour.',
  },
  {
    name: 'English Elm',
    scientific_name: 'Ulmus procera',
    description:
      'A classic British native species with small leaves and superb natural branch structure. Very hardy outdoors.',
    difficulty: 'beginner',
    care: {
      watering: 'Keep evenly moist during the growing season. Drought-tolerant once established.',
      fertilizing: 'Feed fortnightly from spring to midsummer.',
      pruning: 'Allow shoots to extend 4–6 leaves then prune back to 1–2. Prune hard every few years to maintain scale.',
    },
    origin: 'England',
    characteristics: 'Small serrated oval leaves, rough grey-brown bark, produces very fine twig structure over time.',
  },
  {
    name: 'Hawthorn',
    scientific_name: 'Crataegus monogyna',
    description:
      'A native British species beloved for spring blossom and autumn berries. Develops beautiful deadwood naturally.',
    difficulty: 'beginner',
    care: {
      watering: 'Water regularly during growing season. Tolerates brief dry spells better than most species.',
      fertilizing: 'Feed monthly during the growing season.',
      pruning: 'Prune after flowering in early summer. Can be trimmed throughout the season.',
    },
    origin: 'Europe, North Africa, West Asia',
    characteristics: 'White spring blossom, red autumn berries, thorny branches, naturally twisted old trunks.',
  },
  {
    name: 'Beech',
    scientific_name: 'Fagus sylvatica',
    description:
      'A majestic native species that retains its russet leaves through winter. Slow to develop but worth the patience.',
    difficulty: 'advanced',
    care: {
      watering: 'Keep evenly moist at all times. Never allow to dry out completely.',
      fertilizing: 'Feed lightly from spring to midsummer. Avoid overfeeding which leads to large leaves.',
      pruning: 'Prune in late winter before bud break. Pinch new shoots throughout spring.',
    },
    origin: 'Europe',
    characteristics: 'Smooth silver-grey bark, oval toothed leaves, copper-brown leaves persist through winter.',
  },
  {
    name: 'English Oak',
    scientific_name: 'Quercus robur',
    description:
      'Britain\'s most iconic tree, making an impressive bonsai with characterful lobed leaves and rugged bark.',
    difficulty: 'advanced',
    care: {
      watering: 'Water freely during the growing season. Established trees tolerate some drought.',
      fertilizing: 'Feed from spring until midsummer. Use low-nitrogen in late summer.',
      pruning: 'Prune hard in late winter. Cut back to 1–2 leaves once shoots have extended. Defoliate in midsummer to reduce leaf size.',
    },
    origin: 'Europe, Western Asia',
    characteristics: 'Distinctive lobed leaves, deeply furrowed rugged bark, acorns on mature trees.',
  },
];

const seasonalGuidesData = [
  {
    season: 'spring',
    title: 'Spring Care Guide',
    description:
      'Spring is the most exciting time for bonsai enthusiasts. Trees wake from dormancy and new growth begins. This is the prime time for repotting, wiring, and styling.',
    tips: [
      'Repot trees before buds open fully — this is the optimal time for root work.',
      'Begin feeding as soon as you see new growth starting.',
      'Check trees daily; growth can be rapid and pinching must be timely.',
      'Re-introduce trees to outdoor positions gradually after winter protection.',
      'Watch for aphids and other early-season pests on new growth.',
      'Wire deciduous trees before leaves open to see the branch structure clearly.',
      'Protect newly repotted trees from hard frosts which can still occur in March and April.',
    ],
    monthlyChecklist: [
      {
        month: 'March',
        tasks: [
          'Repot maples, elms, and other deciduous species before buds swell.',
          'Begin watering more frequently as temperatures rise.',
          'Check winter-stored trees for mould or pest damage.',
          'Start feeding with a high-nitrogen fertiliser to boost growth.',
          'Check wires applied last year for signs of biting in.',
        ],
      },
      {
        month: 'April',
        tasks: [
          'Pinch maple buds to the first pair of leaves.',
          'Re-pot conifers if needed before new candles extend.',
          'Begin pest prevention treatment.',
          'Wire deciduous trees before leaves fully open.',
          'Move indoor trees back outside once night frosts have passed.',
        ],
      },
      {
        month: 'May',
        tasks: [
          'Pinch pine candles — remove up to two-thirds of new growth.',
          'Prune back strong growth on maples and elms to maintain shape.',
          'Continue regular feeding — every 2 weeks with balanced fertiliser.',
          'Check for vine weevil grubs when repotting.',
          'Enjoy spring blossom on hawthorn and crab apple species.',
        ],
      },
    ],
  },
  {
    season: 'summer',
    title: 'Summer Care Guide',
    description:
      'Summer demands vigilance with watering, especially during hot spells. Feeding continues, and it is a great time to wire conifers and work on styling.',
    tips: [
      'Water daily — or even twice daily — during hot, dry weather.',
      'Never let a bonsai sit in direct midday sun on very hot days; provide afternoon shade.',
      'Continue feeding every two weeks with a balanced fertiliser until midsummer.',
      'Switch to a low-nitrogen, high-potassium feed from late July onwards.',
      'Defoliate maples and elms in June to encourage smaller leaves and finer ramification.',
      'Wire conifers in summer when the sap is rising and branches are more flexible.',
      'Watch for red spider mite in hot dry conditions.',
    ],
    monthlyChecklist: [
      {
        month: 'June',
        tasks: [
          'Defoliate Japanese and trident maples if desired for leaf reduction.',
          'Continue pinching new growth on all species to maintain shape.',
          'Increase watering frequency during warm spells.',
          'Apply a summer pest treatment if spider mite or aphids are present.',
          'Begin reducing nitrogen levels in fertiliser.',
        ],
      },
      {
        month: 'July',
        tasks: [
          'Water twice daily if temperatures exceed 25°C.',
          'Switch to low-nitrogen fertiliser to harden new growth.',
          'Wire conifers — junipers, pines, and larches respond well now.',
          'Protect trees from drought stress; check soil moisture morning and evening.',
          'Remove any badly placed new shoots that have hardened off.',
        ],
      },
      {
        month: 'August',
        tasks: [
          'Continue low-nitrogen feeding.',
          'Watch for signs of heat stress — wilting, yellowing leaves.',
          'Avoid heavy pruning in high summer heat.',
          'Plan any autumn repotting for early September.',
          'Check wires carefully as growth slows but wire biting can still occur.',
        ],
      },
    ],
  },
  {
    season: 'autumn',
    title: 'Autumn Care Guide',
    description:
      'Autumn brings spectacular foliage colour and marks the transition to dormancy. Reduce feeding, prepare trees for winter, and enjoy the seasonal display.',
    tips: [
      'Stop feeding deciduous trees once leaves begin to turn colour.',
      'Continue feeding conifers lightly until temperatures drop consistently below 10°C.',
      'Repot autumn-repotting species (oaks, beeches) before the ground freezes.',
      'Begin preparing winter protection — cold frames, unheated greenhouses.',
      'Remove fallen leaves from pots to prevent fungal issues.',
      'This is a great time to assess branch structure on deciduous trees as leaves drop.',
      'Reduce watering gradually as temperatures fall and growth slows.',
    ],
    monthlyChecklist: [
      {
        month: 'September',
        tasks: [
          'Repot oaks and beeches in early September.',
          'Remove any wires that are beginning to bite in.',
          'Begin reducing watering frequency.',
          'Apply a final balanced feed to conifers.',
          'Enjoy and photograph autumn colour on maples and larches.',
        ],
      },
      {
        month: 'October',
        tasks: [
          'Stop feeding deciduous species.',
          'Move tender species (figs, olives) to frost-free protection before first frost.',
          'Clean up fallen leaves from pots and benches.',
          'Check for and treat vine weevil in the soil.',
          'Review tree positions — ensure all get adequate light before winter.',
        ],
      },
      {
        month: 'November',
        tasks: [
          'Move cold-hardy species to a cold frame or unheated greenhouse once fully dormant.',
          'Water sparingly — only if the soil is completely dry.',
          'Check trees for signs of fungal disease and treat if necessary.',
          'Document the year\'s progress with photos before leaves fully drop.',
          'Begin planning any major structural work for late winter.',
        ],
      },
    ],
  },
  {
    season: 'winter',
    title: 'Winter Care Guide',
    description:
      'Winter is a time for rest — both for the trees and the bonsai keeper. Protect trees from hard frosts, water sparingly, and use the quiet months to sharpen tools and study design.',
    tips: [
      'Most hardy species need protection from temperatures below -5°C.',
      'Never let tree roots freeze solid — frozen roots cannot take up water when the top thaws.',
      'Water only when the soil is dry and temperatures are above freezing.',
      'An unheated but frost-free greenhouse or cold frame is ideal for most hardy species.',
      'Tender indoor species should be kept at 10–15°C minimum — avoid central heating draughts.',
      'Now is the time to sharpen and sterilise tools ready for spring.',
      'Study your trees\' structure — winter silhouette reveals strengths and areas for improvement.',
    ],
    monthlyChecklist: [
      {
        month: 'December',
        tasks: [
          'Ensure all trees are in their winter protection positions.',
          'Water indoor trees every 1–2 weeks; check soil before watering.',
          'Clean and sharpen all tools.',
          'Check cold frames are secure and not leaking heat excessively.',
          'Review the year and plan for the coming spring.',
        ],
      },
      {
        month: 'January',
        tasks: [
          'Check trees regularly for signs of pest activity under protection.',
          'Do not be tempted to start work too early — wait for signs of new growth.',
          'Order any new pots, soil, or tools needed for the spring.',
          'On mild days (above 5°C), check soil moisture and water if dry.',
          'Study bonsai books and videos to inspire spring styling plans.',
        ],
      },
      {
        month: 'February',
        tasks: [
          'Watch for the first signs of bud movement on early species.',
          'Prepare bonsai soil and pots for the repotting season.',
          'On warm days, bring trees into better light to encourage bud break.',
          'Begin feeding indoor species with a diluted balanced fertiliser.',
          'Prune deciduous trees for structure before buds open — late February is ideal.',
        ],
      },
    ],
  },
];

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/watashi-bonsai';

    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB for seeding');
    }

    // Seed species
    const speciesCount = await Species.countDocuments();
    if (speciesCount === 0) {
      await Species.insertMany(speciesData);
      console.log(`Seeded ${speciesData.length} species`);
    } else {
      console.log('Species already seeded — skipping');
    }

    // Seed seasonal guides
    const guidesCount = await SeasonalGuide.countDocuments();
    if (guidesCount === 0) {
      await SeasonalGuide.insertMany(seasonalGuidesData);
      console.log(`Seeded ${seasonalGuidesData.length} seasonal guides`);
    } else {
      console.log('Seasonal guides already seeded — skipping');
    }

    // Seed demo user and portfolio
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const demoUser = await User.create({
        username: 'demo',
        email: 'demo@watashi-bonsai.co.uk',
        password: 'Demo1234!',
      });
      console.log('Seeded demo user (demo@watashi-bonsai.co.uk / Demo1234!)');

      await Portfolio.insertMany([
        {
          user: demoUser._id,
          name: 'My First Ficus',
          species: 'Ficus retusa',
          notes:
            'Purchased from a local garden centre in March 2023. Working on building the trunk base and developing aerial roots.',
          tags: ['indoor', 'tropical', 'beginner'],
          location: { placeName: 'London, UK' },
        },
        {
          user: demoUser._id,
          name: 'Mountain Larch',
          species: 'Larix decidua',
          notes:
            'Collected yamadori from the Scottish Highlands in 2021. Spectacular autumn colour. Currently in recovery pot.',
          tags: ['outdoor', 'deciduous', 'yamadori', 'scotland'],
          location: { placeName: 'Edinburgh, UK' },
        },
      ]);
      console.log('Seeded 2 demo portfolio entries');
    } else {
      console.log('Users already seeded — skipping');
    }

    console.log('Database seeding complete');
  } catch (err) {
    console.error('Seeding error:', err);
    throw err;
  }
}

module.exports = { seedDatabase };
