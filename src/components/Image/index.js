import { forwardRef, useState } from 'react';
import images from '~/access/images';
import styles from './Image.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
const Image = forwardRef(({ src, alt, className, error: customError = images.noImage, ...props }, ref) => {
    const [error, setError] = useState('');

    const handleError = () => {
        setError(customError);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={error || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.string,
};

export default Image;
