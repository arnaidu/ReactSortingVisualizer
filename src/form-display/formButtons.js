import React from "react";

const buttonNames = {
  pause: "Pause",
  sort: "Sort",
  increment: "Step",
  decrement: "Prev",
  reset: "Reset",
  continue: "Continue",
};

const Buttons = React.memo(
  ({
    handleSubmit,
    handleReset,
    handleContinue,
    handlePause,
    handleNextWrapper,
    handlePrevWrapper,
    formState,
  }) => {
    return (
      <div className="buttons">
        {/*console.log("Rendering Buttons of Form")*/}
        <div>
          <button
            className={
              formState.pause && !formState.submit
                ? "pushable"
                : "pushable-disabled"
            }
            disabled={formState.pause && !formState.submit ? "" : true}
            onClick={handlePrevWrapper}
          >
            <span className="edge"></span>
            <span
              className={
                formState.pause && !formState.submit
                  ? "front"
                  : "front-disabled"
              }
            >
              {buttonNames.decrement}
            </span>
          </button>
        </div>
        <div>
          {formState.submit ? (
            <button className="pushable" onClick={handleSubmit}>
              <span className="edge"></span>
              <span className="front">{buttonNames.sort}</span>
            </button>
          ) : (
            <button className="pushable" onClick={handleReset}>
              <span className="edge"></span>
              <span className="front">{buttonNames.reset}</span>
            </button>
          )}
          {formState.pause ? (
            <div id="spacing">
              <button
                className={formState.submit ? "pushable-disabled" : "pushable"}
                disabled={formState.submit ? true : ""}
                onClick={handleContinue}
              >
                <span className="edge"></span>
                <span className={formState.submit ? "front-disabled" : "front"}>
                  {buttonNames.continue}
                </span>
              </button>
            </div>
          ) : (
            <div id="spacing">
              <button className="pushable" onClick={handlePause}>
                <span className="edge"></span>
                <span className="front">{buttonNames.pause}</span>
              </button>
            </div>
          )}
        </div>
        <div>
          <button
            className={
              formState.pause && !formState.submit
                ? "pushable"
                : "pushable-disabled"
            }
            disabled={formState.pause && !formState.submit ? "" : true}
            onClick={handleNextWrapper}
          >
            <span className="edge"></span>
            <span
              className={
                formState.pause && !formState.submit
                  ? "front"
                  : "front-disabled"
              }
            >
              {buttonNames.increment}
            </span>
          </button>
        </div>
      </div>
    );
  }
);

export default Buttons;
