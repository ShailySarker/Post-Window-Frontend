import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { isAuthenticated } = useSelector(state => state?.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {isLogin ? (
                <Login switchToSignup={() => setIsLogin(false)} />
            ) : (
                <SignUp switchToLogin={() => setIsLogin(true)} />
            )}
        </div>
    );
};

export default Authentication;