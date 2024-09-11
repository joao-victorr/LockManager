// import fetch from 'fetch';
import axios, { AxiosResponse } from 'axios';
import { prismaClient } from "../databases/PrismaClient";
import type { LocksSession, Locks } from '../helpers/types';


const allLocksSessions: Array<LocksSession> = [];

export const loginLock = async() => {
    const units: Locks = await prismaClient.locks.findMany();

    await Promise.all(
        units.map(async(e) => {
        
            const url =`http://${e.ip}/login.fcgi`        
            
            const res = await axios.post(
                url,
                {
                    login: e.users,
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
            const existingUnitIndex = allLocksSessions.findIndex(unit => unit.id === newUnits.id);
    
            if (existingUnitIndex === -1) {
                allLocksSessions.push(newUnits);
            } else {
                allLocksSessions[existingUnitIndex].session = newUnits.session;
            }
        })
    )
}


export { allLocksSessions }
