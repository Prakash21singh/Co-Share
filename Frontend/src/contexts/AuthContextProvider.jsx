import React, { useState } from "react";
import { AuthContext } from "./authContext";

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function authenticateUser() {
    setIsAuthenticated(true);
  }
  function unAuthenticateUser() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticateUser,
        unAuthenticateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
