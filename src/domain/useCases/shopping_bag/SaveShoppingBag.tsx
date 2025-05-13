import { ShoppingBagRepositoryImpl } from "../../../Data/repositories/ShoppingBagLocalRepository";
import { Product } from "../../entities/Product";

const {save} = new ShoppingBagRepositoryImpl();

export const SaveShoppingBagUseCase = async (products: Product[]) => {
    return save(products);
}