
import React, { forwardRef } from 'react';
import View from './view.jsx';

const Switch = forwardRef(({ value = false, onValueChange, disabled = false, trackColor, thumbColor, style, className, ...rest }, ref) => {
    const handleChange = (e) => {
        if (onValueChange && !disabled) {
            onValueChange(e.target.checked);
        }
    };

    const trueTrackColor = trackColor?.true || '#81b0ff';
    const falseTrackColor = trackColor?.false || '#767577';
    const activeThumbColor = thumbColor || '#f4f3f4';

    const containerStyle = {
        position: 'relative',
        display: 'inline-block',
        width: 40,
        height: 24,
        opacity: disabled ? 0.5 : 1,
        ...style
    };

    return (
        <View ref={ref} style={containerStyle} className={className} {...rest}>
            <input
                type="checkbox"
                checked={value}
                onChange={handleChange}
                disabled={disabled}
                readOnly={!onValueChange}
                style={{
                    opacity: 0,
                    width: 0,
                    height: 0,
                    margin: 0
                }}
            />
            <span style={{
                position: 'absolute',
                cursor: disabled ? 'not-allowed' : 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: value ? trueTrackColor : falseTrackColor,
                borderRadius: 34,
                transition: '.4s'
            }}>
                <span style={{
                    position: 'absolute',
                    content: '""',
                    height: 16,
                    width: 16,
                    left: 4,
                    bottom: 4,
                    backgroundColor: activeThumbColor,
                    borderRadius: '50%',
                    transition: '.4s',
                    transform: value ? 'translateX(16px)' : 'translateX(0)'
                }} />
            </span>
        </View>
    );
});

Switch.displayName = 'Switch';
export default Switch;
