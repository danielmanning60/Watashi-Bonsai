import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onLoginClick }) {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? 'active' : '';

  const close = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link to="/" className="navbar-brand" onClick={close}>
          🌳 Watashi Bonsai
        </Link>
        <button
          className="hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar-collapse${open ? ' open' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/" className={isActive('/')} onClick={close}>Home</Link></li>
          <li><Link to="/species" className={isActive('/species')} onClick={close}>Species</Link></li>
          <li><Link to="/seasonal-guides" className={isActive('/seasonal-guides')} onClick={close}>Seasonal Guides</Link></li>
          <li><Link to="/portfolio" className={isActive('/portfolio')} onClick={close}>Portfolio</Link></li>
          <li><Link to="/weather" className={isActive('/weather')} onClick={close}>Weather</Link></li>
        </ul>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="navbar-user" onClick={close}>
                👤 {user?.username}
              </Link>
              <button
                className="btn btn-outline-white btn-sm"
                onClick={() => { logout(); close(); }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-white btn-sm"
                onClick={() => { onLoginClick('login'); close(); }}
              >
                Login
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { onLoginClick('register'); close(); }}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
