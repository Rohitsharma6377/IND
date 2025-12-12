
import React from 'react';
import View from './view.jsx';

// Web mock of StatusBar. In native it would change the bar style.
// In web, maybe it changes the meta theme-color tag.

function StatusBar({ barStyle = 'default', backgroundColor, hidden = false }) {
    React.useEffect(() => {
        if (typeof document === 'undefined') return;

        // Attempt to set theme-color meta tag if backgroundColor provided
        if (backgroundColor) {
            let meta = document.querySelector('meta[name="theme-color"]');
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = 'theme-color';
                document.head.appendChild(meta);
            }
            meta.content = backgroundColor;
        }
    }, [backgroundColor]);

    return null;
}

export default StatusBar;
