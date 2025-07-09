import React from "react";

import { Slider } from "@components";

import { useSlideLength } from "@contexts";

import { SliderData } from "@services";

const SLIDER_ITEMS = 18;

const SliderApp: React.FC = () => {
  const { slideLength } = useSlideLength();

  console.log("slideLength:", slideLength);

  const sliderData: SliderData = new SliderData(SLIDER_ITEMS, slideLength);

  sliderData.printData();

  return <Slider data={sliderData} />;
};

export default SliderApp;
