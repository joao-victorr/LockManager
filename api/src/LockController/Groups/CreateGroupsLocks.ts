
import axios, { type AxiosResponse } from 'axios';

import { ApiError, BadResquestError } from '../../helpers/apiErrors';
import type { DataLockCode, Group } from '../../helpers/types';
import { allLocksSessions } from "../LoginLock";


//----------------------------------------------------------------
//Function to create locks for groups
export async function createGroupLocks(data: Group) {
    const allGroupCodesLocks: Array<DataLockCode> = [];

    if(data.locks.length === 0) {
      throw new BadResquestError("Unit is empty")
    }

    //Definition of group data for registered
    const groups = data.locks.map(e => {
        //Association of the lock ID with the corresponding session
        const unitData = allLocksSessions.find(unit => unit.id === e.id);

        if(!unitData) {
            throw new ApiError("Error ao relacionar unidades enviadas com unidades existentes.", 500)
        };

        const group = {
            id: e.id,
            ip: unitData.ip,
            session: unitData.session,
            name: data.name
        }

        return group;
    })
    
    //Group registration in each lock
    for(const group of groups) {
        const url = `http://${group.ip}/create_objects.fcgi?session=${group.session}`;

        const newGroup: AxiosResponse = await axios.post(
            url,
            {
                object: "groups",
                values: [{ name: group.name }]
            },
            {
                headers: {
                    "content-type": "application/json"
                }
            }
        )
        const dataAccess = newGroup.data;
        //return of registered object data
        const dataUnitCode = {id: group.id, code: dataAccess.ids[0]}
        allGroupCodesLocks.push(dataUnitCode);
    }

    return allGroupCodesLocks;
}