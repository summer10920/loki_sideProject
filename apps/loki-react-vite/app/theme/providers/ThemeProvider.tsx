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
    fontFamily: '"Roboto", "Noto Sans TC", "system-ui", "sans-serif"',
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
  // 修復 hydration mismatch - 統一初始值
  const [isDark, setIsDark] = useState<boolean>(false); // 統一預設為 false
  const [mounted, setMounted] = useState(false);

  // 客戶端載入後設定實際值
  useEffect(() => {
    setMounted(true);

    // 讀取實際的主題偏好
    const saved = localStorage.getItem('loki-theme');
    if (saved) {
      setIsDark(saved === 'dark');
    } else {
      const systemDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDark(systemDark);
    }
  }, []);

  // 監聽系統主題變化
  useEffect(() => {
    if (!mounted) return;

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
  }, [mounted]);

  // 更新 DOM 和 localStorage
  useEffect(() => {
    if (!mounted) return;

    // 使用 requestAnimationFrame 來避免阻塞渲染
    requestAnimationFrame(() => {
      document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
      localStorage.setItem('loki-theme', isDark ? 'dark' : 'light');
    });
  }, [isDark, mounted]);

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
        purple: {
          main: isDark ? '#ba68c8' : '#9c27b0',
          light: isDark ? '#ce93d8' : '#ba68c8',
          dark: isDark ? '#7b1fa2' : '#6a1b9a',
          contrastText: '#ffffff',
        },
        orange: {
          main: isDark ? '#ffb74d' : '#ff9800',
          light: isDark ? '#ffcc02' : '#ffb74d',
          dark: isDark ? '#f57c00' : '#e65100',
          contrastText: '#000000',
        },
        teal: {
          main: isDark ? '#4db6ac' : '#009688',
          light: isDark ? '#80cbc4' : '#4db6ac',
          dark: isDark ? '#00695c' : '#004d40',
          contrastText: '#ffffff',
        },
        lokiRed: {
          main: isDark ? '#f87171' : '#dc2626',
          light: isDark ? '#fca5a5' : '#ef4444',
          dark: isDark ? '#b91c1c' : '#991b1b',
          contrastText: '#ffffff',
        },
        lokiBlue: {
          main: isDark ? '#60a5fa' : '#2563eb',
          light: isDark ? '#93c5fd' : '#3b82f6',
          dark: isDark ? '#1d4ed8' : '#1e40af',
          contrastText: '#ffffff',
        },
        lokiGreen: {
          main: isDark ? '#4ade80' : '#16a34a',
          light: isDark ? '#86efac' : '#22c55e',
          dark: isDark ? '#15803d' : '#14532d',
          contrastText: '#ffffff',
        },
      },
    });
  }, [isDark]);

  return (
    <LokiThemeContext.Provider value={{ isDark, toggleTheme, mounted }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </LokiThemeContext.Provider>
  );
};
