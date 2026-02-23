const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const speciesRoutes = require('./routes/species');
const portfolioRoutes = require('./routes/portfolio');
const seasonalGuidesRoutes = require('./routes/seasonalGuides');
const weatherRoutes = require('./routes/weather');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const defaultLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/species', defaultLimiter, speciesRoutes);
app.use('/api/portfolio', defaultLimiter, portfolioRoutes);
app.use('/api/seasonal-guides', defaultLimiter, seasonalGuidesRoutes);
app.use('/api/weather', defaultLimiter, weatherRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/watashi-bonsai';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = app;
