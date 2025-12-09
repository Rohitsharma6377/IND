
import React, { cloneElement, Children } from 'react';

// TouchableWithoutFeedback just accepts onPress and passes it to the child
// It does not add any visual feedback.
const TouchableWithoutFeedback = ({ children, onPress, onPressIn, onPressOut, disabled, ...rest }) => {
    const child = Children.only(children);

    return cloneElement(child, {
        onClick: (e) => {
            if (!disabled && onPress) onPress(e);
            if (child.props.onClick) child.props.onClick(e);
        },
        onMouseDown: (e) => {
            if (!disabled && onPressIn) onPressIn(e);
            if (child.props.onMouseDown) child.props.onMouseDown(e);
        },
        onMouseUp: (e) => {
            if (!disabled && onPressOut) onPressOut(e);
            if (child.props.onMouseUp) child.props.onMouseUp(e);
        },
        onTouchStart: (e) => {
            if (!disabled && onPressIn) onPressIn(e);
            if (child.props.onTouchStart) child.props.onTouchStart(e);
        },
        onTouchEnd: (e) => {
            if (!disabled && onPressOut) onPressOut(e);
            if (child.props.onTouchEnd) child.props.onTouchEnd(e);
        },
        style: {
            cursor: disabled ? 'not-allowed' : 'pointer',
            ...child.props.style
        },
        ...rest
    });
};

export default TouchableWithoutFeedback;
