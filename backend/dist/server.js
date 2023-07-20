"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = void 0;
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./routes");
const node_path_1 = __importDefault(require("node:path"));
const promise_1 = __importDefault(require("mysql2/promise"));
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
    });
}
exports.conn = promise_1.default.createPool({
    host: process.env["MYSQL_HOST"],
    user: process.env["MYSQL_USER"],
    password: process.env["MYSQL_PASSWORD"],
    database: process.env["MYSQL_DB"],
    charset: "utf8",
    timezone: "utc",
});
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(node_path_1.default.join(__dirname, "webServer")));
app.use(express_1.default.json());
app.use("/api", routes_1.apiRouter);
const connectionDatabase = async () => {
    try {
        const connection = await promise_1.default.createConnection(exports.conn);
        console.log("Connection created");
        return connection;
    }
    catch (error) {
        console.log("Error creating connection", error);
        process.exit(1);
    }
};
connectionDatabase()
    .then((connection) => {
    app.locals.connectionDatabase = connection;
    app.listen(process.env.PORT);
    console.log("Connected port: " + process.env.PORT);
});
console.log(connectionDatabase);
