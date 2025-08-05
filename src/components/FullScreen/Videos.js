import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './FullScreen.module.scss';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UserAuth } from '../Store/AuthContext';
import { UserVideo } from '../Store/VideoContext';
import { UserNotify } from '../Store/NotifyContext';
import ContextMenu from '../ContextMenu';
import InputSlider from '../InputSlider';
import { useVideoTime } from '~/hooks';
import CloseTabs from '../Control/CloseTabs';
import Button from '../Button';
import { NavIcon } from '../CustomIcon';
import VolumeVideo from '../Control/VolumeVideo';
import PlayVideo from '../Control/PlayVideo';

const cx = classNames.bind(styles);

function Videos({ data, index, onPrevPage, onNextPage, listVideos }) {
    const { mutedVideo, setMutedVideo, valueVolume, setValueVolume } = UserVideo();
    const { infoNotify, setInfoNotify } = UserNotify();
    const { setOpenFullVideo } = UserAuth();

    const videoRef = useRef();
    const navigate = useNavigate();
    const { nickname } = useParams();

    const MIN = 0;
    const MAX = Number(data?.media?.playtime_seconds);
    const STEP = 0.00001;
    const DEFAULT_VALUE = 0.7;

    const [playVideo, setPlayVideo] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(false);
    const [timeValueVideo, setTimeValueVideo] = useState(MIN);
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });
    const [isContext, setIsContext] = useState(infoNotify.isNotify);

    const durationTime = useVideoTime(MAX);
    const currentTime = useVideoTime(timeValueVideo);

    const handleContext = (e) => {
        e.preventDefault();
        setPosition({
            x: e.nativeEvent.layerX,
            y: e.nativeEvent.layerY,
        });

        setIsContext((prev) => !prev);
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setOpenFullVideo(false);

                nickname ? navigate(`/${nickname}`) : navigate(`/`);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleChangeTime = (e) => {
        const currentTime = Number(e);

        setTimeValueVideo(currentTime);

        videoRef.current.currentTime = currentTime;
    };
    const handleDrag = () => {
        videoRef.current.pause();
    };
    const handleDrop = () => {
        videoRef.current.play();
    };
    const handleOthers = () => {
        if (isContext) {
            setIsContext(false);
        }
    };
    const handleClose = () => {
        setOpenFullVideo(false);

        nickname ? navigate(`/${nickname}`) : navigate(`/`);
    };
    const handleMuteVideo = () => {
        setMutedVideo((prev) => !prev);
        if (mutedVideo) {
            setValueVolume(DEFAULT_VALUE * 100);
        } else {
            setValueVolume(MIN);
            videoRef.current.muted = true;
        }
    };
    const handleChangeVolume = (e) => {
        const currentVolume = Number(e);

        setValueVolume(currentVolume);
        videoRef.current.valueVolume = currentVolume;
    };

    const handlePlayVideo = () => {
        setPlayVideo(setIsContext(false));
        !playVideo ? videoRef.current.play() : videoRef.current.pause();
    };
    //Handle volume the changing of volume
    useEffect(() => {
        if (Number(valueVolume) === 0) {
            setMutedVideo(true);

            videoRef.current.volume = Number(valueVolume) / 100;
            videoRef.current.muted = true;
        } else {
            setMutedVideo(false);

            videoRef.current.volume = Number(valueVolume) / 100;
            videoRef.current.muted = false;
        }
    }, [valueVolume]);

    //Handle update time in video
    useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            return;
        }
        const handleUpdateTime = () => {
            setTimeValueVideo(video.currentTime);
        };
        video.addEventListener('timeupdate', handleUpdateTime);
        return () => {
            video.removeEventListener('timeupdate', handleUpdateTime);
        };
    });

    //Check if video reach to the last or the first

    useEffect(() => {
        index <= 0 ? setIsFirstPage(true) : setIsFirstPage(false);
        index >= listVideos.length - 1 ? setIsLastPage(true) : setIsLastPage(false);
    }, [index, listVideos]);

    // Handle disapear logic of context

    useEffect(() => {
        document.addEventListener('scroll', handleOthers);
        document.addEventListener('keydown', handleOthers);
        document.addEventListener('click', handleOthers);

        return () => {
            document.removeEventListener('scroll', handleOthers);
            document.removeEventListener('keydown', handleOthers);
            document.removeEventListener('click', handleOthers);
        };
    }, [isContext]);

    return (
        <div className={cx('container-videos')}>
            <div className={cx('background-videos')} style={{ backgroundImage: `${data?.thumb_url}` }}></div>
            <div className={cx('wrapper-video')}>
                <div onContextMenu={handleContext} className={cx('card-video')}>
                    {isContext && (
                        <ContextMenu positionX={position.x} positionY={position.y} idVideo={data?.id}></ContextMenu>
                    )}
                    <video
                        muted
                        loop
                        ref={videoRef}
                        className={cx('video')}
                        poster={data?.thumb_url}
                        src={data?.file_url}
                        preload="auto"
                    />
                </div>
                <div className={cx('bar-progress')}>
                    <PlayVideo className={cx('play-icon')} isPlay={playVideo} onClick={handlePlayVideo}></PlayVideo>
                    <InputSlider
                        className={cx('slider-container')}
                        borderRadius="2px"
                        height="100%"
                        widthThumb="16px"
                        heightThumb="16px"
                        heightX="4px"
                        widthX="100%"
                        onChange={handleChangeTime}
                        onSeekStart={handleDrag}
                        onSeekEnd={handleDrop}
                        min={MIN}
                        max={MAX}
                        step={STEP}
                        value={timeValueVideo}
                    ></InputSlider>
                    <span className={cx('time-line')}>
                        {currentTime.minutes + ':' + currentTime.seconds}/
                        {durationTime.minutes + ':' + durationTime.seconds}
                    </span>
                    <div
                        className={cx('close-wrapper', {
                            'btn-direciton': true,
                        })}
                    ></div>
                    <CloseTabs className={cx('close-btn')} onClick={handleClose}></CloseTabs>
                </div>
                <div className={cx('directional')}>
                    <Button
                        disable={isFirstPage}
                        onClick={onPrevPage}
                        className={cx('btn-direction', {
                            'btn-prev': true,
                        })}
                    >
                        <NavIcon></NavIcon>
                    </Button>
                    <Button
                        disable={isLastPage}
                        onClick={onNextPage}
                        className={cx('btn-direction', {
                            'btn-next': true,
                        })}
                    >
                        <NavIcon></NavIcon>
                    </Button>
                </div>
                <div className={cx('sound')}>
                    <VolumeVideo
                        onClick={handleMuteVideo}
                        onChange={handleChangeVolume}
                        width="28px"
                        height="106px"
                        widthY="4px"
                        heightY="80px"
                        widthThumb="16px"
                        heightThumb="16px"
                        backgroundWrapper="rgba(84, 84, 84, 0.5)"
                        className={cx('btn-direction')}
                        isMute={mutedVideo}
                        valueVolume={valueVolume}
                    ></VolumeVideo>
                </div>
            </div>
        </div>
    );
}

Videos.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    onPrevPage: PropTypes.func,
    onNextPage: PropTypes.func,
    listVideos: PropTypes.array,
};

export default Videos;
