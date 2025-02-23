import { TCart } from '@/components/cart/cart';
import {
  removeDataSessionStorage,
  setDataSessionStorage,
  updateDataSessionStorage,
} from '@/lib/utils';
import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  carts: TCart[];
};

const initialState: TInitialState = {
  carts: [],
};

const cartReducer = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    initCart: (state, action) => {
      state.carts = action.payload;
    },
    addCartItem: (state, action) => {
      state.carts.push(action.payload);
      setDataSessionStorage('carts', action.payload);
    },
    removeCartItem: (state, action) => {
      state.carts = state.carts.filter((item) => item._id !== action.payload);
      removeDataSessionStorage('carts', action.payload);
    },
    updateCartItem: (state, action) => {
      const { id, quantity, type } = action.payload;
      const cart = state.carts.find((item) => item._id === id);
      if (cart) {
        cart.quantity =
          type === 'increment'
            ? cart.quantity + 1
            : type === 'decrement'
              ? cart.quantity - 1
              : quantity;
        if (cart.quantity < 1) {
          cart.quantity = 1;
        }
        cart.totalPrice = cart.price * cart.quantity;
        updateDataSessionStorage('carts', id, cart);
      }
    },
    clearCart: (state) => {
      state.carts = [];
      sessionStorage.clear();
    },
  },
});

export const { initCart, addCartItem, removeCartItem, updateCartItem, clearCart } =
  cartReducer.actions;
export default cartReducer.reducer;
