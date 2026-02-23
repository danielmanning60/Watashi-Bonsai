const express = require('express');
const SeasonalGuide = require('../models/SeasonalGuide');

const router = express.Router();

function getCurrentSeason() {
  const month = new Date().getMonth() + 1; // 1-12
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

router.get('/', async (req, res) => {
  try {
    const guides = await SeasonalGuide.find();
    res.json(guides);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/current', async (req, res) => {
  try {
    const season = getCurrentSeason();
    const guide = await SeasonalGuide.findOne({ season });
    if (!guide) return res.status(404).json({ message: 'No guide found for current season' });
    res.json(guide);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
