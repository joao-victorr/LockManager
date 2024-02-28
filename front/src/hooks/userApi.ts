import axios from "axios";
import { DataUser } from "../Types/User";
// import env from "dotenv";

  const api = axios.create({
    baseURL: "http://localhost:3000"
  })

export const useApi = () => ({
  validateToken: async (token: string) => {
    const res = await api.get("/token", {
      headers: { 'Authorization': 'Bearer ' + token}
    })

    return res.data
  },

  login: async (email: string, password: string) => {
    const res = await api.post("/login", {
      email, password
    })

    console.log(res.data)
    return res.data
  },

  logout: async () => {
    return void
    await api.post("/logout")  
  },

  getUser: async (id?: string, name?: string, email?: string) => {

    const token = localStorage.getItem("authToken");
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const params = {
      id: id!,
      name: name!,
      email: email!,
    }
    
    const res = await api.get("/users",
    {
      params: params,
      headers: headers
    }
    )
    const users: DataUser[] = res.data.allUsers
    return users
  }
})

