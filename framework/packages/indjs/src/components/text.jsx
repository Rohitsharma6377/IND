import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const Text = forwardRef(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("text");

  const flatStyle = StyleSheet.flatten([style]);

  return (
    <Component ref={ref} style={flatStyle} className={className} {...rest}>
      {children}
    </Component>
  );
});

Text.displayName = "Text";
export default Text;
