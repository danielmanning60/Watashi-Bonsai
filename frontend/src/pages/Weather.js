import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Weather() {
  const [location, setLocation] = useState('London');
  const [input, setInput] = useState('London');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = (loc) => {
    setLoading(true);
    setError('');
    setWeather(null);
    axios
      .get(`${API_BASE}/api/weather/${encodeURIComponent(loc)}`)
      .then((res) => setWeather(res.data))
      .catch(() => setError(`Could not fetch weather for "${loc}". Check the location and try again.`))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWeather('London');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setLocation(trimmed);
    fetchWeather(trimmed);
  };

  const current = weather?.current_weather || weather?.current || weather;
  const tips = weather?.bonsaiTips || weather?.bonsai_tips || weather?.tips || [];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🌤️ Weather & Care Tips</h1>
        <p>Get current UK weather and personalised bonsai care advice.</p>
      </div>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter UK location (e.g. London, Bristol)"
          style={{ maxWidth: 320 }}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && (
        <div className="spinner-wrap"><div className="spinner" /></div>
      )}

      {!loading && weather && current && (
        <>
          <div className="weather-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div>
                <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>📍 {location}</div>
                <div className="weather-temp">
                  {current.temperature ?? current.temp ?? '—'}°C
                </div>
                <div className="weather-desc">
                  {current.description || current.condition || current.weather_description || ''}
                </div>
              </div>
              {current.icon && (
                <img src={current.icon} alt="weather icon" style={{ width: 64, height: 64 }} />
              )}
            </div>
            <div className="weather-grid">
              {(current.humidity != null) && (
                <div className="weather-stat">
                  <label>Humidity</label>
                  {current.humidity}%
                </div>
              )}
              {(current.wind_speed != null || current.windspeed != null) && (
                <div className="weather-stat">
                  <label>Wind Speed</label>
                  {current.wind_speed ?? current.windspeed} km/h
                </div>
              )}
              {(current.feels_like != null) && (
                <div className="weather-stat">
                  <label>Feels Like</label>
                  {current.feels_like}°C
                </div>
              )}
              {(current.uv_index != null || current.uvi != null) && (
                <div className="weather-stat">
                  <label>UV Index</label>
                  {current.uv_index ?? current.uvi}
                </div>
              )}
            </div>
          </div>

          {tips.length > 0 && (
            <div className="section">
              <h2 className="section-title">🌿 Bonsai Care Tips</h2>
              <div className="cards-grid">
                {tips.map((tip, i) => (
                  <div key={i} className="card">
                    <div className="card-body">
                      {typeof tip === 'object' ? (
                        <>
                          {tip.title && <div className="card-title">{tip.title}</div>}
                          <p className="card-text">{tip.message || tip.description || tip.tip}</p>
                        </>
                      ) : (
                        <p className="card-text">{tip}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
