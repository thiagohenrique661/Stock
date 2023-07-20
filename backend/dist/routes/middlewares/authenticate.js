"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const authenticated = req.cookies["authenticated"];
    let verifyToken;
    if (!authenticated) {
        return res.status(401).json({ status: "Invalid credentials", route: "/" });
    }
    const token = process.env.JWT_TOKEN;
    try {
        verifyToken = jsonwebtoken_1.default.verify(String(authenticated), token);
        req.usernameAdmin = verifyToken["usernameParent"];
    }
    catch (error) {
        return res.status(422).json({ status: "Invalid credentials", route: "/" });
    }
    next();
};
exports.authenticate = authenticate;
