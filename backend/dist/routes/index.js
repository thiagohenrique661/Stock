"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.post('/add/user', userControllers_1.addUser);
exports.apiRouter.post('/login', userControllers_1.createSession);
