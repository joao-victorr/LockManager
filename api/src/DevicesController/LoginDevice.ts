// import fetch from 'fetch';
import axios, { type AxiosResponse } from 'axios';
import { prismaClient } from "../databases/PrismaClient";
import { ApiError } from '../helpers/apiErrors';
import type { Devices, DevicesSession } from '../helpers/types';


const allDevicesSessions: Array<DevicesSession> = [];
export const loginDevice = async () => {
    const devices: Array<Devices> = await prismaClient.devices.findMany({
        where: {
            status: true
        }
    });

    await Promise.all(
        devices.map(async (device) => {
            try {
                const url = `http://${device.ip}/login.fcgi`;

                const res: AxiosResponse = await axios.post(
                    url,
                    {
                        login: device.users,
                        password: device.password
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                const data = res.data;
                const newDevices = { id: device.id, ip: device.ip, session: data.session };
                const existingUnitIndex = allDevicesSessions.findIndex(unit => unit.id === newDevices.id);

                if (existingUnitIndex === -1) {
                    // console.log(`Logged in to device ${device.id} (${device.ip}) with session: ${data.session}`);
                    allDevicesSessions.push(newDevices);
                } else {
                    allDevicesSessions[existingUnitIndex].session = newDevices.session;
                }
            } catch (error) {
                console.error(`Failed to login to device ${device.id} (${device.ip})`);

                // Atualiza o status do dispositivo para `false` no banco de dados
                await prismaClient.devices.update({
                    where: { id: device.id },
                    data: { status: false }
                });
            }
        })
    );
};


export { allDevicesSessions }
