import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 uses createRoot
import App from './App';
import './global.css'; // Global CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
