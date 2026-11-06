import { useState } from 'react';
import { FEEDBACK_CATEGORIES, feedbacks } from '../../data/dummyData';
import { useAuth } from '../../context/AuthContext';

export default function FeedbackForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ category: FEEDBACK_CATEGORIES[0], message: '' });
  const [list, setList] = useState(feedbacks.filter((f) => f.student === user.name));
  const [saved, setSaved] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const entry = { ...form, id: Date.now(), student: user.name, date: new Date().toISOString().slice(0, 10) };
    setList([entry, ...list]); // TODO: POST /api/feedback, then refetch
    setForm({ category: FEEDBACK_CATEGORIES[0], message: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page narrow">
      <h1>Share Your Feedback</h1>
      <p className="muted">Tell us about taste, hygiene, quantity or service.</p>

      <form onSubmit={submit} className="card form">
        <label>Category
          <select value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {FEEDBACK_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Your Feedback
          <textarea rows="4" value={form.message} required maxLength={500}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="e.g. The paneer curry at dinner was too spicy…" />
        </label>
        <button className="btn btn-primary" type="submit">Submit Feedback</button>
        {saved && <p className="success-text">✅ Feedback submitted. Thank you!</p>}
      </form>

      <h2 className="mt">Your Previous Feedback</h2>
      {list.length === 0 ? <p className="muted">Nothing yet — your first feedback is one form away.</p> : (
        <ul className="list">
          {list.map((f) => (
            <li key={f.id} className="list-row">
              <div><span className="chip">{f.category}</span> <small className="muted">{f.date}</small>
                <p>{f.message}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}