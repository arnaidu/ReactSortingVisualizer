import React from "react";
//import { motion } from "framer-motion"; // ES6

/** Style Imports */
import "../styles/bars.css";

const ManyBars = React.memo(({ state }) => {
    var allBars = state.data.map((item, index) => {
        const style = {
            height: (item.value + 21) * 8 + 20, // this is probably not the best way to do this
        };
        // make both being compared for swapping whiter
        // if done, full opacity, otherwise low opacity
        if (state.j === index && !state.done) {
            if (state.i === 0 && state.j === 0) {
                return (
                    <div className="bar comparing" key={item.id} style={style}>
                        {item.value}
                    </div>
                );
            }

            return (
                <div className="bar comparing" key={item.id} style={style}>
                    {item.value}
                </div>
            );
        } else if (
            index >= state.data.length - state.i ||
            (state.i === state.data.length - 1 && state.j === 0 && state.done) // pretty much the last state when everything is done
        ) {
            return (
                <div className="bar done" key={item.id} style={style}>
                    {item.value}
                </div>
            );
        } else {
            return (
                <div className="bar not-done" key={item.id} style={style}>
                    {item.value}
                </div>
            );
        }
    });
    return <div className="container-bar">{state.data.length !== 0 && allBars}</div>;
});
export default ManyBars;
