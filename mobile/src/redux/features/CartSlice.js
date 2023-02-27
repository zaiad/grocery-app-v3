import {createSlice} from '@reduxjs/toolkit';


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const {_id, title, price, quantity} = action.payload;

      const ifExistProduct = state.products.findIndex(item => item._id === _id);

      if (ifExistProduct > 0) {
        state.products[ifExistProduct].quantity += quantity;
      } else {
        state.products.push({_id, title, price, quantity});
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

export default cartSlice.reducer;
