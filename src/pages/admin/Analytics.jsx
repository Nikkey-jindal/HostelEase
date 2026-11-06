import { feedbacks, ratings, MEAL_TYPES } from '../../data/dummyData';

export default function Analytics() {
  const byCategory = feedbacks.reduce((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {});
  const maxCat = Math.max(...Object.values(byCategory), 1);

  const byMeal = MEAL_TYPES.map((m) => {
    const rs = ratings.filter((r) => r.mealType === m.key);
    return { ...m, avg: rs.length ? rs.reduce((s, r) => s + r.stars, 0) / rs.length : 0, count: rs.length };
  });

  return (
    <div className="page">
      <h1>Feedback Analytics</h1>
      <p className="muted">What students are talking about, and how meals score.</p>

      <div className="two-col">
        <div className="card">
          <h2>Feedback by Category</h2>
          {Object.entries(byCategory).map(([cat, n]) => (
            <div key={cat} className="bar-row">
              <span className="bar-label">{cat}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(n / maxCat) * 100}%` }} />
              </div>
              <span className="bar-value">{n}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <h2>Average Rating per Meal</h2>
          {byMeal.map((m) => (
            <div key={m.key} className="bar-row">
              <span className="bar-label">{m.emoji} {m.label}</span>
              <div className="bar-track">
                <div className="bar-fill orange" style={{ width: `${(m.avg / 5) * 100}%` }} />
              </div>
              <span className="bar-value">{m.avg.toFixed(1)} ({m.count})</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="mt">All Feedback</h2>
      <ul className="list">
        {feedbacks.map((f) => (
          <li key={f.id} className="list-row">
            <div><span className="chip">{f.category}</span> {f.message}</div>
            <small className="muted">— {f.student}, {f.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}