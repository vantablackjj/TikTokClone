import * as callPath from '../utils/http';

const authSignUp = async (valueAccount, valuePassword, type) => {
    try {
        const response = await callPath.post('/auth/register', {
            type: type,
            email: valueAccount,
            password: valuePassword,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log('❌ Server response:', error.response.data); // 🔍 See actual validation message
            return error.response.data;
        }

        console.error('Error during sign up:', error);
        return { errCode: 1, message: 'Sign up failed (no response)' };
    }
};

export default authSignUp;
