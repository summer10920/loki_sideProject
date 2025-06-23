import { createContext } from 'react';

// 主題 Context 介面
export interface LokiThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// 建立 Context
export const LokiThemeContext = createContext<LokiThemeContextType | undefined>(
  undefined
); 