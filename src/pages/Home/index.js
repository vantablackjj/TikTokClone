import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from 'src/components/Popper';
import AccountPreview from 'src/components/SuggestedAccounts/AccountPreview/AccountPreview';

const cx = classNames.bind(styles);

function Home() {
    const renderPreview = (props) => {
        return (
            <div className={cx('preview')} {...props}>
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        );
    };
    return (
        <div className={cx('video-container')}>
            <div className={cx('user-info')}>
                <div>
                    <Tippy
                        interactive
                        delay={[800, 800]}
                        render={renderPreview}
                        placement="bottom-start"
                        appendTo={() => document.body}
                    >
                        <Image
                            className={cx('avatar')}
                            src="https://images3.alphacoders.com/132/thumbbig-1323165.webp"
                            alt="avatar"
                        />
                    </Tippy>
                </div>
                <div className={cx('user-details')}>
                    <span className={cx('user-name')}>
                        <strong>Vantablackj</strong>
                    </span>
                    <Button className={cx('follow-btn')} outline small>
                        {' '}
                        Follow{' '}
                    </Button>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('video-content')}>
                    <iframe
                        className={cx('video')}
                        src="https://www.youtube.com/watch?v=oNMevWPa0Ms.pdf&embedded=true"
                        frameborder="0"
                        allowfullscreen
                        title="hi"
                    ></iframe>

                    <p className={cx('caption')}></p>
                    <p className={cx('music')}></p>
                </div>

                <div className={cx('video-actions')}>
                    <button className={cx('action-btn')}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span></span>
                    </button>
                    <button className={cx('action-btn')}>
                        <FontAwesomeIcon icon={faCommentDots} />
                        <span></span>
                    </button>
                    <button className={cx('action-btn')}>
                        <FontAwesomeIcon icon={faShare} />
                        <span></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
