import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { postToAndroid } from '../lib/nativeBridge';

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
    // Inside the Android app, the native status bar and theme follow the site's choice.
    postToAndroid('theme', { dark: darkMode });
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', darkMode ? '#19120C' : '#FFF8F3');
  }, [darkMode]);

  const applyTheme = (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // Ignore: the toggle still works for this visit.
    }
    setDarkMode(next);
  };

  // Pass the click event to spread the new theme out from the pointer.
  const toggleDarkMode = (event) => {
    const next = !darkMode;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      return;
    }
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const root = document.documentElement.style;
    root.setProperty('--theme-x', `${x}px`);
    root.setProperty('--theme-y', `${y}px`);
    root.setProperty('--theme-r', `${radius}px`);
    // flushSync so the DOM has the new theme when the transition takes its "after" snapshot.
    document.startViewTransition(() => {
      flushSync(() => applyTheme(next));
      document.documentElement.classList.toggle('dark', next);
    });
  };

  return [darkMode, toggleDarkMode];
}
