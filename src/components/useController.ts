import { useState } from "react";

import { SliderData } from "@services";

import {
  type numberOrNull,
  type directionType,
} from "@types";

interface IScrollMap {
  left: numberOrNull;
  right: numberOrNull;
}

type directionKey = keyof IScrollMap;

interface ISlidesMatrixItem {
  list: number[];
  offset: numberOrNull;
  scrollMap: IScrollMap;
}

interface IControllerState {
  data: ISlidesMatrixItem;
  direction: directionType;
  slideIndex: number;
  lastSlideIndex: number;
  scrollLength: numberOrNull;
  isScrolling: boolean;
  offset: numberOrNull;
}

interface IController {
  state: IControllerState;
  setDirection: (direction: directionType) => void;
  loadNewSlides: () => void;
}

const LEFT = "left";
const RIGHT = "right";

export default function useController(sliderData: SliderData): IController {
  const initialData = sliderData.selectList(0);

  const [state, setState] = useState<IControllerState>({
    data: initialData,
    direction: null,
    slideIndex: 0,
    lastSlideIndex: sliderData.lastSlideIndex,
    scrollLength: null,
    isScrolling: false,
    offset: null,
  });

  const setDirection = (direction: directionKey | null): void => {
    if (direction === null) return;

    const slideIndex: number = calcSlideIndex(direction);

    const scrollLength: number = state.data.scrollMap[direction];

    setState((prevState) => ({
      ...prevState,
      direction,
      slideIndex,
      scrollLength,
      isScrolling: true,
      offset: null,
    }));
  };

  const calcSlideIndex = (direction: directionType): number => {
    let result = state.slideIndex;

    if (direction === RIGHT) {
      result += 1;
    } else if (direction === LEFT) {
      result -= 1;
    }

    return result;
  };

  const loadNewSlides = (): void => {
    const data = sliderData.selectList(state.slideIndex);

    setState((prevState) => ({
      ...prevState,
      data,
      direction: null,
      isScrolling: false,
      scrollLength: null,
      offset: data.offset,
    }));
  };

  return {
    state,
    setDirection,
    loadNewSlides
  };
};
