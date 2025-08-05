import classNames from 'classnames/bind';
import styles from './FormPages.module.scss';

import { useState, useEffect } from 'react';
import { BackIcon } from '../../CustomIcon';
import {
    FacebookIcon,
    GoogleIcon,
    TwitterIcon,
    LineIcon,
    TalkIcon,
    PerSonIcon,
    QrIcon,
    AppleIcon,
} from '../../CustomIcon';
import Button from '../../Button';
import LoginWithDefault from './LoginWithDefault';
import LoginWithQr from './LoginWithQr';
import SignUp from './SignUp';

const cx = classNames.bind(styles);

const data = [
    {
        icon: <FacebookIcon />,
        title: 'Continue with Facebook',
        disabled: true,
    },
    {
        icon: <GoogleIcon />,
        title: 'Continue with Google',
        disabled: true,
    },
    {
        icon: <TwitterIcon />,
        title: 'Continue with Twitter',
        disabled: true,
    },
    {
        icon: <LineIcon />,
        title: 'Continue with LINE',
        disabled: true,
    },
    {
        icon: <TalkIcon />,
        title: 'Continue with KakaoTalk',
        disabled: true,
    },
];

const MENU_SIGNUP = {
    titleHeader: 'Sign up for TikTok',
    data: [
        {
            icon: <PerSonIcon />,
            title: 'Use phone or email',
            children: {
                title: 'Sign up',
                type: 'components',
                data: <SignUp />,
            },
        },
        ...data,
    ],
    titleFooter: 'Already have an account?',
    toLink: 'Log in',
};

const MENU_LOGIN = {
    titleHeader: 'Log in to TikTok',
    data: [
        {
            icon: <QrIcon />,
            title: 'Use QR code',
            disabled: true,
            children: {
                title: 'Log in',
                type: 'components',
                data: <LoginWithQr />,
            },
        },
        {
            icon: <PerSonIcon />,
            title: 'Phone number / Email / TikTok ID',
            children: {
                title: 'Log in',
                type: 'components',
                data: <LoginWithDefault />,
            },
        },
        ...data,
        {
            icon: <AppleIcon />,
            title: 'Continue with Apple',
            disabled: true,
        },
    ],
    policy: 'By continuing, you agree to TikTok’s Terms of Service and confirm that you have read TikTok’s Privacy Policy.',
    titleFooter: 'Don’t have an account?',
    toLink: 'Sign up',
};

function FormPages() {
    const [convertForm, setConvertForm] = useState(false);
    const [isFormLogin, setIsFormLogin] = useState(true);
    const [form, setForm] = useState(null);

    useEffect(() => {
        console.log(convertForm);
    }, [convertForm]);

    const handleBackMenu = () => {
        setConvertForm(false);
        console.log('called back menu');
    };
    const handleNextForm = (item) => {
        if (item.children) {
            setConvertForm(true);
            setForm(item.children);
        }
    };
    const onChangeForm = () => {
        setIsFormLogin(!isFormLogin);
    };

    const items = isFormLogin ? MENU_LOGIN : MENU_SIGNUP;

    return (
        <div className={cx('wrapper')}>
            {convertForm ? (
                <>
                    <div className={cx('back')}>
                        <BackIcon className={cx('back-icon')} onClick={handleBackMenu}></BackIcon>
                        {form.data}
                    </div>
                </>
            ) : (
                <>
                    <div className={cx('body')}>
                        <h1 className={cx('title')}>{items.titleHeader}</h1>
                        <div className={cx('main-form')}>
                            {items.data.map((item) => (
                                <Button
                                    onClick={() => handleNextForm(item)}
                                    key={item.title}
                                    disabled={item.disabled}
                                    className={cx('btn-form')}
                                >
                                    <span className={cx('icon')}>{item.icon}</span>
                                    <span className={cx('title')}>{item.title}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className={cx('policy')}>
                        <p className={cx('text-policy')}>{items.policy}</p>
                    </div>
                </>
            )}
            <div className={cx('footer-form')}>
                <p className={cx('advice')}>
                    {items.titleFooter}
                    <span onClick={onChangeForm} className={cx('to')}>
                        {items.toLink}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default FormPages;
