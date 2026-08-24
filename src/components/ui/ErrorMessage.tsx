import { type ReactElement } from "react";
interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps): ReactElement => (
  <div className="my-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
    <p className="text-red-600 dark:text-red-400">{message}</p>
  </div>
);
