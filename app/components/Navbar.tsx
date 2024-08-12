"use client"
import React from 'react';

const Navbar: React.FC = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h1 className="text-2xl mb-4">My Navbar</h1>
            <ul>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">Profile</a></li>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">Settings</a></li>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">Logout</a></li>
            </ul>
        </div>
    );
};

export default Navbar;
