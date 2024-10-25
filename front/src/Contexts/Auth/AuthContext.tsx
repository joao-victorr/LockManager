import { createContext } from "react";

import type { User } from "../../Types/User";


export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>,
  logout: () => void,
}

export const AuthContext = createContext<AuthContextType>(null!);