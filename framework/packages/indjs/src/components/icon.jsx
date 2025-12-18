import React, { forwardRef } from "react";
import Text from "./text.jsx";

/**
 * Universal Icon Component
 * Displays emoji icons consistently across platforms
 * Works on Web, Desktop (Electron), and Mobile (Capacitor)
 */
const Icon = forwardRef(({
    name,
    size = 'medium',
    className = '',
    style,
    ...props
}, ref) => {
    const sizeClasses = {
        small: 'text-2xl',
        medium: 'text-4xl',
        large: 'text-6xl',
        xlarge: 'text-8xl',
    };

    const finalClass = `${sizeClasses[size] || sizeClasses.medium} ${className}`.trim();

    return (
        <Text ref={ref} className={finalClass} style={style} {...props}>
            {name}
        </Text>
    );
});

Icon.displayName = "Icon";
export default Icon;
