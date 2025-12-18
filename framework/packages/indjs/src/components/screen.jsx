import React, { forwardRef } from "react";
import View from "./view.jsx";

/**
 * Universal Screen Component
 * Full-height screen container with background
 * Works on Web, Desktop (Electron), and Mobile (Capacitor)
 */
const Screen = forwardRef(({ children, background = 'light', className = '', style, ...props }, ref) => {
    const backgroundClasses = {
        light: 'bg-gradient-to-br from-gray-50 to-gray-100',
        dark: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white',
        primary: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white',
        white: 'bg-white',
        transparent: 'bg-transparent',
    };

    const finalClass = `min-h-screen ${backgroundClasses[background] || backgroundClasses.light} ${className}`.trim();

    return (
        <View ref={ref} className={finalClass} style={style} {...props}>
            {children}
        </View>
    );
});

Screen.displayName = "Screen";
export default Screen;
