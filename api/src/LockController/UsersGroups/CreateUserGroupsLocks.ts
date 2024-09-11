import axios, { AxiosResponse } from 'axios';
import { allLocksSessions } from "../LoginLock";
import type { UserGroup } from '../../helpers/types';
import { BadResquestError } from '../../helpers/apiErrors';

/*----------------------------------------------------------------*/
//Function to create locks for user_groups
export async function createUserGroupLocks(data: Array<UserGroup>) {
    if (data.length === 0) {
        throw new BadResquestError("Unit is empty");
    }

    //Definition of user_group data for registered
    const usersGroups = data.map(userGroupLocks => {
      //Association of the lock ID with the corresponding session
      
      const unitData = allLocksSessions.find(unit => unit.id === userGroupLocks.lock.id_lock);
      
      if (!unitData) {
        throw new BadResquestError(`Error in association id: ${userGroupLocks.lock.id_lock} a session`);
      }

      const userGroup = {
        id: userGroupLocks.lock.id_lock,
        ip: unitData.ip,
        session: unitData.session,
        userCode: userGroupLocks.codeUserLock,
        codeGroups: userGroupLocks.lock.codeGruops
      }

      return userGroup;
    })
    
    //User_Group registration in each lock
    for(const userGroup of usersGroups) {

      userGroup.codeGroups.map( async (codeGruop) => {
        const url = `http://${userGroup.ip}/create_objects.fcgi?session=${userGroup.session}`;
        const teste = await axios.post(
          url,
          {
              object: "user_groups",
              values: [{ 
                "user_id": userGroup.userCode,
                "group_id": codeGruop.code
              }]
          },
          {
              headers: {
                  "content-type": "application/json"
              }
          }
        );
      })
    }
}
