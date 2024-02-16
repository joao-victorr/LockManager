"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesController = void 0;
const PrismaClient_1 = require("../databases/PrismaClient");
const apiErrors_1 = require("../helpers/apiErrors");
const CreateTimesLocks_1 = require("../LockController/Times/CreateTimesLocks");
class TimesController {
    async create(req, res) {
        if (!req.body.name || !req.body.timesSpans) {
            throw new apiErrors_1.BadResquestError("Data is required");
        }
        const times = {
            name: req.body.name,
            locks: req.body.locks,
            timesSpans: req.body.timesSpans
        };
        const newTimes = await PrismaClient_1.prismaClient.$transaction(async (tx) => {
            const timesZones = await tx.timeZones.create({
                data: {
                    name: times.name
                }
            });
            const timesSpans = await tx.timeSpans.create({
                data: {
                    time_zones_id: timesZones.id,
                    start: times.timesSpans.start,
                    end: times.timesSpans.end,
                    sun: times.timesSpans.sun,
                    mon: times.timesSpans.mon,
                    tue: times.timesSpans.tue,
                    wed: times.timesSpans.wed,
                    thu: times.timesSpans.thu,
                    fri: times.timesSpans.fri,
                    sat: times.timesSpans.sat,
                    hol1: times.timesSpans.hol1,
                    hol2: times.timesSpans.hol2,
                    hol3: times.timesSpans.hol3
                }
            });
            const codesTimesLocks = await (0, CreateTimesLocks_1.createTimesLocks)(times);
            const timesLocks = await Promise.all(codesTimesLocks.map(async (e) => {
                const timesZonesLocks = await tx.timeZonesLocks.create({
                    data: {
                        code: e.codeZones,
                        id_locks: e.id,
                        id_TimeZones: timesZones.id
                    }
                });
                const timesSpansLocks = await tx.timeSpansLocks.create({
                    data: {
                        code: e.codeSpans,
                        id_locks: e.id,
                        id_TimeSpans: timesSpans.id
                    }
                });
                return { timesZonesLocks, timesSpansLocks };
            }));
            const timesZonesLocks = timesLocks.map((lock) => lock.timesZonesLocks);
            const timesSpansLocks = timesLocks.map((lock) => lock.timesSpansLocks);
            return { timesZones, timesZonesLocks, timesSpans, timesSpansLocks };
        });
        console.log(newTimes);
        return res.json({ newTimes });
    }
    ;
    async read(req, res) {
    }
    ;
    async update(req, res) {
    }
    ;
    async delete(req, res) {
    }
    ;
}
exports.TimesController = TimesController;
//# sourceMappingURL=TimesController.js.map