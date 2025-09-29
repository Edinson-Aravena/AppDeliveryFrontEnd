import axios from "axios";

const ApiMercadoPago = axios.create({
    baseURL: 'https://api.mercadopago.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer TEST-6646338381637942-092211-c941d55f58d7a3927f55a0733bd93588-443398336'
    }
})

export {ApiMercadoPago}