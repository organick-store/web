import { createSlice } from '@reduxjs/toolkit';

const initialProductsState = { productsList: [] };

const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    addProducts(state, action) {
      state.productsList = [];
      state.productsList.push(...action.payload);
    },
  },
});

export const { addProducts } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
