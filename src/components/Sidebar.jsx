import React from 'react';
import { useLocation } from 'react-router';

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="bg-gray-700 text-white w-64 min-h-screen p-4">
            <ul className="space-y-2">
                <li>
                    <Link
                        to="/dashboard"
                        className={`block px-4 py-2 rounded-md ${location.pathname === '/dashboard' ? 'bg-blue-600' : 'hover:bg-gray-600'}`}
                    >
                        Details
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;