import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', rollNumber: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    const res = register(form.name.trim(), form.rollNumber.trim(), form.email.trim(), form.password);
    if (!res.success) return setError(res.message);
    navigate('/login');
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">🍜 HostelBites</div>
        <h1>Create account</h1>
        <p className="muted">Register as a hostel student</p>
        <form onSubmit={submit} className="form">
          <label>Full Name
            <input name="name" value={form.name} onChange={change} placeholder="Aarav Sharma" required />
          </label>
          <label>Roll Number
            <input name="rollNumber" value={form.rollNumber} onChange={change} placeholder="H2024042" required />
          </label>
          <label>Email
            <input type="email" name="email" value={form.email} onChange={change} placeholder="you@hostel.com" required />
          </label>
          <label>Password
            <input type="password" name="password" value={form.password} onChange={change}
              placeholder="Min 6 characters" required minLength={6} />
          </label>
          <label>Confirm Password
            <input type="password" name="confirm" value={form.confirm} onChange={change} required minLength={6} />
          </label>
          {error && <p className="error-text">{error}</p>}
          <button className="btn btn-primary btn-block" type="submit">Register</button>
        </form>
        <p className="muted auth-hint">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}