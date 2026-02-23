const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientific_name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  care: {
    watering: { type: String },
    fertilizing: { type: String },
    pruning: { type: String },
  },
  imageUrl: { type: String },
  origin: { type: String },
  characteristics: { type: String },
});

module.exports = mongoose.model('Species', speciesSchema);
