
import axios, { AxiosResponse } from 'axios';


import { allUnitSessions } from "./LoginLock";
import { DeletData } from '../helpers/types';
import { ApiError } from '../helpers/apiErrors';


export const deletAccessLock = async (deletAccess: DeletData) => {

    for(let i = 0; i <  deletAccess.unidade.length; i++) {

        const unitData = allUnitSessions.find(unit => unit.id === deletAccess.unidade[i].id) || "err";
        if(unitData == "err") {
            throw new ApiError("Error in unit association a session", 500)
        }

        const codeDelet = deletAccess.unidade.find(unit => unit.id === unitData.id) || "err";
        if(codeDelet == "err") {
            throw new ApiError("Error in code association a unit", 500)
        }

        const user = {
            code: codeDelet.code,
            ip: unitData.ip,
            session: unitData.session
        }
        
        const url = `http://${user.ip}/destroy_objects.fcgi?session=${user.session}`;

        const res: AxiosResponse = await axios.post(
            url,
            {
                object: "users",
                where: {
                  users: {id: user.code}
                }
            },
            {
                headers: {
                    "content-type": "application/json"
                }
            }
        )
    }


}