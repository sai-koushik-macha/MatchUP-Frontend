import axios from 'axios';
import {API_URL} from '../Backend_URL';

export default async function RemoveFromCart(productId,userId){
    try {
        console.log(productId + "  " + userId);
        return await axios({
            method: "delete",
            url:`${API_URL}/users/cartProducts/${userId}/${productId}`,
            headers: {'x-auth-token': sessionStorage.getItem('token') },
        })
        .then(response => {return response});
    } catch (error) {
        return ({status: 404, msg: error.message});
    }
} 