// https://codesandbox.io/p/sandbox/react-carousel-3d-9x3wt?file=%2Fsrc%2FSlider.js%3A1%2C1-118%2C1
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { CardCredit } from "./CardCredit";
import type { Credit } from "@/types/credits";
import { FC } from "react";

interface Carousel3DProps {
  credits: Credit[];
}

export const Carousel3D: FC<Carousel3DProps> = ({ credits }) => {
  const [activeSlide, setactiveSlide] = useState<number>(0);

  const next = () =>
    activeSlide < credits.length - 1 && setactiveSlide(activeSlide + 1);
  const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);

  const getStyles = (index: number) => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    else if (activeSlide - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (activeSlide + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    else if (index < activeSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
      };
    else if (index > activeSlide + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      };
  };

  return (
    <>
      <div className="slideC">
        {credits.map((item, i) => (
          <React.Fragment key={item.name}>
            <div
              className="slide"
              style={{
                ...getStyles(i),
              }}
            >
              <CardCredit credit={item} />
            </div>
            <div
              className="reflection bg-[linear-gradient(to_bottom,white_15%,_transparent)] dark:bg-[linear-gradient(to_bottom,rgb(23,_34,_56)_15%,_transparent)]"
              style={{
                ...getStyles(i),
              }}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="btns">
        <FontAwesomeIcon
          className="btn pointer"
          onClick={prev}
          icon={faChevronLeft}
          color="var(--primary)"
          size="2x"
        />
        <FontAwesomeIcon
          className="btn pointer"
          onClick={next}
          icon={faChevronRight}
          color="var(--primary)"
          size="2x"
        />
      </div>
    </>
  );
};
