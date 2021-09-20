/* 

I will define the function for bubblesort here. We will export the function, and it will be used 
to update values. Not sure how to integrate this with the existing components
*/

import MultipleBars from "./multipleBars";

// turn this into the
// props contain the array
function BubbleSort(props) {
  const [arr, setArray] = useState(props);
  const temp = [...arr];

  const updateArray = (prevArray) => {
    const newArray = [...prevArray];
    setArray(newArray);
  };

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n - k - 1; i++) {
      var element = temp[i];
      if (element > temp[i + 1]) {
        temp[i] = temp[i + 1];
        temp[i + 1] = element;
        // I think now I should re-render since we moved something.
        updateArray(temp);
      }
    }
  }
}

function bubbleSortInit(array) {
  return {
    array: array,
    k: 0,
    i: 0,
    done: false,
    timer: 0,
  };
}

function bubbleSortSingleIter(state) {
  const { array, k, i, done, timer } = state;
  if (k <= array.length) {
    return { ...state, done: true };
  }
  let element = array[i];
  if (element > array[i + 1]) {
    array[i] = array[i + 1];
    array[i + 1] = element;
  }
  // this means that we hit the next iteration, but we are done the inner loop
  i = i + 1;
  if (i >= array.length - k - 1) {
    i = 0;
    k = k + 1;
  }
  return { ...state, arr: array, k: k, i: i };
}
export default bubbleSortInit;
export { bubbleSortInit };
export { bubbleSortSingleIter };
