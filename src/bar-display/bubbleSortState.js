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

// Index of the bars which are being swapped
export const barsSwapped = {
  firstBar: 0,
  secondBar: 0,
};

/* Use the python implementation to help make the function for this
def bubble_sort(arr):
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
  // console.log("in bubbleSortStep");

  const n = array.length;

  // this means on the current step, we have already finished. So return the object which will result in
  // no state change except tell us that we are done, and reset the timer
  if (!done) {
    /*
    if (i >= n) {
      return {
        array: array,
        i: i,
        j: j,
        done: true,
        timer: timer,
      };
    }
    */
    if (j === n - i - 1) {
      if (i === n - 1) {
        return {
          array: array,
          i: i,
          j: j,
          done: true,
          timer: timer,
        };
      }
      i++;
      j = 0; // set j back to 0
      return {
        array: array,
        i: i,
        j: j,
        done: false,
        timer: timer,
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

    return {
      array: array,
      i: i,
      j: j,
      done: false,
      timer: timer,
    };
  }
  // this should return the same thing
  return {
    array: array,
    i: i,
    j: j,
    done: done,
    timer: timer,
  };
};

/**
 * Previous state of sorting (which is technically the current state).
 * Does nothing if we are at beginning. Otherwise, go to the previous step.
 * @param {state} prevState
 * @returns nextState: the previous state or the same state (i.e. init state if still at the initial state)
 */
export const bubbleSortPrev = (prevState) => {
  let { array, i, j, done, timer } = prevState;

  const n = array.length;

  if (i === 0 && j === 0) {
    return {
      array: array,
      i: i,
      j: j,
      done: false,
      timer: timer,
    };
  }

  if (i >= 1 && j === 0) {
    i--;
    j = n - i - 1;
    return {
      array: array,
      i: i,
      j: j,
      done: false,
      timer: timer,
    };
  }
  // might need to consider i >= n and done condition

  if (array[j] > array[j - 1]) {
    let element = array[j];
    array[j] = array[j - 1];
    array[j - 1] = element;
  }

  j = j - 1;
  return {
    array: array,
    i: i,
    j: j,
    done: false,
    timer: timer,
  };
};
