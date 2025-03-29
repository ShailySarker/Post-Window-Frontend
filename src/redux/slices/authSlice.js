import { createSlice } from '@reduxjs/toolkit';

// find initial state from localStorage
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    },
    deleteAccountSuccess(state) {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    }
  }
});

export const {
  loginStart, loginSuccess, loginFailure,
  signupStart, signupSuccess, signupFailure,
  logoutSuccess, deleteAccountSuccess
} = authSlice.actions;

export default authSlice.reducer;