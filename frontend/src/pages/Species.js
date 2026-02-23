import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MOCK_SPECIES } from '../data/mockData';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const DIFFICULTY_LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

function difficultyClass(d) {
  if (!d) return '';
  return `badge badge-${d.toLowerCase()}`;
}

export default function Species() {
  const [species, setSpecies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/species`)
      .then((res) => {
        setSpecies(res.data);
        setFiltered(res.data);
      })
      .catch(() => {
        setSpecies(MOCK_SPECIES);
        setFiltered(MOCK_SPECIES);
        setError('ℹ️ Backend unavailable — showing demo data.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFiltered(species);
    } else {
      setFiltered(species.filter((s) => s.difficulty?.toLowerCase() === filter.toLowerCase()));
    }
  }, [filter, species]);

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
        <h1>🌿 Species Database</h1>
        <p>Discover bonsai species and their care requirements.</p>
      </div>

      {error && (
        <div className={error.startsWith('ℹ️') ? 'alert alert-info' : 'alert alert-danger'}>
          {error}
        </div>
      )}

      <div className="filter-bar">
        {DIFFICULTY_LEVELS.map((level) => (
          <button
            key={level}
            className={`filter-btn${filter === level ? ' active' : ''}`}
            onClick={() => setFilter(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {filtered.length === 0 && !error ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No species found</h3>
          <p>Try a different filter.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map((s) => (
            <div
              key={s._id || s.id}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/species/${s._id || s.id}`)}
            >
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div className="card-title">{s.name}</div>
                  {s.difficulty && (
                    <span className={difficultyClass(s.difficulty)}>{s.difficulty}</span>
                  )}
                </div>
                {s.scientific_name && (
                  <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    {s.scientific_name}
                  </div>
                )}
                <p className="card-text">
                  {s.description
                    ? s.description.length > 120
                      ? s.description.slice(0, 120) + '…'
                      : s.description
                    : s.care_summary || 'Click to view care details.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
