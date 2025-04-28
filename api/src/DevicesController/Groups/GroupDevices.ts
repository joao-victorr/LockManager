import { AxiosHeaders, type AxiosRequestHeaders, type AxiosResponse } from 'axios';
import axiosInstance from "../../helpers/AxiosInstance";
import { httpCodeError } from "../../helpers/AxiosInstance";
import type { ReqError, ReqSuccess } from '../../helpers/Types/ResposeType';
import { ApiError } from '../../helpers/apiErrors';

type ResponseCreateInDevice = {
  ids: number[];
}


export class GroupDevice {
    private ip: string;
    private session: string;
  
    constructor( ip: string, session: string) {
        this.ip = ip;
        this.session = session;
    }

    private baseUrl(path: string): string {
        return `http://${this.ip}/${path}session=${this.session}`;
    }

    private async post(
        url: string,
        data: any,
        headers?: AxiosRequestHeaders
      ): Promise<ReqSuccess<AxiosResponse> | ReqError> {
      
        try {
          const response = await axiosInstance.post(url, data, { headers });

          if (response.status >= 400) {
            throw {
              response: {
                data: { message: response.statusText },
                statusCode: response.status,
              },
            };
          }

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

    async createGroup(id: number, name: string): Promise<ReqSuccess<ResponseCreateInDevice> | ReqError> {

      const path = "create_objects.fcgi?";
      const url = this.baseUrl(path);

      const payload = {
        object: "groups",
        values: [
            {
                id: id + 1000,
                name: name,
            },
        ],
     };

     const response = await this.post(url, payload);

     if (response.success) {
      return {
        success: true,
        data: response.data.data
      };
     }

     return response

     


    }
      
}

