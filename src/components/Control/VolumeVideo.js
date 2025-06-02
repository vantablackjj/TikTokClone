import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Control.module.scss';

import { VolumeIcon, VolumeMuteIcon } from '../CustomIcon';
import InputSlider from '../InputSlider';

const cx = classNames.bind(styles);

function VolumeVideo({
    height,
    width,
    heightY,
    widthY,
    isMute = false,
    onClick = () => {},
    onchangeVolume = () => {},
    className,
    volumeValue,
    bgWrapper = 'rgb(27, 27, 27)',
    widthIcon,
    heightIcon,
    x,
    y,
    borderRadius = '4px',
    heightThumb,
    widthThumb,
}) {
    const MIN_VALUE = 0;
    const MAX_VALUE = 100;
    const STEP = 0.0001;

    return (
        <div
            className={cx('volumn-wrapper', {
                [className]: className,
            })}
        >
            <div className={cx('control-wrapper')} onClick={onClick}>
                {isMute ? (
                    <VolumeIcon width={widthIcon} height={heightIcon}></VolumeIcon>
                ) : (
                    <VolumeMuteIcon width={widthIcon} height={heightIcon}></VolumeMuteIcon>
                )}
            </div>
            <div style={{ bottom: y, left: x }} className={cx('slider-container')}>
                <InputSlider
                    className={'volume-slider'}
                    onChange={onchangeVolume}
                    width={width}
                    height={height}
                    widthY={widthY}
                    heightY={heightY}
                    widthThumb={widthThumb}
                    heightThumb={heightThumb}
                    borderRadius={borderRadius}
                    bgWrapper={bgWrapper}
                    min={MIN_VALUE}
                    max={MAX_VALUE}
                    set={STEP}
                    isVertical
                    value={volumeValue}
                ></InputSlider>
            </div>
        </div>
    );
}

VolumeVideo.propTypes = {
    volumeValue: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    onChangeVolume: PropTypes.func.isRequired,
    widthThumb: PropTypes.string,
    heightThumb: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    heightY: PropTypes.string,
    widthY: PropTypes.string,
    widthIcon: PropTypes.string,
    heightIcon: PropTypes.string,
    x: PropTypes.string,
    y: PropTypes.string,
    bgWrapper: PropTypes.string,
    borderRadius: PropTypes.string,
    isMute: PropTypes.bool,
};

export default VolumeVideo;
