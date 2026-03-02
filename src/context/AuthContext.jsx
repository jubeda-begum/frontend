import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const t = localStorage.getItem('hh_token');
    if (t) api.defaults.headers.common.Authorization = `Bearer ${t}`;
    return t;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) setUser({});
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const jwt = res.data.token;
    setToken(jwt);
    localStorage.setItem('hh_token', jwt);
    api.defaults.headers.common.Authorization = `Bearer ${jwt}`;
    setUser(res.data.user);
  };

  const register = async (payload) => {
    const res = await api.post('/auth/register', payload);
    const jwt = res.data.token;
    setToken(jwt);
    localStorage.setItem('hh_token', jwt);
    api.defaults.headers.common.Authorization = `Bearer ${jwt}`;
    setUser(res.data.user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('hh_token');
    delete api.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

