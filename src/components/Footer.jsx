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
    <footer className="pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 pb-12 border-b border-outline-variant">
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-display font-bold text-2xl">{profile.name}</p>
              <p className="text-on-surface-variant">{profile.footerTagline}</p>
            </div>
            <div className="max-w-sm p-4 rounded-3xl bg-[#221A13] text-[#EFE0D5]">
              <p className="text-xs text-[#D6C3B4] mb-2">Meet me in your terminal</p>
              <div className="flex items-center gap-3 font-mono text-sm">
                <span className="text-[#9FE0B4]">$</span>
                <span className="flex-1">{profile.npxCommand}</span>
                <button
                  onClick={copyToClipboard}
                  className="grid place-items-center w-11 h-11 -my-2 -mr-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label={copied ? 'Copied' : 'Copy command'}
                >
                  {copied ? <CheckCircleIcon className="w-4 h-4 text-[#9FE0B4]" /> : <CopyIcon />}
                </button>
              </div>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="font-semibold mb-4">Explore</p>
            <ul className="flex flex-col gap-2">
              {sections.slice(1).map((section) => (
                <li key={section}>
                  <a href={`#${section}`} className="capitalize text-on-surface-variant hover:text-primary transition-colors">
                    {section}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-semibold mb-4">Elsewhere</p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="grid place-items-center w-12 h-12 rounded-2xl bg-surface-container hover:bg-primary-container hover:-translate-y-1 transition-all"
                >
                  <img src={iconUrl(social.slug, darkMode)} alt="" width="24" height="24" className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="pt-8 text-center text-sm text-on-surface-variant">
          &copy; {new Date().getFullYear()} {profile.name} · Crafted with Kotlin on weekdays, React on weekends
        </p>
      </div>
    </footer>
  );
};

export default Footer;
