import { AuthRepositoryImple } from "../../../Data/repositories/AuthRepository";

const { login } = new AuthRepositoryImple();

export const LoginAuthUseCase = async (email: string, password: string) => {
    return await login(email, password);
}