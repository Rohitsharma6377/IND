import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const Pressable = forwardRef(({ children, style, onPress, ...rest }, ref) => {
  const Component = resolveElement("pressable");

  if (Component === "button" || Component === "div") {
    const flatStyle = StyleSheet.flatten([
      {
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: "pointer",
        textAlign: "inherit",
      },
      typeof style === "function" ? style({ pressed: false }) : style,
    ]);

    return (
      <button ref={ref} style={flatStyle} onClick={onPress} {...rest}>
        {typeof children === "function"
          ? children({ pressed: false })
          : children}
      </button>
    );
  }

  return (
    <Component ref={ref} style={style} onPress={onPress} {...rest}>
      {children}
    </Component>
  );
});

Pressable.displayName = "Pressable";
export default Pressable;
