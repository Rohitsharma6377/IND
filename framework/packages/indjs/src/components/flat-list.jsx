import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import ScrollView from "./scroll-view.jsx";
import StyleSheet from "../apis/style-sheet.mjs";

const FlatList = forwardRef(
  (
    {
      data,
      renderItem,
      keyExtractor,
      ListHeaderComponent,
      ListFooterComponent,
      ListEmptyComponent,
      contentContainerStyle,
      numColumns = 1,
      horizontal = false,
      ...rest
    },
    ref,
  ) => {
    const Component = resolveElement("flatlist");

    if (Component === "div" || Component === "view") {
      // Web fallback implementation
      if (!data || data.length === 0) {
        if (ListEmptyComponent) {
          const Empty = React.isValidElement(ListEmptyComponent) ? (
            ListEmptyComponent
          ) : (
            <ListEmptyComponent />
          );
          return (
            <ScrollView
              contentContainerStyle={contentContainerStyle}
              horizontal={horizontal}
              ref={ref}
              {...rest}
            >
              {ListHeaderComponent &&
                (React.isValidElement(ListHeaderComponent) ? (
                  ListHeaderComponent
                ) : (
                  <ListHeaderComponent />
                ))}
              {Empty}
              {ListFooterComponent &&
                (React.isValidElement(ListFooterComponent) ? (
                  ListFooterComponent
                ) : (
                  <ListFooterComponent />
                ))}
            </ScrollView>
          );
        }
      }

      const items = data || [];
      const renderList = () => {
        return items.map((item, index) => {
          const key = keyExtractor
            ? keyExtractor(item, index)
            : index.toString();
          return (
            <React.Fragment key={key}>
              {renderItem({ item, index })}
            </React.Fragment>
          );
        });
      };

      const gridStyle =
        numColumns > 1 && !horizontal
          ? {
              display: "grid",
              gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
            }
          : {};
      const flatContentStyle = StyleSheet.flatten([
        contentContainerStyle,
        gridStyle,
      ]);

      return (
        <ScrollView
          contentContainerStyle={flatContentStyle}
          horizontal={horizontal}
          ref={ref}
          {...rest}
        >
          {ListHeaderComponent &&
            (React.isValidElement(ListHeaderComponent) ? (
              ListHeaderComponent
            ) : (
              <ListHeaderComponent />
            ))}
          {renderList()}
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
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={contentContainerStyle}
        numColumns={numColumns}
        horizontal={horizontal}
        {...rest}
      />
    );
  },
);

FlatList.displayName = "FlatList";
export default FlatList;
