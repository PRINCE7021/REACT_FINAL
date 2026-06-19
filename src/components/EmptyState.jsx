import React from 'react';

export default function EmptyState({ title = 'Nothing here yet', message = 'Try adjusting your search or filters.', action }) {
  return (
    <div className="empty-state">
      <div className="empty-state__glyph" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </div>
  );
}
