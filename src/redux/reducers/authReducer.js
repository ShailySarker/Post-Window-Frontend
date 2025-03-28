const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
      case 'SIGNUP_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'LOGIN_SUCCESS':
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          loading: false,
          error: null
        };
      case 'LOGIN_FAILURE':
      case 'SIGNUP_FAILURE':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: action.payload
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null
        };
      case 'DELETE_ACCOUNT':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null
        };
      default:
        return state;
    }
  };
  
  export default authReducer;