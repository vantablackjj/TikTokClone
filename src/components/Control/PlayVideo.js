import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Control.module.scss';

import { PauseIcon, PlayIcon } from '../CustomIcon';

const cx = classNames.bind(styles);

function PlayVideo({ isPlay = false, onClick = () => {}, className, width, height }) {
    return (
        <div
            onClick={onClick}
            className={cx('control-wrapper', {
                [className]: className,
            })}
        >
            {isPlay ? (
                <PauseIcon width={width} height={height}></PauseIcon>
            ) : (
                <PlayIcon width={width} height={height}></PlayIcon>
            )}
        </div>
    );
}

PlayVideo.propTypes = {
    isPlay: PropTypes.bool,
    onClick: PropTypes.func,
    classNames: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default PlayVideo;
