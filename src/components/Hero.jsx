import { profile } from '../data/profile';
import PhoneMockup from './PhoneMockup';
import Ripple from './Ripple';
import { DownloadIcon, PhoneIcon } from './icons';

const headline = 'I build Android apps people open every day.';

const Hero = () => (
  <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
    <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-wrap items-center gap-10 sm:gap-16">
      <div className="flex-[1_1_520px] min-w-0 flex flex-col gap-7">
        <div className="flex flex-wrap items-center gap-4 animate-rise">
          <img
            src={profile.photo}
            alt={profile.name}
            width="72"
            height="72"
            fetchpriority="high"
            className="w-[72px] h-[72px] rounded-[1.6rem] object-cover ring-4 ring-primary-container shadow-md"
          />
          <div className="flex flex-col gap-1.5">
            <span className="font-display font-semibold text-xl">Hi, I&apos;m Lokesh</span>
            <span className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary-container text-sm font-semibold">
              <PhoneIcon className="w-4 h-4" />
              {profile.title} · {profile.focus} @ {profile.company}
            </span>
          </div>
        </div>

        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
          {headline.split(' ').map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom pb-1">
              <span className="inline-block animate-rise" style={{ animationDelay: `${120 + i * 70}ms` }}>
                {word === 'Android' ? <span className="text-primary">{word}</span> : word}
                &nbsp;
              </span>
            </span>
          ))}
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed text-on-surface-variant max-w-xl animate-rise [animation-delay:700ms]">
          Kotlin and Jetpack Compose on the Sri Mandir and Sri Panchangam apps, plus the TypeScript BFF APIs behind
          them. NIT Silchar CSE grad, based in {profile.location.split(',')[0]}.
        </p>

        <div className="flex flex-wrap gap-3 pt-1 animate-rise [animation-delay:850ms]">
          <Ripple
            as="a"
            href="#work"
            className="inline-flex items-center min-h-[52px] px-7 rounded-full bg-primary text-on-primary font-semibold shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            See my work
          </Ripple>
          <Ripple
            as="a"
            href="#contact"
            className="inline-flex items-center min-h-[52px] px-6 rounded-full border border-outline text-on-surface font-semibold hover:bg-surface-high transition-colors"
          >
            Get in touch
          </Ripple>
          {profile.resumeUrl && (
            <Ripple
              as="a"
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="inline-flex items-center gap-2 min-h-[52px] px-5 rounded-full text-primary font-semibold hover:bg-primary-container/60 transition-colors"
            >
              <DownloadIcon className="w-5 h-5" />
              Resume
            </Ripple>
          )}
        </div>
      </div>

      {/* zoom (not transform: scale) so the smaller phone also takes less room in the layout. */}
      <div className="flex-[1_1_320px] flex justify-center max-sm:[zoom:0.75]">
        <PhoneMockup />
      </div>
    </div>
  </section>
);

export default Hero;
