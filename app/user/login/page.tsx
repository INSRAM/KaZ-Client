"use client"

import React from 'react';
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation';
import { users } from '@/app/actions';
import { SubmitButton } from '@/app/components/submit/button';

const initialState = { errorMessage: '' };
const Login: React.FC = () => {
    const router = useRouter();
    const [state, formAction] = useFormState(users.loginUser, initialState);

    const handleRegister = () => {
        router.push('/user/signup'); // Adjust the route as necessary
    };



    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form action={formAction} className="bg-white p-6 rounded shadow-md w-full max-w-sm" method="post">
                <h2 className="text-2xl font-bold mb-2">Login</h2>
                {state.errorMessage && (
                    <p style={{ color: 'red' }}>{state.errorMessage}</p>
                )}
                <div className="mb-4 mt-2">
                    <label className="block mb-1" htmlFor="userName">Username*</label>
                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="password">Password*</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <SubmitButton text='Login' />
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
