import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const SafeAreaView = forwardRef(({ children, style, ...rest }, ref) => {
  const Component = resolveElement("safeareaview");

  if (Component === "div" || Component === "view") {
    const flatStyle = StyleSheet.flatten([style]);
    return (
      <div ref={ref} style={flatStyle} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <Component ref={ref} style={style} {...rest}>
      {children}
    </Component>
  );
});

SafeAreaView.displayName = "SafeAreaView";
export default SafeAreaView;
