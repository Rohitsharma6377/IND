
import React, { forwardRef } from 'react';
import { resolveElement } from '../universal/resolve.js';
import StyleSheet from '../apis/style-sheet.mjs';

const Button = forwardRef(({ title, onPress, color, disabled, ...rest }, ref) => {
    const Component = resolveElement('button');

    if (Component === 'button' || Component === 'div') {
        const style = {
            backgroundColor: disabled ? '#ccc' : (color || '#2196F3'),
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: disabled ? 'default' : 'pointer',
            fontSize: '14px',
            textTransform: 'uppercase',
            fontWeight: '500',
        };

        return (
            <button
                ref={ref}
                style={style}
                onClick={onPress}
                disabled={disabled}
                {...rest}
            >
                {title}
            </button>
        );
    }

    return <Component ref={ref} title={title} onPress={onPress} color={color} disabled={disabled} {...rest} />;
});

Button.displayName = 'Button';
export default Button;
