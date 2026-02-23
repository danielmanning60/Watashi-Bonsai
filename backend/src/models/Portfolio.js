const mongoose = require('mongoose');

const progressPhotoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String },
});

const portfolioSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    species: { type: String },
    notes: { type: String },
    imageUrl: { type: String },
    tags: [{ type: String }],
    location: { type: String },
    progressPhotos: [progressPhotoSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
