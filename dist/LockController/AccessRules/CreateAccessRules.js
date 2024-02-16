"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessRulesLocks = void 0;
const axios_1 = __importDefault(require("axios"));
const LoginLock_1 = require("../LoginLock");
const apiErrors_1 = require("../../helpers/apiErrors");
//Function to create locks for access rules
async function createAccessRulesLocks(data) {
    const allGroupCodesLocks = [];
    if (data.length == 0) {
        throw new apiErrors_1.BadResquestError("Unit is empty");
    }
    //Definition of access_rules data for registered
    const dataAccessRules = data.map(e => {
        //Association of the lock ID with the corresponding session
        const locksData = LoginLock_1.allLocksSessions.find(locks => locks.id === e.id);
        if (!locksData) {
            throw new apiErrors_1.ApiError("Error ao relacionar unidades enviadas com unidades existentes.", 500);
        }
        ;
        const dataAccessRules = {
            id: e.id,
            ip: locksData.ip,
            session: locksData.session,
            groupsLocks: e.GroupsLocks[0].code,
            timeZonesLocks: e.TimeZonesLocks[0].code
        };
        return dataAccessRules;
    });
    //Access_rules registration in each lock
    for (const accessRules of dataAccessRules) {
        const url = `http://${accessRules.ip}/create_objects.fcgi?session=${accessRules.session}`;
        //Request create object Access_rules
        const newAccessRules = await axios_1.default.post(url, {
            object: "access_rules",
            values: [{
                    "name": `(Regra de Acesso automaticamente criada para o Grupo ${accessRules.groupsLocks})`,
                    "type": 1,
                    "priority": 0
                }]
        }, {
            headers: {
                "content-type": "application/json"
            }
        });
        const resAccessRules = newAccessRules.data;
        //Request to create a Group association object in Access_Rules
        const newGroupAccessRules = await axios_1.default.post(url, {
            object: "group_access_rules",
            values: [{
                    "group_id": accessRules.groupsLocks,
                    "access_rule_id": resAccessRules.ids[0]
                }]
        }, {
            headers: {
                "content-type": "application/json"
            }
        });
        const resGroupAccessRules = newGroupAccessRules.data;
        ////Request to create a TimeZones association object in Access_Rules
        const resAccessRulesTimeZones = await axios_1.default.post(url, {
            object: "access_rule_time_zones",
            values: [{
                    "access_rule_id": resAccessRules.ids[0],
                    "time_zone_id": accessRules.timeZonesLocks
                }]
        }, {
            headers: {
                "content-type": "application/json"
            }
        });
        const dataUnitCode = { id: accessRules.id, code: resAccessRules.ids[0] };
        allGroupCodesLocks.push(dataUnitCode);
    }
    return allGroupCodesLocks;
}
exports.createAccessRulesLocks = createAccessRulesLocks;
//# sourceMappingURL=CreateAccessRules.js.map