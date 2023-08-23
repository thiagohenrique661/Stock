"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserServices {
    async createUser(properties) {
        const { password } = properties; // Extrair a senha do objeto de propriedades
        try {
            const userEntity = new User_1.User(properties);
            const userExists = await userEntity.getUsers();
            if (!userExists || userExists.length === 0) {
                const saltRounds = await bcrypt_1.default.genSalt(10);
                const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
                const passwordHashed = { password: passwordHash };
                const insertUser = await userEntity.createUser(passwordHash);
                return insertUser;
            }
            if (userExists && userExists.length > 0) {
                throw new Error(`Usuário já cadastrado`);
            }
        }
        catch (error) {
            throw new Error(`Erro ao obter dados do usuário: ${error}`);
        }
    }
    async authenticateUser(properties) {
        const { email, password } = properties;
        try {
            const userEntity = new User_1.User(properties);
            const userExists = await userEntity.getUser();
            if (userExists && userExists.length > 0) {
                const user = userExists[0];
                const passwordHash = await bcrypt_1.default.compare(password, user.userPassword);
                if (passwordHash) {
                    const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'secret', { expiresIn: '1d' });
                    return { token, userId: user.id }; // Retorna o token e userId
                }
                else {
                    throw new Error(`Senha incorreta`);
                }
            }
            else {
                throw new Error(`Usuário não encontrado`); // Trate o caso em que o usuário não é encontrado
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(`Erro ao autenticar usuário`);
        }
    }
}
exports.default = UserServices;
