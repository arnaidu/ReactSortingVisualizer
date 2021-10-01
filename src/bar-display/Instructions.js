import React from "react";

// make a list to return containing the instructions for example input, max # of nums, and maximum and minimum for numbers in array
const Instructions = React.memo(() => {
  return (
    <>
      <section id="instructions" className="section1">
        <h3>Instructions for Inputting Array:</h3>
        <ol>
          <li>
            Input an array of numbers separated by commas. ex: 10,4,-3,13,1,6,7
          </li>
          <li>Only include up to 20 numbers in the array.</li>
          <li>The minimum number allowed is -20 and the maximum is 20.</li>
        </ol>
      </section>
    </>
  );
});

export default Instructions;
