import { AddressRepositoryImple } from "../../../Data/repositories/AddressRepository";

const addressRepository = new AddressRepositoryImple();

export const DeleteAddressUseCase = async (id: string) => {
    return await addressRepository.delete(id);
}
