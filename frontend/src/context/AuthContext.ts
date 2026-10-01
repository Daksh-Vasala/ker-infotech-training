import { createContext } from "react";
import type { AuthContextType } from "../types/user.types";

const defaultAuthContext: AuthContextType = {
  userId: null,
  userRole: null,
  setUserId: () => {},
  setUserRole: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
