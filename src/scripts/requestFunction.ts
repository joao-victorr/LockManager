
import axios, { AxiosResponse } from 'axios';

import { sessionUnits } from "./loginLock";


type AcessUser = {
    name: string;
    image: Buffer;
    unidade: Array<{
      name: string;
      ip: string;
      department: string;
    }>;
  };

async function createUser(user: AcessUser) {

    for(let i = 0; i <user.unidade.length; i++) {
        const unitIp = user.unidade[i].ip
        const unitName = user.unidade[i].name

        const unitSession = sessionUnits.find(unit => unit.name === unitName )

        const url = `http://${unitIp}/create_objects.fcgi?session=${unitSession}`

        // await fetch(url, {
        //     method: 'POST',
        //     headers:{
        //         "content-type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         "objects": "users",
        //         "values": [{
        //             registration: '0123',
        //             name: 'Walter White',
        //             password: 'Heisenberg'
        //         }]
        //     })
        // })
        // .then(res => res.json())
        // .then((data: any) => {

        // })

        const res = await axios.post(
            url,
            {
                objects: "users",
                values: [{
                    registration: '',
                    name: '',
                    password: ''
                }]
            },
            {
                headers: {
                    "content-type": "application/json"
                }
            }
        )

    }
    
}