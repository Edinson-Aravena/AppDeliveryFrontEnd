import { AuthRepositoryImple } from "../../../Data/repositories/AuthRepository";
import { User } from "../../entities/User";
import * as ImagePicker from 'expo-image-picker';

const {registerWithImage} = new AuthRepositoryImple()

export const RegisterWithImageAuthUseCase = async (user: User, file:ImagePicker.ImagePickerAsset) => {
    return await registerWithImage(user, file)
}