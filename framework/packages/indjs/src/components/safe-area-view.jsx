import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const SafeAreaView = forwardRef(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("safeareaview");

  if (Component === "div" || Component === "view") {
    const flatStyle = StyleSheet.flatten([
      {
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
        flex: 1
      },
      style
    ]);
    return (
      <div ref={ref} style={flatStyle} className={className || ""} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <Component ref={ref} style={style} className={className || ""} {...rest}>
      {children}
    </Component>
  );
});

SafeAreaView.displayName = "SafeAreaView";
export default SafeAreaView;
