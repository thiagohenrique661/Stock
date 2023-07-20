"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const CollabSchema = `
CREATE TABLE IF NOT EXISTS collab (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  userParent VARCHAR(255) NOT NULL,
  perm_registro BOOLEAN NOT NULL,
  passwordResetToken VARCHAR(255),
  passwordResetExpires DATE
);
`;
server_1.conn.query(CollabSchema).then(() => {
    console.log(`CREATE TABLE COLLAB`);
}).catch((error) => {
    console.log(`ERROR creating COLLAB`, error);
});
exports.default = server_1.conn;
