import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ViewVideo.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import config from 'src/services';
import { UserAuth } from '../Store/AuthContext';
import ButtonFollow from '../Button/ButtonFollow';
import { compileString } from 'sass';

const cx = classNames.bind(styles);

function Header({ data = {}, isFollow = false, setFollowStatus = () => {} }) {
    const { tokenStr, userAuth, setOpenFormLogin } = UserAuth();

    const [followUser, setFollowUser] = useState(isFollow);

    useEffect(() => {
        setFollowUser(isFollow);
    }, [isFollow]);

    useEffect(() => {}, [isFollow]);

    const handleOpenFormLogin = () => {
        setOpenFormLogin(true);
    };

    const handleToggleFollow = async (userId) => {
        if (followUser) {
            handleUnFollow(userId);
        } else {
            handleFollow(userId);
        }
    };

    const handleFollow = async (userId) => {
        // const res = await config.followUser(userId, tokenStr);

        setFollowUser(true);
        setFollowStatus((prev) => [...prev, userId]);
    };

    const handleUnFollow = async (useId) => {
        // const res = await config.unFollowUser(useId, tokenStr);

        setFollowUser(false);
        setFollowStatus((prev) => prev.filter((i) => i !== useId));
    };

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
                    <span className={cx('name-music')}></span>
                </div>
            </div>
            <ButtonFollow
                className={cx(isFollow ? 'btn-unfollow' : 'btn-follow')}
                onClick={() => handleToggleFollow(data?.user?.id)}
            ></ButtonFollow>
        </header>
    );
}

Header.propType = {
    data: PropTypes.object,
    isFollow: PropTypes.bool,
    setFollowStatus: PropTypes.func,
};

export default Header;
