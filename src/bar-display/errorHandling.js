/**
 * Handles all validation for the one form in the application
 * @param {string} stringArray
 * @returns boolean indicating whether valid input or not
 */
export const validateInput = (stringArray) => {
  //
  if (stringArray.match(/[^0-9\s,]/)) {
    return false;
  }
  if (stringArray.match(/^\D/) || stringArray.match(/\D$/)) {
    return false;
  }
  if (stringArray.match(/,{2,}/)) {
    return false;
  }
  if (stringArray === "") {
    return false;
  }
  return true;
};

/**
 *
 * @param {state} formInput
 */
export const getErrorState = (formInput) => {
  if (formInput.submit) {
    return false;
  }
  if (formInput.algorithm && formInput.array && formInput.submit) {
    return;
  }
};

/* Below is the error object (i.e. it will contain all error messages for the form) */
export const formError = {
  notValidArrayErrorMessage: <p>*Incorrect Input Format: Try ex: 1,2,3,4,5</p>,
  missingFieldErrorMessage: <p>*Missing One or More Fields Above</p>,
  arrayTooLongErrorMessage: (
    <p>*Array must contain less than or equal to 20 numbers</p>
  ),
};

export const WarningBanner = (props) => {
  let {
    errorState,
    isValidArray,
    existInputArray,
    existInputAlgo,
    lengthArray,
    type,
  } = props;
  if (
    errorState &&
    type === "missing-field" &&
    (!existInputArray || !existInputAlgo)
  ) {
    return formError.missingFieldErrorMessage;
  }
  if (errorState && type === "array" && !isValidArray && existInputArray) {
    return formError.notValidArrayErrorMessage;
  }
  if (
    errorState &&
    type === "array" &&
    isValidArray &&
    existInputArray &&
    lengthArray > 39
  ) {
    return formError.arrayTooLongErrorMessage;
  }
  return "";
};

export const error = {
  errorState: false,
  canSubmit: true,
  isValidArray: false,
  existInputArray: false,
  existInputAlgo: false,
  lengthArray: 0,
};
