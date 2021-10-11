import React from "react";
import { ErrorBanner } from "./errorHandling";

const initString =
  "Max 20 comma separated numbers : -20 \u2264 # \u2264 20 : Ex: 20,-10,3,-5";
const Inputs = ({ errorState, handleChangeWrapper, formInput }) => {
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
