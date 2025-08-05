import * as callPath from '../utils/http';

const postComment = async (id, comment, token) => {
    try {
        const res = await callPath.post(
            `/videos/${id}/comments`,
            {
                comment,
            },
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export default postComment;
