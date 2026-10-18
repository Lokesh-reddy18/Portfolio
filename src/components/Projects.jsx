import { profile } from '../data/profile';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';
import { GitHubIcon } from './icons';

const Projects = () => (
  <section id="projects" className="py-20 bg-white dark:bg-gray-900">
    <div className="container mx-auto px-4">
      <SectionHeading title="Side Projects" subtitle="Some of the things I've built" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      <div className="mt-16 text-center">
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md transition-colors inline-flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200"
        >
          <GitHubIcon className="h-5 w-5" />
          <span>View All Projects on GitHub</span>
        </a>
      </div>
    </div>
  </section>
);

export default Projects;
