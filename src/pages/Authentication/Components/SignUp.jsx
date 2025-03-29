import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { signup } from '../../../redux/actions/authThunks';

const SignUp = ({ switchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state?.auth);
    const navigate = useNavigate();

    const validateInputs = () => {
        const newErrors = {};

        const trimmedName = name.trim();

        if (!trimmedName) {
            newErrors.name = "Name is required!";
        } else if (trimmedName.length < 3) {
            newErrors.name = "Name must be at least 3 characters!";
        } else if (trimmedName.length > 15) {
            newErrors.name = "Name cannot exceed 15 characters!";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format";
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
        if (!password) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Password must be at least 6 characters, with at least one capital letter, one special character, and one number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return; // Stop if validation fails

        const result = await dispatch(signup(email, password, name));

        if (result?.success) {
            navigate("/dashboard"); // Redirect after successful signup
        }
    };


    return (
        <div className="md:max-w-md md:w-full w-5/6 mx-auto mt-10 bg-white md:p-8 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e?.target?.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A21D3C]"
                        required
                    />
                    {errors?.name && <p className="text-red-500 text-sm">{errors?.name}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e?.target?.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A21D3C]"
                        required
                    />
                    {errors?.email && <p className="text-red-500 text-sm">{errors?.email}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e?.target?.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A21D3C]"
                        required
                    />
                    {errors?.password && <p className="text-red-500 text-sm">{errors?.password}</p>}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full font-semibold bg-[#A21D3C] text-white py-2 px-4 rounded-md hover:bg-[#831730] transition duration-200 disabled:opacity-50"
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
                Already have an account?{' '}
                <button
                    onClick={switchToLogin}
                    className="text-[#A21D3C] font-semibold hover:underline focus:outline-none"
                >
                    Login
                </button>
            </p>
        </div>
    );
};

export default SignUp;