/**
 * This will be the display containing multiple bars representing the list that needs to be sorted.
 * We will include a cap of 100 elements, and remeber to make the width of the bar relative to screen
 */
import React, { useState } from "react";
import SingleBar from "./SingleBar";
//import { state } from "../testData";

// props is an array
function MultipleBars(props) {
  let num = props.length;
  let width = num / 10;
  // need to alter height and widths here or maybe I pass as props as well since the width should remain the same and height should remain the same
  let allBars = props.map((height) => {
    return <SingleBar height={10 * height} width={10 * width}></SingleBar>;
  });
  return (
    <>
      <section>{allBars}</section>
    </>
  );
}

export default MultipleBars;
