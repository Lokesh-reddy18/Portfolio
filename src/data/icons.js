// Icons are self-hosted copies of skillicons.dev SVGs. Slugs listed here have separate
// light/dark artwork (`<slug>-light.svg` / `<slug>-dark.svg`); the rest are a single `<slug>.svg`.
const themedSlugs = new Set([
  'kotlin', 'androidstudio', 'firebase', 'gradle', 'nodejs', 'express', 'mysql', 'java', 'react',
  'nextjs', 'tailwindcss', 'd3', 'vite', 'github', 'npm', 'vscode', 'latex', 'gmail',
]);

export const iconUrl = (slug, darkMode) =>
  themedSlugs.has(slug)
    ? `/icons/skills/${slug}-${darkMode ? 'dark' : 'light'}.svg`
    : `/icons/skills/${slug}.svg`;
