import Axios from 'axios'
import Router from 'next/router';

const https = require('https')

export const axios = Axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    'headers': {
        // 'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
        // Authorization: "bearear "+localStorage.getItem('token'),
        'Accept': 'application/json',
    }
})

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 403) {
            localStorage.removeItem('token');
            Router.push('user/login');
        }
        return Promise.reject(error);
    }
);