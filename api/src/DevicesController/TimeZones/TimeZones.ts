import { AxiosHeaders, type AxiosRequestHeaders, type AxiosResponse } from 'axios';
import axiosInstance from "../../helpers/AxiosInstance";
import type { TimeSpans, TimeZonesBasicInfo } from '../../helpers/Types/Times';


type ResCreateObject = {
    ids: number[];
}
type Device = {
  id: string;
  ip: string;
  session: string;
}

export class TimeDevice {
    
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

    async getTimeZones() {

    }

    async getTimeSpans () {

    }


    async createTimeZones (timeZones: TimeZonesBasicInfo) {

        const uri = 'create_objects.fcgi?';
        const url = this.baseUrl(this.device.ip, uri, this.device.session);

        const payload = {
            object: "time_zones",
            values: [
                {
                    id: timeZones.id + 100 ,
                    name: timeZones.name,
                },
            ],
        };

        const res = await axiosInstance.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = res.data as ResCreateObject

        return data.ids[0];
      
    }

    async createTimeSpans (timeSpans: TimeSpans) {

        const uri = 'create_objects.fcgi?';
        const url = this.baseUrl(this.device.ip, uri, this.device.session);

        const payload = {
            object: "time_spans",
            values: [
                {
                    id: timeSpans.id + 100,
                    time_zone_id: timeSpans.timeZonesId + 100,
                    start: timeSpans.startHors,
                    end: timeSpans.endHors,
                    sun: timeSpans.sun ? 1 : 0,
                    mon: timeSpans.mon ? 1 : 0,
                    tue: timeSpans.tue ? 1 : 0,
                    wed: timeSpans.wed ? 1 : 0,
                    thu: timeSpans.thu ? 1 : 0,
                    fri: timeSpans.fri ? 1 : 0,
                    sat: timeSpans.sat ? 1 : 0,
                    hol1: timeSpans.hol1 ? 1 : 0,
                    hol2: timeSpans.hol2 ? 1 : 0,
                    hol3: timeSpans.hol3 ? 1 : 0                    
                },
            ],
        };

        const res = await axiosInstance.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = res.data as ResCreateObject

        console.log(data);
        return data.ids;
      
    }

    async updateTimeZone (tzId: string, data: any) {
      
    }

    async updateTimeSpans () {

    }

    async deleteTimeZone (tzId: string) {
      
    }

    async deleteTimeSpan (tsId: string) {
      
    }
}

