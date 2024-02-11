// import fetch from 'fetch';
import axios, { AxiosResponse } from 'axios';
import { prismaClient } from "../databases/PrismaClient";
import { UnitSession, Units } from '../helpers/types';


let allUnitSessions: UnitSession = [];

export const loginLock = async() => {

    const units: Units = await prismaClient.lock.findMany();

    units.map(async(e) => {
        const url =`http://${e.ip}/login.fcgi`        

        const res = await axios.post(
            url,
            {
                login: e.user,
                password: e.password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        const data = res.data;
        const newUnits = {id: e.id, ip: e.ip, session: data.session}
        const existingUnitIndex = allUnitSessions.findIndex(unit => unit.id === newUnits.id);

        if (existingUnitIndex === -1) {
            allUnitSessions.push(newUnits);
        } else {
            allUnitSessions[existingUnitIndex].session = newUnits.session;
        }
    })
}


export { allUnitSessions }
