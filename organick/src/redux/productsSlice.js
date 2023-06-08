import { createSlice } from '@reduxjs/toolkit';
import ProductService from '../services/ProductService';

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

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await ProductService.fetchProducts();
    const products = response.data.products;
    dispatch(addProducts(products));
  } catch (e) {
    console.log(e);
  }
};