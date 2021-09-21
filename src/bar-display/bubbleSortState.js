/**
 *
 * @param {number[]} arr
 * @returns initial state used for bubble sort visualizer
 */
export const bubbleSortInit = (arr) => {
  return {
    array: arr,
    i: 0,
    j: 0,
    done: false,
  };
};

/* Use the python implementation to help make the function for this
def bubbleSort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
 */
/**
 *
 * @param {state} prevState
 * @returns next step in the bubble sort algorithm
 */
export const bubbleSortStep = (prevState) => {
  let { array, i, j, done, timer } = prevState;
  console.log("in bubbleSortStep");
  console.log(i);
  console.log(j);
  console.log(done);
  console.log(array);
  console.log(timer);

  const n = array.length;

  // this means on the current step, we have already finished. So return the object which will result in
  // no state change except tell us that we are done, and reset the timer
  if (i >= n) {
    return {
      array: array,
      i: i,
      j: j,
      done: true,
    };
  }

  if (array[j] > array[j + 1]) {
    let element = array[j];
    array[j] = array[j + 1];
    array[j + 1] = element;
  }
  // if j on the next step will be >= n - i - 1, then this current state thing is the last state to send
  // i.e. the state.array from this function output, will be the last array output for the j cycle
  j = j + 1;
  if (j >= n - i - 1) {
    i++;
    j = 0; // set j back to 0
  }

  return {
    array: array,
    i: i,
    j: j,
    done: false,
  };
};
