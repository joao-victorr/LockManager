"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocksController = void 0;
const PrismaClient_1 = require("../databases/PrismaClient");
const apiErrors_1 = require("../helpers/apiErrors");
class LocksController {
    async create(req, res) {
        if (!req.body.name || !req.body.ip || !req.body.user || !req.body.password) {
            throw new apiErrors_1.BadResquestError("Data not found");
        }
        const lock = {
            name: req.body.name.toUpperCase(),
            ip: req.body.ip,
            user: req.body.user,
            password: req.body.password
        };
        const newLock = await PrismaClient_1.prismaClient.locks.create({
            data: {
                name: lock.name,
                ip: lock.ip,
                users: lock.user,
                password: lock.password
            }
        });
        return res.status(201).json({ successe: newLock });
    }
    ;
    async read(req, res) {
        const lockId = req.query.id;
        if (lockId) {
            const dataLock = await PrismaClient_1.prismaClient.locks.findUnique({
                where: { id: lockId },
                select: {
                    id: true,
                    name: true,
                    ip: true,
                    GroupsLocks: {
                        select: {
                            id: true,
                            code: true,
                            groups: true
                        }
                    },
                    UsersLocks: {
                        select: {
                            id: true,
                            code: true,
                            users: true
                        }
                    }
                }
            });
            return res.status(200).json({ Lock: dataLock });
        }
        const dataLock = await PrismaClient_1.prismaClient.locks.findMany({
            select: {
                id: true,
                name: true,
                ip: true,
                GroupsLocks: {
                    select: {
                        id: true,
                        code: true,
                        groups: true
                    }
                },
                UsersLocks: {
                    select: {
                        id: true,
                        code: true,
                        users: true
                    }
                }
            }
        });
        return res.status(200).json({ Locks: dataLock });
    }
    ;
    async update(req, res) {
    }
    ;
    async delete(req, res) {
        const lockId = req.body.id;
        if (!lockId) {
            throw new apiErrors_1.BadResquestError("Id is required");
        }
        const countAccessLock = await PrismaClient_1.prismaClient.usersLocks.count({
            where: {
                id_locks: lockId
            }
        });
        const countDepartmentLock = await PrismaClient_1.prismaClient.groupsLocks.count({
            where: {
                id_locks: lockId
            }
        });
        if (countAccessLock !== 0) {
            throw new apiErrors_1.BadResquestError("unit contains registered access.");
        }
        if (countDepartmentLock !== 0) {
            throw new apiErrors_1.BadResquestError("unit contains registered access.");
        }
        if (countDepartmentLock === 0 && countAccessLock === 0) {
            await PrismaClient_1.prismaClient.locks.delete({ where: { id: lockId } });
            return res.status(200).json({ success: true });
        }
    }
    ;
}
exports.LocksController = LocksController;
//# sourceMappingURL=LocksController.js.map