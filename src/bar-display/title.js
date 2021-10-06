import React from "react";

export const Title = React.memo(() => {
  return <div className="logo">Sorting Visualizer</div>;
});

export const Finished = React.memo(() => {
  return <div id="finished">Finished Sorting</div>;
});
