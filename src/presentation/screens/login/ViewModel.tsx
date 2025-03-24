import React, { useContext, useEffect, useState } from 'react'
import { LoginAuthUseCase } from '../../../domain/useCases/auth/LoginAuth';
import { SaveUserUseCase } from '../../../domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
import { UserContext } from '../../context/UserContext';

const LoginViewModel = () => {

    const [errorMessage, setErrorMessage] = useState("")

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    //const {user, getUserSession} = useUserLocal();
    const {user, saveUserSession} = useContext(UserContext);
    
    console.log("User session:", JSON.stringify(user))

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    
    const login = async () => {
        if (isValidForm()) {
            const response = await (LoginAuthUseCase(values.email, values.password));

            console.log("Response:" + JSON.stringify(response))
            if(!response.success){
                setErrorMessage(response.message)
            }else{
                saveUserSession(response.data);
            }
        }
    }

    const isValidForm = (): boolean => {

        if (values.email === "") {
            setErrorMessage("Ingrese el email")
        }
        if (values.password === "") {
            setErrorMessage("Ingrese la contraseña")
        }
        return true;
    }
    return {
        ...values,
        onChange,
        errorMessage,
        login,
        user
    }
}

export default LoginViewModel;