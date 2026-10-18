import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { profile, sections } from '../data/profile';
import ShareButton from './ShareButton';
import ThemeToggle from './ThemeToggle';
import { MenuIcon } from './icons';

const label = (section) => section.charAt(0).toUpperCase() + section.slice(1);

const Header = ({ activeSection, darkMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState(null);
  const headerRef = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The highlight pill is one element that slides to the active link, rather than a style per link.
  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[activeSection];
      setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeSection]);

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
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/80 backdrop-blur-xl shadow-[0_1px_0_rgb(var(--md-outline-variant)/0.6)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-3 group">
          <span className="grid place-items-center w-11 h-11 rounded-2xl bg-primary text-on-primary font-display font-bold text-sm transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
            {profile.initials}
          </span>
          <span className="font-display font-semibold text-lg hidden sm:block">Lokesh Reddy</span>
        </a>

        <div className="hidden md:flex items-center gap-3">
          <nav aria-label="Main" className="relative flex items-center gap-1 p-1.5 rounded-full bg-surface-container">
            {indicator && (
              <span
                aria-hidden="true"
                className="absolute top-1.5 bottom-1.5 rounded-full bg-surface-card shadow-sm transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)]"
                style={{ left: indicator.left, width: indicator.width }}
              />
            )}
            {sections.map((section) => (
              <a
                key={section}
                ref={(el) => (linkRefs.current[section] = el)}
                href={`#${section}`}
                aria-current={activeSection === section ? 'location' : undefined}
                className={`relative z-10 px-4 py-2 rounded-full text-[15px] font-medium transition-colors ${
                  activeSection === section ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {label(section)}
              </a>
            ))}
          </nav>
          <ShareButton />
          <ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ShareButton />
          <ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />
          <button
            className="grid place-items-center w-11 h-11 rounded-full text-on-surface hover:bg-surface-high transition-colors"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="md:hidden mx-4 mb-3 p-2 rounded-3xl bg-surface-container shadow-lg animate-fadeIn">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-5 py-3.5 rounded-2xl font-medium transition-colors ${
                activeSection === section ? 'bg-primary-container text-on-primary-container' : 'hover:bg-surface-high'
              }`}
            >
              {label(section)}
            </a>
          ))}
        </nav>
      )}

      <div aria-hidden="true" className="scroll-progress absolute left-0 bottom-0 h-[3px] w-full bg-primary" />
    </header>
  );
};

export default Header;
