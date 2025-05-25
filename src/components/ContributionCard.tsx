import type { Contribution } from "@/types/contribution";

interface ContributionCardProps {
  contribution: Contribution;
}

const ContributionCard = ({ contribution }: ContributionCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-1">
      {contribution.title}
    </h3>
    <div className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
      {contribution.company}
      {contribution.period && (
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
          ({contribution.period})
        </span>
      )}
    </div>
    <ul className="list-disc ml-6 mb-2 text-gray-700 dark:text-gray-300">
      {contribution.description.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-2 mt-2">
      {contribution.technologies.map((tech) => (
        <span
          key={tech}
          className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-2 py-1 rounded text-xs font-semibold"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

export default ContributionCard;
