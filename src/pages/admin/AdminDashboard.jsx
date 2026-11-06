import { Link } from 'react-router-dom';
import { menus, ratings, feedbacks, complaints } from '../../data/dummyData';
import StatCard from '../../components/StatCard.jsx';

export default function AdminDashboard() {
  const avg = (ratings.reduce((s, r) => s + r.stars, 0) / ratings.length).toFixed(1);
  const pending = complaints.filter((c) => c.status !== 'resolved').length;

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <p className="muted">Overview of mess operations at a glance.</p>

      <div className="grid-4">
        <StatCard icon="⭐" label="Avg Rating" value={avg} accent="orange" />
        <StatCard icon="🍽️" label="Menus Planned" value={menus.length} accent="primary" />
        <StatCard icon="💬" label="Feedbacks" value={feedbacks.length} accent="green" />
        <StatCard icon="⚠️" label="Open Complaints" value={pending} accent="red" />
      </div>

      <div className="section-head">
        <h2>Latest Complaints</h2>
        <Link className="btn btn-ghost" to="/admin/complaints">Manage →</Link>
      </div>
      <ul className="list">
        {complaints.slice(0, 3).map((c) => (
          <li key={c.id} className="list-row">
            <div><strong>{c.title}</strong><small className="muted"> by {c.student} · {c.date}</small></div>
            <span className={`chip status-${c.status}`}>{c.status}</span>
          </li>
        ))}
      </ul>

      <div className="section-head">
        <h2>Recent Feedback</h2>
        <Link className="btn btn-ghost" to="/admin/analytics">View analytics →</Link>
      </div>
      <ul className="list">
        {feedbacks.slice(0, 3).map((f) => (
          <li key={f.id} className="list-row">
            <div><span className="chip">{f.category}</span> {f.message}</div>
            <small className="muted">— {f.student}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}