import { ExternalLinkIcon, GitHubIcon } from './icons';

const linkButton = 'flex-1 text-center py-2 px-3 rounded-lg font-semibold border transition-all duration-200';

const ProjectCard = ({ project }) => (
  <div className="group flex flex-col border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
    <img
      src={project.image}
      alt={project.title}
      width="640"
      height="384"
      loading="lazy"
      className="w-full h-48 object-cover border-b border-gray-200 dark:border-gray-700"
    />
    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="border text-xs px-2 py-1 rounded-full font-medium bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex space-x-3 mt-auto">
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkButton} border-blue-600 text-blue-700 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-200 dark:hover:bg-blue-900/60`}
        >
          <span className="inline-flex items-center justify-center gap-1">
            Demo <ExternalLinkIcon />
          </span>
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkButton} border-gray-400 text-gray-700 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-700`}
        >
          <span className="inline-flex items-center justify-center gap-1">
            <GitHubIcon /> GitHub
          </span>
        </a>
      </div>
    </div>
  </div>
);

export default ProjectCard;
