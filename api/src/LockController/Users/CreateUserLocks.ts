
import axios, { type AxiosResponse } from 'axios';

import { allLocksSessions } from "../LoginLock";
import type { Users, DataLockCode } from '../../helpers/types';
import { BadResquestError } from '../../helpers/apiErrors';

//Function to create locks for User
export async function createUserLock(data: Users) {
    const allCodeAccessLock: Array<DataLockCode> = [];

    //Definition of user data for registered
    const users = data.locks.map(e => {
        //Association of the lock ID with the corresponding session
        const unitData = allLocksSessions.find(unit => unit.id === e.id);
        if(!unitData) {
            throw new BadResquestError("Error in unit association a session")
        }

        const user = {
            name: data.name,
            image: data.image,
            id: unitData.id,
            ip: unitData.ip,
            session: unitData.session
        }
        return user;
    })

    //User registration in each lock
    for(const user of users) {

        const url = `http://${user.ip}/create_objects.fcgi?session=${user.session}`;

        const addUser: AxiosResponse = await axios.post(
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
        const dataUser = addUser.data;
        const dataUnitCode = {id: user.id, code: dataUser.ids[0]}
        allCodeAccessLock.push(dataUnitCode);

        const urlAddPhoto = `http://${user.ip}/user_set_image.fcgi?user_id=${dataUser.ids[0]}&match=0&timestamp=1624997578&session=${user.session}`;
        const image = user.image
        await axios.post(
            urlAddPhoto,
            image,
            {
                headers: {
                    'Content-Type': 'application/octet-stream'
                }
            }
        )
    }

    return allCodeAccessLock;
}