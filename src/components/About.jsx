import { education, experience } from '../data/experience';
import { profile } from '../data/profile';
import SectionHeading from './SectionHeading';
import { BriefcaseIcon, CapIcon } from './icons';

const card = 'p-8 rounded-lg shadow-md h-full bg-gray-100 dark:bg-gray-800';
const body = 'mb-6 text-gray-700 dark:text-gray-300';

const About = () => {
  const current = experience[0];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="About Me" subtitle="Who I am & what I do" />

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className={card}>
                <h3 className="text-xl font-semibold mb-4">Introduction</h3>
                <p className={body}>
                  I&apos;m a {current.role} at {current.company}, where I work on the Sri Mandir and Sri Panchangam
                  Android apps. I like owning features end to end, from the Compose UI down to the BFF APIs.
                </p>
                <p className={body}>
                  I joined {current.company} as an SDE intern in January 2026 and moved to a full-time role in
                  July 2026, after graduating in Computer Science from NIT Silchar.
                </p>
                <p className={body}>
                  Outside work I enjoy competitive programming (Knight on LeetCode) and building full-stack side
                  projects. I&apos;m based in {profile.location}.
                </p>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className={card}>
                <h3 className="text-xl font-semibold mb-6">At a Glance</h3>

                <h4 className="font-medium mb-3">Education</h4>
                <div className="flex items-start mb-8">
                  <CapIcon className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>{education.degree}</strong>
                    <br />
                    <em>{education.institute}</em>
                    <br />
                    CGPA: {education.cgpa} | {education.period}
                  </div>
                </div>

                <h4 className="font-medium mb-3">Currently</h4>
                <div className="flex items-start">
                  <BriefcaseIcon className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>{current.role}</strong>
                    <br />
                    <em>{current.company}</em>
                    <br />
                    {current.period}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
