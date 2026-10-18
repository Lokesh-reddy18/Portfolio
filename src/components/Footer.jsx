import { useState } from 'react';
import { iconUrl } from '../data/icons';
import { profile, sections, socialLinks } from '../data/profile';
import { CheckCircleIcon, CopyIcon } from './icons';

const Footer = ({ darkMode }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profile.npxCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <footer className="border-t transition-colors duration-300 py-16 bg-white border-gray-200 text-gray-800 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {profile.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{profile.footerTagline}</p>
              </div>
              <div className="rounded-lg p-4 border max-w-xs bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">Meet me in your terminal:</p>
                <div className="flex items-center space-x-2 rounded-md p-3 font-mono text-sm bg-gray-200 dark:bg-black">
                  <span className="text-green-400">$</span>
                  <span className="flex-1 text-gray-800 dark:text-gray-300">{profile.npxCommand}</span>
                  <button
                    onClick={copyToClipboard}
                    className="transition-colors duration-300 p-1 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    title="Copy to clipboard"
                    aria-label="Copy command"
                  >
                    {copied ? <CheckCircleIcon className="w-4 h-4 text-green-400" /> : <CopyIcon />}
                  </button>
                </div>
                {copied && <p className="text-green-400 text-xs mt-2">Copied to clipboard!</p>}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Links</h4>
              <ul className="space-y-2">
                {sections.slice(1).map((section) => (
                  <li key={section}>
                    <a
                      href={`#${section}`}
                      className="capitalize transition-colors duration-300 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      {section}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Let&apos;s Connect</h4>
              <div className="flex space-x-4 mb-4">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" title={social.name}>
                    <img
                      src={iconUrl(social.slug, darkMode)}
                      alt={social.name}
                      width="24"
                      height="24"
                      className="w-6 h-6 transition-transform hover:scale-110"
                    />
                  </a>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Always up for a good engineering conversation.
              </p>
            </div>
          </div>

          <div className="border-t pt-8 flex justify-center border-gray-200 dark:border-gray-800">
            <p className="font-semibold flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
              <span className="inline-flex">
                <img src="/icons/emoji/purple-heart.png" alt="" width="22" height="22" loading="lazy" />
                <img src="/icons/emoji/ghost.png" alt="" width="22" height="22" loading="lazy" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
