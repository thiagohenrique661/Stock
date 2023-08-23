"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const authenticate_1 = __importDefault(require("./middlewares/authenticate"));
exports.apiRouter = express_1.default.Router();
exports.apiRouter.post('/create/user', new userControllers_1.default().createUser);
exports.apiRouter.post('/login', new userControllers_1.default().authenticateUser);
exports.apiRouter.get('/users', authenticate_1.default, new userControllers_1.default().index);
exports.default = exports.apiRouter;
