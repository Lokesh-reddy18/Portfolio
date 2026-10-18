import { useEffect, useRef, useState } from 'react';
import { profile, sections } from '../data/profile';
import ThemeToggle from './ThemeToggle';
import { MenuIcon } from './icons';

const label = (section) => section.charAt(0).toUpperCase() + section.slice(1);

const Header = ({ activeSection, darkMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e) => e.key === 'Escape' && setIsMenuOpen(false);
    const onPointerDown = (e) => !headerRef.current?.contains(e.target) && setIsMenuOpen(false);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className="fixed w-full z-50 transition-colors duration-300 bg-white shadow-md dark:bg-gray-900 dark:shadow-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-blue-600">{profile.initials}</a>

          <div className="hidden md:flex items-center space-x-6">
            <nav aria-label="Main" className="flex space-x-8">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  aria-current={activeSection === section ? 'location' : undefined}
                  className={`transition-colors font-semibold tracking-wide px-2 py-1 ${
                    activeSection === section
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                  }`}
                >
                  {label(section)}
                </a>
              ))}
            </nav>
            <ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />
            <button
              className="p-2 rounded-md transition-colors focus:outline-none text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden shadow-lg animate-fadeIn bg-white dark:bg-gray-800">
          <nav className="flex flex-col px-4 py-2 space-y-2">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-full font-medium text-center transition-all duration-200 ${
                  activeSection === section
                    ? 'text-blue-700 bg-gradient-to-r from-blue-100 to-purple-100 shadow dark:text-white dark:from-blue-700 dark:to-purple-700'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700'
                }`}
              >
                {label(section)}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
