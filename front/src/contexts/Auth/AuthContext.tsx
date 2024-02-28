import { createContext} from 'react'
import { UserType } from '../../Types/User';

export type AuthContextType = {
  user: UserType | null;
  login: (emai: string, password: string) => Promise<boolean>
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);


