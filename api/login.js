import { axios } from './instance';

export const loginApi = async (data) => {
    const res = await axios.post(`http://localhost:3001/chat/login/user`,data)
    console.log("res================>", res);
    return res;
}