import React from "react";
import ManyBars from "./ManyBars";

const Bar = ({ state }) => {
  return (
    <section className="bars">
      {!(state.array === 0) && <ManyBars state={state} />}
    </section>
  );
};

export default Bar;
