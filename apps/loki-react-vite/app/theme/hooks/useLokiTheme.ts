import { useContext } from 'react';
import { LokiThemeContext } from '../context/LokiThemeContext';

// Hook
export function useLokiTheme() {
  const context = useContext(LokiThemeContext);
  if (context === undefined) {
    throw new Error('useLokiTheme must be used within a LokiThemeProvider');
  }
  return context;
} 