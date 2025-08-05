import PropTypes from 'prop-types';
import styles from './Control.module.scss'
import classNames from 'classnames/bind';

import { CloseIcon } from '../CustomIcon';

const cx = classNames.bind(styles)

function CloseTabs({onClick=()=>{},className,width,height}) {
    return ( 
        <div
            onClick={onClick}
            className={cx('control-wrapper',{
                [className]:className,
            })}>
            <CloseIcon width={width} height={height} ></CloseIcon>
        </div>
     );
}

CloseTabs.propTypes = {
    onClick : PropTypes.func,
    classNames:PropTypes.string,
    width:PropTypes.string,
    height:PropTypes.string,
}

export default CloseTabs;