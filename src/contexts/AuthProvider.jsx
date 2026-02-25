'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const verifyUser = async () => {
      const token =
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('authToken');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
        }
      } catch {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
      }

      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
      return { success: true };
    }

    return { success: false, error: data.error };
  };

  const logout = async () => {
    const token =
      localStorage.getItem('authToken') ||
      sessionStorage.getItem('authToken');

    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}