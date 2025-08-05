import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormPages.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { UserNotify } from '../../Store/NotifyContext';
import { ShowPassIcon, HidePassIcon } from '../../CustomIcon';
import Button from '../../Button';
import config from 'src/services';

const cx = classNames.bind(styles);

function LoginWithDefault() {
    const { infoNotify, setInfoNotify } = UserNotify();
    const [valueAccount, setValueAccount] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [disabledSubmitted, setDisabledSubmitted] = useState(false);

    const handleChangeValueAccount = (e) => {
        if (e.target.value.startsWith('  ')) {
            return;
        }
        setValueAccount(e.target.value);
    };
    const handleChangeValuePassword = (e) => {
        if (e.target.value.startsWith('  ')) {
            return;
        }
        setValuePassword(e.target.value);
    };
    const handleShowPass = () => {
        setShowPass((prev) => !prev);
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await config.authLogin(valueAccount, valuePassword);
            console.log(data);
            if (data.errCode) {
                setInfoNotify({
                    content: 'Login failed',
                    delay: 2000,
                    isNotify: true,
                });
                setTimeout(() => {
                    setIsLoading(false);
                }, [300]);
            } else {
                setInfoNotify({
                    content: 'Login successfull',
                    delay: 1500,
                    isNotify: true,
                });
            }

            localStorage.setItem('user-id', JSON.stringify(data.data));
            localStorage.setItem('user', JSON.stringify(`Bearer ${data.meta.token}`));
        } catch (error) {
            console.error('Login error:', error);
            setInfoNotify({
                content: 'An error occurred during login',
                delay: 2000,
                isNotify: true,
            });
        }
        setTimeout(() => {
            setIsLoading(false);
            window.location.reload();
        }, 300);
    };
    useEffect(() => {
        if (valueAccount.trim() === '' || valuePassword.trim() === '') {
            setDisabledSubmitted(true);
        } else {
            setDisabledSubmitted(false);
        }
    }, [valueAccount, valuePassword]);

    return (
        <form action="" method="POST" className={cx('login-inner')}>
            <h1 className={cx('title')}>Log in</h1>
            <div className={cx('form')}>
                <div className={cx('des-form')}>
                    <p className={cx('type')}>Phone Number</p>
                    <span className={cx('link')}>Login by email or TikTok ID</span>
                </div>
                <div className={cx('container-form')}>
                    <div className={cx('form-input')}>
                        <input
                            value={valueAccount}
                            onChange={handleChangeValueAccount}
                            type="text"
                            placeholder="Phone Number"
                        />
                    </div>
                </div>
                <div className={cx('container-form')}>
                    <div className={cx('form-input')}>
                        <input
                            value={valuePassword}
                            onChange={handleChangeValuePassword}
                            type={showPass ? 'text' : 'password'}
                            placeholder="Password"
                            autoComplete="on"
                        />
                        <div className={cx('control-pass')} onClick={handleShowPass}>
                            {showPass ? <ShowPassIcon /> : <HidePassIcon />}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('forgot')}>
                <span>Forgot password?</span>
            </div>
            <Button
                className={cx('btn-submit')}
                onClick={handleLogin}
                disabled={disabledSubmitted ? true : false}
                type="submit"
                primary
                large
            >
                {isLoading ? <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> : <span>Log in</span>}
            </Button>
        </form>
    );
}

export default LoginWithDefault;
