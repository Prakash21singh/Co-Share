import React, { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    let userData = localStorage.getItem("userData");
    let usersData = JSON.parse(userData);
    // setUser(usersData);
    setUser(usersData);
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
