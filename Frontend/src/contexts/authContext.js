import { createContext, useContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  authenticateUser: () => {},
  unAuthenticateUser: () => {},
});

export default function useAuth() {
  return useContext(AuthContext);
}
