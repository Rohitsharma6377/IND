var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// pages/_layout.jsx
import React30 from "react";

// components/Navbar.jsx
import React28, { useState, useEffect } from "react";

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

// components/Navbar.jsx
import { jsx as jsx25, jsxs as jsxs3 } from "react/jsx-runtime";
var MenuIcon = () => /* @__PURE__ */ jsxs3("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ jsx25("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ jsx25("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
] });
var CloseIcon = () => /* @__PURE__ */ jsxs3("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
  /* @__PURE__ */ jsx25("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
] });
var GithubIcon = () => /* @__PURE__ */ jsx25("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx25("path", { d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" }) });
var StarIcon = () => /* @__PURE__ */ jsx25("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx25("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" }) });
var ZapIcon = () => /* @__PURE__ */ jsx25("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx25("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) });
var BookIcon = () => /* @__PURE__ */ jsxs3("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }),
  /* @__PURE__ */ jsx25("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })
] });
var CodeIcon = () => /* @__PURE__ */ jsxs3("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("polyline", { points: "16 18 22 12 16 6" }),
  /* @__PURE__ */ jsx25("polyline", { points: "8 6 2 12 8 18" })
] });
var GridIcon = () => /* @__PURE__ */ jsxs3("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("rect", { x: "3", y: "3", width: "7", height: "7" }),
  /* @__PURE__ */ jsx25("rect", { x: "14", y: "3", width: "7", height: "7" }),
  /* @__PURE__ */ jsx25("rect", { x: "14", y: "14", width: "7", height: "7" }),
  /* @__PURE__ */ jsx25("rect", { x: "3", y: "14", width: "7", height: "7" })
] });
var ArrowRightIcon = () => /* @__PURE__ */ jsxs3("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
  /* @__PURE__ */ jsx25("polyline", { points: "12 5 19 12 12 19" })
] });
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { href: "/features", label: "Features", icon: ZapIcon },
    { href: "/components", label: "Components", icon: GridIcon },
    { href: "/docs", label: "Docs", icon: BookIcon },
    { href: "/examples", label: "Examples", icon: CodeIcon }
  ];
  return /* @__PURE__ */ jsxs3("nav", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-900/5 border-b border-gray-200/50" : "bg-white/70 backdrop-blur-md"}`, children: [
    /* @__PURE__ */ jsx25("div", { className: "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x" }),
    /* @__PURE__ */ jsxs3("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-center h-16 lg:h-18", children: [
        /* @__PURE__ */ jsx25(Link, { href: "/", children: /* @__PURE__ */ jsxs3("div", { className: "flex items-center cursor-pointer group", children: [
          /* @__PURE__ */ jsxs3("div", { className: "relative", children: [
            /* @__PURE__ */ jsx25("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" }),
            /* @__PURE__ */ jsx25(
              "img",
              {
                src: "/logo.svg",
                alt: "INDJS Logo",
                className: "relative w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "ml-2 flex flex-col", children: [
            /* @__PURE__ */ jsx25("span", { className: "text-xl font-black tracking-tight", children: /* @__PURE__ */ jsx25("span", { className: "bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent", children: "indjs" }) }),
            /* @__PURE__ */ jsx25("span", { className: "text-[10px] font-semibold text-gray-400 uppercase tracking-wider -mt-0.5 hidden sm:block", children: "Framework" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs3("div", { className: "hidden md:flex items-center", children: [
          /* @__PURE__ */ jsx25("div", { className: "flex items-center bg-gray-100/80 backdrop-blur-sm rounded-full p-1.5 mr-4 shadow-inner", children: navLinks.map((link) => {
            const IconComponent = link.icon;
            return /* @__PURE__ */ jsx25(Link, { href: link.href, children: /* @__PURE__ */ jsxs3("span", { className: "relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer transition-all duration-200 rounded-full hover:bg-white hover:shadow-md flex items-center gap-1.5 group", children: [
              /* @__PURE__ */ jsx25(IconComponent, {}),
              link.label
            ] }) }, link.href);
          }) }),
          /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx25(Link, { href: "/docs", children: /* @__PURE__ */ jsxs3("button", { className: "px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 group", children: [
              "Get Started",
              /* @__PURE__ */ jsx25(ArrowRightIcon, {})
            ] }) }),
            /* @__PURE__ */ jsxs3(
              "a",
              {
                href: "https://github.com/Rohitsharma6377/IND",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "group flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-gray-900/25",
                children: [
                  /* @__PURE__ */ jsx25(GithubIcon, {}),
                  /* @__PURE__ */ jsx25("span", { className: "font-semibold text-sm", children: "Star" }),
                  /* @__PURE__ */ jsxs3("span", { className: "flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold", children: [
                    /* @__PURE__ */ jsx25(StarIcon, {}),
                    "1K+"
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx25(
          "button",
          {
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            className: "md:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors",
            "aria-label": "Toggle menu",
            children: mobileMenuOpen ? /* @__PURE__ */ jsx25(CloseIcon, {}) : /* @__PURE__ */ jsx25(MenuIcon, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsx25("div", { className: `md:hidden overflow-hidden transition-all duration-300 ease-out ${mobileMenuOpen ? "max-h-[450px] opacity-100 pb-4" : "max-h-0 opacity-0"}`, children: /* @__PURE__ */ jsx25("div", { className: "bg-white rounded-2xl shadow-xl shadow-gray-900/10 p-3 mt-2 border border-gray-100", children: /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-1", children: [
        navLinks.map((link) => {
          const IconComponent = link.icon;
          return /* @__PURE__ */ jsx25(Link, { href: link.href, children: /* @__PURE__ */ jsxs3(
            "span",
            {
              onClick: () => setMobileMenuOpen(false),
              className: "flex items-center gap-3 text-gray-700 hover:text-indigo-600 font-medium cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all",
              children: [
                /* @__PURE__ */ jsx25("span", { className: "w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center", children: /* @__PURE__ */ jsx25(IconComponent, {}) }),
                link.label
              ]
            }
          ) }, link.href);
        }),
        /* @__PURE__ */ jsx25("div", { className: "h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2 mx-4" }),
        /* @__PURE__ */ jsx25(Link, { href: "/docs", children: /* @__PURE__ */ jsxs3(
          "span",
          {
            onClick: () => setMobileMenuOpen(false),
            className: "flex items-center justify-center gap-2 py-3 px-4 text-white font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all cursor-pointer shadow-md",
            children: [
              "Get Started",
              /* @__PURE__ */ jsx25(ArrowRightIcon, {})
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs3(
          "a",
          {
            href: "https://github.com/Rohitsharma6377/IND",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-center gap-2 mt-1 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold",
            children: [
              /* @__PURE__ */ jsx25(GithubIcon, {}),
              "Star on GitHub",
              /* @__PURE__ */ jsxs3("span", { className: "flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold", children: [
                /* @__PURE__ */ jsx25(StarIcon, {}),
                "1K+"
              ] })
            ]
          }
        )
      ] }) }) })
    ] })
  ] });
}

// components/Footer.jsx
import React29 from "react";
import { jsx as jsx26, jsxs as jsxs4 } from "react/jsx-runtime";
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const footerLinks = {
    product: [
      { href: "/features", label: "Features" },
      { href: "/docs", label: "Documentation" },
      { href: "/examples", label: "Examples" },
      { href: "/docs", label: "Changelog" }
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "https://github.com/Rohitsharma6377/IND", label: "GitHub", external: true },
      { href: "mailto:rohitsharmadev1@outlook.com", label: "Contact", external: true }
    ],
    community: [
      { href: "https://github.com/Rohitsharma6377/IND/discussions", label: "Discussions", external: true },
      { href: "https://github.com/Rohitsharma6377/IND/issues", label: "Issues", external: true },
      { href: "https://discord.gg/indjs", label: "Discord", external: true }
    ]
  };
  const socialLinks = [
    {
      href: "https://github.com/Rohitsharma6377/IND",
      label: "GitHub",
      icon: /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { fillRule: "evenodd", d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", clipRule: "evenodd" }) })
    },
    {
      href: "https://twitter.com/Netcurion",
      label: "Twitter",
      icon: /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) })
    },
    {
      href: "https://discord.gg/indjs",
      label: "Discord",
      icon: /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" }) })
    }
  ];
  const LinkItem = ({ href, label, external }) => {
    if (external) {
      return /* @__PURE__ */ jsx26(
        "a",
        {
          href,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-gray-400 hover:text-white transition-colors duration-200",
          children: label
        }
      );
    }
    return /* @__PURE__ */ jsx26(Link, { href, children: /* @__PURE__ */ jsx26("span", { className: "text-gray-400 hover:text-white cursor-pointer transition-colors duration-200", children: label }) });
  };
  return /* @__PURE__ */ jsxs4("footer", { className: "bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsx26("div", { className: "absolute inset-0 bg-grid-white opacity-[0.02]" }),
    /* @__PURE__ */ jsx26("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" }),
    /* @__PURE__ */ jsx26("div", { className: "absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" }),
    /* @__PURE__ */ jsx26("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" }),
    /* @__PURE__ */ jsxs4("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20", children: [
      /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12", children: [
        /* @__PURE__ */ jsxs4("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsx26(Link, { href: "/", children: /* @__PURE__ */ jsxs4("div", { className: "flex items-center mb-4 cursor-pointer group", children: [
            /* @__PURE__ */ jsx26(
              "img",
              {
                src: "/logo.svg",
                alt: "INDJS Logo",
                className: "w-12 h-12 object-contain group-hover:scale-110 transition-transform"
              }
            ),
            /* @__PURE__ */ jsxs4("div", { className: "ml-2", children: [
              /* @__PURE__ */ jsx26("span", { className: "text-2xl font-black", children: "INDJS" }),
              /* @__PURE__ */ jsx26("span", { className: "block text-xs text-purple-400", children: "Universal Framework" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx26("p", { className: "text-gray-400 text-sm leading-relaxed mb-6 max-w-sm", children: "The modern React framework for building blazing-fast web, desktop, and mobile applications with a single codebase." }),
          /* @__PURE__ */ jsx26("div", { className: "flex space-x-2", children: socialLinks.map((social) => /* @__PURE__ */ jsx26(
            "a",
            {
              href: social.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-10 h-10 bg-white/5 hover:bg-indigo-600 border border-white/10 hover:border-indigo-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20",
              "aria-label": social.label,
              children: social.icon
            },
            social.label
          )) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx26("h4", { className: "font-bold text-lg mb-4", children: "Product" }),
          /* @__PURE__ */ jsx26("div", { className: "space-y-3", children: footerLinks.product.map((link) => /* @__PURE__ */ jsx26("div", { children: /* @__PURE__ */ jsx26(LinkItem, { ...link }) }, link.label)) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx26("h4", { className: "font-bold text-lg mb-4", children: "Company" }),
          /* @__PURE__ */ jsx26("div", { className: "space-y-3", children: footerLinks.company.map((link) => /* @__PURE__ */ jsx26("div", { children: /* @__PURE__ */ jsx26(LinkItem, { ...link }) }, link.label)) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx26("h4", { className: "font-bold text-lg mb-4", children: "Community" }),
          /* @__PURE__ */ jsx26("div", { className: "space-y-3", children: footerLinks.community.map((link) => /* @__PURE__ */ jsx26("div", { children: /* @__PURE__ */ jsx26(LinkItem, { ...link }) }, link.label)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx26("div", { className: "mt-12 pt-8 border-t border-gray-800", children: /* @__PURE__ */ jsxs4("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx26("h4", { className: "font-bold text-lg mb-1", children: "Get In Touch" }),
          /* @__PURE__ */ jsx26("p", { className: "text-gray-400 text-sm", children: "Reach out for questions or collaboration" })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxs4("a", { href: "mailto:rohitsharmadev1@outlook.com", className: "flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-indigo-500 transition-colors text-gray-300 hover:text-white", children: [
            /* @__PURE__ */ jsxs4("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx26("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
              /* @__PURE__ */ jsx26("polyline", { points: "22,6 12,13 2,6" })
            ] }),
            /* @__PURE__ */ jsx26("span", { className: "text-sm", children: "Email" })
          ] }),
          /* @__PURE__ */ jsxs4("a", { href: "tel:+916377289324", className: "flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-indigo-500 transition-colors text-gray-300 hover:text-white", children: [
            /* @__PURE__ */ jsx26("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx26("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
            /* @__PURE__ */ jsx26("span", { className: "text-sm", children: "+91 6377289324" })
          ] }),
          /* @__PURE__ */ jsxs4("a", { href: "https://www.linkedin.com/in/rohit-sharma-6377-dev/", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-indigo-500 transition-colors text-gray-300 hover:text-white", children: [
            /* @__PURE__ */ jsx26("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx26("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }),
            /* @__PURE__ */ jsx26("span", { className: "text-sm", children: "LinkedIn" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx26("div", { className: "mt-12 pt-8 border-t border-gray-800 text-center", children: /* @__PURE__ */ jsxs4("p", { className: "text-gray-500 text-sm", children: [
        "\xA9 ",
        currentYear,
        " INDJS. Built with \u2764\uFE0F in India by",
        " ",
        /* @__PURE__ */ jsx26(
          "a",
          {
            href: "https://github.com/Rohitsharma6377",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-indigo-400 hover:text-indigo-300 transition-colors",
            children: "Rohit Sharma"
          }
        ),
        " ",
        "& the INDJS Team."
      ] }) })
    ] })
  ] });
}

// pages/_layout.jsx
import { jsx as jsx27, jsxs as jsxs5 } from "react/jsx-runtime";
function Layout({ children }) {
  return /* @__PURE__ */ jsxs5("div", { className: "min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50/80", children: [
    /* @__PURE__ */ jsx27(Navbar, {}),
    /* @__PURE__ */ jsx27("main", { className: "flex-1 pt-[66px]", children }),
    /* @__PURE__ */ jsx27(Footer, {})
  ] });
}
export {
  Layout as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvX2xheW91dC5qc3giLCAiLi4vLi4vY29tcG9uZW50cy9OYXZiYXIuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvcGxhdGZvcm0ubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pbWFnZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy91bml2ZXJzYWwvcmVzb2x2ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvc3R5bGUtc2hlZXQubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9saW5rLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JvbGwtdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQtaW5wdXQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9idXR0b24uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS1pbmRpY2F0b3IuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zd2l0Y2guanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9mbGF0LWxpc3QuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtb3BhY2l0eS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3ByZXNzYWJsZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLWJhY2tncm91bmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9tb2RhbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NhZmUtYXJlYS12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhdHVzLWJhci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NlY3Rpb24tbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2tleWJvYXJkLWF2b2lkaW5nLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9yZWZyZXNoLWNvbnRyb2wuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtaGlnaGxpZ2h0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdG91Y2hhYmxlLXdpdGhvdXQtZmVlZGJhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JlZW4uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jb250YWluZXIuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jYXJkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvZ3JpZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N0YWNrLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaWNvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2RpbWVuc2lvbnMubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9saW5raW5nLm1qcyIsICIuLi8uLi9jb21wb25lbnRzL0Zvb3Rlci5qc3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vY29tcG9uZW50cy9OYXZiYXInO1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvRm9vdGVyJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGF5b3V0KHsgY2hpbGRyZW4gfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBmbGV4IGZsZXgtY29sIGJnLWdyYWRpZW50LXRvLWIgZnJvbS13aGl0ZSB0by1ncmF5LTUwLzgwXCI+XHJcbiAgICAgIDxOYXZiYXIgLz5cclxuICAgICAgPG1haW4gY2xhc3NOYW1lPVwiZmxleC0xIHB0LVs2NnB4XVwiPlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC9tYWluPlxyXG4gICAgICA8Rm9vdGVyIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59IiwgImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAnaW5kanMnO1xyXG5cclxuLy8gU1ZHIEljb25zIGlubGluZSBmb3IgbmF2YmFyXHJcbmNvbnN0IE1lbnVJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgPGxpbmUgeDE9XCIzXCIgeTE9XCI2XCIgeDI9XCIyMVwiIHkyPVwiNlwiIC8+XHJcbiAgICA8bGluZSB4MT1cIjNcIiB5MT1cIjEyXCIgeDI9XCIyMVwiIHkyPVwiMTJcIiAvPlxyXG4gICAgPGxpbmUgeDE9XCIzXCIgeTE9XCIxOFwiIHgyPVwiMjFcIiB5Mj1cIjE4XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IENsb3NlSWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgIDxsaW5lIHgxPVwiMThcIiB5MT1cIjZcIiB4Mj1cIjZcIiB5Mj1cIjE4XCIgLz5cclxuICAgIDxsaW5lIHgxPVwiNlwiIHkxPVwiNlwiIHgyPVwiMThcIiB5Mj1cIjE4XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IEdpdGh1Ykljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgPHBhdGggZD1cIk0xMiAyQzYuNDc3IDIgMiA2LjQ4NCAyIDEyLjAxN2MwIDQuNDI1IDIuODY1IDguMTggNi44MzkgOS41MDQuNS4wOTIuNjgyLS4yMTcuNjgyLS40ODMgMC0uMjM3LS4wMDgtLjg2OC0uMDEzLTEuNzAzLTIuNzgyLjYwNS0zLjM2OS0xLjM0My0zLjM2OS0xLjM0My0uNDU0LTEuMTU4LTEuMTEtMS40NjYtMS4xMS0xLjQ2Ni0uOTA4LS42Mi4wNjktLjYwOC4wNjktLjYwOCAxLjAwMy4wNyAxLjUzMSAxLjAzMiAxLjUzMSAxLjAzMi44OTIgMS41MyAyLjM0MSAxLjA4OCAyLjkxLjgzMi4wOTItLjY0Ny4zNS0xLjA4OC42MzYtMS4zMzgtMi4yMi0uMjUzLTQuNTU1LTEuMTEzLTQuNTU1LTQuOTUxIDAtMS4wOTMuMzktMS45ODggMS4wMjktMi42ODgtLjEwMy0uMjUzLS40NDYtMS4yNzIuMDk4LTIuNjUgMCAwIC44NC0uMjcgMi43NSAxLjAyNkE5LjU2NCA5LjU2NCAwIDAxMTIgNi44NDRjLjg1LjAwNCAxLjcwNS4xMTUgMi41MDQuMzM3IDEuOTA5LTEuMjk2IDIuNzQ3LTEuMDI3IDIuNzQ3LTEuMDI3LjU0NiAxLjM3OS4yMDIgMi4zOTguMSAyLjY1MS42NC43IDEuMDI4IDEuNTk1IDEuMDI4IDIuNjg4IDAgMy44NDgtMi4zMzkgNC42OTUtNC41NjYgNC45NDMuMzU5LjMwOS42NzguOTIuNjc4IDEuODU1IDAgMS4zMzgtLjAxMiAyLjQxOS0uMDEyIDIuNzQ3IDAgLjI2OC4xOC41OC42ODguNDgyQTEwLjAxOSAxMC4wMTkgMCAwMDIyIDEyLjAxN0MyMiA2LjQ4NCAxNy41MjIgMiAxMiAyelwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBTdGFySWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICA8cG9seWdvbiBwb2ludHM9XCIxMiAyIDE1LjA5IDguMjYgMjIgOS4yNyAxNyAxNC4xNCAxOC4xOCAyMS4wMiAxMiAxNy43NyA1LjgyIDIxLjAyIDcgMTQuMTQgMiA5LjI3IDguOTEgOC4yNiAxMiAyXCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IFphcEljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICA8cG9seWdvbiBwb2ludHM9XCIxMyAyIDMgMTQgMTIgMTQgMTEgMjIgMjEgMTAgMTIgMTAgMTMgMlwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBCb29rSWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgIDxwYXRoIGQ9XCJNNCAxOS41QTIuNSAyLjUgMCAwIDEgNi41IDE3SDIwXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNNi41IDJIMjB2MjBINi41QTIuNSAyLjUgMCAwIDEgNCAxOS41di0xNUEyLjUgMi41IDAgMCAxIDYuNSAyelwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBDb2RlSWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgIDxwb2x5bGluZSBwb2ludHM9XCIxNiAxOCAyMiAxMiAxNiA2XCIgLz5cclxuICAgIDxwb2x5bGluZSBwb2ludHM9XCI4IDYgMiAxMiA4IDE4XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IEdyaWRJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgPHJlY3QgeD1cIjNcIiB5PVwiM1wiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjdcIiAvPlxyXG4gICAgPHJlY3QgeD1cIjE0XCIgeT1cIjNcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCI3XCIgLz5cclxuICAgIDxyZWN0IHg9XCIxNFwiIHk9XCIxNFwiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjdcIiAvPlxyXG4gICAgPHJlY3QgeD1cIjNcIiB5PVwiMTRcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCI3XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IEFycm93UmlnaHRJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgPGxpbmUgeDE9XCI1XCIgeTE9XCIxMlwiIHgyPVwiMTlcIiB5Mj1cIjEyXCIgLz5cclxuICAgIDxwb2x5bGluZSBwb2ludHM9XCIxMiA1IDE5IDEyIDEyIDE5XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdmJhcigpIHtcclxuICAgIGNvbnN0IFttb2JpbGVNZW51T3Blbiwgc2V0TW9iaWxlTWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gICAgY29uc3QgW3Njcm9sbGVkLCBzZXRTY3JvbGxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBoYW5kbGVTY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldFNjcm9sbGVkKHdpbmRvdy5zY3JvbGxZID4gMTApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGhhbmRsZVNjcm9sbCk7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBoYW5kbGVTY3JvbGwpO1xyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIGNvbnN0IG5hdkxpbmtzID0gW1xyXG4gICAgICAgIHsgaHJlZjogJy9mZWF0dXJlcycsIGxhYmVsOiAnRmVhdHVyZXMnLCBpY29uOiBaYXBJY29uIH0sXHJcbiAgICAgICAgeyBocmVmOiAnL2NvbXBvbmVudHMnLCBsYWJlbDogJ0NvbXBvbmVudHMnLCBpY29uOiBHcmlkSWNvbiB9LFxyXG4gICAgICAgIHsgaHJlZjogJy9kb2NzJywgbGFiZWw6ICdEb2NzJywgaWNvbjogQm9va0ljb24gfSxcclxuICAgICAgICB7IGhyZWY6ICcvZXhhbXBsZXMnLCBsYWJlbDogJ0V4YW1wbGVzJywgaWNvbjogQ29kZUljb24gfSxcclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8bmF2IGNsYXNzTmFtZT17YGZpeGVkIHRvcC0wIGxlZnQtMCByaWdodC0wIHotNTAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwICR7XHJcbiAgICAgICAgICAgIHNjcm9sbGVkIFxyXG4gICAgICAgICAgICAgICAgPyAnYmctd2hpdGUvOTUgYmFja2Ryb3AtYmx1ci14bCBzaGFkb3ctbGcgc2hhZG93LWdyYXktOTAwLzUgYm9yZGVyLWIgYm9yZGVyLWdyYXktMjAwLzUwJyBcclxuICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlLzcwIGJhY2tkcm9wLWJsdXItbWQnXHJcbiAgICAgICAgfWB9PlxyXG4gICAgICAgICAgICB7LyogQW5pbWF0ZWQgZ3JhZGllbnQgYWNjZW50IGxpbmUgKi99XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHJpZ2h0LTAgaC1bMnB4XSBiZy1ncmFkaWVudC10by1yIGZyb20taW5kaWdvLTUwMCB2aWEtcHVycGxlLTUwMCB0by1waW5rLTUwMCBhbmltYXRlLWdyYWRpZW50LXhcIj48L2Rpdj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIGgtMTYgbGc6aC0xOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBMb2dvICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgY3Vyc29yLXBvaW50ZXIgZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBMb2dvIEltYWdlICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by1iciBmcm9tLWN5YW4tNTAwIHRvLXB1cnBsZS02MDAgcm91bmRlZC14bCBibHVyLWxnIG9wYWNpdHktMzAgZ3JvdXAtaG92ZXI6b3BhY2l0eS01MCB0cmFuc2l0aW9uLW9wYWNpdHkgZHVyYXRpb24tMzAwXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiL2xvZ28uc3ZnXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIklOREpTIExvZ29cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy0xMiBoLTEyIG9iamVjdC1jb250YWluIGdyb3VwLWhvdmVyOnNjYWxlLTExMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDAgZHJvcC1zaGFkb3ctbGdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBMb2dvIFRleHQgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1sLTIgZmxleCBmbGV4LWNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ibGFjayB0cmFja2luZy10aWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi01MDAgdmlhLWluZGlnby01MDAgdG8tcHVycGxlLTYwMCBiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudFwiPmluZGpzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LXNlbWlib2xkIHRleHQtZ3JheS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIC1tdC0wLjUgaGlkZGVuIHNtOmJsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZyYW1ld29ya1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L0xpbms+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBEZXNrdG9wIE5hdmlnYXRpb24gKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6ZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIE5hdiBMaW5rcyB3aXRoIGdsYXNzIGVmZmVjdCAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBiZy1ncmF5LTEwMC84MCBiYWNrZHJvcC1ibHVyLXNtIHJvdW5kZWQtZnVsbCBwLTEuNSBtci00IHNoYWRvdy1pbm5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge25hdkxpbmtzLm1hcCgobGluaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IEljb25Db21wb25lbnQgPSBsaW5rLmljb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsga2V5PXtsaW5rLmhyZWZ9IGhyZWY9e2xpbmsuaHJlZn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBweC00IHB5LTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNjAwIGhvdmVyOnRleHQtZ3JheS05MDAgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwIHJvdW5kZWQtZnVsbCBob3ZlcjpiZy13aGl0ZSBob3ZlcjpzaGFkb3ctbWQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uQ29tcG9uZW50IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xpbmsubGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIEFjdGlvbnMgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBHZXQgU3RhcnRlZCBCdXR0b24gKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2RvY3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInB4LTUgcHktMi41IHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNjAwIHRvLXB1cnBsZS02MDAgcm91bmRlZC1mdWxsIGhvdmVyOmZyb20taW5kaWdvLTcwMCBob3Zlcjp0by1wdXJwbGUtNzAwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBzaGFkb3ctbWQgaG92ZXI6c2hhZG93LWxnIGhvdmVyOnNoYWRvdy1pbmRpZ28tNTAwLzI1IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdldCBTdGFydGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBcnJvd1JpZ2h0SWNvbiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogR2l0SHViIEJ1dHRvbiAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9Sb2hpdHNoYXJtYTYzNzcvSU5EXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdyb3VwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMi41IGJnLWdyYXktOTAwIHRleHQtd2hpdGUgcm91bmRlZC1mdWxsIGhvdmVyOmJnLWdyYXktODAwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBzaGFkb3ctbWQgaG92ZXI6c2hhZG93LXhsIGhvdmVyOnNoYWRvdy1ncmF5LTkwMC8yNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdpdGh1Ykljb24gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc21cIj5TdGFyPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci00MDAgdG8tb3JhbmdlLTQwMCB0ZXh0LWdyYXktOTAwIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LXhzIGZvbnQtYm9sZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3Rhckljb24gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMUsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIE1vYmlsZSBtZW51IGJ1dHRvbiAqL31cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE1vYmlsZU1lbnVPcGVuKCFtb2JpbGVNZW51T3Blbil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1kOmhpZGRlbiBwLTIuNSByb3VuZGVkLXhsIGJnLWdyYXktMTAwIGhvdmVyOmJnLWdyYXktMjAwIHRyYW5zaXRpb24tY29sb3JzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlRvZ2dsZSBtZW51XCJcclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttb2JpbGVNZW51T3BlbiA/IDxDbG9zZUljb24gLz4gOiA8TWVudUljb24gLz59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogTW9iaWxlIE5hdmlnYXRpb24gKi99XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YG1kOmhpZGRlbiBvdmVyZmxvdy1oaWRkZW4gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGVhc2Utb3V0ICR7bW9iaWxlTWVudU9wZW4gPyAnbWF4LWgtWzQ1MHB4XSBvcGFjaXR5LTEwMCBwYi00JyA6ICdtYXgtaC0wIG9wYWNpdHktMCd9YH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBzaGFkb3cteGwgc2hhZG93LWdyYXktOTAwLzEwIHAtMyBtdC0yIGJvcmRlciBib3JkZXItZ3JheS0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bmF2TGlua3MubWFwKChsaW5rKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgSWNvbkNvbXBvbmVudCA9IGxpbmsuaWNvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayBrZXk9e2xpbmsuaHJlZn0gaHJlZj17bGluay5ocmVmfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE1vYmlsZU1lbnVPcGVuKGZhbHNlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LWdyYXktNzAwIGhvdmVyOnRleHQtaW5kaWdvLTYwMCBmb250LW1lZGl1bSBjdXJzb3ItcG9pbnRlciBweS0zIHB4LTQgcm91bmRlZC14bCBob3ZlcjpiZy1ncmFkaWVudC10by1yIGhvdmVyOmZyb20taW5kaWdvLTUwIGhvdmVyOnRvLXB1cnBsZS01MCB0cmFuc2l0aW9uLWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLWxnIGJnLWdyYXktMTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uQ29tcG9uZW50IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsaW5rLmxhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLXB4IGJnLWdyYWRpZW50LXRvLXIgZnJvbS10cmFuc3BhcmVudCB2aWEtZ3JheS0yMDAgdG8tdHJhbnNwYXJlbnQgbXktMiBteC00XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2RvY3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TW9iaWxlTWVudU9wZW4oZmFsc2UpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweS0zIHB4LTQgdGV4dC13aGl0ZSBmb250LXNlbWlib2xkIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWluZGlnby02MDAgdG8tcHVycGxlLTYwMCBob3Zlcjpmcm9tLWluZGlnby03MDAgaG92ZXI6dG8tcHVycGxlLTcwMCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2V0IFN0YXJ0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFycm93UmlnaHRJY29uIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL1JvaGl0c2hhcm1hNjM3Ny9JTkRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgbXQtMSBweS0zIGJnLWdyYXktOTAwIHRleHQtd2hpdGUgcm91bmRlZC14bCBob3ZlcjpiZy1ncmF5LTgwMCB0cmFuc2l0aW9uLWNvbG9ycyBmb250LXNlbWlib2xkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8R2l0aHViSWNvbiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN0YXIgb24gR2l0SHViXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTQwMCB0by1vcmFuZ2UtNDAwIHRleHQtZ3JheS05MDAgcHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1ib2xkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFySWNvbiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxSytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgKTtcclxufSIsICIvKipcbiAqIFBsYXRmb3JtIGRldGVjdGlvbiB1dGlsaXRpZXMgZm9yIElOREpTXG4gKlxuICogVXNhZ2U6XG4gKiBpbXBvcnQgeyBpc1dlYiwgaXNEZXNrdG9wLCBpc01vYmlsZSwgaXNBbmRyb2lkLCBpc0lPUywgcGxhdGZvcm0gfSBmcm9tICdpbmRqcyc7XG4gKlxuICogaWYgKGlzTW9iaWxlKSB7IC4uLiB9XG4gKi9cblxuLy8gQ2hlY2sgaWYgcnVubmluZyBpbiBhIGJyb3dzZXIgZW52aXJvbm1lbnRcbmNvbnN0IGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG5cbi8vIEVsZWN0cm9uIGRldGVjdGlvbiAocmVuZGVyZXIgcHJvY2VzcylcbmV4cG9ydCBjb25zdCBpc0Rlc2t0b3AgPVxuICBpc0Jyb3dzZXIgJiZcbiAgKHdpbmRvdy5wcm9jZXNzPy50eXBlID09PSBcInJlbmRlcmVyXCIgfHxcbiAgICAhIXdpbmRvdy5lbGVjdHJvbiB8fFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJFbGVjdHJvblwiKSk7XG5cbi8vIENhcGFjaXRvciBkZXRlY3Rpb25cbmV4cG9ydCBjb25zdCBpc01vYmlsZSA9XG4gIGlzQnJvd3NlciAmJlxuICAoISF3aW5kb3cuQ2FwYWNpdG9yIHx8XG4gICAgISF3aW5kb3cuYW5kcm9pZEJyaWRnZSB8fFxuICAgICEhd2luZG93LndlYmtpdD8ubWVzc2FnZUhhbmRsZXJzPy5icmlkZ2UgfHxcbiAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiQ2FwYWNpdG9yXCIpKTtcblxuLy8gU3BlY2lmaWMgbW9iaWxlIHBsYXRmb3Jtc1xuZXhwb3J0IGNvbnN0IGlzQW5kcm9pZCA9IGlzTW9iaWxlICYmIC9hbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbmV4cG9ydCBjb25zdCBpc0lPUyA9IGlzTW9iaWxlICYmIC9pcGhvbmV8aXBhZHxpcG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLy8gV2ViIGZhbGxiYWNrIChpZiBub3QgZGVza3RvcCBvciBtb2JpbGUgYXBwKVxuZXhwb3J0IGNvbnN0IGlzV2ViID0gIWlzRGVza3RvcCAmJiAhaXNNb2JpbGU7XG5cbi8vIEdldCBjdXJyZW50IHBsYXRmb3JtIG5hbWVcbmV4cG9ydCBjb25zdCBwbGF0Zm9ybSA9ICgoKSA9PiB7XG4gIGlmIChpc0Rlc2t0b3ApIHJldHVybiBcImRlc2t0b3BcIjtcbiAgaWYgKGlzQW5kcm9pZCkgcmV0dXJuIFwiYW5kcm9pZFwiO1xuICBpZiAoaXNJT1MpIHJldHVybiBcImlvc1wiO1xuICBpZiAoaXNNb2JpbGUpIHJldHVybiBcIm1vYmlsZVwiOyAvLyBmYWxsYmFja1xuICByZXR1cm4gXCJ3ZWJcIjtcbn0pKCk7XG5cbi8vIFJlYWN0IE5hdGl2ZSBjb21wYXRpYmxlIEFQSVxuZXhwb3J0IGNvbnN0IE9TID0gcGxhdGZvcm07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3QgPSAob2JqKSA9PiB7XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoT1MpKSByZXR1cm4gb2JqW09TXTtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcIm5hdGl2ZVwiKSAmJiBpc01vYmlsZSkgcmV0dXJuIG9ialtcIm5hdGl2ZVwiXTtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcImRlZmF1bHRcIikpIHJldHVybiBvYmpbXCJkZWZhdWx0XCJdO1xuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc1dlYixcbiAgaXNEZXNrdG9wLFxuICBpc01vYmlsZSxcbiAgaXNBbmRyb2lkLFxuICBpc0lPUyxcbiAgcGxhdGZvcm0sXG4gIE9TLFxuICBzZWxlY3QsXG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEltYWdlID0gZm9yd2FyZFJlZigoeyBzdHlsZSwgc291cmNlLCBzcmMsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiaW1hZ2VcIik7XG5cbiAgLy8gUmVhY3QgTmF0aXZlIHVzZXMgJ3NvdXJjZScsIFdlYiB1c2VzICdzcmMnLlxuICAvLyBXZSBzdXBwb3J0IGJvdGggcHJvcHMgZm9yIHVuaXZlcnNhbCB1c2FnZS5cbiAgY29uc3QgaW1hZ2VTb3VyY2UgPSBzcmMgfHwgKHNvdXJjZSAmJiBzb3VyY2UudXJpKSB8fCBcIlwiO1xuXG4gIGNvbnN0IHByb3BzID0ge1xuICAgIC4uLnJlc3QsXG4gICAgc3JjOiBpbWFnZVNvdXJjZSxcbiAgICByZWYsXG4gIH07XG5cbiAgaWYgKENvbXBvbmVudCAhPT0gXCJpbWdcIiAmJiBDb21wb25lbnQgIT09IFwiaW1hZ2VcIikge1xuICAgIC8vIElmIGl0IHJlZmVycyB0byBSZWFjdCBOYXRpdmUgSW1hZ2UsIGl0IGV4cGVjdHMgJ3NvdXJjZSdcbiAgICBwcm9wcy5zb3VyY2UgPSBzb3VyY2UgfHwgeyB1cmk6IHNyYyB9O1xuICAgIGRlbGV0ZSBwcm9wcy5zcmM7XG4gIH1cblxuICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG5cbiAgcmV0dXJuIDxDb21wb25lbnQgc3R5bGU9e2ZsYXRTdHlsZX0gey4uLnByb3BzfSAvPjtcbn0pO1xuXG5JbWFnZS5kaXNwbGF5TmFtZSA9IFwiSW1hZ2VcIjtcbmV4cG9ydCBkZWZhdWx0IEltYWdlO1xuIiwgImZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRWxlbWVudCh0eXBlKSB7XG4gIGNvbnN0IHBsYXRmb3JtID0gdHlwZW9mIFBMQVRGT1JNICE9PSBcInVuZGVmaW5lZFwiID8gUExBVEZPUk0gOiBcIndlYlwiO1xuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJ3ZWJcIikge1xuICAgIGNvbnN0IHdlYk1hcCA9IHtcbiAgICAgIHZpZXc6IFwiZGl2XCIsXG4gICAgICB0ZXh0OiBcInNwYW5cIixcbiAgICAgIGltYWdlOiBcImltZ1wiLFxuICAgICAgaW1hZ2ViYWNrZ3JvdW5kOiBcImRpdlwiLCAvLyBtYXAgaW1hZ2UtYmFja2dyb3VuZCB0byBkaXYgd2l0aCBzdHlsZVxuICAgICAgc2Nyb2xsdmlldzogXCJkaXZcIixcbiAgICAgIGZsYXRsaXN0OiBcImRpdlwiLFxuICAgICAgc2VjdGlvbmxpc3Q6IFwiZGl2XCIsXG4gICAgICBrZXlib2FyZGF2b2lkaW5ndmlldzogXCJkaXZcIixcbiAgICAgIHNhZmVhcmVhdmlldzogXCJkaXZcIixcbiAgICAgIHByZXNzYWJsZTogXCJidXR0b25cIixcbiAgICAgIHRvdWNoYWJsZW9wYWNpdHk6IFwiYnV0dG9uXCIsXG4gICAgICB0b3VjaGFibGVoaWdobGlnaHQ6IFwiYnV0dG9uXCIsXG4gICAgICBzd2l0Y2g6IFwiaW5wdXRcIiwgLy8gdHlwZT0nY2hlY2tib3gnXG4gICAgICB0ZXh0YXJlYTogXCJ0ZXh0YXJlYVwiLFxuICAgICAgYnV0dG9uOiBcImJ1dHRvblwiLFxuICAgICAgbW9kYWw6IFwiZGl2XCIsXG4gICAgICBhY3Rpdml0eWluZGljYXRvcjogXCJkaXZcIixcbiAgICAgIHJlZnJlc2hjb250cm9sOiBcImRpdlwiLFxuICAgIH07XG4gICAgcmV0dXJuIHdlYk1hcFt0eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIlwiKV0gfHwgXCJkaXZcIjtcbiAgfVxuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJtb2JpbGVcIikge1xuICAgIC8vIEluIFJlYWN0IE5hdGl2ZSwgY29tcG9uZW50cyBhcmUgQ2FtZWxDYXNlXG4gICAgLy8gV2UgbmVlZCB0byBtYXAgZ2VuZXJpYyBuYW1lcyB0byBSTiBuYW1lc1xuICAgIGNvbnN0IG1vYmlsZU1hcCA9IHtcbiAgICAgIHZpZXc6IFwiVmlld1wiLFxuICAgICAgdGV4dDogXCJUZXh0XCIsXG4gICAgICBpbWFnZTogXCJJbWFnZVwiLFxuICAgICAgaW1hZ2ViYWNrZ3JvdW5kOiBcIkltYWdlQmFja2dyb3VuZFwiLFxuICAgICAgc2Nyb2xsdmlldzogXCJTY3JvbGxWaWV3XCIsXG4gICAgICBmbGF0bGlzdDogXCJGbGF0TGlzdFwiLFxuICAgICAgc2VjdGlvbmxpc3Q6IFwiU2VjdGlvbkxpc3RcIixcbiAgICAgIGtleWJvYXJkYXZvaWRpbmd2aWV3OiBcIktleWJvYXJkQXZvaWRpbmdWaWV3XCIsXG4gICAgICBzYWZlYXJlYXZpZXc6IFwiU2FmZUFyZWFWaWV3XCIsXG4gICAgICBwcmVzc2FibGU6IFwiUHJlc3NhYmxlXCIsXG4gICAgICB0b3VjaGFibGVvcGFjaXR5OiBcIlRvdWNoYWJsZU9wYWNpdHlcIixcbiAgICAgIHRvdWNoYWJsZWhpZ2hsaWdodDogXCJUb3VjaGFibGVIaWdobGlnaHRcIixcbiAgICAgIHN3aXRjaDogXCJTd2l0Y2hcIixcbiAgICAgIG1vZGFsOiBcIk1vZGFsXCIsXG4gICAgICBhY3Rpdml0eWluZGljYXRvcjogXCJBY3Rpdml0eUluZGljYXRvclwiLFxuICAgICAgcmVmcmVzaGNvbnRyb2w6IFwiUmVmcmVzaENvbnRyb2xcIixcbiAgICAgIGJ1dHRvbjogXCJCdXR0b25cIixcbiAgICB9O1xuICAgIGNvbnN0IHJuTmFtZSA9XG4gICAgICBtb2JpbGVNYXBbdHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0vZywgXCJcIildIHx8IGNhcGl0YWxpemUodHlwZSk7XG5cbiAgICAvLyBTYWZldHkgY2hlY2sgZm9yIFJlYWN0IE5hdGl2ZSBlbnZpcm9ubWVudFxuICAgIC8vIHJlYWN0LW5hdGl2ZS13ZWIgbWlnaHQgYmUgYWxpYXNlZCwgb3Igd2UgbWlnaHQgYmUgaW4gYSByZWFsIFJOIGVudmlyb25tZW50XG4gICAgdHJ5IHtcbiAgICAgIC8vIFVzaW5nIGdsb2JhbCBjaGVjayBvciBzYWZlIHJlcXVpcmVcbiAgICAgIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gcmVxdWlyZShcInJlYWN0LW5hdGl2ZVwiKVtybk5hbWVdO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB3aW5kb3cuUmVhY3QgJiZcbiAgICAgICAgd2luZG93LlJlYWN0Lk5hdGl2ZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuUmVhY3QuTmF0aXZlW3JuTmFtZV07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKGBSZWFjdCBOYXRpdmUgY29tcG9uZW50ICR7cm5OYW1lfSBub3QgZm91bmRgKTtcbiAgICB9XG4gICAgLy8gRmFsbGJhY2sgdG8gVmlldyBvciBkaXYgZGVwZW5kaW5nIG9uIGNvbnRleHQsIGJ1dCBWaWV3IGlzIHNhZmUgZW5vdWdoIGZvciBsb2dpY2FsIHJldHVybiBpZiBtb2NrZWRcbiAgICByZXR1cm4gXCJWaWV3XCI7XG4gIH1cblxuICByZXR1cm4gXCJkaXZcIjtcbn1cbiIsICIvLyBNb2NrIFN0eWxlU2hlZXQgZm9yIGNvbXBhdGliaWxpdHkuXG4vLyBJbiBJTkRKUyB3ZWIsIHdlIHVzdWFsbHkgdXNlIHN0YW5kYXJkIHN0eWxlIG9iamVjdHMgb3IgQ1NTLlxuLy8gVGhpcyBhbGxvd3MgU3R5bGVTaGVldC5jcmVhdGUoe30pIHRvIHJldHVybiB0aGUgb2JqZWN0cyBhcy1pcy5cblxuZXhwb3J0IGNvbnN0IFN0eWxlU2hlZXQgPSB7XG4gIGNyZWF0ZTogKHN0eWxlcykgPT4gc3R5bGVzLFxuICBmbGF0dGVuOiAoc3R5bGVzKSA9PiB7XG4gICAgaWYgKCFzdHlsZXMpIHJldHVybiB7fTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZXMpKSB7XG4gICAgICByZXR1cm4gc3R5bGVzXG4gICAgICAgIC5mbGF0KEluZmluaXR5KVxuICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IChpdGVtID8geyAuLi5hY2MsIC4uLml0ZW0gfSA6IGFjYyksIHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfSxcbiAgaGFpcmxpbmVXaWR0aDogMSxcbiAgYWJzb2x1dGVGaWxsOiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIHRvcDogMCxcbiAgICBib3R0b206IDAsXG4gIH0sXG4gIGFic29sdXRlRmlsbE9iamVjdDoge1xuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogMCxcbiAgICB0b3A6IDAsXG4gICAgYm90dG9tOiAwLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3R5bGVTaGVldDtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbi8vIElOREpTIExpbmsgY29tcG9uZW50IC0gbGlnaHR3ZWlnaHQgY2xpZW50LXNpZGUgbmF2aWdhdGlvbiBoZWxwZXJcbi8vIFBlcmZvcm1zIFNQQS1saWtlIG5hdmlnYXRpb24gZm9yIHNhbWUtb3JpZ2luIGludGVybmFsIGxpbmtzLlxuLy8gUHJvcHM6IGhyZWYsIHByZWZldGNoLCByZXBsYWNlLCBzY3JvbGwgKGRlZmF1bHQgdHJ1ZSksIG9uQ2xpY2ssIHRhcmdldCwgcmVsLCBjbGFzc05hbWUsIHN0eWxlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaW5rKHtcbiAgaHJlZixcbiAgY2hpbGRyZW4sXG4gIHByZWZldGNoID0gZmFsc2UsXG4gIHJlcGxhY2UgPSBmYWxzZSxcbiAgc2Nyb2xsID0gdHJ1ZSxcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBzdHlsZSxcbiAgdGFyZ2V0LFxuICByZWwsXG4gIC4uLnJlc3Rcbn0pIHtcbiAgLy8gQmFzaWMgcHJlZmV0Y2g6IGhpbnQgdGhlIGJyb3dzZXIgdmlhIDxsaW5rIHJlbD1cInByZWZldGNoXCI+XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFwcmVmZXRjaCB8fCAhaHJlZikgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gICAgICBsLnJlbCA9IFwicHJlZmV0Y2hcIjtcbiAgICAgIGwuaHJlZiA9IGhyZWY7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGwpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGwpO1xuICAgICAgICB9IGNhdGNoIHt9XG4gICAgICB9O1xuICAgIH0gY2F0Y2gge31cbiAgfSwgW2hyZWYsIHByZWZldGNoXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGlmIChvbkNsaWNrKSBvbkNsaWNrKGUpO1xuICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcbiAgICAvLyBPbmx5IGludGVyY2VwdCBzaW1wbGUgbGVmdC1jbGlja3Mgd2l0aG91dCBtb2RpZmllciBrZXlzXG4gICAgaWYgKGUuYnV0dG9uICE9PSAwIHx8IGUubWV0YUtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSB8fCBlLmFsdEtleSlcbiAgICAgIHJldHVybjtcbiAgICBpZiAoIWhyZWYpIHJldHVybjtcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldCAhPT0gXCJfc2VsZlwiKSByZXR1cm47XG4gICAgbGV0IHVybDtcbiAgICB0cnkge1xuICAgICAgdXJsID0gbmV3IFVSTChocmVmLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEludmFsaWQgVVJMLCBsZXQgYnJvd3NlciBoYW5kbGVcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gU2tpcCBub24taHR0cChzKSBwcm90b2NvbHMgYW5kIHNwZWNpYWwgc2NoZW1lc1xuICAgIGNvbnN0IHByb3RvID0gdXJsLnByb3RvY29sO1xuICAgIGlmIChwcm90byAmJiBwcm90byAhPT0gXCJodHRwOlwiICYmIHByb3RvICE9PSBcImh0dHBzOlwiKSByZXR1cm47XG4gICAgLy8gRXh0ZXJuYWxcbiAgICBpZiAodXJsLm9yaWdpbiAhPT0gd2luZG93LmxvY2F0aW9uLm9yaWdpbikgcmV0dXJuO1xuICAgIC8vIFJlc3BlY3QgZG93bmxvYWQgbGlua3NcbiAgICBpZiAocmVzdC5kb3dubG9hZCkgcmV0dXJuO1xuICAgIC8vIEhhc2gtb25seSBuYXZpZ2F0aW9uIG9wdGltaXphdGlvblxuICAgIGNvbnN0IGN1cnJlbnQgPVxuICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCArIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgIGNvbnN0IG5leHQgPSB1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoICsgdXJsLmhhc2g7XG4gICAgaWYgKG5leHQgPT09IGN1cnJlbnQpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgaWYgKHVybC5oYXNoKSB7XG4gICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1cmwuaGFzaC5zbGljZSgxKSk7XG4gICAgICAgICAgaWYgKGVsKSBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgIGVsc2Ugd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gRG8gcHVzaC9yZXBsYWNlIHN0YXRlXG4gICAgaWYgKHJlcGxhY2UpIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XG4gICAgZWxzZSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICAgIC8vIEVtaXQgYSBjdXN0b20gbmF2aWdhdGlvbiBldmVudCBzbyB0aGUgYXBwIGNhbiBsb2FkIHRoZSB0YXJnZXQgbW9kdWxlXG4gICAgdHJ5IHtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJpbmQ6bmF2aWdhdGVcIiwgeyBkZXRhaWw6IHsgaHJlZjogbmV4dCB9IH0pLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIHt9XG4gICAgLy8gU2Nyb2xsIGJlaGF2aW9yXG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgaWYgKHVybC5oYXNoKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodXJsLmhhc2guc2xpY2UoMSkpO1xuICAgICAgICBpZiAoZWwpIGVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIGVsc2Ugd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWxGaW5hbCA9XG4gICAgdGFyZ2V0ID09PSBcIl9ibGFua1wiXG4gICAgICA/IFtyZWwsIFwibm9vcGVuZXJcIiwgXCJub3JlZmVycmVyXCJdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKVxuICAgICAgOiByZWw7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFwiYVwiLFxuICAgIHtcbiAgICAgIGhyZWYsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzdHlsZSxcbiAgICAgIHRhcmdldCxcbiAgICAgIHJlbDogcmVsRmluYWwsXG4gICAgICBvbkNsaWNrOiBoYW5kbGVDbGljayxcbiAgICAgIC4uLnJlc3QsXG4gICAgfSxcbiAgICBjaGlsZHJlbixcbiAgKTtcbn1cbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBWaWV3ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ2aWV3XCIpO1xuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuVmlldy5kaXNwbGF5TmFtZSA9IFwiVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUZXh0ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0ZXh0XCIpO1xuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuVGV4dC5kaXNwbGF5TmFtZSA9IFwiVGV4dFwiO1xuZXhwb3J0IGRlZmF1bHQgVGV4dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTY3JvbGxWaWV3ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBob3Jpem9udGFsID0gZmFsc2UsXG4gICAgICBzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3IgPSB0cnVlLFxuICAgICAgc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvciA9IHRydWUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic2Nyb2xsdmlld1wiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrXG4gICAgICBjb25zdCBjb250YWluZXJTdHlsZSA9IHtcbiAgICAgICAgb3ZlcmZsb3dYOiBob3Jpem9udGFsID8gXCJhdXRvXCIgOiBcImhpZGRlblwiLFxuICAgICAgICBvdmVyZmxvd1k6IGhvcml6b250YWwgPyBcImhpZGRlblwiIDogXCJhdXRvXCIsXG4gICAgICAgIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiBcInRvdWNoXCIsXG4gICAgICAgIHNjcm9sbGJhcldpZHRoOiAoXG4gICAgICAgICAgaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAhc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgICAgICA6ICFzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgIClcbiAgICAgICAgICA/IFwibm9uZVwiXG4gICAgICAgICAgOiBcImF1dG9cIixcbiAgICAgICAgbXNPdmVyZmxvd1N0eWxlOiAoXG4gICAgICAgICAgaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAhc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgICAgICA6ICFzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgIClcbiAgICAgICAgICA/IFwibm9uZVwiXG4gICAgICAgICAgOiBcImF1dG9cIixcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG4gICAgICBjb25zdCBjb250ZW50U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW2NvbnRlbnRDb250YWluZXJTdHlsZV0pO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e2NvbnRhaW5lclN0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnJlc3R9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e2NvbnRlbnRTdHlsZX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgIHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvcj17c2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yfVxuICAgICAgICBzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yPXtzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5TY3JvbGxWaWV3LmRpc3BsYXlOYW1lID0gXCJTY3JvbGxWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBTY3JvbGxWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IFRleHRJbnB1dCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICB2YWx1ZSxcbiAgICAgIGRlZmF1bHRWYWx1ZSxcbiAgICAgIG9uQ2hhbmdlVGV4dCxcbiAgICAgIG9uRm9jdXMsXG4gICAgICBvbkJsdXIsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNlY3VyZVRleHRFbnRyeSA9IGZhbHNlLFxuICAgICAgbXVsdGlsaW5lID0gZmFsc2UsXG4gICAgICBudW1iZXJPZkxpbmVzID0gNCxcbiAgICAgIGVkaXRhYmxlID0gdHJ1ZSxcbiAgICAgIHN0eWxlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgaWYgKG9uQ2hhbmdlVGV4dCkgb25DaGFuZ2VUZXh0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29tbW9uU3R5bGUgPSB7XG4gICAgICBhcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICAgIG91dGxpbmU6IFwibm9uZVwiLFxuICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgfTtcblxuICAgIGlmIChtdWx0aWxpbmUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XG4gICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIHJlYWRPbmx5PXshZWRpdGFibGV9XG4gICAgICAgICAgcm93cz17bnVtYmVyT2ZMaW5lc31cbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdHlsZSwgcmVzaXplOiBcIm5vbmVcIiB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0eXBlPXtzZWN1cmVUZXh0RW50cnkgPyBcInBhc3N3b3JkXCIgOiBcInRleHRcIn1cbiAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgcmVhZE9ubHk9eyFlZGl0YWJsZX1cbiAgICAgICAgc3R5bGU9e2NvbW1vblN0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5UZXh0SW5wdXQuZGlzcGxheU5hbWUgPSBcIlRleHRJbnB1dFwiO1xuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEJ1dHRvbiA9IGZvcndhcmRSZWYoXG4gICh7IHRpdGxlLCBvblByZXNzLCBjb2xvciwgZGlzYWJsZWQsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge3RpdGxlfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJCdXR0b25cIjtcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBBY3Rpdml0eUluZGljYXRvciA9IGZvcndhcmRSZWYoXG4gICh7IHNpemUgPSBcInNtYWxsXCIsIGNvbG9yID0gXCIjOTk5XCIsIHN0eWxlLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiYWN0aXZpdHlpbmRpY2F0b3JcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGNvbnN0IHNwaW5uZXJTdHlsZSA9IHtcbiAgICAgICAgYW5pbWF0aW9uOiBcImluZGpzLXNwaW4gMXMgbGluZWFyIGluZmluaXRlXCIsXG4gICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBJbmplY3Qga2V5ZnJhbWVzIGlmIG5vdCBwcmVzZW50XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRqcy1zcGluLXN0eWxlXCIpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgc3R5bGVFbC5pZCA9IFwiaW5kanMtc3Bpbi1zdHlsZVwiO1xuICAgICAgICBzdHlsZUVsLmlubmVySFRNTCA9IGBAa2V5ZnJhbWVzIGluZGpzLXNwaW4geyAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9IDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1gO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gPGRpdiByZWY9e3JlZn0gc3R5bGU9e3NwaW5uZXJTdHlsZX0gey4uLnJlc3R9IC8+O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzaXplPXtzaXplfSBjb2xvcj17Y29sb3J9IHN0eWxlPXtzdHlsZX0gey4uLnJlc3R9IC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkFjdGl2aXR5SW5kaWNhdG9yLmRpc3BsYXlOYW1lID0gXCJBY3Rpdml0eUluZGljYXRvclwiO1xuZXhwb3J0IGRlZmF1bHQgQWN0aXZpdHlJbmRpY2F0b3I7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU3dpdGNoID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHsgdmFsdWUsIG9uVmFsdWVDaGFuZ2UsIGRpc2FibGVkLCB0cmFja0NvbG9yLCB0aHVtYkNvbG9yLCBzdHlsZSwgLi4ucmVzdCB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzd2l0Y2hcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImlucHV0XCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25WYWx1ZUNoYW5nZSAmJiBvblZhbHVlQ2hhbmdlKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICBvblZhbHVlQ2hhbmdlPXtvblZhbHVlQ2hhbmdlfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHRyYWNrQ29sb3I9e3RyYWNrQ29sb3J9XG4gICAgICAgIHRodW1iQ29sb3I9e3RodW1iQ29sb3J9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5Td2l0Y2guZGlzcGxheU5hbWUgPSBcIlN3aXRjaFwiO1xuZXhwb3J0IGRlZmF1bHQgU3dpdGNoO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFNjcm9sbFZpZXcgZnJvbSBcIi4vc2Nyb2xsLXZpZXcuanN4XCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgRmxhdExpc3QgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgZGF0YSxcbiAgICAgIHJlbmRlckl0ZW0sXG4gICAgICBrZXlFeHRyYWN0b3IsXG4gICAgICBMaXN0SGVhZGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgICAgIExpc3RFbXB0eUNvbXBvbmVudCxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIG51bUNvbHVtbnMgPSAxLFxuICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImZsYXRsaXN0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2sgaW1wbGVtZW50YXRpb25cbiAgICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAoTGlzdEVtcHR5Q29tcG9uZW50KSB7XG4gICAgICAgICAgY29uc3QgRW1wdHkgPSBSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0RW1wdHlDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgTGlzdEVtcHR5Q29tcG9uZW50XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxMaXN0RW1wdHlDb21wb25lbnQgLz5cbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge0VtcHR5fVxuICAgICAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGl0ZW1zID0gZGF0YSB8fCBbXTtcbiAgICAgIGNvbnN0IHJlbmRlckxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5RXh0cmFjdG9yXG4gICAgICAgICAgICA/IGtleUV4dHJhY3RvcihpdGVtLCBpbmRleClcbiAgICAgICAgICAgIDogaW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17a2V5fT5cbiAgICAgICAgICAgICAge3JlbmRlckl0ZW0oeyBpdGVtLCBpbmRleCB9KX1cbiAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBmbGF0Q29udGVudFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtjb250ZW50Q29udGFpbmVyU3R5bGVdKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2ZsYXRDb250ZW50U3R5bGV9XG4gICAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICB7cmVuZGVyTGlzdCgpfVxuICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEZvb3RlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0Rm9vdGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgcmVuZGVySXRlbT17cmVuZGVySXRlbX1cbiAgICAgICAga2V5RXh0cmFjdG9yPXtrZXlFeHRyYWN0b3J9XG4gICAgICAgIExpc3RIZWFkZXJDb21wb25lbnQ9e0xpc3RIZWFkZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RGb290ZXJDb21wb25lbnQ9e0xpc3RGb290ZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RFbXB0eUNvbXBvbmVudD17TGlzdEVtcHR5Q29tcG9uZW50fVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgbnVtQ29sdW1ucz17bnVtQ29sdW1uc31cbiAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5GbGF0TGlzdC5kaXNwbGF5TmFtZSA9IFwiRmxhdExpc3RcIjtcbmV4cG9ydCBkZWZhdWx0IEZsYXRMaXN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZU9wYWNpdHkgPSBmb3J3YXJkUmVmKFxuICAoeyBjaGlsZHJlbiwgc3R5bGUsIG9uUHJlc3MsIGFjdGl2ZU9wYWNpdHkgPSAwLjIsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVvcGFjaXR5XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKX1cbiAgICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gYWN0aXZlT3BhY2l0eSl9XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZU9wYWNpdHkuZGlzcGxheU5hbWUgPSBcIlRvdWNoYWJsZU9wYWNpdHlcIjtcbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZU9wYWNpdHk7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUHJlc3NhYmxlID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIG9uUHJlc3MsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwicHJlc3NhYmxlXCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgIHsgY3Vyc29yOiBcInBvaW50ZXJcIiB9LFxuICAgICAgdHlwZW9mIHN0eWxlID09PSBcImZ1bmN0aW9uXCIgPyBzdHlsZSh7IHByZXNzZWQ6IGZhbHNlIH0pIDogc3R5bGUsXG4gICAgXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvbiByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gb25DbGljaz17b25QcmVzc30gey4uLnJlc3R9PlxuICAgICAgICB7dHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGNoaWxkcmVuKHsgcHJlc3NlZDogZmFsc2UgfSlcbiAgICAgICAgICA6IGNoaWxkcmVufVxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSBvblByZXNzPXtvblByZXNzfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuUHJlc3NhYmxlLmRpc3BsYXlOYW1lID0gXCJQcmVzc2FibGVcIjtcbmV4cG9ydCBkZWZhdWx0IFByZXNzYWJsZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBJbWFnZUJhY2tncm91bmQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAgeyBjaGlsZHJlbiwgc3R5bGUsIGltYWdlU3R5bGUsIHNvdXJjZSwgc3JjLCByZXNpemVNb2RlID0gXCJjb3ZlclwiLCAuLi5yZXN0IH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImltYWdlYmFja2dyb3VuZFwiKTtcblxuICAgIGNvbnN0IGltYWdlU291cmNlID0gc3JjIHx8IChzb3VyY2UgJiYgc291cmNlLnVyaSkgfHwgXCJcIjtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgICAge1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aW1hZ2VTb3VyY2V9KWAsXG4gICAgICAgICAgYmFja2dyb3VuZFNpemU6IHJlc2l6ZU1vZGUgPT09IFwic3RyZXRjaFwiID8gXCIxMDAlIDEwMCVcIiA6IHJlc2l6ZU1vZGUsXG4gICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlLFxuICAgICAgXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgaW1hZ2VTdHlsZT17aW1hZ2VTdHlsZX1cbiAgICAgICAgc291cmNlPXtzb3VyY2UgfHwgeyB1cmk6IHNyYyB9fVxuICAgICAgICByZXNpemVNb2RlPXtyZXNpemVNb2RlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbkltYWdlQmFja2dyb3VuZC5kaXNwbGF5TmFtZSA9IFwiSW1hZ2VCYWNrZ3JvdW5kXCI7XG5leHBvcnQgZGVmYXVsdCBJbWFnZUJhY2tncm91bmQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmNvbnN0IE1vZGFsID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgdmlzaWJsZSxcbiAgICAgIHRyYW5zcGFyZW50LFxuICAgICAgYW5pbWF0aW9uVHlwZSxcbiAgICAgIG9uUmVxdWVzdENsb3NlLFxuICAgICAgc3R5bGUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwibW9kYWxcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IG1vZGFsU3R5bGUgPSB7XG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBSZW5kZXIgYXMgcG9ydGFsIGlmIHBvc3NpYmxlXG4gICAgICBjb25zdCBjb250ZW50ID0gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17bW9kYWxTdHlsZX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwoY29udGVudCwgZG9jdW1lbnQuYm9keSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmlzaWJsZT17dmlzaWJsZX1cbiAgICAgICAgdHJhbnNwYXJlbnQ9e3RyYW5zcGFyZW50fVxuICAgICAgICBhbmltYXRpb25UeXBlPXthbmltYXRpb25UeXBlfVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17b25SZXF1ZXN0Q2xvc2V9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuTW9kYWwuZGlzcGxheU5hbWUgPSBcIk1vZGFsXCI7XG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTYWZlQXJlYVZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzYWZlYXJlYXZpZXdcIik7XG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtzdHlsZX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblNhZmVBcmVhVmlldy5kaXNwbGF5TmFtZSA9IFwiU2FmZUFyZWFWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBTYWZlQXJlYVZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcblxuLy8gV2ViIG1vY2sgb2YgU3RhdHVzQmFyLiBJbiBuYXRpdmUgaXQgd291bGQgY2hhbmdlIHRoZSBiYXIgc3R5bGUuXG4vLyBJbiB3ZWIsIG1heWJlIGl0IGNoYW5nZXMgdGhlIG1ldGEgdGhlbWUtY29sb3IgdGFnLlxuXG5mdW5jdGlvbiBTdGF0dXNCYXIoeyBiYXJTdHlsZSA9IFwiZGVmYXVsdFwiLCBiYWNrZ3JvdW5kQ29sb3IsIGhpZGRlbiA9IGZhbHNlIH0pIHtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICAvLyBBdHRlbXB0IHRvIHNldCB0aGVtZS1jb2xvciBtZXRhIHRhZyBpZiBiYWNrZ3JvdW5kQ29sb3IgcHJvdmlkZWRcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBsZXQgbWV0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInRoZW1lLWNvbG9yXCJdJyk7XG4gICAgICBpZiAoIW1ldGEpIHtcbiAgICAgICAgbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIpO1xuICAgICAgICBtZXRhLm5hbWUgPSBcInRoZW1lLWNvbG9yXCI7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobWV0YSk7XG4gICAgICB9XG4gICAgICBtZXRhLmNvbnRlbnQgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgfVxuICB9LCBbYmFja2dyb3VuZENvbG9yXSk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXR1c0JhcjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTY3JvbGxWaWV3IGZyb20gXCIuL3Njcm9sbC12aWV3LmpzeFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU2VjdGlvbkxpc3QgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgc2VjdGlvbnMsXG4gICAgICByZW5kZXJJdGVtLFxuICAgICAgcmVuZGVyU2VjdGlvbkhlYWRlcixcbiAgICAgIGtleUV4dHJhY3RvcixcbiAgICAgIExpc3RIZWFkZXJDb21wb25lbnQsXG4gICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgc3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkID0gdHJ1ZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzZWN0aW9ubGlzdFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrXG4gICAgICBjb25zdCByZW5kZXJTZWN0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIChzZWN0aW9ucyB8fCBbXSkubWFwKChzZWN0aW9uLCBzZWN0aW9uSW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gc2VjdGlvbi5kYXRhIHx8IFtdO1xuICAgICAgICAgIGNvbnN0IGtleSA9IHNlY3Rpb24ua2V5IHx8IHNlY3Rpb25JbmRleC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtrZXl9PlxuICAgICAgICAgICAgICB7cmVuZGVyU2VjdGlvbkhlYWRlciAmJiByZW5kZXJTZWN0aW9uSGVhZGVyKHsgc2VjdGlvbiB9KX1cbiAgICAgICAgICAgICAge2RhdGEubWFwKChpdGVtLCBpdGVtSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtS2V5ID0ga2V5RXh0cmFjdG9yXG4gICAgICAgICAgICAgICAgICA/IGtleUV4dHJhY3RvcihpdGVtLCBpdGVtSW5kZXgpXG4gICAgICAgICAgICAgICAgICA6IGl0ZW0ua2V5IHx8IGl0ZW0uaWQgfHwga2V5ICsgXCItXCIgKyBpdGVtSW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2l0ZW1LZXl9PlxuICAgICAgICAgICAgICAgICAgICB7cmVuZGVySXRlbSh7IGl0ZW0sIGluZGV4OiBpdGVtSW5kZXgsIHNlY3Rpb24gfSl9XG4gICAgICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAge3JlbmRlclNlY3Rpb25zKCl9XG4gICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzZWN0aW9ucz17c2VjdGlvbnN9XG4gICAgICAgIHJlbmRlckl0ZW09e3JlbmRlckl0ZW19XG4gICAgICAgIHJlbmRlclNlY3Rpb25IZWFkZXI9e3JlbmRlclNlY3Rpb25IZWFkZXJ9XG4gICAgICAgIGtleUV4dHJhY3Rvcj17a2V5RXh0cmFjdG9yfVxuICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50PXtMaXN0SGVhZGVyQ29tcG9uZW50fVxuICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50PXtMaXN0Rm9vdGVyQ29tcG9uZW50fVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgc3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkPXtzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuU2VjdGlvbkxpc3QuZGlzcGxheU5hbWUgPSBcIlNlY3Rpb25MaXN0XCI7XG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uTGlzdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBLZXlib2FyZEF2b2lkaW5nVmlldyA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgYmVoYXZpb3IsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0LFxuICAgICAgZW5hYmxlZCxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJrZXlib2FyZGF2b2lkaW5ndmlld1wiKTtcblxuICAgIC8vIE9uIHdlYiwga2V5Ym9hcmQgYXZvaWRpbmcgaXMgdXN1YWxseSBoYW5kbGVkIGJ5IHRoZSBicm93c2VyIGRlZmF1bHQgYmVoYXZpb3Igb3IgaXMgaXJyZWxldmFudFxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSl9IHsuLi5yZXN0fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBiZWhhdmlvcj17YmVoYXZpb3J9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0PXtrZXlib2FyZFZlcnRpY2FsT2Zmc2V0fVxuICAgICAgICBlbmFibGVkPXtlbmFibGVkfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbktleWJvYXJkQXZvaWRpbmdWaWV3LmRpc3BsYXlOYW1lID0gXCJLZXlib2FyZEF2b2lkaW5nVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgS2V5Ym9hcmRBdm9pZGluZ1ZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUmVmcmVzaENvbnRyb2wgPSBmb3J3YXJkUmVmKCh7IHJlZnJlc2hpbmcsIG9uUmVmcmVzaCwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJyZWZyZXNoY29udHJvbFwiKTtcblxuICAvLyBPbiB3ZWIsIHBhc3MtdGhyb3VnaCBvciBpbXBsZW1lbnQgYmFzaWMgdmlzdWFsP1xuICAvLyBVc3VhbGx5IFJlZnJlc2hDb250cm9sIGlzIHBhc3NlZCBhcyBwcm9wIHRvIFNjcm9sbFZpZXcuXG4gIC8vIElmIHVzZWQgYXMgY29tcG9uZW50LCBpdCBtaWdodCB3cmFwIGNvbnRlbnQuXG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgIC8vIE5vLW9wIGZvciB3ZWIgdmlzdWFsIHVzdWFsbHksIHVubGVzcyB3ZSBpbXBsZW1lbnQgcHVsbC10by1yZWZyZXNoXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnRcbiAgICAgIHJlZj17cmVmfVxuICAgICAgcmVmcmVzaGluZz17cmVmcmVzaGluZ31cbiAgICAgIG9uUmVmcmVzaD17b25SZWZyZXNofVxuICAgICAgey4uLnJlc3R9XG4gICAgLz5cbiAgKTtcbn0pO1xuXG5SZWZyZXNoQ29udHJvbC5kaXNwbGF5TmFtZSA9IFwiUmVmcmVzaENvbnRyb2xcIjtcbmV4cG9ydCBkZWZhdWx0IFJlZnJlc2hDb250cm9sO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZUhpZ2hsaWdodCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgb25QcmVzcyxcbiAgICAgIHVuZGVybGF5Q29sb3IgPSBcImJsYWNrXCIsXG4gICAgICBhY3RpdmVPcGFjaXR5ID0gMC44NSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVoaWdobGlnaHRcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKTtcblxuICAgICAgLy8gU2ltcGxlIHdlYiBpbXBsZW1lbnRhdGlvbjoganVzdCBvcGFjaXR5LCBtaW1pY2tpbmcgb3ZlcmxheSBpcyBoYXJkZXIgd2l0aG91dCBzdGF0ZVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtmbGF0U3R5bGV9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IHtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB1bmRlcmxheUNvbG9yO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBhY3RpdmVPcGFjaXR5O1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICB1bmRlcmxheUNvbG9yPXt1bmRlcmxheUNvbG9yfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZUhpZ2hsaWdodC5kaXNwbGF5TmFtZSA9IFwiVG91Y2hhYmxlSGlnaGxpZ2h0XCI7XG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVIaWdobGlnaHQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcblxuLy8gVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrIGp1c3QgYWNjZXB0cyBvblByZXNzIGFuZCBwYXNzZXMgaXQgdG8gdGhlIGNoaWxkXG4vLyBJdCBkb2VzIG5vdCBhZGQgYW55IHZpc3VhbCBmZWVkYmFjay5cbmNvbnN0IFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjayA9ICh7XG4gIGNoaWxkcmVuLFxuICBvblByZXNzLFxuICBvblByZXNzSW4sXG4gIG9uUHJlc3NPdXQsXG4gIGRpc2FibGVkLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IGNoaWxkID0gQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG5cbiAgcmV0dXJuIGNsb25lRWxlbWVudChjaGlsZCwge1xuICAgIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3MpIG9uUHJlc3MoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25DbGljaykgY2hpbGQucHJvcHMub25DbGljayhlKTtcbiAgICB9LFxuICAgIG9uTW91c2VEb3duOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzSW4pIG9uUHJlc3NJbihlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbk1vdXNlRG93bikgY2hpbGQucHJvcHMub25Nb3VzZURvd24oZSk7XG4gICAgfSxcbiAgICBvbk1vdXNlVXA6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NPdXQpIG9uUHJlc3NPdXQoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Nb3VzZVVwKSBjaGlsZC5wcm9wcy5vbk1vdXNlVXAoZSk7XG4gICAgfSxcbiAgICBvblRvdWNoU3RhcnQ6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NJbikgb25QcmVzc0luKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uVG91Y2hTdGFydCkgY2hpbGQucHJvcHMub25Ub3VjaFN0YXJ0KGUpO1xuICAgIH0sXG4gICAgb25Ub3VjaEVuZDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc091dCkgb25QcmVzc091dChlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vblRvdWNoRW5kKSBjaGlsZC5wcm9wcy5vblRvdWNoRW5kKGUpO1xuICAgIH0sXG4gICAgc3R5bGU6IHtcbiAgICAgIGN1cnNvcjogZGlzYWJsZWQgPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcbiAgICAgIC4uLmNoaWxkLnByb3BzLnN0eWxlLFxuICAgIH0sXG4gICAgLi4ucmVzdCxcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2s7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU2NyZWVuIENvbXBvbmVudFxyXG4gKiBGdWxsLWhlaWdodCBzY3JlZW4gY29udGFpbmVyIHdpdGggYmFja2dyb3VuZFxyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU2NyZWVuID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgYmFja2dyb3VuZCA9ICdsaWdodCcsIGNsYXNzTmFtZSA9ICcnLCBzdHlsZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuU2NyZWVuLmRpc3BsYXlOYW1lID0gXCJTY3JlZW5cIjtcclxuZXhwb3J0IGRlZmF1bHQgU2NyZWVuO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgQ29udGFpbmVyIENvbXBvbmVudFxyXG4gKiBSZXNwb25zaXZlIGNvbnRhaW5lciB3aXRoIG1heC13aWR0aCBhbmQgY2VudGVyaW5nXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBDb250YWluZXIgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5Db250YWluZXIuZGlzcGxheU5hbWUgPSBcIkNvbnRhaW5lclwiO1xyXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBDYXJkIENvbXBvbmVudFxyXG4gKiBTdHlsZWQgY2FyZCBjb250YWluZXIgd2l0aCBzaGFkb3cgYW5kIHJvdW5kZWQgY29ybmVyc1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgQ2FyZCA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkNhcmQuZGlzcGxheU5hbWUgPSBcIkNhcmRcIjtcclxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEdyaWQgQ29tcG9uZW50XHJcbiAqIFJlc3BvbnNpdmUgZ3JpZCBsYXlvdXQgc3lzdGVtXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBHcmlkID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuR3JpZC5kaXNwbGF5TmFtZSA9IFwiR3JpZFwiO1xyXG5leHBvcnQgZGVmYXVsdCBHcmlkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU3RhY2sgQ29tcG9uZW50XHJcbiAqIFZlcnRpY2FsIG9yIGhvcml6b250YWwgbGF5b3V0IHdpdGggc3BhY2luZ1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU3RhY2sgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGRpcmVjdGlvbiA9ICd2ZXJ0aWNhbCcsXHJcbiAgICBzcGFjaW5nID0gNCxcclxuICAgIGFsaWduID0gJ3N0YXJ0JyxcclxuICAgIGp1c3RpZnkgPSAnc3RhcnQnLFxyXG4gICAgY2xhc3NOYW1lID0gJycsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG59KTtcclxuXHJcblN0YWNrLmRpc3BsYXlOYW1lID0gXCJTdGFja1wiO1xyXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEljb24gQ29tcG9uZW50XHJcbiAqIERpc3BsYXlzIGVtb2ppIGljb25zIGNvbnNpc3RlbnRseSBhY3Jvc3MgcGxhdGZvcm1zXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBJY29uID0gZm9yd2FyZFJlZigoe1xyXG4gICAgbmFtZSxcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dCByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtuYW1lfVxyXG4gICAgICAgIDwvVGV4dCA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkljb24uZGlzcGxheU5hbWUgPSBcIkljb25cIjtcclxuZXhwb3J0IGRlZmF1bHQgSWNvbjtcclxuIiwgIi8vIERpbWVuc2lvbnMgQVBJIGZvciBXZWJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcblxuY29uc3QgbGlzdGVuZXJzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgbGlzdGVuZXJzLmVtaXQoXCJjaGFuZ2VcIiwgeyB3aW5kb3c6IGdldFdpbmRvdygpLCBzY3JlZW46IGdldFNjcmVlbigpIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93KCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgIHNjYWxlOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLFxuICAgIGZvbnRTY2FsZTogMSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NyZWVuKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5zY3JlZW4ud2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuc2NyZWVuLmhlaWdodCxcbiAgICBzY2FsZTogd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSxcbiAgICBmb250U2NhbGU6IDEsXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBEaW1lbnNpb25zID0ge1xuICBnZXQ6IChkaW0pID0+IHtcbiAgICBpZiAoZGltID09PSBcIndpbmRvd1wiKSByZXR1cm4gZ2V0V2luZG93KCk7XG4gICAgaWYgKGRpbSA9PT0gXCJzY3JlZW5cIikgcmV0dXJuIGdldFNjcmVlbigpO1xuICAgIHJldHVybiBnZXRXaW5kb3coKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJjaGFuZ2VcIikge1xuICAgICAgbGlzdGVuZXJzLm9uKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVtb3ZlOiAoKSA9PiBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcImNoYW5nZVwiKSB7XG4gICAgICBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpbWVuc2lvbnM7XG4iLCAiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5jb25zdCBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmV4cG9ydCBjb25zdCBMaW5raW5nID0ge1xuICBvcGVuVVJMOiAodXJsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5vcGVuKHVybCwgXCJfYmxhbmtcIiwgXCJub29wZW5lcixub3JlZmVycmVyXCIpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH0sXG4gIGNhbk9wZW5VUkw6ICh1cmwpID0+IFByb21pc2UucmVzb2x2ZSh0cnVlKSxcbiAgZ2V0SW5pdGlhbFVSTDogKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJ1cmxcIikge1xuICAgICAgLy8gSW4gYSByZWFsIHdlYiBhcHAsIHdlIG1pZ2h0IGxpc3RlbiB0byBwb3BzdGF0ZSBvciBoYXNoY2hhbmdlXG4gICAgICAvLyBlbnN1cmluZyB3ZSByZXR1cm4gYSBzdWJzY3JpcHRpb24tbGlrZSBvYmplY3RcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gKGUpID0+IGhhbmRsZXIoeyB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBsaXN0ZW5lcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6ICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgbGlzdGVuZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIC8vIERlcHJlY2F0ZWQgaW4gUk4gYnV0IGdvb2QgdG8gaGF2ZSBzaWduYXR1cmVcbiAgfSxcbiAgc2VuZEludGVudDogKGFjdGlvbiwgZXh0cmFzKSA9PiBQcm9taXNlLnJlc29sdmUoKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtpbmc7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTGluayB9IGZyb20gJ2luZGpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZvb3RlcigpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgXHJcbiAgICBjb25zdCBmb290ZXJMaW5rcyA9IHtcclxuICAgICAgICBwcm9kdWN0OiBbXHJcbiAgICAgICAgICAgIHsgaHJlZjogJy9mZWF0dXJlcycsIGxhYmVsOiAnRmVhdHVyZXMnIH0sXHJcbiAgICAgICAgICAgIHsgaHJlZjogJy9kb2NzJywgbGFiZWw6ICdEb2N1bWVudGF0aW9uJyB9LFxyXG4gICAgICAgICAgICB7IGhyZWY6ICcvZXhhbXBsZXMnLCBsYWJlbDogJ0V4YW1wbGVzJyB9LFxyXG4gICAgICAgICAgICB7IGhyZWY6ICcvZG9jcycsIGxhYmVsOiAnQ2hhbmdlbG9nJyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgY29tcGFueTogW1xyXG4gICAgICAgICAgICB7IGhyZWY6ICcvYWJvdXQnLCBsYWJlbDogJ0Fib3V0JyB9LFxyXG4gICAgICAgICAgICB7IGhyZWY6ICdodHRwczovL2dpdGh1Yi5jb20vUm9oaXRzaGFybWE2Mzc3L0lORCcsIGxhYmVsOiAnR2l0SHViJywgZXh0ZXJuYWw6IHRydWUgfSxcclxuICAgICAgICAgICAgeyBocmVmOiAnbWFpbHRvOnJvaGl0c2hhcm1hZGV2MUBvdXRsb29rLmNvbScsIGxhYmVsOiAnQ29udGFjdCcsIGV4dGVybmFsOiB0cnVlIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBjb21tdW5pdHk6IFtcclxuICAgICAgICAgICAgeyBocmVmOiAnaHR0cHM6Ly9naXRodWIuY29tL1JvaGl0c2hhcm1hNjM3Ny9JTkQvZGlzY3Vzc2lvbnMnLCBsYWJlbDogJ0Rpc2N1c3Npb25zJywgZXh0ZXJuYWw6IHRydWUgfSxcclxuICAgICAgICAgICAgeyBocmVmOiAnaHR0cHM6Ly9naXRodWIuY29tL1JvaGl0c2hhcm1hNjM3Ny9JTkQvaXNzdWVzJywgbGFiZWw6ICdJc3N1ZXMnLCBleHRlcm5hbDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB7IGhyZWY6ICdodHRwczovL2Rpc2NvcmQuZ2cvaW5kanMnLCBsYWJlbDogJ0Rpc2NvcmQnLCBleHRlcm5hbDogdHJ1ZSB9LFxyXG4gICAgICAgIF0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNvY2lhbExpbmtzID0gW1xyXG4gICAgICAgIHsgXHJcbiAgICAgICAgICAgIGhyZWY6ICdodHRwczovL2dpdGh1Yi5jb20vUm9oaXRzaGFybWE2Mzc3L0lORCcsIFxyXG4gICAgICAgICAgICBsYWJlbDogJ0dpdEh1YicsXHJcbiAgICAgICAgICAgIGljb246IChcclxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbFJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMiAyQzYuNDc3IDIgMiA2LjQ4NCAyIDEyLjAxN2MwIDQuNDI1IDIuODY1IDguMTggNi44MzkgOS41MDQuNS4wOTIuNjgyLS4yMTcuNjgyLS40ODMgMC0uMjM3LS4wMDgtLjg2OC0uMDEzLTEuNzAzLTIuNzgyLjYwNS0zLjM2OS0xLjM0My0zLjM2OS0xLjM0My0uNDU0LTEuMTU4LTEuMTEtMS40NjYtMS4xMS0xLjQ2Ni0uOTA4LS42Mi4wNjktLjYwOC4wNjktLjYwOCAxLjAwMy4wNyAxLjUzMSAxLjAzMiAxLjUzMSAxLjAzMi44OTIgMS41MyAyLjM0MSAxLjA4OCAyLjkxLjgzMi4wOTItLjY0Ny4zNS0xLjA4OC42MzYtMS4zMzgtMi4yMi0uMjUzLTQuNTU1LTEuMTEzLTQuNTU1LTQuOTUxIDAtMS4wOTMuMzktMS45ODggMS4wMjktMi42ODgtLjEwMy0uMjUzLS40NDYtMS4yNzIuMDk4LTIuNjUgMCAwIC44NC0uMjcgMi43NSAxLjAyNkE5LjU2NCA5LjU2NCAwIDAxMTIgNi44NDRjLjg1LjAwNCAxLjcwNS4xMTUgMi41MDQuMzM3IDEuOTA5LTEuMjk2IDIuNzQ3LTEuMDI3IDIuNzQ3LTEuMDI3LjU0NiAxLjM3OS4yMDIgMi4zOTguMSAyLjY1MS42NC43IDEuMDI4IDEuNTk1IDEuMDI4IDIuNjg4IDAgMy44NDgtMi4zMzkgNC42OTUtNC41NjYgNC45NDMuMzU5LjMwOS42NzguOTIuNjc4IDEuODU1IDAgMS4zMzgtLjAxMiAyLjQxOS0uMDEyIDIuNzQ3IDAgLjI2OC4xOC41OC42ODguNDgyQTEwLjAxOSAxMC4wMTkgMCAwMDIyIDEyLjAxN0MyMiA2LjQ4NCAxNy41MjIgMiAxMiAyelwiIGNsaXBSdWxlPVwiZXZlbm9kZFwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICAgaHJlZjogJ2h0dHBzOi8vdHdpdHRlci5jb20vTmV0Y3VyaW9uJywgXHJcbiAgICAgICAgICAgIGxhYmVsOiAnVHdpdHRlcicsXHJcbiAgICAgICAgICAgIGljb246IChcclxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xOC4yNDQgMi4yNWgzLjMwOGwtNy4yMjcgOC4yNiA4LjUwMiAxMS4yNEgxNi4xN2wtNS4yMTQtNi44MTdMNC45OSAyMS43NUgxLjY4bDcuNzMtOC44MzVMMS4yNTQgMi4yNUg4LjA4bDQuNzEzIDYuMjMxem0tMS4xNjEgMTcuNTJoMS44MzNMNy4wODQgNC4xMjZINS4xMTd6XCIvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgXHJcbiAgICAgICAgICAgIGhyZWY6ICdodHRwczovL2Rpc2NvcmQuZ2cvaW5kanMnLCBcclxuICAgICAgICAgICAgbGFiZWw6ICdEaXNjb3JkJyxcclxuICAgICAgICAgICAgaWNvbjogKFxyXG4gICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTUgaC01XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIwLjMxNyA0LjM3YTE5Ljc5MSAxOS43OTEgMCAwIDAtNC44ODUtMS41MTUuMDc0LjA3NCAwIDAgMC0uMDc5LjAzN2MtLjIxLjM3NS0uNDQ0Ljg2NC0uNjA4IDEuMjVhMTguMjcgMTguMjcgMCAwIDAtNS40ODcgMCAxMi42NCAxMi42NCAwIDAgMC0uNjE3LTEuMjUuMDc3LjA3NyAwIDAgMC0uMDc5LS4wMzdBMTkuNzM2IDE5LjczNiAwIDAgMCAzLjY3NyA0LjM3YS4wNy4wNyAwIDAgMC0uMDMyLjAyN0MuNTMzIDkuMDQ2LS4zMiAxMy41OC4wOTkgMTguMDU3YS4wODIuMDgyIDAgMCAwIC4wMzEuMDU3IDE5LjkgMTkuOSAwIDAgMCA1Ljk5MyAzLjAzLjA3OC4wNzggMCAwIDAgLjA4NC0uMDI4IDE0LjA5IDE0LjA5IDAgMCAwIDEuMjI2LTEuOTk0LjA3Ni4wNzYgMCAwIDAtLjA0MS0uMTA2IDEzLjEwNyAxMy4xMDcgMCAwIDEtMS44NzItLjg5Mi4wNzcuMDc3IDAgMCAxLS4wMDgtLjEyOCAxMC4yIDEwLjIgMCAwIDAgLjM3Mi0uMjkyLjA3NC4wNzQgMCAwIDEgLjA3Ny0uMDFjMy45MjggMS43OTMgOC4xOCAxLjc5MyAxMi4wNjIgMGEuMDc0LjA3NCAwIDAgMSAuMDc4LjAxYy4xMi4wOTguMjQ2LjE5OC4zNzMuMjkyYS4wNzcuMDc3IDAgMCAxLS4wMDYuMTI3IDEyLjI5OSAxMi4yOTkgMCAwIDEtMS44NzMuODkyLjA3Ny4wNzcgMCAwIDAtLjA0MS4xMDdjLjM2LjY5OC43NzIgMS4zNjIgMS4yMjUgMS45OTNhLjA3Ni4wNzYgMCAwIDAgLjA4NC4wMjggMTkuODM5IDE5LjgzOSAwIDAgMCA2LjAwMi0zLjAzLjA3Ny4wNzcgMCAwIDAgLjAzMi0uMDU0Yy41LTUuMTc3LS44MzgtOS42NzQtMy41NDktMTMuNjZhLjA2MS4wNjEgMCAwIDAtLjAzMS0uMDN6TTguMDIgMTUuMzNjLTEuMTgzIDAtMi4xNTctMS4wODUtMi4xNTctMi40MTkgMC0xLjMzMy45NTYtMi40MTkgMi4xNTctMi40MTkgMS4yMSAwIDIuMTc2IDEuMDk2IDIuMTU3IDIuNDIgMCAxLjMzMy0uOTU2IDIuNDE4LTIuMTU3IDIuNDE4em03Ljk3NSAwYy0xLjE4MyAwLTIuMTU3LTEuMDg1LTIuMTU3LTIuNDE5IDAtMS4zMzMuOTU1LTIuNDE5IDIuMTU3LTIuNDE5IDEuMjEgMCAyLjE3NiAxLjA5NiAyLjE1NyAyLjQyIDAgMS4zMzMtLjk0NiAyLjQxOC0yLjE1NyAyLjQxOHpcIi8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IExpbmtJdGVtID0gKHsgaHJlZiwgbGFiZWwsIGV4dGVybmFsIH0pID0+IHtcclxuICAgICAgICBpZiAoZXh0ZXJuYWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgaHJlZj17aHJlZn1cclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxyXG4gICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0yMDBcIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPExpbmsgaHJlZj17aHJlZn0+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Zm9vdGVyIGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLWIgZnJvbS1ncmF5LTkwMCB2aWEtZ3JheS05MDAgdG8tYmxhY2sgdGV4dC13aGl0ZSByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cclxuICAgICAgICAgICAgey8qIEJhY2tncm91bmQgUGF0dGVybiAqL31cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyaWQtd2hpdGUgb3BhY2l0eS1bMC4wMl1cIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTEvNCB3LTk2IGgtOTYgYmctaW5kaWdvLTYwMC8xMCByb3VuZGVkLWZ1bGwgYmx1ci0zeGxcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMCByaWdodC0xLzQgdy05NiBoLTk2IGJnLXB1cnBsZS02MDAvMTAgcm91bmRlZC1mdWxsIGJsdXItM3hsXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB7LyogVG9wIGdyYWRpZW50IGxpbmUgKi99XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHJpZ2h0LTAgaC1weCBiZy1ncmFkaWVudC10by1yIGZyb20tdHJhbnNwYXJlbnQgdmlhLWluZGlnby01MDAvNTAgdG8tdHJhbnNwYXJlbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcHktMTYgc206cHktMjBcIj5cclxuICAgICAgICAgICAgICAgIHsvKiBNYWluIEZvb3RlciBDb250ZW50ICovfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy01IGdhcC04IGxnOmdhcC0xMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBCcmFuZCBTZWN0aW9uICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi00IGN1cnNvci1wb2ludGVyIGdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiL2xvZ28uc3ZnXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIklOREpTIExvZ29cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMiBoLTEyIG9iamVjdC1jb250YWluIGdyb3VwLWhvdmVyOnNjYWxlLTExMCB0cmFuc2l0aW9uLXRyYW5zZm9ybVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1sLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFja1wiPklOREpTPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIHRleHQtcHVycGxlLTQwMFwiPlVuaXZlcnNhbCBGcmFtZXdvcms8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtc20gbGVhZGluZy1yZWxheGVkIG1iLTYgbWF4LXctc21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBtb2Rlcm4gUmVhY3QgZnJhbWV3b3JrIGZvciBidWlsZGluZyBibGF6aW5nLWZhc3Qgd2ViLCBkZXNrdG9wLCBhbmQgbW9iaWxlIGFwcGxpY2F0aW9ucyB3aXRoIGEgc2luZ2xlIGNvZGViYXNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogU29jaWFsIExpbmtzICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggc3BhY2UteC0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c29jaWFsTGlua3MubWFwKChzb2NpYWwpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3NvY2lhbC5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj17c29jaWFsLmhyZWZ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgYmctd2hpdGUvNSBob3ZlcjpiZy1pbmRpZ28tNjAwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgaG92ZXI6Ym9yZGVyLWluZGlnby01MDAgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6c2NhbGUtMTEwIGhvdmVyOnNoYWRvdy1sZyBob3ZlcjpzaGFkb3ctaW5kaWdvLTUwMC8yMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3NvY2lhbC5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzb2NpYWwuaWNvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBQcm9kdWN0IExpbmtzICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1sZyBtYi00XCI+UHJvZHVjdDwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9vdGVyTGlua3MucHJvZHVjdC5tYXAoKGxpbmspID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17bGluay5sYWJlbH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rSXRlbSB7Li4ubGlua30gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIENvbXBhbnkgTGlua3MgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWxnIG1iLTRcIj5Db21wYW55PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb290ZXJMaW5rcy5jb21wYW55Lm1hcCgobGluaykgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtsaW5rLmxhYmVsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmtJdGVtIHsuLi5saW5rfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogQ29tbXVuaXR5IExpbmtzICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1sZyBtYi00XCI+Q29tbXVuaXR5PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb290ZXJMaW5rcy5jb21tdW5pdHkubWFwKChsaW5rKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2xpbmsubGFiZWx9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlua0l0ZW0gey4uLmxpbmt9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogQ29udGFjdCBTZWN0aW9uICovfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMiBwdC04IGJvcmRlci10IGJvcmRlci1ncmF5LTgwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtbGcgbWItMVwiPkdldCBJbiBUb3VjaDwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtc21cIj5SZWFjaCBvdXQgZm9yIHF1ZXN0aW9ucyBvciBjb2xsYWJvcmF0aW9uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJtYWlsdG86cm9oaXRzaGFybWFkZXYxQG91dGxvb2suY29tXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIGJnLWdyYXktODAwIGJvcmRlciBib3JkZXItZ3JheS03MDAgcm91bmRlZC1sZyBob3Zlcjpib3JkZXItaW5kaWdvLTUwMCB0cmFuc2l0aW9uLWNvbG9ycyB0ZXh0LWdyYXktMzAwIGhvdmVyOnRleHQtd2hpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNCBoLTRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNCA0aDE2YzEuMSAwIDIgLjkgMiAydjEyYzAgMS4xLS45IDItMiAySDRjLTEuMSAwLTItLjktMi0yVjZjMC0xLjEuOS0yIDItMnpcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPVwiMjIsNiAxMiwxMyAyLDZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc21cIj5FbWFpbDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJ0ZWw6KzkxNjM3NzI4OTMyNFwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMiBiZy1ncmF5LTgwMCBib3JkZXIgYm9yZGVyLWdyYXktNzAwIHJvdW5kZWQtbGcgaG92ZXI6Ym9yZGVyLWluZGlnby01MDAgdHJhbnNpdGlvbi1jb2xvcnMgdGV4dC1ncmF5LTMwMCBob3Zlcjp0ZXh0LXdoaXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIyIDE2LjkydjNhMiAyIDAgMCAxLTIuMTggMiAxOS43OSAxOS43OSAwIDAgMS04LjYzLTMuMDcgMTkuNSAxOS41IDAgMCAxLTYtNiAxOS43OSAxOS43OSAwIDAgMS0zLjA3LTguNjdBMiAyIDAgMCAxIDQuMTEgMmgzYTIgMiAwIDAgMSAyIDEuNzIgMTIuODQgMTIuODQgMCAwIDAgLjcgMi44MSAyIDIgMCAwIDEtLjQ1IDIuMTFMOC4wOSA5LjkxYTE2IDE2IDAgMCAwIDYgNmwxLjI3LTEuMjdhMiAyIDAgMCAxIDIuMTEtLjQ1IDEyLjg0IDEyLjg0IDAgMCAwIDIuODEuN0EyIDIgMCAwIDEgMjIgMTYuOTJ6XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtXCI+KzkxIDYzNzcyODkzMjQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL3JvaGl0LXNoYXJtYS02Mzc3LWRldi9cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIGJnLWdyYXktODAwIGJvcmRlciBib3JkZXItZ3JheS03MDAgcm91bmRlZC1sZyBob3Zlcjpib3JkZXItaW5kaWdvLTUwMCB0cmFuc2l0aW9uLWNvbG9ycyB0ZXh0LWdyYXktMzAwIGhvdmVyOnRleHQtd2hpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNCBoLTRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIwLjQ0NyAyMC40NTJoLTMuNTU0di01LjU2OWMwLTEuMzI4LS4wMjctMy4wMzctMS44NTItMy4wMzctMS44NTMgMC0yLjEzNiAxLjQ0NS0yLjEzNiAyLjkzOXY1LjY2N0g5LjM1MVY5aDMuNDE0djEuNTYxaC4wNDZjLjQ3Ny0uOSAxLjYzNy0xLjg1IDMuMzctMS44NSAzLjYwMSAwIDQuMjY3IDIuMzcgNC4yNjcgNS40NTV2Ni4yODZ6TTUuMzM3IDcuNDMzYy0xLjE0NCAwLTIuMDYzLS45MjYtMi4wNjMtMi4wNjUgMC0xLjEzOC45Mi0yLjA2MyAyLjA2My0yLjA2MyAxLjE0IDAgMi4wNjQuOTI1IDIuMDY0IDIuMDYzIDAgMS4xMzktLjkyNSAyLjA2NS0yLjA2NCAyLjA2NXptMS43ODIgMTMuMDE5SDMuNTU1VjloMy41NjR2MTEuNDUyek0yMi4yMjUgMEgxLjc3MUMuNzkyIDAgMCAuNzc0IDAgMS43Mjl2MjAuNTQyQzAgMjMuMjI3Ljc5MiAyNCAxLjc3MSAyNGgyMC40NTFDMjMuMiAyNCAyNCAyMy4yMjcgMjQgMjIuMjcxVjEuNzI5QzI0IC43NzQgMjMuMiAwIDIyLjIyMiAwaC4wMDN6XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc21cIj5MaW5rZWRJbjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogQ29weXJpZ2h0ICovfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMiBwdC04IGJvcmRlci10IGJvcmRlci1ncmF5LTgwMCB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDAgdGV4dC1zbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcdTAwQTkge2N1cnJlbnRZZWFyfSBJTkRKUy4gQnVpbHQgd2l0aCBcdTI3NjRcdUZFMEYgaW4gSW5kaWEgYnl7JyAnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vUm9oaXRzaGFybWE2Mzc3XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tNDAwIGhvdmVyOnRleHQtaW5kaWdvLTMwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJvaGl0IFNoYXJtYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsnICd9JiB0aGUgSU5ESlMgVGVhbS5cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9mb290ZXI+XHJcbiAgICApO1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQUEsT0FBT0EsYUFBVzs7O0FDQWxCLE9BQU9DLFdBQVMsVUFBVSxpQkFBaUI7OztBQ1UzQyxJQUFNLFlBQVksT0FBTyxXQUFXO0FBRzdCLElBQU0sWUFDWCxjQUNDLE9BQU8sU0FBUyxTQUFTLGNBQ3hCLENBQUMsQ0FBQyxPQUFPLFlBQ1QsVUFBVSxVQUFVLFNBQVMsVUFBVTtBQUdwQyxJQUFNLFdBQ1gsY0FDQyxDQUFDLENBQUMsT0FBTyxhQUNSLENBQUMsQ0FBQyxPQUFPLGlCQUNULENBQUMsQ0FBQyxPQUFPLFFBQVEsaUJBQWlCLFVBQ2xDLFVBQVUsVUFBVSxTQUFTLFdBQVc7QUFHckMsSUFBTSxZQUFZLFlBQVksV0FBVyxLQUFLLFVBQVUsU0FBUztBQUNqRSxJQUFNLFFBQVEsWUFBWSxvQkFBb0IsS0FBSyxVQUFVLFNBQVM7QUFNdEUsSUFBTSxZQUFZLE1BQU07QUFDN0IsTUFBSSxVQUFXLFFBQU87QUFDdEIsTUFBSSxVQUFXLFFBQU87QUFDdEIsTUFBSSxNQUFPLFFBQU87QUFDbEIsTUFBSSxTQUFVLFFBQU87QUFDckIsU0FBTztBQUNULEdBQUc7OztBQ3pDSCxPQUFPLFNBQVMsa0JBQWtCOzs7QUNBbEMsU0FBUyxXQUFXLEtBQUs7QUFDdkIsU0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLFlBQVksSUFBSSxJQUFJLE1BQU0sQ0FBQztBQUNsRDtBQUVPLFNBQVMsZUFBZSxNQUFNO0FBQ25DLFFBQU1DLFlBQVcsT0FBTyxhQUFhLGNBQWMsV0FBVztBQUU5RCxNQUFJQSxj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d0I7QUFBQTtBQUFBLFFBQzlCO0FBQUEsUUFBWTtBQUFBLFFBQWtDO0FBQUEsUUFDakQsZ0JBQUFEO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDRyxNQUFLO0FBQUEsWUFDTCxRQUFPO0FBQUEsWUFDUCxLQUFJO0FBQUEsWUFDSixXQUFVO0FBQUEsWUFDYjtBQUFBO0FBQUEsUUFFRDtBQUFBLFFBQ0M7QUFBQSxRQUFJO0FBQUEsU0FDVCxHQUNKO0FBQUEsT0FDSjtBQUFBLEtBQ0o7QUFFUjs7O0FsQzdNSSxTQUNFLE9BQUFFLE9BREYsUUFBQUMsYUFBQTtBQUZXLFNBQVIsT0FBd0IsRUFBRSxTQUFTLEdBQUc7QUFDM0MsU0FDRSxnQkFBQUEsTUFBQyxTQUFJLFdBQVUsd0VBQ2I7QUFBQSxvQkFBQUQsTUFBQyxVQUFPO0FBQUEsSUFDUixnQkFBQUEsTUFBQyxVQUFLLFdBQVUsb0JBQ2IsVUFDSDtBQUFBLElBQ0EsZ0JBQUFBLE1BQUMsVUFBTztBQUFBLEtBQ1Y7QUFFSjsiLAogICJuYW1lcyI6IFsiUmVhY3QiLCAiUmVhY3QiLCAicGxhdGZvcm0iLCAiU3R5bGVTaGVldCIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJqc3hzIiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiRXZlbnRFbWl0dGVyIiwgImpzeCIsICJqc3hzIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgImpzeCIsICJqc3hzIl0KfQo=
