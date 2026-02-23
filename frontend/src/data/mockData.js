// Fallback mock data used when the backend API is unreachable

export const MOCK_SPECIES = [
  {
    id: '1',
    name: 'Ficus',
    scientific_name: 'Ficus retusa',
    difficulty: 'Beginner',
    origin: 'Southeast Asia',
    description:
      'Ficus bonsai are popular beginner trees. They tolerate low humidity, inconsistent watering, and indoor conditions better than most species.',
    care: {
      watering: 'Water thoroughly when the topsoil feels slightly dry. Avoid letting it dry out completely. Ficus prefer consistent moisture but not waterlogging.',
      fertilizing: 'Feed every two weeks during spring and summer with a balanced fertiliser. Reduce to monthly in autumn and winter.',
      pruning: 'Prune new growth regularly to maintain shape. Ficus back-bud well; hard pruning in spring encourages dense foliage.',
    },
  },
  {
    id: '2',
    name: 'Japanese Maple',
    scientific_name: 'Acer palmatum',
    difficulty: 'Intermediate',
    origin: 'Japan, Korea, China',
    description:
      'Prized for their stunning autumn colour and delicate leaf shape. Japanese Maples prefer outdoor conditions and a cool winter dormancy.',
    care: {
      watering: 'Keep soil consistently moist, especially in summer. Never let roots dry out completely. Protect from drying winds.',
      fertilizing: 'Apply a nitrogen-rich fertiliser in spring, balanced in summer, and low-nitrogen in autumn to harden growth.',
      pruning: 'Prune after leaf-drop in autumn or before buds open in early spring. Clip back to two leaves throughout the growing season.',
    },
  },
  {
    id: '3',
    name: 'Larch',
    scientific_name: 'Larix decidua',
    difficulty: 'Intermediate',
    origin: 'Europe, Siberia',
    description:
      'One of the few deciduous conifers, larch bonsai offer soft spring needles, elegant summer foliage, and warm autumn yellows before going dormant.',
    care: {
      watering: 'Water freely during the growing season. Larch dislike waterlogging. Reduce watering in winter dormancy but never let roots freeze solid.',
      fertilizing: 'Feed with a balanced fertiliser every two weeks from early spring through midsummer; reduce nitrogen as autumn approaches.',
      pruning: 'Pinch new candles in spring to encourage ramification. Structural pruning is best done in winter when the tree is bare.',
    },
  },
  {
    id: '4',
    name: 'Pine',
    scientific_name: 'Pinus thunbergii',
    difficulty: 'Advanced',
    origin: 'Japan, Korea',
    description:
      'Japanese Black Pine is the king of bonsai. Its vigorous growth and dramatic nebari make it highly sought after, though it demands skilled technique.',
    care: {
      watering: 'Allow the soil to partially dry between waterings. Good drainage is critical; pines hate wet feet.',
      fertilizing: 'Heavy feeding encourages vigorous growth. Use high-nitrogen fertiliser from spring through midsummer, then switch to low-nitrogen.',
      pruning: 'Candle pinching and needle pulling are key techniques. Decandling in early summer is used to balance growth and reduce needle size.',
    },
  },
  {
    id: '5',
    name: 'Juniper',
    scientific_name: 'Juniperus chinensis',
    difficulty: 'Beginner',
    origin: 'China, Japan',
    description:
      'Junipers are among the most popular bonsai in the world. Hardy outdoors and tolerant of shaping, they suit beginners and experts alike.',
    care: {
      watering: 'Water when the topsoil begins to dry. Junipers prefer slightly drier conditions than broad-leaved trees. Full sun encourages dense foliage.',
      fertilizing: 'Feed every two to four weeks during the growing season with a balanced fertiliser.',
      pruning: 'Pinch or cut growing tips throughout summer to maintain pads. Avoid removing all foliage from any branch. Wire in autumn when flexible.',
    },
  },
  {
    id: '6',
    name: 'Trident Maple',
    scientific_name: 'Acer buergerianum',
    difficulty: 'Intermediate',
    origin: 'China, Japan',
    description:
      'Trident Maple develops spectacular taper and nebari quickly, making it a favourite for bonsai development. Rich autumn colours are a highlight.',
    care: {
      watering: 'Keep soil consistently moist in summer. Trident Maple is more drought-tolerant than Japanese Maple but still requires regular watering.',
      fertilizing: 'Strong feeder — fertilise weekly in spring and early summer, fortnightly later. Reduce nitrogen in autumn to ripen growth.',
      pruning: 'Clip back to one or two leaves throughout the growing season. Cut back hard in late winter before bud burst to develop fine ramification.',
    },
  },
  {
    id: '7',
    name: 'Elm',
    scientific_name: 'Ulmus parvifolia',
    difficulty: 'Beginner',
    origin: 'China, Japan, Korea',
    description:
      'Chinese Elm is one of the best species for beginners. It produces fine twigs, small leaves, and attractive bark with minimal fuss.',
    care: {
      watering: 'Water when the topsoil is barely dry. Elms are adaptable but prefer regular moisture in summer and reduced water in winter.',
      fertilizing: 'Feed every two weeks in the growing season. Chinese Elm responds well to fertiliser and produces vigorous growth.',
      pruning: 'Allow shoots to extend to three or four leaves, then cut back to one. Regular clipping builds a fine network of branches.',
    },
  },
  {
    id: '8',
    name: 'Hawthorn',
    scientific_name: 'Crataegus monogyna',
    difficulty: 'Intermediate',
    origin: 'Europe, North Africa',
    description:
      'Native to the UK, hawthorn bonsai offer spring blossom, berries in autumn, and naturally gnarled trunks ideal for aged-looking designs.',
    care: {
      watering: 'Water generously in spring and summer. Hawthorn can tolerate brief dry spells but performs best with consistent moisture.',
      fertilizing: 'Fertilise every two to three weeks from spring through summer. Too much nitrogen can encourage excessively long shoots.',
      pruning: 'Prune after flowering. Allow extension then cut back to maintain shape. Hawthorn back-buds readily from old wood.',
    },
  },
  {
    id: '9',
    name: 'Beech',
    scientific_name: 'Fagus sylvatica',
    difficulty: 'Advanced',
    origin: 'Europe',
    description:
      'European Beech bonsai display classic northern-European character with smooth grey bark and rich autumn foliage. They require patience and skill.',
    care: {
      watering: 'Keep roots evenly moist throughout the growing season. Beech is sensitive to drought; dry roots in summer can cause early leaf drop.',
      fertilizing: 'Use a balanced fertiliser fortnightly from spring through summer. Avoid high-nitrogen feeds in late summer to harden growth.',
      pruning: 'Clip new growth to one or two leaves throughout summer. Structural work is best in late winter before buds swell.',
    },
  },
  {
    id: '10',
    name: 'Oak',
    scientific_name: 'Quercus robur',
    difficulty: 'Advanced',
    origin: 'Europe, UK',
    description:
      'English Oak bonsai embody a sense of ancient strength. Slow-growing but long-lived, they develop impressive bark texture and powerful nebari.',
    care: {
      watering: 'Water well in summer; oak roots are drought sensitive. Reduce watering in autumn once leaves begin to change.',
      fertilizing: 'Feed moderately with a balanced fertiliser every two to three weeks in the growing season. Avoid over-feeding in summer.',
      pruning: 'Cut back new shoots to two or three leaves. Major pruning is best carried out in late winter or early spring before bud burst.',
    },
  },
];

