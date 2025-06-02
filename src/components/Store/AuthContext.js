import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export function UserAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [openFormLogin, setOpenFormLogin] = useState(false);

    const tokenStr = JSON.parse(localStorage.getItem('token')) ?? '';
    const userAuth = JSON.parse(localStorage.getItem('user-id')) ?? '';

    const value = {
        tokenStr,
        userAuth,
        setOpenFormLogin,
        openFormLogin,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
