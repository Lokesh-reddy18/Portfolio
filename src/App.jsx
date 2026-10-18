import BackToTop from './components/BackToTop';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Work from './components/Work';
import { sections } from './data/profile';
import { useActiveSection } from './hooks/useActiveSection';
import { useDarkMode } from './hooks/useDarkMode';

const App = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const activeSection = useActiveSection(sections);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-primary focus:text-on-primary"
      >
        Skip to content
      </a>
      <Header activeSection={activeSection} darkMode={darkMode} onToggleTheme={toggleDarkMode} />
      <main id="main">
        <Hero />
        <Work />
        <Skills darkMode={darkMode} />
        <Projects />
        <Contact />
      </main>
      <Footer darkMode={darkMode} />
      <BackToTop />
    </>
  );
};

export default App;
