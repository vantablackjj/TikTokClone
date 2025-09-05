import classNames from 'classnames/bind';
import styles from './FullScreen.module.scss';
import { useState, useEffect, useCallback } from 'react';

import { UserAuth } from '../Store/AuthContext';
import { UserVideo } from '../Store/VideoContext';
import config from 'src/services';
import Videos from './Videos';
import Comment from './Comment';

const cx = classNames.bind(styles);

function FullScreen() {
    const { positionVideo, setPositionVideo, setListVideos, listVideos } = UserVideo();
    const { setOpenFormLogin, tokenStr, userAuth } = UserAuth();

    const [videoData, setVideoData] = useState({});
    const [urlPath, setUrlPath] = useState();

    useEffect(() => {
        const tempId = listVideos[positionVideo]?.id;

        if (tempId) {
            window.history.replaceState(null, '', `/video/${tempId}`);

            setUrlPath(window.location.href);
        }
    }, [positionVideo, listVideos]);

    useEffect(() => {
        const handleKeyUp = (e) => {
            e.key === 'ArrowDown' &&
                setPositionVideo((prev) => (positionVideo >= listVideos.length - 1 ? positionVideo : prev + 1));
            e.key === 'ArrowUp' && setPositionVideo((prev) => (positionVideo <= 0 ? positionVideo : prev - 1));
        };

        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [positionVideo, listVideos]);

    useEffect(() => {
        const idVideo = listVideos[positionVideo]?.id;

        fetchApi(idVideo);
    }, [positionVideo, listVideos]);

    const fetchApi = async (idVideo) => {
        const data = await config.getAVideo(idVideo, tokenStr);

        setVideoData(data);
    };

    const handleNextIndex = useCallback(() => {
        setPositionVideo((prev) => (prev >= listVideos.length - 1 ? prev : prev + 1));
    }, [positionVideo, listVideos]);

    const handlePrevIndex = useCallback(() => {
        setPositionVideo((prev) => (prev <= 0 ? prev : prev - 1));
    }, [positionVideo, listVideos]);

    if (Object.keys(videoData).length === 0) {
        return;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-modal')}>
                <Videos
                    onPrevPage={handlePrevIndex}
                    onNextPage={handleNextIndex}
                    data={videoData}
                    index={positionVideo}
                    listVideos={listVideos}
                ></Videos>
                <Comment
                    urlPath={urlPath}
                    data={videoData}
                    idVideo={listVideos[positionVideo]?.id}
                    statePosition={[positionVideo, setPositionVideo]} //role?
                    listVideoState={[listVideos, setListVideos]} //role?
                ></Comment>
            </div>
        </div>
    );
}

export default FullScreen;
