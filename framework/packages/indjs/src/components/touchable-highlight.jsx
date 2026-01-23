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
      className,
      ...rest
    },
    ref,
  ) => {
    const Component = resolveElement("touchablehighlight");

    if (Component === "button" || Component === "div") {
      const flatStyle = StyleSheet.flatten([{ cursor: "pointer", background: 'none', border: 'none', padding: 0, textAlign: 'left', font: 'inherit' }, style]);

      // Simple web implementation: just opacity, mimicking overlay is harder without state
      return (
        <button
          ref={ref}
          type="button"
          style={flatStyle}
          className={className || ""}
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
        className={className || ""}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

TouchableHighlight.displayName = "TouchableHighlight";
export default TouchableHighlight;
