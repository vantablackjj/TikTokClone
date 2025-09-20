import * as callPath from 'src/utils/http';

const videos = async (type, page, token) => {
    try {
        const res = await callPath.get('/api/videos', {
            params: {
                type,
                page,
            },
            headers: { Authorization: token },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export default videos;
