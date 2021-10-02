import React from "react";
import OneBar from "./OneBar";

const ManyBars = React.memo((props) => {
  const { state, width, submit } = props;
  var allBars = state.array.map((item, index) => {
    // give a yellow shadow for one being checked
    // give green-shadow if done
    if (state.j === index && !state.done) {
      console.log("Current Bar: ", index);
      if (state.i === 0 && state.j === 0) {
        console.log("This bar is white: ", index);
        console.log(state);
        return (
          <div id="white-shadow" key={index} className="bar">
            <OneBar
              height={(item + 21) * 10}
              width={width}
              submit={submit}
              stuff={index}
            />
          </div>
        );
      }
      console.log("This bar is yellow: ", index);
      console.log(state);
      return (
        <div id="yellow-shadow" key={index} className="bar">
          <OneBar
            height={(item + 21) * 10}
            width={width}
            submit={submit}
            stuff={index}
          />
        </div>
      );
    } else if (
      index >= state.array.length - state.i ||
      (state.i === state.array.length - 1 && state.j === 0 && state.done) // pretty much the last state when everything is done
    ) {
      console.log(state);
      console.log("This bar is green: ", index);
      return (
        <div id="green-shadow" key={index} className="bar">
          <OneBar
            height={(item + 21) * 10}
            width={width}
            submit={submit}
            stuff={index}
          />
        </div>
      );
    } else {
      console.log("This bar is white: ", index);
      return (
        <div id="white-shadow" key={index} className="bar">
          <OneBar
            height={(item + 21) * 10}
            width={width}
            submit={submit}
            stuff={index}
          />
        </div>
      );
    }
  });
  return <>{allBars}</>;
});

export default ManyBars;
