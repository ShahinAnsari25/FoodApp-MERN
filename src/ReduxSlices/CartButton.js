import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  page:""
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
     
      state.value = !state.value;
    },
    changePage:(state, action)=>{
      state.page=action.payload.page;
      console.log(state.page);
      
    }
  },
});

export const { toggleCart, changePage } = cartSlice.actions;
const cartReducer=cartSlice.reducer;
export default cartReducer;
