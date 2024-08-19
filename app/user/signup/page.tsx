"use client"

// import React, { useState } from 'react';
import Link from 'next/link';
import { users } from '@/app/actions';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/submit/button';

const signUpState = { errorMessage: '' };
const Signup = () => {
    const [state, formAction] = useFormState(users.createUser, signUpState);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form action={formAction} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
                {state.errorMessage && (
                    <p style={{ color: 'red' }}>{state.errorMessage}</p>
                )}
                <div className="mb-4 mt-2">
                    <label className="block mb-1">Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Username*</label>
                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Email*</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Password*</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <SubmitButton text='Sign Up' />
                {/* <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button> */}
                <p className="mt-4 text-center">
                    Already have an account? <Link href="/user/login" className="text-blue-500">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;

