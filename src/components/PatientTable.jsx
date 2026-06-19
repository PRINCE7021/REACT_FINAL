import React from 'react';
import RiskBadge from './RiskBadge';

export default function PatientTable({ patients }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>DNA ID</th>
            <th>Mutations</th>
            <th>Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="mono">{p.id}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td className="mono">{p.dnaId}</td>
              <td>{p.mutationCount}</td>
              <td><RiskBadge risk={p.risk} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
