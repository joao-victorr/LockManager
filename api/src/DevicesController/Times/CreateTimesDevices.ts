import axiosInstance from "../../helpers/AxiosInstance";

type Device = {
    id: string;
    ip: string;
    session: string;
}

type TimeZone = {
    id: string;
    name: string;
}

type TimeSpan = {
    id: string;
    start: number;
    end: number;
    sun: number;
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
    sat: number;
    hol1: number;
    hol2: number;
    hol3: number;
    timeZonesId: string;
}

type ResCreateObject = {
    ids: number[];
}

type ResDeleteObject = {
    changes: number;
}

export class TimeZoneDevice {
    timeZone: TimeZone;
    device: Device;

    constructor(timeZone: TimeZone, device: Device) {
        this.timeZone = timeZone;
        this.device = device;
    }

    private baseUrl(ip: string, uri: string, session: string): string {
        return `http://${ip}/${uri}session=${session}`;
    }

    async createTimeZone(): Promise<ResCreateObject> {
        const uri = 'create_objects.fcgi?';
        const url = this.baseUrl(this.device.ip, uri, this.device.session);

        const payload = {
            object: "time_zones",
            values: [
                {
                    id: this.timeZone.id,
                    name: this.timeZone.name,
                },
            ],
        };

        const response = await axiosInstance.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return response.data as ResCreateObject;
    }

    async deleteTimeZone(): Promise<ResDeleteObject> {
        const uri = 'destroy_objects.fcgi?';
        const url = this.baseUrl(this.device.ip, uri, this.device.session);

        const response = await axiosInstance.post(url, {
            "object": "time_zones",
            "ids": [this.timeZone.id]
        });

        return response.data as ResDeleteObject;
    }
}

export class TimeSpanDevice {
    timeSpan: TimeSpan;
    device: Device;

    constructor(timeSpan: TimeSpan, device: Device) {
        this.timeSpan = timeSpan;
        this.device = device;
    }

    private baseUrl(ip: string, uri: string, session: string): string {
        return `http://${ip}/${uri}session=${session}`;
    }

    async createTimeSpan(): Promise<ResCreateObject> {
        const uri = 'create_objects.fcgi?';
        const url = this.baseUrl(this.device.ip, uri, this.device.session);

        const payload = {
            object: "time_spans",
            values: [
                {
                    id: this.timeSpan.id,
                    start: this.timeSpan.start,
                    end: this.timeSpan.end,
                    sun: this.timeSpan.sun,
                    mon: this.timeSpan.mon,
                    tue: this.timeSpan.tue,
                    wed: this.timeSpan.wed,
                    thu: this.timeSpan.thu,
                    fri: this.timeSpan.fri,
                    sat: this.timeSpan.sat,
                    hol1: this.timeSpan.hol1,
                    hol2: this.timeSpan.hol2,
                    hol3: this.timeSpan.hol3,
                    time_zone_id: this.timeSpan.timeZonesId,
                },
            ],
        };

        const response = await axiosInstance.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return response.data as ResCreateObject;
    }

    async deleteTimeSpan(): Promise<ResDeleteObject> {
        const uri = 'destroy_objects.fcgi?';
        const url = this.baseUrl(this.device.ip, uri, this.device.session);

        const response = await axiosInstance.post(url, {
            "object": "time_spans",
            "ids": [this.timeSpan.id]
        });

        return response.data as ResDeleteObject;
    }
}