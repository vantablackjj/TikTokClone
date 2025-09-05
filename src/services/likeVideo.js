import * as callPath from '../utils/http';

const likeVideo = async (id, token) => {
    try {
        const res = await callPath.post(`videos/${id}/like`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data.data);
        return res.data.data;
    } catch (err) {
        return {
            err: err.response ? err.response.status : 'Network or unknown error',
        };
    }
};

export default likeVideo;
