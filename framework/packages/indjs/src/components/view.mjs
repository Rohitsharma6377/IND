
import React, { forwardRef } from 'react';

const View = forwardRef(({ children, style, className, as: Component = 'div', ...rest }, ref) => {
    const defaultStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexShrink: 0,
        position: 'relative',
        boxSizing: 'border-box',
        border: '0px solid black',
        margin: 0,
        padding: 0,
        minWidth: 0,
    };

    return (
        <Component ref={ref} style={{ ...defaultStyle, ...style }} className={className} {...rest}>
            {children}
        </Component>
    );
});

View.displayName = 'View';
export default View;
