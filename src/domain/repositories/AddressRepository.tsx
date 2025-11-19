import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Address } from "../entities/Address";
import * as ImagePicker from 'expo-image-picker';

export interface AddressRepository {
    create(address: Address): Promise<ResponseAPIDelivery>;
    delete(id: string): Promise<ResponseAPIDelivery>;
    getByUser(userId: string): Promise<Address[]>;
}