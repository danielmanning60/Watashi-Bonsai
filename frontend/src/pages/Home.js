import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🌿',
    title: 'Species Database',
    description: 'Explore detailed profiles of popular bonsai species with care requirements and difficulty levels.',
    link: '/species',
  },
  {
    icon: '🍂',
    title: 'Seasonal Guides',
    description: 'Follow month-by-month care checklists tailored to each season of the bonsai year.',
    link: '/seasonal-guides',
  },
  {
    icon: '📷',
    title: 'My Portfolio',
    description: 'Document your bonsai journey. Add entries, notes, and tags for every tree in your collection.',
    link: '/portfolio',
  },
  {
    icon: '🌤️',
    title: 'Weather & Care Tips',
    description: 'Get real-time UK weather and personalised bonsai care advice based on current conditions.',
    link: '/weather',
  },
];

const gettingStarted = [
  { step: '1', text: 'Browse the Species Database to find the right tree for you.' },
  { step: '2', text: 'Check the Seasonal Guides for care tasks this month.' },
  { step: '3', text: 'Create an account to start your personal bonsai portfolio.' },
  { step: '4', text: 'Use the Weather page for location-specific care reminders.' },
];

export default function Home() {
  return (
    <div className="page-container">
      <div className="hero">
        <h1>🌳 Watashi Bonsai</h1>
        <p>
          Your personal companion for growing, caring for, and documenting the art of bonsai.
          Explore species, follow seasonal guides, and track your collection.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/species" className="btn btn-outline-white btn-lg">Explore Species</Link>
          <Link to="/seasonal-guides" className="btn btn-secondary btn-lg">Seasonal Guides</Link>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">✨ What You Can Do</h2>
        <div className="cards-grid">
          {features.map((f) => (
            <Link to={f.link} key={f.title} style={{ textDecoration: 'none' }}>
              <div className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">🪴 Getting Started</h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {gettingStarted.map((item) => (
            <div
              key={item.step}
              style={{
                background: '#fff',
                borderRadius: 'var(--radius)',
                padding: '1rem 1.25rem',
                boxShadow: 'var(--shadow)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  background: 'var(--primary-green)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {item.step}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
