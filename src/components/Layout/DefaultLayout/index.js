import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { UserAuth } from '../../Store/AuthContext';
import styles from './DefaultLayout.module.scss';
import Siderbar from './Sidebar';
import Header from 'src/components/Layout/components/Header';
import Notify from '../../Notify';
import FullScreen from '../../FullScreen';
import Auth from '../../Auth';
import Login from '../../Auth/Login';
import Logout from '../../Auth/Logout';
import DeleteForm from '../../Auth/DeleteForm';
import DiscardForm from '../../Auth/DiscardForm';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { openFormLogin, openFullVideo, openFormLogout, openFormEdit, openFormDiscard } = UserAuth();

    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('container')}>
                <Siderbar></Siderbar>
                <div className={cx('content')}>{children}</div>
            </div>
            {(openFormLogin || openFormLogout || openFormEdit || openFormDiscard) && (
                <Auth>
                    {openFormLogin && <Login></Login>}
                    {openFormLogout && <Logout></Logout>}
                    {openFormEdit && <DeleteForm></DeleteForm>}
                    {openFormDiscard && <DiscardForm></DiscardForm>}
                </Auth>
            )}

            {openFullVideo && <FullScreen></FullScreen>}
            <Notify></Notify>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
