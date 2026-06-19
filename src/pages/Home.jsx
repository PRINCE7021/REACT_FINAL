import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import Loader from '../components/Loader';
import RiskBadge from '../components/RiskBadge';
import DNAStrand from '../components/DNAStrand';
import { PATIENTS } from '../data/patients';
import { DNA_SEQUENCES } from '../data/dnaSequences';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const stats = useMemo(() => {
    const totalSequences = DNA_SEQUENCES.length;
    const totalPatients = PATIENTS.length;
    const mutationCount = PATIENTS.reduce((sum, p) => sum + p.mutationCount, 0);
    const riskCounts = PATIENTS.reduce(
      (acc, p) => {
        acc[p.risk] += 1;
        return acc;
      },
      { Low: 0, Medium: 0, High: 0 }
    );
    return { totalSequences, totalPatients, mutationCount, riskCounts };
  }, []);

  const highRiskPatients = useMemo(
    () => PATIENTS.filter((p) => p.risk === 'High').slice(0, 6),
    []
  );

  const featuredSequence = DNA_SEQUENCES[0];

  if (loading) {
    return (
      <Layout title="Dashboard">
        <Loader label="Compiling lab overview…" />
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <section className="stat-grid">
        <StatCard label="Total DNA Sequences" value={stats.totalSequences} sublabel="Across 5 organisms" accent="teal" icon={<HelixIcon />} />
        <StatCard label="Total Patients" value={stats.totalPatients.toLocaleString()} sublabel="Active registry" accent="violet" icon={<UsersIcon />} />
        <StatCard label="Mutation Count" value={stats.mutationCount.toLocaleString()} sublabel="All recorded mutations" accent="amber" icon={<DnaIcon />} />
        <StatCard
          label="Risk Statistics"
          value={`${stats.riskCounts.High} High`}
          sublabel={`${stats.riskCounts.Low} Low · ${stats.riskCounts.Medium} Medium`}
          accent="rose"
          icon={<GaugeIcon />}
        />
      </section>

      <section className="panel-grid">
        <div className="panel panel--wide">
          <div className="panel__header">
            <h2>Featured sequence — {featuredSequence.name}</h2>
            <span className="tag">{featuredSequence.gene}</span>
          </div>
          <DNAStrand sequence={featuredSequence.sequence.slice(0, 180)} width={45} />
        </div>

        <div className="panel">
          <div className="panel__header">
            <h2>Highest risk patients</h2>
          </div>
          <ul className="risk-list">
            {highRiskPatients.map((p) => (
              <li key={p.id}>
                <div>
                  <strong>{p.name}</strong>
                  <span className="muted"> · {p.id}</span>
                </div>
                <RiskBadge risk={p.risk} mutationCount={p.mutationCount} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

function HelixIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M7 3c0 4 10 6 10 12 0 4-3 5-3 5" /><path d="M17 3c0 4-10 6-10 12 0 4 3 5 3 5" /></svg>;
}
function UsersIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14c2.8.3 5 2.5 5 6" /></svg>;
}
function DnaIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4l16 16M4 9h6M14 15h6M4 4c0 5 4 7 8 8M20 20c0-5-4-7-8-8" /></svg>;
}
function GaugeIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 13a8 8 0 1 1 16 0" /><path d="M12 13l4-4" /><path d="M12 17h.01" /></svg>;
}
