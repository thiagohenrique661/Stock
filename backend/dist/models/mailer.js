"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const transport = nodemailer_1.default.createTransport({
    host: "smtp-mail.outlook.com",
    secure: true,
    auth: {
        user: process.env["USER_NODEMAILER"],
        pass: process.env["PASS_NODEMAILER"],
    }
});
const mailer = nodemailer_1.default.createTransport(transport);
