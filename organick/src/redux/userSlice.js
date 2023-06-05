import { createSlice } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
const initialUserState = { name: '', email: '',  isAuth: false};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      if (action.payload.name) {
        state.name = action.payload.name
      }
      state.email = action.payload.email;
    },
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, setAuth } = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await AuthService.login(email, password);
    console.log(response);
    localStorage.setItem('token', response.data.token);
    if (response.data.status === 'Success') {
      console.log('success');
      dispatch(setAuth(true));
      dispatch(setUser({email: response.data.email, name: response.data.name}));
      return {message: 'Successfully authorized'}
    }
    return {message: response.data.message || 'Something went wrong'}
  } catch (e) {
    console.log(e);
  }
};

export const registration = (name, email, password) => async (dispatch) => {
  try {
    const response = await AuthService.registration(name, email, password);
    console.log(response);
    localStorage.setItem('token', response.data.token);
    if (response.data.status === 'Success') {
      console.log('success');
      dispatch(setAuth(true));
      dispatch(setUser({email: response.data.email, name: response.data.name}));
      return {message: 'Successfully authorized'}
    } 
    return {message: response.data.message || 'Something went wrong'}
  } catch (e) {
    console.log(e);
  }
};

export const refresh = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;
    const response = await AuthService.refresh(token);
    console.log(response);
    if (response.data.status === 'Success') {
      dispatch(setAuth(true));
      dispatch(setUser({email: response.data.email, name: response.data.name}));
    } else {
      localStorage.removeItem('token');
    }
  } catch (e) {
    console.log(e);
  }
};

export const activate = (token) => async (dispatch) => {
  try {
    if (!token) return;
    const response = await AuthService.activate(token);
    console.log(response);
    if (response.data.status === 'Success') {
      return {message: response.data.message}
    }
    return {message: response.data.message}
  } catch (e) {
    console.log(e);
  }
};

// export const logout = () => async (dispatch) => {
//   try {
//     await AuthService.logout();
//     localStorage.removeItem('token');
//     dispatch(setAuth(false));
//     dispatch(setUser({name: '', email: ''}));
//   } catch (e) {
//     console.log(e.response?.data?.message);
//   }
// };

export const userReducer = userSlice.reducer;