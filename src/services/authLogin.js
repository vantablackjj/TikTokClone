import * as callPath from '../utils/http';

const authLogin = async (email, password) => {
    try {
        console.log('authLogin called with:', email, password);
        const res = await callPath.post('/api/auth/login', {
            email,
            password,
        });
        console.log('Login response login :', res);

        return res;
    } catch (err) {
        return { errorCode: err.response.status, message: err.response.data.message };
    }
};

export default authLogin;
