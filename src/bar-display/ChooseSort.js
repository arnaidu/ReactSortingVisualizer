import MultipleBars from "./multipleBars";
import { bubbleSortSingleIter } from "./bubbleSort";
import { bubbleSortInit } from "./bubbleSort";
import { useState } from "react";

function ChooseSort() {
  const [arr, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState("");
  const [showSort, setShowSort] = useState(false);
  const [state, setState] = useState({ ...bubbleSortInit(arr) });
  // function to update the state to pass to bubblesort -- make a onClick for button, it will update the array state
  // but also tell us that it is ready to show the visual
  const handleTimer = () => {
    setState((prevState) => {
      const nextState = { ...bubbleSortSingleIter(prevState) };
      if (nextState.done) {
        clearInterval(prevState.timer);
      }
      return nextState;
    });
  };
  const handleClick = () => {
    setShowSort(true);
    setState({
      ...bubbleSortInit(arr),
      timer: setInterval(() => handleTimer(), 250),
    });
  };
  // return values that can be used to check for errors
  const stringToArray = (s) => {
    s.split(",").map((item) => {
      return parseInt(item, 10);
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "array") {
      // compute the array here then set the value
      const val = stringToArray(value);
      setArray(val);
    } else {
      setAlgorithm(value);
    }
  };
  return (
    <>
      <article>
        <form>
          <div>
            <h1>
              Input arrays comma separated as follows: 1,2,3,4. Extra spaces
              will be removed if they are included.
            </h1>
          </div>
          <div>
            <label htmlFor="array">Input Array: </label>
            <input
              type="text"
              id="array"
              name="array"
              value={arr}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="sort"> Algorithm: </label>
            <select name="sort" id="sort" onChange={handleChange}>
              <option style={{ display: "none" }}></option>
              <option value="bubble">BubbleSort</option>
              <option value="merge">MergeSort</option>
              <option value="insert">Insertion Sort</option>
            </select>
          </div>

          <button
            className="btn"
            onClick={() => {
              handleClick();
            }}
          >
            Sort
          </button>
        </form>
      </article>
      <section>
        {showSort && <MultipleBars array={state.array}></MultipleBars>}
      </section>
    </>
  );
}

export default ChooseSort;
