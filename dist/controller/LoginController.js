"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const PrismaClient_1 = require("../databases/PrismaClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const PassportMiddleware_1 = require("../middleware/PassportMiddleware");
const LoginLock_1 = require("../LockController/LoginLock");
const apiErrors_1 = require("../helpers/apiErrors");
class LoginController {
    async login(req, res) {
        if (!req.body.email && !req.body.password) {
            throw new apiErrors_1.BadResquestError("Data Not Found");
        }
        const dataUser = {
            email: req.body.email,
            password: req.body.password
        };
        const user = await PrismaClient_1.prismaClient.usersWeb.findUnique({ where: { email: dataUser.email } });
        if (!user) {
            throw new apiErrors_1.UnauthorazedError("Email or password not found");
        }
        const passwordHash = user.password;
        const varifyPassword = await bcrypt_1.default.compare(dataUser.password, passwordHash);
        if (!varifyPassword) {
            throw new apiErrors_1.UnauthorazedError("Email or password not found");
        }
        await (0, LoginLock_1.loginLock)();
        const token = (0, PassportMiddleware_1.generateToken)(user.id);
        return res.status(200).json({ success: true, token: token });
    }
    ;
}
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map