import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const res = login(form.email.trim(), form.password, role);
    if (!res.success) return setError(res.message);
    navigate(role === 'admin' ? '/admin' : '/student');
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">🍜 HostelBites</div>
        <h1>Welcome back</h1>
        <p className="muted">Hostel Food Management System</p>

        <div className="role-toggle">
          <button className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}>
            🎓 Student
          </button>
          <button className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}>
            🛡️ Admin
          </button>
        </div>

        <form onSubmit={submit} className="form">
          <label>Email
            <input type="email" name="email" value={form.email} onChange={change}
              placeholder="you@hostel.com" required />
          </label>
          <label>Password
            <input type="password" name="password" value={form.password} onChange={change}
              placeholder="••••••••" required minLength={6} />
          </label>
          {error && <p className="error-text">{error}</p>}
          <button className="btn btn-primary btn-block" type="submit">Login</button>
        </form>

        {role === 'student' && (
          <p className="muted auth-hint">
            New student? <Link to="/register">Create an account</Link>
          </p>
        )}
        <div className="demo-box">
          <strong>Demo credentials</strong>
          <span>Student: student@hostel.com / student123</span>
          <span>Admin: admin@hostel.com / admin123</span>
        </div>
      </div>
    </div>
  );
}