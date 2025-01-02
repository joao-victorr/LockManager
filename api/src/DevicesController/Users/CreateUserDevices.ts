import axios from 'axios';
import axiosInstance from "../../helpers/AxiosInstance";
import type { Devices } from '../../helpers/types';


type User = {
    id: number;
    name: string;
    beginTime: number | null;
    endTime: number | null;
    registration: number;
    password?: string;
}

type Device = {
    id: string;
    ip: string;
    session: string;
}

type ResCreateUser = {
    ids: number;
}

type ResDeleteUser = {
    changes: number;
}

export class UserDevice {

    user: User;
    device: Device;
  
    constructor(user: User, device: Device) {
      // Assign properties with type safety
      this.user = user;
      this.device = device
    }

    private baseUrl(ip: string, uri: string, session: string): string {
        return `http://${ip}/${uri}session=${session}`;
    }


    async createUser (): Promise<ResCreateUser> {
        const uri = 'create_objects.fcgi?';
        const url = this.baseUrl(this.device.ip, uri, this.device.session);


        const payload = {
            object: "users",
            values: [
                {
                    id: this.user.id + 1000,
                    registration: "",
                    name: this.user.name,
                    password: this.user.password,
                },
            ],
        };

        const response = await axiosInstance.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.status) {

        }

        return response.data as ResCreateUser;

    }

    async deleteUser (): Promise<ResDeleteUser> {
        const uri = 'destroy_objects.fcgi?';
        const url = this.baseUrl(this.device.ip, uri, this.device.session);

        const response = await axiosInstance.post(url, {
            "object": "User",
            "ids": [this.user.id]
        });

        return response.data as ResDeleteUser;
    }

    async setUserImage (image: Buffer, code: number) {
        const timestamp = Math.floor(Date.now() / 1000);
        const uri = `user_set_image.fcgi?user_id=${code}&match=0&timestamp=${timestamp}&`;
        const url = this.baseUrl(this.device.ip, uri, this.device.session);

        // Enviando a imagem como bytes no corpo da requisição
        const response = await axiosInstance.post(url, image, {
            headers: {
                "Content-Type": "application/octet-stream", // Tipo de conteúdo como binário
            },
        });

        return true
    }

    // async getUser(): Promise<User> {
    //     const uri = 'load_objects.fcgi?';
    //     const url = this.baseUrl(this.device.ip, uri, this.device.session);
    
    //     const payload = {
    //         object: "users",
    //         fields: ["id", "name"],
    //         where: {
    //             id: this.user.id
    //         }
    //     };
    
    //     try {
    //         const response = await axiosInstance.post(url, payload, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    
    //         if (response.data && response.data.users && response.data.users.length > 0) {
    //             const userData = response.data.users[0];
    //             return {
    //                 id: userData.id,
    //                 name: userData.name,
    //                 registration: userData.registration,
    //                 beginTime: userData.begin_time,
    //                 endTime: userData.end_time,
    //                 password: userData.password
    //             };
    //         } else {
    //             throw new Error('User not found');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user:', error);
    //         throw error;
    //     }
    // }


}