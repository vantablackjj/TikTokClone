import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ViewVideo.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import Header from './Header';
import Image from '../Image';
import VideoAction from './Video/VideoAction';
import Video from './Video';

const cx = classNames.bind(styles);

function VideoItems({ data = [] }) {
    const [followStatus, setFollowStatus] = useState(data.filter((i) => i.user.is_followed).map((i) => i.user.id));

    return (
        <div className={cx('container')}>
            {data.map((items, index) => (
                <div key={items.id} className={cx('video-items')}>
                    <Link className={cx('avatar')}>
                        <Image className={cx('avatar-user')} src={items.user.avatar} />
                    </Link>
                    <div className={cx('container')}>
                        <Header
                            data={items}
                            isFollow={followStatus.includes(items?.user?.id)}
                            setFollowStatus={setFollowStatus}
                        />
                        <div className={cx('main-video')}>
                            <Video data={items} index={index} />
                            <VideoAction data={items} index={index} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

VideoItems.propTypes = {
    data: PropTypes.array.isRequired,
};

export default VideoItems;
