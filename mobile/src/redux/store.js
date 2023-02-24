import {configureStore} from '@reduxjs/toolkit';
import CartItem from '../components/CartItem';

export const store = configureStore({
  reducer: {
    Cart: CartItem,

  },
});
