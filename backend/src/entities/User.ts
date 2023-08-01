import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../server";


export interface UserObject{
    email: string,
    name: string,
    password: string,
    checkPassword: string,
}

export class User {
    email: string;
    name: string;
    password: string;
    checkPassword: string;

    constructor (properties: UserObject) {
        this.email = properties.email;
        this.name = properties.name;
        this.password = properties.password;
        this.checkPassword = properties.checkPassword;
    }

    async getUsers(): Promise<RowDataPacket>{
        try {
            const [selectResult] = await connection.query(`SELECT ID FROM users WHERE email =?`, [this.email]) as RowDataPacket[];

            return selectResult;
        } catch (error) {
            throw new Error(`Erro ao obter usuário: ${error}`);
        } 
    }

    async createUser ():Promise<ResultSetHeader>{
        try {
        const [insertResult]: [ResultSetHeader, FieldPacket[]] = await connection.query(`INSERT INTO users(username, email, password)
        VALUES (?,?,?)`, [this.name, this.email, this.password]);
        const userId =  insertResult.insertId;

            return insertResult;
        } catch (error) {
            throw new Error(`Erro ao inserir usuário: ${error}`);
        }
    }


    
}

