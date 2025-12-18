import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const Button = forwardRef(
  ({ title, onPress, color, disabled, ...rest }, ref) => {
    const Component = resolveElement("button");

    if (Component === "button" || Component === "div") {
      return (
        <button
          ref={ref}
          onClick={onPress}
          disabled={disabled}
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
        {...rest}
      />
    );
  },
);

Button.displayName = "Button";
export default Button;
