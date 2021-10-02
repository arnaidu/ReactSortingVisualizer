import React, { useState, useEffect, useRef } from "react";
import ManyBars from "./ManyBars";
import {
  bubbleSortInit,
  bubbleSortStep,
  bubbleSortPrev,
} from "./bubbleSortState";
import { stringToArray, processInputs } from "./formProcessing";
import { WarningBanner, error, getErrorState } from "./errorHandling";
import { handleNext, handlePrev, handleChange } from "./buttonHandlers";

const buttonNames = {
  pause: "Pause",
  sort: "Sort",
  increment: "Step",
  decrement: "Prev",
};

const initString =
  "Max 20 comma separated numbers : -20 \u2264 # \u2264 20 : Ex: 20,-10,3,-5";

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
  };

  const handleSubmit = (e) => {
    // if there is only a single element, then we can just render a quick return, might as well, then we can do the stuff below
    // if there is greater than 1 (2 or more elements in array)

    e.preventDefault();
    // Case where we are during sorting and can't resubmit the form (i.e. not paused)
    if (!formInput.submit) {
      return false;
    }

    console.log("Pause is True");
    var properArray = processInputs(formInput.array);
    formInput.array = properArray;
    const es = getErrorState(formInput, errorState, properArray);
    setErrorState(es);
    // if no error then proceed
    if (!es.errorState) {
      console.log("In valid part no error");
      const numArray = stringToArray(properArray);
      formInput.array = properArray;
      //setFormInput({ ...backupFormInput.current, submit: false, pause: false });
      console.log(formInput);
      console.log(state);
      formInput.submit = false;
      formInput.pause = false;
      state.array = numArray;
      setState({
        ...bubbleSortInit(state.array),
        timer: setInterval(() => {
          console.log("setting interval if");
          handleTimer(e);
        }, 250),
      });
    }
  };

  const handleTimer = (e) => {
    console.log("Pause in timer: ", formInput);
    //  maybe put if statement out here -- get rid of else because we never reach it

    setState((prevState) => {
      console.log("prevstate: ", prevState);
      let nextState;

      nextState = bubbleSortStep(prevState);

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
    });
  };

  // wrapper function for handling the change in the form
  const handleChangeWrapper = (e) => {
    handleChange(e, formInput, setFormInput);
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

  const handleNextWrapper = (e) => {
    handleNext(e, formInput, state, errorState, setErrorState, setState);
  };

  const handlePrevWrapper = (e) => {
    handlePrev(e, state, setState);
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
              value={formInput.array}
              placeholder={initString}
              onChange={handleChangeWrapper}
            />
            <WarningBanner {...errorState} type="array" />
          </div>

          <div id="input2">
            <label htmlFor="algorithm" id="labels">
              {" "}
              Algorithm:{" "}
            </label>
            <select
              name="algorithm"
              id="algorithm"
              onChange={handleChangeWrapper}
            >
              <option value="" style={{ display: "none" }}></option>
              <option value="BubbleSort">Bubble Sort</option>
            </select>
            <WarningBanner {...errorState} type="missing-field" />
          </div>
        </form>
        <div id="buttons">
          <button
            className="pushable"
            //disabled={formInput.submit ? "" : true}
            onClick={handlePrevWrapper}
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
            onClick={handleNextWrapper}
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
