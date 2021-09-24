import React from "react";
import OneBar from "./OneBar";

const ManyBars = (props) => {
  const { array, width, maxHeight } = props;
  var allBars = array.map((item, index) => {
    return (
      <div key={index} className="div1">
        <OneBar height={item * 100} width={width} />
      </div>
    );
  });

  return (
    <>
      <section>{allBars}</section>
    </>
  );
};

export default ManyBars;
