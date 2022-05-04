import axios from 'axios';
import {API_URL} from '../Backend_URL';

export default async function GetProducts(pageId){
    if(pageId !== undefined){
        return await axios.get(`${API_URL}/products/${parseInt(pageId)}`).then((response) => {return response});
    }
}