import React, { useState, useEffect } from "react";
import "./index.scss";

const Popup = ({
  message = "Error found!!",
  color = "red",
  duration = 3000,
}) => {
  // Default duration to 3 seconds
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [isVisible, duration]);

  return (
    isVisible && ( // Only render if visible
      <div
        className="errorMessageBox"
        style={{ borderLeft: `4px solid ${color}` }}>
        <h3>{message}</h3>
      </div>
    )
  );
};

export default Popup;
