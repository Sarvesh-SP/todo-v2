import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

const AUTH_KEY = '@user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(AUTH_KEY)
      .then((data) => {
        if (data) setUser(JSON.parse(data));
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error?: string }> => {
      if (!email.trim() || !password.trim()) {
        return { error: 'Email and password are required' };
      }
      const u: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email: email.trim().toLowerCase(),
      };
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(u));
      setUser(u);
      return {};
    },
    [],
  );

  const signUp = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      confirmPassword: string,
    ): Promise<{ error?: string }> => {
      if (!name.trim() || !email.trim() || !password.trim()) {
        return { error: 'All fields are required' };
      }
      if (password !== confirmPassword) {
        return { error: 'Passwords do not match' };
      }
      if (password.length < 6) {
        return { error: 'Password must be at least 6 characters' };
      }
      const u: User = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
      };
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(u));
      setUser(u);
      return {};
    },
    [],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  return { user, loading, signIn, signUp, signOut };
}
