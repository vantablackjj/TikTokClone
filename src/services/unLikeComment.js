import * as callPath from '../utils/http';

export const unLikeComment = async (id, token) => {
    try {
        const res = await callPath.post(`comments/${id}/unlike`, [], {
            headers: {
                Authorization: token,
            },
        });

        return res.data;
    } catch (err) {
        return { Error: err.response.status };
    }
};
