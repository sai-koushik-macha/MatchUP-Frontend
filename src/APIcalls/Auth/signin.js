import axios from 'axios';
import {API_URL} from '../Backend_URL';

export default async function Signin(user){
    if(!user.email || !user.password){
        return ({status: 401,msg : 'Please Enter all input fields!'});
    }
    return await axios.post(`${API_URL}/users/signin`,user)
    .then((response) => {
        console.log(response);
        if(response.status === 200){
        return ({status: response.status,msg : 'User Sucessfully Signed In',user : response.data.user,token: response.data.token});
        }
    })
    .catch((error) => {
        console.log(error.response);
        return ({status: error.response.status,msg: error.response.data.message})
    })

}
