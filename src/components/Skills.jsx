import { iconUrl } from '../data/icons';
import { skillGroups } from '../data/skills';
import SectionHeading from './SectionHeading';

const iconSrc = (skill, darkMode) => skill.icon ?? iconUrl(skill.slug, darkMode);

const Skills = ({ darkMode }) => (
  <section id="skills" className="py-20 transition-colors duration-300 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
    <div className="container mx-auto px-6">
      <SectionHeading title="Skills" subtitle="Technologies & tools I work with" />
      <div className="space-y-10">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-600 dark:text-gray-300">{group.title}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center justify-center space-y-2 px-4 py-6 rounded-2xl shadow-md text-base font-semibold transition-all transform hover:scale-110 w-32 h-32 bg-blue-100 hover:bg-blue-200/80 dark:bg-gray-800 dark:hover:bg-blue-900/60"
                  title={skill.name}
                >
                  <img
                    src={iconSrc(skill, darkMode)}
                    alt=""
                    width="48"
                    height="48"
                    loading="lazy"
                    className="w-12 h-12 object-contain animate-bounce-slow"
                  />
                  <span className="text-center text-sm break-words">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
