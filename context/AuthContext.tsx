'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string | null, password: string | null, provider?: string) => Promise<void>;
  register: (name: string | null, email: string | null, password: string | null, provider?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id || '',
        name: session.user.name || '',
        email: session.user.email || '',
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (email: string | null, password: string | null, provider?: string) => {
    try {
      if (provider === 'google') {
        await signIn('google', { callbackUrl: '/' });
        return;
      }

      if (email && password) {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }
      }
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  };

  const register = async (name: string | null, email: string | null, password: string | null, provider?: string) => {
    try {
      if (provider === 'google') {
        await signIn('google', { callbackUrl: '/' });
        return;
      }

      if (name && email && password) {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        // After successful registration, sign in the user
        await signIn('credentials', {
          email,
          password,
          redirect: false,
        });
      }
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 