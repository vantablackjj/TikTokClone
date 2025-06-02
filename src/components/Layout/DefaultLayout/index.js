import classNames from 'classnames/bind';
import Header from 'src/components/Layout/components/Header';
import Siderbar from './Sidebar';
import styles from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('container')}>
                <Siderbar></Siderbar>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
