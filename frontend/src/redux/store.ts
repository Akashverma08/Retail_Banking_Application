import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import accountsReducer from "./accountsSlice";
import payeesReducer from "./payeesSlice";

export const store=configureStore({
    reducer:{
        users:userReducer,
        accounts:accountsReducer,
        payees: payeesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;