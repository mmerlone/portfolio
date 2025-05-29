"use client";

import { creditsData } from "@/data/credits";
import { SectionTitle } from "./ui/SectionTitle";
import CardCredit from "./CardCredit";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { useWindowSize } from "../hooks/useWindowSize";

const Credits = ({ className = "" }: { className?: string }) => {

  // const windowSize = useWindowSize();
  // const carouselWidht = windowSize.width < 600 ? '380px' : '650px';

  return (
    <section
      id="credits"
      className={`relative flex items-center justify-center ${className}`}
    >
      <div className="relative z-10 container flex flex-col items-center justify-center">
        <SectionTitle>Credits</SectionTitle>
        <p className="mx-5 leading-relaxed text-gray-600 first:mt-0 sm:mx-12 sm:text-center sm:text-balance dark:text-gray-300">
          This portfolio showcases my recent experience with the following
          companies and technologies, made possible by the contributions of many
          talented individuals.
        </p>
        <div className="mx-auto my-8 py-8 w-full">
          <Carousel
            autoPlay={false}
            infiniteLoop={true}
            // width={carouselWidht}
            showStatus={false}
            showThumbs={false}
            showArrows={true}
          >
            {creditsData.map((credit) => (
              <CardCredit key={credit.name} credit={credit} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Credits;
