import * as callPath from '../utils/http';

const comments = async (id, token) => {
    try {
        const res = await callPath.get(`/api/videos/${id}/comments`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (err) {
        return err;
    }
};

export default comments;
