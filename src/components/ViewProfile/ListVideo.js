import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ViewProfile.module.scss';
import { useEffect, useState } from 'react';

import config from 'src/services';
import { UserVideo } from '../Store/VideoContext';
import { UserAuth } from '../Store/AuthContext';

const cx = classNames.bind(styles);

function ListVideo({ data = [], isCurrentUser }) {
    const { setOpenFullVideo, tokenStr } = UserAuth();
    const { likeVideo } = UserVideo();
    const [likedVideos, setLikedVideos] = useState([]);

    const [selectedTab, setSelectedTab] = useState('videos');

    useEffect(() => {
        const likeVideosIds = Object.keys(likeVideo)
            .filter((key) => likeVideo[key])
            .map(Number);

        if (likeVideosIds.length === 0) {
            return;
        }
        console.log('Like video IDs:', likeVideosIds);
        const fetchLikedVideos = async () => {
            try {
                const response = await Promise.all(likeVideosIds.map((id) => config.getAVideo(id, tokenStr)));
                setLikedVideos(response);
            } catch (error) {
                console.error('Error fetching liked videos:', error);
            }
        };
        fetchLikedVideos();
    }, [likeVideo, tokenStr]);

    return (
        <div className={cx('container')}>
            {isCurrentUser ? (
                <div className={cx('profile-videos')}>
                    <div className={cx('tabs')}>
                        <button
                            className={cx('tab', { active: selectedTab === 'videos' })}
                            onClick={() => setSelectedTab('videos')}
                        >
                            Your Videos
                        </button>
                        <button
                            className={cx('tab', { active: selectedTab === 'liked' })}
                            onClick={() => setSelectedTab('liked')}
                        >
                            Liked Videos
                        </button>
                    </div>

                    <div className={cx('video-grid')}>
                        {selectedTab === 'videos'
                            ? data.map((video) => (
                                  <div
                                      key={video.id}
                                      className={cx('video-item')}
                                      onClick={() => setOpenFullVideo(true)}
                                  >
                                      {video.file_url ? (
                                          <video className={cx('video')} src={video.file_url} muted loop />
                                      ) : (
                                          'No Video Available'
                                      )}
                                  </div>
                              ))
                            : likedVideos.map((video) => (
                                  <div
                                      key={video.id}
                                      className={cx('video-item')}
                                      onClick={() => setOpenFullVideo(true)}
                                  >
                                      {video.file_url ? (
                                          <video className={cx('video')} src={video.file_url} muted loop />
                                      ) : (
                                          'No Video Available'
                                      )}
                                  </div>
                              ))}
                    </div>
                </div>
            ) : (
                <div className={cx('wrapper-video')}>
                    {data.map((video, index) => (
                        <div key={index} className={cx('video-item')} onClick={() => setOpenFullVideo(true)}>
                            <video className={cx('video')} src={video.file_url} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListVideo;

ListVideo.propTypes = {
    data: PropTypes.object,
};
