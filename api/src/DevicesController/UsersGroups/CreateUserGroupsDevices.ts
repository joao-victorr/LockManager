// import axios, { AxiosResponse } from 'axios';
// import { BadResquestError } from '../../helpers/apiErrors';
// import type { UserGroup } from '../../helpers/types';
// import { allDevicesSessions } from "../LoginDevice";

// /*----------------------------------------------------------------*/
// //Function to create Devices for user_groups
// export async function createUserGroupDevices(data: Array<UserGroup>) {
//     if (data.length === 0) {
//         throw new BadResquestError("Unit is empty");
//     }

//     //Definition of user_group data for registered
//     const usersGroups = data.map(userGroupDevices => {
//       //Association of the Device ID with the corresponding session
      
//       const unitData = allDevicesSessions.find(unit => unit.id === userGroupDevices.device.id_device);
      
//       if (!unitData) {
//         throw new BadResquestError(`Error in association id: ${userGroupDevices.device.id_device} a session`);
//       }

//       const userGroup = {
//         id: userGroupDevices.device.id_device,
//         ip: unitData.ip,
//         session: unitData.session,
//         userCode: userGroupDevices.codeUserDevice,
//         codeGroups: userGroupDevices.device.codeGruops
//       }

//       return userGroup;
//     })
    
//     //User_Group registration in each device
//     for(const userGroup of usersGroups) {

//       userGroup.codeGroups.map( async (codeGruop) => {
//         const url = `http://${userGroup.ip}/create_objects.fcgi?session=${userGroup.session}`;
//         const teste = await axios.post(
//           url,
//           {
//               object: "user_groups",
//               values: [{ 
//                 "user_id": userGroup.userCode,
//                 "group_id": codeGruop.code
//               }]
//           },
//           {
//               headers: {
//                   "content-type": "application/json"
//               }
//           }
//         );
//       })
//     }
// }
