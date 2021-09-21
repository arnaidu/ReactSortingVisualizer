import React, { useState, useEffect } from "react";
//import OneBar from "./OneBar";
import { testState } from "./testState";
import ManyBars from "./ManyBars";
import { bubbleSortInit, bubbleSortStep } from "./bubbleSortState";
import { stringToArray, processInputs } from "./helper";

const Sort = () => {
  const [formInput, setFormInput] = useState({
    array: "",
    algorithm: "",
    submit: true, // allow for submitting the first time, then we will change it to prevent multiple submissions
  });

  const [state, setState] = useState({
    array: [],
    i: 0,
    j: 0,
    done: false,
    timer: 0,
  });

  const dim = {
    array: state.array, //change this to be the array inputted from the form
    width: 50,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.algorithm && formInput.array && formInput.submit) {
      const properArray = processInputs(formInput.array);
      // console.log(properArray);
      setFormInput({ ...formInput, array: properArray, submit: false });
      // console.log(formInput);
      const numArray = stringToArray(properArray);
      // console.log(numArray);

      setState({
        ...state,
        ...bubbleSortInit(numArray),
        timer: setInterval(() => handleTimer(), 1000),
      });

      // at this point, the state is not updating. I think it waits a bit, and on the second pass, it will update
      // console.log(state);
    }
  };

  const handleTimer = () => {
    console.log("in timer");
    setState((prevState) => {
      if (prevState.array == []) {
        console.log("array empty");
        return prevState;
      }
      const nextState = bubbleSortStep(prevState);
      console.log("one step sort algorithm");
      if (nextState.done) {
        clearInterval(prevState.timer);
        setFormInput({ ...formInput, submit: true });
      }
      return nextState;
    });
  };

  // make a function to handle what happens when we change the input
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormInput({ ...formInput, [name]: value });
  };
  return (
    <>
      <article className="form">
        <form>
          <div className="form-control">
            <label htmlFor="array">Array: </label>
            <input
              type="text"
              id="array"
              name="array"
              value={formInput.array}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="algorithm"> Algorithm: </label>
            <select name="algorithm" id="algorithm" onChange={handleChange}>
              <option value="" style={{ display: "none" }}></option>
              <option value="BubbleSort">BubbleSort</option>
              <option value="InsertionSort">Insertion Sort</option>
            </select>
          </div>
        </form>
        <button className="btn" onClick={handleSubmit}>
          Start Sorting
        </button>
      </article>
      <ManyBars {...dim} />
    </>
  );
};

export default Sort;
