import { AuthRepositoryImple } from "../../../Data/repositories/AuthRepository";
import { User } from "../../entities/User";

const {register} = new AuthRepositoryImple()

export const RegisterAuthUseCase = async (user: User) => {
    return await register(user)
}