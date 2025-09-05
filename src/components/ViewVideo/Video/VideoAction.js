import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { useEffect } from 'react';

import config from 'src/services';
import Button from '../../Button';
import { UserAuth } from '../../Store/AuthContext';
import { UserVideo } from '../../Store/VideoContext';
import { CommentIcon, LoveIcon, ShareIcon, LovedIcon } from '../../CustomIcon';

const cx = classNames.bind(styles);

function VideoAction({ data = {}, index }) {
    const { setLikeCount, setLikeVideo, likeVideo, likeCount } = UserVideo();
    const { tokenStr, userAuth, setOpenFullVideo, setOpenFormLogin } = UserAuth();

    const handleLikeVideo = async () => {
        try {
            let res;
            const liked = likeVideo?.[data.id] ?? data?.is_liked;

            if (liked) {
                res = await config.unLikeVideo(data.id, tokenStr);
                setLikeVideo((prev) => ({ ...prev, [data.id]: !!res?.is_liked }));
                setLikeCount((prev) => ({ ...prev, [data.id]: res?.likes_count }));
                console.log('fired');
            } else {
                res = await config.likeVideo(data.id, tokenStr);
                setLikeVideo((prev) => ({ ...prev, [data.id]: !!res?.is_liked }));
                setLikeCount((prev) => ({ ...prev, [data.id]: res?.likes_count }));
                console.log('fired-liked');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpenFormLogin = () => {
        setOpenFormLogin(true);
    };
    const handleOpenFullScreen = () => {
        setOpenFullVideo(true);
    };
    useEffect(() => {
        const fetchLikeState = async () => {
            if (!tokenStr) return;

            try {
                const res = await config.getAVideo(data.id, tokenStr);
                // or a dedicated endpoint returning is_liked
                setLikeVideo((prev) => ({ ...prev, [data.id]: !!res?.is_liked }));
                setLikeCount((prev) => ({ ...prev, [data.id]: res?.likes_count }));
            } catch (err) {
                console.error('Failed to fetch like state:', err);
            }
        };

        fetchLikeState();
    }, [data.id, tokenStr]);
    return (
        <div className={cx('container-actions')}>
            <div className={cx('actions-item')}>
                <Button
                    className={cx('btn-action')}
                    onClick={() => (tokenStr && userAuth ? handleLikeVideo() : handleOpenFormLogin())}
                >
                    {likeVideo?.[data.id] ? (
                        <LovedIcon key="loved" className={cx('icon')}></LovedIcon>
                    ) : (
                        <LoveIcon key="love" className={cx('icon')}></LoveIcon>
                    )}
                </Button>
                <p className={cx('info-count')}>{likeCount?.[data.id] ?? data?.likes_count}</p>
            </div>

            <div className={cx('actions-item')}>
                <Button className={cx('btn-action')} onClick={handleOpenFullScreen}>
                    <CommentIcon className={cx('icon')}></CommentIcon>
                </Button>
                <p className={cx('info-count')}>{data?.comments_count}</p>
            </div>

            <div className={cx('actions-item')}>
                <Button className={cx('btn-action')}>
                    <ShareIcon></ShareIcon>
                </Button>
                <p className={cx('info-count')}>{data?.shares_count}</p>
            </div>
        </div>
    );
}

export default VideoAction;
