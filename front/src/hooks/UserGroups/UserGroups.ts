// import type { User } from "../../Types/User";
import { api } from "../useApi";


type UserGroups = {
  id_user: string;
  devices: Array<{
    id_device: string,
    groups: Array<{id: string}>
  }>
}




export const UserGroupsApi = {
  

  postUser: async (userGroups: UserGroups) => {
    
    const token = localStorage.getItem('token');

    const res = await api.post("/user_group", userGroups, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res.status === 201

  },


}

