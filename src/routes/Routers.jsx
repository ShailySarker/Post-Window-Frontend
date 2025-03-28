import React from 'react';
import { Route, Routes } from 'react-router';
import LandingPage from '../pages/LandingPage/LandingPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import MainLayout from '../layouts/MainLayout';
import Authentication from '../pages/Authentication/Authentication';

const Routers = () => {
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
                    element={<DashboardPage />}
                />
            </Route>
            <Route path="/authentication" element={<Authentication />} />
        </Routes>
    );
};

export default Routers;