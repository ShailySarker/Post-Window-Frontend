import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector(state => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      dispatch(deleteAccount());
      navigate('/login');
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="relative">
        <div 
          className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {user?.name?.charAt(0) || 'U'}
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-gray-800 font-medium">{user?.name}</p>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Logout
            </button>
            <button 
              onClick={handleDeleteAccount}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Delete Account
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};


export default Navbar;