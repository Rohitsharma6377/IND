import React, { forwardRef } from "react";
import View from "./view.jsx";

/**
 * Universal Grid Component
 * Responsive grid layout system
 * Works on Web, Desktop (Electron), and Mobile (Capacitor)
 */
const Grid = forwardRef(({
    children,
    columns = { default: 1, md: 2, lg: 3 },
    gap = 6,
    className = '',
    style,
    ...props
}, ref) => {
    const gridClass = `grid gap-${gap}`;

    let responsiveClass = '';

    if (typeof columns === 'number') {
        responsiveClass = `grid-cols-${columns}`;
    } else {
        const { default: defaultCols = 1, sm, md, lg, xl } = columns;
        responsiveClass = `grid-cols-${defaultCols}`;
        if (sm) responsiveClass += ` sm:grid-cols-${sm}`;
        if (md) responsiveClass += ` md:grid-cols-${md}`;
        if (lg) responsiveClass += ` lg:grid-cols-${lg}`;
        if (xl) responsiveClass += ` xl:grid-cols-${xl}`;
    }

    const finalClass = `${gridClass} ${responsiveClass} ${className}`.trim();

    return (
        <View ref={ref} className={finalClass} style={style} {...props}>
            {children}
        </View>
    );
});

Grid.displayName = "Grid";
export default Grid;
