import React from "react";

const Slide: React.FC<{ item: number }> = ({ item }) => (
  <div style={slideStyle}>
    <div style={itemStyle}>{item}</div>
  </div>
);

const slideStyle: React.CSSProperties = {
  flexBasis: "auto",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  border: "1px solid #ccc",
  padding: "60px",
  backgroundColor: "#fff",
};

const itemStyle: React.CSSProperties = {
  width: "2.5rem",
  margin: "0 auto",
  color: "#333",
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
};

export default Slide;
