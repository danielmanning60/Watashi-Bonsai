import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const EMPTY_FORM = { name: '', species: '', notes: '', tags: '', location: '' };

export default function Portfolio({ onAuthRequired }) {
  const { isAuthenticated, token } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!isAuthenticated) return;
    axios
      .get(`${API_BASE}/api/portfolio`, authHeaders)
      .then((res) => setEntries(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Failed to load portfolio.'))
      .finally(() => setLoading(false));
  }, [isAuthenticated, token]); // eslint-disable-line

  if (!isAuthenticated) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">🔒</div>
          <h3>Login to view your Portfolio</h3>
          <p>Track your bonsai collection by creating an account.</p>
          <button className="btn btn-primary" onClick={() => onAuthRequired && onAuthRequired('login')}>
            Login / Register
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.name.trim()) { setFormError('Name is required.'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      };
      if (editId) {
        const res = await axios.put(`${API_BASE}/api/portfolio/${editId}`, payload, authHeaders);
        setEntries((prev) => prev.map((e) => (e._id === editId ? res.data : e)));
      } else {
        const res = await axios.post(`${API_BASE}/api/portfolio`, payload, authHeaders);
        setEntries((prev) => [...prev, res.data]);
      }
      setForm(EMPTY_FORM);
      setEditId(null);
      setShowForm(false);
    } catch {
      setFormError('Failed to save entry. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (entry) => {
    setForm({
      name: entry.name || '',
      species: entry.species || '',
      notes: entry.notes || '',
      tags: Array.isArray(entry.tags) ? entry.tags.join(', ') : (entry.tags || ''),
      location: entry.location || '',
    });
    setEditId(entry._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      await axios.delete(`${API_BASE}/api/portfolio/${id}`, authHeaders);
      setEntries((prev) => prev.filter((e) => e._id !== id));
    } catch {
      setError('Failed to delete entry.');
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setForm(EMPTY_FORM);
    setEditId(null);
    setFormError('');
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1>📷 My Portfolio</h1>
          <p>Your personal bonsai collection journal.</p>
        </div>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Entry
          </button>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '1.5rem', marginBottom: '1.75rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>{editId ? 'Edit Entry' : 'New Entry'}</h3>
          {formError && <div className="alert alert-danger">{formError}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Species</label>
                <input className="form-control" value={form.species} onChange={(e) => setForm({ ...form, species: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input className="form-control" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma separated)</label>
                <input className="form-control" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="outdoor, juniper, old" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea className="form-control" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving…' : editId ? 'Update' : 'Add Entry'}
              </button>
              <button type="button" className="btn btn-outline" onClick={cancelForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="spinner-wrap"><div className="spinner" /></div>
      ) : entries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🌱</div>
          <h3>No entries yet</h3>
          <p>Start documenting your bonsai collection by adding your first entry.</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add First Entry</button>
        </div>
      ) : (
        <div className="cards-grid">
          {entries.map((entry) => (
            <div key={entry._id} className="portfolio-entry">
              <div className="portfolio-entry-body">
                <div className="card-title">{entry.name}</div>
                {entry.species && (
                  <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    {entry.species}
                  </div>
                )}
                {entry.location && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    📍 {entry.location}
                  </div>
                )}
                {entry.notes && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.4rem 0' }}>{entry.notes}</p>
                )}
                {Array.isArray(entry.tags) && entry.tags.length > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    {entry.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
                  </div>
                )}
                <div className="portfolio-entry-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => handleEdit(entry)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(entry._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
