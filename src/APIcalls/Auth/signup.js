import axios from 'axios';

import {API_URL} from '../Backend_URL';

// async function GetUsers(){
//    const users = await axios.get(`${API_URL}/users`)
//     .then((result) => {return result.data})
//     .catch((error) => {
//         console.log(error);
//     })

//     return users;
// }

// const isuserExists = async (email) => {
//     const users = await GetUsers();
//     console.log(users);
//     let isUser = false;
//     for(let i = 0; i < users.length; i++) {
//         if(users[i].email === email) {
//             console.log(users[i])
//             isUser = true;
//             return isUser;
//         }
//     }
//     return isUser;
// }

export default async function SignUp(user) {
    // return ({status: 200,msg : 'User Sucessfully Signed Up'})
    console.log(user);
    if(!user.email || !user.password || !user.DOB || !user.firstName || !user.lastName || !user.file || !user.phone){
        console.log("Please Enter all input fields!")
        return ({status: 401,msg : 'Please Enter all input fields!'});
    }
    if(user.password !== user.confirmPassword){
        return ({status: 401,msg : 'Passwords does not match!'})
    }
    // console.log(isuserExists(user.email) === true)
    // if(isuserExists(user.email) === true){
    //     console.log("User already exists")
    //     return ({status: 401,msg : 'User already exists'});
    // } 
    // if(user.password !== user.confirmPassword){
    //     return ({status: 401,msg : 'Password does not match. Please check password entered!'});
    // }
    // else{
    let bodyFormData = new FormData();
    bodyFormData.append('firstName', user.firstName);
    bodyFormData.append('lastName', user.lastName);
    bodyFormData.append('email', user.email);
    bodyFormData.append('password', user.password);
    bodyFormData.append('DOB', user.DOB);
    bodyFormData.append('phone', user.phone);
    bodyFormData.append('file', user.file);
    
    return await axios({
        method: "post",
        url:`${API_URL}/users/signup`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response)
          if(response.status === 200 || response.status ===201){
              
              return ({status: response.status,msg : response.data.message,user: response.data.user});
          }
          return ({status: response.status,msg : response.data.message,error : response.error});
        })
        .catch(function (error) {
          //handle error 
          console.log(error.response);
            return ({status: error.response.status,msg : error.response.data.message});
        });
}