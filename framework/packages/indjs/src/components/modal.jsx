
import React, { forwardRef } from 'react';
import { resolveElement } from '../universal/resolve.js';
import StyleSheet from '../apis/style-sheet.mjs';
import ReactDOM from 'react-dom';

const Modal = forwardRef(({ children, visible, transparent, animationType, onRequestClose, style, ...rest }, ref) => {
    const Component = resolveElement('modal');

    if (Component === 'div' || Component === 'view') {
        if (!visible) return null;

        const modalStyle = {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: transparent ? 'transparent' : 'white',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            ...StyleSheet.flatten(style)
        };

        // Render as portal if possible
        const content = (
            <div ref={ref} style={modalStyle} {...rest}>
                {children}
            </div>
        );

        if (typeof document !== 'undefined') {
            return ReactDOM.createPortal(content, document.body);
        }
        return content;
    }

    return (
        <Component
            ref={ref}
            visible={visible}
            transparent={transparent}
            animationType={animationType}
            onRequestClose={onRequestClose}
            {...rest}
        >
            {children}
        </Component>
    );
});

Modal.displayName = 'Modal';
export default Modal;
