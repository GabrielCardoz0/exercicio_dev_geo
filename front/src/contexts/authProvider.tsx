import { useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext';
import type { IUser } from '@/assets/interfaces';


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post<{ token: string }>('http://localhost:5000/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      // 2. Buscar dados completos do usuário
      const userResponse = await axios.get('http://localhost:5000/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(userResponse.data.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('token');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}