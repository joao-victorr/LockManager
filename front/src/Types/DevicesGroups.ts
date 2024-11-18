import type { Device } from "./Device"
import type { Group } from "./Groups";

export interface DevicesGroup {
  id: string;
  code: number;
  id_locks: string;
  id_groups: string;
  groups: Group;
  locks: Device;
}


// "groupsLocks": [
//         {
//             "id": "cm3mi3rpr00036xeriy6thg6g",
//             "code": 2,
//             "id_locks": "cm3m47cog0000rqa0rp7155vv",
//             "id_groups": "cm3mi3rpk00016xerhebev15a",
//             "groups": {
//                 "id": "cm3mi3rpk00016xerhebev15a",
//                 "name": "DEPARTAMENTO TESTE"
//             },
//             "locks": {
//                 "id": "cm3m47cog0000rqa0rp7155vv",
//                 "name": "ADM EXTERNO"
//             }
//         },