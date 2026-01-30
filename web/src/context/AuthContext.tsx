'use client';

import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api, setAuthToken, clearAuthToken, getAuthToken } from '@/lib/api';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth from localStorage on mount (client-side only)
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getAuthToken();
        
        if (token) {
          // Validate token by fetching user data
          const response = await api.get('/auth/me');
          setUser(response.data.user);
        }
      } catch (error) {
        // Token is invalid or expired, clear it
        clearAuthToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback((token: string, userData: User) => {
    setAuthToken(token);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    clearAuthToken();
    setUser(null);
    router.push('/login');
  }, [router]);

  const updateUser = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const contextValue = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
