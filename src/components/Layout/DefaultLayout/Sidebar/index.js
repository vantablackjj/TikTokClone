import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config'; // for routes
import api from 'src/services'; // renamed for clarity
import Menu, { MenuItem } from './Menu';
import { HomeIcon, LiveIcon, UserGroupIcon } from '~/components/Icons';
import SuggestedAccounts from 'src/components/SuggestedAccounts';
import { UserAuth } from 'src/components/Store/AuthContext';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const [listFollowing, setListFollowing] = useState([]);
    const [listForYou, setListForYou] = useState([]);

    const { tokenStr } = UserAuth();

    useEffect(() => {
        if (!tokenStr) return;

        const fetchFollowing = async () => {
            try {
                const data = await api.videos('following', 1, tokenStr);
                setListFollowing(data);
            } catch (error) {
                console.error('Error fetching following videos:', error);
            }
        };

        fetchFollowing();
    }, [tokenStr]);

    useEffect(() => {
        const fetchForYou = async () => {
            try {
                const data = await api.videos('for-you', 1, '');
                setListForYou(data);
            } catch (error) {
                console.error('Error fetching for-you videos:', error);
            }
        };

        fetchForYou();
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} />
                <MenuItem title="Following" to={config.routes.following} icon={<UserGroupIcon />} />
                <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />} />
            </Menu>

            <SuggestedAccounts label="Suggested Accounts" data={listForYou} />
            <SuggestedAccounts label="Following" data={listFollowing} />
        </aside>
    );
}

export default Sidebar;
