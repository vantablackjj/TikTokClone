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

    const currentUser = JSON.parse(localStorage.getItem('user-id'));
    useEffect(() => {
        try {
            const fetchApi = async () => {
                const result = await config.profileUser(`${nickname}`);
                console.log('Profile user data:', result);
                setUser(result);
            };
            fetchApi();
        } catch (err) {
            console.log(err);
        }
    }, [nickname]);

    return (
        <div className={cx('wrapper')}>
            {'@' + currentUser.nickname === nickname ? (
                <>
                    <Header data={user} isCurrentUser={true} />
                    <ListVideo data={user?.videos} isCurrentUser={true} />
                </>
            ) : (
                <>
                    <Header data={user} isCurrentUser={false} />
                    <ListVideo data={user?.videos} isCurrentUser={false} />
                </>
            )}
        </div>
    );
}

export default ViewProfile;
