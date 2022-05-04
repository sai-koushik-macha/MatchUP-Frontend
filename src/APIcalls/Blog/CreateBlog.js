import axios from 'axios';

import {API_URL} from '../Backend_URL';

export default async function CreateBlog(blogtitle,blogDescription,image){
    let bodyFormData = new FormData();
    bodyFormData.append('title', blogtitle);
    bodyFormData.append('description', blogDescription);
    bodyFormData.append('file', image);

    return await axios({
        method: "post",
        url:`${API_URL}/blogs`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data", 'x-auth-token': sessionStorage.getItem('token') },
      })
        .then(function (response) {
          console.log(response)
          if(response.status === 200 || response.status ===201){
              
              return ({status: response.status,msg : response.data.message});
          }
          return ({status: response.status,msg : response.data.message});
        })
        .catch(function (error) {
          console.log(error.response);
            return ({status: error.response.status,msg : error.response.data.message});
        });
}