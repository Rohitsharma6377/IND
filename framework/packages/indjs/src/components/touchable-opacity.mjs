
import React, { forwardRef } from 'react';
import View from './view.mjs';

const TouchableOpacity = forwardRef(({ activeOpacity = 0.2, style, children, onPress, disabled, ...rest }, ref) => {
    const [isPressing, setIsPressing] = React.useState(false);

    const handleStart = () => !disabled && setIsPressing(true);
    const handleEnd = () => setIsPressing(false);

    const computedStyle = {
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        opacity: isPressing ? activeOpacity : 1,
        transition: 'opacity 0.15s',
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

TouchableOpacity.displayName = 'TouchableOpacity';
export default TouchableOpacity;
