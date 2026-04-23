import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@theme';

export const THEMES = {
  indigo: { id: 'indigo', name: 'Indigo', primary: '#6366f1', secondary: '#7c3aed' },
  violet: { id: 'violet', name: 'Violet', primary: '#8b5cf6', secondary: '#a855f7' },
  cyan: { id: 'cyan', name: 'Cyan', primary: '#06b6d4', secondary: '#0891b2' },
  emerald: { id: 'emerald', name: 'Emerald', primary: '#10b981', secondary: '#059669' },
  rose: { id: 'rose', name: 'Rose', primary: '#f43f5e', secondary: '#e11d48' },
  amber: { id: 'amber', name: 'Amber', primary: '#f59e0b', secondary: '#d97706' },
} as const;

export type ThemeId = keyof typeof THEMES;
export type AppTheme = (typeof THEMES)[ThemeId];

type ThemeContextValue = {
  theme: AppTheme;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES.indigo,
  themeId: 'indigo',
  setTheme: async () => {},
});

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [themeId, setThemeId] = useState<ThemeId>('indigo');

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((saved) => {
      if (saved && saved in THEMES) setThemeId(saved as ThemeId);
    });
  }, []);

  const setTheme = async (id: ThemeId) => {
    await AsyncStorage.setItem(THEME_KEY, id);
    setThemeId(id);
  };

  return (
    <ThemeContext.Provider value={{ theme: THEMES[themeId], themeId, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);
