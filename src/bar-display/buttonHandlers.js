import { processInputs, stringToArray } from "./formProcessing";
import { getErrorState } from "./errorHandling";
import {
  bubbleSortInit,
  bubbleSortStep,
  bubbleSortPrev,
} from "./bubbleSortState";

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
  if (state.array.length === 0) {
    var properArray = processInputs(formInput.array);
    var es = getErrorState(formInput, errorState, properArray);
    setErrorState(es);
    if (!es.errorState) {
      formInput.array = properArray;
      const numArray = stringToArray(properArray);
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
  if (state.array.length > 0) {
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
  errorState,
  state,
  setState,
  setErrorState
) => {
  e.preventDefault();
  // Case where we are during sorting and can't resubmit the form (i.e. not paused)
  /*if (!formInput.submit) {
      return false;
    }
    */
  if (!formState.submit) {
    return false;
  }

  var properArray = processInputs(formInput.array);
  formInput.array = properArray;
  const es = getErrorState(formInput, errorState, properArray);
  setErrorState(es);
  // if no error then proceed
  if (!es.errorState) {
    const numArray = stringToArray(properArray);
    formInput.array = properArray;

    //formInput.submit = false;
    //formInput.pause = false;
    formState.submit = false;
    formState.pause = false;
    state.array = numArray;
    state.done = false;
    setState({
      ...bubbleSortInit(state.array),
      timer: setInterval(() => {
        handleTimer();
      }, 250),
    });
  }
};

export const handleTimer = (setState, setFormInput) => {
  setState((prevState) => {
    let nextState;
    nextState = bubbleSortStep(prevState);
    if (nextState.done) {
      clearInterval(prevState.timer); // we add the timer, so no need to worry about warning -- but can get rid or warning if want
      setFormInput((prevState) => {
        return { ...prevState, submit: true, pause: true };
      });
    }
    return nextState;
  });
};

export const handleReset = (e) => {
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

export const handleContinue = (e) => {
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

export const handlePause = (e) => {
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
