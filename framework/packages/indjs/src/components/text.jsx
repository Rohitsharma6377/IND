
import React, { forwardRef } from 'react';
import StyleSheet from '../apis/style-sheet.mjs';

const Text = forwardRef(({ children, style, className, as: Component = 'span', ...rest }, ref) => {
    const defaultStyle = {
        position: 'relative',
        display: 'inline',
        margin: 0,
        padding: 0,
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSize: 14,
        color: 'black',
    };

    const flatStyle = StyleSheet.flatten([defaultStyle, style]);

    return (
        <Component ref={ref} style={flatStyle} className={className} {...rest}>
            {children}
        </Component>
    );
});

Text.displayName = 'Text';
export default Text;
