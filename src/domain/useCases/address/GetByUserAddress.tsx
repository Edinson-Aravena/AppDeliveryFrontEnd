import React from 'react'
import { AddressRepositoryImple } from '../../../Data/repositories/AddressRepository';
const { getByUser } = new AddressRepositoryImple();


export const GetByUserAddressUseCase = async (idUser: string) => {
    return  await getByUser(idUser);
}
