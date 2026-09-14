import { type ReactElement } from "react";
import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import GetInTouchSection from "@/components/sections/GetInTouchSection";

export const metadata: Metadata = {
  title: `Contact — ${portfolio.basic.name}`,
  description: `Email and social links to contact ${portfolio.basic.name} directly.`,
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage(): ReactElement {
  const { name } = portfolio.basic;

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-100">
        Contact {name}
      </h1>
      <div className="mx-auto max-w-3xl">
        <GetInTouchSection />
      </div>
    </main>
  );
}
