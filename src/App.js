import { useState } from "react";
import ManyBars from "./bar-display/ManyBars";
import Form from "./form-display/Header";

const initState = {
    data: [],
    i: 0,
    j: 0,
    done: true,
    timer: 0,
};
const App = () => {
    /* States used for this component */
    const [state, setState] = useState({ ...initState });

    return (
        <div className="container" key="main">
            <Form state={state} setState={setState} key="Form" />
            <ManyBars state={state} key="ManyBars" />
        </div>
    );
};

export default App;
