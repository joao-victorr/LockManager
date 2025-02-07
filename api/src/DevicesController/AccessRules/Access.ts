import axios, { type AxiosRequestHeaders, AxiosHeaders, type AxiosResponse } from 'axios';
import axiosInstance from "../../helpers/AxiosInstance";



type Device = {
  id: string;
  ip: string;
  session: string;
}

export class UserDevice {
    
    private device: Device;
  
    constructor(device: Device) {
        
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

    async createAcess () {
      
    }

}

