import { AxiosHeaders, type AxiosRequestHeaders, type AxiosResponse } from 'axios';
import axiosInstance from "../../helpers/AxiosInstance";
import { httpCodeError } from "../../helpers/AxiosInstance";
import type { ReqError, ReqSuccess } from '../../helpers/Types/ResposeType';
import { ApiError } from '../../helpers/apiErrors';

type ResponseCreateInDevice = {
  success: boolean
}

type GroupAccessRulePayload =
  | {
      object: "group_access_rules";
      values: { group_id: number; access_rule_id: number }[];
    }
  | {
      object: "access_rule_time_zones";
      values: { time_zone_id: number; access_rule_id: number }[];
    };

export class AccessRules {
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

    async createGroup(
      accessRulesId: number,
      groupId: number,
      timeZonesId: number
    ): Promise<ReqSuccess<boolean> | ReqError> {
      const accessRulesDescriptionName = `(access_rules automatically created for groups ${groupId + 1000})`;
      const path = "create_objects.fcgi?";
      const url = this.baseUrl(path);
    
      const payloadAccessRules = {
        object: "access_rules",
        values: [
          {
            id: accessRulesId + 1000,
            name: accessRulesDescriptionName,
            type: 1,
            priority: 0,
          },
        ],
      };
    
      const accessRuleResponse = await this.post(url, payloadAccessRules);
    
      if (!accessRuleResponse.success) {
        return {
          success: false,
          error: accessRuleResponse.error,
        };
      }
    
      const accessRuleIdCreated = accessRuleResponse.data.data.ids[0];
      const expectedAccessRuleId = accessRulesId + 1000;
    
      if (accessRuleIdCreated !== expectedAccessRuleId) {
        return {
          success: false,
          error: {
            message: "Dados inconsistente, id recebido diferente do id desejado",
            statusCode: 500,
          },
        };
      }
    
      const groupAndTimeZonePayloads: GroupAccessRulePayload[] = [
        {
          object: "group_access_rules",
          values: [
            {
              group_id: groupId + 1000,
              access_rule_id: expectedAccessRuleId,
            },
          ],
        },
        {
          object: "access_rule_time_zones",
          values: [
            {
              time_zone_id: timeZonesId + 100,
              access_rule_id: expectedAccessRuleId,
            },
          ],
        },
      ];
    
      const groupAndTZResponses = await Promise.all(
        groupAndTimeZonePayloads.map(async (payload) => {
          const res = await this.post(url, payload);
    
          if (!res.success) {
            return {
              success: false,
              error: res.error,
            };
          }
    
          return {
            success: true,
            data: res.data.data,
          };
        })
      );
    
      const anyError = groupAndTZResponses.find((res) => !res.success);
    
      if (anyError) {
        return {
          success: false,
          error: {statusCode: 500, message: "Falha na criação de accesso rules"}
        };
      }
    
      return {
        success: true,
        data: true
      };
    }
     
}

