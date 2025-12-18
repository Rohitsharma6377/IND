import React, { forwardRef } from "react";
import View from "./view.jsx";

/**
 * Universal Stack Component
 * Vertical or horizontal layout with spacing
 * Works on Web, Desktop (Electron), and Mobile (Capacitor)
 */
const Stack = forwardRef(({
    children,
    direction = 'vertical',
    spacing = 4,
    align = 'start',
    justify = 'start',
    className = '',
    style,
    ...props
}, ref) => {
    const finalClass = className.trim();

    return (
        <View ref={ref} className={finalClass} style={style} {...props}>
            {children}
        </View>
    );
});

Stack.displayName = "Stack";
export default Stack;
