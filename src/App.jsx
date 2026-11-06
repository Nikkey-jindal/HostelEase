import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import TodayMenu from './pages/student/TodayMenu.jsx';
import FoodRating from './pages/student/FoodRating.jsx';
import FeedbackForm from './pages/student/FeedbackForm.jsx';
import StudentComplaints from './pages/student/Complaints.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageMenu from './pages/admin/ManageMenu.jsx';
import ViewRatings from './pages/admin/ViewRatings.jsx';
import ManageComplaints from './pages/admin/ManageComplaints.jsx';
import Analytics from './pages/admin/Analytics.jsx';

function Home() {
  const role = JSON.parse(localStorage.getItem('hfms_user'))?.role;
  if (role === 'admin') return <Navigate to="/admin" replace />;
  if (role === 'student') return <Navigate to="/student" replace />;
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute role="student" />}>
        <Route element={<Layout />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/menu" element={<TodayMenu />} />
          <Route path="/student/rate" element={<FoodRating />} />
          <Route path="/student/feedback" element={<FeedbackForm />} />
          <Route path="/student/complaints" element={<StudentComplaints />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/menu" element={<ManageMenu />} />
          <Route path="/admin/ratings" element={<ViewRatings />} />
          <Route path="/admin/complaints" element={<ManageComplaints />} />
          <Route path="/admin/analytics" element={<Analytics />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}