import { education, experience } from '../data/experience';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { CapIcon, ExternalLinkIcon, PlayIcon } from './icons';

const Tag = ({ children, tone = 'outline' }) => (
  <span
    className={`px-3 py-1.5 rounded-xl text-sm font-medium ${
      tone === 'outline' ? 'border border-on-primary-container/30' : 'bg-secondary-container text-on-secondary-container'
    }`}
  >
    {children}
  </span>
);

const AppCard = ({ app }) => (
  <a
    href={app.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${app.name} on Google Play`}
    className="group min-w-0 flex items-center gap-4 p-4 rounded-3xl bg-surface-card/80 hover:bg-surface-card hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
  >
    <img
      src={app.icon}
      alt=""
      width="56"
      height="56"
      loading="lazy"
      className="w-14 h-14 rounded-2xl shadow-sm flex-shrink-0 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110"
    />
    <div className="min-w-0 flex-1">
      <p className="font-display font-semibold text-lg leading-tight text-on-surface">{app.name}</p>
      <p className="text-sm text-on-surface-variant">{app.blurb}</p>
      <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        <PlayIcon className="h-3.5 w-3.5" />
        Google Play
        <ExternalLinkIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </p>
    </div>
  </a>
);

const EducationCard = () => {
  const [ref, inView] = useInView();
  const cgpa = useCountUp(Number(education.cgpa), { start: inView, decimals: 2 });

  return (
    <div ref={ref} className="h-full flex flex-wrap items-center gap-6 p-7 rounded-4xl bg-surface-card border border-outline-variant">
      <div className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container">
        <CapIcon className="w-7 h-7" />
      </div>
      <div className="flex-[1_1_220px] min-w-0">
        <h3 className="font-display font-semibold text-xl">{education.degree}</h3>
        <p className="text-on-surface-variant">
          {education.institute} · {education.period}
        </p>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-display font-bold text-5xl text-primary tabular-nums">{cgpa}</span>
        <span className="text-sm text-on-surface-variant">CGPA</span>
      </div>
    </div>
  );
};

const Work = () => {
  const [current, ...past] = experience;

  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <SectionHeading eyebrow="Work" title="Where I've been building">
          From research internship to shipping Android apps used across India.
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Reveal className="lg:col-span-2 lg:row-span-2 flex flex-col gap-6 p-8 sm:p-10 rounded-5xl bg-primary-container text-on-primary-container">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-2xl sm:text-3xl">{current.role}</h3>
              <span className="font-semibold">{current.period}</span>
            </div>
            <p className="font-semibold text-primary text-lg -mt-3">{current.company}</p>
            <ul className="flex flex-col gap-2 text-lg leading-relaxed">
              {current.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {current.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <div className="mt-auto grid sm:grid-cols-2 gap-3 pt-2">
              {current.apps.map((app) => (
                <AppCard key={app.name} app={app} />
              ))}
            </div>
          </Reveal>

          {past.map((job, i) => (
            <Reveal
              key={job.role}
              delay={120 + i * 120}
              className="flex flex-col gap-3 p-7 rounded-4xl bg-surface-container hover:bg-surface-high transition-colors"
            >
              <span className="text-sm font-semibold text-on-surface-variant">{job.period}</span>
              <h3 className="font-display font-semibold text-xl">{job.role}</h3>
              <p className="font-semibold text-primary -mt-1">{job.company}</p>
              <p className="text-on-surface-variant leading-relaxed">{job.points[0]}</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {job.tech.slice(0, 3).map((t) => (
                  <Tag key={t} tone="filled">
                    {t}
                  </Tag>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal delay={200} className="lg:col-span-3">
            <EducationCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Work;
