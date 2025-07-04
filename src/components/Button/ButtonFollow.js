import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

import { UserAuth } from '../Store/AuthContext';
import Button from '.';

const cx = classNames.bind(styles);

function ButtonFollow({ onClick = () => {}, className, isFollowed }) {
    const { tokenStr, userAuth } = UserAuth();
    return (
        <div className={cx('container-btn')}>
            {!tokenStr && !userAuth ? (
                <Button onClick={onClick} primary>
                    Follow
                </Button>
            ) : (
                <Button className={cx(className)} onClick={onClick} primary>
                    {isFollowed ? 'Following' : 'Follow'}
                </Button>
            )}
        </div>
    );
}

ButtonFollow.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    isFollowed: PropTypes.bool,
};

export default ButtonFollow;
