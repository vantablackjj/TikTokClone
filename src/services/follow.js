import * as callPath from '../utils/http';

const follow = async (id, token) => {
    try {
        const res = await callPath.post(`/api/users/${id}/follow`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export default follow;
