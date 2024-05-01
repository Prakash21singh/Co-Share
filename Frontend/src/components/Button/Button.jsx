import React from "react";
import "./style.scss";
const Button = ({
  text,
  width,
  height,
  padding,
  borderRadius,
  fontSize = "17px",
  handleClick,
}) => {
  return (
    <>
      <button
        onClick={handleClick}
        className="component_Button"
        style={{
          width: width,
          height: height,
          padding: padding,
          borderRadius: borderRadius,
          fontSize: fontSize,
        }}>
        {text}
      </button>
    </>
  );
};

export default Button;
