/**
 *
 * @param {number[]} data
 * @returns initial state used for bubble sort visualizer
 */
export const bubbleSortInit = (data) => {
  return {
    data: data,
    i: 0,
    j: 0,
    done: false,
  };
};

/**
 *
 * @param {state} prevState
 * @returns next step in the bubble sort algorithm
 */
export const bubbleSortStep = ({ data, i, j, done, timer }) => {
  const n = data.length;

  // this means on the current step, we have already finished. So return the object which will result in
  // no state change except tell us that we are done, and reset the timer
  if (!done) {
    if (j === n - i - 1) {
      if (i === n - 1) {
        return {
          data: data,
          i: i,
          j: j,
          done: true,
          timer: timer,
        };
      }
      i++;
      j = 0; // set j back to 0
      return {
        data: data,
        i: i,
        j: j,
        done: false,
        timer: timer,
      };
    }

    if (data[j].value > data[j + 1].value) {
      let element = data[j].value;
      data[j].value = data[j + 1].value;
      data[j + 1].value = element;
    }
    // if j on the next step will be >= n - i - 1, then this current state thing is the last state to send
    // i.e. the state.data from this function output, will be the last data output for the j cycle
    j = j + 1;

    return {
      data: data,
      i: i,
      j: j,
      done: false,
      timer: timer,
    };
  }
  // this should return the same thing
  return {
    data: data,
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
export const bubbleSortPrev = ({ data, i, j, done, timer }) => {
  const n = data.length;

  if (i === 0 && j === 0) {
    return {
      data: data,
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
      data: data,
      i: i,
      j: j,
      done: false,
      timer: timer,
    };
  }
  // might need to consider i >= n and done condition

  if (data[j].value > data[j - 1].value) {
    let element = data[j].value;
    data[j].value = data[j - 1].value;
    data[j - 1].value = element;
  }

  j = j - 1;
  return {
    data: data,
    i: i,
    j: j,
    done: false,
    timer: timer,
  };
};
