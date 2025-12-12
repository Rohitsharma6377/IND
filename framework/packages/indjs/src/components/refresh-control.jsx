
import React from 'react';
import ActivityIndicator from './activity-indicator.jsx';
import View from './view.jsx';

// Simple RefreshControl simulation
// In a real web app, pull-to-refresh is complex to implement purely with JS without native browser support or heavy libraries.
// This component simply shows the indicator if refreshing is true.
export default function RefreshControl({ refreshing, onRefresh, colors, tintColor, title, titleColor, ...rest }) {
    if (!refreshing) return null;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, width: '100%' }} {...rest}>
            <ActivityIndicator color={tintColor || (colors && colors[0])} />
        </View>
    );
}
