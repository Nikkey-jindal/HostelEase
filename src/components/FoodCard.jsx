import RatingStars from './RatingStars.jsx';

export default function FoodCard({ meal, avgRating, count, action }) {
  const meta = { breakfast: { emoji: '🌅', time: '7:30 – 9:30 AM' },
                 lunch: { emoji: '🍛', time: '12:30 – 2:30 PM' },
                 snacks: { emoji: '☕', time: '5:00 – 6:00 PM' },
                 dinner: { emoji: '🌙', time: '8:00 – 10:00 PM' } };
  const m = meta[meal.type] || {};

  return (
    <article className="food-card">
      <div className="food-emoji">{m.emoji}</div>
      <div className="food-body">
        <div className="food-head">
          <h3>{meal.type[0].toUpperCase() + meal.type.slice(1)}</h3>
          <span className="food-time">{m.time}</span>
        </div>
        <ul className="food-items">
          {meal.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="food-foot">
          {avgRating != null ? (
            <>
              <RatingStars value={Math.round(avgRating)} />
              <span className="muted">
                {avgRating.toFixed(1)} ({count} rating{count !== 1 ? 's' : ''})
              </span>
            </>
          ) : <span className="muted">No ratings yet</span>}
          {action}
        </div>
      </div>
    </article>
  );
}