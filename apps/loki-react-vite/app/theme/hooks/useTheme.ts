import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // 從 localStorage 讀取或使用系統偏好
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
}
