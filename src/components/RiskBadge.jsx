import React from 'react';
import { RISK_META } from '../services/dnaService';

export default function RiskBadge({ risk, mutationCount }) {
  const meta = RISK_META[risk] || RISK_META.Low;
  return (
    <span className="risk-badge" style={{ color: meta.color, background: meta.bg, borderColor: meta.color }}>
      <span className="risk-badge__dot" style={{ background: meta.color }} />
      {meta.label}
      {typeof mutationCount === 'number' && <span className="risk-badge__count">({mutationCount})</span>}
    </span>
  );
}
