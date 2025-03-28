import axios from 'axios';

// Mock API URL for user data
const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    // In a real app, this would be an API call to your backend
    const users = (await axios.get(API_URL)).data;
    const user = users.find(u => u.email === email);
    
    if (user && password === 'password') { // Simple password check for demo
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user
      });
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.message
    });
  }
};

export const signup = (email, password, name) => async (dispatch) => {
  dispatch({ type: 'SIGNUP_REQUEST' });
  try {
    // In a real app, this would be an API call to your backend
    const newUser = {
      id: Math.floor(Math.random() * 10000),
      name,
      email,
      username: email.split('@')[0]
    };
    
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('isAuthenticated', 'true');
    
    dispatch({
      type: 'SIGNUP_SUCCESS',
      payload: newUser
    });
  } catch (error) {
    dispatch({
      type: 'SIGNUP_FAILURE',
      payload: error.message
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  dispatch({ type: 'LOGOUT' });
};

export const deleteAccount = () => (dispatch) => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  dispatch({ type: 'DELETE_ACCOUNT' });
};