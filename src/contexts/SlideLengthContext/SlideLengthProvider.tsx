import React, { useEffect, useState } from "react";

import SlideLengthContext from "./SlideLengthContext";

// const SLIDE_LENGTH_MAP = {
//   500: 3,
//   768: 4,
//   1024: 5,
//   1440: 6,
// };

const SLIDE_LENGTH_MAP = {
  900: 3,
  1070: 4,
  1260: 5,
  1350: 6,
};

const SlideLengthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [slideLength, setSlideLength] = useState<number>(3);

  useEffect(() => {
    const handleResize = (): void => {
      let newSlideLength: number = 3; // Default value

      const width: number = window.innerWidth;
      
      for (const [breakpoint, length] of Object.entries(SLIDE_LENGTH_MAP)) {
        if (width <= parseInt(breakpoint)) {
          newSlideLength = length;
          break;
        }
      }

      setSlideLength(newSlideLength);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SlideLengthContext.Provider value={{ slideLength }}>
      {children}
    </SlideLengthContext.Provider>
  );
};

export default SlideLengthProvider;
