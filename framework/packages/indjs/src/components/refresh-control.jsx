import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const RefreshControl = forwardRef(({ refreshing, onRefresh, ...rest }, ref) => {
  const Component = resolveElement("refreshcontrol");

  // On web, pass-through or implement basic visual?
  // Usually RefreshControl is passed as prop to ScrollView.
  // If used as component, it might wrap content.

  if (Component === "div") {
    // No-op for web visual usually, unless we implement pull-to-refresh
    return null;
  }

  return (
    <Component
      ref={ref}
      refreshing={refreshing}
      onRefresh={onRefresh}
      {...rest}
    />
  );
});

RefreshControl.displayName = "RefreshControl";
export default RefreshControl;
