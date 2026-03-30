"use client";

import {
  ExpandableTabs,
  type TabItem,
  type IconProps,
} from "@/components/ui/ExpandableTabs";
import ConfigIcon from "@/components/ui/config/ConfigIcon";
import ThemeToggleClient from "@/components/ThemeToggleClient";
import { type ReactElement } from "react";
import { DesktopIcon } from "@phosphor-icons/react";

export default function ConfigBar(): ReactElement {
  const configTabs: TabItem[] = [
    {
      title: "Theme",
      label: "Select Theme",
      icon: (props: IconProps) => (
        <ConfigIcon
          {...props}
          value={undefined}
          iconMap={{}}
          defaultIconComponent={DesktopIcon}
        />
      ),
      component: <ThemeToggleClient />,
    },
  ];

  return (
    <div className="flex-none">
      <ExpandableTabs
        tabs={configTabs}
        activeColor="text-primary inset-shadow-xl inset-shadow-black/50"
      />
    </div>
  );
}
