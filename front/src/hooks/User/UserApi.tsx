// import type { User } from "../../Types/User";
import { api } from "../useApi";


type DataUser = {
  name: string;
  image: ArrayBuffer;
  devices: Array<{
    id_device: string
  }>
}

type User = {
  id: string;
  name: string;
  image: ArrayBuffer;
  // UsersDevices: 
  // UserGroups: 
}

type NewUser = {
  user: User;
  userDevices: Array<{
    id: string;
    code: number;
    id_device: string;
    id_users: string;
  }> 
}

type ResNewuser = {
  newUser: NewUser
}

export const UserApi = {
  

  postUser: async (user: DataUser) => {
    const token = localStorage.getItem('token');

    const userData = new FormData();

    userData.append("data", JSON.stringify({ 
      name: user.name, 
      devices: user.devices 
    }));
    userData.append("image", new Blob([user.image], { type: 'image/jpeg' }));

    
    const res = await api.post("/users", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    const resNewUser = res.data as ResNewuser

    const data = res.status === 201 ? resNewUser.newUser : null

    return data


  },


}



// const newUser: {
//   user: {
//       image: Buffer;
//       id: string;
//       name: string;
//   };
//   userDevices: {
//       id: string;
//       code: number;
//       id_devices: string;
//       id_users: string;
//   }[];
// }