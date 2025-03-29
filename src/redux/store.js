// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import authReducer from './reducers/authReducer';
// import { thunk } from 'redux-thunk';
// import { configureStore } from '@reduxjs/toolkit';

// // Load initial state from localStorage
// const loadInitialState = () => {
//   const user = localStorage.getItem('user');
//   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

//   return {
//     auth: {
//       user: user ? JSON.parse(user) : null,
//       isAuthenticated,
//       loading: false,
//       error: null
//     }
//   };
// };

// const rootReducer = configureStore({
//   auth: authReducer
// });

// const store = createStore(
//   rootReducer,
//   loadInitialState(), // Initialize with stored data
//   applyMiddleware(thunk)
// );

// export default store;

// src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './reducers/authReducer';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer
//   },
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware({
//       serializableCheck: false
//     })
// });

// export default store;

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