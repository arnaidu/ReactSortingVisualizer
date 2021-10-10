/**
 * Convert a string containing numbers separated by commas to an array of inetegers
 * Input should be number,number,...,number
 * @param {string} stringArray
 * @returns Array of objects with value (from stringArray) and id (for unique key)
 */
export const stringToData = (stringArray) => {
  let data = stringArray.split(",").map((item, index) => {
    return { id: index, value: parseInt(item, 10) };
  });
  return data;
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
