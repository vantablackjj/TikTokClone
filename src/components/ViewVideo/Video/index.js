import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { useState, useRef } from 'react';

import Image from '../../Image';
import PlayVideo from '../../Control/PlayVideo';
import VolumeVideo from '../../Control/VolumeVideo';
import { UserVideo } from 'src/components/Store/VideoContext';
import { UserAuth } from 'src/components/Store/AuthContext';
import InputSlider from '../../InputSlider';
const cx = classNames.bind(styles);

function Video({ data, index }) {
    const videoRef = useRef();

    const STEP = 0.0001;
    const MIN_VALUE = 0;
    const MAX_VALUE = Number(data.meta.playtime_seconds);
    const DEFAULT_VALUE = 0.7;

    const { mutedVideo, setMutedVideo, valueVolumn, setValueVolume } = UserVideo();

    const [timeValueVideo, setTimeValueVideo] = useState(MIN_VALUE);
    const [playVideo, setPlayVideo] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleChangeTimeCurrentVideo = (e) => {
        const currentTime = Number(e);

        setValueVolume(currentTime);

        videoRef.current.currentTime = currentTime;
    };

    const handlePlayVideo = (e) => {
        setPlayVideo((prev) => {
            return !prev;
        });
    };

    const handleChangeVolumn = (e) => {
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

    return (
        <div className={cx('container')}>
            <div className={cx('section-video')}>
                <div className={cx('card-video')}>
                    <div className={cx('container-video')}>
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
                            onchangeVolumn={handleChangeVolumn}
                            onClick={handleMuteVoice}
                            width="24px"
                            height="74px"
                            widthY="2px"
                            heigthY="48px"
                            backgroundWrapper="rgba(22, 24, 35, 0.34)"
                            isMute={mutedVideo ? true : false}
                            volumnValue={valueVolumn}
                        >
                            <div
                                className={cx('btn-control', {
                                    'input-control': true,
                                })}
                            ></div>
                        </VolumeVideo>
                        <InputSlider
                            min={MIN_VALUE}
                            max={MAX_VALUE}
                            step={STEP}
                            onChange={handleChangeTimeCurrentVideo}
                            borderRadius="0"
                            height="16px"
                            heightX="2px"
                            heightOver="4px"
                        ></InputSlider>
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
