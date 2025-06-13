import React from 'react'
import { AddressRepositoryImple } from '../../../Data/repositories/AddressRepository'
import { Address } from '../../entities/Address';
const {create} = new AddressRepositoryImple();

export const CreateAddressUseCase = async (address: Address) => {
    return await create(address)
}

