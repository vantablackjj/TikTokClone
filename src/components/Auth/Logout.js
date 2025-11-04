import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { UserNotify } from '../Store/NotifyContext';
import { useNavigate } from 'react-router-dom';

import { UserAuth } from '../Store/AuthContext';
import Button from '../Button';
import { Wrapper } from '../Popper';
import config from 'src/services';

const cx = classNames.bind(styles);

function Logout() {
    const navigate = useNavigate();

    const { setInfoNotify } = UserNotify();
    const { setOpenFormLogout, tokenStr } = UserAuth();

    const handleCloseForm = () => {
        setOpenFormLogout(false);
    };

    const handleLogout = async () => {
        const data = await config.authLogOut(tokenStr);

        if (data.errCode) {
            setInfoNotify({
                content: 'Failed to log out',
                delay: 2000,
                isNotify: true,
            });
        } else {
            setInfoNotify({
                content: 'Log out successfully',
                delay: 1500,
                isNotify: true,
            });
            setTimeout(() => {
                localStorage.removeItem('user-id');
                localStorage.removeItem('user');
                window.location.reload();
                navigate('/');
            }, 1000);
        }
    };

    return (
        <div className={cx('form-container')}>
            <Wrapper className={cx('form-logout')}>
                <div className={cx('logout-content')}>
                    <h1 className={cx('title-logout')}>Bạn có chắc chắn muốn đăng xuất?</h1>
                    <div className={cx('btn-primary')}>
                        <Button onClick={handleCloseForm} className={cx('btn-form-logout')} large outline>
                            Hủy
                        </Button>
                        <Button
                            onClick={handleLogout}
                            className={cx('btn-form-logout', {
                                'logout-btn': true,
                            })}
                            large
                            outline
                        >
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}

export default Logout;
