import * as callPath from 'src/utils/http';

const getAVideo = async (id, token) => {
    try {
        const res = await callPath.get(`video/${id}`, {
            headers: {
                Authorization: token,
            },
        });
        console.log(res);
        return res.data;
    } catch (err) {
        return { errCode: err.respone.status };
    }
};

export default getAVideo;
