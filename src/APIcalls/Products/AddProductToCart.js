import axios from 'axios';
import {API_URL} from '../Backend_URL';

export default async function AddProductToCart(productId,quantity,userId){
    if(!productId || !userId){
        console.log(userId);
        console.log(productId);
        return ({status:422, msg: "Invalid Id(s)"});
    }
    if(quantity == 0 || quantity == null || quantity == undefined){
        return ({status:422, msg: "Invalid Quantity value"});
    }
    const Quantity = {
        "quantity" : quantity
    }
    const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token')
    }
    return await axios.post(`${API_URL}/users/cartProducts/${userId}/${productId}`,Quantity,{headers: headers}).then(response => {return response});
}