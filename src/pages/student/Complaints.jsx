import { useState } from 'react';
import { complaints } from '../../data/dummyData';
import { useAuth } from '../../context/AuthContext';

export default function StudentComplaints() {
  const { user } = useAuth();
  const [list, setList] = useState(complaints.filter((c) => c.student === user.name));
  const [form, setForm] = useState({ title: '', description: '' });
  const [saved, setSaved] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const entry = { ...form, id: Date.now(), student: user.name, status: 'pending', response: '', date: new Date().toISOString().slice(0, 10) };
    setList([entry, ...list]); // TODO: POST /api/complaints
    setForm({ title: '', description: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page">
      <h1>Raise a Complaint</h1>
      <p className="muted">Food-related issues reach the admin directly.</p>

      <div className="two-col">
        <form onSubmit={submit} className="card form">
          <label>Title
            <input value={form.title} required maxLength={80}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Cold food served at dinner" />
          </label>
          <label>Description
            <textarea rows="5" value={form.description} required maxLength={500}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the issue in detail…" />
          </label>
          <button className="btn btn-primary" type="submit">Submit Complaint</button>
          {saved && <p className="success-text">✅ Complaint registered. Track it below.</p>}
        </form>

        <div>
          <h2>Your Complaints</h2>
          {list.length === 0 ? <p className="muted">No complaints yet.</p> : (
            <ul className="list">
              {list.map((c) => (
                <li key={c.id} className="card complaint-item">
                  <div className="food-head">
                    <strong>{c.title}</strong>
                    <span className={`chip status-${c.status}`}>{c.status}</span>
                  </div>
                  <p>{c.description}</p>
                  <small className="muted">Raised on {c.date}</small>
                  {c.response && (
                    <div className="admin-reply">
                      <strong>Admin response:</strong> {c.response}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}