import { type ReactElement } from "react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import { CTA } from "@/components/ui/CTA";
import { buttonVariants } from "@/components/ui/button";

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
            className="balanced-heading text-muted-foreground mb-6 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {name}
          </h1>
          <h2
            className="balanced-heading text-muted-foreground mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl"
            {...(roles ? { title: "Fits: " + roles } : {})}
          >
            {title}
          </h2>
          {label && (
            <p className="hero-label text-primary mb-8 text-lg sm:text-xl md:text-2xl">
              {label}
            </p>
          )}
          <nav
            aria-label="Proof links"
            className="flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            {proofLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={buttonVariants({ size: "lg" })}
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
