import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export function UserAuth() {
    const context = useContext(AuthContext);
    return context;
}

export function AuthProvider({ children }) {
    const [openFormLogin, setOpenFormLogin] = useState(false);
    const [openFullVideo, setOpenFullVideo] = useState(false);
    const [openFormLogout, setOpenFormLogout] = useState(false);
    const [openFormEdit, setOpenFormEdit] = useState(false);
    const [openFormDiscard, setOpenFormDiscard] = useState(false);

    const tokenStr = JSON.parse(localStorage.getItem('user')) ?? '';
    const userAuth = JSON.parse(localStorage.getItem('user-id')) ?? '';

    const value = {
        tokenStr,
        userAuth,
        setOpenFormLogin,
        openFormLogin,
        setOpenFullVideo,
        openFullVideo,
        setOpenFormLogout,
        openFormLogout,
        setOpenFormEdit,
        openFormEdit,
        setOpenFormDiscard,
        openFormDiscard,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
