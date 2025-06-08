"use client";
// https://21st.dev/victorwelander/expandable-tabs/default

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/cn";
import { useRef, ElementType } from "react";
import { IconProps } from "@/types/components";

export interface Tab {
  title: string;
  label: string;
  labelSelected?: string;
  icon: ElementType<IconProps>; // Changed from JSX.Element to a component type
  type?: never;
  component?: React.ReactNode;
}

export interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}

export type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className = "",
  activeColor = "",
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const outsideClickRef = useRef<HTMLDivElement>(null);

  useOnClickOutside<HTMLDivElement>(
    outsideClickRef as React.RefObject<HTMLDivElement>,
    () => {
      handleClickOutside();
    },
  );

  const handleClickOutside = () => {
    setSelected(null);
    onChange?.(null);
  };

  const handleSelect = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelected(selected === index ? null : index);
    onChange?.(index);
  };

  const Separator = () => (
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
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        return (
          <motion.button
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
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              handleSelect(index);
            }}
            transition={transition}
            className={cn(
              "relative z-10 m-1 flex h-7 cursor-pointer items-center rounded-full text-sm font-medium text-gray-600 transition-all duration-300 dark:text-gray-400",
              selected === index
                ? cn("bg-muted", activeColor)
                : "hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon size={18} className="mx-2 rounded" />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.div
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                  }}
                  className="flex flex-1 flex-col overflow-hidden"
                >
                  {tab.component ?? tab.title}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
