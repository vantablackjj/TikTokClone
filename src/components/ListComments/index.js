import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ListComment.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import Wrapper from '../Popper/Wrapper';
import { useNavigate } from 'react-router-dom';

import LoadingElement from '../LoadingElement';
import Image from '../Image';
import { UserAuth } from '../Store/AuthContext';
import TextBox from '../TextBox';
import { LovedIcon, DeleteIcon, EditIcon, EllipsesHozironIcon, ReportIcon, LoveTransparencyIcon } from '../CustomIcon';
import config from 'src/services';
import { UserNotify } from '../Store/NotifyContext';
const cx = classNames.bind(styles);

function ListComments({ data = {}, id, isCreator = false, className, comment }) {
    const textareaRef = useRef();
    const navigate = useNavigate();

    const { setInfoNotify } = UserNotify();
    const { setOpenFullVideo, tokenStr, userAuth, setOpenFormLogin } = UserAuth();

    const [isLoadingComment, setIsLoadingComment] = useState(true);
    const [isEditText, setIsEditText] = useState(false);
    const [valueComments, setValueComments] = useState(data?.comment);
    const [timeUpdateComment, setTimeupdateComment] = useState(data?.created_at);
    const [likeComments, setLikeComments] = useState(data?.like);
    const [likeCounts, setLikeCounts] = useState(data?.likes_count);
    const [textValue, setTextValue] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoadingComment(true);
        }, [1000]);
        return () => clearTimeout(timeout);
    }, []);

    const handleChangeComment = (e) => {
        console.log('fired');
        setTextValue(e.target.value);
    };

    const handleCancleComment = (e) => {
        if (e.code === 'Escape') {
            e.preventDefault();
        } else if (e.code === 'Enter') {
            e.preventDefault();
            handleSubmitComment(e);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const res = await config.postComment(data?.id, textValue, tokenStr);
            if (res) {
                navigate(`/video/${data.id}`);
            }
            setInfoNotify({
                content: 'success',
                delay: 200,
                isNotift: true,
            });
        } catch (error) {
            setInfoNotify({
                content: 'failed',
                delay: 200,
                isNotift: true,
            });
        }
    };
    const handleEditComment = (value) => {
        setTextValue(value);
        setIsEditText(true);
    };
    const handleOpenFormDelete = (comment, id) => {};

    const handleLikeComment = async (id) => {
        if (likeComments) {
            const res = await config.unLikeComment(id, tokenStr);

            setLikeComments(res?.is_liked);
            setLikeCounts(res?.likes_count);
        } else {
            const res = await config.likeComment(id, tokenStr);

            setLikeComments(res?.is_liked);
            setLikeCounts(res?.likes_count);
        }
    };
    const handleOpenFormLogin = () => {
        setOpenFormLogin(true);
    };

    const handleDirectionPage = (data) => {
        setOpenFullVideo(false);
        window.history.replaceState(null, '', `/@${data.user.nickname}`);
    };

    return (
        <div className={cx('wrapper-comments')}>
            <div key={data?.id} className={cx('comments-items')}>
                {isLoadingComment ? (
                    <div>
                        <div className={cx('comment-container')}>
                            <div key={data?.id} className={cx('user-comment')}>
                                <Link
                                    to={`/@${data?.user?.nickname}`}
                                    className={cx('user-avatar')}
                                    onClick={() => handleDirectionPage(data)}
                                >
                                    <Image src={data?.user.avatar} alt={data?.user.nickname}></Image>
                                </Link>

                                {!isEditText ? (
                                    <div className={cx('user-info')}>
                                        <Link
                                            onClick={() => handleDirectionPage(data)}
                                            to={`/@${data?.user?.nickname}`}
                                            className={cx('nickname')}
                                        >
                                            {data?.user.nickname}
                                            {isCreator && <span className={cx('comment-creator')}> Creator </span>}
                                        </Link>

                                        <p className={cx('text-content')}>{valueComments}</p>

                                        <div className={cx('subcontent')}>
                                            <p className={cx('text-bottom')}>{timeUpdateComment}</p>
                                            <p
                                                className={cx('text-bottom', {
                                                    'actions-comments': true,
                                                })}
                                            >
                                                Reply
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('text-form')}>
                                        <TextBox
                                            ref={textareaRef}
                                            onClick={handleSubmitComment}
                                            onChange={handleChangeComment}
                                            onKeyDown={handleCancleComment}
                                            setTextValue={setTextValue}
                                            textValue={textValue}
                                        ></TextBox>
                                        <label className={cx('cancle-edit')} aria-label="Nhấn Esc để huỷ">
                                            Click Esc to <span onClick={() => setIsEditText(false)}>cancel</span>
                                        </label>
                                    </div>
                                )}
                            </div>
                            {!isEditText && (
                                <div className={cx('action-comments')}>
                                    <div className={cx('like-comment')}>
                                        <div className={cx('tippy-container')}></div>
                                        <div
                                            onClick={() =>
                                                tokenStr && userAuth
                                                    ? handleLikeComment(data?.id)
                                                    : handleOpenFormLogin()
                                            }
                                            className={cx('like-btn')}
                                        >
                                            {likeComments ? (
                                                <LovedIcon width="2rem" height="2rem" />
                                            ) : (
                                                <LoveTransparencyIcon />
                                            )}
                                        </div>
                                        <span className={cx('likes-count')}>{likeCounts}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={cx('loading-container')}>
                        <LoadingElement className={cx('loading-avatar')}></LoadingElement>
                        <div className={cx('load-content')}>
                            <LoadingElement className={cx('loading-info')}></LoadingElement>
                            <LoadingElement
                                className={cx('loading-des', {
                                    [className]: className && true,
                                })}
                            ></LoadingElement>
                            <LoadingElement className={cx('loading-time')}></LoadingElement>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

ListComments.propTypes = {
    data: PropTypes.object.isRequired,
    isCreator: PropTypes.bool,
    index: PropTypes.number,
    className: PropTypes.string,
    setDataComments: PropTypes.func,
    setCommensCount: PropTypes.func,
};
export default ListComments;
