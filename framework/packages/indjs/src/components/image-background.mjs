
import React, { forwardRef } from 'react';
import View from './view.mjs';
import Image from './image.mjs';

const ImageBackground = forwardRef(({ source, style, imageStyle, children, ...rest }, ref) => {
    return (
        <View ref={ref} style={{ position: 'relative', overflow: 'hidden', ...style }} {...rest}>
            <Image
                src={typeof source === 'string' ? source : (source && source.uri) || ''}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                    ...imageStyle
                }}
                alt=""
            />
            {children}
        </View>
    );
});

ImageBackground.displayName = 'ImageBackground';
export default ImageBackground;
