"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersGroupsController = void 0;
const PrismaClient_1 = require("../databases/PrismaClient");
const apiErrors_1 = require("../helpers/apiErrors");
const CreateUserGroupsLocks_1 = require("../LockController/UsersGroups/CreateUserGroupsLocks");
class UsersGroupsController {
    async create(req, res) {
        if (!req.body.data.id_user || !req.body.data.locks) {
            throw new apiErrors_1.BadResquestError("Data is required");
        }
        ;
        const data = req.body.data;
        const userGroups = await Promise.all(data.locks.map(async (lock) => {
            if (!lock.id_group || !lock.id_lock) {
                throw new apiErrors_1.BadResquestError("id_group and id_locks is required");
            }
            const userGroup = await PrismaClient_1.prismaClient.locks.findUnique({
                where: {
                    id: lock.id_lock
                },
                select: {
                    id: true,
                    GroupsLocks: {
                        where: { id_groups: { equals: lock.id_group } },
                        select: { code: true }
                    },
                    UsersLocks: {
                        where: { id_users: { equals: data.id_user } },
                        select: { code: true }
                    }
                }
            });
            return userGroup;
        }));
        await (0, CreateUserGroupsLocks_1.createUserGroupLocks)(userGroups);
        const newUserGroup = await Promise.all(data.locks.map(async (lock) => {
            const newLock = await PrismaClient_1.prismaClient.usersGroups.create({
                data: {
                    id_locks: lock.id_lock,
                    id_groups: lock.id_group,
                    id_users: data.id_user
                }
            });
            return newLock;
        }));
        return res.json(newUserGroup);
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
exports.UsersGroupsController = UsersGroupsController;
//# sourceMappingURL=UsersGroupsController.js.map