import * as callPath from 'src/utils/http';

const videos = async (type, page, token) => {
    try {
        const res = await callPath.get('/videos', {
            params: {
                type,
                page,
            },
            header: {
                Authorization: token,
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export default videos;
