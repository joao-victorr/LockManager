"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserGroupLocks = void 0;
const axios_1 = __importDefault(require("axios"));
const LoginLock_1 = require("../LoginLock");
const apiErrors_1 = require("../../helpers/apiErrors");
/*----------------------------------------------------------------*/
//Function to create locks for user_groups
async function createUserGroupLocks(data) {
    if (data.length === 0) {
        throw new apiErrors_1.BadResquestError("Unit is empty");
    }
    //Definition of user_group data for registered
    const usersGroups = data.map(data => {
        //Association of the lock ID with the corresponding session
        const unitData = LoginLock_1.allLocksSessions.find(unit => unit.id === data.id);
        if (!unitData) {
            throw new apiErrors_1.BadResquestError(`Error in association id: ${data.id} a session`);
        }
        const userGroup = {
            id: data.id,
            ip: unitData.ip,
            session: unitData.session,
            userCode: data.UsersLocks[0].code,
            groupCode: data.GroupsLocks[0].code
        };
        return userGroup;
    });
    //User_Group registration in each lock
    for (const userGroup of usersGroups) {
        const url = `http://${userGroup.ip}/create_objects.fcgi?session=${userGroup.session}`;
        await axios_1.default.post(url, {
            object: "user_groups",
            values: [{
                    "user_id": userGroup.userCode,
                    "group_id": userGroup.groupCode
                }]
        }, {
            headers: {
                "content-type": "application/json"
            }
        });
    }
}
exports.createUserGroupLocks = createUserGroupLocks;
//# sourceMappingURL=CreateUserGroupsLocks.js.map