import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const TouchableHighlight = forwardRef(
  (
    {
      children,
      style,
      onPress,
      underlayColor = "black",
      activeOpacity = 0.85,
      ...rest
    },
    ref,
  ) => {
    const Component = resolveElement("touchablehighlight");

    if (Component === "button" || Component === "div") {
      const flatStyle = StyleSheet.flatten([{ cursor: "pointer" }, style]);

      // Simple web implementation: just opacity, mimicking overlay is harder without state
      return (
        <button
          ref={ref}
          style={flatStyle}
          onClick={onPress}
          onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = underlayColor;
            e.currentTarget.style.opacity = activeOpacity;
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.backgroundColor =
              flatStyle.backgroundColor || "transparent";
            e.currentTarget.style.opacity = 1;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              flatStyle.backgroundColor || "transparent";
            e.currentTarget.style.opacity = 1;
          }}
          {...rest}
        >
          {children}
        </button>
      );
    }

    return (
      <Component
        ref={ref}
        style={style}
        onPress={onPress}
        underlayColor={underlayColor}
        activeOpacity={activeOpacity}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

TouchableHighlight.displayName = "TouchableHighlight";
export default TouchableHighlight;
