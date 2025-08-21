import getAVideo from './getAVideo';
import videos from './listVideoServices';
import comment from './comments';
import authLogin from './authLogin';
import authLogOut from './authLogOut';
import authSignUp from './authSignUp';
import postComment from './postComment';
import follow from './follow';
import unFollow from './unFollow';
import { likeComment } from './likeComment';
import { unLikeComment } from './unLikeComment';
import unLikeVideo from './unLikeVideo';
import likeVideo from './likeVideo';
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
    follow,
    unFollow,
    likeVideo,
    unLikeVideo,
};

export default config;
