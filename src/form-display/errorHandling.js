import { stringToData } from "../form-display/formProcessing";
import React from "react";
/**
 * Handles all validation for the one form in the application
 * @param {string} stringArray
 * @returns boolean indicating whether valid input or not
 */
export const validateInputStructure = (stringArray) => {
  //
  if (stringArray.match(/[^-?\d+\s,]/)) {
    return false;
  }
  if (stringArray.match(/^[^\d-]/) || stringArray.match(/[^\d]$/)) {
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

const checkInputBounds = (stringArray) => {
  const numArray = stringToData(stringArray);
  if (
    Math.min.apply(
      Math,
      numArray.map((ele) => {
        return ele.value;
      })
    ) < -20 ||
    Math.max.apply(
      Math,
      numArray.map((ele) => {
        return ele.value;
      })
    ) > 20
  ) {
    return false;
  }
  return true;
};

/**
 * Retrievs a given error state to be determined when the form is submitted.
 * Either we will have some error with the input, or
 * @param {*} formInput
 * @param {*} errorState
 * @param {*} properArray
 * @returns
 */
export const getErrorState = (formInput, errorState, properArray) => {
  // Can we submit?

  var isValid = validateInputStructure(properArray);
  var validBounds;
  if (isValid) {
    validBounds = checkInputBounds(properArray);
  } else {
    validBounds = false; // since not valid so make this false
  }
  const existInputAlgo = formInput.algorithm !== "";
  const existInputArray = formInput.array !== "";
  const properLengthArray = properArray.length <= 39;
  return {
    isValidArray: isValid,
    existInputAlgo: existInputAlgo,
    existInputArray: existInputArray,
    properLengthArray: properLengthArray,
    boundsGood: validBounds,
    errorState: !(
      existInputAlgo &&
      existInputArray &&
      isValid &&
      properLengthArray &&
      validBounds
    ),
  };
};

/* Below is the error object (i.e. it will contain all error messages for the form) */
export const formError = {
  notValidArrayErrorMessage: (
    <p className="input-error">
      *Incorrect Input Format or Character: Try ex: 5,4,10,-1,-3,2,1
    </p>
  ),
  missingFieldErrorMessage: (
    <p className="input-error">*Missing One or More Fields Above</p>
  ),
  arrayTooLongErrorMessage: (
    <p className="input-error">
      *Array must contain less than or equal to 20 numbers
    </p>
  ),
  numbersErrorMessage: (
    <p className="input-error">*Can only use numbers between -20 and 20</p>
  ),
};

export const ErrorBanner = (props) => {
  let {
    isValidArray,
    existInputArray,
    existInputAlgo,
    properLengthArray,
    boundsGood,
    errorState,
    type,
  } = props;
  if (
    errorState &&
    type === "missing-field" &&
    (!existInputArray || !existInputAlgo)
  ) {
    return formError.missingFieldErrorMessage;
  }
  if (errorState && type === "array" && existInputArray && !isValidArray) {
    return formError.notValidArrayErrorMessage;
  }
  if (
    errorState &&
    type === "array" &&
    existInputArray &&
    isValidArray &&
    !properLengthArray
  ) {
    return formError.arrayTooLongErrorMessage;
  }
  if (
    errorState &&
    type === "array" &&
    existInputArray &&
    isValidArray &&
    !boundsGood
  ) {
    return formError.numbersErrorMessage;
  }
  return <p className="input-error"></p>;
};

export const error = {
  isValidArray: false,
  existInputArray: false,
  existInputAlgo: false,
  properLengthArray: true,
  boundsGood: true,
  errorState: false,
};
