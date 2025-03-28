import React, { useState } from 'react';
import { GrMenu } from 'react-icons/gr';
import { motion } from "framer-motion";
import { Link, useLocation } from 'react-router';
import { IoMdCloseCircle } from 'react-icons/io';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="lg:block hidden bg-gray-700 text-white w-64 h-full p-4">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/dashboard"
                            className={`block px-4 py-2 font-semibold rounded-md ${location.pathname === '/dashboard' ? 'bg-[#A21D3C]' : 'hover:bg-gray-600'}`}
                        >
                            Details
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Menu Button */}
            <div className="visible lg:hidden md:pt-6 md:pl-6 pt-4 pl-4" onClick={() => setIsOpen(true)}>
                <GrMenu className="md:text-lg cursor-pointer" />
            </div>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-10 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Drawer */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isOpen ? "0%" : "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-[68px] left-0 w-64 h-full bg-gray-700 text-white p-4 z-50 shadow-lg"
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-white text-2xl"
                >
                    <IoMdCloseCircle />
                </button>

                {/* Sidebar Links */}
                <ul className="space-y-2 mt-10">
                    <li>
                        <Link
                            to="/dashboard"
                            className={`block px-4 py-2 font-semibold rounded-md ${location.pathname === "/dashboard" ? "bg-[#A21D3C]" : "hover:bg-gray-600"
                                }`}
                        >
                            Details
                        </Link>
                    </li>
                </ul>
            </motion.div>
        </>
    );
};

export default Sidebar;