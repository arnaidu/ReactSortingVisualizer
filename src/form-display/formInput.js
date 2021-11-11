import React from "react";
import { ErrorBanner } from "./errorHandling";

/* Default message for array form input */
const initString =
  "Max 20 comma separated numbers : -20 \u2264 # \u2264 20 : Ex: 20,-10,3,-5";

/* React Component for the form and error display */
const Inputs = ({ errorState, handleChangeWrapper, formInput }) => {
  return (
    <form id="inputs" autoComplete="off">
      {/*console.log("Rendering Inputs of Form")*/}

      <div className="row">
        <label htmlFor="array" id="labels">
          Array:{" "}
        </label>
        <input
          type="text"
          id="array"
          name="array"
          value={formInput.array}
          placeholder={initString}
          onChange={handleChangeWrapper}
        />
        <ErrorBanner {...errorState} type="array" key="warning1" />
      </div>

      <div className="row">
        <label htmlFor="algorithm" id="labels">
          {" "}
          Algorithm:{" "}
        </label>
        <select
          name="algorithm"
          id="algorithm"
          value={formInput.algorithm}
          onChange={handleChangeWrapper}
        >
          <option value="" style={{ display: "none" }}></option>
          <option value="BubbleSort">Bubble Sort</option>
        </select>
        <ErrorBanner {...errorState} type="missing-field" key="warning2" />
      </div>
    </form>
  );
};

export default Inputs;
