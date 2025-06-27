import React, { useState, useEffect } from 'react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check for system preference and user preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    
    if (savedTheme !== null) {
      // User has a saved preference
      setDarkMode(savedTheme === 'true');
    } else {
      // No saved preference, use system default
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemPrefersDark);
    }
  }, []);

  // Update local storage when dark mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Copy NPX command to clipboard
  const npxCommand = "npx kolli-lokesh-reddy";
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(npxCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Projects data from resume
  const projects = [
    {
      title: "Chess Master - Online Chess Platform",
      description: "Developed a full-stack chess platform with real-time multiplayer, puzzles and AI integration. Engineered real-time game functionality using Socket.IO with move validation and game state management.",
      technologies: ["React.js", "Node.js", "Socket.IO", "MongoDB", "Redux", "Tailwind CSS", "JWT", "Chess.js"],
      image: "/projects/chess.png",
      demoUrl: "https://chess-frontend-iota-two.vercel.app",
      githubUrl: "https://github.com/Lokesh-reddy18/Chess-frontend"
    },
    {
      title: "JobQuest - MERN Stack Job Portal",
      description: "Built a job portal for job seekers to search/apply and recruiters to post/manage listings. Implemented secure authentication, job search filters, and recruiter dashboards.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "Clerk"],
      image: "/projects/job_quest.png",
      demoUrl: "https://job-quest-eight.vercel.app",
      githubUrl: "https://github.com/Lokesh-reddy18/JobQuest"
    },
    {
      title: "Dijkstra Travel Planner - Route Optimization System",
      description: "Developed a travel route planner using Dijkstra's algorithm for optimal paths. Implemented efficient graph data structures and priority queue optimization with Google Maps API integration.",
      technologies: ["C++", "Graph Algorithms", "Priority Queues", "Google Maps API", "HTML"],
      image: "/projects/dijkstra.png",
      demoUrl: "https://github.com/Lokesh-reddy18/Dijkstra-Travel-Planner",
      githubUrl: "https://github.com/Lokesh-reddy18/Dijkstra-Travel-Planner"
    }
  ];

  const handleScroll = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeDownload = () => {
    // You can replace this URL with your actual resume file
    const resumeUrl = '/resume.pdf'; // Place your resume.pdf in the public folder
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Kolli_Lokesh_Reddy_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Lokesh-reddy18',
      color: 'hover:text-gray-400',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kolli-lokesh-reddy/',
      color: 'hover:text-blue-400',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.962 0-1.74-.79-1.74-1.764s.778-1.764 1.74-1.764 1.74.79 1.74 1.764-.778 1.764-1.74 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:kollilokeshreddy18@gmail.com',
      color: 'hover:text-green-400',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className={darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}>
      {/* Header/Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${darkMode ? 'bg-gray-800 shadow-gray-700' : 'bg-white shadow-md'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">KLR</h1>
            </div>
            
            {/* Desktop Navigation and Theme Toggle - Grouped together */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-8">
                {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
                  <a 
                    key={section}
                    href={`#${section}`}  
                    onClick={() => handleScroll(section)
                    }
                    className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors ${activeSection === section ? 'text-blue-600 font-medium' : ''}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                ))}
              </nav>
              
              {/* Theme Toggle - Close to navigation */}
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Mobile - Theme Toggle and Menu Button */}
            <div className="flex items-center space-x-4 md:hidden">
              {/* Theme Toggle for Mobile */}
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg animate-fadeIn`}>
            <nav className="flex flex-col px-4 py-2 space-y-4">
              {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
                <a 
                  key={section}
                  href={`#${section}`} 
                  onClick={() => handleScroll(section)}
                  className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors ${activeSection === section ? 'text-blue-600 font-medium' : ''} py-2`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className={`min-h-screen flex items-center ${darkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} pt-20`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-center md:text-left">
                Hi, I'm Kolli Lokesh Reddy
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 text-center md:text-left text-sm sm:text-base`}>
                A passionate developer with expertise in full-stack development and competitive programming.
                Currently seeking placement opportunities to contribute to innovative software projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <a
                  href="#projects"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200 text-center"
                >
                  View Projects
                </a>
                <button
                  onClick={handleResumeDownload}
                  className={`${darkMode ? 'bg-gray-800 border border-blue-500 text-blue-400 hover:bg-gray-700' : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'} px-6 py-3 rounded-md transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200 flex items-center justify-center space-x-2`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Resume</span>
                </button>
                <a
                  href="#contact"
                  className={`${darkMode ? 'bg-gray-800 border border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'} px-6 py-3 rounded-md transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200 text-center`}
                >
                  Contact Me
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
              <div className="relative">
                <img
                  src="/projects/myimage.png"
                  alt="Profile"
                  className="rounded-lg shadow-lg w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-8 rounded-lg shadow-md h-full`}>
                  <h3 className="text-xl font-semibold mb-4">Personal Introduction</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                    I'm a B.Tech Computer Science student at NIT Silchar with a CGPA of 7.83. I've developed a strong foundation 
                    in programming, algorithms, and software development principles through academic projects and internships.
                  </p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                    My internship at NIT Silchar involved developing MedSync, a healthcare appointment system using modern web technologies.
                    I'm actively seeking placement opportunities to apply my technical skills in real-world scenarios.
                  </p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                    I'm particularly interested in full-stack development and competitive programming.
                    I've achieved Knight rank on LeetCode and have consistently performed well in coding competitions.
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-8 rounded-lg shadow-md h-full`}>
                  <h3 className="text-xl font-semibold mb-6">Education & Experience</h3>
                  
                  <div className="mb-8">
                    <h4 className="font-medium mb-3">Education</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span>National Institute of Technology, Silchar</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span>B.Tech - Computer Science & Engineering</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span>CGPA: 7.83 | 2022 - Present</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Experience</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <div>
                          <strong>Satyendra Nath Bose Research Intern</strong><br />
                          <em>NIT Silchar</em><br />
                          June 2025 – Present
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15.75c-2.648 0-5.195-.496-7.594-1.437L2 15.75V13.5A23.93 23.93 0 0012 11.25c2.648 0 5.195.496 7.594 1.437l.406.163z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1.5m0 15V18m-7.5-7.5h1.5m15 0h1.5m-1.5 0h-1.5m-15 0h1.5" />
                        </svg>
                        <div>
                          <strong>Technologies Used</strong><br />
                          React.js, Tailwind CSS, Node.js, Express, MongoDB, JWT, Stripe
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Skills</h2>

          <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-8 rounded-lg shadow-md`}>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                // Languages
                { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"  },
                { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"  },
                { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  },
                { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  },
                { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  },
                { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"  },
                
                // Frameworks & Tools
                { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg"  },
                { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg"  },
                { name: "Express.js", icon: "/icons/express.svg" }, // Fallback
                { name: "TailwindCSS", icon: "/icons/tailwind.svg" },
                { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain-wordmark.svg" },
                { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg" },
                { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg" },
                { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
                { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" }
              ].map((skill, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-600' : 'bg-blue-100 hover:bg-blue-200'
                  } text-sm font-medium transition-all transform hover:scale-105 cursor-pointer`}
                  title={skill.name}
                >
                  <img src={skill.icon} alt={skill.name} className="w-5 h-5" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="relative">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={`${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} text-sm px-2 py-1 rounded`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400 flex items-center group" 
                    > 
                      <span className="mr-1">View Demo</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400 flex items-center group"
                    >
                      <span className="mr-1">GitHub</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href="https://github.com/Lokesh-reddy18" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md transition-colors inline-flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View All Projects on GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${darkMode ? 'from-white to-blue-200' : 'from-slate-900 to-blue-800'} bg-clip-text text-transparent`}>
                Get In Touch
              </h2>
              <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Let's discuss opportunities, projects, or collaborations
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'} mb-6`}>
                    Let's Connect
                  </h3>
                  <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'} leading-relaxed mb-8`}>
                    I'm always open to discussing new opportunities, interesting projects, 
                    internships, or just having a chat about technology and development. 
                    Feel free to reach out through any of the channels below.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Email</h4>
                      <a
                        href="mailto:kollilokeshreddy18@gmail.com"
                        className={`${darkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'} transition-colors duration-300`}
                      >
                        kollilokeshreddy18@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Phone</h4>
                      <a
                        href="tel:+918885208299"
                        className={`${darkMode ? 'text-slate-300 hover:text-green-400' : 'text-slate-600 hover:text-green-600'} transition-colors duration-300`}
                      >
                        +91-888-5208-299
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Location</h4>
                      <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Silchar, Assam, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={`${darkMode ? 'bg-slate-900' : 'bg-white'} rounded-2xl p-8 shadow-lg`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border ${darkMode ? 'border-slate-600 bg-slate-800 text-slate-100' : 'border-slate-300 bg-white text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300`}
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border ${darkMode ? 'border-slate-600 bg-slate-800 text-slate-100' : 'border-slate-300 bg-white text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300`}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className={`block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${darkMode ? 'border-slate-600 bg-slate-800 text-slate-100' : 'border-slate-300 bg-white text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300`}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 border ${darkMode ? 'border-slate-600 bg-slate-800 text-slate-100' : 'border-slate-300 bg-white text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 resize-none`}
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitted ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-slate-950' : 'bg-slate-900'} text-white py-16`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Logo and NPX Badge */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Kolli Lokesh Reddy
                  </h3>
                  <p className="text-slate-400">
                    Full-Stack Developer & Competitive Programmer
                  </p>
                </div>
                
                {/* NPX Badge */}
                <div className={`${darkMode ? 'bg-slate-800' : 'bg-slate-800'} rounded-lg p-4 border border-slate-700`}>
                  <p className="text-slate-300 text-sm mb-2">Try my CLI:</p>
                  <div className="flex items-center space-x-2 bg-black rounded-md p-3 font-mono text-sm">
                    <span className="text-green-400">$</span>
                    <span className="text-slate-300 flex-1">{npxCommand}</span>
                    <button
                      onClick={copyToClipboard}
                      className="text-slate-400 hover:text-white transition-colors duration-300 p-1"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-green-400 text-xs mt-2">Copied to clipboard!</p>
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => {
                          const element = document.getElementById(link.toLowerCase());
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="text-slate-400 hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Let's Connect</h4>
                <div className="flex space-x-4 mb-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-slate-400 ${social.color} transition-colors duration-300`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <p className="text-slate-400 text-sm">
                  Available for internships and exciting opportunities.
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-slate-400 text-sm flex items-center">
                &copy; {new Date().getFullYear()} Kolli Lokesh Reddy. All rights reserved.
                <span className="inline-block align-middle ml-2 mb-1">
                  <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Purple%20Heart.png"
                    alt="Purple Heart"
                    width="20"
                    height="20"
                    style={{ display: 'inline', margin: 0, padding: 0 }}
                  />
                  <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Ghost.png"
                    alt="Ghost"
                    width="20"
                    height="20"
                    style={{ display: 'inline', margin: 0, padding: 0 }}
                  />
                </span>
              </p>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span>Built with React & Tailwind CSS</span>
                <span>•</span>
                <span>Hosted on Netlify</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Back to Top Button */}
      <a 
        href="#home" 
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 hidden md:block ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </a>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;