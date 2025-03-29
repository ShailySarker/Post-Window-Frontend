import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import LandingPage from '../pages/LandingPage/LandingPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import MainLayout from '../layouts/MainLayout';
import Authentication from '../pages/Authentication/Authentication';
import ProtectedRoute from './ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';

const Routers = () => {
    // const { isAuthenticated } = useSelector(state => state?.auth);
    // const navigate = useNavigate();

    // // Read from localStorage to persist auth state after reload
    // const storedAuth = JSON.parse(localStorage.getItem('isAuthenticated')) || false;

    // useEffect(() => {
    //     if (isAuthenticated || storedAuth) {
    //         navigate('/dashboard');
    //     }
    // }, [isAuthenticated, navigate, storedAuth]);
    const dispatch = useDispatch();

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
  
      if (storedUser && isAuthenticated) {
        dispatch(loginSuccess(storedUser)); // Restore Redux state from localStorage
      }
    }, [dispatch]);
    return (
        <Routes>
            <Route
                index
                element={<LandingPage />}
            />
            <Route
                path="/"
                element={<MainLayout />}
            >
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
            </Route>
            <Route path="/authentication" element={
                <Authentication />
            } />
            {/* <StorageDebugger /> */}
        </Routes>
    );
};

export default Routers;