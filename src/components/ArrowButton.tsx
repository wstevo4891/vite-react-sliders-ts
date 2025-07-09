import React, { useRef } from "react";

import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

interface IArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

const BUTTON_ANIMATION = [
  { transform: "scale(1.5)" },
  { transform: "scale(1)" },
]

const ANIMATION_TIMING = {
  duration: 500,
  iterations: 1,
}

const ArrowButton: React.FC<IArrowButtonProps> = ({ direction, onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const Icon = (direction === "left") ? LeftCircleOutlined : RightCircleOutlined;

  const handleClick = (): void => {
    if (buttonRef.current) {
      buttonRef.current.animate(BUTTON_ANIMATION, ANIMATION_TIMING);
    }
    onClick();
  };

  return (
    <button
      ref={buttonRef}
      style={buttonStyle}
      onClick={handleClick}
    >
      <Icon style={iconStyle} />
    </button>
  );
}

const buttonStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  outline: "none",
  cursor: "pointer",
};

const iconStyle: React.CSSProperties = {
  fontSize: "3rem",
  color: "#fff",
};

export default ArrowButton;
