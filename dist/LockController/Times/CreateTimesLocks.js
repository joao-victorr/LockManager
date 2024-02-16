"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimesLocks = void 0;
const axios_1 = __importDefault(require("axios"));
const LoginLock_1 = require("../LoginLock");
const apiErrors_1 = require("../../helpers/apiErrors");
//Function to create locks for Times_Zones and Times_Spans
async function createTimesLocks(data) {
    const allTimesCodesLocks = [];
    if (data.locks.length == 0) {
        throw new apiErrors_1.BadResquestError("Unit is empty");
    }
    //Definition of Times_Zones and Times_Spans data for registered
    const times = data.locks.map(e => {
        //Association of the lock ID with the corresponding session
        const unitData = LoginLock_1.allLocksSessions.find(unit => unit.id === e.id);
        if (!unitData) {
            throw new apiErrors_1.ApiError("Error ao relacionar unidades enviadas com unidades existentes.", 500);
        }
        ;
        const time = {
            id: e.id,
            name: data.name,
            ip: unitData.ip,
            session: unitData.session,
            timesSpans: data.timesSpans
        };
        return time;
    });
    //Usser_Group registration in each lock
    for (const time of times) {
        const url = `http://${time.ip}/create_objects.fcgi?session=${time.session}`;
        //Request of create time_zones
        const newZones = await axios_1.default.post(url, {
            object: "time_zones",
            values: [{ name: time.name }]
        }, {
            headers: {
                "content-type": "application/json"
            }
        });
        const dataZones = newZones.data;
        //Request of create time_spans
        const newSpans = await axios_1.default.post(url, {
            object: "time_spans",
            values: [{
                    time_zone_id: dataZones.ids[0],
                    start: time.timesSpans.start,
                    end: time.timesSpans.end,
                    sun: time.timesSpans.sun,
                    mon: time.timesSpans.mon,
                    tue: time.timesSpans.tue,
                    wed: time.timesSpans.wed,
                    thu: time.timesSpans.thu,
                    fri: time.timesSpans.fri,
                    sat: time.timesSpans.sat,
                    hol1: time.timesSpans.hol1,
                    hol2: time.timesSpans.hol2,
                    hol3: time.timesSpans.hol3
                }]
        }, {
            headers: {
                "content-type": "application/json"
            }
        });
        const dataSpans = newSpans.data;
        const dataUnitCode = { id: time.id, codeZones: dataZones.ids[0], codeSpans: dataSpans.ids[0] };
        allTimesCodesLocks.push(dataUnitCode);
    }
    return allTimesCodesLocks;
}
exports.createTimesLocks = createTimesLocks;
//# sourceMappingURL=CreateTimesLocks.js.map