import { createContext } from "react";

import type { UserWeb } from "../../Types/Auth";


export type AuthContextType = {
  user: UserWeb | null;
  login: (email: string, password: string) => Promise<boolean>,
  logout: () => void,
}

export const AuthContext = createContext<AuthContextType>(null!);