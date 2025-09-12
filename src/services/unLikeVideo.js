import * as callPath from '../utils/http';

const unLikeVideo = async (id, token) => {
    try {
        const res = await callPath.post(`/api/videos/${id}/unlike`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
        return res.data.data;
    } catch (err) {
        return {
            err: err.response ? err.response.status : 'Network or unknown error',
        };
    }
};

export default unLikeVideo;
