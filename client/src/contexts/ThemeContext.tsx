import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type ThemeMode = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: ResolvedTheme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === 'system' ? getSystemTheme() : mode;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem('theme-mode');
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    // 旧バージョンの 'theme' キーからの移行
    const legacy = localStorage.getItem('theme');
    if (legacy === 'light' || legacy === 'dark') return legacy;
    return 'system';
  });
  const [theme, setTheme] = useState<ResolvedTheme>(() => resolveTheme(
    (() => {
      const stored = localStorage.getItem('theme-mode');
      if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
      const legacy = localStorage.getItem('theme');
      if (legacy === 'light' || legacy === 'dark') return legacy;
      return 'system';
    })()
  ));

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem('theme-mode', newMode);
    setTheme(resolveTheme(newMode));
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    setMode(next);
  }, [theme, setMode]);

  // システムテーマ変更の監視
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (mode === 'system') setTheme(getSystemTheme());
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [mode]);

  // HTML要素にdarkクラスを適用
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
