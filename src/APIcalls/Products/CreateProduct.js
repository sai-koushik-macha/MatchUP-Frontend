import axios from 'axios';
import { mockImgProduct } from '../../utils/mockImages';
import {API_URL} from '../Backend_URL';

export default async function CreateProduct(productAvailable,productname,price,image){
    let bodyFormData = new FormData();
    bodyFormData.append('name', productname);
    bodyFormData.append('price', price);
    bodyFormData.append('available',productAvailable);
    bodyFormData.append('file', image);
    
    return await axios({
        method: "post",
        url:`${API_URL}/products`,
        data: bodyFormData,
        headers: { 
          "Content-Type": "multipart/form-data" ,
          'x-auth-token': sessionStorage.getItem('token')
        },
      })
        .then(function (response) {
          //handle success
          console.log(response)
          if(response.status === 200 || response.status ===201){
              
              return ({status: response.status,msg : response.data.message});
          }
          return ({status: response.status,msg : response.data.message});
        })
        .catch(function (error) {
          //handle error 
          console.log(error.response);
            return ({status: error.response.status,msg : error.response.data.message});
        });
}