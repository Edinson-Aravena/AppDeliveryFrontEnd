import React from 'react'
import { RemoveUserUseCase } from '../../../../domain/useCases/userLocal/RemoveUserLocal';

export const ProfileInfoViewModel = () => {

    const removeSession = async () =>{
        await RemoveUserUseCase();
    }
    return {
        removeSession,
    }
}

export default ProfileInfoViewModel;