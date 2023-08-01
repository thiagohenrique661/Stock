import { User, UserObject } from "../entities/User"

export default class  UserServices {

    async createUser(properties: UserObject){
        const userEntity = new User(properties);
        try {
            const userExists = await userEntity.getUsers();
            if(!userExists || userExists.length === 0) {
                const insertUser = await userEntity.createUser();
                return insertUser;
            }
            if (userExists && userExists.length > 0){
                
                throw new Error(`Usuário já cadastrado`);
            }
            
        } catch (error) {
            throw new Error(`Erro ao obter dados do usuário: ${error}`);    
        }
    }
}