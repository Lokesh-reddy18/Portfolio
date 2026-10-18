import { profile } from '../data/profile';
import { DownloadIcon } from './icons';

const button = 'px-8 py-4 rounded-lg shadow font-semibold text-lg transition-all duration-200 text-center';

const Hero = () => (
  <section
    id="home"
    className="min-h-screen flex items-center justify-center pt-24 transition-colors duration-300 bg-white text-gray-800 dark:bg-[#302f82] dark:text-gray-100"
  >
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-blue-800 dark:text-blue-100">
            Hi, I&apos;m {profile.name}
          </h1>
          <p className="mb-6 text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-300">
            {profile.title} · {profile.focus} @ {profile.company}
          </p>
          <p className="mb-10 text-lg sm:text-xl font-medium text-gray-700 dark:text-blue-100/90">{profile.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#experience" className={`${button} bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800`}>
              View Work
            </a>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className={`${button} flex items-center justify-center gap-2 bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 dark:bg-gray-800 dark:border-blue-400 dark:text-blue-200 dark:hover:bg-gray-700`}
            >
              <DownloadIcon />
              <span>Resume</span>
            </a>
            <a
              href="#contact"
              className={`${button} bg-blue-100 border border-blue-300 text-blue-900 hover:bg-blue-200 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-100 dark:hover:bg-blue-800`}
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
          <img
            src={profile.photo}
            alt={profile.name}
            width="256"
            height="256"
            className="rounded-lg shadow-lg w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover border-4 border-white"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
