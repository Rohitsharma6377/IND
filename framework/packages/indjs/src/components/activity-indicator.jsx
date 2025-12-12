
import React, { forwardRef } from 'react';
import View from './view.jsx';

const ActivityIndicator = forwardRef(({ size = 'small', color = '#1976D2', style, className, ...rest }, ref) => {
    const sizePx = size === 'large' ? 36 : 20;

    const spinnerStyle = {
        display: 'inline-block',
        width: sizePx,
        height: sizePx,
        border: `2px solid ${color}`,
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'indjs-spin 0.75s linear infinite',
        ...style
    };

    return (
        <View ref={ref} style={{ alignItems: 'center', justifyContent: 'center' }} className={className} {...rest}>
            <style>{`
        @keyframes indjs-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
            <div style={spinnerStyle} />
        </View>
    );
});

ActivityIndicator.displayName = 'ActivityIndicator';
export default ActivityIndicator;
