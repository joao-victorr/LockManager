"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allLocksSessions = exports.loginLock = void 0;
// import fetch from 'fetch';
const axios_1 = __importDefault(require("axios"));
const PrismaClient_1 = require("../databases/PrismaClient");
const allLocksSessions = [];
exports.allLocksSessions = allLocksSessions;
const loginLock = async () => {
    const units = await PrismaClient_1.prismaClient.locks.findMany();
    units.map(async (e) => {
        const url = `http://${e.ip}/login.fcgi`;
        const res = await axios_1.default.post(url, {
            login: e.users,
            password: e.password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = res.data;
        const newUnits = { id: e.id, ip: e.ip, session: data.session };
        const existingUnitIndex = allLocksSessions.findIndex(unit => unit.id === newUnits.id);
        if (existingUnitIndex === -1) {
            allLocksSessions.push(newUnits);
        }
        else {
            allLocksSessions[existingUnitIndex].session = newUnits.session;
        }
    });
};
exports.loginLock = loginLock;
//# sourceMappingURL=LoginLock.js.map