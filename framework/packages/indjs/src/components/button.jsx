import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const Button = forwardRef(
  ({ title, onPress, color, disabled, className, ...rest }, ref) => {
    const Component = resolveElement("button");

    if (Component === "button" || Component === "div") {
      const flatStyle = StyleSheet.flatten([
        {
          cursor: "pointer",
          backgroundColor: color || undefined,
          opacity: disabled ? 0.5 : 1
        },
        rest.style
      ]);

      return (
        <button
          ref={ref}
          onClick={onPress}
          disabled={disabled}
          className={className || ""}
          style={flatStyle}
          type="button"
          {...rest}
        >
          {title}
        </button>
      );
    }

    return (
      <Component
        ref={ref}
        title={title}
        onPress={onPress}
        color={color}
        disabled={disabled}
        className={className || ""}
        {...rest}
      />
    );
  },
);

Button.displayName = "Button";
export default Button;
