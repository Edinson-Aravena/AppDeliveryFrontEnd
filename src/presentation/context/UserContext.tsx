import { createContext, useEffect, useState } from "react";
import { User } from "../../domain/entities/User";
import {SaveUserUseCase} from "../../domain/useCases/userLocal/SaveUserLocal";
import { GetUserUseCase } from "../../domain/useCases/userLocal/GetUserLocal";
import { RemoveUserUseCase } from "../../domain/useCases/userLocal/RemoveUserLocal";

export const userInitialState: User = {
    id: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',
    image: '',
    password: '',
    repeatPassword: '',
    session_token: '',
    roles: [],
}

export interface UserContextProps {
    user: User;
    saveUserSession: (user: User) => Promise<void>;
    getUserSession: () => Promise<void>;
    removeUserSession: () => Promise<void>;
}

export const UserContext = createContext( {} as UserContextProps);

export const UserProvider = ({ children }: any) => {

    const [user, setUser] = useState(userInitialState);

    useEffect(() => {
        getUserSession();
    }, [])
    

    const saveUserSession = async (user: User) => {
        await SaveUserUseCase(user);
        setUser(user);
    }

    const getUserSession = async () => {
        const user = await GetUserUseCase();
        setUser(user);
    }

    const removeUserSession = async () => {
        await RemoveUserUseCase();
        setUser(userInitialState);
    }


    return (
        <UserContext.Provider value={{
            user,
            saveUserSession,
            getUserSession,
            removeUserSession
        }}>
            {children}
        </UserContext.Provider>
    )
}