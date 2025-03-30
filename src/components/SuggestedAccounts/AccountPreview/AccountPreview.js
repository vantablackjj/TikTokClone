import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from 'src/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://yt3.ggpht.com/vEJyTW02tUjpSzLWm9uGDhfXW8p3Fhq21nsVMjvCj-XnS7U8TyF2BO8yNBdC66KepCtQIngLyA=s88-c-k-c0x00ffffff-no-rj"
                    alt=""
                />

                <Button className={cx('follow-btn')} primary>
                    {' '}
                    Follow{' '}
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>VantablackJ</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>VantablackJ</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Followers </span>
                    <strong className={cx('value')}>8.23 </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
