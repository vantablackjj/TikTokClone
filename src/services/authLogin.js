import * as callPath from '../utils/http';

const authLogin = async (email, password) => {
    try {
        const res = await callPath.post('/api/auth/login', {
            email,
            password,
        });

        return res;
    } catch (err) {
        return { errorCode: err.response.status, message: err.response.data.message };
    }
};

export default authLogin;
