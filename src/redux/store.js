import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Load initial state from localStorage
const preloadedState = {
  auth: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    loading: false,
    error: null
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;