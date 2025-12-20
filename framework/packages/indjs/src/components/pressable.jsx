import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const Pressable = forwardRef(({ children, style, onPress, className, ...rest }, ref) => {
  const Component = resolveElement("pressable");

  if (Component === "button" || Component === "div") {
    const flatStyle = StyleSheet.flatten([
      { cursor: "pointer", background: 'none', border: 'none', padding: 0, textAlign: 'left', font: 'inherit', display: 'flex', flexDirection: 'column' },
      typeof style === "function" ? style({ pressed: false }) : style,
    ]);

    return (
      <button
        ref={ref}
        style={flatStyle}
        onClick={onPress}
        className={className || ""}
        type="button"
        {...rest}
      >
        {typeof children === "function"
          ? children({ pressed: false })
          : children}
      </button>
    );
  }

  return (
    <Component ref={ref} style={style} onPress={onPress} className={className || ""} {...rest}>
      {children}
    </Component>
  );
});

Pressable.displayName = "Pressable";
export default Pressable;
