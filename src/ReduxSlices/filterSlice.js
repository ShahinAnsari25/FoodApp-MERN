import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "all",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.value = action.payload.filter;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;
