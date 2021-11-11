import React, { useState } from "react";
import { error } from "./errorHandling";
import Inputs from "./formInput";
import Buttons from "./formButtons";
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
    handlePause(e, state.timer, setFormState);
  };

  const handleContinueWrapper = (e) => {
    handleContinue(e, state, setFormState, setState);
  };

  const handleResetWrapper = (e) => {
    handleReset(e, setFormState, setState);
  };

  const handleNextWrapper = (e) => {
    handleNext(
      e,
      formInput,
      state,
      errorState,
      setErrorState,
      setState,
      setFormState
    );
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
    <section className="nav-bar">
      {/*console.log("Rendering Form")*/}
      <Title key="Title" />
      <Inputs
        errorState={errorState}
        handleChangeWrapper={handleChangeWrapper}
        formInput={formInput}
        key="Inputs"
      />
      <Buttons {...buttonInputs} formState={formState} key="Buttons" />
    </section>
  );
};

export default Form;
