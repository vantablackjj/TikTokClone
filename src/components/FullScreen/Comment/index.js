import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Comment.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Image from '../../Image';
import Button from '../../Button';
import { UserVideo } from '../../Store/VideoContext';
import { UserNotify } from '../../Store/NotifyContext';
import { UserAuth } from '../../Store/AuthContext';
import { Wrapper } from '../../Popper';
import {
    LovedIcon,
    MusicIcon,
    CommentIcon,
    FavouriteIcon,
    EmbedIcon,
    FlyIcon,
    FacebookIcon,
    PhoneIcon,
    TwitterRoundIcon,
    CheckIcon,
    EllipsesHozironIcon,
} from '../../CustomIcon';
import ListComments from '../../ListComments';
import TextBox from '../../TextBox';
import config from '../../../services';

const cx = classNames.bind(styles);

const DATA_MENUS = [
    {
        title: 'Embed',
        type: 'Share',
        icon: <EmbedIcon />,
    },
    {
        title: 'Share with my friends',
        type: 'Share',
        icon: <FlyIcon />,
    },
    {
        title: 'Share with Facebook',
        type: 'Share',
        icon: <FacebookIcon width="2.4rem" height="2.4rem" />,
    },
    {
        title: 'Share with WhatsApp',
        type: 'Share',
        icon: <PhoneIcon />,
    },
    {
        title: 'Share with Twitter',
        type: 'Share',
        icon: <TwitterRoundIcon />,
    },
];

