import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ContextMenu.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserNotify } from '../Store/NotifyContext';
import { UserAuth } from '../Store/AuthContext';
import { DeltailICon, DownloadIcon, LinkSmallIcon, PictureInPictureIcon, ShareIcon } from '../CustomIcon';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function ContextMenu({ idVideo, positionX, positionY }) {
    const location = useLocation();
    const navigate = useNavigate();

    const pathName = `/video/${idVideo}`;

    const { setInfoNotify } = UserNotify();
    const { openFullVideo, setOpenFullVideo } = UserAuth();

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText();

            setInfoNotify({
                context: 'Copied text!',
                delay: 1500,
                isNotify: true,
            });
        } catch (err) {
            setInfoNotify({
                content: 'Unable to copy',
                delay: 1500,
                isNotify: true,
            });
        }
    };
    const handleDownLoad = () => {
        setInfoNotify({
            content: 'Feature temporarily unavailable.',
            delay: 1500,
            isNotify: true,
        });
    };
    const handleShare = () => {
        setInfoNotify({
            content: 'Feature temporarily unavailable.',
            delay: 1500,
            isNotify: true,
        });
    };

    const handleSeeDetailVideo = () => {
        if (openFullVideo) {
            setOpenFullVideo(false);
        }
        navigate(`/video/${idVideo}`);
    };

    return (
        <div style={{ top: positionY, left: positionX }} className={cx('wrapper-menu')}>
            <ul className={cx('list-menu')}>
                <li onClick={handleDownLoad} className={cx('list-item')}>
                    <DownloadIcon></DownloadIcon>
                    <span className={cx('title-menu')}>DownLoad video</span>
                </li>

                <li onClick={handleShare} className={cx('list-item')}>
                    <ShareIcon width={'16px'}></ShareIcon>
                    <span className={cx('title-menu')}>Send friend</span>
                </li>

                <li onClick={handleCopyLink} className={cx('list-item')}>
                    <LinkSmallIcon></LinkSmallIcon>
                    <span className={cx('title-menu')}>Copy Link video</span>
                </li>
                <li onClick={location.pathname === pathName ? null : handleSeeDetailVideo} className={cx('list-item')}>
                    {location.pathname === pathName ? <PictureInPictureIcon /> : <DeltailICon />}
                    <span className={cx('title-menu')}>
                        {location.pathname === pathName ? 'PictureInPicture' : 'See detail video'}
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default ContextMenu;
