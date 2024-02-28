
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { UserType } from "../../Types/User";
import { useApi } from "../../hooks/userApi";

export const  AuthProvider = ({children}: {children: JSX.Element}) => {
  const api = useApi()
  const [user, setUser] = useState<UserType | null>(null)
  
  useEffect(() => {

    const validateToken = async() => {
      const storageToken = localStorage.getItem('authToken');
      if (storageToken) {
        const data = await api.validateToken(storageToken)
        if(data.user) {
          setUser(data.user)
        }
      }
    }
    validateToken()

  }, [])

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token)
  }

  const login = async (emai: string, password: string) => {
    const data = await api.login(emai, password)
    if(data.user && data.token) {
      setUser(data.user)
      setToken(data.token)
      return true
    }

    return false
  }

  const logout = async() => {
    setUser(null)
    setToken("null")
    // await api.logout()
  }


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )

}