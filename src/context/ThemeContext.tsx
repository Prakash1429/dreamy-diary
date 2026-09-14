import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemePreset = 'default' | 'lavender' | 'coral' | 'matcha' | 'dark';

interface ThemeContextType {
  theme: 'light' | 'dark';
  preset: ThemePreset;
  setPreset: (preset: ThemePreset) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preset, setPresetState] = useState<ThemePreset>(() => {
    const savedPreset = localStorage.getItem('dreamy_theme_preset') as ThemePreset;
    if (['default', 'lavender', 'coral', 'matcha', 'dark'].includes(savedPreset)) {
      return savedPreset;
    }
    const savedTheme = localStorage.getItem('dreamy_theme');
    if (savedTheme === 'dark') return 'dark';
    return 'default';
  });

  const theme: 'light' | 'dark' = preset === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-lavender', 'theme-coral', 'theme-matcha');

    if (preset === 'dark') {
      root.classList.add('dark');
    } else if (preset === 'lavender') {
      root.classList.add('theme-lavender');
    } else if (preset === 'coral') {
      root.classList.add('theme-coral');
    } else if (preset === 'matcha') {
      root.classList.add('theme-matcha');
    }

    localStorage.setItem('dreamy_theme_preset', preset);
    localStorage.setItem('dreamy_theme', theme);
  }, [preset, theme]);

  const setPreset = (newPreset: ThemePreset) => {
    setPresetState(newPreset);
  };

  const toggleTheme = () => {
    setPresetState((prev) => (prev === 'dark' ? 'default' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, preset, setPreset, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
