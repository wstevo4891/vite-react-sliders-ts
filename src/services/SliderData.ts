/**
 * Constant value of the width of each slide item plus gap in pixels.
 */
const ITEM_WIDTH = 172;

type numberOrNull = number | null;

interface IScrollMap {
  left: numberOrNull;
  right: numberOrNull;
}

interface ISlidesMatrixItem {
  list: number[];
  offset: numberOrNull;
  scrollMap: IScrollMap;
}

const BLANK_ITEM: ISlidesMatrixItem = {
  list: [],
  offset: 0,
  scrollMap: { left: null, right: null },
};

/**
 * SliderData.ts
 * This file contains a class that provides static data for a slider component.
 * 
 * 1. The class should build a matrix containing lists of slider items, based on an
 *    input number representing the total number of items in the slider.
 *
 * 2. The slider will select lists from the matrix based on the current slide index.
 * 
 * 3. Each list in the matrix should contain 2 - 3 slides of items. At the beginning
 *    of the slider, we only need to render 2 slides. As the user navigates to the
 *    middle of the slider, we will render 3 slides. At the end of the slider,
 *    we will render 2 slides again.
 * 
 * 4. Slides should be responsive to the screen size.
 * 
 * 5. The number of items per slide should be determined by the screen width,
 *    so the class will need an input parameter for the screen width.
 */
export default class SliderData {
  totalItems: number = 0;
  slideLength: number = 0;
  slideWidth: number = 0;
  totalSlides: number = 0;
  lastSlideIndex: number = 0;
  private numberList: number[] = [];
  private matrix: ISlidesMatrixItem[] = [];

  constructor(totalItems: number, slideLength: number) {
    this.totalItems = totalItems;
    this.slideLength = slideLength;
    this.slideWidth = this.slideLength * ITEM_WIDTH;
    this.totalSlides = Math.ceil(totalItems / slideLength);
    this.lastSlideIndex = this.totalSlides - 1;
    this.buildNumberList(totalItems);
    this.buildMatrix();
  }

  selectList(listIndex: number): ISlidesMatrixItem {
    return this.matrix[listIndex] || BLANK_ITEM;
  }

  printData(): void {
    console.log("SLIDER DATA MATRIX:", JSON.stringify(this.matrix, null, 2));
  }

  /**
   * Builds a matrix of items for the slider.
   * 
   * 1. For each list in the matrix, calculate the start and end indices
   * 
   * 2. The first and last lists should contain 2 slides,
   *    while the middle lists should contain 3 slides.
   * 
   * 3. Each slide on the end of a list should contain an extra item
   *    to render half a slide, indicating more content. For the first
   *    list, the second slide should contain an extra item. For the
   *    last list, the first slide should contain an extra item.
   * 
   * 4. 
   */
  private buildMatrix(): void {
    for (let i = 0; i < this.totalSlides; i++) {
      const list = this.buildSlidesList(i);
      const offset = this.calcSlidesOffset(i);
      const scrollMap = this.buildscrollMap(i);

      this.matrix.push({ list, offset, scrollMap });
    }
  }

  private buildscrollMap(currentIndex: number): IScrollMap {
    let left = null;
    let right = null;

    if (currentIndex === 0) {
      right = this.slideLength;

    } else if (currentIndex === 1) {
      left = 0;
      right = this.slideLength * 2;

    } else if (currentIndex < this.lastSlideIndex) {
      left = 1;
      right = (this.slideLength * 2) + 1;

    } else {
      left = 1;
    }

    return { left, right };
  }

  private calcSlidesOffset(currentIndex: number): number {
    if (currentIndex === 0) {
      return 0;
    } else if (currentIndex === 1) {
      return this.slideLength;
    } else {
      return this.slideLength + 1;
    }
  }

  private buildSlidesList(currentIndex: number): number[] {
    let start = 0;
    let end = 0;

    if (currentIndex === 0) {
      end = (this.slideLength * 2) + 1;

    } else if (currentIndex === 1) {
      end = (this.slideLength * 3) + 1;

    } else if (currentIndex < this.lastSlideIndex - 1) {
      start = ((currentIndex - 1) * this.slideLength) - 1;
      end = start + (this.slideLength * 3) + 2;

    } else {
      start = ((currentIndex - 1) * this.slideLength) - 1;
      end = this.totalItems;
    }

    return this.numberList.slice(start, end);
  }

  private buildNumberList(length: number): void {
    this.numberList = Array.from({ length }, (_value, index) => index + 1);
  }
}
