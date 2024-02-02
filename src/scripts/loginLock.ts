// import fetch from 'fetch';
import axios, { AxiosResponse } from 'axios';
import { prismaClient } from "../database/PrismaClient";

type UnitSession = Array<{
    name: String,
    session: String
}>;

type Units = Array<{
    id: String
    name: string,
    ip: string
}>;

let sessionUnits: UnitSession = [];

export const loginLock = async() => {

    const units: Units = await prismaClient.lock.findMany();

    units.map(async(e) => {
        const url =`http://${e.ip}/login.fcgi`        

        const res = await axios.post(
            url,
            {
                login: "admin",
                password: "Pd@1478#H"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        const data = res.data;
        const newUnits = {name: e.name, session: data.session}
        const existingUnitIndex = sessionUnits.findIndex(unit => unit.name === newUnits.name);

        if (existingUnitIndex === -1) {
            sessionUnits.push(newUnits);
        } else {
            sessionUnits[existingUnitIndex].session = newUnits.session;
        }
    })
}


export { sessionUnits }
