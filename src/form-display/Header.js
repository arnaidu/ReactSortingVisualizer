import React, { useState } from "react";
import { error } from "./errorHandling";
import Inputs from "./headerFormInput";
import Buttons from "./headerButtons";
import { Title } from "../text-display/staticText";
import {
    handleSubmit,
    handlePrev,
    handleNext,
    handleChange,
    handlePause,
    handleContinue,
    handleReset,
} from "./buttonHandlers";

/** Style Imports */
import "../styles/header.css";
import "../styles/buttons.css";
import "../styles/formInput.css";

/** Initial Form Inputs */
const initialFormInput = {
    array: "",
    algorithm: "",
};

/** Initial Form Submit and Pause State */
const initFormState = {
    submit: true, // allow for submitting the first time, then we will change it to prevent multiple submissions
    pause: true,
};

/** Component for the Form */
const Form = ({ state, setState }) => {
    // this should include the Inputs, and the Buttons. Also move the button handlers here.
    const [formInput, setFormInput] = useState(initialFormInput);
    const [formState, setFormState] = useState(initFormState);
    const [errorState, setErrorState] = useState(error);

    const handleSubmitWrapper = (e) => {
        handleSubmit(
            e,
            formState,
            formInput,
            setFormState,
            errorState,
            state,
            setState,
            setErrorState
        );
    };

    /* button handler wrapper functions */
    const handleChangeWrapper = (e) => {
        handleChange(e, setFormInput);
    };

    const handlePauseWrapper = (e) => {
        handlePause(e, state, setFormState);
    };

    const handleContinueWrapper = (e) => {
        handleContinue(e, state, setFormState, setState);
    };

    const handleResetWrapper = (e) => {
        handleReset(e, setFormState, setState);
    };

    const handleNextWrapper = (e) => {
        handleNext(e, formInput, state, errorState, setErrorState, setState, setFormState);
    };

    const handlePrevWrapper = (e) => {
        handlePrev(e, state, setState, formState, setFormState);
    };

    const buttonInputs = {
        handleSubmit: handleSubmitWrapper,
        handleReset: handleResetWrapper,
        handleContinue: handleContinueWrapper,
        handlePause: handlePauseWrapper,
        handleNextWrapper: handleNextWrapper,
        handlePrevWrapper: handlePrevWrapper,
    };

    return (
        <>
            <div className="container-header" key="container-header">
                <Title key="Title" />
                <div className="container-form">
                    <Inputs
                        errorState={errorState}
                        handleChangeWrapper={handleChangeWrapper}
                        formInput={formInput}
                        key="Inputs"
                    />
                </div>
            </div>

            <div className="container-button" key="container-button">
                <Buttons {...buttonInputs} formState={formState} key="Buttons" />
            </div>
            {/*
            <div className="container-speed">
                <output id="output1">Sorting Speed:</output>
                <output id="output2">1</output>
                <input type="range" id="speed" value="200" min="1" max="400" />
                <output id="output3">100</output>
            </div>
            */}
        </>
    );
};

export default Form;
