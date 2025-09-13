import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from 'src/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { UserVideo } from '../../Store/VideoContext';
import { UserAuth } from '../../Store/AuthContext';
import { UserNotify } from 'src/components/Store/NotifyContext';
import config from 'src/services';

const cx = classNames.bind(styles);

function AccountPreview({ data = {} }) {
    const { follow, setFollow, handleOpenFormLogin } = UserVideo();
    const { tokenStr, userAuth } = UserAuth();
    const { setInfoNotify } = UserNotify();
    const handleFollow = async (id) => {
        if (!tokenStr || !userAuth) {
            handleOpenFormLogin();
            return;
        }
        try {
            const followed = follow?.[id] ?? data?.user?.is_followed;

            if (followed) {
                const res = await config.unFollow(id, tokenStr);
                setFollow((prev) => ({ ...prev, [id]: res?.data?.is_followed }));
            } else {
                const res = await config.follow(id, tokenStr);
                setFollow((prev) => ({ ...prev, [id]: res?.data?.is_followed }));
            }

            // Notify based on local state
            setInfoNotify({
                content: !followed
                    ? `You are currently following ${data?.user?.nickname}`
                    : `You have unfollowed ${data?.user?.nickname}`,
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src={
                        data?.user?.avatar ||
                        'https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376f2ceadfa7b.png'
                    }
                    alt=""
                />

                <Button
                    onClick={() => (tokenStr && userAuth ? handleFollow(data?.user?.id) : handleOpenFormLogin)}
                    className={cx('btn-follow', {
                        'btn-unfollow': follow[data?.user?.id],
                    })}
                    primary
                    medium
                >
                    {follow[data?.user?.id] ? 'Following' : 'Follow'}
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data?.user?.nickname}</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>{data?.user?.first_name}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data?.user?.followers_count} </strong>
                    <span className={cx('label')}>Followers </span>
                    <strong className={cx('value')}>{data?.user?.likes_count} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
