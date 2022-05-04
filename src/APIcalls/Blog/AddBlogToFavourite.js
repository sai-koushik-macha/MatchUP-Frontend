import axios from 'axios';

import {API_URL} from '../Backend_URL';

export default async function AddBlogToFavourite(userId,blogId){
    try {
        return await axios({
            method: "post",
            url:`${API_URL}/users/favouriteBlogs/${userId}/${blogId}`,
            headers: {'x-auth-token': sessionStorage.getItem('token') },
        })
        .then((response) => {return response});
    } catch (error) {
        console.log(error.response);
        return ({status: 500,msg : 'Internal Server Error'});
    }
}