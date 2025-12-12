
import React, { forwardRef } from 'react';
import ScrollView from './scroll-view.jsx';
import View from './view.jsx';
import StyleSheet from '../apis/style-sheet.mjs';

const FlatList = forwardRef(({ data, renderItem, keyExtractor, ListHeaderComponent, ListFooterComponent, ListEmptyComponent, contentContainerStyle, numColumns = 1, horizontal = false, ...rest }, ref) => {

    if (!data || data.length === 0) {
        if (ListEmptyComponent) {
            const Empty = React.isValidElement(ListEmptyComponent) ? ListEmptyComponent : <ListEmptyComponent />;
            return (
                <ScrollView contentContainerStyle={contentContainerStyle} horizontal={horizontal} ref={ref} {...rest}>
                    {ListHeaderComponent && (React.isValidElement(ListHeaderComponent) ? ListHeaderComponent : <ListHeaderComponent />)}
                    {Empty}
                    {ListFooterComponent && (React.isValidElement(ListFooterComponent) ? ListFooterComponent : <ListFooterComponent />)}
                </ScrollView>
            );
        }
    }

    const items = data || [];

    const renderList = () => {
        return items.map((item, index) => {
            const key = keyExtractor ? keyExtractor(item, index) : index.toString();
            return (
                <React.Fragment key={key}>
                    {renderItem({ item, index })}
                </React.Fragment>
            );
        });
    };

    const gridStyle = numColumns > 1 && !horizontal ? { display: 'grid', gridTemplateColumns: `repeat(${numColumns}, 1fr)` } : {};
    const flatContentStyle = StyleSheet.flatten([contentContainerStyle, gridStyle]);

    return (
        <ScrollView contentContainerStyle={flatContentStyle} horizontal={horizontal} ref={ref} {...rest}>
            {ListHeaderComponent && (React.isValidElement(ListHeaderComponent) ? ListHeaderComponent : <ListHeaderComponent />)}
            {renderList()}
            {ListFooterComponent && (React.isValidElement(ListFooterComponent) ? ListFooterComponent : <ListFooterComponent />)}
        </ScrollView>
    );
});

FlatList.displayName = 'FlatList';
export default FlatList;
