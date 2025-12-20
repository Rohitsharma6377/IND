import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const KeyboardAvoidingView = forwardRef(
  (
    {
      children,
      style,
      behavior,
      contentContainerStyle,
      keyboardVerticalOffset,
      enabled,
      className,
      ...rest
    },
    ref,
  ) => {
    const Component = resolveElement("keyboardavoidingview");

    // On web, keyboard avoiding is usually handled by the browser default behavior
    if (Component === "div" || Component === "view") {
      return (
        <div
          ref={ref}
          style={StyleSheet.flatten([{ flex: 1 }, style])}
          className={className || ""}
          {...rest}
        >
          {children}
        </div>
      );
    }

    return (
      <Component
        ref={ref}
        style={style}
        behavior={behavior}
        contentContainerStyle={contentContainerStyle}
        keyboardVerticalOffset={keyboardVerticalOffset}
        enabled={enabled}
        className={className || ""}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

KeyboardAvoidingView.displayName = "KeyboardAvoidingView";
export default KeyboardAvoidingView;
