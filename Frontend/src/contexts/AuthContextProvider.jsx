import React, { useContext, useState } from "react";
import { AuthContext } from "./authContext";

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Anonymous");
  function setLoggedIn() {
    setIsLoggedIn(true);
  }
  function setLoggedOut() {
    setIsLoggedIn(false);
  }

  function setUser(user) {
    setUsername(user);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoggedIn, setLoggedOut, username, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
