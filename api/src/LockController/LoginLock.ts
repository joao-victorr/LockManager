// import fetch from 'fetch';
import axios, { type AxiosResponse } from 'axios';
import { prismaClient } from "../databases/PrismaClient";
import { ApiError } from '../helpers/apiErrors';
import type { Locks, LocksSession } from '../helpers/types';


const allLocksSessions: Array<LocksSession> = [];
export const loginLock = async () => {
    const devices: Array<Locks> = await prismaClient.locks.findMany({
        where: {
            status: true
        }
    });
    console.log(devices);

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
                const existingUnitIndex = allLocksSessions.findIndex(unit => unit.id === newDevices.id);

                if (existingUnitIndex === -1) {
                    console.log(`Logged in to device ${device.id} (${device.ip}) with session: ${data.session}`);
                    allLocksSessions.push(newDevices);
                } else {
                    allLocksSessions[existingUnitIndex].session = newDevices.session;
                }
            } catch (error) {
                console.error(`Failed to login to device ${device.id} (${device.ip})`);

                // Atualiza o status do dispositivo para `false` no banco de dados
                await prismaClient.locks.update({
                    where: { id: device.id },
                    data: { status: false }
                });
            }
        })
    );
};


export { allLocksSessions }
