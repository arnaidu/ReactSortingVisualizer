import React, { useState } from "react";
// import OneBar from "./OneBar";
// import { testState } from "./testState";
import ManyBars from "./ManyBars";
import { bubbleSortInit, bubbleSortStep } from "./bubbleSortState";
import { stringToArray, processInputs } from "./formHelper";
import { validate, WarningBanner } from "./errorHandling";

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

  const error = {
    errorState: false,
    isValidArray: false,
    existInputArray: false,
    existInputAlgo: false,
  };

  const [errorState, setErrorState] = useState(error); // by default there is no error

  const graphics = {
    array: state.array, //change this to be the array inputted from the form
    width: 50,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // note that we check to make sure that the form is able to be submitted, but also that it is filled, and lastly
    // that the form is correct (i.e. we validate the entry for the array)
    var properArray = processInputs(formInput.array);
    if (formInput.algorithm && formInput.array && formInput.submit) {
      // console.log(properArray);
      var valid = validate(properArray);
      // console.log(valid);
      setErrorState({
        ...errorState,
        errorState: !valid,
        isValidArray: valid,
        existInputAlgo: true,
        existInputArray: true,
      });
      if (valid) {
        setFormInput({ ...formInput, array: properArray, submit: false });
        // console.log(formInput);
        const numArray = stringToArray(properArray);
        // console.log(numArray);
        setState({
          ...state,
          ...bubbleSortInit(numArray),
          timer: setInterval(() => handleTimer(), 250),
        });
      }

      // at this point, the state is not updating. I think it waits a bit, and on the second pass, it will update
      // console.log(state);
    } else {
      // In this case there is no valid input, or form is empty, so we can raise errors
      const valid = validate(properArray);
      console.log(valid);
      let err = { ...errorState, errorState: true, isValidArray: valid };
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
      if (prevState.array === []) {
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
          {console.log(errorState)}
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

// <WarningBanner {...errorState} type="array" />
//<WarningBanner {...errorState} type="missing-field" />
export default Sort;
