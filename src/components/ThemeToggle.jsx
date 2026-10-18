import { MoonIcon, SunIcon } from './icons';

const ThemeToggle = ({ darkMode, onToggle }) => (
  <button
    onClick={onToggle}
    className="p-2 rounded-full transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-yellow-300 dark:hover:bg-gray-600"
    aria-label="Dark mode"
    aria-pressed={darkMode}
    title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {darkMode ? <SunIcon /> : <MoonIcon />}
  </button>
);

export default ThemeToggle;
