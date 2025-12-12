
import React, { forwardRef } from 'react';
import ScrollView from './scroll-view.jsx';
import View from './view.jsx';
import Text from './text.jsx';

const SectionList = forwardRef(({
    sections,
    renderItem,
    renderSectionHeader,
    keyExtractor,
    ListHeaderComponent,
    ListFooterComponent,
    ListEmptyComponent,
    contentContainerStyle,
    stickySectionHeadersEnabled = true, // Not fully implemented in web simply, but we can assume normal flow
    ...rest
}, ref) => {

    const sectionsData = sections || [];

    if (sectionsData.length === 0 && ListEmptyComponent) {
        const Empty = React.isValidElement(ListEmptyComponent) ? ListEmptyComponent : <ListEmptyComponent />;
        return (
            <ScrollView contentContainerStyle={contentContainerStyle} ref={ref} {...rest}>
                {ListHeaderComponent && (React.isValidElement(ListHeaderComponent) ? ListHeaderComponent : <ListHeaderComponent />)}
                {Empty}
                {ListFooterComponent && (React.isValidElement(ListFooterComponent) ? ListFooterComponent : <ListFooterComponent />)}
            </ScrollView>
        );
    }

    return (
        <ScrollView contentContainerStyle={contentContainerStyle} ref={ref} {...rest}>
            {ListHeaderComponent && (React.isValidElement(ListHeaderComponent) ? ListHeaderComponent : <ListHeaderComponent />)}
            {sectionsData.map((section, sectionIndex) => (
                <React.Fragment key={section.key || sectionIndex}>
                    {renderSectionHeader && renderSectionHeader({ section })}
                    {section.data.map((item, itemIndex) => {
                        const key = keyExtractor
                            ? keyExtractor(item, itemIndex)
                            : (item.key || `${sectionIndex}-${itemIndex}`);
                        return (
                            <React.Fragment key={key}>
                                {renderItem({ item, index: itemIndex, section })}
                            </React.Fragment>
                        );
                    })}
                </React.Fragment>
            ))}
            {ListFooterComponent && (React.isValidElement(ListFooterComponent) ? ListFooterComponent : <ListFooterComponent />)}
        </ScrollView>
    );
});

SectionList.displayName = 'SectionList';
export default SectionList;
