import React from 'react';

export default function StatCard({ label, value, sublabel, accent = 'teal', icon }) {
  return (
    <div className={`stat-card stat-card--${accent}`}>
      <div className="stat-card__icon" aria-hidden="true">{icon}</div>
      <div className="stat-card__body">
        <span className="stat-card__label">{label}</span>
        <strong className="stat-card__value">{value}</strong>
        {sublabel && <span className="stat-card__sublabel">{sublabel}</span>}
      </div>
    </div>
  );
}
