import { type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import { MapPinIcon } from "@phosphor-icons/react/ssr";

interface AboutSectionProps {
  className?: string;
}

export default function AboutSection({
  className,
}: AboutSectionProps): ReactElement {
  const { summary, label, location } = portfolio.basic;

  return (
    <section id="about" className={cn("relative py-24", className)}>
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle>About</SectionTitle>
        <div className="mx-auto max-w-3xl">
          {label && (
            <p className="text-accent mb-6 text-center text-xl font-semibold">
              {label}
            </p>
          )}
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            {summary}
          </p>
          <p className="text-subtle-foreground flex items-center justify-center gap-2 text-sm">
            <MapPinIcon size={16} weight="bold" />
            {location}
          </p>
        </div>
      </div>
    </section>
  );
}
