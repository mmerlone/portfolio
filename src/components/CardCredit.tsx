"use client";

import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FC } from "react";

interface CardCreditProps {
  credit: {
    name: string;
    description: string;
    url: string;
    icon: string;
  };
}

const CardCredit: FC<CardCreditProps> = ({ credit }) => {
  return (
    <a
      href={credit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-4 w-80 sm:w-120 h-36"
    >
      <div className="flex-shrink-0 bg-white rounded p-2 shadow-md h-full flex items-center justify-center">
        {/* Container with fixed size */}
        <div className="relative w-20 h-20">
          <Image
            src={`/images/icons/${credit.icon}`}
            alt={credit.name}
            fill
            sizes="80px"
            className="object-contain rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          {credit.name}
          <FaExternalLinkAlt className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {credit.description}
        </p>
      </div>
    </a>
  );
};

export default CardCredit;
