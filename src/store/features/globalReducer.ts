import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openFilter: false,
};

const globalReducer = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setOpenFilter: (state, action) => {
      state.openFilter = action.payload;
    },
  },
});

export const { setOpenFilter } = globalReducer.actions;
export default globalReducer.reducer;
