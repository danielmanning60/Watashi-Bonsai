const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

const router = express.Router();
router.use(auth);

router.post('/', async (req, res) => {
  try {
    const { name, species, notes, imageUrl, tags, location, progressPhotos } = req.body;
    const entry = await Portfolio.create({ name, species, notes, imageUrl, tags, location, progressPhotos, user: req.userId });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const entries = await Portfolio.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const entry = await Portfolio.findOne({ _id: req.params.id, user: req.userId });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid portfolio entry ID format' });
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, species, notes, imageUrl, tags, location, progressPhotos } = req.body;
    const entry = await Portfolio.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { name, species, notes, imageUrl, tags, location, progressPhotos },
      { new: true, runValidators: true }
    );
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid portfolio entry ID format' });
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const entry = await Portfolio.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid portfolio entry ID format' });
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
