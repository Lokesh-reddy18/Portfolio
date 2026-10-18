import { MoonIcon, SunIcon } from './icons';
import Ripple from './Ripple';

const ThemeToggle = ({ darkMode, onToggle }) => (
  <Ripple
    onClick={onToggle}
    className="grid place-items-center w-11 h-11 rounded-full bg-surface-high text-on-surface-variant hover:text-primary transition-colors"
    aria-label="Dark mode"
    aria-pressed={darkMode}
    title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    <span key={String(darkMode)} className="animate-fadeIn">
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </span>
  </Ripple>
);

export default ThemeToggle;
