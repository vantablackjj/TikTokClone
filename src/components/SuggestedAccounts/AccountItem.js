import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import AccountPreview from './AccountPreview/AccountPreview';
const cx = classNames.bind(styles);

function AccountItem() {
    const renderPreview = (props) => {
        return (
            <div className={cx('preview')} tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy interactive delay={[800, 0]} render={renderPreview} placement="bottom-start" offset={[-15, 0]}>
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://yt3.ggpht.com/Cj2dtcsSnJYLXgpz5bgmTsLR_buGtQle8UQgPCJBKuwNDNbxVud98zM5ul4cBTbeEVsJxRUmhF8=s88-c-k-c0x00ffffff-no-rj"
                        alt=""
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>VantablackJ</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>VantablackJ</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
