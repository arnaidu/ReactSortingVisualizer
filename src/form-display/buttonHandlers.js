import { processInputs, stringToData } from "./formProcessing";
import { getErrorState } from "./errorHandling";
import {
  bubbleSortInit,
  bubbleSortStep,
  bubbleSortPrev,
} from "../bar-display/bubbleSortState";

const initFormState = {
  submit: true, // allow for submitting the first time, then we will change it to prevent multiple submissions
  pause: true,
};

const initState = {
  data: [],
  done: true,
  timer: 0,
};

const handleTimer = (state, setState, setFormState) => {
  var storedNextState = state;
  setState((prevState) => {
    let nextState;
    nextState = bubbleSortStep(prevState);
    storedNextState = nextState; // keep track of nextstate outside since we remove the timer -- there might be better way to do this with hooks
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
 * Sets the state of the formInput
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
  const es = getErrorState(formInput, errorState, properArray);
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
      }, 250),
    });
  }
};

export const handleReset = (e, setFormState, setState) => {
  e.preventDefault();
  setFormState({ ...initFormState });
  setState((prevState) => {
    clearInterval(prevState.timer);
    return { ...initState };
  });
};

export const handleContinue = (e, state, setFormState, setState) => {
  e.preventDefault();
  setFormState((prevState) => {
    return { ...prevState, submit: false, pause: false };
  });
  /*
  setState({
    ...state,
    timer: setInterval(() => {
      handleTimer(setState, setFormState);
    }, 250),
  });
  */
  setState((prevState) => {
    return {
      ...prevState,
      timer: setInterval(() => {
        handleTimer(state, setState, setFormState);
      }, 250),
    };
  });
};

export const handlePause = (e, timer, setFormState) => {
  e.preventDefault();
  clearInterval(timer);
  setFormState((prevState) => {
    return { ...prevState, submit: false, pause: true };
  });
};
