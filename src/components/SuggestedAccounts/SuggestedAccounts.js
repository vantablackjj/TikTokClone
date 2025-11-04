import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import PropTypes from 'prop-types';
import AccountItem from './AccountItem';
import { useState, useMemo } from 'react';

const cx = classNames.bind(styles);

function SuggestedAccount({ label, data = [] }) {
    const [showAll, setShowAll] = useState(false);

    // remove duplicates by id
    const uniqueData = useMemo(() => {
        const seen = new Set();
        return data.filter((account) => {
            if (seen.has(account.user_id)) return false;
            seen.add(account.user_id);
            return true;
        });
    }, [data]);

    const displayed = showAll ? uniqueData : uniqueData.slice(0, 5);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {displayed.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            {uniqueData.length > 5 && (
                <p className={cx('more-btn')} onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Show less' : 'See all'}
                </p>
            )}
        </div>
    );
}

SuggestedAccount.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default SuggestedAccount;
