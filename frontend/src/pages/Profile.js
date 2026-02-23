import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile({ onAuthRequired }) {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">🔒</div>
          <h3>Login to view your Profile</h3>
          <p>Create an account to access your profile and portfolio.</p>
          <button className="btn btn-primary" onClick={() => onAuthRequired && onAuthRequired('login')}>
            Login / Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👤 My Profile</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          {user?.username ? user.username[0].toUpperCase() : '?'}
        </div>

        <dl className="profile-info">
          <dt>Username</dt>
          <dd>{user?.username || '—'}</dd>
          <dt>Email</dt>
          <dd>{user?.email || '—'}</dd>
        </dl>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/portfolio" className="btn btn-primary">
            📷 My Portfolio
          </Link>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
