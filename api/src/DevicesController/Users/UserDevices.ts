import { AxiosHeaders, type AxiosRequestHeaders, type AxiosResponse } from 'axios';
import axiosInstance from "../../helpers/AxiosInstance";
import { httpCodeError } from "../../helpers/AxiosInstance";
// import type { Devices } from '../../helpers/types';

type User = {
    id: number;
    name: string;
    beginTime: number | null;
    endTime: number | null;
    password: string | null;
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
    private user: User;
    private device: Device;
  
    constructor(user: User, device: Device) {
        this.user = user;
        this.device = device;
    }

    private baseUrl(ip: string, uri: string, session: string): string {
        return `http://${ip}/${uri}session=${session}`;
    }

    private async post(uri: string, data: any, headers?: AxiosRequestHeaders): Promise<AxiosResponse | null> {
        const url = this.baseUrl(this.device.ip, uri, this.device.session);
        
        try {
            return await axiosInstance.post(url, data, {
                headers
            });
        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                return null; // Retorna `null` no caso de timeout
            }
            throw error; // Relança outros erros
        }
    }


    async createUser(): Promise<{id: ResCreateUser | null, code: number}> {
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

        const response = await this.post('create_objects.fcgi?', payload);

        if (!response) {
            return { id: null, code: 408 };
        }

        return { id: response.data.ids[0], code: response.status}; // Retorna null se o usuário não for encontrado
    }

    async deleteUser(): Promise<ResDeleteUser> {
        const payload = {
            "object": "User",
            "ids": [this.user.id]
        };

        const response = await this.post('destroy_objects.fcgi?', payload);

        if (!response) {
            throw new Error(httpCodeError(408));
        }

        if (response.status >= 400) {
            throw new Error(httpCodeError(response.status));
        }

        return response.data as ResDeleteUser;
    }

    async setUserImage(image: Buffer): Promise<{ status: boolean, code: number}> {
        const timestamp = Math.floor(Date.now() / 1000);
        const uri = `user_set_image.fcgi?user_id=${(this.user.id + 1000)}&match=0&timestamp=${timestamp}&`;
        const headers = new AxiosHeaders({
            "Content-Type": "application/octet-stream"
        });

        const response = await this.post(uri, image, headers);

        if (!response) {
            throw new Error(httpCodeError(408));
        }


        return { status: response.data, code: response.status};

    }

    
    async getUser(): Promise<{user: User | null, code: number} >  {
        const payload = {
            object: "users",
            fields: ["id", "name"],
            where: {
                "users": {"id": this.user.id + 1000}
            }
        };

        const response = await this.post('load_objects.fcgi?', payload);

        if (!response) {
            return { user: null, code: 408 };
        }

        return { user: response.data.users[0], code: response.status}; // Retorna null se o usuário não for encontrado
    }
}

