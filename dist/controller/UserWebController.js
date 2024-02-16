"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWebController = void 0;
const PrismaClient_1 = require("../databases/PrismaClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiErrors_1 = require("../helpers/apiErrors");
const PassportMiddleware_1 = require("../middleware/PassportMiddleware");
class UserWebController {
    async create(req, res) {
        const user = {
            name: req.body.name,
            email: req.body.email.toLowerCase().trim(),
            password: req.body.password.trim()
        };
        if (!user.email || !user.password || !user.name) {
            throw new apiErrors_1.BadResquestError("Data is required");
        }
        const varifyEmail = await PrismaClient_1.prismaClient.usersWeb.findUnique({ where: { email: user.email } });
        if (varifyEmail) {
            throw new apiErrors_1.BadResquestError(("Email exist"));
        }
        user.password = await bcrypt_1.default.hash(user.password, 10);
        const newUser = await PrismaClient_1.prismaClient.usersWeb.create({
            data: {
                email: user.email,
                name: user.name,
                password: user.password,
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        const token = (0, PassportMiddleware_1.generateToken)(newUser.id);
        return res.status(201).json({ newUser, token });
    }
    ;
    async read(req, res) {
        const dataUser = {
            id: req.query.id,
            name: req.query.name,
            email: req.query.email,
        };
        if (dataUser.id) {
            const user = await PrismaClient_1.prismaClient.usersWeb.findUnique({
                where: { id: dataUser.id },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return res.json({ user });
        }
        if (dataUser.email) {
            const user = await PrismaClient_1.prismaClient.usersWeb.findUnique({
                where: { email: dataUser.email.toLowerCase().trim() },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return res.json({ user });
        }
        if (dataUser.name) {
            const users = await PrismaClient_1.prismaClient.usersWeb.findMany({
                where: {
                    name: {
                        contains: dataUser.name
                    }
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return res.json({ users });
        }
        const users = await PrismaClient_1.prismaClient.usersWeb.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        return res.json({ users });
    }
    ;
    async update(req, res) {
        //   const userId = req.body.id as string;
        //   const { newName, newEmail, newPassword } = req.body;
        // try {
        //   const existingUser = await prismaClient.users.findUnique({
        //     where: { id: userId },
        //   });
        //   if (!existingUser) {
        //     return res.status(404).json({ error: 'Usuário não encontrado' });
        //   }
        //   const updatedUser = await prismaClient.users.update({
        //     where: { id: userId },
        //     data: {
        //       name: newName || existingUser.name,
        //       email: newEmail || existingUser.email,
        //       password: newPassword || existingUser.password,
        //     },
        //   });
        //   return res.json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
        // } catch (error) {
        //   console.error(error);
        //   return res.status(500).json({ error: 'Erro interno do servidor' });
        // }
    }
    ;
    async delete(req, res) {
        const id = req.body.id;
        try {
            const user = await PrismaClient_1.prismaClient.usersWeb.delete({
                where: { id },
            });
            return res.json({ success: true });
        }
        catch (err) {
            if (err.code == 'P2025') {
                return res.json({ "Error": "Registro não encontrado" });
            }
        }
    }
    ;
}
exports.UserWebController = UserWebController;
//# sourceMappingURL=UserWebController.js.map