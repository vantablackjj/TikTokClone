import * as callPath from '../utils/http';

const profileUser = async (userData, accessToken) => {
    try {
        const res = await callPath.post('/api/auth/update-profile', userData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            Authorization: `Bearer ${accessToken}`,
            body: userData,
        });

        return res.data;
    } catch (err) {
        return {
            err: err.response ? err.response.status : 'Network or unknown error',
        };
    }
};

export default profileUser;
// https://api-gateway.fullstack.edu.vn/api/auth/update-profile
