import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from 'src/services';
import Header from './Header';
import ListVideo from './ListVideo';
import classNames from 'classnames/bind';
import styles from './ViewProfile.module.scss';

const cx = classNames.bind(styles);

function ViewProfile() {
    const { nickname } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const fetchApi = async () => {
                const result = await config.profileUser(`${nickname}`);
                setUser(result);
            };
            fetchApi();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header data={user} />
            <ListVideo data={user?.videos} />
        </div>
    );
}

export default ViewProfile;
