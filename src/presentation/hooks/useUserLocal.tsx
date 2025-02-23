import React, { useEffect, useState} from 'react'
import { GetUserUseCase } from '../../domain/useCases/userLocal/GetUserLocal'
import { User } from '../../domain/entities/User'

export const useUserLocal = () => {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        getUserSession()
    }, [])

    const getUserSession = async () => {
        const user = await GetUserUseCase()
        setUser(user);
    }
    return {
        user,
        getUserSession
    }
}
