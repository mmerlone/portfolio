"use client";

import {
  type CSSProperties,
  type FC,
  type ReactElement,
  Fragment,
  useState,
} from "react";
import { CaretRightIcon, CaretLeftIcon } from "@phosphor-icons/react";
import { CardCredit } from "./CardCredit";
import type { Credit } from "@/types/credits";

interface Carousel3DProps {
  credits: Credit[];
}

export const Carousel3D: FC<Carousel3DProps> = ({
  credits,
}: Carousel3DProps): ReactElement => {
  const [activeSlide, setactiveSlide] = useState<number>(0);

  const next = (): void => {
    if (activeSlide < credits.length - 1) {
      setactiveSlide(activeSlide + 1);
    }
  };

  const prev = (): void => {
    if (activeSlide > 0) {
      setactiveSlide(activeSlide - 1);
    }
  };

  const getStyles = (index: number): CSSProperties => {
    if (activeSlide === index) {
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    } else if (activeSlide - 1 === index) {
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    } else if (activeSlide + 1 === index) {
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    } else if (activeSlide - 2 === index) {
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    } else if (activeSlide + 2 === index) {
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    }
    return {
      opacity: 0,
      transform:
        index < activeSlide
          ? "translateX(-480px) translateZ(-500px) rotateY(35deg)"
          : "translateX(480px) translateZ(-500px) rotateY(-35deg)",
      zIndex: 7,
      pointerEvents: "none",
    };
  };

  return (
    <>
      <div className="slideC">
        {credits.map((item, i) => {
          // Windowing: only render items within +/- 2 of active slide
          if (Math.abs(i - activeSlide) > 2) return null;

          return (
            <Fragment key={`${item.name}-${i}`}>
              <div className="slide" style={getStyles(i)}>
                <CardCredit credit={item} />
              </div>
              <div
                className="reflection bg-[linear-gradient(to_bottom,white_15%,transparent)] dark:bg-[linear-gradient(to_bottom,rgb(23,34,56)_15%,transparent)]"
                style={getStyles(i)}
              />
            </Fragment>
          );
        })}
      </div>

      <div className="btns">
        <button
          className="btn pointer text-primary"
          onClick={prev}
          aria-label="Previous credit"
        >
          <CaretLeftIcon size={32} weight="bold" />
        </button>
        <button
          className="btn pointer text-primary"
          onClick={next}
          aria-label="Next credit"
        >
          <CaretRightIcon size={32} weight="bold" />
        </button>
      </div>
    </>
  );
};
