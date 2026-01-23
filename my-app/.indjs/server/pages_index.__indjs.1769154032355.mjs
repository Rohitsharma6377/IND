var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// pages/index.jsx
import React29, { useState, useEffect } from "react";

// node_modules/indjs/src/platform.mjs
var isBrowser = typeof window !== "undefined";
var isDesktop = isBrowser && (window.process?.type === "renderer" || !!window.electron || navigator.userAgent.includes("Electron"));
var isMobile = isBrowser && (!!window.Capacitor || !!window.androidBridge || !!window.webkit?.messageHandlers?.bridge || navigator.userAgent.includes("Capacitor"));
var isAndroid = isMobile && /android/i.test(navigator.userAgent);
var isIOS = isMobile && /iphone|ipad|ipod/i.test(navigator.userAgent);
var platform = (() => {
  if (isDesktop) return "desktop";
  if (isAndroid) return "android";
  if (isIOS) return "ios";
  if (isMobile) return "mobile";
  return "web";
})();

// node_modules/indjs/src/components/image.jsx
import React, { forwardRef } from "react";

// node_modules/indjs/src/universal/resolve.js
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function resolveElement(type) {
  const platform2 = typeof PLATFORM !== "undefined" ? PLATFORM : "web";
  if (platform2 === "web") {
    const webMap = {
      view: "div",
      text: "span",
      image: "img",
      imagebackground: "div",
      // map image-background to div with style
      scrollview: "div",
      flatlist: "div",
      sectionlist: "div",
      keyboardavoidingview: "div",
      safeareaview: "div",
      pressable: "button",
      touchableopacity: "button",
      touchablehighlight: "button",
      switch: "input",
      // type='checkbox'
      textarea: "textarea",
      button: "button",
      modal: "div",
      activityindicator: "div",
      refreshcontrol: "div"
    };
    return webMap[type.toLowerCase().replace(/-/g, "")] || "div";
  }
  if (platform2 === "mobile") {
    const mobileMap = {
      view: "View",
      text: "Text",
      image: "Image",
      imagebackground: "ImageBackground",
      scrollview: "ScrollView",
      flatlist: "FlatList",
      sectionlist: "SectionList",
      keyboardavoidingview: "KeyboardAvoidingView",
      safeareaview: "SafeAreaView",
      pressable: "Pressable",
      touchableopacity: "TouchableOpacity",
      touchablehighlight: "TouchableHighlight",
      switch: "Switch",
      modal: "Modal",
      activityindicator: "ActivityIndicator",
      refreshcontrol: "RefreshControl",
      button: "Button"
    };
    const rnName = mobileMap[type.toLowerCase().replace(/-/g, "")] || capitalize(type);
    try {
      if (typeof __require !== "undefined") {
        return __require("react-native")[rnName];
      } else if (typeof window !== "undefined" && window.React && window.React.Native) {
        return window.React.Native[rnName];
      }
    } catch (e) {
      console.warn(`React Native component ${rnName} not found`);
    }
    return "View";
  }
  return "div";
}

// node_modules/indjs/src/apis/style-sheet.mjs
var StyleSheet2 = {
  create: (styles) => styles,
  flatten: (styles) => {
    if (!styles) return {};
    if (Array.isArray(styles)) {
      return styles.flat(Infinity).reduce((acc, item) => item ? { ...acc, ...item } : acc, {});
    }
    return styles;
  },
  hairlineWidth: 1,
  absoluteFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  absoluteFillObject: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
};
var style_sheet_default = StyleSheet2;

// node_modules/indjs/src/components/image.jsx
import { jsx } from "react/jsx-runtime";
var Image = forwardRef(({ style, source, src, ...rest }, ref) => {
  const Component = resolveElement("image");
  const imageSource = src || source && source.uri || "";
  const props = {
    ...rest,
    src: imageSource,
    ref
  };
  if (Component !== "img" && Component !== "image") {
    props.source = source || { uri: src };
    delete props.src;
  }
  const flatStyle = style_sheet_default.flatten([style]);
  return /* @__PURE__ */ jsx(Component, { style: flatStyle, ...props });
});
Image.displayName = "Image";

// node_modules/indjs/src/components/link.jsx
import React2 from "react";
function Link({
  href,
  children,
  prefetch = false,
  replace = false,
  scroll = true,
  onClick,
  className,
  style,
  target,
  rel,
  ...rest
}) {
  React2.useEffect(() => {
    if (!prefetch || !href) return;
    try {
      const l = document.createElement("link");
      l.rel = "prefetch";
      l.href = href;
      document.head.appendChild(l);
      return () => {
        try {
          document.head.removeChild(l);
        } catch {
        }
      };
    } catch {
    }
  }, [href, prefetch]);
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    if (!href) return;
    if (target && target !== "_self") return;
    let url;
    try {
      url = new URL(href, window.location.origin);
    } catch {
      return;
    }
    const proto = url.protocol;
    if (proto && proto !== "http:" && proto !== "https:") return;
    if (url.origin !== window.location.origin) return;
    if (rest.download) return;
    const current = window.location.pathname + window.location.search + window.location.hash;
    const next = url.pathname + url.search + url.hash;
    if (next === current) {
      e.preventDefault();
      if (scroll) {
        if (url.hash) {
          const el = document.getElementById(url.hash.slice(1));
          if (el) el.scrollIntoView();
          else window.scrollTo(0, 0);
        } else {
          window.scrollTo(0, 0);
        }
      }
      return;
    }
    e.preventDefault();
    if (replace) window.history.replaceState({}, "", next);
    else window.history.pushState({}, "", next);
    try {
      window.dispatchEvent(
        new CustomEvent("ind:navigate", { detail: { href: next } })
      );
    } catch {
    }
    if (scroll) {
      if (url.hash) {
        const el = document.getElementById(url.hash.slice(1));
        if (el) el.scrollIntoView();
        else window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
    }
  };
  const relFinal = target === "_blank" ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ") : rel;
  return React2.createElement(
    "a",
    {
      href,
      className,
      style,
      target,
      rel: relFinal,
      onClick: handleClick,
      ...rest
    },
    children
  );
}

// node_modules/indjs/src/components/view.jsx
import React3, { forwardRef as forwardRef2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var View = forwardRef2(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("view");
  const flatStyle = style_sheet_default.flatten([style]);
  return /* @__PURE__ */ jsx2(Component, { ref, style: flatStyle, className, ...rest, children });
});
View.displayName = "View";
var view_default = View;

// node_modules/indjs/src/components/text.jsx
import React4, { forwardRef as forwardRef3 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var Text = forwardRef3(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("text");
  const flatStyle = style_sheet_default.flatten([style]);
  return /* @__PURE__ */ jsx3(Component, { ref, style: flatStyle, className, ...rest, children });
});
Text.displayName = "Text";
var text_default = Text;

// node_modules/indjs/src/components/scroll-view.jsx
import React5, { forwardRef as forwardRef4 } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var ScrollView = forwardRef4(
  ({
    children,
    style,
    contentContainerStyle,
    horizontal = false,
    showsHorizontalScrollIndicator = true,
    showsVerticalScrollIndicator = true,
    className,
    ...rest
  }, ref) => {
    const Component = resolveElement("scrollview");
    if (Component === "div" || Component === "view") {
      const containerStyle = {
        overflowX: horizontal ? "auto" : "hidden",
        overflowY: horizontal ? "hidden" : "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: (horizontal ? !showsHorizontalScrollIndicator : !showsVerticalScrollIndicator) ? "none" : "auto",
        msOverflowStyle: (horizontal ? !showsHorizontalScrollIndicator : !showsVerticalScrollIndicator) ? "none" : "auto",
        ...style_sheet_default.flatten(style)
      };
      const contentStyle = style_sheet_default.flatten([contentContainerStyle]);
      return /* @__PURE__ */ jsx4("div", { ref, style: containerStyle, className, ...rest, children: /* @__PURE__ */ jsx4("div", { style: contentStyle, children }) });
    }
    return /* @__PURE__ */ jsx4(
      Component,
      {
        ref,
        style,
        contentContainerStyle,
        horizontal,
        showsHorizontalScrollIndicator,
        showsVerticalScrollIndicator,
        className,
        ...rest,
        children
      }
    );
  }
);
ScrollView.displayName = "ScrollView";
var scroll_view_default = ScrollView;

// node_modules/indjs/src/components/text-input.jsx
import React6, { forwardRef as forwardRef5 } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var TextInput = forwardRef5(
  ({
    value,
    defaultValue,
    onChangeText,
    onFocus,
    onBlur,
    placeholder,
    secureTextEntry = false,
    multiline = false,
    numberOfLines = 4,
    editable = true,
    style,
    className,
    ...rest
  }, ref) => {
    const handleChange = (e) => {
      if (onChangeText) onChangeText(e.target.value);
    };
    const commonStyle = {
      appearance: "none",
      outline: "none",
      boxSizing: "border-box",
      ...StyleSheet.flatten(style)
    };
    if (multiline) {
      return /* @__PURE__ */ jsx5(
        "textarea",
        {
          ref,
          defaultValue,
          value,
          onChange: handleChange,
          onFocus,
          onBlur,
          placeholder,
          readOnly: !editable,
          rows: numberOfLines,
          style: { ...commonStyle, resize: "none" },
          className,
          ...rest
        }
      );
    }
    return /* @__PURE__ */ jsx5(
      "input",
      {
        ref,
        type: secureTextEntry ? "password" : "text",
        defaultValue,
        value,
        onChange: handleChange,
        onFocus,
        onBlur,
        placeholder,
        readOnly: !editable,
        style: commonStyle,
        className,
        ...rest
      }
    );
  }
);
TextInput.displayName = "TextInput";

