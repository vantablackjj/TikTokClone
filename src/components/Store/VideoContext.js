import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const VideoContext = React.createContext();

export function UserVideo() {
    return useContext(VideoContext);
}

export function VideoProvider({ children }) {
    const [listVideos, setListVideos] = useState([]);
    const [listVideoHome, setListVideoHome] = useState([]);
    const [mutedVideo, setMutedVideo] = useState(true);
    const [valueVolumn, setValueVolume] = useState(0);
    const value = {
        listVideos,
        setListVideos,
        listVideoHome,
        setListVideoHome,
        mutedVideo,
        setMutedVideo,
        valueVolumn,
        setValueVolume,
    };
    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

VideoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
