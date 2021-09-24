/**
 *
 * @param {number[]} arr
 * @returns initial state used for inerstion sort visualizer
 */
export const insertionSortInit = (arr) => {
  return {
    array: arr,
    i: 1,
    j: 0,
    key: arr[1],
    done: false,
  };
};

/* Use the python implementation to help make the function for this
def insertion_sort(arr):
	n = len(arr)
	for i in range(1, n):
	    key = arr[i]
		j = i - 1
		while j >= 0 and key < arr[j]:
		    arr[j+1] = arr[j]
		    j -= 1
        arr[j+1] = key
 */
/*
def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        k = 0
        for j in range(i - 1, -1, -1):
            if key < arr[j]:
                arr[j + 1] = arr[j]
                k = j - 1
            else:
                break
        arr[k + 1] = key        
*/
/**
 *
 * @param {state} prevState
 * @returns next step in the insertion sort algorithm
 */
export const insertionSortStep = (prevState) => {
  let { array, i, j, done, key, timer } = prevState;
  console.log("in insertionSortStep");

  const n = array.length;
  if (i >= n && !done) {
    return {
      array: array,
      i: i,
      j: j,
      done: true,
      key: key,
      timer: timer,
    };
  }
  console.log(i);
  console.log(j);
  if (j >= 0 && key < array[j]) {
    // let element = array[j + 1];
    console.log(array);
    array[j + 1] = array[j];
    array[j] = key;
    console.log(key);
    console.log(array);
    j--;
  } else {
    array[j + 1] = key;
    console.log(array);
    i++;
    key = array[i];
    j = i - 1;
    console.log("in else insertionSortStep");
    console.log(key);
    console.log(array);
  }

  return {
    array: array,
    i: i,
    j: j,
    done: false,
    key: key,
    timer: timer,
  };
};
