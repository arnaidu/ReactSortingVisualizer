/** IGNORE THIS FILE */

import React, { useState } from "react";
import ManyBars from "./bar-display/ManyBars";
import { Finished } from "./staticText";
import Form from "./Form";

const initState = {
  array: [],
  done: true,
};

const SortingApp = () => {
  /* States used for this component */
  const [state, setState] = useState({ ...initState });

  return (
    <>
      <Form state={state} setState={setState} key="Form" />
      {state.done && state.array.length > 0 && <Finished key="Finished" />}
      <ManyBars state={state} key="ManyBars" />
    </>
  );
};

export default SortingApp;
