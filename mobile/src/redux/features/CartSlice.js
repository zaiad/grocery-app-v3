import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

const CART_STORAGE_KEY = 'cart';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const {id, title, description, price, image, quantity} = action.payload;

      const ifExistProduct = state.products.findIndex(item => item.id === id);

      if (ifExistProduct >= 0) {
        state.products[ifExistProduct].quantity += quantity;
      } else {
        state.products.push({id, title, description, price, image, quantity});
      }
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const index = state.products.findIndex(
        product => product.id === productId,
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
  },
});

export const {addProduct, deleteProduct} = cartSlice.actions;

export const saveCartToAsyncStorage = async cart => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to AsyncStorage:', error);
  }
};

export const loadCartFromAsyncStorage = async () => {
  try {
    const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (cartData !== null) {
      return JSON.parse(cartData);
    }
  } catch (error) {
    console.error('Error loading cart from AsyncStorage:', error);
  }
  return {products: []};
};

export default cartSlice.reducer;
