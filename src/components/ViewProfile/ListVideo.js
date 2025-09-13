import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ViewProfile.module.scss';
import { PlayIcon } from '../CustomIcon';

import { UserAuth } from '../Store/AuthContext';

const cx = classNames.bind(styles);

function ListVideo({ data = [] }) {
    const { setOpenFullVideo } = UserAuth();

    return (
        <div className={cx('wrapper-video')}>
            {data.map((video, index) => (
                <div key={index} className={cx('video-item')} onClick={() => setOpenFullVideo(true)}>
                    <video className={cx('video')} src={video.file_url} />
                </div>
            ))}
        </div>
    );
}

export default ListVideo;

ListVideo.propTypes = {
    data: PropTypes.object,
};
