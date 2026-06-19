import React from 'react';
import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Dashboard', icon: 'grid' },
  { to: '/viewer', label: 'DNA Viewer', icon: 'helix' },
  { to: '/patients', label: 'Patients', icon: 'users' },
  { to: '/gene-search', label: 'Gene Search', icon: 'search' },
  { to: '/risk-calculator', label: 'Risk Calculator', icon: 'gauge' },
  { to: '/settings', label: 'Settings', icon: 'sliders' }
];

const LADDER = ['A', 'T', 'G', 'C', 'A', 'T'];

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'grid':
      return <svg {...common}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
    case 'helix':
      return <svg {...common}><path d="M7 3c0 4 10 6 10 12 0 4-3 5-3 5" /><path d="M17 3c0 4-10 6-10 12 0 4 3 5 3 5" /></svg>;
    case 'users':
      return <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14c2.8.3 5 2.5 5 6" /></svg>;
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>;
    case 'gauge':
      return <svg {...common}><path d="M4 13a8 8 0 1 1 16 0" /><path d="M12 13l4-4" /><path d="M12 17h.01" /></svg>;
    case 'sliders':
      return <svg {...common}><path d="M4 6h10M4 12h16M4 18h7" /><circle cx="17" cy="6" r="2" /><circle cx="9" cy="18" r="2" /></svg>;
    default:
      return null;
  }
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <div className="brand-mark" aria-hidden="true">
            {LADDER.map((b, i) => (
              <span key={i} className={`brand-mark__chip base-${b}`}>{b}</span>
            ))}
          </div>
          <div className="brand-text">
            <strong>BioGazer</strong>
            <span>DNA Analysis System</span>
          </div>
        </div>

        <nav className="sidebar__nav">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
            >
              <Icon name={link.icon} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <span>v1.0.0</span>
          <span>Lab build</span>
        </div>
      </aside>
      {open && <div className="sidebar__overlay" onClick={onClose} />}
    </>
  );
}
