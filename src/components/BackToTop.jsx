import { ArrowUpIcon } from './icons';

const BackToTop = () => (
  <a
    href="#home"
    className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 hidden md:block bg-blue-600 text-white hover:bg-blue-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
    aria-label="Back to top"
  >
    <ArrowUpIcon />
  </a>
);

export default BackToTop;
