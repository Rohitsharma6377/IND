import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import ScrollView from "./scroll-view.jsx";
import View from "./view.jsx";
import Text from "./text.jsx";
import StyleSheet from "../apis/style-sheet.mjs";

const SectionList = forwardRef(
  (
    {
      sections,
      renderItem,
      renderSectionHeader,
      keyExtractor,
      ListHeaderComponent,
      ListFooterComponent,
      contentContainerStyle,
      stickySectionHeadersEnabled = true,
      ...rest
    },
    ref,
  ) => {
    const Component = resolveElement("sectionlist");

    if (Component === "div" || Component === "view") {
      // Web fallback
      const renderSections = () => {
        return (sections || []).map((section, sectionIndex) => {
          const data = section.data || [];
          const key = section.key || sectionIndex.toString();
          return (
            <React.Fragment key={key}>
              {renderSectionHeader && renderSectionHeader({ section })}
              {data.map((item, itemIndex) => {
                const itemKey = keyExtractor
                  ? keyExtractor(item, itemIndex)
                  : item.key || item.id || key + "-" + itemIndex;
                return (
                  <React.Fragment key={itemKey}>
                    {renderItem({ item, index: itemIndex, section })}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        });
      };

      return (
        <ScrollView
          contentContainerStyle={contentContainerStyle}
          ref={ref}
          {...rest}
        >
          {ListHeaderComponent &&
            (React.isValidElement(ListHeaderComponent) ? (
              ListHeaderComponent
            ) : (
              <ListHeaderComponent />
            ))}
          {renderSections()}
          {ListFooterComponent &&
            (React.isValidElement(ListFooterComponent) ? (
              ListFooterComponent
            ) : (
              <ListFooterComponent />
            ))}
        </ScrollView>
      );
    }

    // React Native
    return (
      <Component
        ref={ref}
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={contentContainerStyle}
        stickySectionHeadersEnabled={stickySectionHeadersEnabled}
        {...rest}
      />
    );
  },
);

SectionList.displayName = "SectionList";
export default SectionList;
