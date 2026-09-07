import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Try to parse user from token payload (simple approach for now)
      try {
        const payloadStr = token.split('.')[1];
        if (!payloadStr) throw new Error("Invalid token format");
        const payload = JSON.parse(atob(payloadStr));
        setUser({ id: payload.id || payload.userId, name: payload.name, email: payload.email, role: payload.role });
      } catch (e) {
        console.error("Invalid token", e);
        logout();
      }
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    // Mock login for testing
    if (email === 'test@tsu.ac.th' && password === '123456') {
      const mockUser = { id: 1, name: 'TSU Student', email: 'test@tsu.ac.th', role: 'user' };
      const mockToken = `fake.${btoa(JSON.stringify(mockUser))}.fake`; 
      setToken(mockToken);
      setUser(mockUser);
      return;
    }
    
    if (email === 'admin@tsu.ac.th' && password === '123456') {
      const mockAdmin = { id: 99, name: 'TSU Admin', email: 'admin@tsu.ac.th', role: 'admin' };
      const mockToken = `fake.${btoa(JSON.stringify(mockAdmin))}.fake`; 
      setToken(mockToken);
      setUser(mockAdmin);
      return;
    }

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (name, email, password) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
