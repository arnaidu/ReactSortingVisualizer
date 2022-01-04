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
                {console.log("buttons", formState)}
                <div id="sort-cont-buttons" key="button1">
                    {formState.submit ? (
                        <button className="btn" onClick={handleSubmit}>
                            {buttonNames.sort}
                        </button>
                    ) : (
                        <button className="btn" onClick={handleReset}>
                            {buttonNames.reset}
                        </button>
                    )}
                    {formState.pause ? (
                        <button
                            className="btn"
                            disabled={formState.submit ? true : ""}
                            onClick={handleContinue}
                        >
                            {buttonNames.continue}
                        </button>
                    ) : (
                        <button className="btn" onClick={handlePause}>
                            {buttonNames.pause}
                        </button>
                    )}
                </div>

                <div id="prev-step-buttons" key="button2">
                    <button
                        className="btn"
                        disabled={formState.pause && !formState.submit ? "" : true}
                        onClick={handlePrevWrapper}
                    >
                        {buttonNames.decrement}
                    </button>

                    <button
                        className="btn"
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
