import React, { useEffect, useRef } from "react";

import Slide from "./Slide";

type numberOrNull = number | null;

interface ISlidesContainerProps {
  slides: number[];
  scrollLength: numberOrNull;
  offset: numberOrNull;
  loadNewSlides: () => void;
}

const ITEM_WIDTH = 172;

const SlidesContainer: React.FC<ISlidesContainerProps> = ({
  slides,
  scrollLength,
  offset,
  loadNewSlides,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollLength === null) return;

    if (!sliderRef.current) return;

    const scrollPromise = new Promise<void>((resolve, reject) => {
      if (!sliderRef.current) {
        reject("Slider ref is not defined");
        return;
      }

      const scrollDistance = scrollLength * ITEM_WIDTH;

      console.log("SCROLL DISTANCE:", scrollDistance);

      sliderRef.current.scrollTo({
        left: scrollDistance,
        behavior: "smooth",
      });

      resolve();
    });

    scrollPromise.then(() => {
      setTimeout(() => {
        console.log("Scroll animation completed. Loading new slides...");
        loadNewSlides();
      }, 500);
    }).catch((error) => {
      console.error("Error during scroll animation:", error);
    });
  }, [scrollLength, loadNewSlides]);

  useEffect(() => {
    if (offset === null) return;

    if (!sliderRef.current) return;

    const slidesOffset = offset * ITEM_WIDTH;

    console.log("SLIDES OFFSET:", slidesOffset);

    sliderRef.current.scrollLeft = slidesOffset;
  }, [offset]);

  return (
    <div id="slidesContainer" ref={sliderRef} style={containerStyle}>
      {slides.map((item: number, index: number) => (
        <Slide key={index} item={item} />
      ))}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  overflowX: "hidden",
  flexFlow: "row nowrap",
  alignItems: "center",
  gap: "10px",
  width: "80%",
};

export default SlidesContainer;
