import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Authenticated = ({ element: Element, ...rest }) => {
  const location = useLocation();
  let accessToken = localStorage.getItem("accessToken");
  let accessTokenFromCookie = document.cookie.split(";")[0].split("=")[1];

  return accessToken || accessTokenFromCookie ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <Element {...rest} />
  );
};

export default Authenticated;
