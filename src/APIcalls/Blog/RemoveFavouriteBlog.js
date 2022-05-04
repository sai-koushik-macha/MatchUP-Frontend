import axios from 'axios';
import {API_URL} from '../Backend_URL';

export default async function RemoveFavouriteBlog(blogId,userId){
    const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token')
    }
    try {        
    return await axios.delete(`${API_URL}/users/favouriteBlogs/${userId}/${blogId}`,{headers: headers}).then(response => {return response});
    } catch (error) {
        return ({state: 500 , msg : "Internal Server Error"})
    }
} 