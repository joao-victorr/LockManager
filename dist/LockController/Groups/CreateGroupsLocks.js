"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroupLocks = void 0;
const axios_1 = __importDefault(require("axios"));
const LoginLock_1 = require("../LoginLock");
const apiErrors_1 = require("../../helpers/apiErrors");
//----------------------------------------------------------------
//Function to create locks for groups
async function createGroupLocks(data) {
    const allGroupCodesLocks = [];
    if (data.locks.length == 0) {
        throw new apiErrors_1.BadResquestError("Unit is empty");
    }
    //Definition of group data for registered
    const groups = data.locks.map(e => {
        //Association of the lock ID with the corresponding session
        const unitData = LoginLock_1.allLocksSessions.find(unit => unit.id === e.id);
        if (!unitData) {
            throw new apiErrors_1.ApiError("Error ao relacionar unidades enviadas com unidades existentes.", 500);
        }
        ;
        const group = {
            id: e.id,
            ip: unitData.ip,
            session: unitData.session,
            name: data.name
        };
        return group;
    });
    //Group registration in each lock
    for (const group of groups) {
        const url = `http://${group.ip}/create_objects.fcgi?session=${group.session}`;
        const newGroup = await axios_1.default.post(url, {
            object: "groups",
            values: [{ name: group.name }]
        }, {
            headers: {
                "content-type": "application/json"
            }
        });
        const dataAccess = newGroup.data;
        //return of registered object data
        const dataUnitCode = { id: group.id, code: dataAccess.ids[0] };
        allGroupCodesLocks.push(dataUnitCode);
    }
    return allGroupCodesLocks;
}
exports.createGroupLocks = createGroupLocks;
//# sourceMappingURL=CreateGroupsLocks.js.map