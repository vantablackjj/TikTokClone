import * as callPath from '../utils/http';

const follow = async (id, token) => {
    try {
        const res = await callPath.post(`users/${id}/follow`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (err) {
        return { errorCode: err.response.status };
    }
};

export default follow;
