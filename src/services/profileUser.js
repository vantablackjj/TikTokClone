import * as callPath from '../utils/http';

const profileUser = async (nickName) => {
    try {
        const res = await callPath.get(`/api/users/${nickName}`, null, {});

        return res.data;
    } catch (err) {
        return {
            err: err.response ? err.response.status : 'Network or unknown error',
        };
    }
};

export default profileUser;
