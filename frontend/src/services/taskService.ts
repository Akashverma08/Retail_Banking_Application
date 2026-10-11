import type { Users,CreateUser,CreateAccount} from "../types/task";

import api from "./api";


export const getUsers = async (): Promise<Users[]> => {
    const response = await api.get(`/users`);
    return response.data;
};


export const createUser=async (data:CreateUser)=>{
    const response=await api.post(`/users`,data);
    console.log("add user :",response.data)
    return response.data;
}

export const createAccount=async (data:CreateAccount)=>{
    const response=await api.post(`/accounts`,data)
    console.log("add account of user",response.data)
    return response.data
}


export const getMyAccounts=async ()=>{
    const response=await api.get(`/accounts/me`);
    console.log('Customer account details',response.data);
    return response.data;

}

export const getMyCustomerDetails=async ()=>{
    const response=await api.get("/users/customer");
    return response.data;
}