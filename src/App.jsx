import About from './components/About';
import BackToTop from './components/BackToTop';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { sections } from './data/profile';
import { useActiveSection } from './hooks/useActiveSection';
import { useDarkMode } from './hooks/useDarkMode';

const App = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const activeSection = useActiveSection(sections);

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-blue-600 focus:text-white"
      >
        Skip to content
      </a>
      <Header activeSection={activeSection} darkMode={darkMode} onToggleTheme={toggleDarkMode} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills darkMode={darkMode} />
        <Projects />
        <Contact />
      </main>
      <Footer darkMode={darkMode} />
      <BackToTop />
    </div>
  );
};

export default App;
