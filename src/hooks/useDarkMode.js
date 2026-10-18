import { useEffect, useState } from 'react';

const STORAGE_KEY = 'darkMode';

function readInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) return saved === 'true';
  } catch {
    // Storage can be blocked (private mode); fall back to the OS preference.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // Ignore: the toggle still works for this visit.
      }
      return next;
    });
  };

  return [darkMode, toggleDarkMode];
}
