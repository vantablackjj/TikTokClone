import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import AccountPreview from './AccountPreview/AccountPreview';
import Image from 'src/components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ data = {}, itemKey }) {
    const renderPreview = (props) => (
        <div className={cx('preview')} tabIndex="-1" {...props}>
            <PopperWrapper>
                <AccountPreview data={data} />
            </PopperWrapper>
        </div>
    );

    return (
        <div key={itemKey}>
            <Tippy
                interactive
                delay={[800, 800]}
                render={renderPreview}
                placement="bottom-start"
                appendTo={document.body}
            >
                <div className={cx('account-item')}>
                    <Image
                        className={cx('avatar')}
                        src={data?.user?.avatar}
                        alt={data?.user?.nickname || 'user avatar'}
                    />
                    <Link className={cx('item-info')} to={`/@${data?.user?.nickname}`}>
                        <p className={cx('nickname')}>
                            <strong>{data?.user?.nickname}</strong>
                            {data?.user?.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{data?.user?.first_name}</p>
                    </Link>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.shape({
        user: PropTypes.shape({
            avatar: PropTypes.string,
            bio: PropTypes.string,
            nickname: PropTypes.string,
            first_name: PropTypes.string,
            tick: PropTypes.bool,
        }),
    }),
    itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default AccountItem;
