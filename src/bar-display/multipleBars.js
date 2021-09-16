/**
 * This will be the display containing multiple bars representing the list that needs to be sorted.
 * We will include a cap of 100 elements, and remeber to make the width of the bar relative to screen
 */
import React, { useState } from "react";
import SingleBar from "./SingleBar";
import { state } from "../testData";

function MultipleBars() {
  const [bar, setBar] = useState({}); // a single bar
  const [allBars, setAllBars] = useState([]); // array of all bars
  let num = state.length;
  let width = num / 10;
  let all = state.map((height) => {
    return <SingleBar height={10 * height} width={10 * width}></SingleBar>;
  });
  return (
    <>
      <section>{all}</section>
    </>
  );
}

export default MultipleBars;
