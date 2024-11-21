
import axios, { type AxiosResponse } from 'axios';

import { ApiError, BadResquestError } from '../../helpers/apiErrors';
import type { DataDeviceCode, Group } from '../../helpers/types';
import { allDevicesSessions } from "../LoginDevice";


//----------------------------------------------------------------
//Function to create Devices for groups
export async function createGroupDevices(data: Group) {
    const allGroupCodesDevices: Array<DataDeviceCode> = [];

    if(data.devices.length === 0) {
      throw new BadResquestError("Unit is empty")
    }

    //Definition of group data for registered
    const groups = data.devices.map(e => {
        //Association of the Device ID with the corresponding session
        const unitData = allDevicesSessions.find(unit => unit.id === e.id);

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
    
    //Group registration in each Device
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
        allGroupCodesDevices.push(dataUnitCode);
    }

    return allGroupCodesDevices;
}