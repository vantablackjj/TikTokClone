import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Model.module.scss';
import Image from 'src/components/Image';
import config from 'src/services';
import { UserAuth } from '../Store/AuthContext';

const cx = classNames.bind(styles);

function Modal({ setIsEdit, isEdit, setUser = () => {}, user = {} }) {
    const safer = user || {};

    const { tokenStr } = UserAuth();
    const [Nickname, setNickname] = useState(safer.nickname || '');
    const [Bio, setBio] = useState(safer.bio || '');
    const [Avatar, setAvatar] = useState(safer.avatar || null);
    const [preview, setPreview] = useState(safer.avatar || '');

    const HandleChangeInfo = async (e) => {
        e.preventDefault();
        try {
            const userData = new FormData();
            userData.append('nickname', Nickname);
            userData.append('bio', Bio);
            if (Avatar instanceof File) {
                userData.append('avatar', Avatar);
            }
            const result = await config.updateUserInfo(userData, tokenStr);

            setIsEdit(false);
        } catch (err) {
            console.log(err);
        }
    };

    if (!isEdit) return null;

    return (
        <div className={cx('overlay')} onClick={() => setIsEdit(false)}>
            <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
                <h2 className={cx('title')}>Edit Profile</h2>
                <form className={cx('form')} onSubmit={HandleChangeInfo}>
                    <div className={cx('avatar-section')}>
                        <div className={cx('avatar-wrapper')}>
                            <Image src={preview} alt="Avatar" className={cx('avatar')} />
                            <label htmlFor="avatar" className={cx('avatar-label')}>
                                Change
                            </label>
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setAvatar(file);
                                    setPreview(URL.createObjectURL(file));
                                }}
                            />
                        </div>
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="nickname">Nickname</label>
                        <input
                            type="text"
                            id="nickname"
                            value={Nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="bio">Bio</label>
                        <textarea id="bio" rows="3" value={Bio} onChange={(e) => setBio(e.target.value)}></textarea>
                    </div>

                    <div className={cx('actions')}>
                        <button type="button" className={cx('cancel-btn')} onClick={() => setIsEdit(false)}>
                            Cancel
                        </button>
                        <button type="submit" className={cx('save-btn')}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
