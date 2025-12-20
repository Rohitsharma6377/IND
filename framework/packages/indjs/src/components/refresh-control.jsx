import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const RefreshControl = forwardRef(({ refreshing, onRefresh, className, ...rest }, ref) => {
  const Component = resolveElement("refreshcontrol");

  if (Component === "div") {
    return null;
  }

  return (
    <Component
      ref={ref}
      refreshing={refreshing}
      onRefresh={onRefresh}
      className={className || ""}
      {...rest}
    />
  );
});

RefreshControl.displayName = "RefreshControl";
export default RefreshControl;
