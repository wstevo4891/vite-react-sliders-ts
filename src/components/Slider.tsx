import React from "react";

import ArrowButton from "./ArrowButton";
import SlidesContainer from "./SlidesContainer";

import useController from "./useController";

import { SliderData } from "@services";

const LEFT = "left";
const RIGHT = "right";

const Slider: React.FC<{ data: SliderData }> = ({ data }) => {
  const controller = useController(data);

  const {
    data: { list },
    direction,
    offset,
    scrollLength,
    slideIndex,
    lastSlideIndex
  } = controller.state;

  console.log("direction:", direction);

  console.log("slideIndex", slideIndex);

  console.log("scrollLength:", scrollLength);

  console.log("offset:", offset);

  const handleNextSlide = (): void => {
    if (slideIndex === lastSlideIndex) return;

    controller.setDirection(RIGHT);
  };

  const handlePrevSlide = (): void => {
    if (slideIndex === 0) return;

    controller.setDirection(LEFT);
  };

  return (
    <div style={containerStyle}>
      <ArrowButton direction={LEFT} onClick={handlePrevSlide} />
      <SlidesContainer
        slides={list}
        scrollLength={scrollLength}
        offset={offset}
        loadNewSlides={controller.loadNewSlides}
      />
      <ArrowButton direction={RIGHT} onClick={handleNextSlide} />
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  width: "100%",
};

export default Slider;
