"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const server_1 = require("../server");
class User {
    constructor(properties) {
        this.email = properties.email;
        this.name = properties.name;
        this.password = properties.password;
        this.checkPassword = properties.checkPassword;
    }
    async getUsers() {
        try {
            const [selectResult] = await server_1.connection.query(`SELECT ID FROM users WHERE email =?`, [this.email]);
            return selectResult;
        }
        catch (error) {
            throw new Error(`Erro ao obter usuário: ${error}`);
        }
    }
    async getUser() {
        try {
            const [selectResult] = await server_1.connection.query(`
            SELECT email, userPassword FROM users WHERE email =? `, [this.email]);
            return selectResult;
        }
        catch (error) {
            throw new Error(`Erro ao obter dados: ${error}`);
        }
    }
    async createUser(passwordHash) {
        try {
            const [insertResult] = await server_1.connection.query(`
        INSERT INTO users(username, 
            email, 
            userPassword)
        VALUES (?,?,?)`, [this.name, this.email, passwordHash]);
            const userId = insertResult.insertId;
            return insertResult;
        }
        catch (error) {
            throw new Error(`Erro ao inserir usuário: ${error}`);
        }
    }
}
exports.User = User;
