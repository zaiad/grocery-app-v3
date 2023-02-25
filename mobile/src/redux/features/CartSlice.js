import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      state.products.push(product);
    },
  },
});

export const {addProduct} = cartSlice.actions;

export default cartSlice.reducer;
