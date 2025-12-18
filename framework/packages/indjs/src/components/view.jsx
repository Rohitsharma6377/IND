import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const View = forwardRef(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("view");

  const flatStyle = StyleSheet.flatten([style]);

  return (
    <Component ref={ref} style={flatStyle} className={className} {...rest}>
      {children}
    </Component>
  );
});

View.displayName = "View";
export default View;
