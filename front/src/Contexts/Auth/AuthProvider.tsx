
import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"

import type { UserWeb } from "../../Types/Auth"
import { UseApi } from "../../hooks/useApi"

const authApi = new UseApi().authApi


export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<UserWeb | null>(null);

  useEffect(() => {
        

    const validateToken = async () => {
      const token = localStorage.getItem('token')
      if (!token) return;

      const user = await authApi.validateToken(token)
      setUser(user)
      return user
    }; validateToken()


  }, [])

  const login = async (email: string, password: string) => {

    const data = await authApi.login({email, password})

    if( !data.user || !data.token ) {
      return false;
    }

    setUser(data.user)
    localStorage.setItem('token', data.token)
    return true
    
  }

  const logout = async () => {
    await authApi.logout()
    localStorage.removeItem('token')
    setUser(null)
    return
  }

  return (
    <AuthContext.Provider value = {{user, login, logout}}>
      { children }
    </AuthContext.Provider>
  )
}