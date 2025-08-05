import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Auth({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

Auth.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Auth;
