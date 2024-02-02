
import axios, { AxiosResponse } from 'axios';

import { sessionUnits } from "./loginLock";

type UnitSession = {
    name: String,
    session: String
}

type AcessUser = {
    name: string;
    image: Buffer;
    unidade: Array<{
      name: string;
      ip: string;
      department: string;
    }>;
  };

export async function createAccess(user: AcessUser) {

    for(let i = 0; i <user.unidade.length; i++) {
        const unitIp = user.unidade[i].ip;
        const unitName = user.unidade[i].name;

        const unitSession = sessionUnits.find(unit => unit.name === unitName);
        console.log(unitSession)

        const url = `http://${unitIp}/create_objects.fcgi?session=${unitSession?.session}`;
        console.log(url)


        const res: AxiosResponse = await axios.post(
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
        const data = res.data;
        console.log(data);
    }
    
}