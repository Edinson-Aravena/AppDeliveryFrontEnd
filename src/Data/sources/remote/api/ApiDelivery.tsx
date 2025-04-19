import axios from 'axios'
import { User } from '../../../../domain/entities/User'
import { LocalStorage } from '../../local/LocalStorage'


const ApiDelivery = axios.create({
    baseURL: 'http://192.168.226.58:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

const ApiDeliveryForImage = axios.create({
    baseURL: 'http://192.168.226.58:3000/api',
    headers: {
        'Content-Type': 'multipart/form-data',
        'accept':'application/json'
    }
})

//INTERCEPTORS
ApiDelivery.interceptors.request.use(
    async(config) => {
        const data = await LocalStorage().getItem('user')
        if(data){
            const user: User = JSON.parse(data);
            config.headers!['Authorization'] = user.session_token!;
        }
        return config
    }
)

ApiDeliveryForImage.interceptors.request.use(
    async(config) => {
        const data = await LocalStorage().getItem('user')
        if(data){
            const user: User = JSON.parse(data);
            config.headers!['Authorization'] = user.session_token!;
        }
        return config
    }
)
export {ApiDelivery, ApiDeliveryForImage}
