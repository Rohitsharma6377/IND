
import React, { forwardRef, useState } from 'react';
import View from './view.jsx';

const TouchableHighlight = forwardRef(({ activeOpacity = 0.85, underlayColor = 'black', style, children, onPress, onShowUnderlay, onHideUnderlay, disabled, ...rest }, ref) => {
    const [isPressing, setIsPressing] = useState(false);

    const handleStart = () => {
        if (!disabled) {
            setIsPressing(true);
            if (onShowUnderlay) onShowUnderlay();
        }
    };

    const handleEnd = () => {
        if (!disabled) {
            setIsPressing(false);
            if (onHideUnderlay) onHideUnderlay();
        }
    };

    const computedStyle = {
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: isPressing ? activeOpacity : 1,
        backgroundColor: isPressing ? underlayColor : undefined, // This is a simplification; Real RN wraps child in view with background
        transition: 'opacity 0.15s, background-color 0.15s',
        ...style
    };

    return (
        <View
            ref={ref}
            style={computedStyle}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            onClick={!disabled ? onPress : undefined}
            {...rest}
        >
            {children}
        </View>
    );
});

TouchableHighlight.displayName = 'TouchableHighlight';
export default TouchableHighlight;
