import React, { useState } from 'react';
import Layout from '../components/Layout';
import RiskBadge from '../components/RiskBadge';
import { getRiskLevel } from '../services/dnaService';

export default function RiskCalculator() {
  const [count, setCount] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const numeric = Number(count);
  const isValid = count !== '' && Number.isFinite(numeric) && numeric >= 0;
  const risk = isValid ? getRiskLevel(numeric) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout title="Mutation Risk Calculator">
      <div className="panel panel--narrow">
        <div className="panel__header">
          <h2>Calculate clinical risk</h2>
        </div>
        <p className="muted">Enter the number of detected mutations to estimate clinical risk severity.</p>

        <form onSubmit={handleSubmit} className="risk-form">
          <label htmlFor="mutationCount">Mutation count</label>
          <input
            id="mutationCount"
            className="input"
            type="number"
            min="0"
            placeholder="e.g. 4"
            value={count}
            onChange={(e) => { setCount(e.target.value); setSubmitted(false); }}
          />
          <button className="btn btn--primary" type="submit" disabled={!isValid}>Calculate Risk</button>
        </form>

        {submitted && isValid && (
          <div className="risk-result">
            <RiskBadge risk={risk} mutationCount={numeric} />
            <p className="muted">
              {risk === 'Low' && '0–2 mutations: routine monitoring is generally sufficient.'}
              {risk === 'Medium' && '3–5 mutations: recommend closer clinical follow-up.'}
              {risk === 'High' && '6+ mutations: flagged for priority specialist review.'}
            </p>
          </div>
        )}

        <div className="risk-rules">
          <h3>Scoring rules</h3>
          <ul>
            <li><RiskBadge risk="Low" /> 0–2 mutations</li>
            <li><RiskBadge risk="Medium" /> 3–5 mutations</li>
            <li><RiskBadge risk="High" /> 6+ mutations</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
