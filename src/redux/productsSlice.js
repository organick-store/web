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

const { addProducts } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;

export const getAllProducts = () => async (dispatch) => {
  try {
    const response = await ProductService.getAll();
    const products = response.data.products;
    dispatch(addProducts(products));
    return Promise.resolve(products);
  } catch (e) {
    console.log(e);
  }
};
