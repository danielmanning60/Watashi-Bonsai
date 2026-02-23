const mongoose = require('mongoose');

const monthlyChecklistSchema = new mongoose.Schema({
  month: { type: String, required: true },
  tasks: [{ type: String }],
});

const seasonalGuideSchema = new mongoose.Schema({
  season: {
    type: String,
    enum: ['spring', 'summer', 'autumn', 'winter'],
    required: true,
    unique: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tips: [{ type: String }],
  monthlyChecklist: [monthlyChecklistSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SeasonalGuide', seasonalGuideSchema);
