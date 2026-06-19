import React from 'react';
import { useApp } from '../context/AppContext';

export default function Navbar({ title, onMenuClick }) {
  const { settings, toggleTheme } = useApp();

  return (
    <header className="navbar">
      <div className="navbar__left">
        <button className="icon-btn navbar__menu" onClick={onMenuClick} aria-label="Toggle navigation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <h1 className="navbar__title">{title}</h1>
      </div>

      <div className="navbar__right">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle color theme" title="Toggle theme">
          {settings.theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
        <div className="navbar__user">
          <div className="navbar__avatar">DP</div>
          <div className="navbar__user-meta">
            <strong>Dr. Prince</strong>
            <span>Genomics Lab</span>
          </div>
        </div>
      </div>
    </header>
  );
}
