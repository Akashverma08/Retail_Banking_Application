import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Account } from "../types/accounts";

interface AccountState {
  accounts: Account[];
}

const initialState: AccountState = {
  accounts: [],
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
  },
});

export const { setAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;