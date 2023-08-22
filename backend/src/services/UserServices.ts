import { User, UserObject } from "../entities/User";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

export default class UserServices {
  async createUser(properties: UserObject) {
    const { password } = properties; // Extrair a senha do objeto de propriedades

    try {
      const userEntity = new User(properties);
      const userExists = await userEntity.getUsers();

      if (!userExists || userExists.length === 0) {
        const saltRounds = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, saltRounds);

        
        const passwordHashed = { password: passwordHash };

        const insertUser = await userEntity.createUser(passwordHash); 
        return insertUser;
      }

      if (userExists && userExists.length > 0) {
        throw new Error(`Usuário já cadastrado`);
      }
    } catch (error) {
      throw new Error(`Erro ao obter dados do usuário: ${error}`);
    }
  }

  async authenticateUser(properties: UserObject) {
  
    const { email, password } = properties;
    
    try {
      const userEntity = new User(properties);
      const userExists = await userEntity.getUser();
    
      if (userExists && userExists.length > 0) {
        const user = userExists[0];
        

        const passwordHash = await bcrypt.compare(password, user.userPassword);

        if(passwordHash) {
          const token = jwt.sign({userId: user.id}, 'secret', {expiresIn: '1h'});
  
          return token;

        } else{
          throw new Error(`Senha incorreta`);
        }
        

      }
    } catch (error) {
      
    }
  
  }
  
}