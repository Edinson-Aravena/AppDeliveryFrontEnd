import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getOrderByClient } = new OrderRepositoryImpl();

export const GetOrderByClient = async (idClient: string) => {

    return await getOrderByClient(idClient);

};