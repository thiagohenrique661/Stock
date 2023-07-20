import mysql from "mysql2/promise";
import { conn } from "../server";

const CollabSchema = `
CREATE TABLE IF NOT EXISTS User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  userParent VARCHAR(255) NOT NULL,
  perm_registro BOOLEAN NOT NULL,
  passwordResetToken VARCHAR(255),
  passwordResetExpires DATE
);
`;

conn.query(CollabSchema).then(() => {
  console.log(`CREATE TABLE COLLAB`);
}).catch((error) => {
  console.log(`ERROR creating COLLAB`, error);
});

export default conn;
