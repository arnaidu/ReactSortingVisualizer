import React from "react";

const OneBar = React.memo((props) => {
  const { height } = props;
  const style = {
    color: "white",
    height: height + 50, // this is probably not the best way to do this
    fontSize: "20pt",
  };
  return (
    /* <>
      <svg width={30} height={height / 2} className={col}>
        <rect width={30} height={height / 2}></rect>
      </svg>
      <p className="p1">{(height - 50) / 100}</p>
    </>
    */
    <div id="blue-shadow" style={style}>
      {height / 10 - 21}
    </div>
  );
});

export default OneBar;
