import { useEffect, useState } from 'react';
import { ArrowUpIcon } from './icons';
import Ripple from './Ripple';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Ripple
      as="a"
      href="#home"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 grid place-items-center w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container shadow-lg hover:shadow-xl transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <ArrowUpIcon />
    </Ripple>
  );
};

export default BackToTop;
