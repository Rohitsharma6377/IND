import React, { forwardRef } from "react";
import View from "./view.jsx";

/**
 * Universal Container Component
 * Responsive container with max-width and centering
 * Works on Web, Desktop (Electron), and Mobile (Capacitor)
 */
const Container = forwardRef(({
    children,
    maxWidth = 'lg',
    className = '',
    fluid = false,
    padding = true,
    style,
    ...props
}, ref) => {
    const maxWidthClasses = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full'
    };

    const containerClass = fluid
        ? 'w-full'
        : `${maxWidthClasses[maxWidth] || maxWidthClasses.lg} mx-auto`;

    const paddingClass = padding ? 'px-4 py-12' : '';
    const finalClass = `${containerClass} ${paddingClass} ${className}`.trim();

    return (
        <View ref={ref} className={finalClass} style={style} {...props}>
            {children}
        </View>
    );
});

Container.displayName = "Container";
export default Container;
