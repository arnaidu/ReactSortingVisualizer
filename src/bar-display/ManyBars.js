import React from "react";

const ManyBars = React.memo(({ state }) => {
  var allBars = state.data.map((item, index) => {
    const style = {
      color: "white",
      height: (item.value + 21) * 10 + 50, // this is probably not the best way to do this
      fontSize: "20pt",
    };
    // give a yellow shadow for one being checked
    // give green-shadow if done, otherwise give a white shadow
    if (state.j === index && !state.done) {
      if (state.i === 0 && state.j === 0) {
        return (
          <div id="white-shadow" className="bar" key={item.id}>
            <div id="blue-shadow" style={style} key={item.id}>
              {item.value}
            </div>
          </div>
        );
      }

      return (
        <div id="yellow-shadow" className="bar" key={item.id}>
          <div id="blue-shadow" style={style} key={item.id}>
            {item.value}
          </div>
        </div>
      );
    } else if (
      index >= state.data.length - state.i ||
      (state.i === state.data.length - 1 && state.j === 0 && state.done) // pretty much the last state when everything is done
    ) {
      return (
        <div id="green-shadow" className="bar" key={item.id}>
          <div id="blue-shadow" style={style} key={item.id}>
            {item.value}
          </div>
        </div>
      );
    } else {
      return (
        <div id="white-shadow" className="bar" key={item.id}>
          <div id="blue-shadow" style={style} key={item.id}>
            {item.value}
          </div>
        </div>
      );
    }
  });
  return (
    <>
      <section className="bars" key="bars">
        {console.log("Rendering ManyBars")}
        {state.data.length !== 0 && allBars}
      </section>
    </>
  );
});
/*
<OneBar
  height={(item.value + 21) * 10}
  //width={width}
  //submit={submit}
  //k={index}
/>;*/
export default ManyBars;
