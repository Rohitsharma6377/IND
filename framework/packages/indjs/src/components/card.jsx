import React, { forwardRef } from "react";
import View from "./view.jsx";

/**
 * Universal Card Component
 * Styled card container with shadow and rounded corners
 * Works on Web, Desktop (Electron), and Mobile (Capacitor)
 */
const Card = forwardRef(({
    children,
    className = "",
    style,
    ...props
}, ref) => {
    const finalClass = className.trim();

    return (
        <View ref={ref} className={finalClass} style={style} {...props}>
            {children}
        </View >
    );
});

Card.displayName = "Card";
export default Card;
