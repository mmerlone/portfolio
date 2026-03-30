import { Suspense, type ReactElement } from "react";
import Quote, {
  QuoteFallback,
  type QuoteProps,
} from "@/components/widgets/Quote";

const QuoteSection = ({ quotesPromise }: QuoteProps): ReactElement => {
  return (
    <section
      id="quote"
      className="relative flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-950"
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
