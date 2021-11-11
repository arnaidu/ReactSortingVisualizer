import { processInputs, stringToData } from "./formProcessing";
import { getErrorState } from "./errorHandling";
import {
  bubbleSortInit,
  bubbleSortStep,
  bubbleSortPrev,
} from "../bar-display/bubbleSortState";

/* Initial Form State */
const initFormState = {
  submit: true,
  pause: true,
};

/* Initial Array State */
const initState = {
  data: [],
  done: true,
  timer: 0,
};

/**
 * Handles the automatic sorting logic, returning the next iteration of sorting process
 * while updating the formState (i.e. the pause and the submit values for when we are done)
 * as well as the state data.
 *
 * @param {Object} state
 * @param {Function} setState
 * @param {Function} setFormState
 */
const handleTimer = (state, setState, setFormState) => {
  var storedNextState = state;
  setState((prevState) => {
    let nextState;
    nextState = bubbleSortStep(prevState);
    storedNextState = nextState;
    if (nextState.done) {
      clearInterval(prevState.timer);
    }
    return nextState;
  });

  setFormState((prevState) => {
    return {
      ...prevState,
      submit: storedNextState.done,
      pause: storedNextState.done,
    };
  });
};

/**
 * Handles the ability to increment to next step in sorting process only after we have paused.
 *
 * @param {Object} e
 * @param {Object} formInput
 * @param {Object} state
 * @param {Object} errorState
 * @param {Function} setErrorState
 * @param {Function} setState
 * @param {Function} setFormState
 */
export const handleNext = (
  e,
  formInput,
  state,
  errorState,
  setErrorState,
  setState,
  setFormState
) => {
  e.preventDefault();
  if (state.data.length === 0) {
    var properArray = processInputs(formInput.array);
    var es = getErrorState(formInput, errorState, properArray);
    setErrorState(es);
    if (!es.errorState) {
      formInput.array = properArray;
      const numArray = stringToData(properArray);
      setFormState((prevState) => {
        return { ...prevState, submit: false };
      });
      setState({
        ...bubbleSortInit(numArray),
        timer: 0,
      });
    }
  } else {
    setState((prevState) => {
      let nextState = bubbleSortStep(prevState);
      return nextState;
    });
  }
};

/**
 * Handles the ability to go to previous step in sorting process only after we have paused.
 *
 * @param {Object} e
 * @param {Object} state
 * @param {Function} setState
 * @param {Object} formState
 * @param {Function} setFormState
 * @returns
 */
export const handlePrev = (e, state, setState, formState, setFormState) => {
  e.preventDefault();
  if (formState.pause) {
    setFormState((prevState) => {
      return { ...prevState, submit: false };
    });
  }
  if (state.data.length > 0) {
    setState((prevState) => {
      let nextState = bubbleSortPrev(prevState);
      return nextState;
    });
  } else {
    return false;
  }
};

/**
 * Sets the state of the formInput as we fill in the fields
 *
 * @param {Object} e
 * @param {Object} formInput
 * @param {Function} setFormInput
 */
export const handleChange = (e, setFormInput) => {
  e.preventDefault();
  let name = e.target.name;
  let value = e.target.value;
  setFormInput((prevState) => {
    return { ...prevState, [name]: value };
  });
};

/**
 * Handles the functionality for when we submit the form inputs,
 * also taking care of error checking.
 *
 * @param {Object} e
 * @param {Object} formState
 * @param {Object} formInput
 * @param {Function} setFormState
 * @param {Object} errorState
 * @param {Object} state
 * @param {Function} setState
 * @param {Function} setErrorState
 * @returns
 */
export const handleSubmit = (
  e,
  formState,
  formInput,
  setFormState,
  errorState,
  state,
  setState,
  setErrorState
) => {
  e.preventDefault();
  if (!formState.submit) {
    return false;
  }

  var properArray = processInputs(formInput.array);
  formInput.array = properArray;
  var es = getErrorState(formInput, errorState, properArray);
  setErrorState(es);
  // if no error then proceed
  if (!es.errorState) {
    const data = stringToData(properArray);
    formState.submit = false;
    formState.pause = false;
    state.data = data;
    state.done = false;
    setState({
      ...bubbleSortInit(state.data),
      timer: setInterval(() => {
        handleTimer(state, setState, setFormState);
      }, 200),
    });
  }
};

/**
 * Resets back to original state, removing the bar-display.
 *
 * @param {Object} e
 * @param {Function} setFormState
 * @param {Function} setState
 */
export const handleReset = (e, setFormState, setState) => {
  e.preventDefault();
  setFormState({ ...initFormState });
  setState((prevState) => {
    clearInterval(prevState.timer);
    return { ...initState };
  });
};

/**
 * Handles the functionality for resuming sorting, after we have paused or incremented
 * ourselves with Prev or Next buttons
 *
 * @param {Object} e
 * @param {Object} state
 * @param {Function} setFormState
 * @param {Function} setState
 */
export const handleContinue = (e, state, setFormState, setState) => {
  e.preventDefault();
  setFormState((prevState) => {
    return { ...prevState, submit: false, pause: false };
  });
  setState((prevState) => {
    return {
      ...prevState,
      timer: setInterval(() => {
        handleTimer(state, setState, setFormState);
      }, 200),
    };
  });
};

/**
 * Handles the pause functionality of sorting visualizer
 *
 * @param {Object} e
 * @param {Number} timer
 * @param {Function} setFormState
 */
export const handlePause = (e, timer, setFormState) => {
  e.preventDefault();
  clearInterval(timer);
  setFormState((prevState) => {
    return { ...prevState, submit: false, pause: true };
  });
};
