import { Link } from 'react-router-dom';
import { menus, complaints, feedbacks } from '../../data/dummyData';
import { useAuth } from '../../context/AuthContext';
import FoodCard from '../../components/FoodCard.jsx';
import StatCard from '../../components/StatCard.jsx';

export default function StudentDashboard() {
  const { user } = useAuth();
  const today = menus[0];
  const myComplaints = complaints.filter((c) => c.student === user.name);

  return (
    <div className="page">
      <h1>Hi, {user.name.split(' ')[0]} 👋</h1>
      <p className="muted">Here's what's cooking today.</p>

      <div className="grid-4">
        <StatCard icon="🍽️" label="Meals Today" value={today.meals.length} accent="primary" />
        <StatCard icon="⭐" label="Your Ratings" value="—" accent="orange" />
        <StatCard icon="💬" label="Feedbacks Sent" value={feedbacks.filter((f) => f.student === user.name).length} accent="green" />
        <StatCard icon="⚠️" label="Open Complaints" value={myComplaints.filter((c) => c.status !== 'resolved').length} accent="red" />
      </div>

      <div className="section-head">
        <h2>Today's Highlights</h2>
        <Link className="btn btn-ghost" to="/student/menu">View full menu →</Link>
      </div>
      <div className="grid-2">
        {today.meals.slice(0, 2).map((meal) => (
          <FoodCard key={meal.type} meal={meal} />
        ))}
      </div>

      <div className="section-head">
        <h2>Your Recent Complaints</h2>
        <Link className="btn btn-ghost" to="/student/complaints">Manage →</Link>
      </div>
      {myComplaints.length === 0 ? (
        <p className="muted">No complaints raised yet. 🎉</p>
      ) : (
        <ul className="list">
          {myComplaints.slice(0, 3).map((c) => (
            <li key={c.id} className="list-row">
              <div><strong>{c.title}</strong><small className="muted"> {c.date}</small></div>
              <span className={`chip status-${c.status}`}>{c.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}