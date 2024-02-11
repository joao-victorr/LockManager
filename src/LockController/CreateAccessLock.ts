
import axios, { AxiosResponse } from 'axios';

import { allUnitSessions } from "./LoginLock";
import { Access, DataUnitCode } from '../helpers/types';
import { ApiError, BadResquestError } from '../helpers/apiErrors';

export async function createAccessLock(access: Access) {
    const allCodeAccessLock: Array<DataUnitCode> = [];

    for(let i = 0; i <access.unit.length; i++) {
        const unitId = access.unit[i].id;

        const unitData = allUnitSessions.find(unit => unit.id === unitId) || "err";
        if(unitData === "err") {
            throw new BadResquestError("Error in unit association a session")
        }

        const unitCode = access.unit.find(unit => unit.id === unitData.id) || "err";
        if(unitCode === "err") {
            throw new BadResquestError("Error in code association a unit")
        }

        const user = {
            name: access.name,
            image: access.image,
            department: unitCode.department,
            ip: unitData.ip,
            session: unitData.session
        }

        const url = `http://${user.ip}/create_objects.fcgi?session=${user.session}`;

        const addAccess: AxiosResponse = await axios.post(
            url,
            {
                object: "users",
                values: [{
                    registration: '',
                    name: user.name,
                    password: ''
                }]
            },
            {
                headers: {
                    "content-type": "application/json"
                }
            }
        )
        const dataAccess = addAccess.data;
        const dataUnitCode = {id: unitId, code: dataAccess.ids[0]}
        allCodeAccessLock.push(dataUnitCode);

        const addDepartment: AxiosResponse = await axios.post(
            url,
            {
                object: "user_groups",
                values: [{
                    user_id: dataAccess.ids[0],
                    group_id: user.department,
                }]
            },
            {
                headers: {
                    "content-type": "application/json"
                }
            }
        )

        const urlAddPhoto = `http://${user.ip}/access_set_image.fcgi?access_id=${dataAccess.ids}&match=0&timestamp=1624997578&session=${user.session}`;
        const addPhoto: AxiosResponse = await axios.post(
            urlAddPhoto,
            user.image,
            {
                headers: {
                    'Content-Type': 'application/octet-stream'
                }
            }
        )
        const dataPhoto = addPhoto.data;
    }
    

    return allCodeAccessLock;
}