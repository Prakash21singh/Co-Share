import { createContext, useContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
});

export const AuthContextProvider = AuthContext.Provider;

export default function useAuth() {
  return useContext(AuthContext);
}
