import * as callPath from '../utils/http';

const unFollow = async (id, token) => {
    try {
        const res = await callPath.post(`/api/users/${id}/unfollow`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export default unFollow;
