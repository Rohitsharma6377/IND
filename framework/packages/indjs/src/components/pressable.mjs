
import React, { forwardRef } from 'react';
import View from './view.mjs';

const Pressable = forwardRef(({ children, style, onPress, onPressIn, onPressOut, disabled, ...rest }, ref) => {
    const [pressed, setPressed] = React.useState(false);

    const handlePressIn = (e) => {
        if (disabled) return;
        setPressed(true);
        if (onPressIn) onPressIn(e);
    };

    const handlePressOut = (e) => {
        if (disabled) return;
        setPressed(false);
        if (onPressOut) onPressOut(e);
    };

    const computedStyle = typeof style === 'function' ? style({ pressed }) : style;
    const computedChildren = typeof children === 'function' ? children({ pressed }) : children;

    return (
        <View
            ref={ref}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none', ...computedStyle }}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            onMouseDown={handlePressIn}
            onMouseUp={handlePressOut}
            onMouseLeave={handlePressOut}
            onTouchStart={handlePressIn}
            onTouchEnd={handlePressOut}
            onClick={!disabled ? onPress : undefined}
            {...rest}
        >
            {computedChildren}
        </View>
    );
});

Pressable.displayName = 'Pressable';
export default Pressable;
