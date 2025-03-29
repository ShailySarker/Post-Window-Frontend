import { 
  signupStart, signupSuccess, signupFailure,
  loginStart, loginSuccess, loginFailure,
  logoutSuccess, deleteAccountSuccess
} from '../slices/authSlice';

const ALL_USERS_KEY = 'allUsers';
const CURRENT_USER_KEY = 'user';
const AUTH_KEY = 'isAuthenticated';

// Initialize storage with demo data if empty
const initializeUsers = () => {
  if (!localStorage.getItem(ALL_USERS_KEY)) {
    const demoUsers = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        username: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(demoUsers));
  }
};

// Get all users from localStorage
const getAllUsers = () => {
  return JSON.parse(localStorage.getItem(ALL_USERS_KEY)) || [];
};

// Save all users to localStorage
const saveAllUsers = (users) => {
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
};

// Signup function
export const signup = (email, password, name) => async (dispatch) => {
  try {
    dispatch(signupStart());

    const allUsers = getAllUsers();

    if (allUsers.some(user => user.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      username: email.split('@')[0],
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...allUsers, newUser];
    saveAllUsers(updatedUsers);

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    localStorage.setItem(AUTH_KEY, JSON.stringify(true));

    dispatch(signupSuccess(newUser));
    return { success: true };
  } catch (error) {
    dispatch(signupFailure(error.message));
    return { success: false, error: error.message };
  }
};

// Login function
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const allUsers = getAllUsers();
    const user = allUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

     // Store user in session
     localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
     localStorage.setItem(AUTH_KEY, 'true');

    dispatch(loginSuccess(user));
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { success: false, error: error.message };
  }
};

// Logout function
export const logout = () => async (dispatch) => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(AUTH_KEY);

  dispatch(logoutSuccess());
  return { success: true };
};

// Delete account function
export const deleteAccount = (userId) => async (dispatch) => {
  const allUsers = getAllUsers().filter(user => user.id !== userId);
  saveAllUsers(allUsers);

  const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  if (currentUser?.id === userId) {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(AUTH_KEY);

  }

  dispatch(deleteAccountSuccess());
  return { success: true };
};

// Initialize storage on load
initializeUsers();