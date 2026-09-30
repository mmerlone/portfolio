import { type ReactElement } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/card";
import { howIBuildPrinciples } from "@/data/howIBuildPrinciples";

interface HowIBuildSectionProps {
  className?: string;
}

export default function HowIBuildSection({
  className,
}: HowIBuildSectionProps): ReactElement {
  return (
    <section
      id="how-i-build"
      aria-labelledby="how-i-build-title"
      className={"relative py-16 " + (className ?? "")}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="how-i-build-title">How I build</SectionTitle>
        <div className="mx-auto max-w-5xl space-y-8">
          {howIBuildPrinciples.map((principle, idx) => (
            <Card key={idx} padding="lg">
              <h3 className="text-foreground mb-3 text-xl font-semibold">
                {principle.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {principle.description}
              </p>
              <a
                href={principle.evidenceHref}
                className="text-primary text-sm font-medium hover:underline"
              >
                Evidence: {principle.evidence}
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
