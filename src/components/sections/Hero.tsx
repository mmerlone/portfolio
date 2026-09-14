import { type ReactElement } from "react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import { CTA } from "@/components/ui/CTA";

interface HeroProps {
  className?: string;
}

export default function Hero({ className = "" }: HeroProps): ReactElement {
  const { name, title, label, roleTitles } = portfolio.basic;

  const proofLinks = [
    {
      label: "Selected engineering work",
      href: "#selected-engineering-work",
    },
    {
      label: "Cirrus migration article",
      href: "#headless-cms-migration-article",
    },
    {
      label: "Résumé",
      href: "#resume",
    },
  ] as const;

  const roles = roleTitles.join(", ");

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={
        "m-1 mx-auto mt-10 flex flex-col items-center justify-evenly gap-12 lg:m-2 lg:mt-20 lg:flex-row " +
        className
      }
    >
      <div className="max-w-3xl flex-1 px-6 pt-12 text-center md:pt-18 lg:pt-18 lg:text-left">
        <div className="p-8">
          <h1
            id="hero-title"
            className="balanced-heading mb-6 text-3xl font-bold text-gray-600 sm:text-4xl md:text-5xl lg:text-6xl dark:text-gray-300"
          >
            {name}
          </h1>
          <h2
            className="balanced-heading mb-4 text-xl text-gray-600 sm:text-2xl md:text-3xl lg:text-4xl dark:text-gray-300"
            {...(roles ? { title: "Fits: " + roles } : {})}
          >
            {title}
          </h2>
          {label && (
            <p className="hero-label mb-8 text-lg text-orange-600 sm:text-xl md:text-2xl dark:text-orange-400">
              {label}
            </p>
          )}
          <nav
            aria-label="Proof links"
            className="flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            {proofLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="cta-link rounded-lg bg-orange-700 px-8 py-3 text-white hover:bg-orange-800 dark:bg-orange-400 dark:text-gray-900 dark:hover:bg-orange-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-16">
          <CTA className="m-8" />
        </div>
      </div>

      <div className="relative max-w-3xl flex-1">
        <div className="group relative mx-auto w-full max-w-lg">
          <div className="a3d-border relative mr-3 rounded-full">
            <Image
              src={siteConfig.images.profile}
              alt={name}
              width={500}
              height={500}
              sizes="(min-width: 1024px) 500px, (min-width: 640px) 512px, 100vw"
              loading="eager"
              fetchPriority="high"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
