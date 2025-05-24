"use client";

import { FC } from "react";

type TermsOfServicePolicyProps = {
  visible?: boolean;
  onAccept?: () => void;
  onRefuse?: () => void;
  onClose?: () => void;
};

const TermsOfServicePolicy: FC<TermsOfServicePolicyProps> = ({
  visible = false,
  onAccept,
  onRefuse,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-xl w-full mx-4 p-6 relative overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Terms of Service & Cookie Policy
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          I use cookies to enhance your browsing experience, analyze site
          traffic, and tailor my marketing efforts. The following data is
          collected:
        </p>
        <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-300">
          <li>Interaction events (clicks, scrolls, and navigation)</li>
          <li>Session and usage statistics</li>
          <li>Device and browser information</li>
        </ul>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          By accepting, you agree to our data usage in accordance with this
          policy. Your consent is stored as a cookie in your browser so that we
          don’t ask again.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          For more details, please review the full Privacy Policy on my
          website.
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white text-sm"
          >
            Accept
          </button>
          <button
            onClick={onRefuse}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
          >
            Refuse
          </button>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          &#10005;
        </button>
      </div>
    </div>
  );
};

export default TermsOfServicePolicy;