function Comment({ data = {}, urlPath = '', idVideo, statePosition = [], listVideoState = [] }) {
    const { setOpenFormLogin, tokenStr, userAuth } = UserAuth();
    const { likeVideo, setLikeVideo, likeCount, setLikeCount } = UserVideo();

    const [getDataComment, setGetDataComment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFollow, setIsFollow] = useState(data?.user?.is_followed);
    const [commentCount, setCommentCount] = useState(data?.comments_count || 0);
    const [success, setSuccess] = useState(false);

    const [listVideo, setListVideo] = listVideoState;
    const [positionVideo, setPositionVideo] = statePosition;

    const handleOpenFormDelete = () => {};

    //Handle take comment API
    useEffect(() => {
        const debugData = async () => {
            const data = await config.comment(idVideo, tokenStr);
            console.log('Fetched video data:', data);
        };
        debugData();
    }, [positionVideo, listVideo]);

    useEffect(() => {
        const fetchComments = async () => {
            if (!tokenStr && !userAuth) {
                return;
            }

            const data = await config.comment(idVideo, tokenStr);
            console.log('Fetched comment data:', data);
            setGetDataComment(data);
        };

        fetchComments();
    }, [listVideo, positionVideo]);

    //Handle Update like and follow state

    useEffect(() => {
        setIsFollow(data?.user?.is_followed);
        setLikeVideo(data?.is_liked);
        setLikeCount(data?.likes_count);
        setCommentCount(data?.comments_count || 0);
    }, [data]);

    return (
        <div className={cx('container-comment')}>
            <header className={cx('header-comment')}>
                <div className={cx('container-info')}>
                    <div className={cx('info-user')}>
                        <div className={cx('user')}>
                            <Link to={`/@${data?.user?.nickname}`} className={cx('avatar')}>
                                <Image src={data?.user?.avatar} alt={data?.user?.nickname}></Image>
                            </Link>
                            <div className={cx('name')}>
                                <Link to={`/@${data?.user?.nickname}`} className={cx('nickname-head')}>
                                    {data?.user?.nickname}
                                </Link>
                                <p className={cx('username')}>
                                    {data?.user?.first_name} {'   '} {data?.user?.last_name}
                                    <span>·</span>
                                    {data?.published_at && (
                                        <span className={cx('time')}>{data?.published_at.split(' ')[0]}</span>
                                    )}
                                </p>
                            </div>
                        </div>
                        {true ? (
                            <div>
                                <TippyHeadless
                                    delay={[0, 500]}
                                    placement="bottom-start"
                                    interactive
                                    arrow
                                    render={(attrs) => (
                                        <div className={cx('tippy-comment')} tabIndex="-1" {...attrs}>
                                            <Wrapper className={cx('container')}>
                                                <Button className={cx('video-setting')}>
                                                    {' '}
                                                    Setting private priority{' '}
                                                </Button>
                                                <Button
                                                    className={cx('video-setting')}
                                                    onClick={() => handleOpenFormDelete(data?.description, data?.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </Wrapper>
                                        </div>
                                    )}
                                >
                                    <Button className={cx('btn-more')}>
                                        <EllipsesHozironIcon />
                                    </Button>
                                </TippyHeadless>
                            </div>
                        ) : (
                            <Button
                                className={cx('btn-follow', {
                                    'btn-unfollow': isFollow,
                                })}
                                primary
                                medium
                            >
                                {isFollow ? 'Following' : 'Follow'}
                            </Button>
                        )}
                    </div>
                    <p className={cx('info-description')}>{data?.description}</p>
                    {data?.music && (
                        <div className={cx('info-music')}>
                            <MusicIcon></MusicIcon>
                            {data?.music}
                        </div>
                    )}
                </div>
                <div className={cx('container-action')}>
                    <div className={cx('action-video')}>
                        <div className={cx('handler')}>
                            <div className={cx('action')}>
                                <Button className={cx('btn-action')}>
                                    {likeVideo ? (
                                        <LovedIcon width="2rem" height="2rem" fill="red"></LovedIcon>
                                    ) : (
                                        <LovedIcon width="2rem" height="2rem" fill="white"></LovedIcon>
                                    )}
                                </Button>
                                <span className={cx('counts')}>{likeCount}</span>
                            </div>
                            <div className={cx('btn-action')}>
                                <Button>
                                    <CommentIcon width="2rem" height="2rem"></CommentIcon>
                                </Button>
                                <span className={cx('counts')}>{commentCount}</span>
                            </div>
                            <div className={cx('btn-action ')}>
                                <Button>
                                    <FavouriteIcon width="2rem" height="2rem"></FavouriteIcon>
                                </Button>
                                <span className={cx('counts')}>{data?.shares_count}</span>
                            </div>
                        </div>
                        <div className={cx('apps-share')}>
                            {DATA_MENUS.map((item, index) => (
                                <div key={index}>
                                    <Tippy interactive content={item.title} placement="top">
                                        <div className={cx('share-icon')}>{item.icon}</div>
                                    </Tippy>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('action-copy')}>
                        <p className={cx('link')}>{urlPath}</p>
                        <Button>
                            {!loading && !success && <span>Copy link</span>}
                            {loading && <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />}
                            {success && !loading && <CheckIcon width="2rem" height="2rem" fill="green"></CheckIcon>}
                        </Button>
                    </div>
                </div>
            </header>
            <aside className={cx('content')}>
                <div className={cx('container-content')}>
                    <div className={cx('tab-wrapper')}>
                        <div className={cx('tab-items')}>
                            <p className={cx('tab-title')}>
                                Comments
                                <span>({data?.comments_count})</span>
                            </p>
                        </div>
                    </div>
                    <div className={cx('wrapper-comments')}>
                        {getDataComment.map((item, index) => (
                            <ListComments data={item} id={index}></ListComments>
                        ))}
                    </div>
                </div>
            </aside>
            <footer className={cx('footer-comment')}>
                <div className={cx('container-footer')}>
                    <TextBox></TextBox>
                </div>
            </footer>
        </div>
    );
}

Comment.propTypes = {
    data: PropTypes.object,
    urlPath: PropTypes.string,
    idVideo: PropTypes.string,
    statePosition: PropTypes.array,
    listVideoState: PropTypes.array,
};

export default Comment;
