"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.sendStatus(403);
    }
    const token = authorization.replace('Bearer', '').trim();
    try {
        const data = jsonwebtoken_1.default.verify(token, 'secret');
        const { userId } = data;
        req.userId = userId;
        return next();
    }
    catch {
        return res.sendStatus(403);
    }
}
exports.default = authenticate;
