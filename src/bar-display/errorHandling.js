/**
 * Handles all validation for the one form in the application
 * @param {string} stringArray
 * @returns boolean indicating whether valid input or not
 */
export const validate = (stringArray) => {
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
  return true;
};

/* Below is the error object (i.e. it will contain all error messages for the form) */
export const formError = {
  arrayErrorMessage: <h2>"Incorrect Input Format: Try ex: 1,2,3,4,5"</h2>,
  missingFieldErrorMessage: <h2>"Missing One or More Fields Above"</h2>,
};

export const WarningBanner = (props) => {
  let { errorState, isValidArray, existInputArray, existInputAlgo, type } =
    props;
  if (
    errorState &&
    type === "missing-field" &&
    (!existInputArray || !existInputAlgo)
  ) {
    return formError.missingFieldErrorMessage;
  }
  if (errorState && type === "array" && !isValidArray) {
    return formError.arrayErrorMessage;
  }
  return "";
};
