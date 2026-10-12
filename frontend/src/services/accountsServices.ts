import api from "./api";
import type{Account} from "../types/accounts";

export const getAllAccounts=async ():Promise<Account[]>=>{
    const response =await api.get<Account[]>(`/accounts`)
    return response.data;
}