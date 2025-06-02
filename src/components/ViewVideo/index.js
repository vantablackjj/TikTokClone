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

    const { listVideoHome, setListVideoHome, setListVideos } = UserVideo();
    const { tokenStr } = UserAuth();

    useEffect(() => {
        setListVideoUser(listVideoHome);
    }, [listVideoHome]);

    useEffect(() => {
        if (type === 'following') {
            const fetchApi = async () => {
                const data = await config.videos(categories, 1, tokenStr ?? '');

                setListVideos(data);
                setListVideoHome(data);
            };

            fetchApi();
        } else {
            const fetchApi = async () => {
                const data = await config.videos(categories, 1, tokenStr ?? '');

                setListVideos(data);
                setListVideoHome(data);
            };

            fetchApi();
        }
    }, [categories]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-video')}>
                <VideoItems data={listVideoUser}></VideoItems>
            </div>
        </div>
    );
}

ViewVideo.propTypes = {
    type: PropTypes.string,
};

export default ViewVideo;
