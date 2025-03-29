import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import LandingPage from '../pages/LandingPage/LandingPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import MainLayout from '../layouts/MainLayout';
import Authentication from '../pages/Authentication/Authentication';
import ProtectedRoute from './ProtectedRoute';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';

const Routers = () => {
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