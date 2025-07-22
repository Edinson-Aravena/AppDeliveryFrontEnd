import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Order } from "../entities/Order";

export interface OrderRepository{
    create(order: Order): Promise<ResponseAPIDelivery>;
    getByStatus(status: string): Promise<Order[]>;
}     
