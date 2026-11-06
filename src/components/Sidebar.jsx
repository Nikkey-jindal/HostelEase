import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LINKS = {
  student: [
    { to: '/student', label: 'Dashboard', icon: '🏠', end: true },
    { to: '/student/menu', label: "Today's Menu", icon: '🍽️' },
    { to: '/student/rate', label: 'Rate Food', icon: '⭐' },
    { to: '/student/feedback', label: 'Feedback', icon: '💬' },
    { to: '/student/complaints', label: 'Complaints', icon: '⚠️' },
  ],
  admin: [
    { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
    { to: '/admin/menu', label: 'Manage Menu', icon: '🍽️' },
    { to: '/admin/ratings', label: 'View Ratings', icon: '⭐' },
    { to: '/admin/complaints', label: 'Complaints', icon: '⚠️' },
    { to: '/admin/analytics', label: 'Analytics', icon: '📈' },
  ],
};

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const links = LINKS[user.role] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="logo">🍜 HostelBites</span>
        <button className="icon-btn mobile-only" onClick={onClose}>✕</button>
      </div>
      <nav className="sidebar-nav">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end}
            className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}
            onClick={onClose}>
            <span className="side-icon">{l.icon}</span> {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="avatar">{user.name[0]}</div>
          <div>
            <strong>{user.name}</strong>
            <small>{user.role === 'admin' ? 'Administrator' : `Roll: ${user.rollNumber}`}</small>
          </div>
        </div>
        <button className="btn btn-outline btn-block" onClick={logout}>Logout</button>
      </div>
    </aside>
  );
}