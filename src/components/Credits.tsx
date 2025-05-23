"use client";

import { siteConfig } from "@/config/site";
import { SectionTitle } from "./ui/SectionTitle";
import Slider from "react-slick";
import CardCredit from "./CardCredit";

const Credits = ({ className = "" }: { className?: string }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    // autoplay: true,
  };

  return (
    <section
      id="credits"
      className={`py-20 relative section-background-secondary ${className}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle>Credits</SectionTitle>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4 first:mt-0 sm:text-center sm:text-balance">
          This portfolio showcases my recent experience with the following
          companies and technologies, made possible by the contributions of many
          talented individuals.
        </p>
        <div className="max-w-6xl mx-auto my-4 overflow-hidden">
          <Slider className="slick-slider" {...sliderSettings}>
            {siteConfig.credits.map((credit) => (
              <CardCredit key={credit.name} credit={credit} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Credits;
