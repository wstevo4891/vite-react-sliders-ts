import { useContext } from "react";

import SlideLengthContext from "./SlideLengthContext";

export default function useSlideLength(): { slideLength: number } {
  return useContext(SlideLengthContext);
}
