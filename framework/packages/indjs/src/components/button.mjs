
import React, { forwardRef } from 'react';
import View from './view.mjs';
import Text from './text.mjs';

const Button = forwardRef(({ title, onPress, color = '#2196F3', disabled = false, style, textStyle, ...rest }, ref) => {
    const buttonStyle = {
        backgroundColor: disabled ? '#dfdfdf' : color,
        padding: 8,
        borderRadius: 2,
        cursor: disabled ? 'not-allowed' : 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        ...style
    };

    const textCommonStyle = {
        color: disabled ? '#999' : 'white',
        textAlign: 'center',
        fontWeight: '500',
        textTransform: 'uppercase',
        ...textStyle
    };

    return (
        <View
            ref={ref}
            role="button"
            onClick={!disabled ? onPress : undefined}
            style={buttonStyle}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            {...rest}
        >
            <Text style={textCommonStyle}>{title}</Text>
        </View>
    );
});

Button.displayName = 'Button';
export default Button;
