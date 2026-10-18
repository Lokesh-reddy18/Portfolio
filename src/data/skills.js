// `slug` maps to a file in public/icons/skills (see data/icons.js); `icon` is for tech skillicons doesn't cover.
export const skillGroups = [
  {
    title: 'Mobile',
    skills: [
      { name: 'Kotlin', slug: 'kotlin' },
      { name: 'Jetpack Compose', icon: '/icons/compose.svg' },
      { name: 'Android Studio', slug: 'androidstudio' },
      { name: 'Firebase', slug: 'firebase' },
      { name: 'Gradle', slug: 'gradle' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', slug: 'nodejs' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Express.js', slug: 'express' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'MySQL', slug: 'mysql' },
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'C', slug: 'c' },
      { name: 'C++', slug: 'cpp' },
      { name: 'Java', slug: 'java' },
      { name: 'JavaScript', slug: 'javascript' },
    ],
  },
  {
    title: 'Web',
    skills: [
      { name: 'React.js', slug: 'react' },
      { name: 'Next.js', slug: 'nextjs' },
      { name: 'Redux', slug: 'redux' },
      { name: 'TailwindCSS', slug: 'tailwindcss' },
      { name: 'HTML', slug: 'html' },
      { name: 'CSS', slug: 'css' },
      { name: 'D3.js', slug: 'd3' },
      { name: 'Vite', slug: 'vite' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', slug: 'git' },
      { name: 'GitHub', slug: 'github' },
      { name: 'NPM', slug: 'npm' },
      { name: 'VS Code', slug: 'vscode' },
      { name: 'LaTeX', slug: 'latex' },
    ],
  },
];
