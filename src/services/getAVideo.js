import * as callPath from '../utils/http';

const getAVideo = async (id, token) => {
    try {
        const data = await callPath.get(`/api/videos/${id}`, {
            headers: token
                ? {
                      Authorization: token,
                  }
                : {},
        });

        return data.data;
    } catch (err) {
        return {
            err: err.response ? err.response.status : 'Network or unknown error',
        };
    }
};

export default getAVideo;
