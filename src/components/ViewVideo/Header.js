import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ViewVideo.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import config from 'src/services';
import { UserAuth } from '../Store/AuthContext';
import { UserVideo } from '../Store/VideoContext';
import Button from '../Button';

const cx = classNames.bind(styles);

function Header({ data = {}, isFollow = false }) {
    const { tokenStr, userAuth, setOpenFormLogin } = UserAuth();
    const { follow, setFollow } = UserVideo();

    const handleOpenFormLogin = () => {
        setOpenFormLogin(true);
    };

    const handleFollow = async (id) => {
        const followed = follow?.[id] ?? false;

        if (followed) {
            await config.unFollow(id, tokenStr);
            setFollow((prev) => ({ ...prev, [id]: false }));
        } else {
            await config.follow(id, tokenStr);
            setFollow((prev) => ({ ...prev, [id]: true }));
        }
    };
    useEffect(() => {
        const fetchInitState = async () => {
            if (!tokenStr) return;

            try {
                const res = await config.getAVideo(data.id, tokenStr);
                // or a dedicated endpoint returning is_liked

                setFollow((prev) => ({ ...prev, [data.user.id]: res?.user?.is_followed }));
            } catch (err) {
                console.error('Failed to fetch like state:', err);
            }
        };

        fetchInitState();
    }, [data.id, tokenStr]);
    return (
        <header className={cx('header-video')}>
            <div className={cx('infor')}>
                <div className={cx('name')}>
                    <Link to={`/@${data.user.nickname}`} className={cx('nickname')}>
                        {' '}
                        {data.user.nickname}
                    </Link>
                    <Link to={`/@${data.user.nickname}`} className={cx('usename')}>
                        {' '}
                        {`${data.user.first_name} ${data.user.last_name}`}
                    </Link>
                </div>
                <div className={cx('content')}>
                    <p className={cx('text-content')}>{data.description}</p>
                </div>
                <div className={cx('music')}>
                    <span className={cx('name-music')}>{data.music}</span>
                </div>
            </div>
            <Button
                onClick={() => (tokenStr && userAuth ? handleFollow(data?.user?.id) : handleOpenFormLogin)}
                className={cx('btn-follow', {
                    'btn-unfollow': follow?.[data?.user?.id],
                })}
                primary
                medium
            >
                {follow?.[data.user.id] ? 'Following' : 'Follow'}
            </Button>
        </header>
    );
}

Header.propType = {
    data: PropTypes.object,
};

export default Header;
