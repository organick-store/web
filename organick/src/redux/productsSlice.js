import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialCartState = { products: [], cartCounter: 0 };
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

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartCounter += action.payload.quantity;
      if (itemIndex === -1) {
        state.products.push(action.payload);
      } else {
        state.products[itemIndex].quantity += action.payload.quantity;
      }
    },
    removeItemFromCart(state, action) {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartCounter -= action.payload.quantity;
    },
    setCartItemQuantity(state, action) {
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      state.products[itemIndex].quantity = action.payload.quantity;
      state.cartCounter = state.products.reduce(
        (acc, cur) => (acc += cur.quantity),
        0
      );
    },
    clearCart(state, action) {
      state.products = [];
      state.cartCounter = 0;
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  setCartItemQuantity,
  clearCart,
} = cartSlice.actions;

export const { addProducts } = productsSlice.actions;

export default store;
