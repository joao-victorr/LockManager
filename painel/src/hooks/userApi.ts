import axios from "axios";
import { DataLock, DataUser, NewUser, NewUserGruop } from "../Types/User";


const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
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

  getLocks: async () => {
    const token = localStorage.getItem("authToken");
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const res = await api.get("/locks",
    {
      headers: headers
    }
    )
    const locks: DataLock[] = res.data.Locks
    return locks;
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
    return users;
  },

  postUser: async (data: NewUser) => {
    const token = localStorage.getItem("authToken");
    const body = new FormData();

    body.append("data", JSON.stringify({
      "name": data.name,
      "locks": data.locks
    }));
    body.append("image", data.image);

    const headers = {
      'Authorization': `Bearer ${token}`
    };
    
    const res = await api.post("/users",
    body,
    {
      headers: headers
    })
    const users = res.data.data
    return users;

  },

  postUserGroup: async (data: NewUserGruop) => {
    const token = localStorage.getItem("authToken");
    const body = new FormData();

    body.append("data", JSON.stringify({
      "id_user": data.id_user,
      "locks": data.locks
    }));

    const headers = {
      'Authorization': `Bearer ${token}`
    };
    
    const res = await api.post("/user_group",
    body,
    {
      headers: headers
    })
    const userGruop = res.data.data
    return userGruop;

  }

})

