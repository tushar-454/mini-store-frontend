import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  name: string;
  email: string;
  phone: string;
  line_items: {
    product_id: string;
    name: string;
    image: string;
    variant: string;
    quantity: number;
  }[];
  division: string;
  district: string;
  sub_district: string;
  address: string;
  coupon_code: string;
  discount: number;
  type: 'flat' | 'percentage';
  instruction: string;
};

const initialState: TInitialState = {
  name: '',
  email: '',
  phone: '',
  line_items: [],
  division: '',
  district: '',
  sub_district: '',
  address: '',
  coupon_code: '',
  discount: 0,
  type: 'flat',
  instruction: '',
};

const orderReducer = createSlice({
  name: 'orderReducer',
  initialState,
  reducers: {
    clearOrder: (state) => {
      Object.assign(state, initialState);
    },
    clearAddress: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.division = '';
      state.district = '';
      state.sub_district = '';
      state.address = '';
    },
    updateOrderDiscount: (state, action) => {
      const { type, discount, code } = action.payload;
      state.discount = discount;
      state.type = type;
      state.coupon_code = code;
    },
    updateOrderAddress: (state, action) => {
      const { name, email, phone, division, district, sub_district, address } = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.division = division;
      state.district = district;
      state.sub_district = sub_district;
      state.address = address;
    },
    updateOrderLineItems: (state, action) => {
      state.line_items = action.payload;
    },
    resetOrderDiscount: (state) => {
      state.discount = 0;
      state.type = 'flat';
      state.coupon_code = '';
    },
    updateOrderInstruction: (state, action) => {
      state.instruction = action.payload;
    },
  },
});

export const {
  updateOrderDiscount,
  updateOrderAddress,
  updateOrderLineItems,
  resetOrderDiscount,
  clearOrder,
  clearAddress,
  updateOrderInstruction,
} = orderReducer.actions;
export default orderReducer.reducer;
