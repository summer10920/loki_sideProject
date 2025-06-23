import { Button } from '@mui/material';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useLokiTheme } from '../hooks/useLokiTheme';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useLokiTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outlined"
      startIcon={isDark ? <MdLightMode /> : <MdDarkMode />}
      className="transition-all duration-200"
    >
      {isDark ? '淺色模式' : '深色模式'}
    </Button>
  );
};
