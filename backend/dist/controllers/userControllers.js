"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = exports.addUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const server_1 = require("../server");
const addUser = async (req, res) => {
    const { username, passwordUser, checkPassword } = req.body;
    if (!username || !passwordUser || !checkPassword) {
        return res.status(400).json({ message: false, text: "Dados inválidos" });
    }
    if (checkPassword != passwordUser) {
        return res.status(400).json({ message: false, text: "Senhas diferentes" });
    }
    const [userExist] = await server_1.conn.query(`SELECT username FROM Users WHERE username = ?`, [username]);
    if (Array.isArray(userExist) && userExist.length > 0) {
        res.status(400).json({ message: false, text: "Usuário existente" });
    }
    const hashBcrypt = await bcrypt_1.default.genSalt(10);
    const passwordHash = await bcrypt_1.default.hash(passwordUser, hashBcrypt);
    await server_1.conn.query(`INSERT INTO Users (username, userPassword) VALUES ('${username}', '${passwordHash}')`);
};
exports.addUser = addUser;
const createSession = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: false, text: "Dados inválidos" });
    }
    const [userExist] = await server_1.conn.query(`SELECT * FROM Users WHERE username = ?`, [username]);
    if (!Array.isArray(userExist) || userExist.length === 0) {
        res.status(400).json({ message: false, text: "Usuário não existe" });
    }
    const passwordCheck = await bcrypt_1.default.compare(password, userExist[0].password);
    if (!passwordCheck) {
        return res.status(400).json({ message: true, text: "Dados inválidos" });
    }
    const token = {
        username: userExist.username
    };
    const sign = jsonwebtoken_1.default.sign(token, process.env.JWT_TOKEN);
    res.cookie("user_token", sign, { httpOnly: true })
        .status(200)
        .json({ route: "/home" });
};
exports.createSession = createSession;
