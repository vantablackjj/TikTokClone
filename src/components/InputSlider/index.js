import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './InputSlider.module.scss';
import Slider from 'react-input-slider';
import { useState, useEffect } from 'react';
const cx = classNames.bind(styles);

function InputSlider({
    className,
    borderRadius = '8px',
    width = '100%',
    height = '100%',
    heightX = '4px',
    widthX = '100%',
    heightY = '150px',
    widthY = '4px',
    heightOver = '6px',
    bgWrapper,

    bgThumb = 'rgba(255, 255, 255)',
    widthThumb = '12px',
    heightThumb = '12px',
    bgBar = 'rgba(255, 255, 255, 0.34)',
    bgProgress = 'rgba(255, 255, 255)',
    onChange = () => {},
    onSeekStart = () => {},
    onSeekEnd = () => {},
    pseudoProps = {},
    min = 0,
    max,
    value,
    step = 0.0001,
    isVertical = false,
}) {
    const [state, setState] = useState({ x: min, y: max });
    const [isOver, setIsOver] = useState(false);

    useEffect(() => {
        setState({
            x: value,
            y: value,
        });
    }, [value]);

    return (
        <div
            style={{ width: width, height: height, background: bgWrapper }}
            onMouseEnter={() => {
                setIsOver(true);
            }}
            onMouseLeave={() => {
                setIsOver(false);
            }}
            aria-label="Progress"
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            className={cx('slider-group', {
                [className]: className,
            })}
        >
            {isVertical ? (
                <Slider
                    styles={{
                        track: {
                            borderRadius: borderRadius,
                            width: widthY,
                            height: heightY,
                            backgroundColor: bgBar,
                            cursor: 'pointer',
                        },
                        active: {
                            borderRadius: borderRadius,
                            backgroundColor: bgProgress,
                            cursor: 'pointer',
                        },
                        thumb: {
                            background: bgThumb,
                            width: widthThumb,
                            height: heightThumb,
                            cursor: 'pointer',
                        },
                        disabled: {
                            opacity: 0.5,
                        },
                    }}
                    axis="y"
                    yreverse
                    y={state.y}
                    ymin={min}
                    ymax={max}
                    ystep={step}
                    onChange={({ y }) => {
                        onChange(y);
                        setState((state) => ({ ...state, y }));
                    }}
                />
            ) : (
                <Slider
                    styles={{
                        track: {
                            borderRadius: borderRadius,
                            width: widthX,
                            height: isOver ? heightOver : heightX,
                            backgroundColor: bgBar,
                            cursor: 'pointer',
                        },
                        active: {
                            borderRadius: borderRadius,
                            backgroundColor: bgProgress,
                            cursor: 'pointer',
                        },
                        thumb: {
                            opacity: isOver ? '1' : '0',
                            background: bgThumb,
                            width: widthThumb,
                            height: heightThumb,
                            cursor: 'pointer',
                        },
                        disabled: {
                            opacity: 0.5,
                        },
                    }}
                    onChange={({ x }) => {
                        onChange(x);
                        setState((state) => ({ ...state, x }));
                    }}
                    onDragStart={onSeekStart}
                    onDragEnd={onSeekEnd}
                    axis="x"
                    x={state.x}
                    xmin={min}
                    xmax={max}
                    xstep={step}
                />
            )}
        </div>
    );
}

export default InputSlider;
