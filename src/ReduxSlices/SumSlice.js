import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const sumSlice = createSlice({
  name: "sum",
  initialState,
  reducers: {
    updateSum: (state,action) => {
     
      state.value = action.payload.updatedSum;
    },
  },
});

export const { updateSum } = sumSlice.actions;
export default sumSlice.reducer;