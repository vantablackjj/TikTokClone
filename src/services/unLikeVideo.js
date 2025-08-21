import * as callPath from '../utils/http';

const unLikeVideo = async (id, token) => {
    try {
        const res = await callPath.get(`videos/${id}unlike`, {
            headers: {
                Authorization: token,
            },
        });
        return res.data;
    } catch (err) {
        return {
            err: err.response ? err.response.status : 'Network or unknown error',
        };
    }
};

export default unLikeVideo;
