/**
 *
 * @param {number[]} array
 * @returns initial state used for inerstion sort visualizer
 */
export const insertionSortInit = (array) => {
  return {
    array: array,
    i: 1,
    j: 0,
    key: array.length >= 2 ? array[1] : 0,
    done: false,
  };
};

/**
 *
 * @param {state} prevState
 * @returns next step in the insertion sort algorithm
 */
export const insertionSortStep = (prevState) => {
  let { array, i, j, key, done, timer } = prevState;
  //console.log("in insertionSortStep");
  console.log("prevState in inerstionSortStep: ", prevState);
  console.log("key: ", key);

  const n = array.length;
  //console.log("entering done: ", i >= n && !done);
  if (i >= n && !done) {
    return {
      array: array,
      i: i,
      j: j,
      key: key,
      done: true,
      timer: timer,
    };
  }
  //const temp = array[i];
  if (j > -1 && array[j] > key) {
    array[j + 1] = array[j];
    array[j] = key;
    j = j - 1;
  } else {
    i = i + 1;
    j = i - 1;
    if (i < n) {
      key = array[i];
    }
  }
  return {
    array: array,
    i: i,
    j: j,
    key: key,
    done: false,
    timer: timer,
  };
};
