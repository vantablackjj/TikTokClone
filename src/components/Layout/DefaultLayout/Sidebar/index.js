import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';

import Menu, { MenuItem } from './Menu';
import { HomeIcon, LiveIcon, UserGroupIcon } from '~/components/Icons';
import SuggestedAccounts from 'src/components/SuggestedAccounts';

const cx = classNames.bind(styles);

function Siderbar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} />
                <MenuItem title="Following" to={config.routes.following} icon={<UserGroupIcon />} />
                <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />} />
            </Menu>
            <SuggestedAccounts label="Suggested Accounts" />
            <SuggestedAccounts label="Following" />
        </aside>
    );
}

export default Siderbar;
