import { error } from "./errorHandling";

/**
 * Convert a string containing numbers separated by commas to an array of inetegers
 * Input should be number,number,...,number
 * @param {string} stringArray
 * @returns Integer array form of stringArray
 */
export const stringToArray = (stringArray) => {
  let array = stringArray.split(",").map((item) => {
    return parseInt(item, 10);
  });
  return array;
};

/**
 * function to handle any processing of the input which needs to be done to potentially
 * clean it up. We should also set the text displayed to be the cleaned version of the input.
 * For now, we only have an array to consider for the input, since the selection drop down
 * doesn't really need to be cleaned up. The validation ensures that the input we clean is
 * somewhat appropriate.
 * @param {string} stringArray
 * @returns a cleaned string input of the array inputted, removing extra whitespace
 */
export const processInputs = (stringArray) => {
  // clean the input string array
  const cleanedArray = stringArray.replace(/\s+/g, "");
  return cleanedArray;
};

/**
 * Sets the state of the formInput
 * @param {Object} e
 * @param {Object} formInput
 * @param {Function} setFormInput
 */
export const handleChangeHelper = (e, formInput, setFormInput) => {
  let name = e.target.name;
  let value = e.target.value;
  setFormInput({ ...formInput, [name]: value });
};

const checkBounds = (stringArray) => {
  const numArray = stringToArray(stringArray);
  if (Math.min(numArray) < -20 || Math.max(numArray) > 20) {
    return false;
  }
  return true;
};

export const handleSubmitHelper = (
  e,
  formInput,
  errorState,
  setFormInput,
  setErrorState
) => {
  e.preventDefault();
  // Can we submit?
  if (!formInput.submit) {
    return { ...error, errorState: true, canSubmit: false };
  } else {
    var properArray = processInputs(formInput.array);
    formInput.array = properArray;
    var valid = validateInput(properArray);
    if (valid) {
      var validBounds = checkBounds(properArray);
    }
    return {
      ...error,
      errorState: true,
      isValidArray: valid,
      existInputAlgo: formInput.algorithm !== "",
      existInputArray: formInput.array !== "",
      lengthArray: properArray <= 39,
      boundsGood: validBounds,
    };
  }
};
