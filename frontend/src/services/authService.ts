import axios from "axios";
import type{Sign} from "../types/sign";

const url = import.meta.env.VITE_API_URL;

export const loginUser=async (email:string,password:string)=>{
    const response=await axios.post(`${url}/auth/login`,{email,password});
    console.log(response);
    return response.data;
}

export const signUpApi= async(user:Sign)=>{
    const response=await axios.post(`${url}/users`,user);
    return response.data;
}