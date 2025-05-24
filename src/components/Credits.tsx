"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { creditsData } from "@/data/credits";
import { SectionTitle } from "./ui/SectionTitle";
import Slider from "react-slick";
import CardCredit from "./CardCredit";

// Custom Next Arrow component
const NextArrow = (
  props: React.ComponentPropsWithoutRef<"div"> & { onClick?: () => void }
) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !block`}
      style={{
        ...style,
        display: "block",
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
};

// Custom Prev Arrow component
const PrevArrow = (
  props: React.ComponentPropsWithoutRef<"div"> & { onClick?: () => void }
) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !block`}
      style={{
        ...style,
        display: "block",
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
};

const Credits = ({ className = "" }: { className?: string }) => {
  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots slick-dots-custom",
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        {dots}
      </div>
    ),

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
        <div className="max-w-6xl mx-auto my-4">
          <Slider {...sliderSettings}>
            {creditsData.map((credit) => (
              <CardCredit key={credit.name} credit={credit} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Credits;
