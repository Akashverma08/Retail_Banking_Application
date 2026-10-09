import type { Users} from "../types/task";

import api from "./api";


export const getUsers = async (): Promise<Users[]> => {
    const response = await api.get(`/users`);
    return response.data;
};

