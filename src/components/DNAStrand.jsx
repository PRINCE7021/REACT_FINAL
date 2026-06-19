import React, { memo } from 'react';
import { chunkSequence } from '../services/dnaService';

const DNAStrand = memo(function DNAStrand({ sequence, width = 60, diffAgainst = null, query = '' }) {
  const rows = chunkSequence(sequence || '', width);
  const q = query.trim().toUpperCase();

  return (
    <div className="dna-strand" role="textbox" aria-readonly="true" aria-label="DNA sequence viewer">
      {rows.map((row, rowIdx) => {
        const offset = rowIdx * width;
        const isMatchRow = q && row.includes(q);
        return (
          <div className="dna-strand__row" key={rowIdx}>
            <span className="dna-strand__pos">{offset + 1}</span>
            <span className="dna-strand__bases">
              {row.split('').map((base, i) => {
                const globalIdx = offset + i;
                const changed = diffAgainst && diffAgainst[globalIdx] !== undefined && diffAgainst[globalIdx] !== base;
                return (
                  <span
                    key={i}
                    className={`dna-strand__base base-${base} ${changed ? 'dna-strand__base--changed' : ''}`}
                    title={`Position ${globalIdx + 1}: ${base}`}
                  >
                    {base}
                  </span>
                );
              })}
            </span>
            {isMatchRow && <span className="dna-strand__match-flag">match</span>}
          </div>
        );
      })}
    </div>
  );
});

export default DNAStrand;
