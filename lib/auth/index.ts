
'use server'
import { cookies } from 'next/headers';

export async function setUserName(userName: string) {
    cookies().set('userName', userName);
}

export async function getUserName() {
    return cookies().get('userName')?.value ?? '';
}

export async function getToken() {
    return cookies().get('token')?.value ?? '';;
}

export async function deleteToken() {
    cookies().delete('token')
}
