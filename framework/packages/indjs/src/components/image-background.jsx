
import React, { forwardRef } from 'react';
import { resolveElement } from '../universal/resolve.js';
import StyleSheet from '../apis/style-sheet.mjs';

const ImageBackground = forwardRef(({ children, style, imageStyle, source, src, resizeMode = 'cover', ...rest }, ref) => {
    const Component = resolveElement('imagebackground');

    const imageSource = src || (source && source.uri) || '';

    if (Component === 'div' || Component === 'view') {
        const flatStyle = StyleSheet.flatten([
            {
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: `url(${imageSource})`,
                backgroundSize: resizeMode === 'stretch' ? '100% 100%' : resizeMode,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            },
            style
        ]);
        return (
            <div ref={ref} style={flatStyle} {...rest}>
                {children}
            </div>
        );
    }

    // React Native
    return (
        <Component
            ref={ref}
            style={style}
            imageStyle={imageStyle}
            source={source || { uri: src }}
            resizeMode={resizeMode}
            {...rest}
        >
            {children}
        </Component>
    );
});

ImageBackground.displayName = 'ImageBackground';
export default ImageBackground;
