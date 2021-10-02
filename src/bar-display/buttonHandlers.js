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
  setState
) => {
  e.preventDefault();
  console.log(state);
  if (state.array.length === 0) {
    console.log("setting error state");
    var properArray = processInputs(formInput.array);
    var es = getErrorState(formInput, errorState, properArray);
    setErrorState(es);
    console.log(es);
    if (!es.errorState) {
      formInput.array = properArray;
      const numArray = stringToArray(properArray);
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

export const handlePrev = (e, state, setState) => {
  e.preventDefault();
  console.log(state);
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
