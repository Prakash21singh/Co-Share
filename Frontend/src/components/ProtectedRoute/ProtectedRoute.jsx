import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/authContext"; // Import the AuthContext

const ProtectedRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Navigate
            to={{ pathname: "/login", state: { from: location } }}
            replace
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
