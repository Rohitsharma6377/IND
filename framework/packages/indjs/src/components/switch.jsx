import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const Switch = forwardRef(
  (
    { value, onValueChange, disabled, trackColor, thumbColor, style, ...rest },
    ref,
  ) => {
    const Component = resolveElement("switch");

    if (Component === "input" || Component === "div") {
      return (
        <input
          ref={ref}
          type="checkbox"
          checked={value}
          onChange={(e) => onValueChange && onValueChange(e.target.checked)}
          disabled={disabled}
          style={StyleSheet.flatten([style])}
          {...rest}
        />
      );
    }

    // React Native
    return (
      <Component
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={trackColor}
        thumbColor={thumbColor}
        style={style}
        {...rest}
      />
    );
  },
);

Switch.displayName = "Switch";
export default Switch;
