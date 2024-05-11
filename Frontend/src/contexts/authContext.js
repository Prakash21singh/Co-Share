import { createContext, useContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  username: null,
  setLoggedIn: () => {},
  setLoggedOut: () => {},
  setUser: (user) => {},
});
