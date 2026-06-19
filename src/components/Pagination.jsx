import React, { useMemo } from 'react';

export default function Pagination({ page, totalPages, onPageChange }) {
  const pages = useMemo(() => {
    const out = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i += 1) out.push(i);
    return out;
  }, [page, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button className="pagination__btn" disabled={page === 1} onClick={() => onPageChange(1)}>«</button>
      <button className="pagination__btn" disabled={page === 1} onClick={() => onPageChange(page - 1)}>‹</button>
      {pages[0] > 1 && <span className="pagination__ellipsis">…</span>}
      {pages.map((p) => (
        <button
          key={p}
          className={`pagination__btn ${p === page ? 'pagination__btn--active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      {pages[pages.length - 1] < totalPages && <span className="pagination__ellipsis">…</span>}
      <button className="pagination__btn" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>›</button>
      <button className="pagination__btn" disabled={page === totalPages} onClick={() => onPageChange(totalPages)}>»</button>
    </div>
  );
}
