import useThemeStore from '../App/ThemeStore';
import { useEffect } from 'react';

export default function ThemeToggle() {
 const theme = useThemeStore(s => s.theme);
const toggleTheme = useThemeStore(s => s.toggleTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}