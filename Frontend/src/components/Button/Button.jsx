import React from "react";
import "./style.scss";
const Button = ({
  text,
  width,
  height,
  padding,
  borderRadius,
  fontSize = "17px",
}) => {
  return (
    <>
      <button
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
