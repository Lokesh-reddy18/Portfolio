import { useEffect, useRef, useState } from 'react';
import { experience, education } from '../data/experience';
import { profile } from '../data/profile';

const SCREEN_MS = 3200;

const ProfileScreen = () => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-3 p-3.5 rounded-3xl bg-primary-container text-on-primary-container">
      <img src={profile.photo} alt="" width="48" height="48" className="w-12 h-12 rounded-2xl object-cover" />
      <div className="min-w-0">
        <p className="font-display font-semibold leading-tight">Lokesh Reddy</p>
        <p className="text-xs opacity-80">Android Engineer</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2.5">
      <div className="p-3 rounded-2xl bg-surface-card">
        <p className="font-display font-bold text-2xl text-primary">2</p>
        <p className="text-[11px] text-on-surface-variant">apps I build</p>
      </div>
      <div className="p-3 rounded-2xl bg-surface-card">
        <p className="font-display font-bold text-2xl text-primary">{education.cgpa}</p>
        <p className="text-[11px] text-on-surface-variant">CGPA, NIT Silchar</p>
      </div>
    </div>
    <div className="p-3 rounded-2xl bg-surface-card flex items-center gap-2">
      <span className="relative flex w-2.5 h-2.5">
        <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-500" />
      </span>
      <p className="text-xs font-medium">Building at {profile.company}</p>
    </div>
    <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant px-1 pt-1">Working on</p>
    <div className="flex gap-2.5">
      {experience[0].apps.map((app) => (
        <div key={app.name} className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-surface-card">
          <img src={app.icon} alt="" width="40" height="40" className="w-10 h-10 rounded-xl" />
          <p className="text-[11px] font-semibold text-center leading-tight">{app.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const AppsScreen = () => (
  <div className="flex flex-col gap-3">
    <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant px-1">Apps I ship</p>
    {experience[0].apps.map((app) => (
      <div key={app.name} className="flex items-center gap-3 p-3 rounded-2xl bg-surface-card">
        <img src={app.icon} alt="" width="44" height="44" className="w-11 h-11 rounded-xl" />
        <div className="min-w-0">
          <p className="font-semibold text-sm">{app.name}</p>
          <p className="text-[11px] text-on-surface-variant truncate">{app.blurb}</p>
        </div>
      </div>
    ))}
  </div>
);

const CodeScreen = () => (
  <div className="flex flex-col gap-3">
    <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant px-1">Today&apos;s commit</p>
    <pre className="p-3.5 rounded-2xl bg-[#221A13] text-[#EFE0D5] font-mono text-[11px] leading-relaxed overflow-hidden">
      <span className="text-[#FFB870]">@Composable</span>
      {'\n'}
      <span className="text-[#E2C0A4]">fun</span> Greeting() {'{'}
      {'\n'}  Text(<span className="text-[#9FE0B4]">&quot;Hi, I&apos;m Lokesh&quot;</span>)
      {'\n'}
      {'}'}
    </pre>
    <div className="flex flex-wrap gap-1.5">
      {['Kotlin', 'Compose', 'Firebase', 'TypeScript'].map((t) => (
        <span key={t} className="px-2.5 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container text-[11px] font-medium">
          {t}
        </span>
      ))}
    </div>
  </div>
);

const screens = [
  { name: 'Profile', Component: ProfileScreen },
  { name: 'Apps', Component: AppsScreen },
  { name: 'Code', Component: CodeScreen },
];

const MAX_TILT_DEG = 10;

// Leans the phone toward the mouse. Mouse/trackpad only: touch has no hover position to follow.
function useCursorTilt() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canTilt =
      window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canTilt) return;
    let frame;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
        const clamp = (v) => Math.max(-1, Math.min(1, v));
        setTilt({ x: clamp(-dy) * MAX_TILT_DEG, y: clamp(dx) * MAX_TILT_DEG });
      });
    };
    const reset = () => setTilt({ x: 0, y: 0 });
    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', reset);
    };
  }, []);

  return [ref, tilt];
}

const PhoneMockup = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tiltRef, tilt] = useCursorTilt();

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % screens.length), SCREEN_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="relative animate-phone-in [animation-delay:300ms]">
      <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-primary-container/70 dark:bg-primary-container/35 blur-3xl" />
      <div
        className="relative animate-float [animation-delay:1300ms]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          ref={tiltRef}
          className="w-[280px] h-[560px] sm:w-[300px] sm:h-[600px] rounded-[3rem] bg-[#221A13] p-3 shadow-[0_40px_80px_-30px_rgba(80,40,0,0.55)] transition-transform duration-300 ease-out"
          style={{ transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >
          <div className="relative w-full h-full rounded-[2.4rem] bg-surface overflow-hidden flex flex-col">
            <div className="mx-auto mt-3 w-20 h-1.5 rounded-full bg-outline-variant" />
            <div className="relative flex-1 overflow-hidden">
              <div
                className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {screens.map(({ name, Component }, i) => (
                  <div key={name} className="w-full flex-shrink-0 px-4 pt-5" aria-hidden={i !== index}>
                    <Component />
                  </div>
                ))}
              </div>
            </div>
            <div className="m-3 p-2 rounded-3xl bg-surface-container flex justify-around" role="tablist" aria-label="Phone screens">
              {screens.map(({ name }, i) => (
                <button
                  key={name}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show ${name} screen`}
                  onClick={() => setIndex(i)}
                  className="h-11 px-2 grid place-items-center"
                >
                  <span
                    className={`block h-7 rounded-full transition-all duration-500 ${
                      i === index ? 'w-14 bg-primary-container' : 'w-7 bg-outline-variant/70'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
