const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold mb-4">{title}</h2>
    <span className="text-lg font-medium tracking-wide text-blue-800 dark:text-blue-200">{subtitle}</span>
  </div>
);

export default SectionHeading;
