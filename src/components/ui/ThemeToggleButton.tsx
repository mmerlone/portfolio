import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import { type Theme } from "./ThemeToggle";

function ToggleIcon({ icon }: { icon: Theme }) {
  switch (icon) {
    case "system":
      return <FaDesktop className="h-3 w-3" />;
    case "dark":
      return <FaMoon className="h-3 w-3" />;
    default:
      return <FaSun className="h-3 w-3" />;
  }
}

interface ThemeToggleButtonProps {
  theme: Theme;
  selected?: boolean;
  className?: string;
  handleClick: (theme: Theme) => void;
}

export default function ThemeToggleButton({
  theme,
  selected = false,
  handleClick,
}: ThemeToggleButtonProps) {
  return (
    <div
      className={`z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-gray-200 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 ${selected ? "" : "opacity-20"} dark:hover:bg-gray-600`}
      aria-hidden="true"
      title={`Switch to ${theme} theme`}
      onClick={() => handleClick(theme)}
    >
      <ToggleIcon icon={theme} />
    </div>
  );
}
