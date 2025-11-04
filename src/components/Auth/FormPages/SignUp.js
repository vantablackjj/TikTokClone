import classNames from 'classnames/bind';
import styles from './FormPages.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../Button';
import { HidePassIcon, ShowPassIcon } from '../../CustomIcon';
import config from 'src/services';
import { UserNotify } from '../../Store/NotifyContext';

const cx = classNames.bind(styles);

function SignUp() {
    const navigate = useNavigate();
    const { setInfoNotify } = UserNotify();

    const [checkEmail, setCheckEmail] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [valueAccount, setValueAccount] = useState('');
    const [valuePassword, setValuePassword] = useState('');

    const signUpPassWord = (e) => {
        if (e.target.value.startsWith('  ')) return;
        setValuePassword(e.target.value);
    };

    const signUpUserName = (e) => {
        if (e.target.value.startsWith('  ')) return;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
        setCheckEmail(isEmail ? 'email' : 'id');
        setValueAccount(e.target.value);
    };

    const onShow = () => setShowPass((prev) => !prev);

    const handleSignUp = async (e) => {
        e.preventDefault();

        // basic client-side validation
        if (!valueAccount || !valuePassword) {
            setInfoNotify({
                content: 'Please enter account and password',
                delay: 2000,
                isNotify: true,
            });
            return;
        }
        if (valuePassword.length < 6) {
            setInfoNotify({
                content: 'Password must be at least 6 characters long',
                delay: 2000,
                isNotify: true,
            });
            return;
        }

        try {
            const data = await config.authSignUp(valueAccount, valuePassword, checkEmail);

            if (data.errCode === 409) {
                setInfoNotify({
                    content: 'Email or TikTok ID already exists',
                    delay: 2000,
                    isNotify: true,
                });
            } else if (data.errCode) {
                setInfoNotify({
                    content: 'Sign up failed',
                    delay: 2000,
                    isNotify: true,
                });
            } else {
                setInfoNotify({
                    content: 'Sign up successfully',
                    delay: 1500,
                    isNotify: true,
                });
                navigate('/'); // ✅ only on success
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            setInfoNotify({
                content: 'An error occurred during sign up',
                delay: 2000,
                isNotify: true,
            });
        }
    };

    return (
        <div className={cx('login-inner')}>
            <h1 className={cx('title')}>Sign up</h1>
            <form className={cx('form')} onSubmit={handleSignUp}>
                <div className={cx('des-form')}>
                    <p className={cx('type')}>Email or TikTok ID</p>
                    <span className={cx('link')}>Sign up by email or TikTok ID</span>
                </div>
                <div className={cx('container-form')}>
                    <div className={cx('form-input')}>
                        <input type="text" placeholder="Email or TikTok ID" onChange={signUpUserName} required />
                    </div>
                </div>
                <div className={cx('container-form')}>
                    <div className={cx('form-input')}>
                        <input
                            onChange={signUpPassWord}
                            type={showPass ? 'text' : 'password'}
                            placeholder="Password"
                            autoComplete="on"
                            required
                        />
                        <div className={cx('control-pass')} onClick={onShow}>
                            {showPass ? <ShowPassIcon /> : <HidePassIcon />}
                        </div>
                    </div>
                </div>
                <Button type="submit" className={cx('btn-submit')} primary large>
                    Sign up
                </Button>
            </form>
        </div>
    );
}

export default SignUp;
