
import React from 'react';
import ReactDOM from 'react-dom';
import View from './view.jsx';

function Modal({ visible, transparent, animationType = 'none', onRequestClose, children, style }) {
    if (!visible) return null;

    // Ideally this would portal content to document.body
    // But for SSR safety we need to check if document exists.
    if (typeof document === 'undefined') return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: transparent ? 'rgba(0,0,0,0.5)' : 'white',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        ...style
    };

    const content = (
        <View style={overlayStyle} aria-modal="true" role="dialog">
            {children}
        </View>
    );

    return ReactDOM.createPortal(content, document.body);
}

export default Modal;
