import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, useEffect, useState, useCallback, createContext, useContext } from 'react';
import { lightTheme, darkTheme } from './theme.config';

// 創建 Context 介面
interface LokiThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const LokiThemeContext = createContext<LokiThemeContextType | undefined>(undefined);

// Hook
export function useLokiTheme() {
  const context = useContext(LokiThemeContext);
  if (context === undefined) {
    throw new Error('useLokiTheme must be used within a MuiProvider');
  }
  return context;
}

interface MuiProviderProps {
  children: React.ReactNode;
}

export const MuiProvider = ({ children }: MuiProviderProps) => {
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

  useEffect(() => {
    // 使用 requestAnimationFrame 來避免阻塞渲染
    requestAnimationFrame(() => {
      document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
      localStorage.setItem('loki-theme', isDark ? 'dark' : 'light');
      console.log('MuiProvider: Theme updated in DOM:', isDark ? 'dark' : 'light');
    });
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      console.log('MuiProvider: Toggling theme from', prev ? 'dark' : 'light', 'to', prev ? 'light' : 'dark');
      return !prev;
    });
  }, []);

  // 添加 useEffect 來追蹤狀態變化
  useEffect(() => {
    console.log('MuiProvider: isDark changed to', isDark);
  }, [isDark]);

  // 使用 useMemo 來避免不必要的主題重新計算
  const currentTheme = useMemo(() => {
    const theme = isDark ? darkTheme : lightTheme;
    console.log('MuiProvider: Creating theme', theme.palette.mode);
    return theme;
  }, [isDark]);

  return (
    <LokiThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </LokiThemeContext.Provider>
  );
};
