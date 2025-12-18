import React, { forwardRef } from "react";
import View from "./view.jsx";

/**
 * Universal Grid Component
 * Responsive grid layout system
 * Works on Web, Desktop (Electron), and Mobile (Capacitor)
 */
const Grid = forwardRef(({
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

Grid.displayName = "Grid";
export default Grid;
