'use server'

import { redirect } from 'next/navigation'
import { apiUsers } from "@/app/api";

async function loginUser(prevState: any, formData: FormData) {
    try {
        const data_ = await apiUsers.logIn(formData);
    } catch (error: any) {
        return { errorMessage: error.message };
    }
    redirect('/')
}

async function createUser(prevState: any, formData: FormData) {
    try {

        const data_ = await apiUsers.signUp(formData);
    } catch (error: any) {
        return { errorMessage: error.message };
    }
    redirect('/')
}
async function deleteUser(userId: string) {
    console.log("Deleting user with ID:", userId);
}



export {
    createUser,
    deleteUser,
    loginUser
}

