import React, { createContext, useContext, useEffect, useState } from 'react';
import type { UserProfile } from '../types';
import { db, seedDatabase, logHistory } from '../db';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (identifier: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string, bio?: string, avatar?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await seedDatabase();
        const savedUserId = localStorage.getItem('dreamy_active_user_id');
        if (savedUserId) {
          const current = await db.users.get(savedUserId);
          if (current) {
            setUser(current);
          } else {
            setUser(null);
            localStorage.removeItem('dreamy_active_user_id');
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (identifier: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const allUsers = await db.users.toArray();
      const existing = allUsers.find(
        u => u.name.toLowerCase() === identifier.toLowerCase() || (u.email && u.email.toLowerCase() === identifier.toLowerCase())
      );

      if (existing) {
        if (existing.password && password && existing.password !== password) {
          await logHistory({
            userId: existing.id,
            category: 'auth',
            action: 'signin',
            status: 'fail',
            title: 'Sign In Failed',
            details: `Incorrect password entered for account "${identifier}".`,
            icon: '🔒'
          });
          return false; // Invalid password
        }
        setUser(existing);
        localStorage.setItem('dreamy_active_user_id', existing.id);
        await logHistory({
          userId: existing.id,
          category: 'auth',
          action: 'signin',
          status: 'success',
          title: 'Sign In Success',
          details: `Successfully signed in as "${existing.name}".`,
          icon: '🔑'
        });
        return true;
      } else {
        await logHistory({
          category: 'auth',
          action: 'signin',
          status: 'fail',
          title: 'Sign In Failed',
          details: `No account found matching name/email "${identifier}".`,
          icon: '⚠️'
        });
        return false;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string, 
    email: string, 
    password?: string, 
    bio?: string, 
    avatar?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser: UserProfile = {
        id: 'user_' + Date.now(),
        name,
        email,
        password: password || '',
        avatar: avatar || '🌟',
        bio: bio || 'Living my dreams and recording memories.',
        createdAt: new Date().toISOString(),
      };
      await db.users.add(newUser);
      await logHistory({
        userId: newUser.id,
        category: 'auth',
        action: 'signup',
        status: 'success',
        title: 'Account Created',
        details: `Successfully created new profile for "${name}".`,
        icon: '🎉'
      });
      return true;
    } catch (err) {
      console.error('Signup error:', err);
      await logHistory({
        category: 'auth',
        action: 'signup',
        status: 'fail',
        title: 'Account Creation Failed',
        details: `Error registering profile for "${name}".`,
        icon: '❌'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (user) {
      logHistory({
        userId: user.id,
        category: 'auth',
        action: 'logout',
        status: 'success',
        title: 'Signed Out',
        details: `Signed out of profile "${user.name}".`,
        icon: '🚪'
      });
    }
    setUser(null);
    localStorage.removeItem('dreamy_active_user_id');
  };

  const updateProfile = async (updated: Partial<UserProfile>) => {
    if (!user) return;
    const newProfile = { ...user, ...updated };
    await db.users.update(user.id, updated);
    setUser(newProfile);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
