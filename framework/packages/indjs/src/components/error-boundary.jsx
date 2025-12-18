import React from "react";

// Public ErrorBoundary component for apps to wrap UI
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    try {
      console.error("[INDJS] ErrorBoundary caught:", error);
    } catch { }
    try {
      const payload = {
        message: String((error && error.message) || error),
        stack: String((error && error.stack) || ""),
        info,
      };
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], {
          type: "application/json",
        });
        navigator.sendBeacon("/__indjs/client-error", blob);
      }
    } catch { }
  }
  render() {
    if (this.state.error) {
      return React.createElement(
        "div",
        null,
        React.createElement("strong", null, "An error occurred"),
        React.createElement(
          "div",
          null,
          String(
            (this.state.error && this.state.error.message) || "Unknown error",
          ),
        ),
      );
    }
    return this.props.children;
  }
}
