import { createContext, useContext, useState } from 'react';
import { users } from '../data/dummyData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hfms_user')) || null; }
    catch { return null; }
  });

  const login = (email, password, role) => {
    const found = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (!found) return { success: false, message: 'Invalid credentials for this role.' };
    const { password: _p, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('hfms_user', JSON.stringify(safeUser));
    return { success: true };
  };

  const register = (name, rollNumber, email, password) => {
    if (users.some((u) => u.email === email))
      return { success: false, message: 'Email already registered.' };
    const newUser = {
      id: Date.now(), name, rollNumber, email, password, role: 'student',
    };
    users.push(newUser); // dummy only — replaced by POST /api/auth/register later
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hfms_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);