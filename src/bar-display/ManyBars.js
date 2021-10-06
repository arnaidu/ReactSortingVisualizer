import React from "react";
import OneBar from "./OneBar";

const ManyBars = React.memo((props) => {
  const { state } = props;

  var allBars = state.array.map((item, index) => {
    const style = {
      color: "white",
      height: (item + 21) * 10 + 50, // this is probably not the best way to do this
      fontSize: "20pt",
    };
    // give a yellow shadow for one being checked
    // give green-shadow if done, otherwise give a white shadow
    if (state.j === index && !state.done) {
      if (state.i === 0 && state.j === 0) {
        return (
          <div id="white-shadow" className="bar">
            <div id="blue-shadow" style={style}>
              {item}
            </div>
          </div>
        );
      }

      return (
        <div id="yellow-shadow" className="bar">
          <div id="blue-shadow" style={style}>
            {item}
          </div>
        </div>
      );
    } else if (
      index >= state.array.length - state.i ||
      (state.i === state.array.length - 1 && state.j === 0 && state.done) // pretty much the last state when everything is done
    ) {
      return (
        <div id="green-shadow" className="bar">
          <div id="blue-shadow" style={style}>
            {item}
          </div>
        </div>
      );
    } else {
      return (
        <div id="white-shadow" className="bar">
          <div id="blue-shadow" style={style}>
            {item}
          </div>
        </div>
      );
    }
  });
  return <>{allBars}</>;
});
/*
<OneBar
  height={(item + 21) * 10}
  //width={width}
  //submit={submit}
  //k={index}
/>;*/
export default ManyBars;
