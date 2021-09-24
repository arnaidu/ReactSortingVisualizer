import React, { useState } from "react";
import ManyBars from "./ManyBars";
import { bubbleSortInit, bubbleSortStep } from "./bubbleSortState";
import { stringToArray, processInputs, handleChangeHelper } from "./formHelper";
import { validateInput, WarningBanner, error } from "./errorHandling";
import { insertionSortInit, insertionSortStep } from "./insertionSortState";

const Sort = () => {
  /* States used for this component */
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

  const [errorState, setErrorState] = useState(error); // by default there is no error

  // struct for information regarding how the graphic display for visualization should be
  const graphics = {
    array: state.array, //change this to be the array inputted from the form
    width: window.innerWidth / 2 / state.array.length, // or window.innerWidth / state.array.length (if we split above/below)
    maxHeight: window.innerHeight, // or window.innerHeight / 2 if we split (above/below)
  };

  const handleSubmit = (e) => {
    // if there is only a single element, then we can just render a quick return, might as well, then we can do the stuff below
    // if there is greater than 1 (2 or more elements in array)

    e.preventDefault();
    // Case where we are during sorting and can't resubmit the form
    if (!formInput.submit) {
      return false;
    }
    // here we can submit the form, and therefore are not running a sort, or have finished with previous sorting

    // note that we check to make sure that the form is able to be submitted, but also that it is filled, and lastly
    // that the form is correct (i.e. we validate the entry for the array)
    var properArray = processInputs(formInput.array);
    if (formInput.algorithm && formInput.array) {
      console.log("in if");
      console.log(properArray);
      formInput.array = properArray;
      var valid = validateInput(properArray);
      setErrorState({
        ...errorState,
        errorState: !valid,
        isValidArray: valid,
        existInputAlgo: true,
        existInputArray: true,
        lengthArray: properArray.length,
      });
      // <= 39 guarantees 20 numbers maximum, since cleaned input is n numbers and n - 1 commas
      if (valid && properArray.length <= 39) {
        console.log("In valid part");
        const numArray = stringToArray(properArray);
        setFormInput({ ...formInput, array: properArray, submit: false });
        if (formInput.algorithm === "BubbleSort") {
          setState({
            ...state,
            ...bubbleSortInit(numArray),
            timer: setInterval(() => handleTimer(), 1000),
          });
        }
      }
      // at this point, the state is not updating. I think it waits a bit, and on the second pass, it will update
      // console.log(state);
    } else {
      // case where we can submit, but are missing an input field
      const valid = validateInput(properArray);
      let err = {
        ...errorState,
        errorState: true,
        isValidArray: valid,
        lengthArray: properArray.length,
      };
      formInput.algorithm === ""
        ? (err.existInputAlgo = false)
        : (err.existInputAlgo = true);
      formInput.array === ""
        ? (err.existInputArray = false)
        : (err.existInputArray = true);
      setErrorState(err);
    }
  };

  const handleTimer = () => {
    console.log("in timer");
    setState((prevState) => {
      if (formInput.algorithm === "BubbleSort") {
        var nextState = bubbleSortStep(prevState);
      } else {
        var nextState = insertionSortStep(prevState);
      }
      console.log("one step sort algorithm");
      if (nextState.done) {
        clearInterval(prevState.timer);
        setFormInput({ ...formInput, submit: true });
      }
      return nextState;
    });
  };

  // wrapper function for handling the change in the form
  const handleChange = (e) => {
    handleChangeHelper(e, formInput, setFormInput);
    //let name = e.target.name;
    //let value = e.target.value;
    //setFormInput({ ...formInput, [name]: value });
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
          <WarningBanner {...errorState} type="array" />
          <div className="form-control">
            <label htmlFor="algorithm"> Algorithm: </label>
            <select name="algorithm" id="algorithm" onChange={handleChange}>
              <option value="" style={{ display: "none" }}></option>
              <option value="BubbleSort">Bubble Sort</option>
              <option value="InsertionSort">Insertion Sort</option>
            </select>
          </div>
          <WarningBanner {...errorState} type="missing-field" />
        </form>
        <button className="btn" onClick={handleSubmit}>
          Start Sorting
        </button>
      </article>
      {!errorState.errorState && <ManyBars {...graphics} />}
    </>
  );
};

export default Sort;
