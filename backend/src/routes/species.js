const express = require('express');
const Species = require('../models/Species');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    const species = await Species.find(filter);
    res.json(species);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const species = await Species.findById(req.params.id);
    if (!species) return res.status(404).json({ message: 'Species not found' });
    res.json(species);
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid species ID format' });
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
