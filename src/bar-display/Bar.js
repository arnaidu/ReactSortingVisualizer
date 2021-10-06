import React from "react";
import ManyBars from "./ManyBars";

const Bar = (props) => {
  let { errorState, graphics } = props;

  return (
    <section className="bars">
      {!errorState.errorState && <ManyBars {...graphics} />}
    </section>
  );
};

export default Bar;
