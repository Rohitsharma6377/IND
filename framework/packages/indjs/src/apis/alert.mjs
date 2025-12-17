// Alert API for Web

export const Alert = {
  alert: (title, message, buttons, options) => {
    // Basic web alert limitation: supports only one message
    // If buttons are provided, we can't fully mimic without a custom modal UI.
    // For now we use window.alert and window.confirm

    // Simple text-only case
    const text = [title, message].filter(Boolean).join("\n");

    if (!buttons || buttons.length === 0) {
      if (typeof window !== "undefined") window.alert(text);
      return;
    }

    // Two button case (Cancel/OK) -> confirm()
    if (buttons.length >= 2) {
      // Find the "cancel" style button or first button
      // This is a rough approximation
      if (typeof window !== "undefined") {
        const result = window.confirm(text);
        if (result) {
          // OK pressed - find non-cancel button
          const okBtn = buttons.find((b) => b.style !== "cancel");
          if (okBtn && okBtn.onPress) okBtn.onPress();
        } else {
          // Cancel pressed
          const cancelBtn = buttons.find((b) => b.style === "cancel");
          if (cancelBtn && cancelBtn.onPress) cancelBtn.onPress();
        }
      }
    } else {
      // One button
      if (typeof window !== "undefined") window.alert(text);
      if (buttons[0].onPress) buttons[0].onPress();
    }
  },
  prompt: (
    title,
    message,
    callbackOrButtons,
    type,
    defaultValue,
    keyboardType,
  ) => {
    if (typeof window !== "undefined") {
      const result = window.prompt(title, defaultValue);
      if (typeof callbackOrButtons === "function") {
        callbackOrButtons(result);
      }
    }
  },
};

export default Alert;
