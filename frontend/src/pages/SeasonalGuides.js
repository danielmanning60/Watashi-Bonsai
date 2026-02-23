import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'Spring';
  if (month >= 6 && month <= 8) return 'Summer';
  if (month >= 9 && month <= 11) return 'Autumn';
  return 'Winter';
}

export default function SeasonalGuides() {
  const [guides, setGuides] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(getCurrentSeason());
  const [openMonth, setOpenMonth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentSeason = getCurrentSeason();

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/seasonal-guides`)
      .then((res) => setGuides(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Failed to load seasonal guides.'))
      .finally(() => setLoading(false));
  }, []);

  const seasonGuides = guides.filter(
    (g) => g.season?.toLowerCase() === selectedSeason.toLowerCase()
  );

  const seasonClass = (s) => `season-card season-${s.toLowerCase()}${s === currentSeason ? ' current' : ''}`;

  if (loading) {
    return (
      <div className="page-container">
        <div className="spinner-wrap"><div className="spinner" /></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🍂 Seasonal Guides</h1>
        <p>Follow the bonsai calendar — care tips and tasks for every season.</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Season selector */}
      <div className="cards-grid" style={{ marginBottom: '2rem' }}>
        {SEASONS.map((season) => (
          <div
            key={season}
            className={seasonClass(season)}
            style={{ cursor: 'pointer', border: selectedSeason === season ? '3px solid var(--primary-green)' : '3px solid transparent' }}
            onClick={() => setSelectedSeason(season)}
          >
            <h3>
              {season === 'Spring' && '🌸 '}
              {season === 'Summer' && '☀️ '}
              {season === 'Autumn' && '🍁 '}
              {season === 'Winter' && '❄️ '}
              {season}
              {season === currentSeason && <span style={{ fontSize: '0.7rem', marginLeft: '0.5rem', fontWeight: 400 }}>(current)</span>}
            </h3>
          </div>
        ))}
      </div>

      {/* Season tips */}
      {seasonGuides.length === 0 && !error ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3>No guides for {selectedSeason}</h3>
          <p>Check back later or explore another season.</p>
        </div>
      ) : (
        seasonGuides.map((guide, i) => (
          <div key={guide._id || i} className="section">
            {guide.tips && guide.tips.length > 0 && (
              <>
                <h2 className="section-title">🌿 Care Tips for {selectedSeason}</h2>
                <div className={seasonClass(selectedSeason)} style={{ marginBottom: '1.5rem' }}>
                  <ul className="season-tips">
                    {guide.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {guide.monthly_checklist && Object.keys(guide.monthly_checklist).length > 0 && (
              <>
                <h2 className="section-title">📅 Monthly Checklist</h2>
                {Object.entries(guide.monthly_checklist).map(([month, tasks]) => (
                  <div key={month} className="accordion">
                    <button
                      className="accordion-header"
                      onClick={() => setOpenMonth(openMonth === month ? null : month)}
                    >
                      <span>{month}</span>
                      <span>{openMonth === month ? '▲' : '▼'}</span>
                    </button>
                    {openMonth === month && (
                      <div className="accordion-body">
                        {Array.isArray(tasks) ? (
                          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                            {tasks.map((task, ti) => <li key={ti}>{task}</li>)}
                          </ul>
                        ) : (
                          <p style={{ margin: 0 }}>{tasks}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
