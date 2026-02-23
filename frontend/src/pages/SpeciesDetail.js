import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CARE_TABS = [
  { key: 'watering', label: '💧 Watering' },
  { key: 'fertilizing', label: '🌱 Fertilizing' },
  { key: 'pruning', label: '✂️ Pruning' },
];

export default function SpeciesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [species, setSpecies] = useState(null);
  const [activeTab, setActiveTab] = useState('watering');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/species/${id}`)
      .then((res) => setSpecies(res.data))
      .catch(() => setError('Species not found or failed to load.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="spinner-wrap"><div className="spinner" /></div>
      </div>
    );
  }

  if (error || !species) {
    return (
      <div className="page-container">
        <div className="alert alert-danger">{error || 'Species not found.'}</div>
        <button className="btn btn-outline" onClick={() => navigate('/species')}>← Back to Species</button>
      </div>
    );
  }

  const getCareContent = (key) => {
    if (species.care) {
      return species.care[key] || 'No information available.';
    }
    return 'No information available.';
  };

  return (
    <div className="page-container">
      <button
        className="btn btn-outline btn-sm"
        onClick={() => navigate('/species')}
        style={{ marginBottom: '1.25rem' }}
      >
        ← Back to Species
      </button>

      <div style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <h1 style={{ margin: 0 }}>{species.name}</h1>
          {species.difficulty && (
            <span className={`badge badge-${species.difficulty.toLowerCase()}`}>{species.difficulty}</span>
          )}
        </div>

        {species.scientific_name && (
          <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1rem', marginTop: 0 }}>
            {species.scientific_name}
          </p>
        )}

        {species.description && (
          <p style={{ lineHeight: 1.7, marginBottom: '1.5rem' }}>{species.description}</p>
        )}

        <h3 style={{ marginBottom: '0.75rem' }}>Care Instructions</h3>
        <div className="tabs">
          {CARE_TABS.map((t) => (
            <button
              key={t.key}
              className={`tab-btn${activeTab === t.key ? ' active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div style={{ padding: '1rem', background: 'var(--cream)', borderRadius: 'var(--radius)', lineHeight: 1.7 }}>
          {getCareContent(activeTab)}
        </div>

        {species.origin && (
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <strong>Origin:</strong> {species.origin}
          </p>
        )}
      </div>
    </div>
  );
}
