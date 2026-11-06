import { useState } from 'react';
import { complaints, COMPLAINT_STATUSES } from '../../data/dummyData';

export default function ManageComplaints() {
  const [list, setList] = useState(complaints);
  const [filter, setFilter] = useState('all');
  const [replyId, setReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const shown = filter === 'all' ? list : list.filter((c) => c.status === filter);

  const update = (id, patch) => setList(list.map((c) => (c.id === id ? { ...c, ...patch } : c))); // TODO: PUT /api/complaints/:id

  const sendReply = (id) => {
    update(id, { response: replyText, status: 'in-progress' });
    setReplyId(null); setReplyText('');
  };

  return (
    <div className="page">
      <h1>Manage Complaints</h1>
      <p className="muted">Update status and respond to students.</p>

      <div className="filters">
        {['all', ...COMPLAINT_STATUSES].map((f) => (
          <button key={f} className={`chip chip-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {shown.length === 0 ? <p className="muted">Nothing here. 🎉</p> : (
        <ul className="list">
          {shown.map((c) => (
            <li key={c.id} className="card complaint-item">
              <div className="food-head">
                <strong>{c.title}</strong>
                <span className={`chip status-${c.status}`}>{c.status}</span>
              </div>
              <p>{c.description}</p>
              <small className="muted">By {c.student} · {c.date}</small>
              {c.response && <div className="admin-reply"><strong>Your response:</strong> {c.response}</div>}
              <div className="row-actions">
                <select value={c.status} onChange={(e) => update(c.id, { status: e.target.value })}>
                  {COMPLAINT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {replyId === c.id ? (
                  <>
                    <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type your response…" />
                    <button className="btn btn-primary" onClick={() => sendReply(c.id)}>Send</button>
                    <button className="btn btn-outline" onClick={() => setReplyId(null)}>Cancel</button>
                  </>
                ) : (
                  <button className="btn btn-outline" onClick={() => { setReplyId(c.id); setReplyText(c.response || ''); }}>
                    Reply
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}