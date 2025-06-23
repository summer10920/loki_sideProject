import { useEffect, useState, useCallback, ReactNode, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { LokiThemeContext } from '../context/LokiThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

// 主題配置
const baseTheme = {
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // 主題狀態管理
  const [isDark, setIsDark] = useState<boolean>(() => {
    // 從 localStorage 讀取或使用系統偏好
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('loki-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // 監聽系統主題變化
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在沒有手動設定時才跟隨系統
      const saved = localStorage.getItem('loki-theme');
      if (!saved) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 更新 DOM 和 localStorage
  useEffect(() => {
    // 使用 requestAnimationFrame 來避免阻塞渲染
    requestAnimationFrame(() => {
      document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
      localStorage.setItem('loki-theme', isDark ? 'dark' : 'light');
    });
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // 建立 Material-UI 主題
  const muiTheme = useMemo(() => {
    return createTheme({
      ...baseTheme,
      palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
          main: isDark ? '#90caf9' : '#1976d2',
        },
        secondary: {
          main: isDark ? '#f48fb1' : '#dc004e',
        },
        background: {
          default: isDark ? '#121212' : '#f5f5f5',
          paper: isDark ? '#1e1e1e' : '#ffffff',
        },
        text: {
          primary: isDark ? '#ffffff' : '#000000',
          secondary: isDark ? '#aaaaaa' : '#666666',
        },
      },
    });
  }, [isDark]);

  return (
    <LokiThemeContext.Provider value={{ isDark, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </LokiThemeContext.Provider>
  );
};
