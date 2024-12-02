import { useState, useEffect } from 'react';
import { authService } from '../services/auth/authService';
import { User, SignUpData, SignInData } from '../types/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (data: SignUpData) => {
    try {
      setError(null);
      await authService.signUp(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
      throw err;
    }
  };

  const signIn = async (data: SignInData) => {
    try {
      setError(null);
      const user = await authService.signIn(data);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await authService.signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign out');
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut
  };
};