import * as callPath from '../utils/http';

const authLogin = async (email, password) => {
    try {
        console.log('authLogin called with:', email, password);
        const res = await callPath.post('/auth/login', {
            email,
            password,
        });
        return res.data;
    } catch (err) {
        return { errorCode: err.response.status, message: err.response.data.message };
    }
};

export default authLogin;
