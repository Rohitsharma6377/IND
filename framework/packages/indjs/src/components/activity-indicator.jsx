import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const ActivityIndicator = forwardRef(
  ({ size = "small", color = "#999", style, className, ...rest }, ref) => {
    const Component = resolveElement("activityindicator");

    if (Component === "div" || Component === "view") {
      const dimension = size === "small" ? 20 : 40;
      const spinnerStyle = {
        width: dimension,
        height: dimension,
        border: `2px solid ${color}33`,
        borderTop: `2px solid ${color}`,
        borderRadius: "50%",
        animation: "indjs-spin 0.8s linear infinite",
        display: "inline-block",
        boxSizing: "border-box",
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

      return (
        <div
          ref={ref}
          style={spinnerStyle}
          className={className || ""}
          {...rest}
        />
      );
    }

    return (
      <Component
        ref={ref}
        size={size}
        color={color}
        style={style}
        className={className || ""}
        {...rest}
      />
    );
  },
);

ActivityIndicator.displayName = "ActivityIndicator";
export default ActivityIndicator;
