"use client";

import { aboutData } from "@/data/about";
import { AboutProps } from "@/types/components";
import { SectionTitle } from "./ui/SectionTitle";
import { TiltScroll } from "./ui/TiltScroll";
import { BackgroundEffects } from "@components/ui/BackgroundEffects";
import { cn } from "@/lib/cn";
import Image from "next/image";

const About = ({ className = "" }: AboutProps) => {
  return (
    <section
      id="about"
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden",
        className,
      )}
    >
      <BackgroundEffects backgrounds={{}}>
        <TiltScroll>
          <div className="m-4 mx-auto h-full overflow-hidden rounded-2xl p-4 md:rounded-2xl md:p-8">
            <div className="prose prose-lg dark:prose-invert rounded-2 mx-auto bg-gray-100 inset-shadow-xs inset-shadow-black/30 dark:bg-gray-950/50">
              <SectionTitle>{aboutData.title}</SectionTitle>
              {aboutData.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="m-2 mt-4 text-justify text-sm leading-relaxed text-gray-900 first:mt-0 sm:text-base dark:text-gray-100"
                >
                  {!index && (
                    <Image
                      src="/images/dialup.webp"
                      alt="dial-up"
                      className="float-left"
                      width={120}
                      height={120}
                    />
                  )}
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </TiltScroll>
      </BackgroundEffects>
    </section>
  );
};

export default About;
