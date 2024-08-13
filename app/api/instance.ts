import Axios from 'axios'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'

import https from 'https';
import { backEndURL } from '../lib/constant';


export const axios = Axios.create({
    baseURL: backEndURL,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    'headers': {
        'authorization': "Bearer " + cookies().get('token')?.value ?? '',
        'Accept': 'application/json',
    }
})

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 403) {
            cookies().delete('token'); // deleting cookie 
            redirect('/user/login'); // redirecting user
        }
        // else {
        //     console.log("this is error response ==> ", error.response.status)
        // }
        return Promise.reject(error);
    }
);
