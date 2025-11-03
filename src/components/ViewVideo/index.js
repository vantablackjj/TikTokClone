import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ViewVideo.module.scss';
import { useState, useEffect } from 'react';

import VideoItems from './VideoItems';
import { UserVideo } from '../Store/VideoContext';
import { UserAuth } from '../Store/AuthContext';
import config from 'src/services';

const cx = classNames.bind(styles);

function ViewVideo({ type = '' }) {
    const categories = type;

    const [listVideoUser, setListVideoUser] = useState([]);

    const { listVideoHome, setListVideoHome, listVideos, setListVideos } = UserVideo();
    const { tokenStr } = UserAuth();
    const [page, setPage] = useState(1);
    const [isLoadingComment, setIsLoadingComment] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchApi = async () => {
            try {
                const data = await config.videos(categories, page, tokenStr ?? '', {
                    signal: controller.signal,
                });
                setIsLoadingComment(false);
                setListVideos(data);
                setListVideoHome(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error fetching videos:', error);
                }
            }
        };

        fetchApi();

        return () => controller.abort();
    }, [categories, tokenStr, page]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-video')}>
                <VideoItems
                    data={listVideos}
                    page={page}
                    setPage={setPage}
                    setIsLoadingComment={setIsLoadingComment}
                    isLoadingComment={isLoadingComment}
                ></VideoItems>
            </div>
        </div>
    );
}

ViewVideo.propTypes = {
    type: PropTypes.string,
};

export default ViewVideo;
