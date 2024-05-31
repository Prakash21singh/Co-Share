import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Authenticated = ({ element: Element, ...rest }) => {
  const location = useLocation();
  let accessTokenFromCookie = document.cookie.split(";")[0].split("=")[1];
  console.log(accessTokenFromCookie, "DFDSJ");

  return accessTokenFromCookie ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <Element {...rest} />
  );
};

export default Authenticated;
