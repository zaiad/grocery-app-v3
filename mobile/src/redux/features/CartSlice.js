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
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const index = state.products.findIndex((product) => product.id === productId);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
  },
});

export const {addProduct, deleteProduct} = cartSlice.actions;

export default cartSlice.reducer;
