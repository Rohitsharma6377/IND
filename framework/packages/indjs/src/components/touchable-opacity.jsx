import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const TouchableOpacity = forwardRef(
  ({ children, style, onPress, activeOpacity = 0.2, className, ...rest }, ref) => {
    const Component = resolveElement("touchableopacity");

    if (Component === "button" || Component === "div") {
      return (
        <button
          ref={ref}
          style={StyleSheet.flatten([
            { cursor: "pointer", background: 'none', border: 'none', padding: 0, textAlign: 'left', font: 'inherit', display: 'flex', flexDirection: 'column', transition: 'opacity 0.15s ease' },
            style
          ])}
          onClick={onPress}
          className={className || ""}
          type="button"
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
        className={className || ""}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

TouchableOpacity.displayName = "TouchableOpacity";
export default TouchableOpacity;
