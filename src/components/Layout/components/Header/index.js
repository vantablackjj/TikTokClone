import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCircleXmark,
    faE,
    faEarthAsia,
    faEllipsisVertical,
    faKeyboard,
    faMagnifyingGlass,
    faSign,
    faSignIn,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import 'tippy.js/dist/tippy.css';
import styles from './Header.module.scss';
import images from '~/access/images';
import Tippy from '@tippyjs/react/headless';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { icon } from '@fortawesome/fontawesome-svg-core';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
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
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 0);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo"></img>
                </div>
                <Tippy
                    interactive
                    //visible={searchResult.length > 0}
                    appendTo={document.body}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Account</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>
                <div className={cx('action')}>
                    <Button text>Upload </Button>
                    <Button primary rightIcon={<FontAwesomeIcon icon={faSignIn} />}>
                        Log in
                    </Button>

                    <Menu items={MENU_ITEMS}>
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
