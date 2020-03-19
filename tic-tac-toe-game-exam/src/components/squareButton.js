import React from "react";
const SquareButton = ({onClick,value})=>{
  return (
    <button className="squareButton" onClick={onClick}>
    {value}
    </button>
  );
}

export default SquareButton;
