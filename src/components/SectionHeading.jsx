import Reveal from './Reveal';

const SectionHeading = ({ eyebrow, title, children }) => (
  <Reveal className="flex flex-col gap-3 mb-12 max-w-2xl">
    <span className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</span>
    <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">{title}</h2>
    {children && <p className="text-lg text-on-surface-variant leading-relaxed">{children}</p>}
  </Reveal>
);

export default SectionHeading;
