# 🌿 Watashi Bonsai

A comprehensive web application for bonsai enthusiasts in the United Kingdom.

## ✨ Features

- 🌳 10+ Bonsai Species Database
- 📍 UK Weather Forecasts & Geolocation
- 🌱 Seasonal Growing Guides
- 📚 Expert Tips & Techniques
- 📸 Personal Portfolio Gallery
- 👤 User Authentication & Profiles

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Or: Node.js 18+, npm, MongoDB

### Using Docker (Recommended)

\\\ash
git clone https://github.com/danielmanning60/Watashi-Bonsai.git
cd Watashi-Bonsai
docker-compose up -d
\\\

Access:
- Frontend: http://localhost:3000
- API: http://localhost:5000

### Manual Setup

\\\ash
# Backend
cd backend
npm install
npm run seed
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
\\\

## 📚 Documentation

- [Getting Started](docs/GETTING_STARTED.md)
- [API Documentation](docs/API.md)
- [Seasonal Guide](docs/SEASONAL_GUIDE.md)

## 🎯 Features

### Species Database
- Ficus, Japanese Maple, Larch, Pine, Juniper
- Trident Maple, Elm, Hawthorn, Beech, Oak
- Detailed care instructions for each

### Seasonal Guides
- Spring repotting & budbreak
- Summer watering & feeding
- Autumn preparation
- Winter dormancy & protection

### Portfolio System
- Upload photos of your bonsai
- Track progress with notes
- Organize by tags
- Geolocation support

### Weather Integration
- Real-time UK forecasts
- Bonsai-specific care tips
- All UK timezones supported

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Docker, Docker Compose

## 📝 License

MIT License

## 🙏 Acknowledgments

Built for UK bonsai enthusiasts with ❤️

---

Made with 🌿 by Watashi Bonsai Team
