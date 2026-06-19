import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DNAViewer from './pages/DNAViewer';
import Patients from './pages/Patients';
import GeneSearch from './pages/GeneSearch';
import RiskCalculator from './pages/RiskCalculator';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viewer" element={<DNAViewer />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/gene-search" element={<GeneSearch />} />
      <Route path="/risk-calculator" element={<RiskCalculator />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
