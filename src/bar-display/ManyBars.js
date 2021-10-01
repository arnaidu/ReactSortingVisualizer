import React from "react";
import OneBar from "./OneBar";

const ManyBars = React.memo((props) => {
  const { state, width, submit } = props;
  var allBars = state.array.map((item, index) => {
    // give a yellow shadow for one being checked
    // give green-shadow if done
    if (state.j === index && !state.done) {
      return (
        <div id="yellow-shadow" key={index} className="bar">
          <OneBar
            height={(item + 21) * 10}
            width={width}
            submit={submit}
            key={index}
          />
        </div>
      );
    } else if (state.i > 0 && index > state.array.length - state.i - 1) {
      return (
        <div id="green-shadow" key={index} className="bar">
          <OneBar
            height={(item + 21) * 10}
            width={width}
            submit={submit}
            key={index}
          />
        </div>
      );
    } else {
      return (
        <div id="white-shadow" key={index} className="bar">
          <OneBar
            height={(item + 21) * 10}
            width={width}
            submit={submit}
            key={index}
          />
        </div>
      );
    }
  });
  return <>{allBars}</>;
});

export default ManyBars;
