"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcccessRulesController = void 0;
const PrismaClient_1 = require("../databases/PrismaClient");
const apiErrors_1 = require("../helpers/apiErrors");
const CreateAccessRules_1 = require("../LockController/AccessRules/CreateAccessRules");
class AcccessRulesController {
    async create(req, res) {
        if (!req.body.id_groups || !req.body.id_TimeZones || !req.body.locks) {
            throw new apiErrors_1.BadResquestError("Data is required");
        }
        const accessRules = {
            id_groups: req.body.id_groups,
            id_TimeZones: req.body.id_TimeZones,
            locks: req.body.locks
        };
        const dataAccessRules = await Promise.all(accessRules.locks.map(async (lock) => {
            const locks = await PrismaClient_1.prismaClient.locks.findUnique({
                where: { id: lock.id },
                select: {
                    id: true,
                    GroupsLocks: {
                        where: {
                            id_groups: { equals: accessRules.id_groups }
                        },
                        select: { code: true }
                    },
                    TimeZonesLocks: {
                        where: {
                            id_TimeZones: { equals: accessRules.id_TimeZones }
                        },
                        select: { code: true }
                    }
                }
            });
            return locks;
        }));
        const dataUnitsCodes = await (0, CreateAccessRules_1.createAccessRulesLocks)(dataAccessRules);
        const newAccessRules = await Promise.all(dataUnitsCodes.map(async (unitCode) => {
            const newAccessRules = await PrismaClient_1.prismaClient.acccessRules.create({
                data: {
                    code: unitCode.code,
                    id_locks: unitCode.id,
                    id_groups: accessRules.id_groups,
                    id_TimeZones: accessRules.id_TimeZones
                }
            });
            return newAccessRules;
        }));
        return res.json({ newAccessRules });
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
exports.AcccessRulesController = AcccessRulesController;
//# sourceMappingURL=AcccessRulesController.js.map