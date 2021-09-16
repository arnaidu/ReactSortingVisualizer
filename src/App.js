import react from "react";
import "./App.css";
import ChooseSort from "./bar-display/ChooseSort";
import MultipleBars from "./bar-display/MultipleBars";

function App() {
  return (
    <div className="container">
      <h1>Sorting Visualizer</h1>
      <ChooseSort />
      <MultipleBars />
    </div>
  );
}

export default App;
