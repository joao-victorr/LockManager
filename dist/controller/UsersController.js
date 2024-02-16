"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const PrismaClient_1 = require("../databases/PrismaClient");
const CreateUserLocks_1 = require("../LockController/Users/CreateUserLocks");
const apiErrors_1 = require("../helpers/apiErrors");
class UsersController {
    async create(req, res) {
        if (!req.file || !req.body.data) {
            throw new apiErrors_1.BadResquestError("Data Not Found");
        }
        const bodyJson = JSON.parse(req.body.data);
        const User = {
            name: bodyJson.name.toUpperCase(),
            image: req.file.buffer,
            locks: bodyJson.locks
        };
        const newUser = await PrismaClient_1.prismaClient.$transaction(async (tx) => {
            const user = await tx.users.create({
                data: {
                    name: User.name,
                    image: User.image
                }
            });
            const codeAllAccessLock = await (0, CreateUserLocks_1.createUserLock)(User);
            const userLocks = await Promise.all(codeAllAccessLock.map(async (e) => {
                const newUsersLock = await tx.usersLocks.create({
                    data: {
                        code: e.code,
                        id_users: user.id,
                        id_locks: e.id,
                    }
                });
                return newUsersLock;
            }));
            return { user, userLocks };
        });
        res.status(201).json({ data: newUser });
    }
    async read(req, res) {
        const user = {
            id: req.query.id,
            name: req.query.name,
        };
        if (user.id) {
            const DataUser = await PrismaClient_1.prismaClient.users.findUnique({
                where: {
                    id: user.id
                },
                select: {
                    id: true,
                    name: true,
                    UsersLocks: {
                        select: {
                            id_locks: true,
                            code: true,
                        },
                    },
                },
            });
            return res.json({ DataUser });
        }
        if (user.name) {
            const dataUsers = await PrismaClient_1.prismaClient.users.findMany({
                where: {
                    name: {
                        contains: user.name
                    }
                },
                select: {
                    id: true,
                    name: true,
                    UsersLocks: {
                        select: {
                            id_locks: true,
                            code: true,
                        },
                    },
                },
            });
            return res.json({ dataUsers });
        }
        const allUsers = await PrismaClient_1.prismaClient.users.findMany({
            select: {
                id: true,
                name: true,
                UsersLocks: {
                    select: {
                        id_locks: true,
                        code: true,
                    },
                },
            },
        });
        return res.json({ allUsers });
    }
    ;
    async update(req, res) {
    }
    ;
    async delete(req, res) {
        // const user: DeletData = {
        //   id: req.body.id,
        //   unidade: req.body.unidade
        // }
        // const datauser = await prismaClient.user.findUnique({
        //   where: {id: user.id},
        //   select: {
        //     id: true,
        //     userLock: {
        //       where: {
        //         id_lock: user.unidade[0].id
        //       }
        //     }
        //   }
        // })
        // res.json({datauser})
        // deletuserLock(datauser);
        // if (datauser.id) {
        //   const delet = await prismaClient.user.delete({where: {id: dataAccess.id}});
        //   return res.json({ delete: "Success"});
        // }
    }
    ;
}
exports.UsersController = UsersController;
//# sourceMappingURL=UsersController.js.map