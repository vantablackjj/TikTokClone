import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ViewVideo.module.scss';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

import LoadingElement from '../LoadingElement';
import Header from './Header';
import Image from '../Image';
import VideoAction from './Video/VideoAction';
import Video from './Video';
import HeadlessTippy from '@tippyjs/react';
import AccountPreview from '../SuggestedAccounts/AccountPreview';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import Button from 'src/components/Button';
const cx = classNames.bind(styles);

function VideoItems({ data = [], page, setPage = () => {}, isLoadingComment, setIsLoadingComment = () => {} }) {
    const [visibleIndex, setVisibleIndex] = useState(null);
    const hideTimeoutRef = useRef();

    const renderPreview = (items) => (props) => {
        return (
            <div
                className={cx('preview')}
                tabIndex="-1"
                {...props}
                onMouseEnter={() => clearTimeout(hideTimeoutRef.current)}
                onMouseLeave={() => handleMouseLeave}
            >
                <PopperWrapper>
                    <AccountPreview data={items} />
                </PopperWrapper>
            </div>
        );
    };
    console.log(page);
    const handleMouseEnter = (index) => {
        clearTimeout(hideTimeoutRef.current);
        setVisibleIndex(index);
    };

    const handleMouseLeave = () => {
        hideTimeoutRef.current = setTimeout(() => {
            setVisibleIndex(null);
        }, 1000);
    };

    return (
        <div className={cx('container')}>
            {data.map((items, index) =>
                !items ? (
                    <LoadingElement className={cx('loading')} width="100%" height="100%" borderRadius="8px" />
                ) : (
                    <div key={items.id} className={cx('video-items')}>
                        <HeadlessTippy
                            visible={visibleIndex === index} // manually show when hovered
                            onClickOutside={() => setVisibleIndex(null)} // hide when clicked outside
                            key={Math.random()}
                            interactive
                            render={renderPreview(items)}
                            placement="bottom-start"
                            appendTo={document.body}
                            delay={[500, 100]}
                        >
                            <Link
                                className={cx('avatar')}
                                onMouseEnter={() => handleMouseEnter(index)} // show tooltip
                                onMouseLeave={handleMouseLeave}
                            >
                                <Image className={cx('avatar-user')} src={items?.user?.avatar} />
                            </Link>
                        </HeadlessTippy>

                        <div className={cx('container')}>
                            <Header data={items} />
                            <div className={cx('main-video')}>
                                <Video data={items} index={index} />
                                <VideoAction data={items} index={index} />
                            </div>
                        </div>
                    </div>
                ),
            )}

            <div className={cx('load-more-overlay')}>
                <div className={cx('load-more')}>
                    <Button
                        className={cx('back')}
                        disabled={isLoadingComment}
                        onClick={() => {
                            setIsLoadingComment(true);
                            setPage((prev) => prev - 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        Prev
                    </Button>
                    <Button
                        className={cx('more')}
                        onClick={() => {
                            setIsLoadingComment(true);
                            setPage((prev) => prev + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        Load More
                    </Button>
                </div>
            </div>
        </div>
    );
}

VideoItems.propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
};

export default VideoItems;
