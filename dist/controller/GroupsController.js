"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsController = void 0;
const PrismaClient_1 = require("../databases/PrismaClient");
const apiErrors_1 = require("../helpers/apiErrors");
const CreateGroupsLocks_1 = require("../LockController/Groups/CreateGroupsLocks");
// import { deletDataLock } from '../LockController/Groups/DeleteGroupsLocks';
class GroupsController {
    async create(req, res) {
        if (!req.body.name || !req.body.locks) {
            throw new apiErrors_1.BadResquestError("Data Not Found");
        }
        const group = {
            name: req.body.name,
            locks: req.body.locks
        };
        const codeAllGroupsLocks = await (0, CreateGroupsLocks_1.createGroupLocks)(group);
        const newGroup = await PrismaClient_1.prismaClient.$transaction(async (tx) => {
            const newGroup = await tx.groups.create({
                data: {
                    name: group.name
                },
            });
            const newGroupLock = await Promise.all(codeAllGroupsLocks.map(async (e) => {
                const GroupsLock = await tx.groupsLocks.create({
                    data: {
                        code: e.code,
                        id_groups: newGroup.id,
                        id_locks: e.id
                    }
                });
                return GroupsLock;
            }));
            return { newGroup, newGroupLock };
        });
        return res.status(201).json({ department: newGroup });
    }
    ;
    async read(req, res) {
        const group = {
            id: req.query.id,
            name: req.query.name
        };
        if (group.id) {
            const dataDepartment = await PrismaClient_1.prismaClient.groups.findUnique({
                where: { id: group.id },
                include: {
                    GroupsLocks: {
                        select: {
                            id_lock: true,
                            code: true,
                            locks: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
            return res.status(200).json({ department: dataDepartment });
        }
        if (group.name) {
            const dataDepartment = await PrismaClient_1.prismaClient.groups.findMany({
                where: { id: group.id },
                include: {
                    GroupsLocks: {
                        select: {
                            id_lock: true,
                            code: true,
                            lock: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
            return res.status(200).json({ department: dataDepartment });
        }
        const dataDepartment = await PrismaClient_1.prismaClient.groups.findMany({
            include: {
                GroupsLocks: {
                    select: {
                        id: true,
                        code: true,
                        locks: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).json({ groups: dataDepartment });
    }
    ;
    async update(req, res) {
    }
    ;
    async delete(req, res) {
        // const id = req.body.id as string;
        // if(!id) {
        //   throw new BadResquestError("id is required")
        // }
        // const dataDepartment = await prismaClient.department.findUnique({
        //   where: {id},
        //   select: {
        //     id: true,
        //     DepartmentLock: {
        //       select: {
        //         code: true,
        //         id_lock: true
        //       }
        //     }
        //   }
        // })
        // if(!dataDepartment) {
        //   throw new BadResquestError("Department is required")
        // }
        // await prismaClient.$transaction(async (tx: any) => {
        //   await tx.departmentLock.deleteMany({
        //     where: {
        //       id_department: {
        //         equals: dataDepartment.id
        //       }
        //     }
        //   })
        //   await deletDataLock(dataDepartment)
        //   await tx.department.delete({
        //     where: {
        //       id: dataDepartment.id
        //     }
        //   })
        // })
        // return res.status(200).json({seccess: true})
    }
    ;
}
exports.GroupsController = GroupsController;
//# sourceMappingURL=GroupsController.js.map