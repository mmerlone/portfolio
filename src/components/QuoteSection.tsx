"use client";

import { Suspense } from "react";
import Quote, { QuoteFallback } from "@/components/widgets/Quote";
import { cn } from "@/lib/cn";
import { type QuoteProps } from "@/types/components";

const QuoteSection = ({
  className = "",
  quotesPromise,
}: QuoteProps): React.ReactElement => {
  return (
    <section
      id="quote"
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-950",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        <div className="m-2 flex w-full items-center justify-center">
          <Suspense fallback={<QuoteFallback />}>
            <Quote quotesPromise={quotesPromise} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
