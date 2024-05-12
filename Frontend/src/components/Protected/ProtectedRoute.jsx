import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../contexts/authContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  let accessToken = localStorage.getItem("accessToken");
  let accessTokenFromCookie = document.cookie.split(";")[0].split("=")[1];

  return accessToken || accessTokenFromCookie ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
