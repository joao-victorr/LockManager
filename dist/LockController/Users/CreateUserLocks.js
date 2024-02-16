"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserLock = void 0;
const axios_1 = __importDefault(require("axios"));
const LoginLock_1 = require("../LoginLock");
const apiErrors_1 = require("../../helpers/apiErrors");
//Function to create locks for User
async function createUserLock(data) {
    const allCodeAccessLock = [];
    //Definition of user data for registered
    const users = data.locks.map(e => {
        //Association of the lock ID with the corresponding session
        const unitData = LoginLock_1.allLocksSessions.find(unit => unit.id === e.id);
        if (!unitData) {
            throw new apiErrors_1.BadResquestError("Error in unit association a session");
        }
        const user = {
            name: data.name,
            image: data.image,
            id: unitData.id,
            ip: unitData.ip,
            session: unitData.session
        };
        return user;
    });
    //User registration in each lock
    for (const user of users) {
        const url = `http://${user.ip}/create_objects.fcgi?session=${user.session}`;
        const addUser = await axios_1.default.post(url, {
            object: "users",
            values: [{
                    registration: '',
                    name: user.name,
                    password: ''
                }]
        }, {
            headers: {
                "content-type": "application/json"
            }
        });
        const dataUser = addUser.data;
        const dataUnitCode = { id: user.id, code: dataUser.ids[0] };
        allCodeAccessLock.push(dataUnitCode);
        const urlAddPhoto = `http://${user.ip}/user_set_image.fcgi?user_id=${dataUser.ids[0]}&match=0&timestamp=1624997578&session=${user.session}`;
        const image = user.image;
        await axios_1.default.post(urlAddPhoto, image, {
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        });
    }
    return allCodeAccessLock;
}
exports.createUserLock = createUserLock;
//# sourceMappingURL=CreateUserLocks.js.map