import React from "react";
import OneBar from "./OneBar";
import { testState } from "./testState";
import ManyBars from "./ManyBars";

const Sort = () => {
  const dim = {
    array: testState,
    height: 50,
    width: 50,
  };
  return (
    <>
      <article className="form">
        <form>
          <div className="form-control">
            <label htmlFor="array">Array: </label>
            <input type="text" id="array" name="array" />
          </div>
          <div className="form-control">
            <label htmlFor="sort"> Algorithm: </label>
            <select name="sort" id="sort">
              <option style={{ display: "none" }}></option>
              <option value="bubble">BubbleSort</option>
              <option value="insert">Insertion Sort</option>
            </select>
          </div>
        </form>
        <button className="btn">Start Sorting</button>
      </article>
      <ManyBars {...dim} />
    </>
  );
};

export default Sort;
