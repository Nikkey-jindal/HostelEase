import { menus } from '../../data/dummyData';
import FoodCard from '../../components/FoodCard.jsx';

export default function TodayMenu() {
  const menu = menus[0]; // "today" — replaced by GET /api/menus/today later
  return (
    <div className="page">
      <h1>Today's Food Menu</h1>
      <p className="muted">
        {new Date(menu.date).toLocaleDateString('en-IN', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        })}
      </p>
      <div className="grid-2">
        {menu.meals.map((meal) => (
          <FoodCard key={meal.type} meal={meal} />
        ))}
      </div>
    </div>
  );
}