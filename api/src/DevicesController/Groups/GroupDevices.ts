import { AxiosHeaders, type AxiosRequestHeaders, type AxiosResponse } from 'axios';
import axiosInstance from "../../helpers/AxiosInstance";
import { httpCodeError } from "../../helpers/AxiosInstance";
import type { ReqError, ReqSuccess } from '../../helpers/Types/ResposeType';

type Device = {
    id: string;
    ip: string;
    session: string;
}

export class GroupDevice {
    private device: Device;
  
    constructor( device: Device) {
        this.device = device;
    }

    private baseUrl(ip: string, uri: string, session: string): string {
        return `http://${ip}/${uri}session=${session}`;
    }

    private async post(
        uri: string,
        data: any,
        headers?: AxiosRequestHeaders
      ): Promise<ReqSuccess<AxiosResponse> | ReqError> {
        const url = this.baseUrl(this.device.ip, uri, this.device.session);
      
        try {
          const response = await axiosInstance.post(url, data, { headers });
          return {
            success: true,
            data: response,
          };
        } catch (error: unknown) {
          const axiosError = error as {
            response?: {
              data?: { message?: string };
              status?: number;
            };
          };
      
          return {
            success: false,
            error: {
              message: axiosError.response?.data?.message ?? "Erro desconhecido",
              statusCode: axiosError.response?.status,
            },
          };
        }
    }

    async createGroup() {


    //   const payload = {
    //     object: "users",
    //     values: [
    //         {
    //             id: this.user.id + 1000,
    //             registration: "",
    //             name: this.user.name,
    //             password: this.user.password,
    //         },
    //     ],
    //  };


    }
      
}

