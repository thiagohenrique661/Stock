"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const authenticate = (req, res, next) => {
    const authenticated = req.cookies["authenticated"];
    let verifyToken;
};
exports.authenticate = authenticate;
