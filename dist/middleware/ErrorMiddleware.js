"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const axios_1 = require("axios");
const ErrorMiddleware = (error, req, res, next) => {
    if (error instanceof axios_1.AxiosError) {
        const statusCode = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data : "Inexpected Server Error";
        return res.status(statusCode).json({ error: message });
    }
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Inexpected Server Error";
    return res.status(statusCode).json({ error: message });
};
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=ErrorMiddleware.js.map