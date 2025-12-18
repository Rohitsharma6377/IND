import React, { forwardRef } from "react";
import Text from "./text.jsx";

/**
 * Universal Icon Component
 * Displays emoji icons consistently across platforms
 * Works on Web, Desktop (Electron), and Mobile (Capacitor)
 */
const Icon = forwardRef(({
    name,
    className = "",
    style,
    ...props
}, ref) => {
    const finalClass = className.trim();

    return (
        <Text ref={ref} className={finalClass} style={style} {...props}>
            {name}
        </Text >
    );
});

Icon.displayName = "Icon";
export default Icon;
