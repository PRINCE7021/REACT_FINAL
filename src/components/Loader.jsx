import React from 'react';

export default function Loader({ label = 'Loading sequence data…' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__strand">
        {['A', 'T', 'G', 'C', 'A', 'T'].map((b, i) => (
          <span key={i} className={`loader__chip base-${b}`} style={{ animationDelay: `${i * 0.1}s` }}>{b}</span>
        ))}
      </div>
      <span className="loader__label">{label}</span>
    </div>
  );
}
