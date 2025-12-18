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
    const directionClass = direction === 'horizontal' ? 'flex-row' : 'flex-col';
    const spacingClass = direction === 'horizontal' ? `space-x-${spacing}` : `space-y-${spacing}`;

    const alignClasses = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
    };

    const justifyClasses = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
    };

    const finalClass = `
    flex
    ${directionClass}
    ${spacingClass}
    ${alignClasses[align] || alignClasses.start}
    ${justifyClasses[justify] || justifyClasses.start}
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <View ref={ref} className={finalClass} style={style} {...props}>
            {children}
        </View>
    );
});

Stack.displayName = "Stack";
export default Stack;
