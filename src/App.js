/*
import React from "react";
import SortingApp from "./bar-display/Sort";

function App() {
  return (
    <>
      <SortingApp />
    </>
  );
}

export default App;
*/

import React, { useState } from "react";
import ManyBars from "./bar-display/ManyBars";
import { Finished } from "./text-display/staticText";
import Form from "./form-display/Form";

const initState = {
  data: [],
  done: true,
  timer: 0,
};

const App = () => {
  /* States used for this component */
  const [state, setState] = useState({ ...initState });

  return (
    <div>
      <Form state={state} setState={setState} key="Form" />

      <div
        style={{
          visibility:
            state.done && state.data.length > 0 ? "visible" : "hidden",
        }}
      >
        <Finished key="Finished" />
      </div>
      <div className="elements">
        <ManyBars state={state} key="ManyBars" />
      </div>
    </div>
  );
};

export default App;
