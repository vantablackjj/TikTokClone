import * as callPath from '../utils/http';

const authSignUp = async (valueAccount, valuePassword, type) => {
    try {
        const response = await callPath.post('/api/auth/register', {
            type: type,
            email: valueAccount,
            password: valuePassword,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(' Server response sign up  :', error.response.data);
            return error.response.data;
        }

        console.error('Error during sign up:', error);
        return { errCode: 1, message: 'Sign up failed (no response)' };
    }
};

export default authSignUp;
