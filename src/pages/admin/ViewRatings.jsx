import { useState } from 'react';
import { ratings } from '../../data/dummyData';
import RatingStars from '../../components/RatingStars.jsx';

export default function ViewRatings() {
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? ratings : ratings.filter((r) => r.mealType === filter);
  const avg = shown.length ? (shown.reduce((s, r) => s + r.stars, 0) / shown.length).toFixed(1) : '—';

  return (
    <div className="page">
      <h1>Student Ratings</h1>
      <p className="muted">Average of shown ratings: <strong>{avg} ⭐</strong></p>

      <div className="filters">
        {['all', 'breakfast', 'lunch', 'snacks', 'dinner'].map((f) => (
          <button key={f} className={`chip chip-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All Meals' : f}
          </button>
        ))}
      </div>

      <table className="table">
        <thead>
          <tr><th>Student</th><th>Meal</th><th>Rating</th><th>Date</th></tr>
        </thead>
        <tbody>
          {shown.map((r) => (
            <tr key={r.id}>
              <td>{r.student}</td>
              <td>{r.mealType}</td>
              <td><RatingStars value={r.stars} /></td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {shown.length === 0 && <p className="muted">No ratings for this meal yet.</p>}
    </div>
  );
}