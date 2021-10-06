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
        <div>
          <button
            className="pushable"
            //disabled={formInput.submit ? "" : true}
            onClick={handlePrevWrapper}
          >
            <span className="edge"></span>
            <span className="front">{buttonNames.decrement}</span>
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
              <button className="pushable" onClick={handleContinue}>
                <span className="edge"></span>
                <span className="front">{buttonNames.continue}</span>
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
            className="pushable"
            //disabled={formInput.submit ? "" : true}
            onClick={handleNextWrapper}
          >
            <span className="edge"></span>
            <span className="front">{buttonNames.increment}</span>
          </button>
        </div>
      </div>
    );
  }
);

export default Buttons;
