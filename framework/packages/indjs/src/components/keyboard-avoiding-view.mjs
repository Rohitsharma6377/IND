
import React, { forwardRef } from 'react';
import View from './view.mjs';

const KeyboardAvoidingView = forwardRef(({ behavior, contentContainerStyle, enabled = true, keyboardVerticalOffset = 0, style, children, ...rest }, ref) => {
    // On web, keyboard avoidance is mostly handled by the browser. 
    // We provide a passthrough compliant with the API.
    return (
        <View ref={ref} style={style} {...rest}>
            {children}
        </View>
    );
});

KeyboardAvoidingView.displayName = 'KeyboardAvoidingView';
export default KeyboardAvoidingView;
