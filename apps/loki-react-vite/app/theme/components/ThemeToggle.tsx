import { Button } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useLokiTheme } from '../hooks/useLokiTheme';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useLokiTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outlined"
      startIcon={isDark ? <LightMode /> : <DarkMode />}
      className="transition-all duration-200"
    >
      {isDark ? '淺色模式' : '深色模式'}
    </Button>
  );
}; 