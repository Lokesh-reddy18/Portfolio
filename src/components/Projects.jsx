import { profile } from '../data/profile';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import Ripple from './Ripple';
import SectionHeading from './SectionHeading';
import { GitHubIcon } from './icons';

const Projects = () => (
  <section id="projects" className="py-24 sm:py-32">
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      <SectionHeading eyebrow="Side projects" title="Things I've built for fun">
        Full-stack experiments from college: real-time games, job boards and AI tools.
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 120}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex justify-center">
        <Ripple
          as="a"
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 min-h-[52px] px-7 rounded-full bg-surface-high font-semibold hover:bg-surface-container transition-colors"
        >
          <GitHubIcon className="h-5 w-5" />
          More on GitHub
        </Ripple>
      </Reveal>
    </div>
  </section>
);

export default Projects;
