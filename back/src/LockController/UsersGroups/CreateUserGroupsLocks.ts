import axios, { AxiosResponse } from 'axios';
import { allLocksSessions } from "../LoginLock";
import { UserGroup } from '../../helpers/types';
import { BadResquestError } from '../../helpers/apiErrors';

/*----------------------------------------------------------------*/
//Function to create locks for user_groups
export async function createUserGroupLocks(data: Array<UserGroup>) {
    if (data.length === 0) {
        throw new BadResquestError("Unit is empty");
    }

    //Definition of user_group data for registered
    const usersGroups = data.map(data => {
      //Association of the lock ID with the corresponding session
      const unitData = allLocksSessions.find(unit => unit.id === data.id);
      if (!unitData) {
        throw new BadResquestError(`Error in association id: ${data.id} a session`);
      }

      const userGroup = {
        id: data.id,
        ip: unitData.ip,
        session: unitData.session,
        userCode: data.UsersLocks[0].code,
        groupCode: data.GroupsLocks[0].code
      }

      return userGroup;
    })

    //User_Group registration in each lock
    for(const userGroup of usersGroups) {
        const url = `http://${userGroup.ip}/create_objects.fcgi?session=${userGroup.session}`;
        await axios.post(
          url,
          {
              object: "user_groups",
              values: [{ 
                "user_id": userGroup.userCode,
                "group_id": userGroup.groupCode
              }]
          },
          {
              headers: {
                  "content-type": "application/json"
              }
          }
        );
    }
}
