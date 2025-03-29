// import {
//     loginStart,
//     loginSuccess,
//     loginFailure,
//     signupStart,
//     signupSuccess,
//     signupFailure,
//     logoutSuccess,
//     deleteAccountSuccess
// } from '../slices/authSlice';

// // Key for storing users in localStorage
// const LOCAL_STORAGE_USERS_KEY = 'app_users';

// const initializeUsers = () => {
//     if (!localStorage.getItem(LOCAL_STORAGE_USERS_KEY)) {
//         localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify([]));
//     }
// };

// // Get all users
// const getUsers = () => {
//     initializeUsers();
//     return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY));
// };

// const saveUsers = (users) => {
//     localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
// };

// export const login = (email, password) => async (dispatch) => {
//     try {
//         dispatch(loginStart());

//         const users = getUsers();
//         const user = users.find(u => u.email === email);

//         if (user && user.password === password) {
//             localStorage.setItem('user', JSON.stringify(user));
//             localStorage.setItem('isAuthenticated', 'true');
//             dispatch(loginSuccess(user));
//             return { success: true };
//         } else {
//             throw new Error('Invalid email or password');
//         }
//     } catch (error) {
//         dispatch(loginFailure(error.message));
//         return { success: false, error: error.message };
//     }
// };

// export const signup = (email, password, name) => async (dispatch) => {
//     try {
//         dispatch(signupStart());

//         const users = getUsers();

//         // Check if user exists
//         if (users.some(u => u.email === email)) {
//             throw new Error('Email already exists');
//         }

//         const newUser = {
//             id: Date.now(),
//             name,
//             email,
//             password, // REMOVE THIS IN PRODUCTION
//             createdAt: new Date().toISOString()
//         };

//         saveUsers([...users, newUser]);

//         // Debug: Log the current users
//         console.log('Current users:', getUsers());

//         dispatch(signupSuccess(newUser));
//         return { success: true };
//     } catch (error) {
//         dispatch(signupFailure(error.message));
//         return { success: false, error: error.message };
//     }
// };

// export const logout = () => async (dispatch) => {
//     try {
//         localStorage.removeItem('user');
//         localStorage.removeItem('isAuthenticated');
//         dispatch(logoutSuccess());
//         return { success: true };
//     } catch (error) {
//         console.error('Logout failed:', error);
//         return { success: false, error: error.message };
//     }
// };

// export const deleteAccount = (userId) => async (dispatch) => {
//     try {
//         const users = getUsers();
//         const updatedUsers = users.filter(user => user.id !== userId);
//         saveUsers(updatedUsers);

//         localStorage.removeItem('user');
//         localStorage.removeItem('isAuthenticated');
//         dispatch(deleteAccountSuccess());
//         return { success: true };
//     } catch (error) {
//         console.error('Account deletion failed:', error);
//         return { success: false, error: error.message };
//     }
// };


// import {
//   loginStart, loginSuccess, loginFailure,
//   signupStart, signupSuccess, signupFailure,
//   logoutSuccess, deleteAccountSuccess
// } from '../slices/authSlice';

// // Storage keys
// const ALL_USERS_KEY = 'allUsers';
// const CURRENT_USER_KEY = 'user';
// const AUTH_KEY = 'isAuthenticated';

// // Initialize storage with DEMO DATA if empty
// const initializeUsers = () => {
//   if (!localStorage.getItem(ALL_USERS_KEY)) {
//     const demoUsers = [
//       {
//         id: 1,
//         name: 'Admin User',
//         email: 'admin@example.com',
//         password: 'admin123',
//         username: 'admin',
//         createdAt: new Date().toISOString()
//       }
//     ];
//     localStorage.setItem(ALL_USERS_KEY, JSON.stringify(demoUsers));
//     console.log('🟢 Initialized allUsers with demo data');
//   }
// };

