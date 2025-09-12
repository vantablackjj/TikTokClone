import * as CallPath from '../utils/http';

export const likeComment = async (id, token) => {
    try {
        const res = await CallPath.post(`/api/comments/${id}/like`, [], {
            headers: {
                Authorization: token,
            },
        });

        return res.data;
    } catch (err) {
        return { Error: err.response.status };
    }
};
