import { type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

interface EducationSectionProps {
  className?: string;
}

export default function EducationSection({
  className,
}: EducationSectionProps): ReactElement {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className={"relative py-16 " + (className ?? "")}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="education-title">Education</SectionTitle>
        <div className="mx-auto max-w-3xl space-y-6">
          {portfolio.education.map((entry) => (
            <Card
              key={`${entry.institution}-${entry.years}`}
              className="flex gap-4"
            >
              <div className="bg-secondary text-secondary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <GraduationCap size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-foreground text-lg font-semibold">
                  {entry.program}
                </h3>
                <p className="text-muted-foreground">{entry.institution}</p>
                <p className="text-primary text-sm">{entry.years}</p>
                {entry.notes && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    {entry.notes}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
