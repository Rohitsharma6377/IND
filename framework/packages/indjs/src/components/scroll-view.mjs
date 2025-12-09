
import React, { forwardRef } from 'react';
import View from './view.mjs';

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
    const containerStyle = {
        flex: 1,
        overflowX: horizontal ? 'auto' : 'hidden',
        overflowY: horizontal ? 'hidden' : 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: (horizontal ? !showsHorizontalScrollIndicator : !showsVerticalScrollIndicator) ? 'none' : 'auto',
        msOverflowStyle: (horizontal ? !showsHorizontalScrollIndicator : !showsVerticalScrollIndicator) ? 'none' : 'auto',
        ...style
    };

    const contentStyle = {
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        ...contentContainerStyle
    };

    return (
        <View ref={ref} style={containerStyle} className={className} {...rest}>
            <div style={contentStyle}>
                {children}
            </div>
        </View>
    );
});

ScrollView.displayName = 'ScrollView';
export default ScrollView;
