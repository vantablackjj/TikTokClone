import * as callPath from '../utils/http';

const getAVideo = async (id, token) => {
    try {
        const res = await callPath.get(`videos/${id}`, {
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

export default getAVideo;
