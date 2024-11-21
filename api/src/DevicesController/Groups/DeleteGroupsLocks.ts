
// import axios, { AxiosResponse } from 'axios';

// import { allUnitSessions } from "../LoginLock";
// import { DeletGroup } from '../../helpers/types';
// import { ApiError } from '../../helpers/apiErrors';


// export const deletDataLock = async (deletData: DeletGroup) => {
//     for(let i = 0; i <  deletData.GroupsLock.length; i++) {

//         const unitData = allUnitSessions.find(unit => unit.id === deletData.GroupsLock[i].id_locks) || "err";
//         if(unitData == "err") {
//           throw new ApiError("Error ao relacionar unidades enviadas com unidade existentes.", 500)
//         }

//         const codeDelet = deletData.GroupsLock.find(data => data.id_locks === unitData.id) || "err";
//         if(codeDelet == "err") {
//           throw new ApiError("Error ao relacionar unidades enviadas com unidade existentes.", 500)
//         }

//         const group = {
//           code: codeDelet.code as number,
//           unitIp: unitData.ip as string,
//           unitSession: unitData.session as string
//         }
        
//         const url = `http://${group.unitIp}/destroy_objects.fcgi?session=${group.unitSession}`;

//         const res: AxiosResponse = await axios.post(
//             url,
//             {
//                 object: "groups",
//                 where: {
//                   groups: {id: group.code}
//                 }
//             },
//             {
//                 headers: {
//                     "content-type": "application/json"
//                 }
//             }
//         )
//     }
// }