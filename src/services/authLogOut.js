import * as callPath from '../utils/http';

const authLogOut = async (tokenStr) => {
    try {
        const res = await callPath.post(
            '/auth/logout',
            {},
            {
                headers: {
                    Authorization: tokenStr,
                },
            },
        );
        return res;
    } catch (err) {
        return { errorCode: err.response.status, message: err.response.data.message };
    }
};

export default authLogOut;
