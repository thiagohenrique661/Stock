import mysql from "mysql2/promise";
import { conn } from "../server";

const userSchema = `
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  userPassword VARCHAR(255) NOT NULL,
  passwordResetToken VARCHAR(255),
  passwordResetExpires DATE);
`;

conn.query(userSchema).then(() => {
  console.log(`CREATE TABLE Users`);
}).catch((error) => {
  console.log(`ERROR creating Users`, error);
});

export default conn;
