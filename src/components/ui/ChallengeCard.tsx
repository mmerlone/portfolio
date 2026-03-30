import { type ReactElement } from "react";
import type { PortfolioChallenge } from "@/types/portfolio";

interface ChallengeCardProps {
  challenge: PortfolioChallenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps): ReactElement => (
  <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
    <h3 className="mb-1 text-xl font-bold text-orange-600 dark:text-orange-400">
      {challenge.title}
    </h3>
    <div className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
      {challenge.company}
      {challenge.period && (
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
          ({challenge.period})
        </span>
      )}
    </div>
    <div className="mb-2">
      <span className="font-semibold text-gray-800 dark:text-gray-200">
        Challenge:
      </span>
      <span className="ml-1 text-gray-700 dark:text-gray-300">
        {challenge.challenge}
      </span>
    </div>
    <div className="mb-2">
      <span className="font-semibold text-gray-800 dark:text-gray-200">
        Action:
      </span>
      <ul className="ml-6 list-disc text-gray-700 dark:text-gray-300">
        {challenge.action.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
    <div className="mb-2">
      <span className="font-semibold text-gray-800 dark:text-gray-200">
        Result:
      </span>
      <ul className="ml-6 list-disc text-gray-700 dark:text-gray-300">
        {challenge.result.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
    <div className="mt-2 flex flex-wrap gap-2">
      {challenge.technologies.map((tech, index) => (
        <span
          key={`${tech}-${index}`}
          className="inline-block rounded bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900 dark:text-orange-200"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

export default ChallengeCard;
