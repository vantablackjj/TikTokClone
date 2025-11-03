import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ViewProfile.module.scss';

import config from 'src/services';
import Image from 'src/components/Image';
import Button from 'src/components/Button';
import { UserVideo } from '../Store/VideoContext';
import { UserAuth } from '../Store/AuthContext';
import { UserNotify } from '../Store/NotifyContext';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Header({ data = {}, isCurrentUser }) {
    const { tokenStr } = UserAuth();
    const { follow, setFollow } = UserVideo();
    const { setInfoNotify } = UserNotify();

    const handleFollow = async (id) => {
        try {
            const followed = follow?.[id]; // now it's always defined

            let res;
            if (followed) {
                res = await config.unFollow(id, tokenStr);
                console.log('unfollow', res);
            } else {
                res = await config.follow(id, tokenStr);
                console.log('follow', res);
            }

            // Flip state manually
            setFollow((prev) => ({ ...prev, [id]: !followed }));

            setInfoNotify({
                content: !followed
                    ? `You are now following ${data?.nickname}`
                    : `You have unfollowed ${data?.nickname}`,
                delay: 2000,
                isNotify: true,
            });
        } catch (error) {
            console.error(error);
            setInfoNotify({
                content: 'Something went wrong.',
                delay: 2000,
                isNotify: true,
            });
        }
    };

    useEffect(() => {
        if (data?.id) {
            setFollow((prev) => ({
                ...prev,
                [data.id]: data.is_followed,
            }));
        }
    }, [data, setFollow]);

    return (
        <div className={cx('container')}>
            <div className={cx('information')}>
                <Image className={cx('avatar')} src={data?.avatar} alt={data?.nickname} />
                <div className={cx('info')}>
                    <h2 className={cx('name')}>{data?.nickname}</h2>
                    <span className={cx('username')}>
                        {data?.first_name} {data?.last_name}
                    </span>

                    {isCurrentUser ? (
                        <div>
                            <Button primary medium to="/settings">
                                Edit profile
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={() => {
                                if (tokenStr) handleFollow(data?.id);
                            }}
                            primary
                            medium
                        >
                            {follow[data?.id] ?? data?.is_followed ? 'Following' : 'Follow'}
                        </Button>
                    )}
                    <span className={cx('bio')}>{data?.bio || 'No Bio Yet'}</span>
                </div>
            </div>

            <div className={cx('state')}>
                <div>
                    <strong>{data?.followings_count}</strong> Following
                </div>
                <div>
                    <strong>{data?.followers_count}</strong> Followers
                </div>
                <div>
                    <strong>{data?.likes_count}</strong> Likes
                </div>
            </div>
        </div>
    );
}

export default Header;

Header.propTypes = {
    data: PropTypes.object,
};
