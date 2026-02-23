# 🌿 Watashi Bonsai

A comprehensive web application for bonsai enthusiasts in the United Kingdom.

![Home page](https://github.com/user-attachments/assets/d8312a49-2f85-4c06-baf0-fd5dbc08fa6b)

## ✨ Features

- 🌳 10 Bonsai Species Database with full care instructions
- 🍂 Seasonal Growing Guides (Spring / Summer / Autumn / Winter)
- 🌤️ UK Weather & bonsai-specific care tips
- 📸 Personal Portfolio Gallery (requires account)
- 👤 User Authentication & Profiles (JWT)

---

## 🚀 How to See the App

### Option 1 — Frontend only (fastest, no database needed)

The frontend ships with built-in demo data for all species, seasonal guides and weather, so you can browse the entire UI without running the backend or Docker.

**Requirements:** Node.js 18+

```bash
git clone https://github.com/danielmanning60/Watashi-Bonsai.git
cd Watashi-Bonsai/frontend
npm install
npm start
```

Open **http://localhost:3000** in your browser. That's it. ✅

> A blue info banner will appear on data pages indicating demo data is shown.
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

## 🗺️ Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, feature cards, getting-started guide |
| Species | `/species` | 10 species cards, difficulty filter |
| Species Detail | `/species/:id` | Tabbed care guide (watering / fertilizing / pruning) |
| Seasonal Guides | `/seasonal-guides` | Season selector, care tips, monthly accordion checklist |
| Weather | `/weather` | UK location search, forecast, bonsai care tips |
| Portfolio | `/portfolio` | Personal bonsai journal — **requires login** |
| Profile | `/profile` | Account details — **requires login** |

### Screenshots

**Species Database** — 10 species with difficulty badges and filter
![Species](https://github.com/user-attachments/assets/9bb78432-02ca-4fec-ad60-b0c35ae7477b)

**Seasonal Guides** — colour-coded seasons and monthly checklists
![Seasonal Guides](https://github.com/user-attachments/assets/02cc67bf-55e9-47ef-9515-ee07a1623b08)

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Deployment | Docker, Docker Compose |

---

## 📝 License

MIT License

---

Made with 🌿 by Watashi Bonsai Team
