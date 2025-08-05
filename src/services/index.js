import getAVideo from './getAVideo';
import videos from './listVideoServices';
import comment from './comments';
import authLogin from './authLogin';
import authLogOut from './authLogOut';
import authSignUp from './authSignUp';
import postComment from './postComment';
import { likeComment } from './likeComment';
import { unLikeComment } from './unLikeComment';
const config = {
    videos,
    getAVideo,
    comment,
    authLogin,
    authLogOut,
    authSignUp,
    postComment,
    likeComment,
    unLikeComment,
};

export default config;
