"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';
import { loginApi } from '@/api/login';
// const socket = io('https://ka-z-severve-git-master-insrams-projects.vercel.app'
//     // , {
//     // // transports: ['websocket'],
//     // // upgrade: false,
//     // // rejectUnauthorized: false,
//     // withCredentials: true,
//     // }
// );

// const socket = io('https://ka-z-severve-git-master-insrams-projects.vercel.app', {
const socket = io('https://sufficient-daveen-kaz-tech-9473c93c.koyeb.app', {
    withCredentials: true,
    transports: ['websocket', 'polling'], // Ensure both websocket and polling transports are allowed
});

const Login: React.FC = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await loginApi({ userName, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', userName);
            socket.emit('register', userName);
            router.push('/');
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    const handleRegister = () => {
        router.push('/user/signup'); // Adjust the route as necessary
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label className="block mb-1">Username</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
                <button
                    type="button"
                    onClick={handleRegister}
                    className="w-full bg-green-500 text-white p-2 rounded mt-2"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Login;


