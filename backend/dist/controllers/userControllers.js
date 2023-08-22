"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserServices_1 = __importDefault(require("../services/UserServices"));
class UserController {
    async createUser(req, res) {
        const userServices = new UserServices_1.default();
        try {
            const { email, name, password, checkPassword } = req.body;
            if (!email || !password || !checkPassword || !name) {
                return res.status(400).json({ message: false, text: "Dados inválidos" });
            }
            if (password !== checkPassword) {
                return res.status(400).json({ message: false, text: "Senhas não coincidem" });
            }
            const inserUser = userServices.createUser(req.body);
            return res.status(200).json({ message: true, text: "Usuário inserido" });
        }
        catch (error) {
            return res.status(400).json({ message: false, text: "Não foi possível cadastrar" });
        }
    }
    async authenticateUser(req, res) {
        const userServices = new UserServices_1.default();
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: false, text: "Dados inválidos" });
            }
            const token = await userServices.authenticateUser(req.body);
            if (token) {
                return res.status(200).json({ message: true, text: "Logado com sucesso!", token });
            }
            else {
                return res.status(401).json({ message: false, text: "Não foi possível logar" });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(400).json({ message: false, text: "Não foi possível logar" });
        }
    }
}
exports.default = UserController;
