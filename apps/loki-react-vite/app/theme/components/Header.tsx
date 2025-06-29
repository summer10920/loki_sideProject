import { FaReact, FaMoon, FaSun } from 'react-icons/fa';
import { useLokiTheme } from '../hooks/useLokiTheme';

export const Header = () => {
  const { isDark, toggleTheme, mounted } = useLokiTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-100 dark:bg-gray-800 shadow flex items-center justify-between px-4 z-50">
      <FaReact className="h-10 w-10 text-[#61dafb]" />
      <h1 className="text-2xl font-semibold">Loki-Website</h1>
      <nav className="flex items-center gap-4">
        <button
          aria-label="Toggle Dark Mode"
          className="w-6 h-6"
          onClick={toggleTheme}
          suppressHydrationWarning
        >
          {!mounted ? (
            // 載入中顯示占位符，避免 hydration mismatch
            <div className="w-5 h-5" />
          ) : isDark ? (
            <FaMoon className="w-5 h-5" />
          ) : (
            <FaSun className="w-5 h-5 text-amber-400" />
          )}
        </button>
      </nav>
    </header>
  );
};