// node_modules/indjs/src/components/button.jsx
import React7, { forwardRef as forwardRef6 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Button = forwardRef6(
  ({ title, onPress, color, disabled, ...rest }, ref) => {
    const Component = resolveElement("button");
    if (Component === "button" || Component === "div") {
      return /* @__PURE__ */ jsx6(
        "button",
        {
          ref,
          onClick: onPress,
          disabled,
          ...rest,
          children: title
        }
      );
    }
    return /* @__PURE__ */ jsx6(
      Component,
      {
        ref,
        title,
        onPress,
        color,
        disabled,
        ...rest
      }
    );
  }
);
Button.displayName = "Button";

// node_modules/indjs/src/components/activity-indicator.jsx
import React8, { forwardRef as forwardRef7 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var ActivityIndicator = forwardRef7(
  ({ size = "small", color = "#999", style, ...rest }, ref) => {
    const Component = resolveElement("activityindicator");
    if (Component === "div" || Component === "view") {
      const spinnerStyle = {
        animation: "indjs-spin 1s linear infinite",
        display: "inline-block",
        ...style_sheet_default.flatten(style)
      };
      if (typeof document !== "undefined" && !document.getElementById("indjs-spin-style")) {
        const styleEl = document.createElement("style");
        styleEl.id = "indjs-spin-style";
        styleEl.innerHTML = `@keyframes indjs-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(styleEl);
      }
      return /* @__PURE__ */ jsx7("div", { ref, style: spinnerStyle, ...rest });
    }
    return /* @__PURE__ */ jsx7(Component, { ref, size, color, style, ...rest });
  }
);
ActivityIndicator.displayName = "ActivityIndicator";

// node_modules/indjs/src/components/switch.jsx
import React9, { forwardRef as forwardRef8 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var Switch = forwardRef8(
  ({ value, onValueChange, disabled, trackColor, thumbColor, style, ...rest }, ref) => {
    const Component = resolveElement("switch");
    if (Component === "input" || Component === "div") {
      return /* @__PURE__ */ jsx8(
        "input",
        {
          ref,
          type: "checkbox",
          checked: value,
          onChange: (e) => onValueChange && onValueChange(e.target.checked),
          disabled,
          style: style_sheet_default.flatten([style]),
          ...rest
        }
      );
    }
    return /* @__PURE__ */ jsx8(
      Component,
      {
        ref,
        value,
        onValueChange,
        disabled,
        trackColor,
        thumbColor,
        style,
        ...rest
      }
    );
  }
);
Switch.displayName = "Switch";

// node_modules/indjs/src/components/flat-list.jsx
import React10, { forwardRef as forwardRef9 } from "react";
import { jsx as jsx9, jsxs } from "react/jsx-runtime";
var FlatList = forwardRef9(
  ({
    data,
    renderItem,
    keyExtractor,
    ListHeaderComponent,
    ListFooterComponent,
    ListEmptyComponent,
    contentContainerStyle,
    numColumns = 1,
    horizontal = false,
    ...rest
  }, ref) => {
    const Component = resolveElement("flatlist");
    if (Component === "div" || Component === "view") {
      if (!data || data.length === 0) {
        if (ListEmptyComponent) {
          const Empty = React10.isValidElement(ListEmptyComponent) ? ListEmptyComponent : /* @__PURE__ */ jsx9(ListEmptyComponent, {});
          return /* @__PURE__ */ jsxs(
            scroll_view_default,
            {
              contentContainerStyle,
              horizontal,
              ref,
              ...rest,
              children: [
                ListHeaderComponent && (React10.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx9(ListHeaderComponent, {})),
                Empty,
                ListFooterComponent && (React10.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx9(ListFooterComponent, {}))
              ]
            }
          );
        }
      }
      const items = data || [];
      const renderList = () => {
        return items.map((item, index) => {
          const key = keyExtractor ? keyExtractor(item, index) : index.toString();
          return /* @__PURE__ */ jsx9(React10.Fragment, { children: renderItem({ item, index }) }, key);
        });
      };
      const flatContentStyle = style_sheet_default.flatten([contentContainerStyle]);
      return /* @__PURE__ */ jsxs(
        scroll_view_default,
        {
          contentContainerStyle: flatContentStyle,
          horizontal,
          ref,
          ...rest,
          children: [
            ListHeaderComponent && (React10.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx9(ListHeaderComponent, {})),
            renderList(),
            ListFooterComponent && (React10.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx9(ListFooterComponent, {}))
          ]
        }
      );
    }
    return /* @__PURE__ */ jsx9(
      Component,
      {
        ref,
        data,
        renderItem,
        keyExtractor,
        ListHeaderComponent,
        ListFooterComponent,
        ListEmptyComponent,
        contentContainerStyle,
        numColumns,
        horizontal,
        ...rest
      }
    );
  }
);
FlatList.displayName = "FlatList";

// node_modules/indjs/src/components/touchable-opacity.jsx
import React11, { forwardRef as forwardRef10 } from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var TouchableOpacity = forwardRef10(
  ({ children, style, onPress, activeOpacity = 0.2, ...rest }, ref) => {
    const Component = resolveElement("touchableopacity");
    if (Component === "button" || Component === "div") {
      return /* @__PURE__ */ jsx10(
        "button",
        {
          ref,
          style: style_sheet_default.flatten([{ cursor: "pointer" }, style]),
          onClick: onPress,
          onMouseDown: (e) => e.currentTarget.style.opacity = activeOpacity,
          onMouseUp: (e) => e.currentTarget.style.opacity = 1,
          onMouseLeave: (e) => e.currentTarget.style.opacity = 1,
          ...rest,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx10(
      Component,
      {
        ref,
        style,
        onPress,
        activeOpacity,
        ...rest,
        children
      }
    );
  }
);
TouchableOpacity.displayName = "TouchableOpacity";

// node_modules/indjs/src/components/pressable.jsx
import React12, { forwardRef as forwardRef11 } from "react";
import { jsx as jsx11 } from "react/jsx-runtime";
var Pressable = forwardRef11(({ children, style, onPress, ...rest }, ref) => {
  const Component = resolveElement("pressable");
  if (Component === "button" || Component === "div") {
    const flatStyle = style_sheet_default.flatten([
      { cursor: "pointer" },
      typeof style === "function" ? style({ pressed: false }) : style
    ]);
    return /* @__PURE__ */ jsx11("button", { ref, style: flatStyle, onClick: onPress, ...rest, children: typeof children === "function" ? children({ pressed: false }) : children });
  }
  return /* @__PURE__ */ jsx11(Component, { ref, style, onPress, ...rest, children });
});
Pressable.displayName = "Pressable";

// node_modules/indjs/src/components/image-background.jsx
import React13, { forwardRef as forwardRef12 } from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
var ImageBackground = forwardRef12(
  ({ children, style, imageStyle, source, src, resizeMode = "cover", ...rest }, ref) => {
    const Component = resolveElement("imagebackground");
    const imageSource = src || source && source.uri || "";
    if (Component === "div" || Component === "view") {
      const flatStyle = style_sheet_default.flatten([
        {
          position: "relative",
          backgroundImage: `url(${imageSource})`,
          backgroundSize: resizeMode === "stretch" ? "100% 100%" : resizeMode,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        },
        style
      ]);
      return /* @__PURE__ */ jsx12("div", { ref, style: flatStyle, ...rest, children });
    }
    return /* @__PURE__ */ jsx12(
      Component,
      {
        ref,
        style,
        imageStyle,
        source: source || { uri: src },
        resizeMode,
        ...rest,
        children
      }
    );
  }
);
ImageBackground.displayName = "ImageBackground";

// node_modules/indjs/src/components/modal.jsx
import React14, { forwardRef as forwardRef13 } from "react";
import ReactDOM from "react-dom";
import { jsx as jsx13 } from "react/jsx-runtime";
var Modal = forwardRef13(
  ({
    children,
    visible,
    transparent,
    animationType,
    onRequestClose,
    style,
    ...rest
  }, ref) => {
    const Component = resolveElement("modal");
    if (Component === "div" || Component === "view") {
      if (!visible) return null;
      const modalStyle = {
        ...style_sheet_default.flatten(style)
      };
      const content = /* @__PURE__ */ jsx13("div", { ref, style: modalStyle, ...rest, children });
      if (typeof document !== "undefined") {
        return ReactDOM.createPortal(content, document.body);
      }
      return content;
    }
    return /* @__PURE__ */ jsx13(
      Component,
      {
        ref,
        visible,
        transparent,
        animationType,
        onRequestClose,
        ...rest,
        children
      }
    );
  }
);
Modal.displayName = "Modal";

// node_modules/indjs/src/components/safe-area-view.jsx
import React15, { forwardRef as forwardRef14 } from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var SafeAreaView = forwardRef14(({ children, style, ...rest }, ref) => {
  const Component = resolveElement("safeareaview");
  if (Component === "div" || Component === "view") {
    const flatStyle = style_sheet_default.flatten([style]);
    return /* @__PURE__ */ jsx14("div", { ref, style: flatStyle, ...rest, children });
  }
  return /* @__PURE__ */ jsx14(Component, { ref, style, ...rest, children });
});
SafeAreaView.displayName = "SafeAreaView";

// node_modules/indjs/src/components/status-bar.jsx
import React16 from "react";

// node_modules/indjs/src/components/section-list.jsx
import React17, { forwardRef as forwardRef15 } from "react";
import { jsx as jsx15, jsxs as jsxs2 } from "react/jsx-runtime";
var SectionList = forwardRef15(
  ({
    sections,
    renderItem,
    renderSectionHeader,
    keyExtractor,
    ListHeaderComponent,
    ListFooterComponent,
    contentContainerStyle,
    stickySectionHeadersEnabled = true,
    ...rest
  }, ref) => {
    const Component = resolveElement("sectionlist");
    if (Component === "div" || Component === "view") {
      const renderSections = () => {
        return (sections || []).map((section, sectionIndex) => {
          const data = section.data || [];
          const key = section.key || sectionIndex.toString();
          return /* @__PURE__ */ jsxs2(React17.Fragment, { children: [
            renderSectionHeader && renderSectionHeader({ section }),
            data.map((item, itemIndex) => {
              const itemKey = keyExtractor ? keyExtractor(item, itemIndex) : item.key || item.id || key + "-" + itemIndex;
              return /* @__PURE__ */ jsx15(React17.Fragment, { children: renderItem({ item, index: itemIndex, section }) }, itemKey);
            })
          ] }, key);
        });
      };
      return /* @__PURE__ */ jsxs2(
        scroll_view_default,
        {
          contentContainerStyle,
          ref,
          ...rest,
          children: [
            ListHeaderComponent && (React17.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx15(ListHeaderComponent, {})),
            renderSections(),
            ListFooterComponent && (React17.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx15(ListFooterComponent, {}))
          ]
        }
      );
    }
    return /* @__PURE__ */ jsx15(
      Component,
      {
        ref,
        sections,
        renderItem,
        renderSectionHeader,
        keyExtractor,
        ListHeaderComponent,
        ListFooterComponent,
        contentContainerStyle,
        stickySectionHeadersEnabled,
        ...rest
      }
    );
  }
);
SectionList.displayName = "SectionList";

// node_modules/indjs/src/components/keyboard-avoiding-view.jsx
import React18, { forwardRef as forwardRef16 } from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var KeyboardAvoidingView = forwardRef16(
  ({
    children,
    style,
    behavior,
    contentContainerStyle,
    keyboardVerticalOffset,
    enabled,
    ...rest
  }, ref) => {
    const Component = resolveElement("keyboardavoidingview");
    if (Component === "div" || Component === "view") {
      return /* @__PURE__ */ jsx16("div", { ref, style: style_sheet_default.flatten(style), ...rest, children });
    }
    return /* @__PURE__ */ jsx16(
      Component,
      {
        ref,
        style,
        behavior,
        contentContainerStyle,
        keyboardVerticalOffset,
        enabled,
        ...rest,
        children
      }
    );
  }
);
KeyboardAvoidingView.displayName = "KeyboardAvoidingView";

// node_modules/indjs/src/components/refresh-control.jsx
import React19, { forwardRef as forwardRef17 } from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
var RefreshControl = forwardRef17(({ refreshing, onRefresh, ...rest }, ref) => {
  const Component = resolveElement("refreshcontrol");
  if (Component === "div") {
    return null;
  }
  return /* @__PURE__ */ jsx17(
    Component,
    {
      ref,
      refreshing,
      onRefresh,
      ...rest
    }
  );
});
RefreshControl.displayName = "RefreshControl";

// node_modules/indjs/src/components/touchable-highlight.jsx
import React20, { forwardRef as forwardRef18 } from "react";
import { jsx as jsx18 } from "react/jsx-runtime";
var TouchableHighlight = forwardRef18(
  ({
    children,
    style,
    onPress,
    underlayColor = "black",
    activeOpacity = 0.85,
    ...rest
  }, ref) => {
    const Component = resolveElement("touchablehighlight");
    if (Component === "button" || Component === "div") {
      const flatStyle = style_sheet_default.flatten([{ cursor: "pointer" }, style]);
      return /* @__PURE__ */ jsx18(
        "button",
        {
          ref,
          style: flatStyle,
          onClick: onPress,
          onMouseDown: (e) => {
            e.currentTarget.style.backgroundColor = underlayColor;
            e.currentTarget.style.opacity = activeOpacity;
          },
          onMouseUp: (e) => {
            e.currentTarget.style.backgroundColor = flatStyle.backgroundColor || "transparent";
            e.currentTarget.style.opacity = 1;
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = flatStyle.backgroundColor || "transparent";
            e.currentTarget.style.opacity = 1;
          },
          ...rest,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx18(
      Component,
      {
        ref,
        style,
        onPress,
        underlayColor,
        activeOpacity,
        ...rest,
        children
      }
    );
  }
);
TouchableHighlight.displayName = "TouchableHighlight";

// node_modules/indjs/src/components/touchable-without-feedback.jsx
import React21, { cloneElement, Children } from "react";

// node_modules/indjs/src/components/screen.jsx
import React22, { forwardRef as forwardRef19 } from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var Screen = forwardRef19(({ children, background = "light", className = "", style, ...props }, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx19(view_default, { ref, className: finalClass, style, ...props, children });
});
Screen.displayName = "Screen";

// node_modules/indjs/src/components/container.jsx
import React23, { forwardRef as forwardRef20 } from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var Container = forwardRef20(({
  children,
  className = "",
  style,
  ...props
}, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx20(view_default, { ref, className: finalClass, style, ...props, children });
});
Container.displayName = "Container";

// node_modules/indjs/src/components/card.jsx
import React24, { forwardRef as forwardRef21 } from "react";
import { jsx as jsx21 } from "react/jsx-runtime";
var Card = forwardRef21(({
  children,
  className = "",
  style,
  ...props
}, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx21(view_default, { ref, className: finalClass, style, ...props, children });
});
Card.displayName = "Card";

// node_modules/indjs/src/components/grid.jsx
import React25, { forwardRef as forwardRef22 } from "react";
import { jsx as jsx22 } from "react/jsx-runtime";
var Grid = forwardRef22(({
  children,
  className = "",
  style,
  ...props
}, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx22(view_default, { ref, className: finalClass, style, ...props, children });
});
Grid.displayName = "Grid";

// node_modules/indjs/src/components/stack.jsx
import React26, { forwardRef as forwardRef23 } from "react";
import { jsx as jsx23 } from "react/jsx-runtime";
var Stack = forwardRef23(({
  children,
  direction = "vertical",
  spacing = 4,
  align = "start",
  justify = "start",
  className = "",
  style,
  ...props
}, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx23(view_default, { ref, className: finalClass, style, ...props, children });
});
Stack.displayName = "Stack";

// node_modules/indjs/src/components/icon.jsx
import React27, { forwardRef as forwardRef24 } from "react";
import { jsx as jsx24 } from "react/jsx-runtime";
var Icon = forwardRef24(({
  name,
  className = "",
  style,
  ...props
}, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx24(text_default, { ref, className: finalClass, style, ...props, children: name });
});
Icon.displayName = "Icon";

// node_modules/indjs/src/apis/dimensions.mjs
import { EventEmitter } from "events";
var listeners = new EventEmitter();
if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    listeners.emit("change", { window: getWindow(), screen: getScreen() });
  });
}
function getWindow() {
  if (typeof window === "undefined")
    return { width: 0, height: 0, scale: 1, fontScale: 1 };
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scale: window.devicePixelRatio || 1,
    fontScale: 1
  };
}
function getScreen() {
  if (typeof window === "undefined")
    return { width: 0, height: 0, scale: 1, fontScale: 1 };
  return {
    width: window.screen.width,
    height: window.screen.height,
    scale: window.devicePixelRatio || 1,
    fontScale: 1
  };
}

// node_modules/indjs/src/apis/linking.mjs
import { EventEmitter as EventEmitter2 } from "events";
var eventEmitter = new EventEmitter2();

// components/FeatureCard.jsx
import React28 from "react";
import { jsx as jsx25, jsxs as jsxs3 } from "react/jsx-runtime";

// pages/index.jsx
import { jsx as jsx26, jsxs as jsxs4 } from "react/jsx-runtime";
var ReactIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsx26("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx26("path", { d: "M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z" }) });
var NodeIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsx26("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx26("path", { d: "M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 01-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.23 0L10 19.6c-.08-.05-.18-.05-.26-.02-.53.24-.63.27-1.14.4-.12.04-.31.1.07.28l2.48 1.47c.24.14.5.21.78.21s.54-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2M14 8c2.12 0 3.5.89 3.5 2.75 0 1.6-.88 2.15-2.78 2.49-1.94.31-2.14.5-2.14 1.02 0 .44.26.86 1.63.86 1.46 0 1.83-.36 1.83-1.11h1.89c0 1.81-1.37 2.49-3.75 2.49-2.18 0-3.46-.84-3.46-2.42 0-1.76 1.37-2.2 2.89-2.45 1.94-.3 2.03-.55 2.03-1.07 0-.46-.35-.82-1.49-.82-1.12 0-1.61.35-1.71 1.26H10.5c.14-1.74 1.37-2.55 3.5-2.55z" }) });
var TypeScriptIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsx26("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx26("path", { d: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" }) });
var TailwindIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsx26("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx26("path", { d: "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" }) });
var ViteIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsx26("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx26("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) });
var PackageIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsxs4("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx26("line", { x1: "16.5", y1: "9.4", x2: "7.5", y2: "4.21" }),
  /* @__PURE__ */ jsx26("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
  /* @__PURE__ */ jsx26("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
  /* @__PURE__ */ jsx26("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
] });
var ZapIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsx26("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx26("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) });
var PuzzleIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsx26("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx26("path", { d: "M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.611a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.707l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.611-1.611a2.404 2.404 0 0 1 1.705-.707c.618 0 1.235.236 1.704.707l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" }) });
var FileEditIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsxs4("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx26("path", { d: "M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" }),
  /* @__PURE__ */ jsx26("polyline", { points: "14 2 14 8 20 8" }),
  /* @__PURE__ */ jsx26("path", { d: "M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" })
] });
var RocketIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsxs4("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx26("path", { d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" }),
  /* @__PURE__ */ jsx26("path", { d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" }),
  /* @__PURE__ */ jsx26("path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" }),
  /* @__PURE__ */ jsx26("path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" })
] });
var QuoteIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsx26("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx26("path", { d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" }) });
var ChevronDownIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx26("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx26("polyline", { points: "6 9 12 15 18 9" }) });
var MailIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsxs4("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx26("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
  /* @__PURE__ */ jsx26("polyline", { points: "22,6 12,13 2,6" })
] });
var CodeBracketIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsxs4("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx26("polyline", { points: "16 18 22 12 16 6" }),
  /* @__PURE__ */ jsx26("polyline", { points: "8 6 2 12 8 18" })
] });
var ServerIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsxs4("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx26("rect", { x: "2", y: "2", width: "20", height: "8", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsx26("rect", { x: "2", y: "14", width: "20", height: "8", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsx26("line", { x1: "6", y1: "6", x2: "6.01", y2: "6" }),
  /* @__PURE__ */ jsx26("line", { x1: "6", y1: "18", x2: "6.01", y2: "18" })
] });
var GlobeIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsxs4("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx26("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx26("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
  /* @__PURE__ */ jsx26("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
] });
var StarIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsx26("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx26("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" }) });
function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const copyCommand = () => {
    navigator.clipboard.writeText("npx indjs create my-app");
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Lead Developer at TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      content: "INDJS has completely transformed our development workflow. We shipped our product 3x faster than expected. The universal platform support is a game-changer.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "CTO at StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "The best React framework I've ever used. Zero config, amazing DX, and the built-in API routes are incredibly powerful. Our team productivity increased by 200%.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Senior Engineer at BigTech",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "Moving from Next.js to INDJS was seamless. The universal app support meant we could target web, desktop, and mobile from one codebase. Absolutely brilliant!",
      rating: 5
    },
    {
      name: "David Park",
      role: "Indie Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "As a solo developer, INDJS lets me punch way above my weight. I built and launched my SaaS in just 2 weeks. The documentation is excellent too!",
      rating: 5
    }
  ];
  const faqs = [
    {
      question: "What is INDJS and how is it different from Next.js?",
      answer: "INDJS is a universal React meta-framework that lets you build web, desktop, and mobile apps from a single codebase. Unlike Next.js which focuses primarily on web, INDJS provides native support for Electron (desktop) and Capacitor (mobile) out of the box, while maintaining the same great developer experience."
    },
    {
      question: "Do I need to learn anything new to use INDJS?",
      answer: "If you know React, you already know 90% of what you need! INDJS uses familiar patterns like file-based routing, API routes, and JSX components. The learning curve is minimal, and our comprehensive documentation will get you up to speed quickly."
    },
    {
      question: "Is INDJS suitable for production applications?",
      answer: "Absolutely! INDJS is designed for production use with features like automatic code splitting, SSR/SSG support, optimized builds, and robust error handling. Many companies are already using INDJS in production."
    },
    {
      question: "How do I deploy an INDJS application?",
      answer: "INDJS apps can be deployed anywhere! For web, deploy to Vercel, Netlify, AWS, or any Node.js hosting. For desktop, use our built-in Electron packaging. For mobile, we integrate seamlessly with Capacitor for iOS and Android builds."
    },
    {
      question: "Is INDJS free and open source?",
      answer: "Yes! INDJS is completely free and open source under the MIT license. You can use it for personal projects, commercial applications, and everything in between. We also welcome contributions from the community."
    },
    {
      question: "What kind of support is available?",
      answer: "We offer extensive documentation, a Discord community with thousands of developers, GitHub discussions, and regular updates. For enterprise needs, we also offer premium support packages with dedicated assistance."
    }
  ];
  const howItWorks = [
    {
      step: 1,
      title: "Create Your Project",
      description: "Run one command to scaffold a new INDJS project with all the essentials pre-configured.",
      icon: CodeBracketIcon,
      code: "npx indjs create my-app"
    },
    {
      step: 2,
      title: "Build Your Features",
      description: "Write React components, create API routes, and build your application with hot reload.",
      icon: ServerIcon,
      code: "npm run dev"
    },
    {
      step: 3,
      title: "Deploy Everywhere",
      description: "Build for web, desktop, or mobile with a single command. Deploy to any platform.",
      icon: GlobeIcon,
      code: "npm run build"
    }
  ];
  const codeExamples = [
    {
      tab: "Page",
      filename: "pages/index.jsx",
      code: `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold">
        Welcome to <span className="text-indigo-600">INDJS</span>
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        The React framework for the modern web
      </p>
    </main>
  )
}`
    },
    {
      tab: "API",
      filename: "pages/api/users.js",
      code: `export async function GET({ req }) {
  const users = await db.users.findMany();
  return { users, count: users.length };
}

export async function POST({ body }) {
  const user = await db.users.create({
    data: { name: body.name, email: body.email }
  });
  return { user, status: 201 };
}`
    },
    {
      tab: "Layout",
      filename: "pages/_layout.jsx",
      code: `import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}`
    }
  ];
  return /* @__PURE__ */ jsxs4("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsxs4("section", { className: "relative overflow-hidden bg-white", children: [
      /* @__PURE__ */ jsx26("div", { className: "absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-indigo-300/40 to-purple-300/40 rounded-full blur-[100px] animate-pulse" }),
      /* @__PURE__ */ jsx26("div", { className: "absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-pink-300/30 to-rose-300/30 rounded-full blur-[120px] animate-pulse", style: { animationDelay: "1s" } }),
      /* @__PURE__ */ jsx26("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-[150px]" }),
      /* @__PURE__ */ jsx26("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-24", children: /* @__PURE__ */ jsxs4("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxs4(
          "a",
          {
            href: "https://github.com/Rohitsharma6377/IND/releases",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors mb-8 group",
            children: [
              /* @__PURE__ */ jsxs4("span", { className: "relative flex h-2 w-2", children: [
                /* @__PURE__ */ jsx26("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" }),
                /* @__PURE__ */ jsx26("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-indigo-600" })
              ] }),
              "INDJS 3.1.2 is here",
              /* @__PURE__ */ jsx26("svg", { className: "w-4 h-4 group-hover:translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs4("h1", { className: "text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6", children: [
          "The React Framework",
          /* @__PURE__ */ jsx26("br", {}),
          /* @__PURE__ */ jsx26("span", { className: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent", children: "for Universal Apps" })
        ] }),
        /* @__PURE__ */ jsx26("p", { className: "max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed mb-10", children: "INDJS enables you to create full-stack web, desktop, and mobile applications with React. Build production-ready apps with zero configuration." }),
        /* @__PURE__ */ jsxs4("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16", children: [
          /* @__PURE__ */ jsx26(Link, { href: "/docs", children: /* @__PURE__ */ jsxs4("button", { className: "group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl", children: [
            "Get Started",
            /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5 group-hover:translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })
          ] }) }),
          /* @__PURE__ */ jsxs4(
            "button",
            {
              onClick: copyCommand,
              className: "group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-mono text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 border border-gray-200",
              children: [
                /* @__PURE__ */ jsx26("span", { className: "text-gray-400", children: "$" }),
                /* @__PURE__ */ jsx26("span", { children: "npx indjs create my-app" }),
                /* @__PURE__ */ jsx26("span", { className: `transition-all duration-200 ${copied ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"}`, children: copied ? /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) : /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "relative max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsx26("div", { className: "absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" }),
          /* @__PURE__ */ jsxs4("div", { className: "relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800", children: [
            /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2 px-4 py-3 bg-gray-800/80 border-b border-gray-700", children: [
              /* @__PURE__ */ jsxs4("div", { className: "flex gap-1.5", children: [
                /* @__PURE__ */ jsx26("div", { className: "w-3 h-3 rounded-full bg-red-500" }),
                /* @__PURE__ */ jsx26("div", { className: "w-3 h-3 rounded-full bg-yellow-500" }),
                /* @__PURE__ */ jsx26("div", { className: "w-3 h-3 rounded-full bg-green-500" })
              ] }),
              /* @__PURE__ */ jsx26("div", { className: "flex-1 flex justify-center", children: /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2 px-4 py-1 bg-gray-700/50 rounded-md text-gray-400 text-sm", children: [
                /* @__PURE__ */ jsx26("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" }) }),
                "localhost:3000"
              ] }) })
            ] }),
            /* @__PURE__ */ jsx26("div", { className: "flex bg-gray-800/50 border-b border-gray-700 overflow-x-auto", children: codeExamples.map((example, idx) => /* @__PURE__ */ jsxs4(
              "button",
              {
                onClick: () => setActiveTab(idx),
                className: `flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === idx ? "text-white bg-gray-700/50 border-b-2 border-indigo-500" : "text-gray-400 hover:text-gray-300"}`,
                children: [
                  /* @__PURE__ */ jsx26("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
                  example.tab
                ]
              },
              idx
            )) }),
            /* @__PURE__ */ jsxs4("div", { className: "p-4 sm:p-6 overflow-x-auto", children: [
              /* @__PURE__ */ jsx26("div", { className: "text-xs text-gray-500 mb-3 font-mono", children: codeExamples[activeTab].filename }),
              /* @__PURE__ */ jsx26("pre", { className: "text-sm text-gray-300 font-mono leading-relaxed", children: /* @__PURE__ */ jsx26("code", { children: codeExamples[activeTab].code }) })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx26("section", { className: "py-16 bg-gray-50 border-y border-gray-100", children: /* @__PURE__ */ jsxs4("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx26("p", { className: "text-center text-sm font-medium text-gray-500 mb-10", children: "BUILT WITH MODERN TECHNOLOGIES" }),
      /* @__PURE__ */ jsx26("div", { className: "grid grid-cols-3 md:grid-cols-6 gap-8 items-center", children: [
        { name: "React", icon: ReactIcon, color: "text-cyan-500" },
        { name: "Node.js", icon: NodeIcon, color: "text-green-600" },
        { name: "TypeScript", icon: TypeScriptIcon, color: "text-blue-600" },
        { name: "Tailwind", icon: TailwindIcon, color: "text-teal-500" },
        { name: "Vite", icon: ViteIcon, color: "text-purple-500" },
        { name: "esbuild", icon: PackageIcon, color: "text-yellow-500" }
      ].map((tech, idx) => {
        const IconComponent = tech.icon;
        return /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center gap-2 group cursor-default", children: [
          /* @__PURE__ */ jsx26("div", { className: `${tech.color} group-hover:scale-110 transition-transform duration-200`, children: /* @__PURE__ */ jsx26(IconComponent, { className: "w-10 h-10" }) }),
          /* @__PURE__ */ jsx26("span", { className: "text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors", children: tech.name })
        ] }, idx);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx26("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsxs4("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs4("div", { className: "text-center mb-20", children: [
        /* @__PURE__ */ jsx26("h2", { className: "text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4", children: "Why INDJS?" }),
        /* @__PURE__ */ jsx26("p", { className: "text-xl text-gray-500 max-w-2xl mx-auto", children: "Everything you need to build modern applications, out of the box." })
      ] }),
      /* @__PURE__ */ jsx26("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200 rounded-2xl overflow-hidden", children: [
        {
          icon: /* @__PURE__ */ jsxs4("svg", { className: "w-10 h-10", viewBox: "0 0 24 24", fill: "none", stroke: "url(#gradient1)", strokeWidth: "1.5", children: [
            /* @__PURE__ */ jsx26("defs", { children: /* @__PURE__ */ jsxs4("linearGradient", { id: "gradient1", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsx26("stop", { offset: "0%", stopColor: "#6366f1" }),
              /* @__PURE__ */ jsx26("stop", { offset: "100%", stopColor: "#a855f7" })
            ] }) }),
            /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 10V3L4 14h7v7l9-11h-7z" })
          ] }),
          title: "Lightning Fast",
          description: "Built on esbuild and Vite for instant HMR and sub-second cold starts."
        },
        {
          icon: /* @__PURE__ */ jsxs4("svg", { className: "w-10 h-10", viewBox: "0 0 24 24", fill: "none", stroke: "url(#gradient2)", strokeWidth: "1.5", children: [
            /* @__PURE__ */ jsx26("defs", { children: /* @__PURE__ */ jsxs4("linearGradient", { id: "gradient2", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsx26("stop", { offset: "0%", stopColor: "#06b6d4" }),
              /* @__PURE__ */ jsx26("stop", { offset: "100%", stopColor: "#3b82f6" })
            ] }) }),
            /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" })
          ] }),
          title: "File-Based Routing",
          description: "Intuitive routing based on your file structure. Create files, get routes."
        },
        {
          icon: /* @__PURE__ */ jsxs4("svg", { className: "w-10 h-10", viewBox: "0 0 24 24", fill: "none", stroke: "url(#gradient3)", strokeWidth: "1.5", children: [
            /* @__PURE__ */ jsx26("defs", { children: /* @__PURE__ */ jsxs4("linearGradient", { id: "gradient3", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsx26("stop", { offset: "0%", stopColor: "#f43f5e" }),
              /* @__PURE__ */ jsx26("stop", { offset: "100%", stopColor: "#f97316" })
            ] }) }),
            /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" })
          ] }),
          title: "Universal Platform",
          description: "Deploy to Web, Desktop, and Mobile from a single React codebase."
        },
        {
          icon: /* @__PURE__ */ jsxs4("svg", { className: "w-10 h-10", viewBox: "0 0 24 24", fill: "none", stroke: "url(#gradient4)", strokeWidth: "1.5", children: [
            /* @__PURE__ */ jsx26("defs", { children: /* @__PURE__ */ jsxs4("linearGradient", { id: "gradient4", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsx26("stop", { offset: "0%", stopColor: "#10b981" }),
              /* @__PURE__ */ jsx26("stop", { offset: "100%", stopColor: "#14b8a6" })
            ] }) }),
            /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" })
          ] }),
          title: "Built-in Auth",
          description: "JWT authentication, bcrypt hashing, OAuth, and session management."
        },
        {
          icon: /* @__PURE__ */ jsxs4("svg", { className: "w-10 h-10", viewBox: "0 0 24 24", fill: "none", stroke: "url(#gradient5)", strokeWidth: "1.5", children: [
            /* @__PURE__ */ jsx26("defs", { children: /* @__PURE__ */ jsxs4("linearGradient", { id: "gradient5", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsx26("stop", { offset: "0%", stopColor: "#8b5cf6" }),
              /* @__PURE__ */ jsx26("stop", { offset: "100%", stopColor: "#d946ef" })
            ] }) }),
            /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" })
          ] }),
          title: "Database Adapters",
          description: "PostgreSQL, MongoDB, SQLite, and Prisma ORM with type-safe queries."
        },
        {
          icon: /* @__PURE__ */ jsxs4("svg", { className: "w-10 h-10", viewBox: "0 0 24 24", fill: "none", stroke: "url(#gradient6)", strokeWidth: "1.5", children: [
            /* @__PURE__ */ jsx26("defs", { children: /* @__PURE__ */ jsxs4("linearGradient", { id: "gradient6", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsx26("stop", { offset: "0%", stopColor: "#f59e0b" }),
              /* @__PURE__ */ jsx26("stop", { offset: "100%", stopColor: "#fbbf24" })
            ] }) }),
            /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" })
          ] }),
          title: "TypeScript Ready",
          description: "Full TypeScript support with auto-generated types and IDE IntelliSense."
        }
      ].map((feature, idx) => /* @__PURE__ */ jsxs4("div", { className: "group p-8 border-b md:border-r border-gray-200 last:border-b-0 md:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r-0 hover:bg-gray-50 transition-colors", children: [
        /* @__PURE__ */ jsx26("div", { className: "mb-4", children: feature.icon }),
        /* @__PURE__ */ jsx26("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: feature.title }),
        /* @__PURE__ */ jsx26("p", { className: "text-gray-500 leading-relaxed", children: feature.description })
      ] }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx26("section", { className: "py-24 bg-gray-50 overflow-hidden", children: /* @__PURE__ */ jsx26("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs4("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsxs4("h2", { className: "text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6", children: [
          "Developer Experience",
          /* @__PURE__ */ jsx26("span", { className: "block text-indigo-600", children: "Redefined" })
        ] }),
        /* @__PURE__ */ jsx26("p", { className: "text-xl text-gray-500 mb-8 leading-relaxed", children: "Write less code, build faster. INDJS handles the complexity while you focus on creating amazing products." }),
        /* @__PURE__ */ jsx26("div", { className: "space-y-6", children: [
          { title: "Zero Configuration", desc: "Start building immediately with sensible defaults" },
          { title: "Hot Module Replacement", desc: "See changes instantly without page refresh" },
          { title: "Automatic Code Splitting", desc: "Optimized bundles for faster page loads" },
          { title: "Built-in API Routes", desc: "Create backend endpoints alongside your pages" }
        ].map((item, idx) => /* @__PURE__ */ jsxs4("div", { className: "flex gap-4 group", children: [
          /* @__PURE__ */ jsx26("div", { className: "flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors", children: /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5 text-indigo-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
          /* @__PURE__ */ jsxs4("div", { children: [
            /* @__PURE__ */ jsx26("h4", { className: "font-semibold text-gray-900", children: item.title }),
            /* @__PURE__ */ jsx26("p", { className: "text-gray-500", children: item.desc })
          ] })
        ] }, idx)) }),
        /* @__PURE__ */ jsx26("div", { className: "mt-10", children: /* @__PURE__ */ jsx26(Link, { href: "/docs", children: /* @__PURE__ */ jsxs4("button", { className: "inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors", children: [
          "Read Documentation",
          /* @__PURE__ */ jsx26("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "relative", children: [
        /* @__PURE__ */ jsx26("div", { className: "absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-10 blur-2xl" }),
        /* @__PURE__ */ jsxs4("div", { className: "relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white", children: [
          /* @__PURE__ */ jsx26(
            "img",
            {
              src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
              alt: "Code editor showing INDJS project",
              className: "w-full h-auto"
            }
          ),
          /* @__PURE__ */ jsx26("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end p-6", children: /* @__PURE__ */ jsxs4("div", { className: "text-white", children: [
            /* @__PURE__ */ jsx26("p", { className: "text-sm font-medium opacity-80", children: "Modern Development" }),
            /* @__PURE__ */ jsx26("p", { className: "text-xl font-bold", children: "Build with confidence" })
          ] }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx26("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsxs4("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs4("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs4("h2", { className: "text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4", children: [
          "One Codebase,",
          /* @__PURE__ */ jsx26("span", { className: "text-indigo-600", children: " Every Platform" })
        ] }),
        /* @__PURE__ */ jsx26("p", { className: "text-xl text-gray-500 max-w-2xl mx-auto", children: "Build once and deploy to web, desktop, and mobile with native performance." })
      ] }),
      /* @__PURE__ */ jsx26("div", { className: "grid md:grid-cols-3 gap-8", children: [
        {
          title: "Web",
          description: "Deploy to Vercel, Netlify, or any hosting with SSR, SSG, and Edge support.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
          features: ["Server-Side Rendering", "Static Generation", "API Routes"],
          color: "from-blue-500 to-cyan-500"
        },
        {
          title: "Desktop",
          description: "Native apps for Windows, macOS, and Linux with Electron integration.",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
          features: ["Native APIs", "Auto Updates", "System Tray"],
          color: "from-purple-500 to-pink-500"
        },
        {
          title: "Mobile",
          description: "iOS and Android apps using Capacitor with native device features.",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
          features: ["Native Plugins", "Push Notifications", "App Store Ready"],
          color: "from-orange-500 to-red-500"
        }
      ].map((platform2, idx) => /* @__PURE__ */ jsxs4("div", { className: "group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300", children: [
        /* @__PURE__ */ jsxs4("div", { className: "relative h-48 overflow-hidden", children: [
          /* @__PURE__ */ jsx26(
            "img",
            {
              src: platform2.image,
              alt: `${platform2.title} development`,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            }
          ),
          /* @__PURE__ */ jsx26("div", { className: `absolute inset-0 bg-gradient-to-t ${platform2.color} opacity-60` }),
          /* @__PURE__ */ jsx26("div", { className: "absolute bottom-4 left-4", children: /* @__PURE__ */ jsx26("h3", { className: "text-2xl font-bold text-white", children: platform2.title }) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx26("p", { className: "text-gray-600 mb-4", children: platform2.description }),
          /* @__PURE__ */ jsx26("ul", { className: "space-y-2", children: platform2.features.map((feature, fidx) => /* @__PURE__ */ jsxs4("li", { className: "flex items-center gap-2 text-sm text-gray-500", children: [
            /* @__PURE__ */ jsx26("svg", { className: "w-4 h-4 text-indigo-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx26("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
            feature
          ] }, fidx)) })
        ] })
      ] }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx26("section", { className: "py-24 bg-gray-900 text-white", children: /* @__PURE__ */ jsx26("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx26("div", { className: "grid md:grid-cols-4 gap-8 text-center", children: [
      { value: "10x", label: "Faster Development", icon: ZapIcon, color: "from-amber-400 to-orange-500" },
      { value: "100+", label: "Components", icon: PuzzleIcon, color: "from-purple-400 to-pink-500" },
      { value: "50%", label: "Less Code", icon: FileEditIcon, color: "from-cyan-400 to-blue-500" },
      { value: "3", label: "Platforms", icon: RocketIcon, color: "from-green-400 to-emerald-500" }
    ].map((stat, idx) => {
      const IconComponent = stat.icon;
      return /* @__PURE__ */ jsxs4("div", { className: "p-6 group", children: [
        /* @__PURE__ */ jsx26("div", { className: `w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`, children: /* @__PURE__ */ jsx26(IconComponent, { className: "w-8 h-8 text-white" }) }),
        /* @__PURE__ */ jsx26("div", { className: "text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent", children: stat.value }),
        /* @__PURE__ */ jsx26("div", { className: "text-gray-400 mt-2 font-medium", children: stat.label })
      ] }, idx);
    }) }) }) }),
    /* @__PURE__ */ jsx26("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsxs4("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs4("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs4("h2", { className: "text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4", children: [
          "How It ",
          /* @__PURE__ */ jsx26("span", { className: "text-indigo-600", children: "Works" })
        ] }),
        /* @__PURE__ */ jsx26("p", { className: "text-xl text-gray-500 max-w-2xl mx-auto", children: "Get started in minutes with just three simple steps" })
      ] }),
      /* @__PURE__ */ jsx26("div", { className: "grid md:grid-cols-3 gap-8", children: howItWorks.map((item, idx) => {
        const IconComponent = item.icon;
        return /* @__PURE__ */ jsxs4("div", { className: "relative group", children: [
          idx < howItWorks.length - 1 && /* @__PURE__ */ jsx26("div", { className: "hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" }),
          /* @__PURE__ */ jsxs4("div", { className: "relative bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200", children: [
            /* @__PURE__ */ jsx26("div", { className: "absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg", children: item.step }),
            /* @__PURE__ */ jsx26("div", { className: "w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx26(IconComponent, { className: "w-7 h-7 text-indigo-600" }) }),
            /* @__PURE__ */ jsx26("h3", { className: "text-xl font-bold text-gray-900 mb-3", children: item.title }),
            /* @__PURE__ */ jsx26("p", { className: "text-gray-600 mb-4", children: item.description }),
            /* @__PURE__ */ jsxs4("div", { className: "bg-gray-900 rounded-lg p-3 font-mono text-sm text-green-400", children: [
              "$ ",
              item.code
            ] })
          ] })
        ] }, idx);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx26("section", { className: "py-24 bg-gradient-to-br from-gray-50 to-indigo-50", children: /* @__PURE__ */ jsxs4("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs4("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs4("h2", { className: "text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4", children: [
          "Loved by ",
          /* @__PURE__ */ jsx26("span", { className: "text-indigo-600", children: "Developers" })
        ] }),
        /* @__PURE__ */ jsx26("p", { className: "text-xl text-gray-500 max-w-2xl mx-auto", children: "See what developers around the world are saying about INDJS" })
      ] }),
      /* @__PURE__ */ jsx26("div", { className: "grid md:grid-cols-2 gap-8", children: testimonials.map((testimonial, idx) => /* @__PURE__ */ jsxs4(
        "div",
        {
          className: "relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100",
          children: [
            /* @__PURE__ */ jsx26("div", { className: "absolute -top-4 -left-2 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center rotate-12", children: /* @__PURE__ */ jsx26(QuoteIcon, { className: "w-6 h-6 text-white -rotate-12" }) }),
            /* @__PURE__ */ jsx26("div", { className: "flex gap-1 mb-4 ml-8", children: [...Array(testimonial.rating)].map((_, i) => /* @__PURE__ */ jsx26(StarIcon, { className: "w-5 h-5 text-amber-400" }, i)) }),
            /* @__PURE__ */ jsxs4("p", { className: "text-gray-700 text-lg leading-relaxed mb-6", children: [
              '"',
              testimonial.content,
              '"'
            ] }),
            /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx26(
                "img",
                {
                  src: testimonial.avatar,
                  alt: testimonial.name,
                  className: "w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
                }
              ),
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx26("h4", { className: "font-semibold text-gray-900", children: testimonial.name }),
                /* @__PURE__ */ jsx26("p", { className: "text-sm text-gray-500", children: testimonial.role })
              ] })
            ] })
          ]
        },
        idx
      )) })
    ] }) }),
    /* @__PURE__ */ jsx26("section", { className: "py-16 bg-white border-y border-gray-100", children: /* @__PURE__ */ jsxs4("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx26("p", { className: "text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-10", children: "Trusted by innovative companies worldwide" }),
      /* @__PURE__ */ jsx26("div", { className: "grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500", children: [
        { name: "Vercel", letter: "V" },
        { name: "Stripe", letter: "S" },
        { name: "Notion", letter: "N" },
        { name: "Linear", letter: "L" },
        { name: "Figma", letter: "F" },
        { name: "Discord", letter: "D" }
      ].map((company, idx) => /* @__PURE__ */ jsx26("div", { className: "flex items-center justify-center group cursor-default", children: /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx26("div", { className: "w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx26("span", { className: "text-white font-bold text-lg", children: company.letter }) }),
        /* @__PURE__ */ jsx26("span", { className: "text-xl font-bold text-gray-900 hidden sm:block", children: company.name })
      ] }) }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx26("section", { className: "py-24 bg-gray-50", children: /* @__PURE__ */ jsxs4("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs4("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs4("h2", { className: "text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4", children: [
          "Frequently Asked ",
          /* @__PURE__ */ jsx26("span", { className: "text-indigo-600", children: "Questions" })
        ] }),
        /* @__PURE__ */ jsx26("p", { className: "text-xl text-gray-500 max-w-2xl mx-auto", children: "Everything you need to know about INDJS" })
      ] }),
      /* @__PURE__ */ jsx26("div", { className: "space-y-4", children: faqs.map((faq, idx) => /* @__PURE__ */ jsxs4(
        "div",
        {
          className: "bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-indigo-200 transition-colors",
          children: [
            /* @__PURE__ */ jsxs4(
              "button",
              {
                onClick: () => setOpenFaq(openFaq === idx ? null : idx),
                className: "w-full px-6 py-5 text-left flex items-center justify-between gap-4",
                children: [
                  /* @__PURE__ */ jsx26("span", { className: "font-semibold text-gray-900", children: faq.question }),
                  /* @__PURE__ */ jsx26(
                    ChevronDownIcon,
                    {
                      className: `w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx26(
              "div",
              {
                className: `overflow-hidden transition-all duration-300 ${openFaq === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`,
                children: /* @__PURE__ */ jsx26("div", { className: "px-6 pb-5 text-gray-600 leading-relaxed", children: faq.answer })
              }
            )
          ]
        },
        idx
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs4("section", { className: "py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx26("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx26("div", { className: "absolute inset-0 bg-grid-white bg-[size:30px_30px]" }) }),
      /* @__PURE__ */ jsxs4("div", { className: "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsx26("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur rounded-2xl mb-8", children: /* @__PURE__ */ jsx26(MailIcon, { className: "w-8 h-8 text-white" }) }),
        /* @__PURE__ */ jsx26("h2", { className: "text-3xl sm:text-4xl font-bold mb-4", children: "Stay Updated" }),
        /* @__PURE__ */ jsx26("p", { className: "text-lg text-indigo-200 mb-8 max-w-xl mx-auto", children: "Get notified about new features, updates, and exclusive content. No spam, unsubscribe anytime." }),
        /* @__PURE__ */ jsxs4("form", { className: "flex flex-col sm:flex-row gap-4 max-w-lg mx-auto", children: [
          /* @__PURE__ */ jsx26(
            "input",
            {
              type: "email",
              placeholder: "Enter your email",
              className: "flex-1 px-5 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
            }
          ),
          /* @__PURE__ */ jsx26(
            "button",
            {
              type: "submit",
              className: "px-8 py-4 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-indigo-100 transition-colors shadow-lg hover:shadow-xl",
              children: "Subscribe"
            }
          )
        ] }),
        /* @__PURE__ */ jsx26("p", { className: "text-sm text-indigo-300 mt-4", children: "Join 10,000+ developers already subscribed" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("section", { className: "relative py-24 overflow-hidden", children: [
      /* @__PURE__ */ jsx26("div", { className: "absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" }),
      /* @__PURE__ */ jsx26("div", { className: "absolute inset-0 opacity-30", children: /* @__PURE__ */ jsxs4("svg", { className: "w-full h-full", viewBox: "0 0 1440 800", fill: "none", children: [
        /* @__PURE__ */ jsx26("circle", { cx: "200", cy: "200", r: "300", fill: "white", fillOpacity: "0.1" }),
        /* @__PURE__ */ jsx26("circle", { cx: "1200", cy: "600", r: "400", fill: "white", fillOpacity: "0.1" })
      ] }) }),
      /* @__PURE__ */ jsxs4("div", { className: "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsx26("h2", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight", children: "Ready to ship faster?" }),
        /* @__PURE__ */ jsx26("p", { className: "text-xl text-white/80 mb-10 max-w-2xl mx-auto", children: "Start building your next project with INDJS today. Zero configuration, maximum productivity." }),
        /* @__PURE__ */ jsxs4("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
          /* @__PURE__ */ jsx26(Link, { href: "/docs", children: /* @__PURE__ */ jsxs4("button", { className: "group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg", children: [
            "Get Started",
            /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5 group-hover:translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })
          ] }) }),
          /* @__PURE__ */ jsxs4(
            "a",
            {
              href: "https://github.com/Rohitsharma6377/IND",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all",
              children: [
                /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { fillRule: "evenodd", d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", clipRule: "evenodd" }) }),
                "View on GitHub"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  Home as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvaW5kZXguanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvcGxhdGZvcm0ubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pbWFnZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy91bml2ZXJzYWwvcmVzb2x2ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvc3R5bGUtc2hlZXQubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9saW5rLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JvbGwtdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQtaW5wdXQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9idXR0b24uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS1pbmRpY2F0b3IuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zd2l0Y2guanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9mbGF0LWxpc3QuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtb3BhY2l0eS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3ByZXNzYWJsZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLWJhY2tncm91bmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9tb2RhbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NhZmUtYXJlYS12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhdHVzLWJhci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NlY3Rpb24tbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2tleWJvYXJkLWF2b2lkaW5nLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9yZWZyZXNoLWNvbnRyb2wuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtaGlnaGxpZ2h0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdG91Y2hhYmxlLXdpdGhvdXQtZmVlZGJhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JlZW4uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jb250YWluZXIuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jYXJkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvZ3JpZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N0YWNrLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaWNvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2RpbWVuc2lvbnMubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9saW5raW5nLm1qcyIsICIuLi8uLi9jb21wb25lbnRzL0ZlYXR1cmVDYXJkLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdpbmRqcyc7XHJcbmltcG9ydCBGZWF0dXJlQ2FyZCBmcm9tICcuLi9jb21wb25lbnRzL0ZlYXR1cmVDYXJkJztcclxuXHJcbi8vIFNWRyBJY29uIENvbXBvbmVudHNcclxuY29uc3QgUmVhY3RJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTggaC04XCIgfSkgPT4gKFxyXG4gIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICA8cGF0aCBkPVwiTTEyIDEwLjExYzEuMDMgMCAxLjg3Ljg0IDEuODcgMS44OSAwIDEtLjg0IDEuODUtMS44NyAxLjg1LTEuMDMgMC0xLjg3LS44NS0xLjg3LTEuODUgMC0xLjA1Ljg0LTEuODkgMS44Ny0xLjg5TTcuMzcgMjBjLjYzLjM4IDIuMDEtLjIgMy42LTEuNy0uNTItLjU5LTEuMDMtMS4yMy0xLjUxLTEuOWEyMi43IDIyLjcgMCAwMS0yLjQtLjM2Yy0uNTEgMi4xNC0uMzIgMy42MS4zMSAzLjk2bS43MS01Ljc0bC0uMjktLjUxYy0uMTEuMjktLjIyLjU4LS4yOS44Ni4yNy4wNi41Ny4xMS44OC4xNmwtLjMtLjUxbTYuNTQtLjc2bC44MS0xLjUtLjgxLTEuNWMtLjMtLjUzLS42Mi0xLS45MS0xLjQ3QzEzLjE3IDkgMTIuNiA5IDEyIDlzLTEuMTcgMC0xLjcxLjAzYy0uMjkuNDctLjYxLjk0LS45MSAxLjQ3TDguNTcgMTJsLjgxIDEuNWMuMy41My42MiAxIC45MSAxLjQ3LjU0LjAzIDEuMTEuMDMgMS43MS4wM3MxLjE3IDAgMS43MS0uMDNjLjI5LS40Ny42MS0uOTQuOTEtMS40N00xMiA2Ljc4Yy0uMTkuMjItLjM5LjQ1LS41OS43MmgxLjE4Yy0uMi0uMjctLjQtLjUtLjU5LS43Mm0wIDEwLjQ0Yy4xOS0uMjIuMzktLjQ1LjU5LS43MmgtMS4xOGMuMi4yNy40LjUuNTkuNzJNMTYuNjIgNGMtLjYyLS4zOC0yIC4yLTMuNTkgMS43LjUyLjU5IDEuMDMgMS4yMyAxLjUxIDEuOS44Mi4wOCAxLjYzLjIgMi40LjM2LjUxLTIuMTQuMzItMy42MS0uMzItMy45Nm0tLjcgNS43NGwuMjkuNTFjLjExLS4yOS4yMi0uNTguMjktLjg2LS4yNy0uMDYtLjU3LS4xMS0uODgtLjE2bC4zLjUxbTEuNDUtNy4wNWMxLjQ3Ljg0IDEuNjMgMy4wNSAxLjAxIDUuNjMgMi41NC43NSA0LjM3IDEuOTkgNC4zNyAzLjY4IDAgMS42OS0xLjgzIDIuOTMtNC4zNyAzLjY4LjYyIDIuNTguNDYgNC43OS0xLjAxIDUuNjMtMS40Ni44NC0zLjQ1LS4xMi01LjM3LTEuOTUtMS45MiAxLjgzLTMuOTEgMi43OS01LjM4IDEuOTUtMS40Ni0uODQtMS42Mi0zLjA1LTEtNS42My0yLjU0LS43NS00LjM3LTEuOTktNC4zNy0zLjY4IDAtMS42OSAxLjgzLTIuOTMgNC4zNy0zLjY4LS42Mi0yLjU4LS40Ni00Ljc5IDEtNS42MyAxLjQ3LS44NCAzLjQ2LjEyIDUuMzggMS45NSAxLjkyLTEuODMgMy45MS0yLjc5IDUuMzctMS45NU0xNy4wOCAxMmMuMzQuNzUuNjQgMS41Ljg5IDIuMjYgMi4xLS42MyAzLjI4LTEuNTMgMy4yOC0yLjI2IDAtLjczLTEuMTgtMS42My0zLjI4LTIuMjYtLjI1Ljc2LS41NSAxLjUxLS44OSAyLjI2TTYuOTIgMTJjLS4zNC0uNzUtLjY0LTEuNS0uODktMi4yNi0yLjEuNjMtMy4yOCAxLjUzLTMuMjggMi4yNiAwIC43MyAxLjE4IDEuNjMgMy4yOCAyLjI2LjI1LS43Ni41NS0xLjUxLjg5LTIuMjZtOSAyLjI2bC0uMy41MWMuMzEtLjA1LjYxLS4xLjg4LS4xNi0uMDctLjI4LS4xOC0uNTctLjI5LS44NmwtLjI5LjUxbS0yLjg5IDQuMDRjMS41OSAxLjUgMi45NyAyLjA4IDMuNTkgMS43LjY0LS4zNS44My0xLjgyLjMyLTMuOTYtLjc3LjE2LTEuNTguMjgtMi40LjM2LS40OC42Ny0uOTkgMS4zMS0xLjUxIDEuOU04LjA4IDkuNzRsLjMtLjUxYy0uMzEuMDUtLjYxLjEtLjg4LjE2LjA3LjI4LjE4LjU3LjI5Ljg2bC4yOS0uNTFtMi44OS00LjA0QzkuMzggNC4yIDggMy42MiA3LjM3IDRjLS42My4zNS0uODIgMS44Mi0uMzEgMy45NmEyMi43IDIyLjcgMCAwMTIuNC0uMzZjLjQ4LS42Ny45OS0xLjMxIDEuNTEtMS45elwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBOb2RlSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgPHBhdGggZD1cIk0xMiAxLjg1Yy0uMjcgMC0uNTUuMDctLjc4LjJsLTcuNDQgNC4zYy0uNDguMjgtLjc4LjgtLjc4IDEuMzZ2OC41OGMwIC41Ni4zIDEuMDguNzggMS4zNmwxLjk1IDEuMTJjLjk1LjQ2IDEuMjcuNDcgMS43MS40NyAxLjQgMCAyLjIxLS44NSAyLjIxLTIuMzNWOC40NGMwLS4xMi0uMS0uMjItLjIyLS4yMkg4LjVjLS4xMyAwLS4yMy4xLS4yMy4yMnY4LjQ3YzAgLjY2LS42OCAxLjMxLTEuNzcuNzZMNC40NSAxNi41YS4yNi4yNiAwIDAxLS4xMS0uMjFWNy43MWMwLS4wOS4wNC0uMTcuMTEtLjIxbDcuNDQtNC4yOWMuMDYtLjA0LjE2LS4wNC4yMiAwbDcuNDQgNC4yOWMuMDcuMDQuMTEuMTIuMTEuMjF2OC41OGMwIC4wOC0uMDQuMTYtLjExLjIxbC03LjQ0IDQuMjljLS4wNi4wNC0uMTYuMDQtLjIzIDBMMTAgMTkuNmMtLjA4LS4wNS0uMTgtLjA1LS4yNi0uMDItLjUzLjI0LS42My4yNy0xLjE0LjQtLjEyLjA0LS4zMS4xLjA3LjI4bDIuNDggMS40N2MuMjQuMTQuNS4yMS43OC4yMXMuNTQtLjA3Ljc4LS4yMWw3LjQ0LTQuMjljLjQ4LS4yOC43OC0uOC43OC0xLjM2VjcuNzFjMC0uNTYtLjMtMS4wOC0uNzgtMS4zNmwtNy40NC00LjNjLS4yMy0uMTMtLjUtLjItLjc4LS4yTTE0IDhjMi4xMiAwIDMuNS44OSAzLjUgMi43NSAwIDEuNi0uODggMi4xNS0yLjc4IDIuNDktMS45NC4zMS0yLjE0LjUtMi4xNCAxLjAyIDAgLjQ0LjI2Ljg2IDEuNjMuODYgMS40NiAwIDEuODMtLjM2IDEuODMtMS4xMWgxLjg5YzAgMS44MS0xLjM3IDIuNDktMy43NSAyLjQ5LTIuMTggMC0zLjQ2LS44NC0zLjQ2LTIuNDIgMC0xLjc2IDEuMzctMi4yIDIuODktMi40NSAxLjk0LS4zIDIuMDMtLjU1IDIuMDMtMS4wNyAwLS40Ni0uMzUtLjgyLTEuNDktLjgyLTEuMTIgMC0xLjYxLjM1LTEuNzEgMS4yNkgxMC41Yy4xNC0xLjc0IDEuMzctMi41NSAzLjUtMi41NXpcIi8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBUeXBlU2NyaXB0SWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgPHBhdGggZD1cIk0xLjEyNSAwQy41MDIgMCAwIC41MDIgMCAxLjEyNXYyMS43NUMwIDIzLjQ5OC41MDIgMjQgMS4xMjUgMjRoMjEuNzVjLjYyMyAwIDEuMTI1LS41MDIgMS4xMjUtMS4xMjVWMS4xMjVDMjQgLjUwMiAyMy40OTggMCAyMi44NzUgMHptMTcuMzYzIDkuNzVjLjYxMiAwIDEuMTU0LjAzNyAxLjYyNy4xMTFhNi4zOCA2LjM4IDAgMCAxIDEuMzA2LjM0djIuNDU4YTMuOTUgMy45NSAwIDAgMC0uNjQzLS4zNjEgNS4wOTMgNS4wOTMgMCAwIDAtLjcxNy0uMjYgNS40NTMgNS40NTMgMCAwIDAtMS40MjYtLjJjLS4zIDAtLjU3My4wMjgtLjgxOS4wODZhMi4xIDIuMSAwIDAgMC0uNjIzLjI0MmMtLjE3LjEwNC0uMy4yMjktLjM5My4zNzRhLjg4OC44ODggMCAwIDAtLjE0LjQ5YzAgLjE5Ni4wNTMuMzczLjE1Ni41MjkuMTA0LjE1Ni4yNTIuMzA0LjQ0My40NDRzLjQyMy4yNzYuNjk2LjQxYy4yNzMuMTM1LjU4Mi4yNzQuOTI2LjQxNi40Ny4xOTcuODkyLjQwNyAxLjI2Ni42MjguMzc0LjIyMi42OTUuNDczLjk2My43NTMuMjY4LjI3OS40NzIuNTk4LjYxNC45NTcuMTQyLjM1OS4yMTQuNzc2LjIxNCAxLjI1MyAwIC42NTctLjEyNSAxLjIxLS4zNzMgMS42NTZhMy4wMzMgMy4wMzMgMCAwIDEtMS4wMTIgMS4wODUgNC4zOCA0LjM4IDAgMCAxLTEuNDg3LjU5NmMtLjU2Ni4xMi0xLjE2My4xOC0xLjc5LjE4YTkuOTE2IDkuOTE2IDAgMCAxLTEuODQtLjE2NCA1LjU0NCA1LjU0NCAwIDAgMS0xLjUxMi0uNDkzdi0yLjYzYTUuMDMzIDUuMDMzIDAgMCAwIDMuMjM3IDEuMmMuMzMzIDAgLjYyNC0uMDMuODcyLS4wOS4yNDktLjA2LjQ1Ni0uMTQ0LjYyMy0uMjUuMTY2LS4xMDguMjktLjIzNC4zNzMtLjM4YTEuMDIzIDEuMDIzIDAgMCAwLS4wNzQtMS4wODkgMi4xMiAyLjEyIDAgMCAwLS41MzctLjUgNS41OTcgNS41OTcgMCAwIDAtLjgwNy0uNDQ0IDI3LjcyIDI3LjcyIDAgMCAwLTEuMDA3LS40MzZjLS45MTgtLjM4My0xLjYwMi0uODUyLTIuMDUzLTEuNDA1LS40NS0uNTUzLS42NzYtMS4yMjItLjY3Ni0yLjAwNSAwLS42MTQuMTIzLTEuMTQxLjM2OS0xLjU4Mi4yNDYtLjQ0MS41OC0uODA0IDEuMDA0LTEuMDg5YTQuNDk0IDQuNDk0IDAgMCAxIDEuNDctLjYyOSA3LjUzNiA3LjUzNiAwIDAgMSAxLjc3LS4yMDF6bS0xNS4xMTMuMTg4aDkuNTYzdjIuMTY2SDkuNTA2djkuNjQ2SDYuNzg5di05LjY0NkgzLjM3NXpcIi8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBUYWlsd2luZEljb24gPSAoeyBjbGFzc05hbWUgPSBcInctOCBoLThcIiB9KSA9PiAoXHJcbiAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgIDxwYXRoIGQ9XCJNMTIuMDAxIDQuOGMtMy4yIDAtNS4yIDEuNi02IDQuOCAxLjItMS42IDIuNi0yLjIgNC4yLTEuOC45MTMuMjI4IDEuNTY1Ljg5IDIuMjg4IDEuNjI0QzEzLjY2NiAxMC42MTggMTUuMDI3IDEyIDE4LjAwMSAxMmMzLjIgMCA1LjItMS42IDYtNC44LTEuMiAxLjYtMi42IDIuMi00LjIgMS44LS45MTMtLjIyOC0xLjU2NS0uODktMi4yODgtMS42MjRDMTYuMzM3IDYuMTgyIDE0Ljk3NiA0LjggMTIuMDAxIDQuOHptLTYgNy4yYy0zLjIgMC01LjIgMS42LTYgNC44IDEuMi0xLjYgMi42LTIuMiA0LjItMS44LjkxMy4yMjggMS41NjUuODkgMi4yODggMS42MjQgMS4xNzcgMS4xOTQgMi41MzggMi41NzYgNS41MTIgMi41NzYgMy4yIDAgNS4yLTEuNiA2LTQuOC0xLjIgMS42LTIuNiAyLjItNC4yIDEuOC0uOTEzLS4yMjgtMS41NjUtLjg5LTIuMjg4LTEuNjI0QzEwLjMzNyAxMy4zODIgOC45NzYgMTIgNi4wMDEgMTJ6XCIvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgVml0ZUljb24gPSAoeyBjbGFzc05hbWUgPSBcInctOCBoLThcIiB9KSA9PiAoXHJcbiAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCI+XHJcbiAgICA8cG9seWdvbiBwb2ludHM9XCIxMyAyIDMgMTQgMTIgMTQgMTEgMjIgMjEgMTAgMTIgMTAgMTMgMlwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBQYWNrYWdlSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICA8bGluZSB4MT1cIjE2LjVcIiB5MT1cIjkuNFwiIHgyPVwiNy41XCIgeTI9XCI0LjIxXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMjEgMTZWOGEyIDIgMCAwIDAtMS0xLjczbC03LTRhMiAyIDAgMCAwLTIgMGwtNyA0QTIgMiAwIDAgMCAzIDh2OGEyIDIgMCAwIDAgMSAxLjczbDcgNGEyIDIgMCAwIDAgMiAwbDctNEEyIDIgMCAwIDAgMjEgMTZ6XCIgLz5cclxuICAgIDxwb2x5bGluZSBwb2ludHM9XCIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NlwiIC8+XHJcbiAgICA8bGluZSB4MT1cIjEyXCIgeTE9XCIyMi4wOFwiIHgyPVwiMTJcIiB5Mj1cIjEyXCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IFphcEljb24gPSAoeyBjbGFzc05hbWUgPSBcInctOCBoLThcIiB9KSA9PiAoXHJcbiAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMTMgMiAzIDE0IDEyIDE0IDExIDIyIDIxIDEwIDEyIDEwIDEzIDJcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgUHV6emxlSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICA8cGF0aCBkPVwiTTE5LjQzOSA3Ljg1Yy0uMDQ5LjMyMi4wNTkuNjQ4LjI4OS44NzhsMS41NjggMS41NjhjLjQ3LjQ3LjcwNiAxLjA4Ny43MDYgMS43MDRzLS4yMzUgMS4yMzMtLjcwNiAxLjcwNGwtMS42MTEgMS42MTFhLjk4Ljk4IDAgMCAxLS44MzcuMjc2Yy0uNDctLjA3LS44MDItLjQ4LS45NjgtLjkyNWEyLjUwMSAyLjUwMSAwIDEgMC0zLjIxNCAzLjIxNGMuNDQ2LjE2Ni44NTUuNDk3LjkyNS45NjhhLjk3OS45NzkgMCAwIDEtLjI3Ni44MzdsLTEuNjEgMS42MTFhMi40MDQgMi40MDQgMCAwIDEtMS43MDUuNzA3IDIuNDAyIDIuNDAyIDAgMCAxLTEuNzA0LS43MDdsLTEuNTY4LTEuNTY4YTEuMDI2IDEuMDI2IDAgMCAwLS44NzctLjI5Yy0uNDkzLjA3NC0uODQuNTA0LTEuMDIuOTY4YTIuNSAyLjUgMCAxIDEtMy4yMzctMy4yMzdjLjQ2NC0uMTguODk0LS41MjcuOTY3LTEuMDJhMS4wMjYgMS4wMjYgMCAwIDAtLjI4OS0uODc3bC0xLjU2OC0xLjU2OEEyLjQwMiAyLjQwMiAwIDAgMSAxLjk5OCAxMmMwLS42MTcuMjM2LTEuMjM0LjcwNi0xLjcwNEw0LjMxNSA4LjY4NWEuOTguOTggMCAwIDEgLjgzNy0uMjc2Yy40Ny4wNy44MDIuNDguOTY4LjkyNWEyLjUwMSAyLjUwMSAwIDEgMCAzLjIxNC0zLjIxNGMtLjQ0Ni0uMTY2LS44NTUtLjQ5Ny0uOTI1LS45NjhhLjk3OS45NzkgMCAwIDEgLjI3Ni0uODM3bDEuNjExLTEuNjExYTIuNDA0IDIuNDA0IDAgMCAxIDEuNzA1LS43MDdjLjYxOCAwIDEuMjM1LjIzNiAxLjcwNC43MDdsMS41NjggMS41NjhjLjIzLjIzLjU1Ni4zMzguODc3LjI5LjQ5My0uMDc0Ljg0LS41MDQgMS4wMi0uOTY4YTIuNSAyLjUgMCAxIDEgMy4yMzcgMy4yMzdjLS40NjQuMTgtLjg5NC41MjctLjk2NyAxLjAyWlwiLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IEZpbGVFZGl0SWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICA8cGF0aCBkPVwiTTQgMTMuNVY0YTIgMiAwIDAgMSAyLTJoOC41TDIwIDcuNVYyMGEyIDIgMCAwIDEtMiAyaC01LjVcIiAvPlxyXG4gICAgPHBvbHlsaW5lIHBvaW50cz1cIjE0IDIgMTQgOCAyMCA4XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTAuNDIgMTIuNjFhMi4xIDIuMSAwIDEgMSAyLjk3IDIuOTdMNy45NSAyMSA0IDIybC45OS0zLjk1IDUuNDMtNS40NFpcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgUm9ja2V0SWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICA8cGF0aCBkPVwiTTQuNSAxNi41Yy0xLjUgMS4yNi0yIDUtMiA1czMuNzQtLjUgNS0yYy43MS0uODQuNy0yLjEzLS4wOS0yLjkxYTIuMTggMi4xOCAwIDAgMC0yLjkxLS4wOXpcIiAvPlxyXG4gICAgPHBhdGggZD1cIm0xMiAxNS0zLTNhMjIgMjIgMCAwIDEgMi0zLjk1QTEyLjg4IDEyLjg4IDAgMCAxIDIyIDJjMCAyLjcyLS43OCA3LjUtNiAxMWEyMi4zNSAyMi4zNSAwIDAgMS00IDJ6XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNOSAxMkg0cy41NS0zLjAzIDItNGMxLjYyLTEuMDggNSAwIDUgMFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTEyIDE1djVzMy4wMy0uNTUgNC0yYzEuMDgtMS42MiAwLTUgMC01XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IFF1b3RlSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgPHBhdGggZD1cIk0xNC4wMTcgMjF2LTcuMzkxYzAtNS43MDQgMy43MzEtOS41NyA4Ljk4My0xMC42MDlsLjk5NSAyLjE1MWMtMi40MzIuOTE3LTMuOTk1IDMuNjM4LTMuOTk1IDUuODQ5aDR2MTBoLTkuOTgzem0tMTQuMDE3IDB2LTcuMzkxYzAtNS43MDQgMy43NDgtOS41NyA5LTEwLjYwOWwuOTk2IDIuMTUxYy0yLjQzMy45MTctMy45OTYgMy42MzgtMy45OTYgNS44NDloMy45ODN2MTBoLTkuOTgzelwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBDaGV2cm9uRG93bkljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNiBoLTZcIiB9KSA9PiAoXHJcbiAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgPHBvbHlsaW5lIHBvaW50cz1cIjYgOSAxMiAxNSAxOCA5XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IE1haWxJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTYgaC02XCIgfSkgPT4gKFxyXG4gIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgIDxwYXRoIGQ9XCJNNCA0aDE2YzEuMSAwIDIgLjkgMiAydjEyYzAgMS4xLS45IDItMiAySDRjLTEuMSAwLTItLjktMi0yVjZjMC0xLjEuOS0yIDItMnpcIiAvPlxyXG4gICAgPHBvbHlsaW5lIHBvaW50cz1cIjIyLDYgMTIsMTMgMiw2XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IENvZGVCcmFja2V0SWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy02IGgtNlwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICA8cG9seWxpbmUgcG9pbnRzPVwiMTYgMTggMjIgMTIgMTYgNlwiIC8+XHJcbiAgICA8cG9seWxpbmUgcG9pbnRzPVwiOCA2IDIgMTIgOCAxOFwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBTZXJ2ZXJJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTYgaC02XCIgfSkgPT4gKFxyXG4gIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgIDxyZWN0IHg9XCIyXCIgeT1cIjJcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiOFwiIHJ4PVwiMlwiIHJ5PVwiMlwiIC8+XHJcbiAgICA8cmVjdCB4PVwiMlwiIHk9XCIxNFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCI4XCIgcng9XCIyXCIgcnk9XCIyXCIgLz5cclxuICAgIDxsaW5lIHgxPVwiNlwiIHkxPVwiNlwiIHgyPVwiNi4wMVwiIHkyPVwiNlwiIC8+XHJcbiAgICA8bGluZSB4MT1cIjZcIiB5MT1cIjE4XCIgeDI9XCI2LjAxXCIgeTI9XCIxOFwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBHbG9iZUljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNiBoLTZcIiB9KSA9PiAoXHJcbiAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIxMFwiIC8+XHJcbiAgICA8bGluZSB4MT1cIjJcIiB5MT1cIjEyXCIgeDI9XCIyMlwiIHkyPVwiMTJcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xMiAyYTE1LjMgMTUuMyAwIDAgMSA0IDEwIDE1LjMgMTUuMyAwIDAgMS00IDEwIDE1LjMgMTUuMyAwIDAgMS00LTEwIDE1LjMgMTUuMyAwIDAgMSA0LTEwelwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBTdGFySWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy01IGgtNVwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMTIgMiAxNS4wOSA4LjI2IDIyIDkuMjcgMTcgMTQuMTQgMTguMTggMjEuMDIgMTIgMTcuNzcgNS44MiAyMS4wMiA3IDE0LjE0IDIgOS4yNyA4LjkxIDguMjYgMTIgMlwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xyXG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbY29waWVkLCBzZXRDb3BpZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtvcGVuRmFxLCBzZXRPcGVuRmFxXSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICBjb25zdCBjb3B5Q29tbWFuZCA9ICgpID0+IHtcclxuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KCducHggaW5kanMgY3JlYXRlIG15LWFwcCcpO1xyXG4gICAgc2V0Q29waWVkKHRydWUpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcclxuICB9O1xyXG5cclxuICBjb25zdCB0ZXN0aW1vbmlhbHMgPSBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFwiU2FyYWggQ2hlblwiLFxyXG4gICAgICByb2xlOiBcIkxlYWQgRGV2ZWxvcGVyIGF0IFRlY2hDb3JwXCIsXHJcbiAgICAgIGF2YXRhcjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5NDc5MDEwODM3Ny1iZTljMjliMjkzMzA/dz0xMDAmaD0xMDAmZml0PWNyb3AmY3JvcD1mYWNlXCIsXHJcbiAgICAgIGNvbnRlbnQ6IFwiSU5ESlMgaGFzIGNvbXBsZXRlbHkgdHJhbnNmb3JtZWQgb3VyIGRldmVsb3BtZW50IHdvcmtmbG93LiBXZSBzaGlwcGVkIG91ciBwcm9kdWN0IDN4IGZhc3RlciB0aGFuIGV4cGVjdGVkLiBUaGUgdW5pdmVyc2FsIHBsYXRmb3JtIHN1cHBvcnQgaXMgYSBnYW1lLWNoYW5nZXIuXCIsXHJcbiAgICAgIHJhdGluZzogNVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogXCJNaWNoYWVsIFJvZHJpZ3VlelwiLFxyXG4gICAgICByb2xlOiBcIkNUTyBhdCBTdGFydHVwWFlaXCIsXHJcbiAgICAgIGF2YXRhcjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUwNzAwMzIxMTE2OS0wYTFkZDcyMjhmMmQ/dz0xMDAmaD0xMDAmZml0PWNyb3AmY3JvcD1mYWNlXCIsXHJcbiAgICAgIGNvbnRlbnQ6IFwiVGhlIGJlc3QgUmVhY3QgZnJhbWV3b3JrIEkndmUgZXZlciB1c2VkLiBaZXJvIGNvbmZpZywgYW1hemluZyBEWCwgYW5kIHRoZSBidWlsdC1pbiBBUEkgcm91dGVzIGFyZSBpbmNyZWRpYmx5IHBvd2VyZnVsLiBPdXIgdGVhbSBwcm9kdWN0aXZpdHkgaW5jcmVhc2VkIGJ5IDIwMCUuXCIsXHJcbiAgICAgIHJhdGluZzogNVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogXCJFbWlseSBXYXRzb25cIixcclxuICAgICAgcm9sZTogXCJTZW5pb3IgRW5naW5lZXIgYXQgQmlnVGVjaFwiLFxyXG4gICAgICBhdmF0YXI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0Mzg3NjE2ODEwMzMtNjQ2MWZmYWQ4ZDgwP3c9MTAwJmg9MTAwJmZpdD1jcm9wJmNyb3A9ZmFjZVwiLFxyXG4gICAgICBjb250ZW50OiBcIk1vdmluZyBmcm9tIE5leHQuanMgdG8gSU5ESlMgd2FzIHNlYW1sZXNzLiBUaGUgdW5pdmVyc2FsIGFwcCBzdXBwb3J0IG1lYW50IHdlIGNvdWxkIHRhcmdldCB3ZWIsIGRlc2t0b3AsIGFuZCBtb2JpbGUgZnJvbSBvbmUgY29kZWJhc2UuIEFic29sdXRlbHkgYnJpbGxpYW50IVwiLFxyXG4gICAgICByYXRpbmc6IDVcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFwiRGF2aWQgUGFya1wiLFxyXG4gICAgICByb2xlOiBcIkluZGllIERldmVsb3BlclwiLFxyXG4gICAgICBhdmF0YXI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NzIwOTk2NDU3ODUtNTY1OGFiZjRmZjRlP3c9MTAwJmg9MTAwJmZpdD1jcm9wJmNyb3A9ZmFjZVwiLFxyXG4gICAgICBjb250ZW50OiBcIkFzIGEgc29sbyBkZXZlbG9wZXIsIElOREpTIGxldHMgbWUgcHVuY2ggd2F5IGFib3ZlIG15IHdlaWdodC4gSSBidWlsdCBhbmQgbGF1bmNoZWQgbXkgU2FhUyBpbiBqdXN0IDIgd2Vla3MuIFRoZSBkb2N1bWVudGF0aW9uIGlzIGV4Y2VsbGVudCB0b28hXCIsXHJcbiAgICAgIHJhdGluZzogNVxyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGZhcXMgPSBbXHJcbiAgICB7XHJcbiAgICAgIHF1ZXN0aW9uOiBcIldoYXQgaXMgSU5ESlMgYW5kIGhvdyBpcyBpdCBkaWZmZXJlbnQgZnJvbSBOZXh0LmpzP1wiLFxyXG4gICAgICBhbnN3ZXI6IFwiSU5ESlMgaXMgYSB1bml2ZXJzYWwgUmVhY3QgbWV0YS1mcmFtZXdvcmsgdGhhdCBsZXRzIHlvdSBidWlsZCB3ZWIsIGRlc2t0b3AsIGFuZCBtb2JpbGUgYXBwcyBmcm9tIGEgc2luZ2xlIGNvZGViYXNlLiBVbmxpa2UgTmV4dC5qcyB3aGljaCBmb2N1c2VzIHByaW1hcmlseSBvbiB3ZWIsIElOREpTIHByb3ZpZGVzIG5hdGl2ZSBzdXBwb3J0IGZvciBFbGVjdHJvbiAoZGVza3RvcCkgYW5kIENhcGFjaXRvciAobW9iaWxlKSBvdXQgb2YgdGhlIGJveCwgd2hpbGUgbWFpbnRhaW5pbmcgdGhlIHNhbWUgZ3JlYXQgZGV2ZWxvcGVyIGV4cGVyaWVuY2UuXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHF1ZXN0aW9uOiBcIkRvIEkgbmVlZCB0byBsZWFybiBhbnl0aGluZyBuZXcgdG8gdXNlIElOREpTP1wiLFxyXG4gICAgICBhbnN3ZXI6IFwiSWYgeW91IGtub3cgUmVhY3QsIHlvdSBhbHJlYWR5IGtub3cgOTAlIG9mIHdoYXQgeW91IG5lZWQhIElOREpTIHVzZXMgZmFtaWxpYXIgcGF0dGVybnMgbGlrZSBmaWxlLWJhc2VkIHJvdXRpbmcsIEFQSSByb3V0ZXMsIGFuZCBKU1ggY29tcG9uZW50cy4gVGhlIGxlYXJuaW5nIGN1cnZlIGlzIG1pbmltYWwsIGFuZCBvdXIgY29tcHJlaGVuc2l2ZSBkb2N1bWVudGF0aW9uIHdpbGwgZ2V0IHlvdSB1cCB0byBzcGVlZCBxdWlja2x5LlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBxdWVzdGlvbjogXCJJcyBJTkRKUyBzdWl0YWJsZSBmb3IgcHJvZHVjdGlvbiBhcHBsaWNhdGlvbnM/XCIsXHJcbiAgICAgIGFuc3dlcjogXCJBYnNvbHV0ZWx5ISBJTkRKUyBpcyBkZXNpZ25lZCBmb3IgcHJvZHVjdGlvbiB1c2Ugd2l0aCBmZWF0dXJlcyBsaWtlIGF1dG9tYXRpYyBjb2RlIHNwbGl0dGluZywgU1NSL1NTRyBzdXBwb3J0LCBvcHRpbWl6ZWQgYnVpbGRzLCBhbmQgcm9idXN0IGVycm9yIGhhbmRsaW5nLiBNYW55IGNvbXBhbmllcyBhcmUgYWxyZWFkeSB1c2luZyBJTkRKUyBpbiBwcm9kdWN0aW9uLlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBxdWVzdGlvbjogXCJIb3cgZG8gSSBkZXBsb3kgYW4gSU5ESlMgYXBwbGljYXRpb24/XCIsXHJcbiAgICAgIGFuc3dlcjogXCJJTkRKUyBhcHBzIGNhbiBiZSBkZXBsb3llZCBhbnl3aGVyZSEgRm9yIHdlYiwgZGVwbG95IHRvIFZlcmNlbCwgTmV0bGlmeSwgQVdTLCBvciBhbnkgTm9kZS5qcyBob3N0aW5nLiBGb3IgZGVza3RvcCwgdXNlIG91ciBidWlsdC1pbiBFbGVjdHJvbiBwYWNrYWdpbmcuIEZvciBtb2JpbGUsIHdlIGludGVncmF0ZSBzZWFtbGVzc2x5IHdpdGggQ2FwYWNpdG9yIGZvciBpT1MgYW5kIEFuZHJvaWQgYnVpbGRzLlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBxdWVzdGlvbjogXCJJcyBJTkRKUyBmcmVlIGFuZCBvcGVuIHNvdXJjZT9cIixcclxuICAgICAgYW5zd2VyOiBcIlllcyEgSU5ESlMgaXMgY29tcGxldGVseSBmcmVlIGFuZCBvcGVuIHNvdXJjZSB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuIFlvdSBjYW4gdXNlIGl0IGZvciBwZXJzb25hbCBwcm9qZWN0cywgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCBldmVyeXRoaW5nIGluIGJldHdlZW4uIFdlIGFsc28gd2VsY29tZSBjb250cmlidXRpb25zIGZyb20gdGhlIGNvbW11bml0eS5cIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgcXVlc3Rpb246IFwiV2hhdCBraW5kIG9mIHN1cHBvcnQgaXMgYXZhaWxhYmxlP1wiLFxyXG4gICAgICBhbnN3ZXI6IFwiV2Ugb2ZmZXIgZXh0ZW5zaXZlIGRvY3VtZW50YXRpb24sIGEgRGlzY29yZCBjb21tdW5pdHkgd2l0aCB0aG91c2FuZHMgb2YgZGV2ZWxvcGVycywgR2l0SHViIGRpc2N1c3Npb25zLCBhbmQgcmVndWxhciB1cGRhdGVzLiBGb3IgZW50ZXJwcmlzZSBuZWVkcywgd2UgYWxzbyBvZmZlciBwcmVtaXVtIHN1cHBvcnQgcGFja2FnZXMgd2l0aCBkZWRpY2F0ZWQgYXNzaXN0YW5jZS5cIlxyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGhvd0l0V29ya3MgPSBbXHJcbiAgICB7XHJcbiAgICAgIHN0ZXA6IDEsXHJcbiAgICAgIHRpdGxlOiBcIkNyZWF0ZSBZb3VyIFByb2plY3RcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwiUnVuIG9uZSBjb21tYW5kIHRvIHNjYWZmb2xkIGEgbmV3IElOREpTIHByb2plY3Qgd2l0aCBhbGwgdGhlIGVzc2VudGlhbHMgcHJlLWNvbmZpZ3VyZWQuXCIsXHJcbiAgICAgIGljb246IENvZGVCcmFja2V0SWNvbixcclxuICAgICAgY29kZTogXCJucHggaW5kanMgY3JlYXRlIG15LWFwcFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzdGVwOiAyLFxyXG4gICAgICB0aXRsZTogXCJCdWlsZCBZb3VyIEZlYXR1cmVzXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIldyaXRlIFJlYWN0IGNvbXBvbmVudHMsIGNyZWF0ZSBBUEkgcm91dGVzLCBhbmQgYnVpbGQgeW91ciBhcHBsaWNhdGlvbiB3aXRoIGhvdCByZWxvYWQuXCIsXHJcbiAgICAgIGljb246IFNlcnZlckljb24sXHJcbiAgICAgIGNvZGU6IFwibnBtIHJ1biBkZXZcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc3RlcDogMyxcclxuICAgICAgdGl0bGU6IFwiRGVwbG95IEV2ZXJ5d2hlcmVcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwiQnVpbGQgZm9yIHdlYiwgZGVza3RvcCwgb3IgbW9iaWxlIHdpdGggYSBzaW5nbGUgY29tbWFuZC4gRGVwbG95IHRvIGFueSBwbGF0Zm9ybS5cIixcclxuICAgICAgaWNvbjogR2xvYmVJY29uLFxyXG4gICAgICBjb2RlOiBcIm5wbSBydW4gYnVpbGRcIlxyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGNvZGVFeGFtcGxlcyA9IFtcclxuICAgIHtcclxuICAgICAgdGFiOiAnUGFnZScsXHJcbiAgICAgIGZpbGVuYW1lOiAncGFnZXMvaW5kZXguanN4JyxcclxuICAgICAgY29kZTogYGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxtYWluIGNsYXNzTmFtZT1cImZsZXggbWluLWgtc2NyZWVuIGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTI0XCI+XHJcbiAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTZ4bCBmb250LWJvbGRcIj5cclxuICAgICAgICBXZWxjb21lIHRvIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTYwMFwiPklOREpTPC9zcGFuPlxyXG4gICAgICA8L2gxPlxyXG4gICAgICA8cCBjbGFzc05hbWU9XCJtdC00IHRleHQteGwgdGV4dC1ncmF5LTYwMFwiPlxyXG4gICAgICAgIFRoZSBSZWFjdCBmcmFtZXdvcmsgZm9yIHRoZSBtb2Rlcm4gd2ViXHJcbiAgICAgIDwvcD5cclxuICAgIDwvbWFpbj5cclxuICApXHJcbn1gXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0YWI6ICdBUEknLFxyXG4gICAgICBmaWxlbmFtZTogJ3BhZ2VzL2FwaS91c2Vycy5qcycsXHJcbiAgICAgIGNvZGU6IGBleHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHsgcmVxIH0pIHtcclxuICBjb25zdCB1c2VycyA9IGF3YWl0IGRiLnVzZXJzLmZpbmRNYW55KCk7XHJcbiAgcmV0dXJuIHsgdXNlcnMsIGNvdW50OiB1c2Vycy5sZW5ndGggfTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QoeyBib2R5IH0pIHtcclxuICBjb25zdCB1c2VyID0gYXdhaXQgZGIudXNlcnMuY3JlYXRlKHtcclxuICAgIGRhdGE6IHsgbmFtZTogYm9keS5uYW1lLCBlbWFpbDogYm9keS5lbWFpbCB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHsgdXNlciwgc3RhdHVzOiAyMDEgfTtcclxufWBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRhYjogJ0xheW91dCcsXHJcbiAgICAgIGZpbGVuYW1lOiAncGFnZXMvX2xheW91dC5qc3gnLFxyXG4gICAgICBjb2RlOiBgaW1wb3J0IE5hdmJhciBmcm9tICcuLi9jb21wb25lbnRzL05hdmJhcic7XHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Gb290ZXInO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMYXlvdXQoeyBjaGlsZHJlbiB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGZsZXggZmxleC1jb2xcIj5cclxuICAgICAgPE5hdmJhciAvPlxyXG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJmbGV4LTFcIj57Y2hpbGRyZW59PC9tYWluPlxyXG4gICAgICA8Rm9vdGVyIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59YFxyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy13aGl0ZVwiPlxyXG4gICAgICB7LyogSGVybyBTZWN0aW9uIC0gTmV4dC5qcyBTdHlsZSAqL31cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIGJnLXdoaXRlXCI+XHJcbiAgICAgICAgey8qIEdyYWRpZW50IE9yYnMgKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTEvNCB3LVs1MDBweF0gaC1bNTAwcHhdIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tMzAwLzQwIHRvLXB1cnBsZS0zMDAvNDAgcm91bmRlZC1mdWxsIGJsdXItWzEwMHB4XSBhbmltYXRlLXB1bHNlXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMCByaWdodC0xLzQgdy1bNjAwcHhdIGgtWzYwMHB4XSBiZy1ncmFkaWVudC10by1yIGZyb20tcGluay0zMDAvMzAgdG8tcm9zZS0zMDAvMzAgcm91bmRlZC1mdWxsIGJsdXItWzEyMHB4XSBhbmltYXRlLXB1bHNlXCIgc3R5bGU9e3sgYW5pbWF0aW9uRGVsYXk6ICcxcycgfX0+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMS8yIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB3LVs4MDBweF0gaC1bODAwcHhdIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1jeWFuLTIwMC8yMCB0by1ibHVlLTIwMC8yMCByb3VuZGVkLWZ1bGwgYmx1ci1bMTUwcHhdXCI+PC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBwdC0yMCBwYi0xNiBzbTpwdC0zMiBzbTpwYi0yNFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICB7LyogVmVyc2lvbiBCYWRnZSAqL31cclxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9Sb2hpdHNoYXJtYTYzNzcvSU5EL3JlbGVhc2VzXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXHJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTEuNSBiZy1ncmF5LTEwMCBob3ZlcjpiZy1ncmF5LTIwMCByb3VuZGVkLWZ1bGwgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIHRyYW5zaXRpb24tY29sb3JzIG1iLTggZ3JvdXBcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGgtMiB3LTJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFuaW1hdGUtcGluZyBhYnNvbHV0ZSBpbmxpbmUtZmxleCBoLWZ1bGwgdy1mdWxsIHJvdW5kZWQtZnVsbCBiZy1pbmRpZ28tNTAwIG9wYWNpdHktNzVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBpbmxpbmUtZmxleCByb3VuZGVkLWZ1bGwgaC0yIHctMiBiZy1pbmRpZ28tNjAwXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICBJTkRKUyAzLjEuMiBpcyBoZXJlXHJcbiAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTQgaC00IGdyb3VwLWhvdmVyOnRyYW5zbGF0ZS14LTAuNSB0cmFuc2l0aW9uLXRyYW5zZm9ybVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTkgNWw3IDctNyA3XCIgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9hPlxyXG5cclxuICAgICAgICAgICAgey8qIE1haW4gVGl0bGUgKi99XHJcbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBzbTp0ZXh0LTZ4bCBtZDp0ZXh0LTd4bCBsZzp0ZXh0LVs1LjVyZW1dIGZvbnQtZXh0cmFib2xkIHRleHQtZ3JheS05MDAgdHJhY2tpbmctdGlnaHQgbGVhZGluZy1bMS4xXSBtYi02XCI+XHJcbiAgICAgICAgICAgICAgVGhlIFJlYWN0IEZyYW1ld29ya1xyXG4gICAgICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNjAwIHZpYS1wdXJwbGUtNjAwIHRvLXBpbmstNjAwIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICBmb3IgVW5pdmVyc2FsIEFwcHNcclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvaDE+XHJcblxyXG4gICAgICAgICAgICB7LyogRGVzY3JpcHRpb24gKi99XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1heC13LTN4bCBteC1hdXRvIHRleHQtbGcgc206dGV4dC14bCB0ZXh0LWdyYXktNjAwIGxlYWRpbmctcmVsYXhlZCBtYi0xMFwiPlxyXG4gICAgICAgICAgICAgIElOREpTIGVuYWJsZXMgeW91IHRvIGNyZWF0ZSBmdWxsLXN0YWNrIHdlYiwgZGVza3RvcCwgYW5kIG1vYmlsZSBhcHBsaWNhdGlvbnMgXHJcbiAgICAgICAgICAgICAgd2l0aCBSZWFjdC4gQnVpbGQgcHJvZHVjdGlvbi1yZWFkeSBhcHBzIHdpdGggemVybyBjb25maWd1cmF0aW9uLlxyXG4gICAgICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgICAgICB7LyogQ1RBIFNlY3Rpb24gKi99XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTQgbWItMTZcIj5cclxuICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2RvY3NcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiZ3JvdXAgdy1mdWxsIHNtOnctYXV0byBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgcHgtOCBweS00IHRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgYmctZ3JheS05MDAgcm91bmRlZC14bCBob3ZlcjpiZy1ncmF5LTgwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgc2hhZG93LWxnIGhvdmVyOnNoYWRvdy14bFwiPlxyXG4gICAgICAgICAgICAgICAgICBHZXQgU3RhcnRlZFxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNSBoLTUgZ3JvdXAtaG92ZXI6dHJhbnNsYXRlLXgtMC41IHRyYW5zaXRpb24tdHJhbnNmb3JtXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTEzIDdsNSA1bTAgMGwtNSA1bTUtNUg2XCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NvcHlDb21tYW5kfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgdy1mdWxsIHNtOnctYXV0byBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTMgcHgtNiBweS00IHRleHQtYmFzZSBmb250LW1vbm8gdGV4dC1ncmF5LTYwMCBiZy1ncmF5LTEwMCBob3ZlcjpiZy1ncmF5LTIwMCByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBib3JkZXIgYm9yZGVyLWdyYXktMjAwXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+JDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPm5weCBpbmRqcyBjcmVhdGUgbXktYXBwPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwICR7Y29waWVkID8gJ3RleHQtZ3JlZW4tNjAwJyA6ICd0ZXh0LWdyYXktNDAwIGdyb3VwLWhvdmVyOnRleHQtZ3JheS02MDAnfWB9PlxyXG4gICAgICAgICAgICAgICAgICB7Y29waWVkID8gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTUgMTNsNCA0TDE5IDdcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTggMTZINmEyIDIgMCAwMS0yLTJWNmEyIDIgMCAwMTItMmg4YTIgMiAwIDAxMiAydjJtLTYgMTJoOGEyIDIgMCAwMDItMnYtOGEyIDIgMCAwMC0yLTJoLThhMiAyIDAgMDAtMiAydjhhMiAyIDAgMDAyIDJ6XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICB7LyogRGVtbyBQcmV2aWV3IC0gQnJvd3NlciBNb2NrdXAgKi99XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWF4LXctNXhsIG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC1pbnNldC00IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNTAwLzIwIHZpYS1wdXJwbGUtNTAwLzIwIHRvLXBpbmstNTAwLzIwIHJvdW5kZWQtM3hsIGJsdXItMnhsXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBiZy1ncmF5LTkwMCByb3VuZGVkLTJ4bCBzaGFkb3ctMnhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLWdyYXktODAwXCI+XHJcbiAgICAgICAgICAgICAgICB7LyogQnJvd3NlciBDaHJvbWUgKi99XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMyBiZy1ncmF5LTgwMC84MCBib3JkZXItYiBib3JkZXItZ3JheS03MDBcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0xLjVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLXJlZC01MDBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLXllbGxvdy01MDBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLWdyZWVuLTUwMFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0xIGJnLWdyYXktNzAwLzUwIHJvdW5kZWQtbWQgdGV4dC1ncmF5LTQwMCB0ZXh0LXNtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNCBoLTRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTEyIDExYzAgMy41MTctMS4wMDkgNi43OTktMi43NTMgOS41NzFtLTMuNDQtMi4wNGwuMDU0LS4wOUExMy45MTYgMTMuOTE2IDAgMDA4IDExYTQgNCAwIDExOCAwYzAgMS4wMTctLjA3IDIuMDE5LS4yMDMgM20tMi4xMTggNi44NDRBMjEuODggMjEuODggMCAwMDE1LjE3MSAxN20zLjgzOSAxLjEzMmMuNjQ1LTIuMjY2Ljk5LTQuNjU5Ljk5LTcuMTMyQTggOCAwIDAwOCA0LjA3TTMgMTUuMzY0Yy42NC0xLjMxOSAxLTIuOCAxLTQuMzY0IDAtMS40NTcuMzktMi44MjMgMS4wNy00XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgbG9jYWxob3N0OjMwMDBcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgey8qIENvZGUgVGFicyAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBiZy1ncmF5LTgwMC81MCBib3JkZXItYiBib3JkZXItZ3JheS03MDAgb3ZlcmZsb3cteC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgICAgIHtjb2RlRXhhbXBsZXMubWFwKChleGFtcGxlLCBpZHgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2lkeH1cclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYihpZHgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHRleHQtc20gZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgJHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSBpZHggXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndGV4dC13aGl0ZSBiZy1ncmF5LTcwMC81MCBib3JkZXItYi0yIGJvcmRlci1pbmRpZ28tNTAwJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtZ3JheS0zMDAnXHJcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNCBoLTRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTkgMTJoNm0tNiA0aDZtMiA1SDdhMiAyIDAgMDEtMi0yVjVhMiAyIDAgMDEyLTJoNS41ODZhMSAxIDAgMDEuNzA3LjI5M2w1LjQxNCA1LjQxNGExIDEgMCAwMS4yOTMuNzA3VjE5YTIgMiAwIDAxLTIgMnpcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7ZXhhbXBsZS50YWJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIENvZGUgQ29udGVudCAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHNtOnAtNiBvdmVyZmxvdy14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDAgbWItMyBmb250LW1vbm9cIj57Y29kZUV4YW1wbGVzW2FjdGl2ZVRhYl0uZmlsZW5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktMzAwIGZvbnQtbW9ubyBsZWFkaW5nLXJlbGF4ZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Y29kZT57Y29kZUV4YW1wbGVzW2FjdGl2ZVRhYl0uY29kZX08L2NvZGU+XHJcbiAgICAgICAgICAgICAgICAgIDwvcHJlPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgIHsvKiBDb21wYW5pZXMvVGVjaCBTZWN0aW9uICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0xNiBiZy1ncmF5LTUwIGJvcmRlci15IGJvcmRlci1ncmF5LTEwMFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCBtYi0xMFwiPkJVSUxUIFdJVEggTU9ERVJOIFRFQ0hOT0xPR0lFUzwvcD5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBtZDpncmlkLWNvbHMtNiBnYXAtOCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAge1tcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdSZWFjdCcsIGljb246IFJlYWN0SWNvbiwgY29sb3I6ICd0ZXh0LWN5YW4tNTAwJyB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ05vZGUuanMnLCBpY29uOiBOb2RlSWNvbiwgY29sb3I6ICd0ZXh0LWdyZWVuLTYwMCcgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdUeXBlU2NyaXB0JywgaWNvbjogVHlwZVNjcmlwdEljb24sIGNvbG9yOiAndGV4dC1ibHVlLTYwMCcgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdUYWlsd2luZCcsIGljb246IFRhaWx3aW5kSWNvbiwgY29sb3I6ICd0ZXh0LXRlYWwtNTAwJyB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ1ZpdGUnLCBpY29uOiBWaXRlSWNvbiwgY29sb3I6ICd0ZXh0LXB1cnBsZS01MDAnIH0sXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiAnZXNidWlsZCcsIGljb246IFBhY2thZ2VJY29uLCBjb2xvcjogJ3RleHQteWVsbG93LTUwMCcgfSxcclxuICAgICAgICAgICAgXS5tYXAoKHRlY2gsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IEljb25Db21wb25lbnQgPSB0ZWNoLmljb247XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0yIGdyb3VwIGN1cnNvci1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHt0ZWNoLmNvbG9yfSBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMjAwYH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPEljb25Db21wb25lbnQgY2xhc3NOYW1lPVwidy0xMCBoLTEwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNjAwIGdyb3VwLWhvdmVyOnRleHQtZ3JheS05MDAgdHJhbnNpdGlvbi1jb2xvcnNcIj57dGVjaC5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgIHsvKiBGZWF0dXJlcyBTZWN0aW9uIC0gTmV4dC5qcyBTdHlsZSBHcmlkICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBiZy13aGl0ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMjBcIj5cclxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRyYWNraW5nLXRpZ2h0IG1iLTRcIj5cclxuICAgICAgICAgICAgICBXaHkgSU5ESlM/XHJcbiAgICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgdGV4dC1ncmF5LTUwMCBtYXgtdy0yeGwgbXgtYXV0b1wiPlxyXG4gICAgICAgICAgICAgIEV2ZXJ5dGhpbmcgeW91IG5lZWQgdG8gYnVpbGQgbW9kZXJuIGFwcGxpY2F0aW9ucywgb3V0IG9mIHRoZSBib3guXHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtMCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHJvdW5kZWQtMnhsIG92ZXJmbG93LWhpZGRlblwiPlxyXG4gICAgICAgICAgICB7W1xyXG4gICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICBpY29uOiAoXHJcbiAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy0xMCBoLTEwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwidXJsKCNncmFkaWVudDEpXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9XCJncmFkaWVudDFcIiB4MT1cIjAlXCIgeTE9XCIwJVwiIHgyPVwiMTAwJVwiIHkyPVwiMTAwJVwiPjxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPVwiIzYzNjZmMVwiLz48c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPVwiI2E4NTVmN1wiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz5cclxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMyAxMFYzTDQgMTRoN3Y3bDktMTFoLTd6XCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdMaWdodG5pbmcgRmFzdCcsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0J1aWx0IG9uIGVzYnVpbGQgYW5kIFZpdGUgZm9yIGluc3RhbnQgSE1SIGFuZCBzdWItc2Vjb25kIGNvbGQgc3RhcnRzLidcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICBpY29uOiAoXHJcbiAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy0xMCBoLTEwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwidXJsKCNncmFkaWVudDIpXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9XCJncmFkaWVudDJcIiB4MT1cIjAlXCIgeTE9XCIwJVwiIHgyPVwiMTAwJVwiIHkyPVwiMTAwJVwiPjxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPVwiIzA2YjZkNFwiLz48c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPVwiIzNiODJmNlwiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz5cclxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDd2MTBhMiAyIDAgMDAyIDJoMTRhMiAyIDAgMDAyLTJWOWEyIDIgMCAwMC0yLTJoLTZsLTItMkg1YTIgMiAwIDAwLTIgMnpcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0ZpbGUtQmFzZWQgUm91dGluZycsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0ludHVpdGl2ZSByb3V0aW5nIGJhc2VkIG9uIHlvdXIgZmlsZSBzdHJ1Y3R1cmUuIENyZWF0ZSBmaWxlcywgZ2V0IHJvdXRlcy4nXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgaWNvbjogKFxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctMTAgaC0xMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cInVybCgjZ3JhZGllbnQzKVwiIHN0cm9rZVdpZHRoPVwiMS41XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPVwiZ3JhZGllbnQzXCIgeDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjEwMCVcIiB5Mj1cIjEwMCVcIj48c3RvcCBvZmZzZXQ9XCIwJVwiIHN0b3BDb2xvcj1cIiNmNDNmNWVcIi8+PHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3BDb2xvcj1cIiNmOTczMTZcIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTIgMThoLjAxTTggMjFoOGEyIDIgMCAwMDItMlY1YTIgMiAwIDAwLTItMkg4YTIgMiAwIDAwLTIgMnYxNGEyIDIgMCAwMDIgMnpcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1VuaXZlcnNhbCBQbGF0Zm9ybScsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0RlcGxveSB0byBXZWIsIERlc2t0b3AsIGFuZCBNb2JpbGUgZnJvbSBhIHNpbmdsZSBSZWFjdCBjb2RlYmFzZS4nXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgaWNvbjogKFxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctMTAgaC0xMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cInVybCgjZ3JhZGllbnQ0KVwiIHN0cm9rZVdpZHRoPVwiMS41XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPVwiZ3JhZGllbnQ0XCIgeDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjEwMCVcIiB5Mj1cIjEwMCVcIj48c3RvcCBvZmZzZXQ9XCIwJVwiIHN0b3BDb2xvcj1cIiMxMGI5ODFcIi8+PHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3BDb2xvcj1cIiMxNGI4YTZcIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTIgMTV2Mm0tNiA0aDEyYTIgMiAwIDAwMi0ydi02YTIgMiAwIDAwLTItMkg2YTIgMiAwIDAwLTIgMnY2YTIgMiAwIDAwMiAyem0xMC0xMFY3YTQgNCAwIDAwLTggMHY0aDh6XCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdCdWlsdC1pbiBBdXRoJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSldUIGF1dGhlbnRpY2F0aW9uLCBiY3J5cHQgaGFzaGluZywgT0F1dGgsIGFuZCBzZXNzaW9uIG1hbmFnZW1lbnQuJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgIGljb246IChcclxuICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTEwIGgtMTBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJ1cmwoI2dyYWRpZW50NSlcIiBzdHJva2VXaWR0aD1cIjEuNVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD1cImdyYWRpZW50NVwiIHgxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIxMDAlXCIgeTI9XCIxMDAlXCI+PHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9XCIjOGI1Y2Y2XCIvPjxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wQ29sb3I9XCIjZDk0NmVmXCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTQgN3YxMGMwIDIuMjEgMy41ODIgNCA4IDRzOC0xLjc5IDgtNFY3TTQgN2MwIDIuMjEgMy41ODIgNCA4IDRzOC0xLjc5IDgtNE00IDdjMC0yLjIxIDMuNTgyLTQgOC00czggMS43OSA4IDRtMCA1YzAgMi4yMS0zLjU4MiA0LTggNHMtOC0xLjc5LTgtNFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnRGF0YWJhc2UgQWRhcHRlcnMnLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdQb3N0Z3JlU1FMLCBNb25nb0RCLCBTUUxpdGUsIGFuZCBQcmlzbWEgT1JNIHdpdGggdHlwZS1zYWZlIHF1ZXJpZXMuJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgIGljb246IChcclxuICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTEwIGgtMTBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJ1cmwoI2dyYWRpZW50NilcIiBzdHJva2VXaWR0aD1cIjEuNVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD1cImdyYWRpZW50NlwiIHgxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIxMDAlXCIgeTI9XCIxMDAlXCI+PHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9XCIjZjU5ZTBiXCIvPjxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wQ29sb3I9XCIjZmJiZjI0XCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwbDQtMTZtNCA0bDQgNC00IDRNNiAxNmwtNC00IDQtNFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnVHlwZVNjcmlwdCBSZWFkeScsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0Z1bGwgVHlwZVNjcmlwdCBzdXBwb3J0IHdpdGggYXV0by1nZW5lcmF0ZWQgdHlwZXMgYW5kIElERSBJbnRlbGxpU2Vuc2UuJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0ubWFwKChmZWF0dXJlLCBpZHgpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJncm91cCBwLTggYm9yZGVyLWIgbWQ6Ym9yZGVyLXIgYm9yZGVyLWdyYXktMjAwIGxhc3Q6Ym9yZGVyLWItMCBtZDpbJjpudGgtY2hpbGQoM24pXTpib3JkZXItci0wIGxnOlsmOm50aC1jaGlsZCgzbildOmJvcmRlci1yLTAgaG92ZXI6YmctZ3JheS01MCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi00XCI+e2ZlYXR1cmUuaWNvbn08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0yXCI+e2ZlYXR1cmUudGl0bGV9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDAgbGVhZGluZy1yZWxheGVkXCI+e2ZlYXR1cmUuZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICB7LyogU2hvd2Nhc2UgU2VjdGlvbiAtIFdpdGggSW1hZ2UgKi99XHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInB5LTI0IGJnLWdyYXktNTAgb3ZlcmZsb3ctaGlkZGVuXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGxnOmdyaWQtY29scy0yIGdhcC0xMiBsZzpnYXAtMjAgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRyYWNraW5nLXRpZ2h0IG1iLTZcIj5cclxuICAgICAgICAgICAgICAgIERldmVsb3BlciBFeHBlcmllbmNlXHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LWluZGlnby02MDBcIj5SZWRlZmluZWQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9oMj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtZ3JheS01MDAgbWItOCBsZWFkaW5nLXJlbGF4ZWRcIj5cclxuICAgICAgICAgICAgICAgIFdyaXRlIGxlc3MgY29kZSwgYnVpbGQgZmFzdGVyLiBJTkRKUyBoYW5kbGVzIHRoZSBjb21wbGV4aXR5IHdoaWxlIHlvdSBmb2N1cyBvbiBjcmVhdGluZyBhbWF6aW5nIHByb2R1Y3RzLlxyXG4gICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxyXG4gICAgICAgICAgICAgICAge1tcclxuICAgICAgICAgICAgICAgICAgeyB0aXRsZTogJ1plcm8gQ29uZmlndXJhdGlvbicsIGRlc2M6ICdTdGFydCBidWlsZGluZyBpbW1lZGlhdGVseSB3aXRoIHNlbnNpYmxlIGRlZmF1bHRzJyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHRpdGxlOiAnSG90IE1vZHVsZSBSZXBsYWNlbWVudCcsIGRlc2M6ICdTZWUgY2hhbmdlcyBpbnN0YW50bHkgd2l0aG91dCBwYWdlIHJlZnJlc2gnIH0sXHJcbiAgICAgICAgICAgICAgICAgIHsgdGl0bGU6ICdBdXRvbWF0aWMgQ29kZSBTcGxpdHRpbmcnLCBkZXNjOiAnT3B0aW1pemVkIGJ1bmRsZXMgZm9yIGZhc3RlciBwYWdlIGxvYWRzJyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHRpdGxlOiAnQnVpbHQtaW4gQVBJIFJvdXRlcycsIGRlc2M6ICdDcmVhdGUgYmFja2VuZCBlbmRwb2ludHMgYWxvbmdzaWRlIHlvdXIgcGFnZXMnIH0sXHJcbiAgICAgICAgICAgICAgICBdLm1hcCgoaXRlbSwgaWR4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImZsZXggZ2FwLTQgZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgdy04IGgtOCByb3VuZGVkLWxnIGJnLWluZGlnby0xMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ3JvdXAtaG92ZXI6YmctaW5kaWdvLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtaW5kaWdvLTYwMFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezJ9IGQ9XCJNNSAxM2w0IDRMMTkgN1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPntpdGVtLnRpdGxlfTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwXCI+e2l0ZW0uZGVzY308L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMTBcIj5cclxuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvZG9jc1wiPlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC02IHB5LTMgYmctZ3JheS05MDAgdGV4dC13aGl0ZSBmb250LXNlbWlib2xkIHJvdW5kZWQtbGcgaG92ZXI6YmctZ3JheS04MDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICBSZWFkIERvY3VtZW50YXRpb25cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNCBoLTRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17Mn0gZD1cIk05IDVsNyA3LTcgN1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIHsvKiBEYXNoYm9hcmQgUHJldmlldyBJbWFnZSAqL31cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLWluc2V0LTQgYmctZ3JhZGllbnQtdG8tciBmcm9tLWluZGlnby01MDAgdG8tcHVycGxlLTYwMCByb3VuZGVkLTJ4bCBvcGFjaXR5LTEwIGJsdXItMnhsXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSByb3VuZGVkLTJ4bCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LTJ4bCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIGJnLXdoaXRlXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIFxyXG4gICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU1NTA2NjkzMS00MzY1ZDE0YmFiOGM/dz04MDAmaD02MDAmZml0PWNyb3BcIiBcclxuICAgICAgICAgICAgICAgICAgYWx0PVwiQ29kZSBlZGl0b3Igc2hvd2luZyBJTkRKUyBwcm9qZWN0XCJcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtYXV0b1wiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXQgZnJvbS1ncmF5LTkwMC82MCB0by10cmFuc3BhcmVudCBmbGV4IGl0ZW1zLWVuZCBwLTZcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSBvcGFjaXR5LTgwXCI+TW9kZXJuIERldmVsb3BtZW50PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkXCI+QnVpbGQgd2l0aCBjb25maWRlbmNlPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICB7LyogUGxhdGZvcm0gQ2FyZHMgU2VjdGlvbiAqL31cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjQgYmctd2hpdGVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1iLTE2XCI+XHJcbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBzbTp0ZXh0LTV4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCB0cmFja2luZy10aWdodCBtYi00XCI+XHJcbiAgICAgICAgICAgICAgT25lIENvZGViYXNlLFxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTYwMFwiPiBFdmVyeSBQbGF0Zm9ybTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9oMj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14bCB0ZXh0LWdyYXktNTAwIG1heC13LTJ4bCBteC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgQnVpbGQgb25jZSBhbmQgZGVwbG95IHRvIHdlYiwgZGVza3RvcCwgYW5kIG1vYmlsZSB3aXRoIG5hdGl2ZSBwZXJmb3JtYW5jZS5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIG1kOmdyaWQtY29scy0zIGdhcC04XCI+XHJcbiAgICAgICAgICAgIHtbXHJcbiAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnV2ViJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRGVwbG95IHRvIFZlcmNlbCwgTmV0bGlmeSwgb3IgYW55IGhvc3Rpbmcgd2l0aCBTU1IsIFNTRywgYW5kIEVkZ2Ugc3VwcG9ydC4nLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ2MDkyNTg5NTkxNy1hZmRhYjgyN2M1MmY/dz01MDAmaD0zMDAmZml0PWNyb3AnLFxyXG4gICAgICAgICAgICAgICAgZmVhdHVyZXM6IFsnU2VydmVyLVNpZGUgUmVuZGVyaW5nJywgJ1N0YXRpYyBHZW5lcmF0aW9uJywgJ0FQSSBSb3V0ZXMnXSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnZnJvbS1ibHVlLTUwMCB0by1jeWFuLTUwMCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0Rlc2t0b3AnLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdOYXRpdmUgYXBwcyBmb3IgV2luZG93cywgbWFjT1MsIGFuZCBMaW51eCB3aXRoIEVsZWN0cm9uIGludGVncmF0aW9uLicsXHJcbiAgICAgICAgICAgICAgICBpbWFnZTogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE3Njk0NzEyMjAyLTE0ZGQ5NTM4YWE5Nz93PTUwMCZoPTMwMCZmaXQ9Y3JvcCcsXHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlczogWydOYXRpdmUgQVBJcycsICdBdXRvIFVwZGF0ZXMnLCAnU3lzdGVtIFRyYXknXSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnZnJvbS1wdXJwbGUtNTAwIHRvLXBpbmstNTAwJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnTW9iaWxlJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnaU9TIGFuZCBBbmRyb2lkIGFwcHMgdXNpbmcgQ2FwYWNpdG9yIHdpdGggbmF0aXZlIGRldmljZSBmZWF0dXJlcy4nLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxMjk0MTkzNzY2OS05MGExYjU4ZTdlOWM/dz01MDAmaD0zMDAmZml0PWNyb3AnLFxyXG4gICAgICAgICAgICAgICAgZmVhdHVyZXM6IFsnTmF0aXZlIFBsdWdpbnMnLCAnUHVzaCBOb3RpZmljYXRpb25zJywgJ0FwcCBTdG9yZSBSZWFkeSddLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdmcm9tLW9yYW5nZS01MDAgdG8tcmVkLTUwMCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLm1hcCgocGxhdGZvcm0sIGlkeCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImdyb3VwIGJnLXdoaXRlIHJvdW5kZWQtMnhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLWdyYXktMjAwIGhvdmVyOmJvcmRlci1ncmF5LTMwMCBob3ZlcjpzaGFkb3cteGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtNDggb3ZlcmZsb3ctaGlkZGVuXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWcgXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtwbGF0Zm9ybS5pbWFnZX0gXHJcbiAgICAgICAgICAgICAgICAgICAgYWx0PXtgJHtwbGF0Zm9ybS50aXRsZX0gZGV2ZWxvcG1lbnRgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIGdyb3VwLWhvdmVyOnNjYWxlLTEwNSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi01MDBcIlxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tdCAke3BsYXRmb3JtLmNvbG9yfSBvcGFjaXR5LTYwYH0+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTQgbGVmdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+e3BsYXRmb3JtLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNlwiPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIG1iLTRcIj57cGxhdGZvcm0uZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3BsYXRmb3JtLmZlYXR1cmVzLm1hcCgoZmVhdHVyZSwgZmlkeCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17ZmlkeH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LWdyYXktNTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby01MDBcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGxSdWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiBjbGlwUnVsZT1cImV2ZW5vZGRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2ZlYXR1cmV9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgIHsvKiBUZXN0aW1vbmlhbHMgLyBTdGF0cyBTZWN0aW9uICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBiZy1ncmF5LTkwMCB0ZXh0LXdoaXRlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIG1kOmdyaWQtY29scy00IGdhcC04IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIHtbXHJcbiAgICAgICAgICAgICAgeyB2YWx1ZTogJzEweCcsIGxhYmVsOiAnRmFzdGVyIERldmVsb3BtZW50JywgaWNvbjogWmFwSWNvbiwgY29sb3I6ICdmcm9tLWFtYmVyLTQwMCB0by1vcmFuZ2UtNTAwJyB9LFxyXG4gICAgICAgICAgICAgIHsgdmFsdWU6ICcxMDArJywgbGFiZWw6ICdDb21wb25lbnRzJywgaWNvbjogUHV6emxlSWNvbiwgY29sb3I6ICdmcm9tLXB1cnBsZS00MDAgdG8tcGluay01MDAnIH0sXHJcbiAgICAgICAgICAgICAgeyB2YWx1ZTogJzUwJScsIGxhYmVsOiAnTGVzcyBDb2RlJywgaWNvbjogRmlsZUVkaXRJY29uLCBjb2xvcjogJ2Zyb20tY3lhbi00MDAgdG8tYmx1ZS01MDAnIH0sXHJcbiAgICAgICAgICAgICAgeyB2YWx1ZTogJzMnLCBsYWJlbDogJ1BsYXRmb3JtcycsIGljb246IFJvY2tldEljb24sIGNvbG9yOiAnZnJvbS1ncmVlbi00MDAgdG8tZW1lcmFsZC01MDAnIH0sXHJcbiAgICAgICAgICAgIF0ubWFwKChzdGF0LCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBJY29uQ29tcG9uZW50ID0gc3RhdC5pY29uO1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJwLTYgZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2B3LTE2IGgtMTYgbXgtYXV0byBtYi00IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWJyICR7c3RhdC5jb2xvcn0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LWxnIGdyb3VwLWhvdmVyOnNjYWxlLTExMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDBgfT5cclxuICAgICAgICAgICAgICAgICAgICA8SWNvbkNvbXBvbmVudCBjbGFzc05hbWU9XCJ3LTggaC04IHRleHQtd2hpdGVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBmb250LWJvbGQgYmctZ3JhZGllbnQtdG8tciBmcm9tLWluZGlnby00MDAgdG8tcHVycGxlLTQwMCBiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudFwiPntzdGF0LnZhbHVlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgbXQtMiBmb250LW1lZGl1bVwiPntzdGF0LmxhYmVsfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgey8qIEhvdyBJdCBXb3JrcyBTZWN0aW9uICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBiZy13aGl0ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMTZcIj5cclxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRyYWNraW5nLXRpZ2h0IG1iLTRcIj5cclxuICAgICAgICAgICAgICBIb3cgSXQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tNjAwXCI+V29ya3M8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgdGV4dC1ncmF5LTUwMCBtYXgtdy0yeGwgbXgtYXV0b1wiPlxyXG4gICAgICAgICAgICAgIEdldCBzdGFydGVkIGluIG1pbnV0ZXMgd2l0aCBqdXN0IHRocmVlIHNpbXBsZSBzdGVwc1xyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgbWQ6Z3JpZC1jb2xzLTMgZ2FwLThcIj5cclxuICAgICAgICAgICAge2hvd0l0V29ya3MubWFwKChpdGVtLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBJY29uQ29tcG9uZW50ID0gaXRlbS5pY29uO1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJyZWxhdGl2ZSBncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICB7LyogQ29ubmVjdGlvbiBMaW5lICovfVxyXG4gICAgICAgICAgICAgICAgICB7aWR4IDwgaG93SXRXb3Jrcy5sZW5ndGggLSAxICYmIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiBtZDpibG9jayBhYnNvbHV0ZSB0b3AtMTYgbGVmdC0xLzIgdy1mdWxsIGgtMC41IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNTAwIHRvLXB1cnBsZS01MDBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgYmctZ3JheS01MCByb3VuZGVkLTJ4bCBwLTggaG92ZXI6c2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGhvdmVyOmJvcmRlci1pbmRpZ28tMjAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgey8qIFN0ZXAgTnVtYmVyICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC00IGxlZnQtOCB3LTggaC04IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNjAwIHRvLXB1cnBsZS02MDAgcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtc20gc2hhZG93LWxnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5zdGVwfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBJY29uICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xNCBoLTE0IGJnLWdyYWRpZW50LXRvLWJyIGZyb20taW5kaWdvLTEwMCB0by1wdXJwbGUtMTAwIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItNiBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8SWNvbkNvbXBvbmVudCBjbGFzc05hbWU9XCJ3LTcgaC03IHRleHQtaW5kaWdvLTYwMFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItM1wiPntpdGVtLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMCBtYi00XCI+e2l0ZW0uZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBDb2RlIFNuaXBwZXQgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTkwMCByb3VuZGVkLWxnIHAtMyBmb250LW1vbm8gdGV4dC1zbSB0ZXh0LWdyZWVuLTQwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgJCB7aXRlbS5jb2RlfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgIHsvKiBUZXN0aW1vbmlhbHMgU2VjdGlvbiAqL31cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjQgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1ncmF5LTUwIHRvLWluZGlnby01MFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMTZcIj5cclxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRyYWNraW5nLXRpZ2h0IG1iLTRcIj5cclxuICAgICAgICAgICAgICBMb3ZlZCBieSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWluZGlnby02MDBcIj5EZXZlbG9wZXJzPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtZ3JheS01MDAgbWF4LXctMnhsIG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICBTZWUgd2hhdCBkZXZlbG9wZXJzIGFyb3VuZCB0aGUgd29ybGQgYXJlIHNheWluZyBhYm91dCBJTkRKU1xyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgbWQ6Z3JpZC1jb2xzLTIgZ2FwLThcIj5cclxuICAgICAgICAgICAge3Rlc3RpbW9uaWFscy5tYXAoKHRlc3RpbW9uaWFsLCBpZHgpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e2lkeH1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIGJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtOCBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBib3JkZXIgYm9yZGVyLWdyYXktMTAwXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7LyogUXVvdGUgSWNvbiAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC00IC1sZWZ0LTIgdy0xMiBoLTEyIGJnLWdyYWRpZW50LXRvLWJyIGZyb20taW5kaWdvLTUwMCB0by1wdXJwbGUtNjAwIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm90YXRlLTEyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxRdW90ZUljb24gY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LXdoaXRlIC1yb3RhdGUtMTJcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHsvKiBTdGFycyAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMSBtYi00IG1sLThcIj5cclxuICAgICAgICAgICAgICAgICAge1suLi5BcnJheSh0ZXN0aW1vbmlhbC5yYXRpbmcpXS5tYXAoKF8sIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICA8U3Rhckljb24ga2V5PXtpfSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtYW1iZXItNDAwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgey8qIENvbnRlbnQgKi99XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIHRleHQtbGcgbGVhZGluZy1yZWxheGVkIG1iLTZcIj5cclxuICAgICAgICAgICAgICAgICAgXCJ7dGVzdGltb25pYWwuY29udGVudH1cIlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB7LyogQXV0aG9yICovfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxyXG4gICAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXt0ZXN0aW1vbmlhbC5hdmF0YXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgYWx0PXt0ZXN0aW1vbmlhbC5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTIgaC0xMiByb3VuZGVkLWZ1bGwgb2JqZWN0LWNvdmVyIHJpbmctMiByaW5nLWluZGlnby0xMDBcIlxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj57dGVzdGltb25pYWwubmFtZX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTUwMFwiPnt0ZXN0aW1vbmlhbC5yb2xlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgey8qIFRydXN0ZWQgQnkgU2VjdGlvbiAqL31cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMTYgYmctd2hpdGUgYm9yZGVyLXkgYm9yZGVyLWdyYXktMTAwXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi0xMFwiPlxyXG4gICAgICAgICAgICBUcnVzdGVkIGJ5IGlubm92YXRpdmUgY29tcGFuaWVzIHdvcmxkd2lkZVxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIG1kOmdyaWQtY29scy02IGdhcC04IGl0ZW1zLWNlbnRlciBvcGFjaXR5LTYwIGdyYXlzY2FsZSBob3ZlcjpncmF5c2NhbGUtMCBob3ZlcjpvcGFjaXR5LTEwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDBcIj5cclxuICAgICAgICAgICAge1tcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdWZXJjZWwnLCBsZXR0ZXI6ICdWJyB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ1N0cmlwZScsIGxldHRlcjogJ1MnIH0sXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiAnTm90aW9uJywgbGV0dGVyOiAnTicgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdMaW5lYXInLCBsZXR0ZXI6ICdMJyB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ0ZpZ21hJywgbGV0dGVyOiAnRicgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdEaXNjb3JkJywgbGV0dGVyOiAnRCcgfSxcclxuICAgICAgICAgICAgXS5tYXAoKGNvbXBhbnksIGlkeCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdyb3VwIGN1cnNvci1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIGJnLWdyYXktOTAwIHJvdW5kZWQtbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LWxnXCI+e2NvbXBhbnkubGV0dGVyfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgaGlkZGVuIHNtOmJsb2NrXCI+e2NvbXBhbnkubmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgey8qIEZBUSBTZWN0aW9uICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBiZy1ncmF5LTUwXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy00eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYi0xNlwiPlxyXG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC00eGwgc206dGV4dC01eGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgdHJhY2tpbmctdGlnaHQgbWItNFwiPlxyXG4gICAgICAgICAgICAgIEZyZXF1ZW50bHkgQXNrZWQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tNjAwXCI+UXVlc3Rpb25zPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtZ3JheS01MDAgbWF4LXctMnhsIG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICBFdmVyeXRoaW5nIHlvdSBuZWVkIHRvIGtub3cgYWJvdXQgSU5ESlNcclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cclxuICAgICAgICAgICAge2ZhcXMubWFwKChmYXEsIGlkeCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17aWR4fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIG92ZXJmbG93LWhpZGRlbiBob3Zlcjpib3JkZXItaW5kaWdvLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuRmFxKG9wZW5GYXEgPT09IGlkeCA/IG51bGwgOiBpZHgpfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtNiBweS01IHRleHQtbGVmdCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj57ZmFxLnF1ZXN0aW9ufTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiBcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTUgaC01IHRleHQtZ3JheS01MDAgZmxleC1zaHJpbmstMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDAgJHtcclxuICAgICAgICAgICAgICAgICAgICAgIG9wZW5GYXEgPT09IGlkeCA/ICdyb3RhdGUtMTgwJyA6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgb3ZlcmZsb3ctaGlkZGVuIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5GYXEgPT09IGlkeCA/ICdtYXgtaC05NiBvcGFjaXR5LTEwMCcgOiAnbWF4LWgtMCBvcGFjaXR5LTAnXHJcbiAgICAgICAgICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTYgcGItNSB0ZXh0LWdyYXktNjAwIGxlYWRpbmctcmVsYXhlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHtmYXEuYW5zd2VyfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICB7LyogTmV3c2xldHRlciBTZWN0aW9uICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBiZy1ncmFkaWVudC10by1iciBmcm9tLWluZGlnby05MDAgdmlhLXB1cnBsZS05MDAgdG8taW5kaWdvLTkwMCB0ZXh0LXdoaXRlIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxyXG4gICAgICAgIHsvKiBCYWNrZ3JvdW5kIFBhdHRlcm4gKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIG9wYWNpdHktMTBcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmlkLXdoaXRlIGJnLVtzaXplOjMwcHhfMzBweF1cIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG1heC13LTR4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB3LTE2IGgtMTYgYmctd2hpdGUvMTAgYmFja2Ryb3AtYmx1ciByb3VuZGVkLTJ4bCBtYi04XCI+XHJcbiAgICAgICAgICAgIDxNYWlsSWNvbiBjbGFzc05hbWU9XCJ3LTggaC04IHRleHQtd2hpdGVcIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBzbTp0ZXh0LTR4bCBmb250LWJvbGQgbWItNFwiPlxyXG4gICAgICAgICAgICBTdGF5IFVwZGF0ZWRcclxuICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxnIHRleHQtaW5kaWdvLTIwMCBtYi04IG1heC13LXhsIG14LWF1dG9cIj5cclxuICAgICAgICAgICAgR2V0IG5vdGlmaWVkIGFib3V0IG5ldyBmZWF0dXJlcywgdXBkYXRlcywgYW5kIGV4Y2x1c2l2ZSBjb250ZW50LiBObyBzcGFtLCB1bnN1YnNjcmliZSBhbnl0aW1lLlxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGdhcC00IG1heC13LWxnIG14LWF1dG9cIj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgZW1haWxcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweC01IHB5LTQgYmctd2hpdGUvMTAgYmFja2Ryb3AtYmx1ciBib3JkZXIgYm9yZGVyLXdoaXRlLzIwIHJvdW5kZWQteGwgdGV4dC13aGl0ZSBwbGFjZWhvbGRlci13aGl0ZS82MCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctd2hpdGUvMzAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTggcHktNCBiZy13aGl0ZSB0ZXh0LWluZGlnby05MDAgZm9udC1zZW1pYm9sZCByb3VuZGVkLXhsIGhvdmVyOmJnLWluZGlnby0xMDAgdHJhbnNpdGlvbi1jb2xvcnMgc2hhZG93LWxnIGhvdmVyOnNoYWRvdy14bFwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICBTdWJzY3JpYmVcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1pbmRpZ28tMzAwIG10LTRcIj5cclxuICAgICAgICAgICAgSm9pbiAxMCwwMDArIGRldmVsb3BlcnMgYWxyZWFkeSBzdWJzY3JpYmVkXHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgIHsvKiBDVEEgU2VjdGlvbiAtIE1vZGVybiBTdHlsZSAqL31cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgcHktMjQgb3ZlcmZsb3ctaGlkZGVuXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLWJyIGZyb20taW5kaWdvLTYwMCB2aWEtcHVycGxlLTYwMCB0by1waW5rLTYwMFwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBvcGFjaXR5LTMwXCI+XHJcbiAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGxcIiB2aWV3Qm94PVwiMCAwIDE0NDAgODAwXCIgZmlsbD1cIm5vbmVcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjIwMFwiIGN5PVwiMjAwXCIgcj1cIjMwMFwiIGZpbGw9XCJ3aGl0ZVwiIGZpbGxPcGFjaXR5PVwiMC4xXCIvPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTIwMFwiIGN5PVwiNjAwXCIgcj1cIjQwMFwiIGZpbGw9XCJ3aGl0ZVwiIGZpbGxPcGFjaXR5PVwiMC4xXCIvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtYXgtdy00eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNXhsIGxnOnRleHQtNnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTYgdHJhY2tpbmctdGlnaHRcIj5cclxuICAgICAgICAgICAgUmVhZHkgdG8gc2hpcCBmYXN0ZXI/XHJcbiAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14bCB0ZXh0LXdoaXRlLzgwIG1iLTEwIG1heC13LTJ4bCBteC1hdXRvXCI+XHJcbiAgICAgICAgICAgIFN0YXJ0IGJ1aWxkaW5nIHlvdXIgbmV4dCBwcm9qZWN0IHdpdGggSU5ESlMgdG9kYXkuIFplcm8gY29uZmlndXJhdGlvbiwgbWF4aW11bSBwcm9kdWN0aXZpdHkuXHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgZ2FwLTQganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9kb2NzXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJncm91cCBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgcHgtOCBweS00IGJnLXdoaXRlIHRleHQtZ3JheS05MDAgZm9udC1zZW1pYm9sZCByb3VuZGVkLXhsIGhvdmVyOmJnLWdyYXktMTAwIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1sZ1wiPlxyXG4gICAgICAgICAgICAgICAgR2V0IFN0YXJ0ZWRcclxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNSBncm91cC1ob3Zlcjp0cmFuc2xhdGUteC0wLjUgdHJhbnNpdGlvbi10cmFuc2Zvcm1cIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTEzIDdsNSA1bTAgMGwtNSA1bTUtNUg2XCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9Sb2hpdHNoYXJtYTYzNzcvSU5EXCJcclxuICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxyXG4gICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweC04IHB5LTQgYmctd2hpdGUvMTAgYmFja2Ryb3AtYmx1ciB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlLzIwIGhvdmVyOmJnLXdoaXRlLzIwIHRyYW5zaXRpb24tYWxsXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsUnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyIDJDNi40NzcgMiAyIDYuNDg0IDIgMTIuMDE3YzAgNC40MjUgMi44NjUgOC4xOCA2LjgzOSA5LjUwNC41LjA5Mi42ODItLjIxNy42ODItLjQ4MyAwLS4yMzctLjAwOC0uODY4LS4wMTMtMS43MDMtMi43ODIuNjA1LTMuMzY5LTEuMzQzLTMuMzY5LTEuMzQzLS40NTQtMS4xNTgtMS4xMS0xLjQ2Ni0xLjExLTEuNDY2LS45MDgtLjYyLjA2OS0uNjA4LjA2OS0uNjA4IDEuMDAzLjA3IDEuNTMxIDEuMDMyIDEuNTMxIDEuMDMyLjg5MiAxLjUzIDIuMzQxIDEuMDg4IDIuOTEuODMyLjA5Mi0uNjQ3LjM1LTEuMDg4LjYzNi0xLjMzOC0yLjIyLS4yNTMtNC41NTUtMS4xMTMtNC41NTUtNC45NTEgMC0xLjA5My4zOS0xLjk4OCAxLjAyOS0yLjY4OC0uMTAzLS4yNTMtLjQ0Ni0xLjI3Mi4wOTgtMi42NSAwIDAgLjg0LS4yNyAyLjc1IDEuMDI2QTkuNTY0IDkuNTY0IDAgMDExMiA2Ljg0NGMuODUuMDA0IDEuNzA1LjExNSAyLjUwNC4zMzcgMS45MDktMS4yOTYgMi43NDctMS4wMjcgMi43NDctMS4wMjcuNTQ2IDEuMzc5LjIwMiAyLjM5OC4xIDIuNjUxLjY0LjcgMS4wMjggMS41OTUgMS4wMjggMi42ODggMCAzLjg0OC0yLjMzOSA0LjY5NS00LjU2NiA0Ljk0My4zNTkuMzA5LjY3OC45Mi42NzggMS44NTUgMCAxLjMzOC0uMDEyIDIuNDE5LS4wMTIgMi43NDcgMCAuMjY4LjE4LjU4LjY4OC40ODJBMTAuMDE5IDEwLjAxOSAwIDAwMjIgMTIuMDE3QzIyIDYuNDg0IDE3LjUyMiAyIDEyIDJ6XCIgY2xpcFJ1bGU9XCJldmVub2RkXCIgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICBWaWV3IG9uIEdpdEh1YlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufSIsICIvKipcbiAqIFBsYXRmb3JtIGRldGVjdGlvbiB1dGlsaXRpZXMgZm9yIElOREpTXG4gKlxuICogVXNhZ2U6XG4gKiBpbXBvcnQgeyBpc1dlYiwgaXNEZXNrdG9wLCBpc01vYmlsZSwgaXNBbmRyb2lkLCBpc0lPUywgcGxhdGZvcm0gfSBmcm9tICdpbmRqcyc7XG4gKlxuICogaWYgKGlzTW9iaWxlKSB7IC4uLiB9XG4gKi9cblxuLy8gQ2hlY2sgaWYgcnVubmluZyBpbiBhIGJyb3dzZXIgZW52aXJvbm1lbnRcbmNvbnN0IGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG5cbi8vIEVsZWN0cm9uIGRldGVjdGlvbiAocmVuZGVyZXIgcHJvY2VzcylcbmV4cG9ydCBjb25zdCBpc0Rlc2t0b3AgPVxuICBpc0Jyb3dzZXIgJiZcbiAgKHdpbmRvdy5wcm9jZXNzPy50eXBlID09PSBcInJlbmRlcmVyXCIgfHxcbiAgICAhIXdpbmRvdy5lbGVjdHJvbiB8fFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJFbGVjdHJvblwiKSk7XG5cbi8vIENhcGFjaXRvciBkZXRlY3Rpb25cbmV4cG9ydCBjb25zdCBpc01vYmlsZSA9XG4gIGlzQnJvd3NlciAmJlxuICAoISF3aW5kb3cuQ2FwYWNpdG9yIHx8XG4gICAgISF3aW5kb3cuYW5kcm9pZEJyaWRnZSB8fFxuICAgICEhd2luZG93LndlYmtpdD8ubWVzc2FnZUhhbmRsZXJzPy5icmlkZ2UgfHxcbiAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiQ2FwYWNpdG9yXCIpKTtcblxuLy8gU3BlY2lmaWMgbW9iaWxlIHBsYXRmb3Jtc1xuZXhwb3J0IGNvbnN0IGlzQW5kcm9pZCA9IGlzTW9iaWxlICYmIC9hbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbmV4cG9ydCBjb25zdCBpc0lPUyA9IGlzTW9iaWxlICYmIC9pcGhvbmV8aXBhZHxpcG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLy8gV2ViIGZhbGxiYWNrIChpZiBub3QgZGVza3RvcCBvciBtb2JpbGUgYXBwKVxuZXhwb3J0IGNvbnN0IGlzV2ViID0gIWlzRGVza3RvcCAmJiAhaXNNb2JpbGU7XG5cbi8vIEdldCBjdXJyZW50IHBsYXRmb3JtIG5hbWVcbmV4cG9ydCBjb25zdCBwbGF0Zm9ybSA9ICgoKSA9PiB7XG4gIGlmIChpc0Rlc2t0b3ApIHJldHVybiBcImRlc2t0b3BcIjtcbiAgaWYgKGlzQW5kcm9pZCkgcmV0dXJuIFwiYW5kcm9pZFwiO1xuICBpZiAoaXNJT1MpIHJldHVybiBcImlvc1wiO1xuICBpZiAoaXNNb2JpbGUpIHJldHVybiBcIm1vYmlsZVwiOyAvLyBmYWxsYmFja1xuICByZXR1cm4gXCJ3ZWJcIjtcbn0pKCk7XG5cbi8vIFJlYWN0IE5hdGl2ZSBjb21wYXRpYmxlIEFQSVxuZXhwb3J0IGNvbnN0IE9TID0gcGxhdGZvcm07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3QgPSAob2JqKSA9PiB7XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoT1MpKSByZXR1cm4gb2JqW09TXTtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcIm5hdGl2ZVwiKSAmJiBpc01vYmlsZSkgcmV0dXJuIG9ialtcIm5hdGl2ZVwiXTtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcImRlZmF1bHRcIikpIHJldHVybiBvYmpbXCJkZWZhdWx0XCJdO1xuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc1dlYixcbiAgaXNEZXNrdG9wLFxuICBpc01vYmlsZSxcbiAgaXNBbmRyb2lkLFxuICBpc0lPUyxcbiAgcGxhdGZvcm0sXG4gIE9TLFxuICBzZWxlY3QsXG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEltYWdlID0gZm9yd2FyZFJlZigoeyBzdHlsZSwgc291cmNlLCBzcmMsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiaW1hZ2VcIik7XG5cbiAgLy8gUmVhY3QgTmF0aXZlIHVzZXMgJ3NvdXJjZScsIFdlYiB1c2VzICdzcmMnLlxuICAvLyBXZSBzdXBwb3J0IGJvdGggcHJvcHMgZm9yIHVuaXZlcnNhbCB1c2FnZS5cbiAgY29uc3QgaW1hZ2VTb3VyY2UgPSBzcmMgfHwgKHNvdXJjZSAmJiBzb3VyY2UudXJpKSB8fCBcIlwiO1xuXG4gIGNvbnN0IHByb3BzID0ge1xuICAgIC4uLnJlc3QsXG4gICAgc3JjOiBpbWFnZVNvdXJjZSxcbiAgICByZWYsXG4gIH07XG5cbiAgaWYgKENvbXBvbmVudCAhPT0gXCJpbWdcIiAmJiBDb21wb25lbnQgIT09IFwiaW1hZ2VcIikge1xuICAgIC8vIElmIGl0IHJlZmVycyB0byBSZWFjdCBOYXRpdmUgSW1hZ2UsIGl0IGV4cGVjdHMgJ3NvdXJjZSdcbiAgICBwcm9wcy5zb3VyY2UgPSBzb3VyY2UgfHwgeyB1cmk6IHNyYyB9O1xuICAgIGRlbGV0ZSBwcm9wcy5zcmM7XG4gIH1cblxuICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG5cbiAgcmV0dXJuIDxDb21wb25lbnQgc3R5bGU9e2ZsYXRTdHlsZX0gey4uLnByb3BzfSAvPjtcbn0pO1xuXG5JbWFnZS5kaXNwbGF5TmFtZSA9IFwiSW1hZ2VcIjtcbmV4cG9ydCBkZWZhdWx0IEltYWdlO1xuIiwgImZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRWxlbWVudCh0eXBlKSB7XG4gIGNvbnN0IHBsYXRmb3JtID0gdHlwZW9mIFBMQVRGT1JNICE9PSBcInVuZGVmaW5lZFwiID8gUExBVEZPUk0gOiBcIndlYlwiO1xuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJ3ZWJcIikge1xuICAgIGNvbnN0IHdlYk1hcCA9IHtcbiAgICAgIHZpZXc6IFwiZGl2XCIsXG4gICAgICB0ZXh0OiBcInNwYW5cIixcbiAgICAgIGltYWdlOiBcImltZ1wiLFxuICAgICAgaW1hZ2ViYWNrZ3JvdW5kOiBcImRpdlwiLCAvLyBtYXAgaW1hZ2UtYmFja2dyb3VuZCB0byBkaXYgd2l0aCBzdHlsZVxuICAgICAgc2Nyb2xsdmlldzogXCJkaXZcIixcbiAgICAgIGZsYXRsaXN0OiBcImRpdlwiLFxuICAgICAgc2VjdGlvbmxpc3Q6IFwiZGl2XCIsXG4gICAgICBrZXlib2FyZGF2b2lkaW5ndmlldzogXCJkaXZcIixcbiAgICAgIHNhZmVhcmVhdmlldzogXCJkaXZcIixcbiAgICAgIHByZXNzYWJsZTogXCJidXR0b25cIixcbiAgICAgIHRvdWNoYWJsZW9wYWNpdHk6IFwiYnV0dG9uXCIsXG4gICAgICB0b3VjaGFibGVoaWdobGlnaHQ6IFwiYnV0dG9uXCIsXG4gICAgICBzd2l0Y2g6IFwiaW5wdXRcIiwgLy8gdHlwZT0nY2hlY2tib3gnXG4gICAgICB0ZXh0YXJlYTogXCJ0ZXh0YXJlYVwiLFxuICAgICAgYnV0dG9uOiBcImJ1dHRvblwiLFxuICAgICAgbW9kYWw6IFwiZGl2XCIsXG4gICAgICBhY3Rpdml0eWluZGljYXRvcjogXCJkaXZcIixcbiAgICAgIHJlZnJlc2hjb250cm9sOiBcImRpdlwiLFxuICAgIH07XG4gICAgcmV0dXJuIHdlYk1hcFt0eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIlwiKV0gfHwgXCJkaXZcIjtcbiAgfVxuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJtb2JpbGVcIikge1xuICAgIC8vIEluIFJlYWN0IE5hdGl2ZSwgY29tcG9uZW50cyBhcmUgQ2FtZWxDYXNlXG4gICAgLy8gV2UgbmVlZCB0byBtYXAgZ2VuZXJpYyBuYW1lcyB0byBSTiBuYW1lc1xuICAgIGNvbnN0IG1vYmlsZU1hcCA9IHtcbiAgICAgIHZpZXc6IFwiVmlld1wiLFxuICAgICAgdGV4dDogXCJUZXh0XCIsXG4gICAgICBpbWFnZTogXCJJbWFnZVwiLFxuICAgICAgaW1hZ2ViYWNrZ3JvdW5kOiBcIkltYWdlQmFja2dyb3VuZFwiLFxuICAgICAgc2Nyb2xsdmlldzogXCJTY3JvbGxWaWV3XCIsXG4gICAgICBmbGF0bGlzdDogXCJGbGF0TGlzdFwiLFxuICAgICAgc2VjdGlvbmxpc3Q6IFwiU2VjdGlvbkxpc3RcIixcbiAgICAgIGtleWJvYXJkYXZvaWRpbmd2aWV3OiBcIktleWJvYXJkQXZvaWRpbmdWaWV3XCIsXG4gICAgICBzYWZlYXJlYXZpZXc6IFwiU2FmZUFyZWFWaWV3XCIsXG4gICAgICBwcmVzc2FibGU6IFwiUHJlc3NhYmxlXCIsXG4gICAgICB0b3VjaGFibGVvcGFjaXR5OiBcIlRvdWNoYWJsZU9wYWNpdHlcIixcbiAgICAgIHRvdWNoYWJsZWhpZ2hsaWdodDogXCJUb3VjaGFibGVIaWdobGlnaHRcIixcbiAgICAgIHN3aXRjaDogXCJTd2l0Y2hcIixcbiAgICAgIG1vZGFsOiBcIk1vZGFsXCIsXG4gICAgICBhY3Rpdml0eWluZGljYXRvcjogXCJBY3Rpdml0eUluZGljYXRvclwiLFxuICAgICAgcmVmcmVzaGNvbnRyb2w6IFwiUmVmcmVzaENvbnRyb2xcIixcbiAgICAgIGJ1dHRvbjogXCJCdXR0b25cIixcbiAgICB9O1xuICAgIGNvbnN0IHJuTmFtZSA9XG4gICAgICBtb2JpbGVNYXBbdHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0vZywgXCJcIildIHx8IGNhcGl0YWxpemUodHlwZSk7XG5cbiAgICAvLyBTYWZldHkgY2hlY2sgZm9yIFJlYWN0IE5hdGl2ZSBlbnZpcm9ubWVudFxuICAgIC8vIHJlYWN0LW5hdGl2ZS13ZWIgbWlnaHQgYmUgYWxpYXNlZCwgb3Igd2UgbWlnaHQgYmUgaW4gYSByZWFsIFJOIGVudmlyb25tZW50XG4gICAgdHJ5IHtcbiAgICAgIC8vIFVzaW5nIGdsb2JhbCBjaGVjayBvciBzYWZlIHJlcXVpcmVcbiAgICAgIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gcmVxdWlyZShcInJlYWN0LW5hdGl2ZVwiKVtybk5hbWVdO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB3aW5kb3cuUmVhY3QgJiZcbiAgICAgICAgd2luZG93LlJlYWN0Lk5hdGl2ZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuUmVhY3QuTmF0aXZlW3JuTmFtZV07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKGBSZWFjdCBOYXRpdmUgY29tcG9uZW50ICR7cm5OYW1lfSBub3QgZm91bmRgKTtcbiAgICB9XG4gICAgLy8gRmFsbGJhY2sgdG8gVmlldyBvciBkaXYgZGVwZW5kaW5nIG9uIGNvbnRleHQsIGJ1dCBWaWV3IGlzIHNhZmUgZW5vdWdoIGZvciBsb2dpY2FsIHJldHVybiBpZiBtb2NrZWRcbiAgICByZXR1cm4gXCJWaWV3XCI7XG4gIH1cblxuICByZXR1cm4gXCJkaXZcIjtcbn1cbiIsICIvLyBNb2NrIFN0eWxlU2hlZXQgZm9yIGNvbXBhdGliaWxpdHkuXG4vLyBJbiBJTkRKUyB3ZWIsIHdlIHVzdWFsbHkgdXNlIHN0YW5kYXJkIHN0eWxlIG9iamVjdHMgb3IgQ1NTLlxuLy8gVGhpcyBhbGxvd3MgU3R5bGVTaGVldC5jcmVhdGUoe30pIHRvIHJldHVybiB0aGUgb2JqZWN0cyBhcy1pcy5cblxuZXhwb3J0IGNvbnN0IFN0eWxlU2hlZXQgPSB7XG4gIGNyZWF0ZTogKHN0eWxlcykgPT4gc3R5bGVzLFxuICBmbGF0dGVuOiAoc3R5bGVzKSA9PiB7XG4gICAgaWYgKCFzdHlsZXMpIHJldHVybiB7fTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZXMpKSB7XG4gICAgICByZXR1cm4gc3R5bGVzXG4gICAgICAgIC5mbGF0KEluZmluaXR5KVxuICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IChpdGVtID8geyAuLi5hY2MsIC4uLml0ZW0gfSA6IGFjYyksIHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfSxcbiAgaGFpcmxpbmVXaWR0aDogMSxcbiAgYWJzb2x1dGVGaWxsOiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIHRvcDogMCxcbiAgICBib3R0b206IDAsXG4gIH0sXG4gIGFic29sdXRlRmlsbE9iamVjdDoge1xuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogMCxcbiAgICB0b3A6IDAsXG4gICAgYm90dG9tOiAwLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3R5bGVTaGVldDtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbi8vIElOREpTIExpbmsgY29tcG9uZW50IC0gbGlnaHR3ZWlnaHQgY2xpZW50LXNpZGUgbmF2aWdhdGlvbiBoZWxwZXJcbi8vIFBlcmZvcm1zIFNQQS1saWtlIG5hdmlnYXRpb24gZm9yIHNhbWUtb3JpZ2luIGludGVybmFsIGxpbmtzLlxuLy8gUHJvcHM6IGhyZWYsIHByZWZldGNoLCByZXBsYWNlLCBzY3JvbGwgKGRlZmF1bHQgdHJ1ZSksIG9uQ2xpY2ssIHRhcmdldCwgcmVsLCBjbGFzc05hbWUsIHN0eWxlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaW5rKHtcbiAgaHJlZixcbiAgY2hpbGRyZW4sXG4gIHByZWZldGNoID0gZmFsc2UsXG4gIHJlcGxhY2UgPSBmYWxzZSxcbiAgc2Nyb2xsID0gdHJ1ZSxcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBzdHlsZSxcbiAgdGFyZ2V0LFxuICByZWwsXG4gIC4uLnJlc3Rcbn0pIHtcbiAgLy8gQmFzaWMgcHJlZmV0Y2g6IGhpbnQgdGhlIGJyb3dzZXIgdmlhIDxsaW5rIHJlbD1cInByZWZldGNoXCI+XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFwcmVmZXRjaCB8fCAhaHJlZikgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gICAgICBsLnJlbCA9IFwicHJlZmV0Y2hcIjtcbiAgICAgIGwuaHJlZiA9IGhyZWY7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGwpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGwpO1xuICAgICAgICB9IGNhdGNoIHt9XG4gICAgICB9O1xuICAgIH0gY2F0Y2gge31cbiAgfSwgW2hyZWYsIHByZWZldGNoXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGlmIChvbkNsaWNrKSBvbkNsaWNrKGUpO1xuICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcbiAgICAvLyBPbmx5IGludGVyY2VwdCBzaW1wbGUgbGVmdC1jbGlja3Mgd2l0aG91dCBtb2RpZmllciBrZXlzXG4gICAgaWYgKGUuYnV0dG9uICE9PSAwIHx8IGUubWV0YUtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSB8fCBlLmFsdEtleSlcbiAgICAgIHJldHVybjtcbiAgICBpZiAoIWhyZWYpIHJldHVybjtcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldCAhPT0gXCJfc2VsZlwiKSByZXR1cm47XG4gICAgbGV0IHVybDtcbiAgICB0cnkge1xuICAgICAgdXJsID0gbmV3IFVSTChocmVmLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEludmFsaWQgVVJMLCBsZXQgYnJvd3NlciBoYW5kbGVcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gU2tpcCBub24taHR0cChzKSBwcm90b2NvbHMgYW5kIHNwZWNpYWwgc2NoZW1lc1xuICAgIGNvbnN0IHByb3RvID0gdXJsLnByb3RvY29sO1xuICAgIGlmIChwcm90byAmJiBwcm90byAhPT0gXCJodHRwOlwiICYmIHByb3RvICE9PSBcImh0dHBzOlwiKSByZXR1cm47XG4gICAgLy8gRXh0ZXJuYWxcbiAgICBpZiAodXJsLm9yaWdpbiAhPT0gd2luZG93LmxvY2F0aW9uLm9yaWdpbikgcmV0dXJuO1xuICAgIC8vIFJlc3BlY3QgZG93bmxvYWQgbGlua3NcbiAgICBpZiAocmVzdC5kb3dubG9hZCkgcmV0dXJuO1xuICAgIC8vIEhhc2gtb25seSBuYXZpZ2F0aW9uIG9wdGltaXphdGlvblxuICAgIGNvbnN0IGN1cnJlbnQgPVxuICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCArIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgIGNvbnN0IG5leHQgPSB1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoICsgdXJsLmhhc2g7XG4gICAgaWYgKG5leHQgPT09IGN1cnJlbnQpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgaWYgKHVybC5oYXNoKSB7XG4gICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1cmwuaGFzaC5zbGljZSgxKSk7XG4gICAgICAgICAgaWYgKGVsKSBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgIGVsc2Ugd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gRG8gcHVzaC9yZXBsYWNlIHN0YXRlXG4gICAgaWYgKHJlcGxhY2UpIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XG4gICAgZWxzZSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICAgIC8vIEVtaXQgYSBjdXN0b20gbmF2aWdhdGlvbiBldmVudCBzbyB0aGUgYXBwIGNhbiBsb2FkIHRoZSB0YXJnZXQgbW9kdWxlXG4gICAgdHJ5IHtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJpbmQ6bmF2aWdhdGVcIiwgeyBkZXRhaWw6IHsgaHJlZjogbmV4dCB9IH0pLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIHt9XG4gICAgLy8gU2Nyb2xsIGJlaGF2aW9yXG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgaWYgKHVybC5oYXNoKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodXJsLmhhc2guc2xpY2UoMSkpO1xuICAgICAgICBpZiAoZWwpIGVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIGVsc2Ugd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWxGaW5hbCA9XG4gICAgdGFyZ2V0ID09PSBcIl9ibGFua1wiXG4gICAgICA/IFtyZWwsIFwibm9vcGVuZXJcIiwgXCJub3JlZmVycmVyXCJdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKVxuICAgICAgOiByZWw7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFwiYVwiLFxuICAgIHtcbiAgICAgIGhyZWYsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzdHlsZSxcbiAgICAgIHRhcmdldCxcbiAgICAgIHJlbDogcmVsRmluYWwsXG4gICAgICBvbkNsaWNrOiBoYW5kbGVDbGljayxcbiAgICAgIC4uLnJlc3QsXG4gICAgfSxcbiAgICBjaGlsZHJlbixcbiAgKTtcbn1cbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBWaWV3ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ2aWV3XCIpO1xuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuVmlldy5kaXNwbGF5TmFtZSA9IFwiVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUZXh0ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0ZXh0XCIpO1xuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuVGV4dC5kaXNwbGF5TmFtZSA9IFwiVGV4dFwiO1xuZXhwb3J0IGRlZmF1bHQgVGV4dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTY3JvbGxWaWV3ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBob3Jpem9udGFsID0gZmFsc2UsXG4gICAgICBzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3IgPSB0cnVlLFxuICAgICAgc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvciA9IHRydWUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic2Nyb2xsdmlld1wiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrXG4gICAgICBjb25zdCBjb250YWluZXJTdHlsZSA9IHtcbiAgICAgICAgb3ZlcmZsb3dYOiBob3Jpem9udGFsID8gXCJhdXRvXCIgOiBcImhpZGRlblwiLFxuICAgICAgICBvdmVyZmxvd1k6IGhvcml6b250YWwgPyBcImhpZGRlblwiIDogXCJhdXRvXCIsXG4gICAgICAgIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiBcInRvdWNoXCIsXG4gICAgICAgIHNjcm9sbGJhcldpZHRoOiAoXG4gICAgICAgICAgaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAhc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgICAgICA6ICFzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgIClcbiAgICAgICAgICA/IFwibm9uZVwiXG4gICAgICAgICAgOiBcImF1dG9cIixcbiAgICAgICAgbXNPdmVyZmxvd1N0eWxlOiAoXG4gICAgICAgICAgaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAhc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgICAgICA6ICFzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgIClcbiAgICAgICAgICA/IFwibm9uZVwiXG4gICAgICAgICAgOiBcImF1dG9cIixcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG4gICAgICBjb25zdCBjb250ZW50U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW2NvbnRlbnRDb250YWluZXJTdHlsZV0pO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e2NvbnRhaW5lclN0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnJlc3R9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e2NvbnRlbnRTdHlsZX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgIHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvcj17c2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yfVxuICAgICAgICBzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yPXtzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5TY3JvbGxWaWV3LmRpc3BsYXlOYW1lID0gXCJTY3JvbGxWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBTY3JvbGxWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IFRleHRJbnB1dCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICB2YWx1ZSxcbiAgICAgIGRlZmF1bHRWYWx1ZSxcbiAgICAgIG9uQ2hhbmdlVGV4dCxcbiAgICAgIG9uRm9jdXMsXG4gICAgICBvbkJsdXIsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNlY3VyZVRleHRFbnRyeSA9IGZhbHNlLFxuICAgICAgbXVsdGlsaW5lID0gZmFsc2UsXG4gICAgICBudW1iZXJPZkxpbmVzID0gNCxcbiAgICAgIGVkaXRhYmxlID0gdHJ1ZSxcbiAgICAgIHN0eWxlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgaWYgKG9uQ2hhbmdlVGV4dCkgb25DaGFuZ2VUZXh0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29tbW9uU3R5bGUgPSB7XG4gICAgICBhcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICAgIG91dGxpbmU6IFwibm9uZVwiLFxuICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgfTtcblxuICAgIGlmIChtdWx0aWxpbmUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XG4gICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIHJlYWRPbmx5PXshZWRpdGFibGV9XG4gICAgICAgICAgcm93cz17bnVtYmVyT2ZMaW5lc31cbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdHlsZSwgcmVzaXplOiBcIm5vbmVcIiB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0eXBlPXtzZWN1cmVUZXh0RW50cnkgPyBcInBhc3N3b3JkXCIgOiBcInRleHRcIn1cbiAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgcmVhZE9ubHk9eyFlZGl0YWJsZX1cbiAgICAgICAgc3R5bGU9e2NvbW1vblN0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5UZXh0SW5wdXQuZGlzcGxheU5hbWUgPSBcIlRleHRJbnB1dFwiO1xuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEJ1dHRvbiA9IGZvcndhcmRSZWYoXG4gICh7IHRpdGxlLCBvblByZXNzLCBjb2xvciwgZGlzYWJsZWQsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge3RpdGxlfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJCdXR0b25cIjtcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBBY3Rpdml0eUluZGljYXRvciA9IGZvcndhcmRSZWYoXG4gICh7IHNpemUgPSBcInNtYWxsXCIsIGNvbG9yID0gXCIjOTk5XCIsIHN0eWxlLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiYWN0aXZpdHlpbmRpY2F0b3JcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGNvbnN0IHNwaW5uZXJTdHlsZSA9IHtcbiAgICAgICAgYW5pbWF0aW9uOiBcImluZGpzLXNwaW4gMXMgbGluZWFyIGluZmluaXRlXCIsXG4gICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBJbmplY3Qga2V5ZnJhbWVzIGlmIG5vdCBwcmVzZW50XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRqcy1zcGluLXN0eWxlXCIpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgc3R5bGVFbC5pZCA9IFwiaW5kanMtc3Bpbi1zdHlsZVwiO1xuICAgICAgICBzdHlsZUVsLmlubmVySFRNTCA9IGBAa2V5ZnJhbWVzIGluZGpzLXNwaW4geyAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9IDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1gO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gPGRpdiByZWY9e3JlZn0gc3R5bGU9e3NwaW5uZXJTdHlsZX0gey4uLnJlc3R9IC8+O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzaXplPXtzaXplfSBjb2xvcj17Y29sb3J9IHN0eWxlPXtzdHlsZX0gey4uLnJlc3R9IC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkFjdGl2aXR5SW5kaWNhdG9yLmRpc3BsYXlOYW1lID0gXCJBY3Rpdml0eUluZGljYXRvclwiO1xuZXhwb3J0IGRlZmF1bHQgQWN0aXZpdHlJbmRpY2F0b3I7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU3dpdGNoID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHsgdmFsdWUsIG9uVmFsdWVDaGFuZ2UsIGRpc2FibGVkLCB0cmFja0NvbG9yLCB0aHVtYkNvbG9yLCBzdHlsZSwgLi4ucmVzdCB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzd2l0Y2hcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImlucHV0XCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25WYWx1ZUNoYW5nZSAmJiBvblZhbHVlQ2hhbmdlKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICBvblZhbHVlQ2hhbmdlPXtvblZhbHVlQ2hhbmdlfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHRyYWNrQ29sb3I9e3RyYWNrQ29sb3J9XG4gICAgICAgIHRodW1iQ29sb3I9e3RodW1iQ29sb3J9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5Td2l0Y2guZGlzcGxheU5hbWUgPSBcIlN3aXRjaFwiO1xuZXhwb3J0IGRlZmF1bHQgU3dpdGNoO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFNjcm9sbFZpZXcgZnJvbSBcIi4vc2Nyb2xsLXZpZXcuanN4XCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgRmxhdExpc3QgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgZGF0YSxcbiAgICAgIHJlbmRlckl0ZW0sXG4gICAgICBrZXlFeHRyYWN0b3IsXG4gICAgICBMaXN0SGVhZGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgICAgIExpc3RFbXB0eUNvbXBvbmVudCxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIG51bUNvbHVtbnMgPSAxLFxuICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImZsYXRsaXN0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2sgaW1wbGVtZW50YXRpb25cbiAgICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAoTGlzdEVtcHR5Q29tcG9uZW50KSB7XG4gICAgICAgICAgY29uc3QgRW1wdHkgPSBSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0RW1wdHlDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgTGlzdEVtcHR5Q29tcG9uZW50XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxMaXN0RW1wdHlDb21wb25lbnQgLz5cbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge0VtcHR5fVxuICAgICAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGl0ZW1zID0gZGF0YSB8fCBbXTtcbiAgICAgIGNvbnN0IHJlbmRlckxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5RXh0cmFjdG9yXG4gICAgICAgICAgICA/IGtleUV4dHJhY3RvcihpdGVtLCBpbmRleClcbiAgICAgICAgICAgIDogaW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17a2V5fT5cbiAgICAgICAgICAgICAge3JlbmRlckl0ZW0oeyBpdGVtLCBpbmRleCB9KX1cbiAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBmbGF0Q29udGVudFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtjb250ZW50Q29udGFpbmVyU3R5bGVdKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2ZsYXRDb250ZW50U3R5bGV9XG4gICAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICB7cmVuZGVyTGlzdCgpfVxuICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEZvb3RlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0Rm9vdGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgcmVuZGVySXRlbT17cmVuZGVySXRlbX1cbiAgICAgICAga2V5RXh0cmFjdG9yPXtrZXlFeHRyYWN0b3J9XG4gICAgICAgIExpc3RIZWFkZXJDb21wb25lbnQ9e0xpc3RIZWFkZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RGb290ZXJDb21wb25lbnQ9e0xpc3RGb290ZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RFbXB0eUNvbXBvbmVudD17TGlzdEVtcHR5Q29tcG9uZW50fVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgbnVtQ29sdW1ucz17bnVtQ29sdW1uc31cbiAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5GbGF0TGlzdC5kaXNwbGF5TmFtZSA9IFwiRmxhdExpc3RcIjtcbmV4cG9ydCBkZWZhdWx0IEZsYXRMaXN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZU9wYWNpdHkgPSBmb3J3YXJkUmVmKFxuICAoeyBjaGlsZHJlbiwgc3R5bGUsIG9uUHJlc3MsIGFjdGl2ZU9wYWNpdHkgPSAwLjIsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVvcGFjaXR5XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKX1cbiAgICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gYWN0aXZlT3BhY2l0eSl9XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZU9wYWNpdHkuZGlzcGxheU5hbWUgPSBcIlRvdWNoYWJsZU9wYWNpdHlcIjtcbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZU9wYWNpdHk7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUHJlc3NhYmxlID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIG9uUHJlc3MsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwicHJlc3NhYmxlXCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgIHsgY3Vyc29yOiBcInBvaW50ZXJcIiB9LFxuICAgICAgdHlwZW9mIHN0eWxlID09PSBcImZ1bmN0aW9uXCIgPyBzdHlsZSh7IHByZXNzZWQ6IGZhbHNlIH0pIDogc3R5bGUsXG4gICAgXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvbiByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gb25DbGljaz17b25QcmVzc30gey4uLnJlc3R9PlxuICAgICAgICB7dHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGNoaWxkcmVuKHsgcHJlc3NlZDogZmFsc2UgfSlcbiAgICAgICAgICA6IGNoaWxkcmVufVxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSBvblByZXNzPXtvblByZXNzfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuUHJlc3NhYmxlLmRpc3BsYXlOYW1lID0gXCJQcmVzc2FibGVcIjtcbmV4cG9ydCBkZWZhdWx0IFByZXNzYWJsZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBJbWFnZUJhY2tncm91bmQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAgeyBjaGlsZHJlbiwgc3R5bGUsIGltYWdlU3R5bGUsIHNvdXJjZSwgc3JjLCByZXNpemVNb2RlID0gXCJjb3ZlclwiLCAuLi5yZXN0IH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImltYWdlYmFja2dyb3VuZFwiKTtcblxuICAgIGNvbnN0IGltYWdlU291cmNlID0gc3JjIHx8IChzb3VyY2UgJiYgc291cmNlLnVyaSkgfHwgXCJcIjtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgICAge1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aW1hZ2VTb3VyY2V9KWAsXG4gICAgICAgICAgYmFja2dyb3VuZFNpemU6IHJlc2l6ZU1vZGUgPT09IFwic3RyZXRjaFwiID8gXCIxMDAlIDEwMCVcIiA6IHJlc2l6ZU1vZGUsXG4gICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlLFxuICAgICAgXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgaW1hZ2VTdHlsZT17aW1hZ2VTdHlsZX1cbiAgICAgICAgc291cmNlPXtzb3VyY2UgfHwgeyB1cmk6IHNyYyB9fVxuICAgICAgICByZXNpemVNb2RlPXtyZXNpemVNb2RlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbkltYWdlQmFja2dyb3VuZC5kaXNwbGF5TmFtZSA9IFwiSW1hZ2VCYWNrZ3JvdW5kXCI7XG5leHBvcnQgZGVmYXVsdCBJbWFnZUJhY2tncm91bmQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmNvbnN0IE1vZGFsID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgdmlzaWJsZSxcbiAgICAgIHRyYW5zcGFyZW50LFxuICAgICAgYW5pbWF0aW9uVHlwZSxcbiAgICAgIG9uUmVxdWVzdENsb3NlLFxuICAgICAgc3R5bGUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwibW9kYWxcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IG1vZGFsU3R5bGUgPSB7XG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBSZW5kZXIgYXMgcG9ydGFsIGlmIHBvc3NpYmxlXG4gICAgICBjb25zdCBjb250ZW50ID0gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17bW9kYWxTdHlsZX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwoY29udGVudCwgZG9jdW1lbnQuYm9keSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmlzaWJsZT17dmlzaWJsZX1cbiAgICAgICAgdHJhbnNwYXJlbnQ9e3RyYW5zcGFyZW50fVxuICAgICAgICBhbmltYXRpb25UeXBlPXthbmltYXRpb25UeXBlfVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17b25SZXF1ZXN0Q2xvc2V9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuTW9kYWwuZGlzcGxheU5hbWUgPSBcIk1vZGFsXCI7XG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTYWZlQXJlYVZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzYWZlYXJlYXZpZXdcIik7XG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtzdHlsZX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblNhZmVBcmVhVmlldy5kaXNwbGF5TmFtZSA9IFwiU2FmZUFyZWFWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBTYWZlQXJlYVZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcblxuLy8gV2ViIG1vY2sgb2YgU3RhdHVzQmFyLiBJbiBuYXRpdmUgaXQgd291bGQgY2hhbmdlIHRoZSBiYXIgc3R5bGUuXG4vLyBJbiB3ZWIsIG1heWJlIGl0IGNoYW5nZXMgdGhlIG1ldGEgdGhlbWUtY29sb3IgdGFnLlxuXG5mdW5jdGlvbiBTdGF0dXNCYXIoeyBiYXJTdHlsZSA9IFwiZGVmYXVsdFwiLCBiYWNrZ3JvdW5kQ29sb3IsIGhpZGRlbiA9IGZhbHNlIH0pIHtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICAvLyBBdHRlbXB0IHRvIHNldCB0aGVtZS1jb2xvciBtZXRhIHRhZyBpZiBiYWNrZ3JvdW5kQ29sb3IgcHJvdmlkZWRcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBsZXQgbWV0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInRoZW1lLWNvbG9yXCJdJyk7XG4gICAgICBpZiAoIW1ldGEpIHtcbiAgICAgICAgbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIpO1xuICAgICAgICBtZXRhLm5hbWUgPSBcInRoZW1lLWNvbG9yXCI7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobWV0YSk7XG4gICAgICB9XG4gICAgICBtZXRhLmNvbnRlbnQgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgfVxuICB9LCBbYmFja2dyb3VuZENvbG9yXSk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXR1c0JhcjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTY3JvbGxWaWV3IGZyb20gXCIuL3Njcm9sbC12aWV3LmpzeFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU2VjdGlvbkxpc3QgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgc2VjdGlvbnMsXG4gICAgICByZW5kZXJJdGVtLFxuICAgICAgcmVuZGVyU2VjdGlvbkhlYWRlcixcbiAgICAgIGtleUV4dHJhY3RvcixcbiAgICAgIExpc3RIZWFkZXJDb21wb25lbnQsXG4gICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgc3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkID0gdHJ1ZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzZWN0aW9ubGlzdFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrXG4gICAgICBjb25zdCByZW5kZXJTZWN0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIChzZWN0aW9ucyB8fCBbXSkubWFwKChzZWN0aW9uLCBzZWN0aW9uSW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gc2VjdGlvbi5kYXRhIHx8IFtdO1xuICAgICAgICAgIGNvbnN0IGtleSA9IHNlY3Rpb24ua2V5IHx8IHNlY3Rpb25JbmRleC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtrZXl9PlxuICAgICAgICAgICAgICB7cmVuZGVyU2VjdGlvbkhlYWRlciAmJiByZW5kZXJTZWN0aW9uSGVhZGVyKHsgc2VjdGlvbiB9KX1cbiAgICAgICAgICAgICAge2RhdGEubWFwKChpdGVtLCBpdGVtSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtS2V5ID0ga2V5RXh0cmFjdG9yXG4gICAgICAgICAgICAgICAgICA/IGtleUV4dHJhY3RvcihpdGVtLCBpdGVtSW5kZXgpXG4gICAgICAgICAgICAgICAgICA6IGl0ZW0ua2V5IHx8IGl0ZW0uaWQgfHwga2V5ICsgXCItXCIgKyBpdGVtSW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2l0ZW1LZXl9PlxuICAgICAgICAgICAgICAgICAgICB7cmVuZGVySXRlbSh7IGl0ZW0sIGluZGV4OiBpdGVtSW5kZXgsIHNlY3Rpb24gfSl9XG4gICAgICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAge3JlbmRlclNlY3Rpb25zKCl9XG4gICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzZWN0aW9ucz17c2VjdGlvbnN9XG4gICAgICAgIHJlbmRlckl0ZW09e3JlbmRlckl0ZW19XG4gICAgICAgIHJlbmRlclNlY3Rpb25IZWFkZXI9e3JlbmRlclNlY3Rpb25IZWFkZXJ9XG4gICAgICAgIGtleUV4dHJhY3Rvcj17a2V5RXh0cmFjdG9yfVxuICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50PXtMaXN0SGVhZGVyQ29tcG9uZW50fVxuICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50PXtMaXN0Rm9vdGVyQ29tcG9uZW50fVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgc3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkPXtzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuU2VjdGlvbkxpc3QuZGlzcGxheU5hbWUgPSBcIlNlY3Rpb25MaXN0XCI7XG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uTGlzdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBLZXlib2FyZEF2b2lkaW5nVmlldyA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgYmVoYXZpb3IsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0LFxuICAgICAgZW5hYmxlZCxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJrZXlib2FyZGF2b2lkaW5ndmlld1wiKTtcblxuICAgIC8vIE9uIHdlYiwga2V5Ym9hcmQgYXZvaWRpbmcgaXMgdXN1YWxseSBoYW5kbGVkIGJ5IHRoZSBicm93c2VyIGRlZmF1bHQgYmVoYXZpb3Igb3IgaXMgaXJyZWxldmFudFxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSl9IHsuLi5yZXN0fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBiZWhhdmlvcj17YmVoYXZpb3J9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0PXtrZXlib2FyZFZlcnRpY2FsT2Zmc2V0fVxuICAgICAgICBlbmFibGVkPXtlbmFibGVkfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbktleWJvYXJkQXZvaWRpbmdWaWV3LmRpc3BsYXlOYW1lID0gXCJLZXlib2FyZEF2b2lkaW5nVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgS2V5Ym9hcmRBdm9pZGluZ1ZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUmVmcmVzaENvbnRyb2wgPSBmb3J3YXJkUmVmKCh7IHJlZnJlc2hpbmcsIG9uUmVmcmVzaCwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJyZWZyZXNoY29udHJvbFwiKTtcblxuICAvLyBPbiB3ZWIsIHBhc3MtdGhyb3VnaCBvciBpbXBsZW1lbnQgYmFzaWMgdmlzdWFsP1xuICAvLyBVc3VhbGx5IFJlZnJlc2hDb250cm9sIGlzIHBhc3NlZCBhcyBwcm9wIHRvIFNjcm9sbFZpZXcuXG4gIC8vIElmIHVzZWQgYXMgY29tcG9uZW50LCBpdCBtaWdodCB3cmFwIGNvbnRlbnQuXG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgIC8vIE5vLW9wIGZvciB3ZWIgdmlzdWFsIHVzdWFsbHksIHVubGVzcyB3ZSBpbXBsZW1lbnQgcHVsbC10by1yZWZyZXNoXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnRcbiAgICAgIHJlZj17cmVmfVxuICAgICAgcmVmcmVzaGluZz17cmVmcmVzaGluZ31cbiAgICAgIG9uUmVmcmVzaD17b25SZWZyZXNofVxuICAgICAgey4uLnJlc3R9XG4gICAgLz5cbiAgKTtcbn0pO1xuXG5SZWZyZXNoQ29udHJvbC5kaXNwbGF5TmFtZSA9IFwiUmVmcmVzaENvbnRyb2xcIjtcbmV4cG9ydCBkZWZhdWx0IFJlZnJlc2hDb250cm9sO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZUhpZ2hsaWdodCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgb25QcmVzcyxcbiAgICAgIHVuZGVybGF5Q29sb3IgPSBcImJsYWNrXCIsXG4gICAgICBhY3RpdmVPcGFjaXR5ID0gMC44NSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVoaWdobGlnaHRcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKTtcblxuICAgICAgLy8gU2ltcGxlIHdlYiBpbXBsZW1lbnRhdGlvbjoganVzdCBvcGFjaXR5LCBtaW1pY2tpbmcgb3ZlcmxheSBpcyBoYXJkZXIgd2l0aG91dCBzdGF0ZVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtmbGF0U3R5bGV9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IHtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB1bmRlcmxheUNvbG9yO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBhY3RpdmVPcGFjaXR5O1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICB1bmRlcmxheUNvbG9yPXt1bmRlcmxheUNvbG9yfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZUhpZ2hsaWdodC5kaXNwbGF5TmFtZSA9IFwiVG91Y2hhYmxlSGlnaGxpZ2h0XCI7XG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVIaWdobGlnaHQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcblxuLy8gVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrIGp1c3QgYWNjZXB0cyBvblByZXNzIGFuZCBwYXNzZXMgaXQgdG8gdGhlIGNoaWxkXG4vLyBJdCBkb2VzIG5vdCBhZGQgYW55IHZpc3VhbCBmZWVkYmFjay5cbmNvbnN0IFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjayA9ICh7XG4gIGNoaWxkcmVuLFxuICBvblByZXNzLFxuICBvblByZXNzSW4sXG4gIG9uUHJlc3NPdXQsXG4gIGRpc2FibGVkLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IGNoaWxkID0gQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG5cbiAgcmV0dXJuIGNsb25lRWxlbWVudChjaGlsZCwge1xuICAgIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3MpIG9uUHJlc3MoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25DbGljaykgY2hpbGQucHJvcHMub25DbGljayhlKTtcbiAgICB9LFxuICAgIG9uTW91c2VEb3duOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzSW4pIG9uUHJlc3NJbihlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbk1vdXNlRG93bikgY2hpbGQucHJvcHMub25Nb3VzZURvd24oZSk7XG4gICAgfSxcbiAgICBvbk1vdXNlVXA6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NPdXQpIG9uUHJlc3NPdXQoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Nb3VzZVVwKSBjaGlsZC5wcm9wcy5vbk1vdXNlVXAoZSk7XG4gICAgfSxcbiAgICBvblRvdWNoU3RhcnQ6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NJbikgb25QcmVzc0luKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uVG91Y2hTdGFydCkgY2hpbGQucHJvcHMub25Ub3VjaFN0YXJ0KGUpO1xuICAgIH0sXG4gICAgb25Ub3VjaEVuZDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc091dCkgb25QcmVzc091dChlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vblRvdWNoRW5kKSBjaGlsZC5wcm9wcy5vblRvdWNoRW5kKGUpO1xuICAgIH0sXG4gICAgc3R5bGU6IHtcbiAgICAgIGN1cnNvcjogZGlzYWJsZWQgPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcbiAgICAgIC4uLmNoaWxkLnByb3BzLnN0eWxlLFxuICAgIH0sXG4gICAgLi4ucmVzdCxcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2s7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU2NyZWVuIENvbXBvbmVudFxyXG4gKiBGdWxsLWhlaWdodCBzY3JlZW4gY29udGFpbmVyIHdpdGggYmFja2dyb3VuZFxyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU2NyZWVuID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgYmFja2dyb3VuZCA9ICdsaWdodCcsIGNsYXNzTmFtZSA9ICcnLCBzdHlsZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuU2NyZWVuLmRpc3BsYXlOYW1lID0gXCJTY3JlZW5cIjtcclxuZXhwb3J0IGRlZmF1bHQgU2NyZWVuO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgQ29udGFpbmVyIENvbXBvbmVudFxyXG4gKiBSZXNwb25zaXZlIGNvbnRhaW5lciB3aXRoIG1heC13aWR0aCBhbmQgY2VudGVyaW5nXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBDb250YWluZXIgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5Db250YWluZXIuZGlzcGxheU5hbWUgPSBcIkNvbnRhaW5lclwiO1xyXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBDYXJkIENvbXBvbmVudFxyXG4gKiBTdHlsZWQgY2FyZCBjb250YWluZXIgd2l0aCBzaGFkb3cgYW5kIHJvdW5kZWQgY29ybmVyc1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgQ2FyZCA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkNhcmQuZGlzcGxheU5hbWUgPSBcIkNhcmRcIjtcclxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEdyaWQgQ29tcG9uZW50XHJcbiAqIFJlc3BvbnNpdmUgZ3JpZCBsYXlvdXQgc3lzdGVtXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBHcmlkID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuR3JpZC5kaXNwbGF5TmFtZSA9IFwiR3JpZFwiO1xyXG5leHBvcnQgZGVmYXVsdCBHcmlkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU3RhY2sgQ29tcG9uZW50XHJcbiAqIFZlcnRpY2FsIG9yIGhvcml6b250YWwgbGF5b3V0IHdpdGggc3BhY2luZ1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU3RhY2sgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGRpcmVjdGlvbiA9ICd2ZXJ0aWNhbCcsXHJcbiAgICBzcGFjaW5nID0gNCxcclxuICAgIGFsaWduID0gJ3N0YXJ0JyxcclxuICAgIGp1c3RpZnkgPSAnc3RhcnQnLFxyXG4gICAgY2xhc3NOYW1lID0gJycsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG59KTtcclxuXHJcblN0YWNrLmRpc3BsYXlOYW1lID0gXCJTdGFja1wiO1xyXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEljb24gQ29tcG9uZW50XHJcbiAqIERpc3BsYXlzIGVtb2ppIGljb25zIGNvbnNpc3RlbnRseSBhY3Jvc3MgcGxhdGZvcm1zXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBJY29uID0gZm9yd2FyZFJlZigoe1xyXG4gICAgbmFtZSxcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dCByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtuYW1lfVxyXG4gICAgICAgIDwvVGV4dCA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkljb24uZGlzcGxheU5hbWUgPSBcIkljb25cIjtcclxuZXhwb3J0IGRlZmF1bHQgSWNvbjtcclxuIiwgIi8vIERpbWVuc2lvbnMgQVBJIGZvciBXZWJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcblxuY29uc3QgbGlzdGVuZXJzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgbGlzdGVuZXJzLmVtaXQoXCJjaGFuZ2VcIiwgeyB3aW5kb3c6IGdldFdpbmRvdygpLCBzY3JlZW46IGdldFNjcmVlbigpIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93KCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgIHNjYWxlOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLFxuICAgIGZvbnRTY2FsZTogMSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NyZWVuKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5zY3JlZW4ud2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuc2NyZWVuLmhlaWdodCxcbiAgICBzY2FsZTogd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSxcbiAgICBmb250U2NhbGU6IDEsXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBEaW1lbnNpb25zID0ge1xuICBnZXQ6IChkaW0pID0+IHtcbiAgICBpZiAoZGltID09PSBcIndpbmRvd1wiKSByZXR1cm4gZ2V0V2luZG93KCk7XG4gICAgaWYgKGRpbSA9PT0gXCJzY3JlZW5cIikgcmV0dXJuIGdldFNjcmVlbigpO1xuICAgIHJldHVybiBnZXRXaW5kb3coKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJjaGFuZ2VcIikge1xuICAgICAgbGlzdGVuZXJzLm9uKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVtb3ZlOiAoKSA9PiBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcImNoYW5nZVwiKSB7XG4gICAgICBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpbWVuc2lvbnM7XG4iLCAiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5jb25zdCBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmV4cG9ydCBjb25zdCBMaW5raW5nID0ge1xuICBvcGVuVVJMOiAodXJsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5vcGVuKHVybCwgXCJfYmxhbmtcIiwgXCJub29wZW5lcixub3JlZmVycmVyXCIpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH0sXG4gIGNhbk9wZW5VUkw6ICh1cmwpID0+IFByb21pc2UucmVzb2x2ZSh0cnVlKSxcbiAgZ2V0SW5pdGlhbFVSTDogKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJ1cmxcIikge1xuICAgICAgLy8gSW4gYSByZWFsIHdlYiBhcHAsIHdlIG1pZ2h0IGxpc3RlbiB0byBwb3BzdGF0ZSBvciBoYXNoY2hhbmdlXG4gICAgICAvLyBlbnN1cmluZyB3ZSByZXR1cm4gYSBzdWJzY3JpcHRpb24tbGlrZSBvYmplY3RcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gKGUpID0+IGhhbmRsZXIoeyB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBsaXN0ZW5lcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6ICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgbGlzdGVuZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIC8vIERlcHJlY2F0ZWQgaW4gUk4gYnV0IGdvb2QgdG8gaGF2ZSBzaWduYXR1cmVcbiAgfSxcbiAgc2VuZEludGVudDogKGFjdGlvbiwgZXh0cmFzKSA9PiBQcm9taXNlLnJlc29sdmUoKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtpbmc7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZlYXR1cmVDYXJkKHsgaWNvbiwgdGl0bGUsIGRlc2NyaXB0aW9uLCBncmFkaWVudCB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JvdXAgcmVsYXRpdmUgYmctd2hpdGUgcm91bmRlZC0yeGwgcC02IHNtOnAtOCBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LTJ4bCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgdHJhbnNmb3JtIGhvdmVyOi10cmFuc2xhdGUteS0yIGJvcmRlciBib3JkZXItZ3JheS0xMDAgb3ZlcmZsb3ctaGlkZGVuXCI+XHJcbiAgICAgIHsvKiBCYWNrZ3JvdW5kIEdyYWRpZW50IG9uIEhvdmVyICovfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktNSB0cmFuc2l0aW9uLW9wYWNpdHkgZHVyYXRpb24tNTAwICR7Z3JhZGllbnQgfHwgJ2JnLWdyYWRpZW50LXRvLWJyIGZyb20taW5kaWdvLTYwMCB0by1wdXJwbGUtNjAwJ31gfT48L2Rpdj5cclxuICAgICAgXHJcbiAgICAgIHsvKiBJY29uIENvbnRhaW5lciAqL31cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LTE0IGgtMTQgc206dy0xNiBzbTpoLTE2IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20taW5kaWdvLTEwMCB0by1wdXJwbGUtMTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1iLTUgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtM3hsIHNtOnRleHQtNHhsXCI+e2ljb259PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgXHJcbiAgICAgIHsvKiBDb250ZW50ICovfVxyXG4gICAgICA8aDMgY2xhc3NOYW1lPVwicmVsYXRpdmUgdGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0zIGdyb3VwLWhvdmVyOnRleHQtaW5kaWdvLTYwMCB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0zMDBcIj5cclxuICAgICAgICB7dGl0bGV9XHJcbiAgICAgIDwvaDM+XHJcbiAgICAgIDxwIGNsYXNzTmFtZT1cInJlbGF0aXZlIHRleHQtZ3JheS02MDAgbGVhZGluZy1yZWxheGVkIHRleHQtc20gc206dGV4dC1iYXNlXCI+XHJcbiAgICAgICAge2Rlc2NyaXB0aW9ufVxyXG4gICAgICA8L3A+XHJcbiAgICAgIFxyXG4gICAgICB7LyogQXJyb3cgSWNvbiAqL31cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtdC00IGZsZXggaXRlbXMtY2VudGVyIHRleHQtaW5kaWdvLTYwMCBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRyYW5zZm9ybSB0cmFuc2xhdGUteC0wIGdyb3VwLWhvdmVyOnRyYW5zbGF0ZS14LTJcIj5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGRcIj5MZWFybiBtb3JlPC9zcGFuPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy00IGgtNCBtbC0yXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezJ9IGQ9XCJNMTcgOGw0IDRtMCAwbC00IDRtNC00SDNcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgXHJcbiAgICAgIHsvKiBEZWNvcmF0aXZlIENvcm5lciAqL31cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIHctMjAgaC0yMCBiZy1ncmFkaWVudC10by1ibCBmcm9tLWluZGlnby0xMDAvNTAgdG8tdHJhbnNwYXJlbnQgcm91bmRlZC1ibC1bMTAwcHhdIG9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMCB0cmFuc2l0aW9uLW9wYWNpdHkgZHVyYXRpb24tNTAwXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQUEsT0FBT0EsV0FB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QUFNLGVBQWU7QUFBQSxJQUNuQjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxPQUFPO0FBQUEsSUFDWDtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUVBLFFBQU0sYUFBYTtBQUFBLElBQ2pCO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLGFBQWE7QUFBQSxNQUNi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RUo7IiwKICAibmFtZXMiOiBbIlJlYWN0IiwgInBsYXRmb3JtIiwgIlN0eWxlU2hlZXQiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAianN4cyIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIkV2ZW50RW1pdHRlciIsICJSZWFjdCIsICJqc3giLCAianN4cyIsICJqc3giLCAianN4cyIsICJwbGF0Zm9ybSJdCn0K
