"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const router_1 = require("./router");
const ErrorMiddleware_1 = require("./middleware/ErrorMiddleware");
const apiErrors_1 = require("./helpers/apiErrors");
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
server.use(passport_1.default.initialize());
server.use(router_1.router);
server.use((req, res) => {
    throw new apiErrors_1.BadResquestError("Router Not Found");
});
server.use(ErrorMiddleware_1.ErrorMiddleware);
server.listen(process.env.PORT);
//# sourceMappingURL=server.js.map