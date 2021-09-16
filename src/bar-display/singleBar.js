import React from "react";

// component for a singleBar
// we will have properties corresponding to the height of the bar and indexed position of bar
// props = {yvalue, xvalue, color} -- the idea is to change the color of the bar moving, but keep all other bars same color
function SingleBar(props) {
  const { height, width } = props;
  return (
    <>
      <svg width={width} height={height} class="bar">
        <rect width={width} height={height}></rect>
      </svg>
    </>
  );
}

export default SingleBar;
