import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const TouchableOpacity = forwardRef(
  ({ children, style, onPress, activeOpacity = 0.2, ...rest }, ref) => {
    const Component = resolveElement("touchableopacity");

    if (Component === "button" || Component === "div") {
      return (
        <button
          ref={ref}
          style={StyleSheet.flatten([{ cursor: "pointer" }, style])}
          onClick={onPress}
          onMouseDown={(e) => (e.currentTarget.style.opacity = activeOpacity)}
          onMouseUp={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
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
        activeOpacity={activeOpacity}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

TouchableOpacity.displayName = "TouchableOpacity";
export default TouchableOpacity;
