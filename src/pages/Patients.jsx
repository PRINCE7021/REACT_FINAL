import React, { useMemo, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PatientTable from '../components/PatientTable';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import { PATIENTS } from '../data/patients';

const PAGE_SIZE = 25;

export default function Patients() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [sortBy, setSortBy] = useState('id-asc');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = PATIENTS.filter((p) => {
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.dnaId.toLowerCase().includes(q);
      const matchesRisk = riskFilter === 'All' || p.risk === riskFilter;
      const matchesGender = genderFilter === 'All' || p.gender === genderFilter;
      return matchesSearch && matchesRisk && matchesGender;
    });

    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'id-asc': return a.id.localeCompare(b.id);
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'age-asc': return a.age - b.age;
        case 'age-desc': return b.age - a.age;
        case 'mutations-desc': return b.mutationCount - a.mutationCount;
        default: return 0;
      }
    });
    return list;
  }, [search, riskFilter, genderFilter, sortBy]);

  useEffect(() => { setPage(1); }, [search, riskFilter, genderFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  return (
    <Layout title="Patient Records">
      <div className="panel">
        <div className="panel__header">
          <h2>Patient Registry</h2>
          <span className="tag">{filtered.length.toLocaleString()} of {PATIENTS.length.toLocaleString()}</span>
        </div>

        <div className="toolbar">
          <input
            className="input toolbar__search"
            placeholder="Search by name, patient ID or DNA ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="select" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
            <option value="All">All risk levels</option>
            <option value="Low">Low risk</option>
            <option value="Medium">Medium risk</option>
            <option value="High">High risk</option>
          </select>
          <select className="select" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
            <option value="All">All genders</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
          <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id-asc">Sort: Patient ID</option>
            <option value="name-asc">Sort: Name A–Z</option>
            <option value="age-asc">Sort: Age ↑</option>
            <option value="age-desc">Sort: Age ↓</option>
            <option value="mutations-desc">Sort: Most mutations</option>
          </select>
        </div>

        {loading ? (
          <Loader label="Loading patient registry…" />
        ) : pageItems.length === 0 ? (
          <EmptyState title="No matching patients" message="Adjust your search or filters to see results." />
        ) : (
          <>
            <PatientTable patients={pageItems} />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
    </Layout>
  );
}
