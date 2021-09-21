/**
 * Handles all validation for the one form in the application
 * @returns
 */
export const validate = () => {
  return;
};

/**
 *
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
