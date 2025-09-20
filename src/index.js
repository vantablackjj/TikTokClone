import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { VideoProvider } from './components/Store/VideoContext';
import { AuthProvider } from './components/Store/AuthContext';
import { NotifyProvider } from './components/Store/NotifyContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
    <AuthProvider>
        <VideoProvider>
            <NotifyProvider>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </NotifyProvider>
        </VideoProvider>
    </AuthProvider>,
    // </React.StrictMode>,
);

reportWebVitals();
