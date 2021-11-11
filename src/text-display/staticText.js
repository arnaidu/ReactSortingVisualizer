import React from "react";

/* Title of the webpage */
export const Title = React.memo(() => {
  return (
    <div className="logo" key="logo">
      {/*console.log("Rendering Title of Form")*/}
      Sorting Visualizer
    </div>
  );
});

/* Text to display when we are finished sorting */
export const Finished = React.memo(() => {
  return (
    <div id="finished" key="finished">
      Finished Sorting
    </div>
  );
});
