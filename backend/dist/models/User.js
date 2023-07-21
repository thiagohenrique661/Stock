"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const userSchema = `
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  userPassword VARCHAR(255) NOT NULL,
  passwordResetToken VARCHAR(255),
  passwordResetExpires DATE);
`;
server_1.conn.query(userSchema).then(() => {
    console.log(`CREATE TABLE Users`);
}).catch((error) => {
    console.log(`ERROR creating Users`, error);
});
exports.default = server_1.conn;
