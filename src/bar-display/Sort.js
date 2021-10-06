import React, { useState } from "react";
import ManyBars from "./ManyBars";
import {
  bubbleSortInit,
  bubbleSortStep,
  bubbleSortPrev,
} from "./bubbleSortState";
import { stringToArray, processInputs } from "./formProcessing";
import { WarningBanner, error, getErrorState } from "./errorHandling";
import {
  handleNext,
  handlePrev,
  handleChange,
  handleSubmit,
} from "./buttonHandlers";
import { Title, Finished } from "./title";
import Bar from "./Bar";
import Input from "./input";
import Buttons from "./buttons";
const buttonNames = {
  pause: "Pause",
  sort: "Sort",
  increment: "Step",
  decrement: "Prev",
  reset: "Reset",
  continue: "Continue",
};

const initString =
  "Max 20 comma separated numbers : -20 \u2264 # \u2264 20 : Ex: 20,-10,3,-5";

const initialFormInput = {
  array: "",
  algorithm: "",
};

const initFormState = {
  submit: true, // allow for submitting the first time, then we will change it to prevent multiple submissions
  pause: true,
};

const initState = {
  array: [],
  done: true,
};

const Sort = () => {
  /* States used for this component */
  const [formInput, setFormInput] = useState(initialFormInput);

  const [formState, setFormState] = useState(initFormState);

  // const backupFormInput = useRef(initialState);

  //const [bubbleState, setBubbleState] = useState({ array: [] });
  const [state, setState] = useState({ ...initState });

  const [errorState, setErrorState] = useState(error); // by default there is no error

  // struct for information regarding how the graphic display for visualization should be
  const graphics = {
    state: state,
    // width: window.innerWidth / state.array.length,
    //submit: formInput.submit,
  };

  const handleSubmitWrapper = (e) => {
    handleSubmit(
      e,
      formState,
      formInput,
      errorState,
      state,
      setState,
      setErrorState
    );
  };

  const handleTimer = () => {
    setState((prevState) => {
      let nextState;

      nextState = bubbleSortStep(prevState);
      if (nextState.done) {
        clearInterval(prevState.timer);
        /*setFormInput((prevState) => {
          return { ...prevState, submit: true, pause: true };
        });
        */
        setFormState((prevState) => {
          return { ...prevState, submit: true, pause: true };
        });
      }
      return nextState;
    });
  };

  // wrapper function for handling the change in the form
  const handleChangeWrapper = (e) => {
    handleChange(e, setFormInput);
  };

  const handlePause = (e) => {
    e.preventDefault();
    //let name = e.target.name;
    //let value = e.target.value;
    clearInterval(state.timer);

    /*setFormInput((prevState) => {
      return { ...prevState, [name]: value, submit: false, pause: true };
    });*/
    setFormState((prevState) => {
      return { ...prevState, submit: false, pause: true };
    });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    /*setFormInput((prevState) => {
      return { ...prevState, submit: false, pause: false };
    });
    */
    setFormState((prevState) => {
      return { ...prevState, submit: false, pause: false };
    });
    setState({
      ...state,
      timer: setInterval(() => {
        handleTimer(e);
      }, 250),
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    /*
    setFormInput(() => {
      return initialFormInput;
    });
    */
    setFormState(() => {
      return initFormState;
    });
    setState((prevState) => {
      clearInterval(prevState.timer);
      return initState;
    });
  };

  const handleNextWrapper = (e) => {
    handleNext(
      e,
      formInput,
      state,
      errorState,
      setErrorState,
      setState,
      setFormState
    );
  };

  const handlePrevWrapper = (e) => {
    handlePrev(e, state, setState, formState, setFormState);
  };

  const buttonInputs = {
    handleSubmit: handleSubmitWrapper,
    handleReset: handleReset,
    handleContinue: handleContinue,
    handlePause: handlePause,
    handleNextWrapper: handleNextWrapper,
    handlePrevWrapper: handlePrevWrapper,
  };

  return (
    <>
      <section className="nav-bar">
        <Title />
        <Input
          errorState={errorState}
          handleChangeWrapper={handleChangeWrapper}
          formInput={formInput}
        />
        {/*
        <form id="inputs" autoComplete="off">
          <div id="input1">
            <label htmlFor="array" id="labels">
              Array:{" "}
            </label>
            {
            <input
              type="text"
              id="array"
              name="array"
              value={formInput.array}
              placeholder={initString}
              onChange={handleChangeWrapper}
            />}
            <Input
              setForm={setFormInput}
              handleChangeWrapper={handleChangeWrapper}
              formInput={formInput}
              errorState={errorState}
            />
            <WarningBanner {...errorState} type="array" key="3" />
          </div>

          <div id="input2">
            <label htmlFor="algorithm" id="labels">
              {" "}
              Algorithm:{" "}
            </label>
            <select
              name="algorithm"
              id="algorithm"
              value={formInput.algorithm}
              onChange={handleChangeWrapper}
            >
              <option value="" style={{ display: "none" }}></option>
              <option value="BubbleSort">Bubble Sort</option>
            </select>
            <WarningBanner {...errorState} type="missing-field" key="4" />
          </div>
        </form>
        */}
        {/*}
        <div className="buttons">
          <div>
            <button
              className="pushable"
              //disabled={formInput.submit ? "" : true}
              onClick={handlePrevWrapper}
            >
              <span className="edge"></span>
              <span className="front">{buttonNames.decrement}</span>
            </button>
          </div>
          <div>
            {formInput.submit ? (
              <button className="pushable" onClick={handleSubmit}>
                <span className="edge"></span>
                <span className="front">{buttonNames.sort}</span>
              </button>
            ) : (
              <button className="pushable" onClick={handleReset}>
                <span className="edge"></span>
                <span className="front">{buttonNames.reset}</span>
              </button>
            )}
            {formInput.pause ? (
              <div id="spacing">
                <button className="pushable" onClick={handleContinue}>
                  <span className="edge"></span>
                  <span className="front">{buttonNames.continue}</span>
                </button>
              </div>
            ) : (
              <div id="spacing">
                <button className="pushable" onClick={handlePause}>
                  <span className="edge"></span>
                  <span className="front">{buttonNames.pause}</span>
                </button>
              </div>
            )}
          </div>
          <div>
            <button
              className="pushable"
              //disabled={formInput.submit ? "" : true}
              onClick={handleNextWrapper}
            >
              <span className="edge"></span>
              <span className="front">{buttonNames.increment}</span>
            </button>
          </div>
        </div>
            */}
        <Buttons {...buttonInputs} formState={formState} key="buttons" />
      </section>
      {state.done && state.array.length > 0 && (
        <Finished /> //<div id="finished">Finished Sorting</div>
      )}
      <Bar errorState={errorState} graphics={graphics} />
      {/*
      <section className="bars">
        {!errorState.errorState && <ManyBars {...graphics} />}
      </section>
      */}
    </>
  );
};

export default Sort;
