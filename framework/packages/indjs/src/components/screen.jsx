import React, { forwardRef } from "react";
import View from "./view.jsx";

/**
 * Universal Screen Component
 * Full-height screen container with background
 * Works on Web, Desktop (Electron), and Mobile (Capacitor)
 */
const Screen = forwardRef(({ children, background = 'light', className = '', style, ...props }, ref) => {
    const finalClass = className.trim();

    return (
        <View ref={ref} className={finalClass} style={style} {...props}>
            {children}
        </View>
    );
});

Screen.displayName = "Screen";
export default Screen;
