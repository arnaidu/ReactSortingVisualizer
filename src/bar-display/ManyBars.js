import React from "react";
import OneBar from "./OneBar";

const ManyBars = (props) => {
  const { array, height, width } = props;
  const allBars = array.map((item) => {
    return (
      <div key={item} className="div1">
        <OneBar height={item} width={width} />
      </div>
    );
  });

  return (
    <>
      <div>{allBars}</div>
    </>
  );
};

export default ManyBars;
