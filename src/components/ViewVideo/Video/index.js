import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { useState, useRef, useEffect, useCallback } from 'react';
import { replace, useNavigate } from 'react-router-dom';

import Image from '../../Image';
import PlayVideo from '../../Control/PlayVideo';
import VolumeVideo from '../../Control/VolumeVideo';
import { UserVideo } from 'src/components/Store/VideoContext';
import { UserAuth } from 'src/components/Store/AuthContext';
import InputSlider from '../../InputSlider';
import { useVideoTime } from 'src/hooks';
import ContextMenu from '../../ContextMenu';

const cx = classNames.bind(styles);

function Video({ data, index }) {
    const videoRef = useRef();
    const navigate = useNavigate();
    const STEP = 0.0001;
    const MIN_VALUE = 0;
    const MAX_VALUE = Number(data.meta.playtime_seconds);
    const DEFAULT_VALUE = 0.7;

    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const { mutedVideo, setMutedVideo, valueVolume, setValueVolume, setPositionVideo, setIdVideo } = UserVideo();
    const { openFullVideo, setOpenFullVideo } = UserAuth();

    const [isContext, setIsContext] = useState(false);
    const [timeValueVideo, setTimeValueVideo] = useState(MIN_VALUE);
    const [playVideo, setPlayVideo] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const currentTime = useVideoTime(timeValueVideo);
    const durationTime = useVideoTime(data?.meta?.playtime_seconds);

    const hanldeGetVideo = () => {
        setIdVideo(data.id);
        setPositionVideo(index);
        setOpenFullVideo(true);

        navigate(`/video/${data.id}`, { replace: true });
    };

    //Handle event change time current video

    const handleChangeTimeCurrentVideo = (e) => {
        const currentTime = Number(e);

        setTimeValueVideo(currentTime);

        videoRef.current.currentTime = currentTime;
    };

    // Handle event toogle play video

    const handlePlayVideo = (e) => {
        setPlayVideo((prev) => {
            return !prev;
        });
        !playVideo ? videoRef.current.play() : videoRef.current.pause();
    };

    //Handle change volume video

    const handleChangeVolume = (e) => {
        setValueVolume(e);
    };

    const handleMuteVoice = (e) => {
        e.preventDefault();

        setMutedVideo((prev) => !prev);

        if (mutedVideo) {
            setValueVolume(DEFAULT_VALUE * 100);
        } else {
            setValueVolume(MIN_VALUE);
            videoRef.current.muted = true;
        }
    };

    // Hanle Context position

    const handleContext = (e) => {
        e.preventDefault();

        setPosition({
            x: e.nativeEvent.layerX,
            y: e.nativeEvent.layerY,
        });
        setIsContext((prev) => !prev);
    };

    //Handle  mute volume

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
    }, [setMutedVideo, valueVolume]);

    // update time

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => {
            setTimeValueVideo(video.currentTime);
        };
        video.addEventListener('timeupdate', updateTime);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
        };
    });

    useEffect(() => {
        if (mutedVideo) {
            videoRef.current.muted = true;
        } else {
            videoRef.current.muted = false;
        }
    }, [mutedVideo]);

    //Handle play video when scroll down

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.75,
        };
        const callBack = (entry) => {
            entry.forEach((entries) => {
                if (entries.isIntersecting) {
                    const playPromise = entries.target.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {}).catch((error) => {});
                    }

                    setPlayVideo(true);
                } else {
                    entries.target.pause();
                    setPlayVideo(false);
                }
            });
        };

        const observer = new IntersectionObserver(callBack, options);

        observer.observe(videoRef.current);

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isContext) return;

        const hanldeRemoveContext = () => {
            if (isContext) {
                setIsContext(false);
            }
        };

        window.addEventListener('click', hanldeRemoveContext);
        window.addEventListener('scroll', hanldeRemoveContext);
        window.addEventListener('keydown', hanldeRemoveContext);

        return () => {
            window.removeEventListener('click', hanldeRemoveContext);
            window.removeEventListener('scroll', hanldeRemoveContext);
            window.removeEventListener('keydown', hanldeRemoveContext);
        };
    }, [isContext]);

    return (
        <div onContextMenu={handleContext} className={cx('container')}>
            {isContext && <ContextMenu isVideo={data.id} positionX={position.x} positionY={position.y} />}
            <div className={cx('section-video')}>
                <div
                    className={cx('card-video', {
                        'video-horizontal': data.meta.video.resolution_x > data.meta.video.resolution_y ? true : false,
                        'video-vertical': data.meta.video.resolution_x < data.meta.video.resolution_y ? true : false,
                    })}
                >
                    <div onClick={hanldeGetVideo} className={cx('container-video')}>
                        <Image className={cx('poster')} src={data.thumb_url} alt={data.thumb_url}></Image>
                        <video className={cx('video')} src={data.file_url} preload="auto" loop ref={videoRef}></video>
                    </div>
                    <div className={cx('container-control')}>
                        <div
                            className={cx('btn-control', {
                                'play-control': true,
                            })}
                        >
                            <PlayVideo isPlay={playVideo} onClick={handlePlayVideo}></PlayVideo>
                        </div>
                        <VolumeVideo
                            className={cx('btn-control', {
                                'voice-control': true,
                            })}
                            onchangeVolume={handleChangeVolume}
                            onClick={handleMuteVoice}
                            // width="24px"
                            // height="74px"
                            widthY="3.5px"
                            heightY="55px"
                            bgWrapper="rgba(22, 24, 35, 0.34)"
                            isMute={mutedVideo ? true : false}
                            volumeValue={valueVolume}
                        >
                            <div
                                className={cx('btn-control', {
                                    'input-control': true,
                                })}
                            ></div>
                        </VolumeVideo>
                        <InputSlider
                            value={timeValueVideo}
                            min={MIN_VALUE}
                            max={MAX_VALUE}
                            step={STEP}
                            onChange={handleChangeTimeCurrentVideo}
                            borderRadius="2px"
                            heightX="5px"
                            height="5.5px"
                            heightOver="8px"
                        ></InputSlider>
                        <span className={cx('progress-time')}>
                            {currentTime.minutes + ':' + currentTime.seconds}/{'  '}
                            {durationTime.minutes + ':' + durationTime.seconds}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
};

export default Video;
