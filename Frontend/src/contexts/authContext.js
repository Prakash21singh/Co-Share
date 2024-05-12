import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: {},
});

export default function useAuth() {
  return useContext(AuthContext);
}
