import { experience } from '../data/experience';
import SectionHeading from './SectionHeading';
import { PlayIcon } from './icons';

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
                  <div className="flex flex-wrap gap-3 mt-5">
                    {job.apps.map((app) => (
                      <a
                        key={app.name}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
                      >
                        <PlayIcon />
                        <span>
                          <span className="block text-[10px] font-normal leading-none opacity-80">Get it on Google Play</span>
                          {app.name}
                        </span>
                      </a>
                    ))}
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
