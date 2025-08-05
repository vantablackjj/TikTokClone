import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignIn,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import 'tippy.js/dist/tippy.css';
import styles from './Header.module.scss';
import images from '~/access/images';
import Menu from 'src/components/Popper/Menu';
import { UploadIcon, MessageIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

import { UserAuth } from 'src/components/Store/AuthContext';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'FeedBack and Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Key Board Shortcuts',
    },
];

function Header() {
    const { tokenStr, userAuth, setOpenFormLogin } = UserAuth();
    const navigate = useNavigate();
    //Handle Logic
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    console.log(tokenStr);
    console.log(userAuth);
    const handleLogIn = () => {
        tokenStr && userAuth ? navigate('/upload') : setOpenFormLogin(true);
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: '/@profile',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            separate: true,
            component: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="logo"></img>
                    </Link>
                </div>

                <Search />

                <div className={cx('actions')}>
                    {tokenStr && userAuth ? (
                        <>
                            <Tippy content="Upload video" placement="bottom" delay={[0, 150]}>
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Message" placement="bottom" delay={[0, 150]}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom" delay={[0, 150]}>
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload </Button>
                            <Button onClick={handleLogIn} primary rightIcon={<FontAwesomeIcon icon={faSignIn} />}>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={tokenStr && userAuth ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {tokenStr && userAuth ? (
                            <Image
                                className={cx('user-avatar')}
                                alt="Avt"
                                src="https://th.bing.com/th/id/OIP.FMVlBgSR1yIERWA4IThsmwHaEo?w=234&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                                // Error src=""
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
