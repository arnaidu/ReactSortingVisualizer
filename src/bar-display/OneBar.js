import React from "react";

const OneBar = (props) => {
  const { height, width } = props;
  return (
    <>
      <svg width={width} height={height} className="bar">
        <rect width={width} height={height}></rect>
      </svg>
      <p className="p1">{height}</p>
    </>
  );
};

export default OneBar;
