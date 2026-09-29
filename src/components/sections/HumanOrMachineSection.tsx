import { type ReactElement } from "react";
import { llmHtml } from "@/data/llmHtml";

export default function HumanOrMachineSection(): ReactElement {
  return (
    <section id="human-or-machine" className="relative py-16">
      <div className="relative z-10 container mx-auto px-4">
        <div dangerouslySetInnerHTML={{ __html: llmHtml }} />
      </div>
    </section>
  );
}
