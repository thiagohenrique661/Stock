import express from 'express';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { apiRouter } from '../routes';
import path from "node:path";
import mysql from 'mysql2/promise';

if (process.env.NODE_ENV === 'development') {
    dotenv.config();
    const Variable = [
        "DB_HOST",
        "DB_USER",
        "DB_PASSWORD",
        "DB_NAME",
        "PORT"
    ];

    Variable.forEach((key) => {
        if (!Object.keys(process.env).includes(key)) {
            console.log("Variable not found: " + key);
            process.exit(1);
        }
    })
}


export const conn = mysql.createPool({
    host: process.env["MYSQL_HOST"],
    user: process.env["MYSQL_USER"],
    password: process.env["MYSQL_PASSWORD"],
    database: process.env["MYSQL_DB"],
    charset: "utf8",
    timezone: "utc",
});

const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "webServer")));

app.use(express.json());
app.use("/api", apiRouter);

const connectionDatabase = async () => {

    try {
        const connection = await mysql.createConnection(conn);
        console.log("Connection created");
        return connection;

    } catch (error) {
        console.log("Error creating connection", error);
        process.exit(1);
    }
}

connectionDatabase()
    .then((connection) => {
        app.locals.connectionDatabase = connection;
        app.listen(process.env.PORT);
        console.log("Connected port: " + process.env.PORT);
    });