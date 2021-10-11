import React from "react";

export const Title = React.memo(() => {
  return (
    <div className="logo" key="logo">
      {/*console.log("Rendering Title of Form")*/}
      Sorting Visualizer
    </div>
  );
});

export const Finished = React.memo(() => {
  return (
    <div id="finished" key="finished">
      Finished Sorting
    </div>
  );
});
