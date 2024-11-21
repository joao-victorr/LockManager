
import axios, { type AxiosResponse } from 'axios';

import { BadResquestError } from '../../helpers/apiErrors';
import type { DataDeviceCode, Users } from '../../helpers/types';
import { allDevicesSessions } from "../LoginDevice";

//Function to create Devices for User
export async function createUserDevice(data: Users) {
    const allCodeAccessDevice: Array<DataDeviceCode> = [];

    //Definition of user data for registered
    const users = data.devices.map(e => {
        //Association of the Device ID with the corresponding session
        const unitData = allDevicesSessions.find(unit => unit.id === e.id_device);
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

    //User registration in each device
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
        allCodeAccessDevice.push(dataUnitCode);

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

    return allCodeAccessDevice;
}