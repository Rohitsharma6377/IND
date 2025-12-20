import React from 'react';
import { Provider } from 'react-redux';
import { store } from './utils/persistedStore';
import './styles/globals.css';

export default function App({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
