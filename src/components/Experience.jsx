import { experience } from '../data/experience';
import SectionHeading from './SectionHeading';
import { ExternalLinkIcon, PlayIcon } from './icons';

const Experience = () => (
  <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="Experience" subtitle="Where I've worked" />

        <ol className="relative border-l-2 border-blue-200 dark:border-blue-900 ml-3">
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`} className="mb-10 ml-8 last:mb-0">
              <span className="absolute -left-[9px] mt-2 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white dark:ring-gray-800" />
              <div className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-900">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <h3 className="text-xl font-semibold">
                    {job.role} <span className="text-blue-600 dark:text-blue-400">@ {job.company}</span>
                  </h3>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{job.period}</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border text-xs px-2 py-1 rounded-full font-medium bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {job.apps && (
                  <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-gray-500 dark:text-gray-400">
                      Apps I work on
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {job.apps.map((app) => (
                        <a
                          key={app.name}
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${app.name} on Google Play`}
                          className="group/app min-w-0 flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-700 dark:hover:bg-gray-800/60"
                        >
                          <img
                            src={app.icon}
                            alt=""
                            width="48"
                            height="48"
                            loading="lazy"
                            className="w-12 h-12 rounded-xl shadow-sm flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold leading-tight">{app.name}</p>
                            <p className="text-xs sm:truncate text-gray-500 dark:text-gray-400">{app.blurb}</p>
                            <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                              <PlayIcon className="h-3 w-3" />
                              Google Play
                              <ExternalLinkIcon className="h-3 w-3 transition-transform group-hover/app:translate-x-0.5 group-hover/app:-translate-y-0.5" />
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default Experience;
