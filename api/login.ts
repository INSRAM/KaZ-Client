import { axios } from './instance';

export const loginApi = async (data: any) => {
    const res = await axios.post(`https://ka-z-severve-git-master-insrams-projects.vercel.app/chat/login/user`, data)
    return res;
}