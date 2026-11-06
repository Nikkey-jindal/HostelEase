import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

export default function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="layout">
      <Sidebar onClose={() => setOpen(false)} />
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
      <div className="main">
        <header className="topbar">
          <button className="icon-btn mobile-only" onClick={() => setOpen(true)}>☰</button>
          <span className="topbar-title">Hostel Food Management System</span>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}