import React, { useState, useEffect, useRef } from "react";
import ManyBars from "./ManyBars";
import {
  bubbleSortInit,
  bubbleSortStep,
  bubbleSortPrev,
} from "./bubbleSortState";
import { stringToArray, processInputs } from "./formHelper";
import { WarningBanner, error, getErrorState } from "./errorHandling";
import { insertionSortInit, insertionSortStep } from "./insertionSortState";
import Instructions from "./Instructions";

const buttonNames = {
  pause: "Pause",
  sort: "Sort",
  increment: "Step",
  decrement: "Prev",
};

const initString =
  "Input numbers separated by commas. -20 <= numbers <= 20 and array length <= 20. Ex: 5,4,3,2,1";

const initialFormState = {
  array: "",
  algorithm: "",
  submit: true, // allow for submitting the first time, then we will change it to prevent multiple submissions
  pause: true,
};

const initState = {
  array: [],
  done: false,
};

const Sort = () => {
  /* States used for this component */
  const [formInput, setFormInput] = useState({ ...initialFormState });

  // const backupFormInput = useRef(initialState);

  //const [bubbleState, setBubbleState] = useState({ array: [] });
  const [state, setState] = useState({ ...initState });

  const [errorState, setErrorState] = useState(error); // by default there is no error

  // struct for information regarding how the graphic display for visualization should be
  const graphics = {
    state: state,
    width: window.innerWidth / state.array.length,
    maxHeight: window.innerHeight / 2,
    submit: formInput.submit,
    //maxHeight: window.innerHeight / 2,
  };

  const handleSubmit = (e) => {
    // if there is only a single element, then we can just render a quick return, might as well, then we can do the stuff below
    // if there is greater than 1 (2 or more elements in array)

    e.preventDefault();
    // Case where we are during sorting and can't resubmit the form (i.e. not paused)
    /*
    if (!formInput.submit) {
      return false;
    }
    */
    if (!formInput.pause) {
      return false;
    }
    /*  
    if (formInput.submit && formInput.pause) {
      formInput.pause = false; // since we are doing an aciton to unpause so set false
    }
    */
    var properArray = processInputs(formInput.array);
    formInput.array = properArray;
    const es = getErrorState(formInput, errorState, properArray);
    setErrorState(es);
    console.log("got error state", es);
    // if no error then proceed
    if (!es.errorState) {
      console.log("In valid part");
      const numArray = stringToArray(properArray);
      formInput.array = properArray;
      //setFormInput({ ...backupFormInput.current, submit: false, pause: false });
      console.log(formInput);
      //console.log(backupFormInput);
      if (formInput.algorithm === "BubbleSort") {
        if (state.array.length === 0) {
          formInput.pause = false; // we have either submitted first time, or have unpaused, so make it so we can't resubmit
          state.array = numArray;
          console.log("initial state");
          setState({
            ...bubbleSortInit(state.array),
            timer: setInterval(() => {
              console.log("setting interval if");
              if (!formInput.pause && !state.done) {
                handleTimer(e);
              }
            }, 250),
          });
        } else {
          formInput.pause = false; // we have either submitted first time, or have unpaused, so make it so we can't resubmit
          console.log("attempting to execute after pause", state);
          console.log(formInput);
          setState((prevState) => {
            return {
              ...prevState,
              timer: setInterval(() => {
                console.log("setting interval else");
                if (!formInput.pause && !state.done) {
                  handleTimer(e);
                }
              }, 250),
            };
          });
        }
      }
      if (formInput.algorithm === "InsertionSort") {
        setState({
          ...insertionSortInit(numArray),
          timer: setInterval(() => {
            handleTimer();
          }, 250),
        });
      }
    } else {
      return false;
    }
  };

  const handleTimer = (e) => {
    console.log("Pause in timer: ", formInput);
    //  maybe put if statement out here -- get rid of else because we never reach it
    setState((prevState) => {
      if (!formInput.pause) {
        console.log("prevstate: ", prevState);
        let nextState;
        if (formInput.algorithm === "BubbleSort") {
          nextState = bubbleSortStep(prevState);
        } else {
          nextState = insertionSortStep(prevState);
        }
        console.log("nextstate: ", nextState);
        console.log("one step has been computed");
        if (nextState.done) {
          console.log("should be finished");
          clearInterval(prevState.timer); // we add the timer, so no need to worry about warning -- but can get rid or warning if want
          setFormInput((prevState) => {
            return { ...prevState, submit: true, pause: true };
          });
        }
        return nextState;
      } else {
        console.log("pausing...");
        setFormInput((prevState) => {
          return { ...prevState, submit: true, pause: true };
        });
        let nextState = bubbleSortStep(prevState);
        clearInterval(prevState.timer);
        return nextState;
      }
    });
  };

  // wrapper function for handling the change in the form
  const handleChange = (e) => {
    // handleChangeHelper(e, formInput, setFormInput);
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setFormInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handlePause = (e) => {
    e.preventDefault();
    console.log("clicked pause", formInput.pause, state);
    let name = e.target.name;
    let value = e.target.value;
    clearInterval(state.timer);
    console.log(state);

    setFormInput((prevState) => {
      return { ...prevState, [name]: value, submit: true, pause: true };
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    var properArray = processInputs(formInput.array);
    const es = getErrorState(formInput, errorState, properArray);
    setErrorState(es);
    console.log("in next");
    console.log(state.array);
    if (!es.errorState) {
      const numArray = stringToArray(properArray);
      formInput.array = properArray;
      if (!state.done) {
        if (state.array.length === 0) {
          setState({
            ...bubbleSortInit(numArray),
            timer: 0,
          });
        } else {
          setState((prevState) => {
            let nextState = bubbleSortStep(prevState);
            return nextState;
          });
        }
      }
    } else {
      return false;
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (state.array.length > 0) {
      setState((prevState) => {
        let nextState = bubbleSortPrev(prevState);
        return nextState;
      });
    } else {
      return false;
    }
  };
  return (
    <>
      <section className="nav-bar">
        <div className="logo">Sorting Visualizer</div>
        <form id="inputs" autoComplete="off">
          <div id="input1">
            <label htmlFor="array" id="labels">
              Array:{" "}
            </label>
            <input
              type="text"
              id="array"
              name="array"
              value={formInput.array} //{formInput.array ? formInput.array : initString}
              onChange={handleChange}
            />
            <WarningBanner {...errorState} type="array" />
          </div>

          <div id="input2">
            <label htmlFor="algorithm" id="labels">
              {" "}
              Algorithm:{" "}
            </label>
            <select name="algorithm" id="algorithm" onChange={handleChange}>
              <option value="" style={{ display: "none" }}></option>
              <option value="BubbleSort">Bubble Sort</option>
              <option value="InsertionSort">Insertion Sort</option>
            </select>
            <WarningBanner {...errorState} type="missing-field" />
          </div>
        </form>
        <div id="buttons">
          <button
            className="pushable"
            //disabled={formInput.submit ? "" : true}
            onClick={handlePrev}
          >
            <span className="edge"></span>
            <span className="front">{buttonNames.decrement}</span>
          </button>
          {formInput.pause ? (
            <button className="pushable" onClick={handleSubmit}>
              <span className="edge"></span>
              <span className="front">{buttonNames.sort}</span>
            </button>
          ) : (
            <button className="pushable" onClick={handlePause}>
              <span className="edge"></span>
              <span className="front">{buttonNames.pause}</span>
            </button>
          )}
          <button
            className="pushable"
            //disabled={formInput.submit ? "" : true}
            onClick={handleNext}
          >
            <span className="edge"></span>
            <span className="front">{buttonNames.increment}</span>
          </button>
        </div>
      </section>
      {state.done && <div id="finished">Finished Sorting</div>}
      <section className="bars">
        {!errorState.errorState && <ManyBars {...graphics} />}
      </section>
    </>
  );
};

export default Sort;
