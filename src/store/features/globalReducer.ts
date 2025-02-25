import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openFilter: false,
  selectedImage: '',
};

const globalReducer = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setOpenFilter: (state, action) => {
      state.openFilter = action.payload;
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
  },
});

export const { setOpenFilter, setSelectedImage } = globalReducer.actions;
export default globalReducer.reducer;
