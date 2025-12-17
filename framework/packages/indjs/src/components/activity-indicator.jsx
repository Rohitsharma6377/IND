import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const ActivityIndicator = forwardRef(
  ({ size = "small", color = "#999", style, ...rest }, ref) => {
    const Component = resolveElement("activityindicator");

    if (Component === "div" || Component === "view") {
      const sizePx = size === "large" ? 36 : 20;
      const spinnerStyle = {
        width: sizePx,
        height: sizePx,
        border: `2px solid ${color}`,
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "indjs-spin 1s linear infinite",
        ...StyleSheet.flatten(style),
      };

      // Inject keyframes if not present
      if (
        typeof document !== "undefined" &&
        !document.getElementById("indjs-spin-style")
      ) {
        const styleEl = document.createElement("style");
        styleEl.id = "indjs-spin-style";
        styleEl.innerHTML = `@keyframes indjs-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(styleEl);
      }

      return <div ref={ref} style={spinnerStyle} {...rest} />;
    }

    return (
      <Component ref={ref} size={size} color={color} style={style} {...rest} />
    );
  },
);

ActivityIndicator.displayName = "ActivityIndicator";
export default ActivityIndicator;
