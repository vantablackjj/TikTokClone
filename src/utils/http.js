import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://proxyserver-to8a.onrender.com';
console.log('✅ BASE_URL used by axios:', BASE_URL);

const request = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const get = async (path, options = { withCredentials: true }) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, data, options = {}) => {
    const response = await request.post(path, data, options);
    return response.data;
};

export default request;
