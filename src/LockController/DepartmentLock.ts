
import axios, { AxiosResponse } from 'axios';

import { allUnitSessions } from "./LoginLock";
import { DataUnitCode, Department } from '../helpers/types';
import { ApiError, BadResquestError } from '../helpers/apiErrors';

export async function createDepartmentLock(department: Department) {
    const allCodeDepartmentLock : Array<DataUnitCode> = [];

    if(department.units.length == 0) {
      throw new BadResquestError("Unit is empty")
    }
    
    for(let i = 0; i < department.units.length; i++) {
        const unitId = department.units[i].id;

        const unitData = allUnitSessions.find(unit => unit.id === unitId) || "err";

        if(unitData === "err") {
            throw new ApiError("Error ao relacionar unidades enviadas com unidades existentes.", 500)
        }

        const unitIp = unitData.ip;
        const url = `http://${unitIp}/create_objects.fcgi?session=${unitData.session}`;

        const addAccess: AxiosResponse = await axios.post(
            url,
            {
                object: "groups",
                values: [{ name: department.name }]
            },
            {
                headers: {
                    "content-type": "application/json"
                }
            }
        )
        const dataAccess = addAccess.data;
        const dataUnitCode = {id: unitId, code: dataAccess.ids[0]}
        allCodeDepartmentLock.push(dataUnitCode);
    }
    

    return allCodeDepartmentLock;
}