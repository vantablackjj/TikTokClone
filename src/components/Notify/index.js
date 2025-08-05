import classNames from 'classnames/bind';
import styles from './Notify.module.scss'
import { useEffect, useState } from 'react';

import { UserNotify } from '../Store/NotifyContext';

const cx = classNames.bind(styles)

function Notify() {
    const { infoNotify } = UserNotify();

    const [isNotify,setisNotify] = useState(infoNotify.isNotify)
    const [isEndAnimate,setIsEndAnimate] = useState(false)


    const handleCloseNotify = ()=>{
        setisNotify(false)
    }
    useEffect(()=>{
        setisNotify(infoNotify.isNotify);
        setIsEndAnimate(false)

        const  timeoutEndAnimate = setTimeout(()=>{
            setIsEndAnimate(true)
        },infoNotify.delay)

        return ()=>{
            clearTimeout(timeoutEndAnimate)
        }
    },[infoNotify])

    return ( 
    <>
        {isNotify && (
            <div className={cx('wrapper-notify',{
                'hide-notify' : isEndAnimate,
            })} 
                onAnimationEnd={isEndAnimate ?handleCloseNotify : null}
            >
                <div className={cx('container-content')} >
                    <div className={cx('notify-container')} >
                        <span className={cx('text-content')} > {infoNotify.content|| "error"} </span>    
                    </div>
                </div>
            </div>
        )}
    </> 
    );
}

export default Notify;