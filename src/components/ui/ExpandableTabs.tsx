"use client";
// https://21st.dev/victorwelander/expandable-tabs/default

import {
  createElement,
  type ElementType,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useRef,
  useState,
} from "react";
// framer-motion removed — replace with CSS transitions
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/cn";

export interface IconProps {
  size?: number | string;
  className?: string;
}

export interface Tab {
  title: string;
  label: string;
  labelSelected?: string;
  icon: ElementType<IconProps>; // Changed from JSX.Element to a component type
  type?: never;
  component?: ReactNode;
}

export interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}

export type TabItem = Tab | Separator;

function isTab(item: TabItem): item is Tab {
  return item.type !== "separator";
}

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

// CSS-based transitions are used instead of framer-motion

export function ExpandableTabs({
  tabs,
  className = "",
  activeColor = "",
  onChange,
}: ExpandableTabsProps): ReactElement {
  const [selected, setSelected] = useState<number | null>(null);
  const outsideClickRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (): void => {
    setSelected(null);
    onChange?.(null);
  };

  useOnClickOutside<HTMLDivElement>(
    outsideClickRef as RefObject<HTMLDivElement>,
    () => {
      handleClickOutside();
    },
  );

  const handleSelect = (index: number, e?: MouseEvent): void => {
    e?.stopPropagation();
    const newSelected = selected === index ? null : index;
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const Separator = (): ReactElement => (
    <div className="bg-border mx-1 h-[24px] w-[1.2px]" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-0 rounded-full bg-gray-300 shadow shadow-black dark:bg-gray-600",
        className,
      )}
    >
      {tabs.map((tab, index) => {
        if (!isTab(tab)) {
          return <Separator key={`separator-${index}`} />;
        }

        return (
          <button
            data-tab-key={tab.title}
            key={tab.title}
            title={
              selected === index && tab.labelSelected
                ? tab.labelSelected
                : tab.label
            }
            aria-label={
              selected === index && tab.labelSelected
                ? tab.labelSelected
                : tab.label
            }
            aria-expanded={selected === index}
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              handleSelect(index);
            }}
            className={cn(
              "relative z-10 m-1 flex h-7 cursor-pointer items-center rounded-full text-sm font-medium",
              "transition-all duration-300",
              selected === index
                ? cn("bg-muted", activeColor)
                : "hover:bg-muted hover:text-foreground text-gray-600 dark:text-gray-400",
            )}
          >
            {createElement(tab.icon, { size: 18, className: "mx-2 rounded" })}
            <div
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
              }}
              className={cn(
                "inset-shadow-xl flex flex-1 flex-col overflow-hidden inset-shadow-black/50",
                "transition-all duration-300 ease-in-out",
                selected === index
                  ? "max-w-[420px] px-2 opacity-100"
                  : "max-w-0 opacity-0",
              )}
            >
              {tab.component ?? tab.title}
            </div>
          </button>
        );
      })}
    </div>
  );
}
