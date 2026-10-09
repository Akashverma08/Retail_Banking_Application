import {createSlice,type PayloadAction} from "@reduxjs/toolkit";

import type{Users} from "../types/task";

interface UserState{
    users:Users[]
}

const initialState: UserState={
    users:[]
}

const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{
        setUsers:(state,action:PayloadAction<Users[]>)=>{
            state.users=action.payload;
        }
    }

});

export const {setUsers} =userSlice.actions;

export default userSlice.reducer;