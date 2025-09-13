import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import PropTypes from 'prop-types';
import AccountItem from './AccountItem';

import { useState } from 'react';

const cx = classNames.bind(styles);

function SuggestedAccount({ label, data = [] }) {
    const [showAll, setShowAll] = useState(false);

    const displayed = showAll ? data : data.slice(0, 5);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {displayed.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            {data.length > 5 && (
                <p className={cx('more-btn')} onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Show less' : 'See all'}
                </p>
            )}
        </div>
    );
}

SuggestedAccount.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccount;
