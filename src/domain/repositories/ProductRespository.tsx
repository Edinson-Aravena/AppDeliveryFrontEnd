import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Product } from '../entities/Product';
import * as ImagePicker from 'expo-image-picker';


export interface ProductRepository {
    create(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseAPIDelivery>;
    getProductsByCategory(idCategory: string): Promise<Product[]>;
    remove(product: Product): Promise<ResponseAPIDelivery>;
    updateWithImage(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseAPIDelivery>;
    update(product: Product): Promise<ResponseAPIDelivery>;
}