import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import Button from '../../Button';
import { CommentIcon, FavouriteIcon, LoveIcon, ShareIcon } from '../../CustomIcon';

const cx = classNames.bind(styles);

function VideoAction({ data = {}, index }) {
    return (
        <div className={cx('container-actions')}>
            <div className={cx('actions-item')}>
                <Button className={cx('btn-action')}>
                    <LoveIcon className={cx('icon')}></LoveIcon>
                </Button>
                <p className={cx('info-count')}>{data?.likes_count}</p>
            </div>

            <div className={cx('actions-item')}>
                <Button className={cx('btn-action')}>
                    <CommentIcon className={cx('icon')}></CommentIcon>
                </Button>
                <p className={cx('info-count')}>{data?.comments_count}</p>
            </div>

            <div className={cx('actions-item')}>
                <Button className={cx('btn-action')}>
                    <FavouriteIcon className={cx('icon')}></FavouriteIcon>
                </Button>
                <p className={cx('info-count')}>{data?.likes_count}</p>
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
