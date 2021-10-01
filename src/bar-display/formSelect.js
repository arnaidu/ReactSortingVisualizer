import React from "react";

const AlgorithmSelection = (handleChange) => {
  return (
    <div className="form-control">
      <label htmlFor="algorithm"> Algorithm: </label>
      <select name="algorithm" id="algorithm" onChange={handleChange}>
        <option value="" style={{ display: "none" }}></option>
        <option value="BubbleSort">Bubble Sort</option>
        <option value="InsertionSort">Insertion Sort</option>
      </select>
    </div>
  );
};

export default AlgorithmSelection;
