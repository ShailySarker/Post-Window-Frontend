import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex md:flex-row flex-col w-full h-full'>
                <div className='xl:w-1/5 h-full'>
                    <Sidebar />
                </div>
                <div className='lg:w-4/5 w-full h-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;