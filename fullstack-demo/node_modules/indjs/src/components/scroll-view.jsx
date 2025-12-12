
import React, { forwardRef } from 'react';
import { resolveElement } from '../universal/resolve.js';
import StyleSheet from '../apis/style-sheet.mjs';

const ScrollView = forwardRef(({
    children,
    style,
    contentContainerStyle,
    horizontal = false,
    showsHorizontalScrollIndicator = true,
    showsVerticalScrollIndicator = true,
    className,
    ...rest
}, ref) => {
    const Component = resolveElement('scrollview');

    if (Component === 'div' || Component === 'view') { // Web fallback
        const containerStyle = {
            flex: 1,
            overflowX: horizontal ? 'auto' : 'hidden',
            overflowY: horizontal ? 'hidden' : 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: (horizontal ? !showsHorizontalScrollIndicator : !showsVerticalScrollIndicator) ? 'none' : 'auto',
            msOverflowStyle: (horizontal ? !showsHorizontalScrollIndicator : !showsVerticalScrollIndicator) ? 'none' : 'auto',
            ...StyleSheet.flatten(style)
        };
        const contentStyle = {
            display: 'flex',
            flexDirection: horizontal ? 'row' : 'column',
            ...StyleSheet.flatten(contentContainerStyle)
        };
        return (
            <div ref={ref} style={containerStyle} className={className} {...rest}>
                <div style={contentStyle}>{children}</div>
            </div>
        );
    }

    // React Native
    return (
        <Component
            ref={ref}
            style={style}
            contentContainerStyle={contentContainerStyle}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            className={className}
            {...rest}
        >
            {children}
        </Component>
    );
});

ScrollView.displayName = 'ScrollView';
export default ScrollView;
