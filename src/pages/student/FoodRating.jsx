import { useState } from 'react';
import { menus, MEAL_TYPES } from '../../data/dummyData';
import FoodCard from '../../components/FoodCard.jsx';
import RatingStars from '../../components/RatingStars.jsx';

export default function FoodRating() {
  const today = menus[0];
  const [ratings, setRatings] = useState({}); // { mealType: stars }
  const [saved, setSaved] = useState(false);

  const setRating = (type, stars) => {
    setRatings((r) => ({ ...r, [type]: stars }));
    setSaved(false);
  };

  const submit = (e) => {
    e.preventDefault();
    // TODO: POST /api/ratings (one per meal type)
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page">
      <h1>Rate Today's Food</h1>
      <p className="muted">Your feedback helps the kitchen improve. 🍳</p>

      <form onSubmit={submit} className="grid-2">
        {today.meals.map((meal) => (
          <div key={meal.type} className="rate-card card">
            <div className="food-head">
              <h3>{MEAL_TYPES.find((m) => m.key === meal.type)?.emoji} {meal.type[0].toUpperCase() + meal.type.slice(1)}</h3>
            </div>
            <p className="muted">{meal.items.join(' · ')}</p>
            <RatingStars value={ratings[meal.type] || 0} onChange={(n) => setRating(meal.type, n)} size={28} />
          </div>
        ))}
        <div className="form-footer">
          <button className="btn btn-primary" type="submit" disabled={Object.keys(ratings).length === 0}>
            Submit Ratings
          </button>
          {saved && <span className="success-text">✅ Thanks! Ratings submitted.</span>}
        </div>
      </form>

      <h2 className="mt">Kitchen's Picks Today</h2>
      <div className="grid-2">
        {today.meals.slice(0, 2).map((meal) => (
          <FoodCard key={meal.type} meal={meal} />
        ))}
      </div>
    </div>
  );
}