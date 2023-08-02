"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserServices {
    async createUser(properties) {
        const { password } = properties; // Extrair a senha do objeto de propriedades
        try {
            const userEntity = new User_1.User(properties);
            const userExists = await userEntity.getUsers();
            if (!userExists || userExists.length === 0) {
                const saltRounds = await bcrypt_1.default.genSalt(10);
                const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
                // Atualizar a senha no objeto de propriedades antes de criar o usuário
                const passwordHashed = { password: passwordHash };
                const insertUser = await userEntity.createUser(passwordHash); // Passar a senha criptografada diretamente
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
}
exports.default = UserServices;
