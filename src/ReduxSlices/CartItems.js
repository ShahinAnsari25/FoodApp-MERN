import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    addToCart: (state,action) => {
      
      const newItem={name:action.payload.name, image:action.payload.image, quantity:action.payload.quantity, price:action.payload.price, unitPrice:action.payload.unitPrice, id:action.payload.id}
      state.push(newItem)
    },
    deleteFromCart:(state, action)=>{
      const itemId= action.payload.id;
      console.log(itemId);
      
     return state.filter(item=> item.id !=itemId)
    },
    deleteAllFromCart:(state)=>{
      return []
      
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});
export const { addToCart,  deleteFromCart,updateQuantity,deleteAllFromCart} = cartItemSlice.actions;
export default cartItemSlice.reducer;