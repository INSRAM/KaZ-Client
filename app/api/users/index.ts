'use server'
import { cookies } from 'next/headers';
import { axios } from '../instance';

const logIn = async (data: FormData) => {
    try {
        const res = await axios.post(`/chat/login/user`, data);
        cookies().set('token', res.data.token);
        cookies().set('userName', res.data.user.userName)
        return res.data;
    } catch (error: any) {
        throw error.response.data?.error;
    }

}

const signUp = async (data: FormData) => {
    try {
        const res = await axios.post(`/chat/signup/user`, data);
        console.log("this is response ==> ", res.data)
        cookies().set('token', res.data.token);
        cookies().set('userName', res.data.user.userName)
        return res.data;
    } catch (error: any) {
        throw error.response.data?.error;
    }

}

const myUsers = async (userName: string) => {
    try {
        const res = await axios.get(`/chat/myUsers/userName/${userName}`);
        return res.data;
    } catch (error: any) {
        throw error.response.data?.error;
    }
}

export {
    logIn,
    signUp,
    myUsers
}



