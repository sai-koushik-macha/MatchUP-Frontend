import axios from 'axios';
import {API_URL} from '../Backend_URL';

export default async function GetCartProducts(userId){
    const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token')
    }
    return await axios.get(`${API_URL}/users/cartProducts/${userId}`,{headers: headers}).then((response) => {return response.data})
}