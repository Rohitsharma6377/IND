import React, { forwardRef } from "react";
import View from "./view.jsx";

/**
 * Universal Container Component
 * Responsive container with max-width and centering
 * Works on Web, Desktop (Electron), and Mobile (Capacitor)
 */
const Container = forwardRef(({
    children,
    className = "",
    style,
    ...props
}, ref) => {
    const finalClass = className.trim();

    return (
        <View ref={ref} className={finalClass} style={style} {...props}>
            {children}
        </View >
    );
});

Container.displayName = "Container";
export default Container;
