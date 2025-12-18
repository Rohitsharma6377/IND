import React, { forwardRef } from "react";
import View from "./view.jsx";

/**
 * Universal Card Component
 * Styled card container with shadow and rounded corners
 * Works on Web, Desktop (Electron), and Mobile (Capacitor)
 */
const Card = forwardRef(({
    children,
    className = '',
    variant = 'default',
    hoverable = false,
    padding = 'normal',
    style,
    ...props
}, ref) => {
    const variantClasses = {
        default: 'bg-white shadow-md',
        outlined: 'bg-white border-2 border-gray-200',
        elevated: 'bg-white shadow-xl',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
    };

    const paddingClasses = {
        none: '',
        small: 'p-4',
        normal: 'p-6',
        large: 'p-8'
    };

    const hoverClass = hoverable ? 'hover:shadow-xl transition-shadow cursor-pointer' : '';

    const finalClass = `
    rounded-lg
    ${variantClasses[variant] || variantClasses.default}
    ${paddingClasses[padding] || paddingClasses.normal}
    ${hoverClass}
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <View ref={ref} className={finalClass} style={style} {...props}>
            {children}
        </View>
    );
});

Card.displayName = "Card";
export default Card;
