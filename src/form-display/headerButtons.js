import React from "react";

/** Style Imports */
import "../styles/buttons.css";

/* Names for all buttons used */
const buttonNames = {
    pause: "Pause",
    sort: "Sort",
    increment: "Step",
    decrement: "Prev",

    reset: "Reset",
    continue: "Continue",
};

/**
 * React component for all buttons used
 */
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
            <>
                <div id="sort-cont-buttons" key="button1">
                    {formState.submit ? (
                        <button className="btn btn-enabled" onClick={handleSubmit}>
                            {buttonNames.sort}
                        </button>
                    ) : (
                        <button className="btn btn-enabled" onClick={handleReset}>
                            {buttonNames.reset}
                        </button>
                    )}
                    {formState.pause ? (
                        <button
                            className={formState.submit ? "btn" : "btn btn-enabled"}
                            disabled={formState.submit ? true : ""}
                            onClick={handleContinue}
                        >
                            {buttonNames.continue}
                        </button>
                    ) : (
                        <button className="btn btn-enabled" onClick={handlePause}>
                            {buttonNames.pause}
                        </button>
                    )}
                </div>

                <div id="prev-step-buttons" key="button2">
                    <button
                        className={formState.pause && !formState.submit ? "btn btn-enabled" : "btn"}
                        disabled={formState.pause && !formState.submit ? "" : true}
                        onClick={handlePrevWrapper}
                    >
                        {buttonNames.decrement}
                    </button>

                    <button
                        className={formState.pause && !formState.submit ? "btn btn-enabled" : "btn"}
                        disabled={formState.pause && !formState.submit ? "" : true}
                        onClick={handleNextWrapper}
                    >
                        {buttonNames.increment}
                    </button>
                </div>
            </>
        );
    }
);

export default Buttons;
