
import React, { forwardRef } from 'react';
import View from './view.mjs';

const SafeAreaView = forwardRef(({ style, children, ...rest }, ref) => {
    const safeAreaStyle = {
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
        flex: 1,
        ...style
    };

    return (
        <View ref={ref} style={safeAreaStyle} {...rest}>
            {children}
        </View>
    );
});

SafeAreaView.displayName = 'SafeAreaView';
export default SafeAreaView;
