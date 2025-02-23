import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";

const {remove} = new UserLocalRepositoryImpl(); 

export const RemoveUserUseCase = async () =>{
    return await remove()
}