import React, { useContext } from 'react'
import { RemoveUserUseCase } from '../../../../domain/useCases/userLocal/RemoveUserLocal';
import { UserContext } from '../../../context/UserContext';

export const ProfileInfoViewModel = () => {

    //const {user} = useUserLocal()
    const {user, removeUserSession} = useContext(UserContext)

    
    return {
        removeUserSession,
        user,
    }
}

export default ProfileInfoViewModel;