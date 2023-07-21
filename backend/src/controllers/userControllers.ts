import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { conn } from "../server";
import { RowDataPacket } from "mysql2";

export const addUser: RequestHandler = async (req, res) => {
    const { username, passwordUser, checkPassword } = req.body;

    if (!username || !passwordUser || !checkPassword) {
        return res.status(400).json({ message: false, text: "Dados inválidos" });
    }

    if (checkPassword != passwordUser) {
        return res.status(400).json({ message: false, text: "Senhas diferentes" });
    }

    const [userExist] = await conn.query(`SELECT username FROM Users WHERE username = ?`, [username]);

    if (Array.isArray(userExist) && userExist.length > 0) {
        res.status(400).json({ message: false, text: "Usuário existente" });
    }

    const hashBcrypt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passwordUser, hashBcrypt);

    await conn.query(`INSERT INTO Users (username, userPassword) VALUES ('${username}', '${passwordHash}')`);
}

export const createSession: RequestHandler = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: false, text: "Dados inválidos" });
    }

    const [userExist] = await conn.query(`SELECT * FROM Users WHERE username = ?`, [username]) as RowDataPacket[];

    if (!Array.isArray(userExist) || userExist.length === 0) {
        res.status(400).json({ message: false, text: "Usuário não existe" });
    }

    const passwordCheck = await bcrypt.compare(password, userExist[0].password);
    if (!passwordCheck) {
        return res.status(400).json({ message: true, text: "Dados inválidos" })
    }

    const token = {
        username: userExist.username
    }

    const sign = jwt.sign(token, process.env.JWT_TOKEN as string);

    res.cookie("user_token", sign, { httpOnly: true })
        .status(200)
        .json({ route: "/home" });
}