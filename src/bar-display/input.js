import React from "react";
import { useState } from "react";
import { WarningBanner } from "./errorHandling";

const initialFormState = {
  array: "",
  algorithm: "",
};
const initString =
  "Max 20 comma separated numbers : -20 \u2264 # \u2264 20 : Ex: 20,-10,3,-5";
const Input = ({ errorState, handleChangeWrapper, formInput }) => {
  /*
  const [formInputComp, setFormInputComp] = useState(initialFormState);

  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setFormInputComp((prevState) => {
      return { ...prevState, [name]: value };
    });
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  */
  return (
    <form id="inputs" autoComplete="off">
      <div id="input1">
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
        <WarningBanner {...errorState} type="array" key="3" />
      </div>

      <div id="input2">
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
        <WarningBanner {...errorState} type="missing-field" key="4" />
      </div>
    </form>
  );
};

export default Input;
