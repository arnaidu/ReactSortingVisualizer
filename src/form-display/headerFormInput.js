import React from "react";
import { ErrorBanner } from "./errorHandling";

/** Style Imports */
import "../styles/formInput.css";

/* Default message for array form input */
const initString = "Max 20 comma separated numbers : -20 \u2264 # \u2264 20 : Ex: 20,-10,3,-5";

/* React Component for the form and error display */
const Inputs = ({ errorState, handleChangeWrapper, formInput }) => {
    return (
        <form className="form-input">
            <label htmlFor="array" className="label1">
                Array:
            </label>

            <input
                type="text"
                id="array"
                name="array"
                value={formInput.array}
                placeholder={initString}
                onChange={handleChangeWrapper}
            />
            <p className="temp1"></p>
            <ErrorBanner {...errorState} type="array" key="warning1" />

            <label htmlFor="array" className="label2">
                Algorithm:
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
            <p className="temp2"></p>
            <ErrorBanner {...errorState} type="missing-field" key="warning2" />
        </form>
    );
};

export default Inputs;
