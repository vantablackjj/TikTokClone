import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const VideoContext = React.createContext();

export function UserVideo() {
    return useContext(VideoContext);
}

export function VideoProvider({ children }) {
    const [likeCount, setLikeCount] = useState(0);

    const [likeVideo, setLikeVideo] = useState(false);
    const [idVideo, setIdVideo] = useState();
    const [positionVideo, setPositionVideo] = useState(null);
    const [listVideos, setListVideos] = useState([]);
    const [listVideoHome, setListVideoHome] = useState([]);
    const [mutedVideo, setMutedVideo] = useState(true);
    const [valueVolume, setValueVolume] = useState(0);
    const value = {
        listVideos,
        setListVideos,
        listVideoHome,
        setListVideoHome,
        mutedVideo,
        setMutedVideo,
        valueVolume,
        setValueVolume,
        positionVideo,
        setPositionVideo,
        idVideo,
        setIdVideo,
        likeVideo,
        setLikeVideo,
        likeCount,
        setLikeCount,
    };
    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

VideoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
