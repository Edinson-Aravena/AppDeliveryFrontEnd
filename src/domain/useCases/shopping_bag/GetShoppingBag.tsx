import { ShoppingBagRepositoryImpl } from "../../../Data/repositories/ShoppingBagLocalRepository";
import { Product } from "../../entities/Product";

const { getShoppingBag } = new ShoppingBagRepositoryImpl();


export const GetShoppingBagUseCase = async () => {
    return await getShoppingBag();
}
