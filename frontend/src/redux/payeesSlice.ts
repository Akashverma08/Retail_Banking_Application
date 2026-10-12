import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Payee } from "../types/payees";

interface PayeesState {
  payees: Payee[];
}

const initialState: PayeesState = {
  payees: [],
};

const payeesSlice = createSlice({
  name: "payees",
  initialState,
  reducers: {
    setPayees: (state, action: PayloadAction<Payee[]>) => {
      state.payees = action.payload;
    },

    addPayeeToList: (state, action: PayloadAction<Payee>) => {
      state.payees.push(action.payload);
    },

    updatePayeeInList: (state, action: PayloadAction<Payee>) => {
      const index = state.payees.findIndex(
        (payee) => payee.id === action.payload.id
      );

      if (index !== -1) {
        state.payees[index] = action.payload;
      }
    },

    removePayeeFromList: (state, action: PayloadAction<string>) => {
      state.payees = state.payees.filter(
        (payee) => payee.id !== action.payload
      );
    },
  },
});

export const {
  setPayees,
  addPayeeToList,
  updatePayeeInList,
  removePayeeFromList,
} = payeesSlice.actions;

export default payeesSlice.reducer;