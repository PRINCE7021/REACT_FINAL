import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useApp } from '../context/AppContext';

export default function Layout({ title, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toast } = useApp();

  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="app-shell__main">
        <Navbar title={title} onMenuClick={() => setMenuOpen((v) => !v)} />
        <main className="app-shell__content">{children}</main>
      </div>
      {toast && (
        <div className={`toast toast--${toast.kind}`} role="status">
          {toast.message}
        </div>
      )}
    </div>
  );
}
