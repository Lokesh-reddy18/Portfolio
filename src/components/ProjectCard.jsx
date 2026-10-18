import Ripple from './Ripple';
import { ExternalLinkIcon, GitHubIcon } from './icons';

const ProjectCard = ({ project, index }) => (
  <article className="group h-full flex flex-col rounded-4xl overflow-hidden bg-surface-card border border-outline-variant/60 hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgb(var(--md-primary)/0.45)] transition-all duration-500">
    <div className="relative overflow-hidden aspect-[16/10] bg-surface-high">
      <img
        src={project.image}
        alt={project.title}
        width="640"
        height="400"
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
      />
      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface/90 backdrop-blur font-mono text-xs font-medium">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
    <div className="flex flex-col flex-1 gap-4 p-6">
      <h3 className="font-display font-semibold text-xl leading-snug">{project.title}</h3>
      <p className="text-on-surface-variant text-[15px] leading-relaxed">{project.description}</p>
      <ul className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <li key={tech} className="px-2.5 py-1 rounded-lg bg-secondary-container text-on-secondary-container text-xs font-medium">
            {tech}
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-auto pt-2">
        <Ripple
          as="a"
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-full bg-primary text-on-primary font-semibold text-sm"
        >
          Live demo <ExternalLinkIcon />
        </Ripple>
        <Ripple
          as="a"
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-full border border-outline font-semibold text-sm hover:bg-surface-high transition-colors"
        >
          <GitHubIcon /> Code
        </Ripple>
      </div>
    </div>
  </article>
);

export default ProjectCard;
