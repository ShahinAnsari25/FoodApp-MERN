import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './ReduxSlices/CartButton.js'
import filterReducer from './ReduxSlices/filterSlice.js'
import cartItemReducer from './ReduxSlices/CartItems.js'
import sumReducer from './ReduxSlices/SumSlice.js'

export const store = configureStore({
  reducer: {
   cart:cartReducer,
   filter: filterReducer,
   cartItem:cartItemReducer,
   sum:sumReducer
  },
})