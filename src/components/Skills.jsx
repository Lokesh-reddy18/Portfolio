import { iconUrl } from '../data/icons';
import { skillGroups } from '../data/skills';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const allSkills = skillGroups.flatMap((group) => group.skills);
const half = Math.ceil(allSkills.length / 2);
const rows = [allSkills.slice(0, half), allSkills.slice(half)];

const iconSrc = (skill, darkMode) => skill.icon ?? iconUrl(skill.slug, darkMode);

const SkillChip = ({ skill, darkMode }) => (
  <span className="flex items-center gap-3 pl-2.5 pr-5 py-2.5 rounded-2xl bg-surface-card border border-outline-variant/70 whitespace-nowrap">
    <img src={iconSrc(skill, darkMode)} alt="" width="32" height="32" loading="lazy" className="w-8 h-8 rounded-lg" />
    <span className="font-medium">{skill.name}</span>
  </span>
);

const Skills = ({ darkMode }) => (
  <section id="skills" className="py-24 sm:py-32 bg-surface-low">
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      <SectionHeading eyebrow="Skills" title="Tools I reach for">
        Android first, with enough backend and web to own a feature end to end.
      </SectionHeading>
    </div>

    {/* Two rows drifting in opposite directions; each list is doubled so the loop is seamless. */}
    <Reveal className="hidden motion-safe:flex flex-col gap-4 marquee-mask overflow-hidden" aria-hidden="true">
      {rows.map((row, r) => (
        <div
          key={r}
          className={`flex w-max gap-4 hover:[animation-play-state:paused] ${r === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}
        >
          {[...row, ...row].map((skill, i) => (
            <SkillChip key={`${skill.name}-${i}`} skill={skill} darkMode={darkMode} />
          ))}
        </div>
      ))}
    </Reveal>

    {/* The rows above are hidden from screen readers and from reduced-motion users; this list stands in for both. */}
    <ul className="sr-only motion-reduce:not-sr-only motion-reduce:max-w-6xl motion-reduce:mx-auto motion-reduce:px-4 sm:motion-reduce:px-8 motion-reduce:flex motion-reduce:flex-wrap motion-reduce:gap-3">
      {allSkills.map((skill) => (
        <li key={skill.name}>
          <SkillChip skill={skill} darkMode={darkMode} />
        </li>
      ))}
    </ul>
  </section>
);

export default Skills;
