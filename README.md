# 🌿 Watashi Bonsai

A comprehensive web application for bonsai enthusiasts in the United Kingdom.

## 🌐 Live Demo

**👉 [https://danielmanning60.github.io/Watashi-Bonsai/](https://danielmanning60.github.io/Watashi-Bonsai/)**

> The live site is automatically deployed via GitHub Actions whenever changes are pushed to `main`.  
> All pages (Species, Seasonal Guides, Weather) work without a backend using built-in demo data.  
> Portfolio and login features require the full stack (see local setup below).

![Home page](https://github.com/user-attachments/assets/412de84c-df71-4ab1-93cf-7b13a2b2e66b)

---

## ✨ Features

- 🌳 10 Bonsai Species Database with full care instructions
- 🍂 Seasonal Growing Guides (Spring / Summer / Autumn / Winter)
- 🌤️ UK Weather & bonsai-specific care tips
- 📸 Personal Portfolio Gallery (requires account)
- 👤 User Authentication & Profiles (JWT)

---

## 🚀 Running Locally

### Option 1 — Frontend only (fastest, no database needed)

The frontend ships with built-in demo data for all species, seasonal guides and weather, so you can browse the entire UI without running the backend or Docker.

**Requirements:** Node.js 18+

```bash
git clone https://github.com/danielmanning60/Watashi-Bonsai.git
cd Watashi-Bonsai/frontend
npm install
npm start
```

Open **http://localhost:3000** in your browser. ✅

> A blue info banner will appear on data pages when showing demo data.  
> To use live data and the portfolio / auth features, run the full stack below.

---

### Option 2 — Full stack with Docker (recommended)

**Requirements:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
git clone https://github.com/danielmanning60/Watashi-Bonsai.git
cd Watashi-Bonsai
docker-compose up -d
```

| Service  | URL                    |
|----------|------------------------|
| App      | http://localhost:3000  |
| API      | http://localhost:5000  |

Seed the database with sample species and guides after the containers start:

```bash
docker-compose exec backend npm run seed
```

---

### Option 3 — Full stack manual setup

**Requirements:** Node.js 18+, MongoDB running locally

```bash
# 1 — Clone
git clone https://github.com/danielmanning60/Watashi-Bonsai.git
cd Watashi-Bonsai

# 2 — Backend
cd backend
cp .env.example .env          # edit MONGODB_URI and JWT_SECRET if needed
npm install
npm run seed                  # populate species + seasonal guides
npm run dev                   # starts on http://localhost:5000

# 3 — Frontend (new terminal)
cd ../frontend
npm install
npm start                     # starts on http://localhost:3000
```

---

## ⚙️ Enabling GitHub Pages (first-time setup)

After merging this PR, enable GitHub Pages in the repository settings once:

1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. The next push to `main` will trigger an automatic deploy to `https://danielmanning60.github.io/Watashi-Bonsai/`

---

## 🗺️ Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `#/` | Hero, feature cards, getting-started guide |
| Species | `#/species` | 10 species cards, difficulty filter |
| Species Detail | `#/species/:id` | Tabbed care guide (watering / fertilizing / pruning) |
| Seasonal Guides | `#/seasonal-guides` | Season selector, care tips, monthly accordion checklist |
| Weather | `#/weather` | UK location search, forecast, bonsai care tips |
| Portfolio | `#/portfolio` | Personal bonsai journal — **requires login** |
| Profile | `#/profile` | Account details — **requires login** |

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Deployment | GitHub Pages (frontend), Docker Compose (full stack) |

---

## 📝 License

MIT License

---

Made with 🌿 by Watashi Bonsai Team
