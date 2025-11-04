import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from 'src/services';
import Header from './Header';
import ListVideo from './ListVideo';
import classNames from 'classnames/bind';
import styles from './ViewProfile.module.scss';

import Model from 'src/components/Model';
const cx = classNames.bind(styles);

function ViewProfile() {
    const { nickname } = useParams();
    const [user, setUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('user-id'));
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await config.profileUser(`${nickname}`);

                setUser(result);
            } catch (err) {
                console.log('Error fetching profile user data:', err);
            }
        };
        fetchApi();
    }, [nickname]);

    return (
        <div className={cx('wrapper')}>
            {'@' + currentUser.nickname === nickname ? (
                <>
                    <Header data={user} isCurrentUser={true} setIsEdit={setIsEdit} isEdit={isEdit} />
                    <ListVideo data={user?.videos} isCurrentUser={true} />
                    <Model setIsEdit={setIsEdit} isEdit={isEdit} user={user} setUser={setUser} />
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