export const MOCK_SEASONAL_GUIDES = [
  {
    id: 'spring',
    season: 'Spring',
    tips: [
      'Repot deciduous trees as buds swell — this is the best time of year.',
      'Begin feeding with a high-nitrogen fertiliser as new growth emerges.',
      'Remove wire before it bites into expanding bark.',
      'Watch for aphids and treat early with a gentle insecticide.',
      'Move frost-tender species outside once night temperatures stay above 5 °C.',
      'Pinch candles on pines to balance growth and reduce needle size.',
    ],
    monthly_checklist: {
      March: [
        'Check roots — repot if the tree is pot-bound',
        'Start feeding as buds break',
        'Remove any deadwood or crossing branches',
      ],
      April: [
        'Pinch new growth on junipers and conifers',
        'Wire deciduous trees before foliage fills in',
        'Increase watering frequency as temperatures rise',
      ],
      May: [
        'Remove wire before it digs in',
        'Decandling preparation for Japanese Black Pine',
        'Check for pests under leaves and on new growth',
      ],
    },
  },
  {
    id: 'summer',
    season: 'Summer',
    tips: [
      'Water in the morning and evening on hot days — daily or twice daily.',
      'Provide shade during the hottest part of the day for thin-barked species.',
      'Continue feeding every two weeks with a balanced fertiliser.',
      'Clip back extension growth to maintain silhouette.',
      'Decandle Japanese Black Pines in early July.',
      'Check soil moisture frequently — never let it dry out completely.',
    ],
    monthly_checklist: {
      June: [
        'Defoliate Japanese Maple for smaller leaves if tree is vigorous',
        'Clip junipers to maintain pads',
        'Water morning and evening if temperatures exceed 25 °C',
      ],
      July: [
        'Decandle Japanese Black Pine',
        'Apply summer fertiliser low in nitrogen',
        'Check watering carefully during heatwaves',
      ],
      August: [
        'Begin reducing nitrogen in fertiliser',
        'Allow extension shoots to harden off',
        'Start considering autumn wiring sessions',
      ],
    },
  },
  {
    id: 'autumn',
    season: 'Autumn',
    tips: [
      'Enjoy autumn colour — reduce and then stop feeding as leaves change.',
      'Wire deciduous trees after leaf fall for best visibility of branch structure.',
      'Clean up fallen leaves from pots to prevent fungal issues.',
      'Collect fruit and seeds for propagation projects.',
      'Prepare winter protection before first frost.',
      'Reduce watering gradually as trees slow down.',
    ],
    monthly_checklist: {
      September: [
        'Final light feeding of the season',
        'Remove summer wire before leaves drop',
        'Check trees for pests before bringing indoors',
      ],
      October: [
        'Wire deciduous trees after leaf fall',
        'Clean benches and pots',
        'Bring tropical species indoors before temperatures drop below 10 °C',
      ],
      November: [
        'Apply a thin layer of grit mulch to protect surface roots',
        'Store collected yamadori safely for winter',
        'Oil tools and clean all equipment',
      ],
    },
  },
  {
    id: 'winter',
    season: 'Winter',
    tips: [
      'Hardy trees need cold, not freezing — protect from hard frost below -5 °C.',
      'Keep trees dry but not bone-dry; water on mild days only.',
      'Do not heat a cold greenhouse — trees need dormancy.',
      'Carry out structural pruning on deciduous trees while bare.',
      'Study branch structure and plan wiring or repotting for spring.',
      'Tropical and sub-tropical species must stay frost-free indoors with good light.',
    ],
    monthly_checklist: {
      December: [
        'Protect trees in unheated greenhouse or cold frame',
        'Water sparingly — only when soil is almost dry',
        'Plan repotting schedule for spring',
      ],
      January: [
        'Inspect stored trees for mould or pest damage',
        'Order fertiliser, soil components and pots for spring',
        'Prune deciduous trees on mild days',
      ],
      February: [
        'Watch for early bud movement — timing repotting for early movers',
        'Prepare repotting materials',
        'Begin fertilising very lightly as first signs of movement appear',
      ],
    },
  },
];

export const MOCK_WEATHER = {
  location: 'London',
  current_weather: {
    temperature: 9,
    description: 'Partly cloudy',
    humidity: 72,
    wind_speed: 18,
    feels_like: 6,
    uv_index: 2,
  },
  bonsaiTips: [
    {
      title: '🌡️ Cool Temperatures',
      message: 'At 9 °C, hardy outdoor bonsai are fine without extra protection. Keep tropical species indoors.',
    },
    {
      title: '💧 Watering',
      message: 'Check soil moisture — cool, cloudy days mean slower evaporation. Water only if the topsoil is drying out.',
    },
    {
      title: '💨 Wind',
      message: 'Moderate winds can dry compost faster than expected. Monitor pots in exposed positions.',
    },
    {
      title: '☁️ Light Levels',
      message: 'Overcast skies reduce photosynthesis. Ensure trees are in the brightest spot available.',
    },
  ],
};
