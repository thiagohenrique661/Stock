import { User, UserObject } from "../entities/User";
import bcrypt from "bcrypt";

export default class UserServices {
  async createUser(properties: UserObject) {
    const { password } = properties; // Extrair a senha do objeto de propriedades

    try {
      const userEntity = new User(properties);
      const userExists = await userEntity.getUsers();

      if (!userExists || userExists.length === 0) {
        const saltRounds = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Atualizar a senha no objeto de propriedades antes de criar o usuário
        const passwordHashed = { password: passwordHash };

        const insertUser = await userEntity.createUser(passwordHash); // Passar a senha criptografada diretamente
        return insertUser;
      }

      if (userExists && userExists.length > 0) {
        throw new Error(`Usuário já cadastrado`);
      }
    } catch (error) {
      throw new Error(`Erro ao obter dados do usuário: ${error}`);
    }
  }
}