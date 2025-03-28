import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div>
                <Sidebar />
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;