// // Get all users with error handling
// const getAllUsers = () => {
//   try {
//     const usersJson = localStorage.getItem(ALL_USERS_KEY);
//     if (!usersJson) {
//       console.error('🔴 allUsers not found in storage');
//       return [];
//     }
//     return JSON.parse(usersJson);
//   } catch (error) {
//     console.error('🔴 Error reading allUsers:', error);
//     return [];
//   }
// };

// // Save users with verification
// const saveAllUsers = (users) => {
//   try {
//     localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
//     console.log('💾 Saved to allUsers:', users);
    
//     // Verify the save worked
//     const savedUsers = JSON.parse(localStorage.getItem(ALL_USERS_KEY));
//     if (JSON.stringify(savedUsers) !== JSON.stringify(users)) {
//       throw new Error('🔴 Save verification failed');
//     }
//     return true;
//   } catch (error) {
//     console.error('🔴 Error saving allUsers:', error);
//     throw error;
//   }
// };

// export const signup = (email, password, name) => async (dispatch) => {
//   try {
//     dispatch(signupStart());
    
//     // 1. Get current users (force fresh read)
//     const allUsers = getAllUsers();
//     console.log('📋 Current allUsers:', allUsers);
    
//     // 2. Check for existing user
//     if (allUsers.some(user => user.email === email)) {
//       throw new Error('Email already exists');
//     }

//     // 3. Create new user
//     const newUser = {
//       id: Date.now(),
//       name,
//       email,
//       password, // Remember to hash in production
//       username: email.split('@')[0],
//       createdAt: new Date().toISOString()
//     };

//     // 4. Update ALL users array
//     const updatedUsers = [...allUsers, newUser];
//     const saveSuccess = saveAllUsers(updatedUsers);
    
//     if (!saveSuccess) {
//       throw new Error('Failed to save user to allUsers');
//     }

//     // 5. Verify the user was added
//     const currentUsers = getAllUsers();
//     if (!currentUsers.some(u => u.id === newUser.id)) {
//       throw new Error('User not found in allUsers after save');
//     }

//     // 6. Set current session
//     localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
//     localStorage.setItem(AUTH_KEY, 'true');

//     console.log('✅ Signup successful! New user:', newUser);
//     console.log('✅ Updated allUsers:', currentUsers);

//     dispatch(signupSuccess(newUser));
//     return { success: true };
//   } catch (error) {
//     console.error('🔴 Signup failed:', error);
//     dispatch(signupFailure(error.message));
//     return { success: false, error: error.message };
//   }
// };

// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch(loginStart());
//     const allUsers = getAllUsers();
//     const user = allUsers.find(u => u.email === email && u.password === password);

//     if (!user) {
//       throw new Error('Invalid email or password');
//     }

//     // Set current user
//     localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

//     dispatch(loginSuccess(user));
//     return { success: true };
//   } catch (error) {
//     dispatch(loginFailure(error.message));
//     return { success: false, error: error.message };
//   }
// };

// export const logout = () => async (dispatch) => {
//   localStorage.removeItem(CURRENT_USER_KEY);
//   dispatch(logoutSuccess());
//   return { success: true };
// };

// export const deleteAccount = (userId) => async (dispatch) => {
//   const allUsers = getAllUsers().filter(user => user.id !== userId);
//   saveAllUsers(allUsers);

//   // Clear current user if it's the deleted account
//   const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
//   if (currentUser?.id === userId) {
//     localStorage.removeItem(CURRENT_USER_KEY);
//   }

//   dispatch(deleteAccountSuccess());
//   return { success: true };
// };

// // Initialize storage immediately
// initializeUsers();
// console.log('🛠️ Storage initialized');



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

    // localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    // localStorage.setItem(AUTH_KEY, JSON.stringify(true));

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
  // localStorage.setItem(AUTH_KEY, JSON.stringify(false));
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
    // localStorage.setItem(AUTH_KEY, JSON.stringify(false));
    localStorage.removeItem(AUTH_KEY);

  }

  dispatch(deleteAccountSuccess());
  return { success: true };
};

// Initialize storage on load
initializeUsers();