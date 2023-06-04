import { createSlice } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
const initialUserState = { name: '', email: '',  isAuth: false};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name
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
    localStorage.setItem('token', response.data.token);
    dispatch(setAuth(true));
    dispatch(setUser(response.data.email));
  } catch (e) {
    console.log(e.response?.data?.message);
  }
};

export const registration = (name, email, password) => async (dispatch) => {
  try {
    const response = await AuthService.registration(name, email, password);
    localStorage.setItem('token', response.data.token);
    dispatch(setAuth(true));
    dispatch(setUser(response.data.email));
  } catch (e) {
    console.log(e.response?.data?.message);
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