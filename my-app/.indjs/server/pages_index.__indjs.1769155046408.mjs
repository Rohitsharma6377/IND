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
        /* @__PURE__ */ jsx26("h2", { className: "text-3xl sm:text-4xl font-bold mb-4", children: "Get In Touch" }),
        /* @__PURE__ */ jsx26("p", { className: "text-lg text-indigo-200 mb-10 max-w-xl mx-auto", children: "Have questions or want to collaborate? Reach out through any of these channels." }),
        /* @__PURE__ */ jsxs4("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-6", children: [
          /* @__PURE__ */ jsxs4(
            "a",
            {
              href: "mailto:rohitsharmadev1@outlook.com",
              className: "flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl hover:bg-white/20 transition-all group",
              children: [
                /* @__PURE__ */ jsx26("div", { className: "w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx26(MailIcon, { className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsxs4("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx26("div", { className: "text-xs text-indigo-300", children: "Email" }),
                  /* @__PURE__ */ jsx26("div", { className: "text-white font-medium", children: "rohitsharmadev1@outlook.com" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs4(
            "a",
            {
              href: "tel:+916377289324",
              className: "flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl hover:bg-white/20 transition-all group",
              children: [
                /* @__PURE__ */ jsx26("div", { className: "w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5 text-white", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx26("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }) }),
                /* @__PURE__ */ jsxs4("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx26("div", { className: "text-xs text-indigo-300", children: "Phone" }),
                  /* @__PURE__ */ jsx26("div", { className: "text-white font-medium", children: "+91 6377289324" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs4(
            "a",
            {
              href: "https://www.linkedin.com/in/rohit-sharma-6377-dev/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl hover:bg-white/20 transition-all group",
              children: [
                /* @__PURE__ */ jsx26("div", { className: "w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx26("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }) }),
                /* @__PURE__ */ jsxs4("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx26("div", { className: "text-xs text-indigo-300", children: "LinkedIn" }),
                  /* @__PURE__ */ jsx26("div", { className: "text-white font-medium", children: "rohit-sharma-6377-dev" })
                ] })
              ]
            }
          )
        ] })
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvaW5kZXguanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvcGxhdGZvcm0ubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pbWFnZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy91bml2ZXJzYWwvcmVzb2x2ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvc3R5bGUtc2hlZXQubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9saW5rLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JvbGwtdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQtaW5wdXQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9idXR0b24uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS1pbmRpY2F0b3IuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zd2l0Y2guanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9mbGF0LWxpc3QuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtb3BhY2l0eS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3ByZXNzYWJsZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLWJhY2tncm91bmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9tb2RhbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NhZmUtYXJlYS12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhdHVzLWJhci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NlY3Rpb24tbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2tleWJvYXJkLWF2b2lkaW5nLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9yZWZyZXNoLWNvbnRyb2wuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtaGlnaGxpZ2h0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdG91Y2hhYmxlLXdpdGhvdXQtZmVlZGJhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JlZW4uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jb250YWluZXIuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jYXJkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvZ3JpZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N0YWNrLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaWNvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2RpbWVuc2lvbnMubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9saW5raW5nLm1qcyIsICIuLi8uLi9jb21wb25lbnRzL0ZlYXR1cmVDYXJkLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdpbmRqcyc7XHJcbmltcG9ydCBGZWF0dXJlQ2FyZCBmcm9tICcuLi9jb21wb25lbnRzL0ZlYXR1cmVDYXJkJztcclxuXHJcbi8vIFNWRyBJY29uIENvbXBvbmVudHNcclxuY29uc3QgUmVhY3RJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTggaC04XCIgfSkgPT4gKFxyXG4gIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICA8cGF0aCBkPVwiTTEyIDEwLjExYzEuMDMgMCAxLjg3Ljg0IDEuODcgMS44OSAwIDEtLjg0IDEuODUtMS44NyAxLjg1LTEuMDMgMC0xLjg3LS44NS0xLjg3LTEuODUgMC0xLjA1Ljg0LTEuODkgMS44Ny0xLjg5TTcuMzcgMjBjLjYzLjM4IDIuMDEtLjIgMy42LTEuNy0uNTItLjU5LTEuMDMtMS4yMy0xLjUxLTEuOWEyMi43IDIyLjcgMCAwMS0yLjQtLjM2Yy0uNTEgMi4xNC0uMzIgMy42MS4zMSAzLjk2bS43MS01Ljc0bC0uMjktLjUxYy0uMTEuMjktLjIyLjU4LS4yOS44Ni4yNy4wNi41Ny4xMS44OC4xNmwtLjMtLjUxbTYuNTQtLjc2bC44MS0xLjUtLjgxLTEuNWMtLjMtLjUzLS42Mi0xLS45MS0xLjQ3QzEzLjE3IDkgMTIuNiA5IDEyIDlzLTEuMTcgMC0xLjcxLjAzYy0uMjkuNDctLjYxLjk0LS45MSAxLjQ3TDguNTcgMTJsLjgxIDEuNWMuMy41My42MiAxIC45MSAxLjQ3LjU0LjAzIDEuMTEuMDMgMS43MS4wM3MxLjE3IDAgMS43MS0uMDNjLjI5LS40Ny42MS0uOTQuOTEtMS40N00xMiA2Ljc4Yy0uMTkuMjItLjM5LjQ1LS41OS43MmgxLjE4Yy0uMi0uMjctLjQtLjUtLjU5LS43Mm0wIDEwLjQ0Yy4xOS0uMjIuMzktLjQ1LjU5LS43MmgtMS4xOGMuMi4yNy40LjUuNTkuNzJNMTYuNjIgNGMtLjYyLS4zOC0yIC4yLTMuNTkgMS43LjUyLjU5IDEuMDMgMS4yMyAxLjUxIDEuOS44Mi4wOCAxLjYzLjIgMi40LjM2LjUxLTIuMTQuMzItMy42MS0uMzItMy45Nm0tLjcgNS43NGwuMjkuNTFjLjExLS4yOS4yMi0uNTguMjktLjg2LS4yNy0uMDYtLjU3LS4xMS0uODgtLjE2bC4zLjUxbTEuNDUtNy4wNWMxLjQ3Ljg0IDEuNjMgMy4wNSAxLjAxIDUuNjMgMi41NC43NSA0LjM3IDEuOTkgNC4zNyAzLjY4IDAgMS42OS0xLjgzIDIuOTMtNC4zNyAzLjY4LjYyIDIuNTguNDYgNC43OS0xLjAxIDUuNjMtMS40Ni44NC0zLjQ1LS4xMi01LjM3LTEuOTUtMS45MiAxLjgzLTMuOTEgMi43OS01LjM4IDEuOTUtMS40Ni0uODQtMS42Mi0zLjA1LTEtNS42My0yLjU0LS43NS00LjM3LTEuOTktNC4zNy0zLjY4IDAtMS42OSAxLjgzLTIuOTMgNC4zNy0zLjY4LS42Mi0yLjU4LS40Ni00Ljc5IDEtNS42MyAxLjQ3LS44NCAzLjQ2LjEyIDUuMzggMS45NSAxLjkyLTEuODMgMy45MS0yLjc5IDUuMzctMS45NU0xNy4wOCAxMmMuMzQuNzUuNjQgMS41Ljg5IDIuMjYgMi4xLS42MyAzLjI4LTEuNTMgMy4yOC0yLjI2IDAtLjczLTEuMTgtMS42My0zLjI4LTIuMjYtLjI1Ljc2LS41NSAxLjUxLS44OSAyLjI2TTYuOTIgMTJjLS4zNC0uNzUtLjY0LTEuNS0uODktMi4yNi0yLjEuNjMtMy4yOCAxLjUzLTMuMjggMi4yNiAwIC43MyAxLjE4IDEuNjMgMy4yOCAyLjI2LjI1LS43Ni41NS0xLjUxLjg5LTIuMjZtOSAyLjI2bC0uMy41MWMuMzEtLjA1LjYxLS4xLjg4LS4xNi0uMDctLjI4LS4xOC0uNTctLjI5LS44NmwtLjI5LjUxbS0yLjg5IDQuMDRjMS41OSAxLjUgMi45NyAyLjA4IDMuNTkgMS43LjY0LS4zNS44My0xLjgyLjMyLTMuOTYtLjc3LjE2LTEuNTguMjgtMi40LjM2LS40OC42Ny0uOTkgMS4zMS0xLjUxIDEuOU04LjA4IDkuNzRsLjMtLjUxYy0uMzEuMDUtLjYxLjEtLjg4LjE2LjA3LjI4LjE4LjU3LjI5Ljg2bC4yOS0uNTFtMi44OS00LjA0QzkuMzggNC4yIDggMy42MiA3LjM3IDRjLS42My4zNS0uODIgMS44Mi0uMzEgMy45NmEyMi43IDIyLjcgMCAwMTIuNC0uMzZjLjQ4LS42Ny45OS0xLjMxIDEuNTEtMS45elwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBOb2RlSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgPHBhdGggZD1cIk0xMiAxLjg1Yy0uMjcgMC0uNTUuMDctLjc4LjJsLTcuNDQgNC4zYy0uNDguMjgtLjc4LjgtLjc4IDEuMzZ2OC41OGMwIC41Ni4zIDEuMDguNzggMS4zNmwxLjk1IDEuMTJjLjk1LjQ2IDEuMjcuNDcgMS43MS40NyAxLjQgMCAyLjIxLS44NSAyLjIxLTIuMzNWOC40NGMwLS4xMi0uMS0uMjItLjIyLS4yMkg4LjVjLS4xMyAwLS4yMy4xLS4yMy4yMnY4LjQ3YzAgLjY2LS42OCAxLjMxLTEuNzcuNzZMNC40NSAxNi41YS4yNi4yNiAwIDAxLS4xMS0uMjFWNy43MWMwLS4wOS4wNC0uMTcuMTEtLjIxbDcuNDQtNC4yOWMuMDYtLjA0LjE2LS4wNC4yMiAwbDcuNDQgNC4yOWMuMDcuMDQuMTEuMTIuMTEuMjF2OC41OGMwIC4wOC0uMDQuMTYtLjExLjIxbC03LjQ0IDQuMjljLS4wNi4wNC0uMTYuMDQtLjIzIDBMMTAgMTkuNmMtLjA4LS4wNS0uMTgtLjA1LS4yNi0uMDItLjUzLjI0LS42My4yNy0xLjE0LjQtLjEyLjA0LS4zMS4xLjA3LjI4bDIuNDggMS40N2MuMjQuMTQuNS4yMS43OC4yMXMuNTQtLjA3Ljc4LS4yMWw3LjQ0LTQuMjljLjQ4LS4yOC43OC0uOC43OC0xLjM2VjcuNzFjMC0uNTYtLjMtMS4wOC0uNzgtMS4zNmwtNy40NC00LjNjLS4yMy0uMTMtLjUtLjItLjc4LS4yTTE0IDhjMi4xMiAwIDMuNS44OSAzLjUgMi43NSAwIDEuNi0uODggMi4xNS0yLjc4IDIuNDktMS45NC4zMS0yLjE0LjUtMi4xNCAxLjAyIDAgLjQ0LjI2Ljg2IDEuNjMuODYgMS40NiAwIDEuODMtLjM2IDEuODMtMS4xMWgxLjg5YzAgMS44MS0xLjM3IDIuNDktMy43NSAyLjQ5LTIuMTggMC0zLjQ2LS44NC0zLjQ2LTIuNDIgMC0xLjc2IDEuMzctMi4yIDIuODktMi40NSAxLjk0LS4zIDIuMDMtLjU1IDIuMDMtMS4wNyAwLS40Ni0uMzUtLjgyLTEuNDktLjgyLTEuMTIgMC0xLjYxLjM1LTEuNzEgMS4yNkgxMC41Yy4xNC0xLjc0IDEuMzctMi41NSAzLjUtMi41NXpcIi8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBUeXBlU2NyaXB0SWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgPHBhdGggZD1cIk0xLjEyNSAwQy41MDIgMCAwIC41MDIgMCAxLjEyNXYyMS43NUMwIDIzLjQ5OC41MDIgMjQgMS4xMjUgMjRoMjEuNzVjLjYyMyAwIDEuMTI1LS41MDIgMS4xMjUtMS4xMjVWMS4xMjVDMjQgLjUwMiAyMy40OTggMCAyMi44NzUgMHptMTcuMzYzIDkuNzVjLjYxMiAwIDEuMTU0LjAzNyAxLjYyNy4xMTFhNi4zOCA2LjM4IDAgMCAxIDEuMzA2LjM0djIuNDU4YTMuOTUgMy45NSAwIDAgMC0uNjQzLS4zNjEgNS4wOTMgNS4wOTMgMCAwIDAtLjcxNy0uMjYgNS40NTMgNS40NTMgMCAwIDAtMS40MjYtLjJjLS4zIDAtLjU3My4wMjgtLjgxOS4wODZhMi4xIDIuMSAwIDAgMC0uNjIzLjI0MmMtLjE3LjEwNC0uMy4yMjktLjM5My4zNzRhLjg4OC44ODggMCAwIDAtLjE0LjQ5YzAgLjE5Ni4wNTMuMzczLjE1Ni41MjkuMTA0LjE1Ni4yNTIuMzA0LjQ0My40NDRzLjQyMy4yNzYuNjk2LjQxYy4yNzMuMTM1LjU4Mi4yNzQuOTI2LjQxNi40Ny4xOTcuODkyLjQwNyAxLjI2Ni42MjguMzc0LjIyMi42OTUuNDczLjk2My43NTMuMjY4LjI3OS40NzIuNTk4LjYxNC45NTcuMTQyLjM1OS4yMTQuNzc2LjIxNCAxLjI1MyAwIC42NTctLjEyNSAxLjIxLS4zNzMgMS42NTZhMy4wMzMgMy4wMzMgMCAwIDEtMS4wMTIgMS4wODUgNC4zOCA0LjM4IDAgMCAxLTEuNDg3LjU5NmMtLjU2Ni4xMi0xLjE2My4xOC0xLjc5LjE4YTkuOTE2IDkuOTE2IDAgMCAxLTEuODQtLjE2NCA1LjU0NCA1LjU0NCAwIDAgMS0xLjUxMi0uNDkzdi0yLjYzYTUuMDMzIDUuMDMzIDAgMCAwIDMuMjM3IDEuMmMuMzMzIDAgLjYyNC0uMDMuODcyLS4wOS4yNDktLjA2LjQ1Ni0uMTQ0LjYyMy0uMjUuMTY2LS4xMDguMjktLjIzNC4zNzMtLjM4YTEuMDIzIDEuMDIzIDAgMCAwLS4wNzQtMS4wODkgMi4xMiAyLjEyIDAgMCAwLS41MzctLjUgNS41OTcgNS41OTcgMCAwIDAtLjgwNy0uNDQ0IDI3LjcyIDI3LjcyIDAgMCAwLTEuMDA3LS40MzZjLS45MTgtLjM4My0xLjYwMi0uODUyLTIuMDUzLTEuNDA1LS40NS0uNTUzLS42NzYtMS4yMjItLjY3Ni0yLjAwNSAwLS42MTQuMTIzLTEuMTQxLjM2OS0xLjU4Mi4yNDYtLjQ0MS41OC0uODA0IDEuMDA0LTEuMDg5YTQuNDk0IDQuNDk0IDAgMCAxIDEuNDctLjYyOSA3LjUzNiA3LjUzNiAwIDAgMSAxLjc3LS4yMDF6bS0xNS4xMTMuMTg4aDkuNTYzdjIuMTY2SDkuNTA2djkuNjQ2SDYuNzg5di05LjY0NkgzLjM3NXpcIi8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBUYWlsd2luZEljb24gPSAoeyBjbGFzc05hbWUgPSBcInctOCBoLThcIiB9KSA9PiAoXHJcbiAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgIDxwYXRoIGQ9XCJNMTIuMDAxIDQuOGMtMy4yIDAtNS4yIDEuNi02IDQuOCAxLjItMS42IDIuNi0yLjIgNC4yLTEuOC45MTMuMjI4IDEuNTY1Ljg5IDIuMjg4IDEuNjI0QzEzLjY2NiAxMC42MTggMTUuMDI3IDEyIDE4LjAwMSAxMmMzLjIgMCA1LjItMS42IDYtNC44LTEuMiAxLjYtMi42IDIuMi00LjIgMS44LS45MTMtLjIyOC0xLjU2NS0uODktMi4yODgtMS42MjRDMTYuMzM3IDYuMTgyIDE0Ljk3NiA0LjggMTIuMDAxIDQuOHptLTYgNy4yYy0zLjIgMC01LjIgMS42LTYgNC44IDEuMi0xLjYgMi42LTIuMiA0LjItMS44LjkxMy4yMjggMS41NjUuODkgMi4yODggMS42MjQgMS4xNzcgMS4xOTQgMi41MzggMi41NzYgNS41MTIgMi41NzYgMy4yIDAgNS4yLTEuNiA2LTQuOC0xLjIgMS42LTIuNiAyLjItNC4yIDEuOC0uOTEzLS4yMjgtMS41NjUtLjg5LTIuMjg4LTEuNjI0QzEwLjMzNyAxMy4zODIgOC45NzYgMTIgNi4wMDEgMTJ6XCIvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgVml0ZUljb24gPSAoeyBjbGFzc05hbWUgPSBcInctOCBoLThcIiB9KSA9PiAoXHJcbiAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCI+XHJcbiAgICA8cG9seWdvbiBwb2ludHM9XCIxMyAyIDMgMTQgMTIgMTQgMTEgMjIgMjEgMTAgMTIgMTAgMTMgMlwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBQYWNrYWdlSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICA8bGluZSB4MT1cIjE2LjVcIiB5MT1cIjkuNFwiIHgyPVwiNy41XCIgeTI9XCI0LjIxXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMjEgMTZWOGEyIDIgMCAwIDAtMS0xLjczbC03LTRhMiAyIDAgMCAwLTIgMGwtNyA0QTIgMiAwIDAgMCAzIDh2OGEyIDIgMCAwIDAgMSAxLjczbDcgNGEyIDIgMCAwIDAgMiAwbDctNEEyIDIgMCAwIDAgMjEgMTZ6XCIgLz5cclxuICAgIDxwb2x5bGluZSBwb2ludHM9XCIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NlwiIC8+XHJcbiAgICA8bGluZSB4MT1cIjEyXCIgeTE9XCIyMi4wOFwiIHgyPVwiMTJcIiB5Mj1cIjEyXCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IFphcEljb24gPSAoeyBjbGFzc05hbWUgPSBcInctOCBoLThcIiB9KSA9PiAoXHJcbiAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMTMgMiAzIDE0IDEyIDE0IDExIDIyIDIxIDEwIDEyIDEwIDEzIDJcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgUHV6emxlSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICA8cGF0aCBkPVwiTTE5LjQzOSA3Ljg1Yy0uMDQ5LjMyMi4wNTkuNjQ4LjI4OS44NzhsMS41NjggMS41NjhjLjQ3LjQ3LjcwNiAxLjA4Ny43MDYgMS43MDRzLS4yMzUgMS4yMzMtLjcwNiAxLjcwNGwtMS42MTEgMS42MTFhLjk4Ljk4IDAgMCAxLS44MzcuMjc2Yy0uNDctLjA3LS44MDItLjQ4LS45NjgtLjkyNWEyLjUwMSAyLjUwMSAwIDEgMC0zLjIxNCAzLjIxNGMuNDQ2LjE2Ni44NTUuNDk3LjkyNS45NjhhLjk3OS45NzkgMCAwIDEtLjI3Ni44MzdsLTEuNjEgMS42MTFhMi40MDQgMi40MDQgMCAwIDEtMS43MDUuNzA3IDIuNDAyIDIuNDAyIDAgMCAxLTEuNzA0LS43MDdsLTEuNTY4LTEuNTY4YTEuMDI2IDEuMDI2IDAgMCAwLS44NzctLjI5Yy0uNDkzLjA3NC0uODQuNTA0LTEuMDIuOTY4YTIuNSAyLjUgMCAxIDEtMy4yMzctMy4yMzdjLjQ2NC0uMTguODk0LS41MjcuOTY3LTEuMDJhMS4wMjYgMS4wMjYgMCAwIDAtLjI4OS0uODc3bC0xLjU2OC0xLjU2OEEyLjQwMiAyLjQwMiAwIDAgMSAxLjk5OCAxMmMwLS42MTcuMjM2LTEuMjM0LjcwNi0xLjcwNEw0LjMxNSA4LjY4NWEuOTguOTggMCAwIDEgLjgzNy0uMjc2Yy40Ny4wNy44MDIuNDguOTY4LjkyNWEyLjUwMSAyLjUwMSAwIDEgMCAzLjIxNC0zLjIxNGMtLjQ0Ni0uMTY2LS44NTUtLjQ5Ny0uOTI1LS45NjhhLjk3OS45NzkgMCAwIDEgLjI3Ni0uODM3bDEuNjExLTEuNjExYTIuNDA0IDIuNDA0IDAgMCAxIDEuNzA1LS43MDdjLjYxOCAwIDEuMjM1LjIzNiAxLjcwNC43MDdsMS41NjggMS41NjhjLjIzLjIzLjU1Ni4zMzguODc3LjI5LjQ5My0uMDc0Ljg0LS41MDQgMS4wMi0uOTY4YTIuNSAyLjUgMCAxIDEgMy4yMzcgMy4yMzdjLS40NjQuMTgtLjg5NC41MjctLjk2NyAxLjAyWlwiLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IEZpbGVFZGl0SWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICA8cGF0aCBkPVwiTTQgMTMuNVY0YTIgMiAwIDAgMSAyLTJoOC41TDIwIDcuNVYyMGEyIDIgMCAwIDEtMiAyaC01LjVcIiAvPlxyXG4gICAgPHBvbHlsaW5lIHBvaW50cz1cIjE0IDIgMTQgOCAyMCA4XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTAuNDIgMTIuNjFhMi4xIDIuMSAwIDEgMSAyLjk3IDIuOTdMNy45NSAyMSA0IDIybC45OS0zLjk1IDUuNDMtNS40NFpcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgUm9ja2V0SWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICA8cGF0aCBkPVwiTTQuNSAxNi41Yy0xLjUgMS4yNi0yIDUtMiA1czMuNzQtLjUgNS0yYy43MS0uODQuNy0yLjEzLS4wOS0yLjkxYTIuMTggMi4xOCAwIDAgMC0yLjkxLS4wOXpcIiAvPlxyXG4gICAgPHBhdGggZD1cIm0xMiAxNS0zLTNhMjIgMjIgMCAwIDEgMi0zLjk1QTEyLjg4IDEyLjg4IDAgMCAxIDIyIDJjMCAyLjcyLS43OCA3LjUtNiAxMWEyMi4zNSAyMi4zNSAwIDAgMS00IDJ6XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNOSAxMkg0cy41NS0zLjAzIDItNGMxLjYyLTEuMDggNSAwIDUgMFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTEyIDE1djVzMy4wMy0uNTUgNC0yYzEuMDgtMS42MiAwLTUgMC01XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IFF1b3RlSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy04IGgtOFwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgPHBhdGggZD1cIk0xNC4wMTcgMjF2LTcuMzkxYzAtNS43MDQgMy43MzEtOS41NyA4Ljk4My0xMC42MDlsLjk5NSAyLjE1MWMtMi40MzIuOTE3LTMuOTk1IDMuNjM4LTMuOTk1IDUuODQ5aDR2MTBoLTkuOTgzem0tMTQuMDE3IDB2LTcuMzkxYzAtNS43MDQgMy43NDgtOS41NyA5LTEwLjYwOWwuOTk2IDIuMTUxYy0yLjQzMy45MTctMy45OTYgMy42MzgtMy45OTYgNS44NDloMy45ODN2MTBoLTkuOTgzelwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBDaGV2cm9uRG93bkljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNiBoLTZcIiB9KSA9PiAoXHJcbiAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgPHBvbHlsaW5lIHBvaW50cz1cIjYgOSAxMiAxNSAxOCA5XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IE1haWxJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTYgaC02XCIgfSkgPT4gKFxyXG4gIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgIDxwYXRoIGQ9XCJNNCA0aDE2YzEuMSAwIDIgLjkgMiAydjEyYzAgMS4xLS45IDItMiAySDRjLTEuMSAwLTItLjktMi0yVjZjMC0xLjEuOS0yIDItMnpcIiAvPlxyXG4gICAgPHBvbHlsaW5lIHBvaW50cz1cIjIyLDYgMTIsMTMgMiw2XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IENvZGVCcmFja2V0SWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy02IGgtNlwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICA8cG9seWxpbmUgcG9pbnRzPVwiMTYgMTggMjIgMTIgMTYgNlwiIC8+XHJcbiAgICA8cG9seWxpbmUgcG9pbnRzPVwiOCA2IDIgMTIgOCAxOFwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBTZXJ2ZXJJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTYgaC02XCIgfSkgPT4gKFxyXG4gIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgIDxyZWN0IHg9XCIyXCIgeT1cIjJcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiOFwiIHJ4PVwiMlwiIHJ5PVwiMlwiIC8+XHJcbiAgICA8cmVjdCB4PVwiMlwiIHk9XCIxNFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCI4XCIgcng9XCIyXCIgcnk9XCIyXCIgLz5cclxuICAgIDxsaW5lIHgxPVwiNlwiIHkxPVwiNlwiIHgyPVwiNi4wMVwiIHkyPVwiNlwiIC8+XHJcbiAgICA8bGluZSB4MT1cIjZcIiB5MT1cIjE4XCIgeDI9XCI2LjAxXCIgeTI9XCIxOFwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBHbG9iZUljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNiBoLTZcIiB9KSA9PiAoXHJcbiAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIxMFwiIC8+XHJcbiAgICA8bGluZSB4MT1cIjJcIiB5MT1cIjEyXCIgeDI9XCIyMlwiIHkyPVwiMTJcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xMiAyYTE1LjMgMTUuMyAwIDAgMSA0IDEwIDE1LjMgMTUuMyAwIDAgMS00IDEwIDE1LjMgMTUuMyAwIDAgMS00LTEwIDE1LjMgMTUuMyAwIDAgMSA0LTEwelwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBTdGFySWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy01IGgtNVwiIH0pID0+IChcclxuICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMTIgMiAxNS4wOSA4LjI2IDIyIDkuMjcgMTcgMTQuMTQgMTguMTggMjEuMDIgMTIgMTcuNzcgNS44MiAyMS4wMiA3IDE0LjE0IDIgOS4yNyA4LjkxIDguMjYgMTIgMlwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xyXG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbY29waWVkLCBzZXRDb3BpZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtvcGVuRmFxLCBzZXRPcGVuRmFxXSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICBjb25zdCBjb3B5Q29tbWFuZCA9ICgpID0+IHtcclxuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KCducHggaW5kanMgY3JlYXRlIG15LWFwcCcpO1xyXG4gICAgc2V0Q29waWVkKHRydWUpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcclxuICB9O1xyXG5cclxuICBjb25zdCB0ZXN0aW1vbmlhbHMgPSBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFwiU2FyYWggQ2hlblwiLFxyXG4gICAgICByb2xlOiBcIkxlYWQgRGV2ZWxvcGVyIGF0IFRlY2hDb3JwXCIsXHJcbiAgICAgIGF2YXRhcjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5NDc5MDEwODM3Ny1iZTljMjliMjkzMzA/dz0xMDAmaD0xMDAmZml0PWNyb3AmY3JvcD1mYWNlXCIsXHJcbiAgICAgIGNvbnRlbnQ6IFwiSU5ESlMgaGFzIGNvbXBsZXRlbHkgdHJhbnNmb3JtZWQgb3VyIGRldmVsb3BtZW50IHdvcmtmbG93LiBXZSBzaGlwcGVkIG91ciBwcm9kdWN0IDN4IGZhc3RlciB0aGFuIGV4cGVjdGVkLiBUaGUgdW5pdmVyc2FsIHBsYXRmb3JtIHN1cHBvcnQgaXMgYSBnYW1lLWNoYW5nZXIuXCIsXHJcbiAgICAgIHJhdGluZzogNVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogXCJNaWNoYWVsIFJvZHJpZ3VlelwiLFxyXG4gICAgICByb2xlOiBcIkNUTyBhdCBTdGFydHVwWFlaXCIsXHJcbiAgICAgIGF2YXRhcjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUwNzAwMzIxMTE2OS0wYTFkZDcyMjhmMmQ/dz0xMDAmaD0xMDAmZml0PWNyb3AmY3JvcD1mYWNlXCIsXHJcbiAgICAgIGNvbnRlbnQ6IFwiVGhlIGJlc3QgUmVhY3QgZnJhbWV3b3JrIEkndmUgZXZlciB1c2VkLiBaZXJvIGNvbmZpZywgYW1hemluZyBEWCwgYW5kIHRoZSBidWlsdC1pbiBBUEkgcm91dGVzIGFyZSBpbmNyZWRpYmx5IHBvd2VyZnVsLiBPdXIgdGVhbSBwcm9kdWN0aXZpdHkgaW5jcmVhc2VkIGJ5IDIwMCUuXCIsXHJcbiAgICAgIHJhdGluZzogNVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogXCJFbWlseSBXYXRzb25cIixcclxuICAgICAgcm9sZTogXCJTZW5pb3IgRW5naW5lZXIgYXQgQmlnVGVjaFwiLFxyXG4gICAgICBhdmF0YXI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0Mzg3NjE2ODEwMzMtNjQ2MWZmYWQ4ZDgwP3c9MTAwJmg9MTAwJmZpdD1jcm9wJmNyb3A9ZmFjZVwiLFxyXG4gICAgICBjb250ZW50OiBcIk1vdmluZyBmcm9tIE5leHQuanMgdG8gSU5ESlMgd2FzIHNlYW1sZXNzLiBUaGUgdW5pdmVyc2FsIGFwcCBzdXBwb3J0IG1lYW50IHdlIGNvdWxkIHRhcmdldCB3ZWIsIGRlc2t0b3AsIGFuZCBtb2JpbGUgZnJvbSBvbmUgY29kZWJhc2UuIEFic29sdXRlbHkgYnJpbGxpYW50IVwiLFxyXG4gICAgICByYXRpbmc6IDVcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFwiRGF2aWQgUGFya1wiLFxyXG4gICAgICByb2xlOiBcIkluZGllIERldmVsb3BlclwiLFxyXG4gICAgICBhdmF0YXI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NzIwOTk2NDU3ODUtNTY1OGFiZjRmZjRlP3c9MTAwJmg9MTAwJmZpdD1jcm9wJmNyb3A9ZmFjZVwiLFxyXG4gICAgICBjb250ZW50OiBcIkFzIGEgc29sbyBkZXZlbG9wZXIsIElOREpTIGxldHMgbWUgcHVuY2ggd2F5IGFib3ZlIG15IHdlaWdodC4gSSBidWlsdCBhbmQgbGF1bmNoZWQgbXkgU2FhUyBpbiBqdXN0IDIgd2Vla3MuIFRoZSBkb2N1bWVudGF0aW9uIGlzIGV4Y2VsbGVudCB0b28hXCIsXHJcbiAgICAgIHJhdGluZzogNVxyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGZhcXMgPSBbXHJcbiAgICB7XHJcbiAgICAgIHF1ZXN0aW9uOiBcIldoYXQgaXMgSU5ESlMgYW5kIGhvdyBpcyBpdCBkaWZmZXJlbnQgZnJvbSBOZXh0LmpzP1wiLFxyXG4gICAgICBhbnN3ZXI6IFwiSU5ESlMgaXMgYSB1bml2ZXJzYWwgUmVhY3QgbWV0YS1mcmFtZXdvcmsgdGhhdCBsZXRzIHlvdSBidWlsZCB3ZWIsIGRlc2t0b3AsIGFuZCBtb2JpbGUgYXBwcyBmcm9tIGEgc2luZ2xlIGNvZGViYXNlLiBVbmxpa2UgTmV4dC5qcyB3aGljaCBmb2N1c2VzIHByaW1hcmlseSBvbiB3ZWIsIElOREpTIHByb3ZpZGVzIG5hdGl2ZSBzdXBwb3J0IGZvciBFbGVjdHJvbiAoZGVza3RvcCkgYW5kIENhcGFjaXRvciAobW9iaWxlKSBvdXQgb2YgdGhlIGJveCwgd2hpbGUgbWFpbnRhaW5pbmcgdGhlIHNhbWUgZ3JlYXQgZGV2ZWxvcGVyIGV4cGVyaWVuY2UuXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHF1ZXN0aW9uOiBcIkRvIEkgbmVlZCB0byBsZWFybiBhbnl0aGluZyBuZXcgdG8gdXNlIElOREpTP1wiLFxyXG4gICAgICBhbnN3ZXI6IFwiSWYgeW91IGtub3cgUmVhY3QsIHlvdSBhbHJlYWR5IGtub3cgOTAlIG9mIHdoYXQgeW91IG5lZWQhIElOREpTIHVzZXMgZmFtaWxpYXIgcGF0dGVybnMgbGlrZSBmaWxlLWJhc2VkIHJvdXRpbmcsIEFQSSByb3V0ZXMsIGFuZCBKU1ggY29tcG9uZW50cy4gVGhlIGxlYXJuaW5nIGN1cnZlIGlzIG1pbmltYWwsIGFuZCBvdXIgY29tcHJlaGVuc2l2ZSBkb2N1bWVudGF0aW9uIHdpbGwgZ2V0IHlvdSB1cCB0byBzcGVlZCBxdWlja2x5LlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBxdWVzdGlvbjogXCJJcyBJTkRKUyBzdWl0YWJsZSBmb3IgcHJvZHVjdGlvbiBhcHBsaWNhdGlvbnM/XCIsXHJcbiAgICAgIGFuc3dlcjogXCJBYnNvbHV0ZWx5ISBJTkRKUyBpcyBkZXNpZ25lZCBmb3IgcHJvZHVjdGlvbiB1c2Ugd2l0aCBmZWF0dXJlcyBsaWtlIGF1dG9tYXRpYyBjb2RlIHNwbGl0dGluZywgU1NSL1NTRyBzdXBwb3J0LCBvcHRpbWl6ZWQgYnVpbGRzLCBhbmQgcm9idXN0IGVycm9yIGhhbmRsaW5nLiBNYW55IGNvbXBhbmllcyBhcmUgYWxyZWFkeSB1c2luZyBJTkRKUyBpbiBwcm9kdWN0aW9uLlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBxdWVzdGlvbjogXCJIb3cgZG8gSSBkZXBsb3kgYW4gSU5ESlMgYXBwbGljYXRpb24/XCIsXHJcbiAgICAgIGFuc3dlcjogXCJJTkRKUyBhcHBzIGNhbiBiZSBkZXBsb3llZCBhbnl3aGVyZSEgRm9yIHdlYiwgZGVwbG95IHRvIFZlcmNlbCwgTmV0bGlmeSwgQVdTLCBvciBhbnkgTm9kZS5qcyBob3N0aW5nLiBGb3IgZGVza3RvcCwgdXNlIG91ciBidWlsdC1pbiBFbGVjdHJvbiBwYWNrYWdpbmcuIEZvciBtb2JpbGUsIHdlIGludGVncmF0ZSBzZWFtbGVzc2x5IHdpdGggQ2FwYWNpdG9yIGZvciBpT1MgYW5kIEFuZHJvaWQgYnVpbGRzLlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBxdWVzdGlvbjogXCJJcyBJTkRKUyBmcmVlIGFuZCBvcGVuIHNvdXJjZT9cIixcclxuICAgICAgYW5zd2VyOiBcIlllcyEgSU5ESlMgaXMgY29tcGxldGVseSBmcmVlIGFuZCBvcGVuIHNvdXJjZSB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuIFlvdSBjYW4gdXNlIGl0IGZvciBwZXJzb25hbCBwcm9qZWN0cywgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCBldmVyeXRoaW5nIGluIGJldHdlZW4uIFdlIGFsc28gd2VsY29tZSBjb250cmlidXRpb25zIGZyb20gdGhlIGNvbW11bml0eS5cIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgcXVlc3Rpb246IFwiV2hhdCBraW5kIG9mIHN1cHBvcnQgaXMgYXZhaWxhYmxlP1wiLFxyXG4gICAgICBhbnN3ZXI6IFwiV2Ugb2ZmZXIgZXh0ZW5zaXZlIGRvY3VtZW50YXRpb24sIGEgRGlzY29yZCBjb21tdW5pdHkgd2l0aCB0aG91c2FuZHMgb2YgZGV2ZWxvcGVycywgR2l0SHViIGRpc2N1c3Npb25zLCBhbmQgcmVndWxhciB1cGRhdGVzLiBGb3IgZW50ZXJwcmlzZSBuZWVkcywgd2UgYWxzbyBvZmZlciBwcmVtaXVtIHN1cHBvcnQgcGFja2FnZXMgd2l0aCBkZWRpY2F0ZWQgYXNzaXN0YW5jZS5cIlxyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGhvd0l0V29ya3MgPSBbXHJcbiAgICB7XHJcbiAgICAgIHN0ZXA6IDEsXHJcbiAgICAgIHRpdGxlOiBcIkNyZWF0ZSBZb3VyIFByb2plY3RcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwiUnVuIG9uZSBjb21tYW5kIHRvIHNjYWZmb2xkIGEgbmV3IElOREpTIHByb2plY3Qgd2l0aCBhbGwgdGhlIGVzc2VudGlhbHMgcHJlLWNvbmZpZ3VyZWQuXCIsXHJcbiAgICAgIGljb246IENvZGVCcmFja2V0SWNvbixcclxuICAgICAgY29kZTogXCJucHggaW5kanMgY3JlYXRlIG15LWFwcFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzdGVwOiAyLFxyXG4gICAgICB0aXRsZTogXCJCdWlsZCBZb3VyIEZlYXR1cmVzXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIldyaXRlIFJlYWN0IGNvbXBvbmVudHMsIGNyZWF0ZSBBUEkgcm91dGVzLCBhbmQgYnVpbGQgeW91ciBhcHBsaWNhdGlvbiB3aXRoIGhvdCByZWxvYWQuXCIsXHJcbiAgICAgIGljb246IFNlcnZlckljb24sXHJcbiAgICAgIGNvZGU6IFwibnBtIHJ1biBkZXZcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc3RlcDogMyxcclxuICAgICAgdGl0bGU6IFwiRGVwbG95IEV2ZXJ5d2hlcmVcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwiQnVpbGQgZm9yIHdlYiwgZGVza3RvcCwgb3IgbW9iaWxlIHdpdGggYSBzaW5nbGUgY29tbWFuZC4gRGVwbG95IHRvIGFueSBwbGF0Zm9ybS5cIixcclxuICAgICAgaWNvbjogR2xvYmVJY29uLFxyXG4gICAgICBjb2RlOiBcIm5wbSBydW4gYnVpbGRcIlxyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGNvZGVFeGFtcGxlcyA9IFtcclxuICAgIHtcclxuICAgICAgdGFiOiAnUGFnZScsXHJcbiAgICAgIGZpbGVuYW1lOiAncGFnZXMvaW5kZXguanN4JyxcclxuICAgICAgY29kZTogYGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxtYWluIGNsYXNzTmFtZT1cImZsZXggbWluLWgtc2NyZWVuIGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTI0XCI+XHJcbiAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTZ4bCBmb250LWJvbGRcIj5cclxuICAgICAgICBXZWxjb21lIHRvIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTYwMFwiPklOREpTPC9zcGFuPlxyXG4gICAgICA8L2gxPlxyXG4gICAgICA8cCBjbGFzc05hbWU9XCJtdC00IHRleHQteGwgdGV4dC1ncmF5LTYwMFwiPlxyXG4gICAgICAgIFRoZSBSZWFjdCBmcmFtZXdvcmsgZm9yIHRoZSBtb2Rlcm4gd2ViXHJcbiAgICAgIDwvcD5cclxuICAgIDwvbWFpbj5cclxuICApXHJcbn1gXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0YWI6ICdBUEknLFxyXG4gICAgICBmaWxlbmFtZTogJ3BhZ2VzL2FwaS91c2Vycy5qcycsXHJcbiAgICAgIGNvZGU6IGBleHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHsgcmVxIH0pIHtcclxuICBjb25zdCB1c2VycyA9IGF3YWl0IGRiLnVzZXJzLmZpbmRNYW55KCk7XHJcbiAgcmV0dXJuIHsgdXNlcnMsIGNvdW50OiB1c2Vycy5sZW5ndGggfTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QoeyBib2R5IH0pIHtcclxuICBjb25zdCB1c2VyID0gYXdhaXQgZGIudXNlcnMuY3JlYXRlKHtcclxuICAgIGRhdGE6IHsgbmFtZTogYm9keS5uYW1lLCBlbWFpbDogYm9keS5lbWFpbCB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHsgdXNlciwgc3RhdHVzOiAyMDEgfTtcclxufWBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRhYjogJ0xheW91dCcsXHJcbiAgICAgIGZpbGVuYW1lOiAncGFnZXMvX2xheW91dC5qc3gnLFxyXG4gICAgICBjb2RlOiBgaW1wb3J0IE5hdmJhciBmcm9tICcuLi9jb21wb25lbnRzL05hdmJhcic7XHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Gb290ZXInO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMYXlvdXQoeyBjaGlsZHJlbiB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGZsZXggZmxleC1jb2xcIj5cclxuICAgICAgPE5hdmJhciAvPlxyXG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJmbGV4LTFcIj57Y2hpbGRyZW59PC9tYWluPlxyXG4gICAgICA8Rm9vdGVyIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59YFxyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy13aGl0ZVwiPlxyXG4gICAgICB7LyogSGVybyBTZWN0aW9uIC0gTmV4dC5qcyBTdHlsZSAqL31cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIGJnLXdoaXRlXCI+XHJcbiAgICAgICAgey8qIEdyYWRpZW50IE9yYnMgKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTEvNCB3LVs1MDBweF0gaC1bNTAwcHhdIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tMzAwLzQwIHRvLXB1cnBsZS0zMDAvNDAgcm91bmRlZC1mdWxsIGJsdXItWzEwMHB4XSBhbmltYXRlLXB1bHNlXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMCByaWdodC0xLzQgdy1bNjAwcHhdIGgtWzYwMHB4XSBiZy1ncmFkaWVudC10by1yIGZyb20tcGluay0zMDAvMzAgdG8tcm9zZS0zMDAvMzAgcm91bmRlZC1mdWxsIGJsdXItWzEyMHB4XSBhbmltYXRlLXB1bHNlXCIgc3R5bGU9e3sgYW5pbWF0aW9uRGVsYXk6ICcxcycgfX0+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMS8yIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB3LVs4MDBweF0gaC1bODAwcHhdIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1jeWFuLTIwMC8yMCB0by1ibHVlLTIwMC8yMCByb3VuZGVkLWZ1bGwgYmx1ci1bMTUwcHhdXCI+PC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBwdC0yMCBwYi0xNiBzbTpwdC0zMiBzbTpwYi0yNFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICB7LyogVmVyc2lvbiBCYWRnZSAqL31cclxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9Sb2hpdHNoYXJtYTYzNzcvSU5EL3JlbGVhc2VzXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXHJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTEuNSBiZy1ncmF5LTEwMCBob3ZlcjpiZy1ncmF5LTIwMCByb3VuZGVkLWZ1bGwgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIHRyYW5zaXRpb24tY29sb3JzIG1iLTggZ3JvdXBcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGgtMiB3LTJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFuaW1hdGUtcGluZyBhYnNvbHV0ZSBpbmxpbmUtZmxleCBoLWZ1bGwgdy1mdWxsIHJvdW5kZWQtZnVsbCBiZy1pbmRpZ28tNTAwIG9wYWNpdHktNzVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBpbmxpbmUtZmxleCByb3VuZGVkLWZ1bGwgaC0yIHctMiBiZy1pbmRpZ28tNjAwXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICBJTkRKUyAzLjEuMiBpcyBoZXJlXHJcbiAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTQgaC00IGdyb3VwLWhvdmVyOnRyYW5zbGF0ZS14LTAuNSB0cmFuc2l0aW9uLXRyYW5zZm9ybVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTkgNWw3IDctNyA3XCIgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9hPlxyXG5cclxuICAgICAgICAgICAgey8qIE1haW4gVGl0bGUgKi99XHJcbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBzbTp0ZXh0LTZ4bCBtZDp0ZXh0LTd4bCBsZzp0ZXh0LVs1LjVyZW1dIGZvbnQtZXh0cmFib2xkIHRleHQtZ3JheS05MDAgdHJhY2tpbmctdGlnaHQgbGVhZGluZy1bMS4xXSBtYi02XCI+XHJcbiAgICAgICAgICAgICAgVGhlIFJlYWN0IEZyYW1ld29ya1xyXG4gICAgICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNjAwIHZpYS1wdXJwbGUtNjAwIHRvLXBpbmstNjAwIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICBmb3IgVW5pdmVyc2FsIEFwcHNcclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvaDE+XHJcblxyXG4gICAgICAgICAgICB7LyogRGVzY3JpcHRpb24gKi99XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1heC13LTN4bCBteC1hdXRvIHRleHQtbGcgc206dGV4dC14bCB0ZXh0LWdyYXktNjAwIGxlYWRpbmctcmVsYXhlZCBtYi0xMFwiPlxyXG4gICAgICAgICAgICAgIElOREpTIGVuYWJsZXMgeW91IHRvIGNyZWF0ZSBmdWxsLXN0YWNrIHdlYiwgZGVza3RvcCwgYW5kIG1vYmlsZSBhcHBsaWNhdGlvbnMgXHJcbiAgICAgICAgICAgICAgd2l0aCBSZWFjdC4gQnVpbGQgcHJvZHVjdGlvbi1yZWFkeSBhcHBzIHdpdGggemVybyBjb25maWd1cmF0aW9uLlxyXG4gICAgICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgICAgICB7LyogQ1RBIFNlY3Rpb24gKi99XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTQgbWItMTZcIj5cclxuICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2RvY3NcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiZ3JvdXAgdy1mdWxsIHNtOnctYXV0byBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgcHgtOCBweS00IHRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgYmctZ3JheS05MDAgcm91bmRlZC14bCBob3ZlcjpiZy1ncmF5LTgwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgc2hhZG93LWxnIGhvdmVyOnNoYWRvdy14bFwiPlxyXG4gICAgICAgICAgICAgICAgICBHZXQgU3RhcnRlZFxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNSBoLTUgZ3JvdXAtaG92ZXI6dHJhbnNsYXRlLXgtMC41IHRyYW5zaXRpb24tdHJhbnNmb3JtXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTEzIDdsNSA1bTAgMGwtNSA1bTUtNUg2XCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NvcHlDb21tYW5kfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgdy1mdWxsIHNtOnctYXV0byBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTMgcHgtNiBweS00IHRleHQtYmFzZSBmb250LW1vbm8gdGV4dC1ncmF5LTYwMCBiZy1ncmF5LTEwMCBob3ZlcjpiZy1ncmF5LTIwMCByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBib3JkZXIgYm9yZGVyLWdyYXktMjAwXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+JDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPm5weCBpbmRqcyBjcmVhdGUgbXktYXBwPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwICR7Y29waWVkID8gJ3RleHQtZ3JlZW4tNjAwJyA6ICd0ZXh0LWdyYXktNDAwIGdyb3VwLWhvdmVyOnRleHQtZ3JheS02MDAnfWB9PlxyXG4gICAgICAgICAgICAgICAgICB7Y29waWVkID8gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTUgMTNsNCA0TDE5IDdcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTggMTZINmEyIDIgMCAwMS0yLTJWNmEyIDIgMCAwMTItMmg4YTIgMiAwIDAxMiAydjJtLTYgMTJoOGEyIDIgMCAwMDItMnYtOGEyIDIgMCAwMC0yLTJoLThhMiAyIDAgMDAtMiAydjhhMiAyIDAgMDAyIDJ6XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICB7LyogRGVtbyBQcmV2aWV3IC0gQnJvd3NlciBNb2NrdXAgKi99XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWF4LXctNXhsIG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC1pbnNldC00IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNTAwLzIwIHZpYS1wdXJwbGUtNTAwLzIwIHRvLXBpbmstNTAwLzIwIHJvdW5kZWQtM3hsIGJsdXItMnhsXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBiZy1ncmF5LTkwMCByb3VuZGVkLTJ4bCBzaGFkb3ctMnhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLWdyYXktODAwXCI+XHJcbiAgICAgICAgICAgICAgICB7LyogQnJvd3NlciBDaHJvbWUgKi99XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMyBiZy1ncmF5LTgwMC84MCBib3JkZXItYiBib3JkZXItZ3JheS03MDBcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0xLjVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLXJlZC01MDBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLXllbGxvdy01MDBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLWdyZWVuLTUwMFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0xIGJnLWdyYXktNzAwLzUwIHJvdW5kZWQtbWQgdGV4dC1ncmF5LTQwMCB0ZXh0LXNtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNCBoLTRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTEyIDExYzAgMy41MTctMS4wMDkgNi43OTktMi43NTMgOS41NzFtLTMuNDQtMi4wNGwuMDU0LS4wOUExMy45MTYgMTMuOTE2IDAgMDA4IDExYTQgNCAwIDExOCAwYzAgMS4wMTctLjA3IDIuMDE5LS4yMDMgM20tMi4xMTggNi44NDRBMjEuODggMjEuODggMCAwMDE1LjE3MSAxN20zLjgzOSAxLjEzMmMuNjQ1LTIuMjY2Ljk5LTQuNjU5Ljk5LTcuMTMyQTggOCAwIDAwOCA0LjA3TTMgMTUuMzY0Yy42NC0xLjMxOSAxLTIuOCAxLTQuMzY0IDAtMS40NTcuMzktMi44MjMgMS4wNy00XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgbG9jYWxob3N0OjMwMDBcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgey8qIENvZGUgVGFicyAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBiZy1ncmF5LTgwMC81MCBib3JkZXItYiBib3JkZXItZ3JheS03MDAgb3ZlcmZsb3cteC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgICAgIHtjb2RlRXhhbXBsZXMubWFwKChleGFtcGxlLCBpZHgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2lkeH1cclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYihpZHgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHRleHQtc20gZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgJHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSBpZHggXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndGV4dC13aGl0ZSBiZy1ncmF5LTcwMC81MCBib3JkZXItYi0yIGJvcmRlci1pbmRpZ28tNTAwJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtZ3JheS0zMDAnXHJcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNCBoLTRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTkgMTJoNm0tNiA0aDZtMiA1SDdhMiAyIDAgMDEtMi0yVjVhMiAyIDAgMDEyLTJoNS41ODZhMSAxIDAgMDEuNzA3LjI5M2w1LjQxNCA1LjQxNGExIDEgMCAwMS4yOTMuNzA3VjE5YTIgMiAwIDAxLTIgMnpcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7ZXhhbXBsZS50YWJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIENvZGUgQ29udGVudCAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHNtOnAtNiBvdmVyZmxvdy14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDAgbWItMyBmb250LW1vbm9cIj57Y29kZUV4YW1wbGVzW2FjdGl2ZVRhYl0uZmlsZW5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktMzAwIGZvbnQtbW9ubyBsZWFkaW5nLXJlbGF4ZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Y29kZT57Y29kZUV4YW1wbGVzW2FjdGl2ZVRhYl0uY29kZX08L2NvZGU+XHJcbiAgICAgICAgICAgICAgICAgIDwvcHJlPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgIHsvKiBDb21wYW5pZXMvVGVjaCBTZWN0aW9uICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0xNiBiZy1ncmF5LTUwIGJvcmRlci15IGJvcmRlci1ncmF5LTEwMFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCBtYi0xMFwiPkJVSUxUIFdJVEggTU9ERVJOIFRFQ0hOT0xPR0lFUzwvcD5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBtZDpncmlkLWNvbHMtNiBnYXAtOCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAge1tcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdSZWFjdCcsIGljb246IFJlYWN0SWNvbiwgY29sb3I6ICd0ZXh0LWN5YW4tNTAwJyB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ05vZGUuanMnLCBpY29uOiBOb2RlSWNvbiwgY29sb3I6ICd0ZXh0LWdyZWVuLTYwMCcgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdUeXBlU2NyaXB0JywgaWNvbjogVHlwZVNjcmlwdEljb24sIGNvbG9yOiAndGV4dC1ibHVlLTYwMCcgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdUYWlsd2luZCcsIGljb246IFRhaWx3aW5kSWNvbiwgY29sb3I6ICd0ZXh0LXRlYWwtNTAwJyB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ1ZpdGUnLCBpY29uOiBWaXRlSWNvbiwgY29sb3I6ICd0ZXh0LXB1cnBsZS01MDAnIH0sXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiAnZXNidWlsZCcsIGljb246IFBhY2thZ2VJY29uLCBjb2xvcjogJ3RleHQteWVsbG93LTUwMCcgfSxcclxuICAgICAgICAgICAgXS5tYXAoKHRlY2gsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IEljb25Db21wb25lbnQgPSB0ZWNoLmljb247XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0yIGdyb3VwIGN1cnNvci1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHt0ZWNoLmNvbG9yfSBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMjAwYH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPEljb25Db21wb25lbnQgY2xhc3NOYW1lPVwidy0xMCBoLTEwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNjAwIGdyb3VwLWhvdmVyOnRleHQtZ3JheS05MDAgdHJhbnNpdGlvbi1jb2xvcnNcIj57dGVjaC5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgIHsvKiBGZWF0dXJlcyBTZWN0aW9uIC0gTmV4dC5qcyBTdHlsZSBHcmlkICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBiZy13aGl0ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMjBcIj5cclxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRyYWNraW5nLXRpZ2h0IG1iLTRcIj5cclxuICAgICAgICAgICAgICBXaHkgSU5ESlM/XHJcbiAgICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgdGV4dC1ncmF5LTUwMCBtYXgtdy0yeGwgbXgtYXV0b1wiPlxyXG4gICAgICAgICAgICAgIEV2ZXJ5dGhpbmcgeW91IG5lZWQgdG8gYnVpbGQgbW9kZXJuIGFwcGxpY2F0aW9ucywgb3V0IG9mIHRoZSBib3guXHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtMCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHJvdW5kZWQtMnhsIG92ZXJmbG93LWhpZGRlblwiPlxyXG4gICAgICAgICAgICB7W1xyXG4gICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICBpY29uOiAoXHJcbiAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy0xMCBoLTEwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwidXJsKCNncmFkaWVudDEpXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9XCJncmFkaWVudDFcIiB4MT1cIjAlXCIgeTE9XCIwJVwiIHgyPVwiMTAwJVwiIHkyPVwiMTAwJVwiPjxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPVwiIzYzNjZmMVwiLz48c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPVwiI2E4NTVmN1wiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz5cclxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMyAxMFYzTDQgMTRoN3Y3bDktMTFoLTd6XCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdMaWdodG5pbmcgRmFzdCcsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0J1aWx0IG9uIGVzYnVpbGQgYW5kIFZpdGUgZm9yIGluc3RhbnQgSE1SIGFuZCBzdWItc2Vjb25kIGNvbGQgc3RhcnRzLidcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICBpY29uOiAoXHJcbiAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy0xMCBoLTEwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwidXJsKCNncmFkaWVudDIpXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9XCJncmFkaWVudDJcIiB4MT1cIjAlXCIgeTE9XCIwJVwiIHgyPVwiMTAwJVwiIHkyPVwiMTAwJVwiPjxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPVwiIzA2YjZkNFwiLz48c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPVwiIzNiODJmNlwiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz5cclxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDd2MTBhMiAyIDAgMDAyIDJoMTRhMiAyIDAgMDAyLTJWOWEyIDIgMCAwMC0yLTJoLTZsLTItMkg1YTIgMiAwIDAwLTIgMnpcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0ZpbGUtQmFzZWQgUm91dGluZycsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0ludHVpdGl2ZSByb3V0aW5nIGJhc2VkIG9uIHlvdXIgZmlsZSBzdHJ1Y3R1cmUuIENyZWF0ZSBmaWxlcywgZ2V0IHJvdXRlcy4nXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgaWNvbjogKFxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctMTAgaC0xMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cInVybCgjZ3JhZGllbnQzKVwiIHN0cm9rZVdpZHRoPVwiMS41XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPVwiZ3JhZGllbnQzXCIgeDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjEwMCVcIiB5Mj1cIjEwMCVcIj48c3RvcCBvZmZzZXQ9XCIwJVwiIHN0b3BDb2xvcj1cIiNmNDNmNWVcIi8+PHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3BDb2xvcj1cIiNmOTczMTZcIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTIgMThoLjAxTTggMjFoOGEyIDIgMCAwMDItMlY1YTIgMiAwIDAwLTItMkg4YTIgMiAwIDAwLTIgMnYxNGEyIDIgMCAwMDIgMnpcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1VuaXZlcnNhbCBQbGF0Zm9ybScsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0RlcGxveSB0byBXZWIsIERlc2t0b3AsIGFuZCBNb2JpbGUgZnJvbSBhIHNpbmdsZSBSZWFjdCBjb2RlYmFzZS4nXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgaWNvbjogKFxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctMTAgaC0xMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cInVybCgjZ3JhZGllbnQ0KVwiIHN0cm9rZVdpZHRoPVwiMS41XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPVwiZ3JhZGllbnQ0XCIgeDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjEwMCVcIiB5Mj1cIjEwMCVcIj48c3RvcCBvZmZzZXQ9XCIwJVwiIHN0b3BDb2xvcj1cIiMxMGI5ODFcIi8+PHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3BDb2xvcj1cIiMxNGI4YTZcIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTIgMTV2Mm0tNiA0aDEyYTIgMiAwIDAwMi0ydi02YTIgMiAwIDAwLTItMkg2YTIgMiAwIDAwLTIgMnY2YTIgMiAwIDAwMiAyem0xMC0xMFY3YTQgNCAwIDAwLTggMHY0aDh6XCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdCdWlsdC1pbiBBdXRoJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSldUIGF1dGhlbnRpY2F0aW9uLCBiY3J5cHQgaGFzaGluZywgT0F1dGgsIGFuZCBzZXNzaW9uIG1hbmFnZW1lbnQuJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgIGljb246IChcclxuICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTEwIGgtMTBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJ1cmwoI2dyYWRpZW50NSlcIiBzdHJva2VXaWR0aD1cIjEuNVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD1cImdyYWRpZW50NVwiIHgxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIxMDAlXCIgeTI9XCIxMDAlXCI+PHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9XCIjOGI1Y2Y2XCIvPjxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wQ29sb3I9XCIjZDk0NmVmXCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTQgN3YxMGMwIDIuMjEgMy41ODIgNCA4IDRzOC0xLjc5IDgtNFY3TTQgN2MwIDIuMjEgMy41ODIgNCA4IDRzOC0xLjc5IDgtNE00IDdjMC0yLjIxIDMuNTgyLTQgOC00czggMS43OSA4IDRtMCA1YzAgMi4yMS0zLjU4MiA0LTggNHMtOC0xLjc5LTgtNFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnRGF0YWJhc2UgQWRhcHRlcnMnLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdQb3N0Z3JlU1FMLCBNb25nb0RCLCBTUUxpdGUsIGFuZCBQcmlzbWEgT1JNIHdpdGggdHlwZS1zYWZlIHF1ZXJpZXMuJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgIGljb246IChcclxuICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTEwIGgtMTBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJ1cmwoI2dyYWRpZW50NilcIiBzdHJva2VXaWR0aD1cIjEuNVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD1cImdyYWRpZW50NlwiIHgxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIxMDAlXCIgeTI9XCIxMDAlXCI+PHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9XCIjZjU5ZTBiXCIvPjxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wQ29sb3I9XCIjZmJiZjI0XCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwbDQtMTZtNCA0bDQgNC00IDRNNiAxNmwtNC00IDQtNFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnVHlwZVNjcmlwdCBSZWFkeScsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0Z1bGwgVHlwZVNjcmlwdCBzdXBwb3J0IHdpdGggYXV0by1nZW5lcmF0ZWQgdHlwZXMgYW5kIElERSBJbnRlbGxpU2Vuc2UuJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0ubWFwKChmZWF0dXJlLCBpZHgpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJncm91cCBwLTggYm9yZGVyLWIgbWQ6Ym9yZGVyLXIgYm9yZGVyLWdyYXktMjAwIGxhc3Q6Ym9yZGVyLWItMCBtZDpbJjpudGgtY2hpbGQoM24pXTpib3JkZXItci0wIGxnOlsmOm50aC1jaGlsZCgzbildOmJvcmRlci1yLTAgaG92ZXI6YmctZ3JheS01MCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi00XCI+e2ZlYXR1cmUuaWNvbn08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0yXCI+e2ZlYXR1cmUudGl0bGV9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDAgbGVhZGluZy1yZWxheGVkXCI+e2ZlYXR1cmUuZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICB7LyogU2hvd2Nhc2UgU2VjdGlvbiAtIFdpdGggSW1hZ2UgKi99XHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInB5LTI0IGJnLWdyYXktNTAgb3ZlcmZsb3ctaGlkZGVuXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGxnOmdyaWQtY29scy0yIGdhcC0xMiBsZzpnYXAtMjAgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRyYWNraW5nLXRpZ2h0IG1iLTZcIj5cclxuICAgICAgICAgICAgICAgIERldmVsb3BlciBFeHBlcmllbmNlXHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LWluZGlnby02MDBcIj5SZWRlZmluZWQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9oMj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtZ3JheS01MDAgbWItOCBsZWFkaW5nLXJlbGF4ZWRcIj5cclxuICAgICAgICAgICAgICAgIFdyaXRlIGxlc3MgY29kZSwgYnVpbGQgZmFzdGVyLiBJTkRKUyBoYW5kbGVzIHRoZSBjb21wbGV4aXR5IHdoaWxlIHlvdSBmb2N1cyBvbiBjcmVhdGluZyBhbWF6aW5nIHByb2R1Y3RzLlxyXG4gICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxyXG4gICAgICAgICAgICAgICAge1tcclxuICAgICAgICAgICAgICAgICAgeyB0aXRsZTogJ1plcm8gQ29uZmlndXJhdGlvbicsIGRlc2M6ICdTdGFydCBidWlsZGluZyBpbW1lZGlhdGVseSB3aXRoIHNlbnNpYmxlIGRlZmF1bHRzJyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHRpdGxlOiAnSG90IE1vZHVsZSBSZXBsYWNlbWVudCcsIGRlc2M6ICdTZWUgY2hhbmdlcyBpbnN0YW50bHkgd2l0aG91dCBwYWdlIHJlZnJlc2gnIH0sXHJcbiAgICAgICAgICAgICAgICAgIHsgdGl0bGU6ICdBdXRvbWF0aWMgQ29kZSBTcGxpdHRpbmcnLCBkZXNjOiAnT3B0aW1pemVkIGJ1bmRsZXMgZm9yIGZhc3RlciBwYWdlIGxvYWRzJyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHRpdGxlOiAnQnVpbHQtaW4gQVBJIFJvdXRlcycsIGRlc2M6ICdDcmVhdGUgYmFja2VuZCBlbmRwb2ludHMgYWxvbmdzaWRlIHlvdXIgcGFnZXMnIH0sXHJcbiAgICAgICAgICAgICAgICBdLm1hcCgoaXRlbSwgaWR4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImZsZXggZ2FwLTQgZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgdy04IGgtOCByb3VuZGVkLWxnIGJnLWluZGlnby0xMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ3JvdXAtaG92ZXI6YmctaW5kaWdvLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtaW5kaWdvLTYwMFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezJ9IGQ9XCJNNSAxM2w0IDRMMTkgN1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPntpdGVtLnRpdGxlfTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwXCI+e2l0ZW0uZGVzY308L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMTBcIj5cclxuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvZG9jc1wiPlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC02IHB5LTMgYmctZ3JheS05MDAgdGV4dC13aGl0ZSBmb250LXNlbWlib2xkIHJvdW5kZWQtbGcgaG92ZXI6YmctZ3JheS04MDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICBSZWFkIERvY3VtZW50YXRpb25cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNCBoLTRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17Mn0gZD1cIk05IDVsNyA3LTcgN1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIHsvKiBEYXNoYm9hcmQgUHJldmlldyBJbWFnZSAqL31cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLWluc2V0LTQgYmctZ3JhZGllbnQtdG8tciBmcm9tLWluZGlnby01MDAgdG8tcHVycGxlLTYwMCByb3VuZGVkLTJ4bCBvcGFjaXR5LTEwIGJsdXItMnhsXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSByb3VuZGVkLTJ4bCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LTJ4bCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIGJnLXdoaXRlXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIFxyXG4gICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU1NTA2NjkzMS00MzY1ZDE0YmFiOGM/dz04MDAmaD02MDAmZml0PWNyb3BcIiBcclxuICAgICAgICAgICAgICAgICAgYWx0PVwiQ29kZSBlZGl0b3Igc2hvd2luZyBJTkRKUyBwcm9qZWN0XCJcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtYXV0b1wiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXQgZnJvbS1ncmF5LTkwMC82MCB0by10cmFuc3BhcmVudCBmbGV4IGl0ZW1zLWVuZCBwLTZcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSBvcGFjaXR5LTgwXCI+TW9kZXJuIERldmVsb3BtZW50PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkXCI+QnVpbGQgd2l0aCBjb25maWRlbmNlPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICB7LyogUGxhdGZvcm0gQ2FyZHMgU2VjdGlvbiAqL31cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjQgYmctd2hpdGVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1iLTE2XCI+XHJcbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBzbTp0ZXh0LTV4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCB0cmFja2luZy10aWdodCBtYi00XCI+XHJcbiAgICAgICAgICAgICAgT25lIENvZGViYXNlLFxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTYwMFwiPiBFdmVyeSBQbGF0Zm9ybTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9oMj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14bCB0ZXh0LWdyYXktNTAwIG1heC13LTJ4bCBteC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgQnVpbGQgb25jZSBhbmQgZGVwbG95IHRvIHdlYiwgZGVza3RvcCwgYW5kIG1vYmlsZSB3aXRoIG5hdGl2ZSBwZXJmb3JtYW5jZS5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIG1kOmdyaWQtY29scy0zIGdhcC04XCI+XHJcbiAgICAgICAgICAgIHtbXHJcbiAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnV2ViJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRGVwbG95IHRvIFZlcmNlbCwgTmV0bGlmeSwgb3IgYW55IGhvc3Rpbmcgd2l0aCBTU1IsIFNTRywgYW5kIEVkZ2Ugc3VwcG9ydC4nLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ2MDkyNTg5NTkxNy1hZmRhYjgyN2M1MmY/dz01MDAmaD0zMDAmZml0PWNyb3AnLFxyXG4gICAgICAgICAgICAgICAgZmVhdHVyZXM6IFsnU2VydmVyLVNpZGUgUmVuZGVyaW5nJywgJ1N0YXRpYyBHZW5lcmF0aW9uJywgJ0FQSSBSb3V0ZXMnXSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnZnJvbS1ibHVlLTUwMCB0by1jeWFuLTUwMCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0Rlc2t0b3AnLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdOYXRpdmUgYXBwcyBmb3IgV2luZG93cywgbWFjT1MsIGFuZCBMaW51eCB3aXRoIEVsZWN0cm9uIGludGVncmF0aW9uLicsXHJcbiAgICAgICAgICAgICAgICBpbWFnZTogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE3Njk0NzEyMjAyLTE0ZGQ5NTM4YWE5Nz93PTUwMCZoPTMwMCZmaXQ9Y3JvcCcsXHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlczogWydOYXRpdmUgQVBJcycsICdBdXRvIFVwZGF0ZXMnLCAnU3lzdGVtIFRyYXknXSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnZnJvbS1wdXJwbGUtNTAwIHRvLXBpbmstNTAwJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnTW9iaWxlJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnaU9TIGFuZCBBbmRyb2lkIGFwcHMgdXNpbmcgQ2FwYWNpdG9yIHdpdGggbmF0aXZlIGRldmljZSBmZWF0dXJlcy4nLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxMjk0MTkzNzY2OS05MGExYjU4ZTdlOWM/dz01MDAmaD0zMDAmZml0PWNyb3AnLFxyXG4gICAgICAgICAgICAgICAgZmVhdHVyZXM6IFsnTmF0aXZlIFBsdWdpbnMnLCAnUHVzaCBOb3RpZmljYXRpb25zJywgJ0FwcCBTdG9yZSBSZWFkeSddLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdmcm9tLW9yYW5nZS01MDAgdG8tcmVkLTUwMCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLm1hcCgocGxhdGZvcm0sIGlkeCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImdyb3VwIGJnLXdoaXRlIHJvdW5kZWQtMnhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLWdyYXktMjAwIGhvdmVyOmJvcmRlci1ncmF5LTMwMCBob3ZlcjpzaGFkb3cteGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtNDggb3ZlcmZsb3ctaGlkZGVuXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWcgXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtwbGF0Zm9ybS5pbWFnZX0gXHJcbiAgICAgICAgICAgICAgICAgICAgYWx0PXtgJHtwbGF0Zm9ybS50aXRsZX0gZGV2ZWxvcG1lbnRgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIGdyb3VwLWhvdmVyOnNjYWxlLTEwNSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi01MDBcIlxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tdCAke3BsYXRmb3JtLmNvbG9yfSBvcGFjaXR5LTYwYH0+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTQgbGVmdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+e3BsYXRmb3JtLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNlwiPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIG1iLTRcIj57cGxhdGZvcm0uZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3BsYXRmb3JtLmZlYXR1cmVzLm1hcCgoZmVhdHVyZSwgZmlkeCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17ZmlkeH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LWdyYXktNTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby01MDBcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGxSdWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiBjbGlwUnVsZT1cImV2ZW5vZGRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2ZlYXR1cmV9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgIHsvKiBUZXN0aW1vbmlhbHMgLyBTdGF0cyBTZWN0aW9uICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBiZy1ncmF5LTkwMCB0ZXh0LXdoaXRlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIG1kOmdyaWQtY29scy00IGdhcC04IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIHtbXHJcbiAgICAgICAgICAgICAgeyB2YWx1ZTogJzEweCcsIGxhYmVsOiAnRmFzdGVyIERldmVsb3BtZW50JywgaWNvbjogWmFwSWNvbiwgY29sb3I6ICdmcm9tLWFtYmVyLTQwMCB0by1vcmFuZ2UtNTAwJyB9LFxyXG4gICAgICAgICAgICAgIHsgdmFsdWU6ICcxMDArJywgbGFiZWw6ICdDb21wb25lbnRzJywgaWNvbjogUHV6emxlSWNvbiwgY29sb3I6ICdmcm9tLXB1cnBsZS00MDAgdG8tcGluay01MDAnIH0sXHJcbiAgICAgICAgICAgICAgeyB2YWx1ZTogJzUwJScsIGxhYmVsOiAnTGVzcyBDb2RlJywgaWNvbjogRmlsZUVkaXRJY29uLCBjb2xvcjogJ2Zyb20tY3lhbi00MDAgdG8tYmx1ZS01MDAnIH0sXHJcbiAgICAgICAgICAgICAgeyB2YWx1ZTogJzMnLCBsYWJlbDogJ1BsYXRmb3JtcycsIGljb246IFJvY2tldEljb24sIGNvbG9yOiAnZnJvbS1ncmVlbi00MDAgdG8tZW1lcmFsZC01MDAnIH0sXHJcbiAgICAgICAgICAgIF0ubWFwKChzdGF0LCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBJY29uQ29tcG9uZW50ID0gc3RhdC5pY29uO1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJwLTYgZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2B3LTE2IGgtMTYgbXgtYXV0byBtYi00IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWJyICR7c3RhdC5jb2xvcn0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LWxnIGdyb3VwLWhvdmVyOnNjYWxlLTExMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDBgfT5cclxuICAgICAgICAgICAgICAgICAgICA8SWNvbkNvbXBvbmVudCBjbGFzc05hbWU9XCJ3LTggaC04IHRleHQtd2hpdGVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBmb250LWJvbGQgYmctZ3JhZGllbnQtdG8tciBmcm9tLWluZGlnby00MDAgdG8tcHVycGxlLTQwMCBiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudFwiPntzdGF0LnZhbHVlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgbXQtMiBmb250LW1lZGl1bVwiPntzdGF0LmxhYmVsfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgey8qIEhvdyBJdCBXb3JrcyBTZWN0aW9uICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBiZy13aGl0ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMTZcIj5cclxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRyYWNraW5nLXRpZ2h0IG1iLTRcIj5cclxuICAgICAgICAgICAgICBIb3cgSXQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tNjAwXCI+V29ya3M8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgdGV4dC1ncmF5LTUwMCBtYXgtdy0yeGwgbXgtYXV0b1wiPlxyXG4gICAgICAgICAgICAgIEdldCBzdGFydGVkIGluIG1pbnV0ZXMgd2l0aCBqdXN0IHRocmVlIHNpbXBsZSBzdGVwc1xyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgbWQ6Z3JpZC1jb2xzLTMgZ2FwLThcIj5cclxuICAgICAgICAgICAge2hvd0l0V29ya3MubWFwKChpdGVtLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBJY29uQ29tcG9uZW50ID0gaXRlbS5pY29uO1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJyZWxhdGl2ZSBncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICB7LyogQ29ubmVjdGlvbiBMaW5lICovfVxyXG4gICAgICAgICAgICAgICAgICB7aWR4IDwgaG93SXRXb3Jrcy5sZW5ndGggLSAxICYmIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiBtZDpibG9jayBhYnNvbHV0ZSB0b3AtMTYgbGVmdC0xLzIgdy1mdWxsIGgtMC41IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNTAwIHRvLXB1cnBsZS01MDBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgYmctZ3JheS01MCByb3VuZGVkLTJ4bCBwLTggaG92ZXI6c2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGhvdmVyOmJvcmRlci1pbmRpZ28tMjAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgey8qIFN0ZXAgTnVtYmVyICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC00IGxlZnQtOCB3LTggaC04IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNjAwIHRvLXB1cnBsZS02MDAgcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtc20gc2hhZG93LWxnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5zdGVwfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBJY29uICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xNCBoLTE0IGJnLWdyYWRpZW50LXRvLWJyIGZyb20taW5kaWdvLTEwMCB0by1wdXJwbGUtMTAwIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItNiBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8SWNvbkNvbXBvbmVudCBjbGFzc05hbWU9XCJ3LTcgaC03IHRleHQtaW5kaWdvLTYwMFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItM1wiPntpdGVtLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMCBtYi00XCI+e2l0ZW0uZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBDb2RlIFNuaXBwZXQgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTkwMCByb3VuZGVkLWxnIHAtMyBmb250LW1vbm8gdGV4dC1zbSB0ZXh0LWdyZWVuLTQwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgJCB7aXRlbS5jb2RlfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgIHsvKiBUZXN0aW1vbmlhbHMgU2VjdGlvbiAqL31cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjQgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1ncmF5LTUwIHRvLWluZGlnby01MFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMTZcIj5cclxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRyYWNraW5nLXRpZ2h0IG1iLTRcIj5cclxuICAgICAgICAgICAgICBMb3ZlZCBieSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWluZGlnby02MDBcIj5EZXZlbG9wZXJzPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtZ3JheS01MDAgbWF4LXctMnhsIG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICBTZWUgd2hhdCBkZXZlbG9wZXJzIGFyb3VuZCB0aGUgd29ybGQgYXJlIHNheWluZyBhYm91dCBJTkRKU1xyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgbWQ6Z3JpZC1jb2xzLTIgZ2FwLThcIj5cclxuICAgICAgICAgICAge3Rlc3RpbW9uaWFscy5tYXAoKHRlc3RpbW9uaWFsLCBpZHgpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e2lkeH1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIGJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtOCBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBib3JkZXIgYm9yZGVyLWdyYXktMTAwXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7LyogUXVvdGUgSWNvbiAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC00IC1sZWZ0LTIgdy0xMiBoLTEyIGJnLWdyYWRpZW50LXRvLWJyIGZyb20taW5kaWdvLTUwMCB0by1wdXJwbGUtNjAwIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm90YXRlLTEyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxRdW90ZUljb24gY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LXdoaXRlIC1yb3RhdGUtMTJcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHsvKiBTdGFycyAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMSBtYi00IG1sLThcIj5cclxuICAgICAgICAgICAgICAgICAge1suLi5BcnJheSh0ZXN0aW1vbmlhbC5yYXRpbmcpXS5tYXAoKF8sIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICA8U3Rhckljb24ga2V5PXtpfSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtYW1iZXItNDAwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgey8qIENvbnRlbnQgKi99XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIHRleHQtbGcgbGVhZGluZy1yZWxheGVkIG1iLTZcIj5cclxuICAgICAgICAgICAgICAgICAgXCJ7dGVzdGltb25pYWwuY29udGVudH1cIlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB7LyogQXV0aG9yICovfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxyXG4gICAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXt0ZXN0aW1vbmlhbC5hdmF0YXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgYWx0PXt0ZXN0aW1vbmlhbC5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTIgaC0xMiByb3VuZGVkLWZ1bGwgb2JqZWN0LWNvdmVyIHJpbmctMiByaW5nLWluZGlnby0xMDBcIlxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj57dGVzdGltb25pYWwubmFtZX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTUwMFwiPnt0ZXN0aW1vbmlhbC5yb2xlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgey8qIFRydXN0ZWQgQnkgU2VjdGlvbiAqL31cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMTYgYmctd2hpdGUgYm9yZGVyLXkgYm9yZGVyLWdyYXktMTAwXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi0xMFwiPlxyXG4gICAgICAgICAgICBUcnVzdGVkIGJ5IGlubm92YXRpdmUgY29tcGFuaWVzIHdvcmxkd2lkZVxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIG1kOmdyaWQtY29scy02IGdhcC04IGl0ZW1zLWNlbnRlciBvcGFjaXR5LTYwIGdyYXlzY2FsZSBob3ZlcjpncmF5c2NhbGUtMCBob3ZlcjpvcGFjaXR5LTEwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDBcIj5cclxuICAgICAgICAgICAge1tcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdWZXJjZWwnLCBsZXR0ZXI6ICdWJyB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ1N0cmlwZScsIGxldHRlcjogJ1MnIH0sXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiAnTm90aW9uJywgbGV0dGVyOiAnTicgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdMaW5lYXInLCBsZXR0ZXI6ICdMJyB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ0ZpZ21hJywgbGV0dGVyOiAnRicgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdEaXNjb3JkJywgbGV0dGVyOiAnRCcgfSxcclxuICAgICAgICAgICAgXS5tYXAoKGNvbXBhbnksIGlkeCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdyb3VwIGN1cnNvci1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIGJnLWdyYXktOTAwIHJvdW5kZWQtbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LWxnXCI+e2NvbXBhbnkubGV0dGVyfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgaGlkZGVuIHNtOmJsb2NrXCI+e2NvbXBhbnkubmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgey8qIEZBUSBTZWN0aW9uICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBiZy1ncmF5LTUwXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy00eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYi0xNlwiPlxyXG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC00eGwgc206dGV4dC01eGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgdHJhY2tpbmctdGlnaHQgbWItNFwiPlxyXG4gICAgICAgICAgICAgIEZyZXF1ZW50bHkgQXNrZWQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tNjAwXCI+UXVlc3Rpb25zPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtZ3JheS01MDAgbWF4LXctMnhsIG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICBFdmVyeXRoaW5nIHlvdSBuZWVkIHRvIGtub3cgYWJvdXQgSU5ESlNcclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cclxuICAgICAgICAgICAge2ZhcXMubWFwKChmYXEsIGlkeCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17aWR4fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIG92ZXJmbG93LWhpZGRlbiBob3Zlcjpib3JkZXItaW5kaWdvLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuRmFxKG9wZW5GYXEgPT09IGlkeCA/IG51bGwgOiBpZHgpfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtNiBweS01IHRleHQtbGVmdCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj57ZmFxLnF1ZXN0aW9ufTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiBcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTUgaC01IHRleHQtZ3JheS01MDAgZmxleC1zaHJpbmstMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDAgJHtcclxuICAgICAgICAgICAgICAgICAgICAgIG9wZW5GYXEgPT09IGlkeCA/ICdyb3RhdGUtMTgwJyA6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgb3ZlcmZsb3ctaGlkZGVuIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5GYXEgPT09IGlkeCA/ICdtYXgtaC05NiBvcGFjaXR5LTEwMCcgOiAnbWF4LWgtMCBvcGFjaXR5LTAnXHJcbiAgICAgICAgICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTYgcGItNSB0ZXh0LWdyYXktNjAwIGxlYWRpbmctcmVsYXhlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHtmYXEuYW5zd2VyfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICB7LyogQ29udGFjdCBTZWN0aW9uICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBiZy1ncmFkaWVudC10by1iciBmcm9tLWluZGlnby05MDAgdmlhLXB1cnBsZS05MDAgdG8taW5kaWdvLTkwMCB0ZXh0LXdoaXRlIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxyXG4gICAgICAgIHsvKiBCYWNrZ3JvdW5kIFBhdHRlcm4gKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIG9wYWNpdHktMTBcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmlkLXdoaXRlIGJnLVtzaXplOjMwcHhfMzBweF1cIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG1heC13LTR4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB3LTE2IGgtMTYgYmctd2hpdGUvMTAgYmFja2Ryb3AtYmx1ciByb3VuZGVkLTJ4bCBtYi04XCI+XHJcbiAgICAgICAgICAgIDxNYWlsSWNvbiBjbGFzc05hbWU9XCJ3LTggaC04IHRleHQtd2hpdGVcIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBzbTp0ZXh0LTR4bCBmb250LWJvbGQgbWItNFwiPlxyXG4gICAgICAgICAgICBHZXQgSW4gVG91Y2hcclxuICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxnIHRleHQtaW5kaWdvLTIwMCBtYi0xMCBtYXgtdy14bCBteC1hdXRvXCI+XHJcbiAgICAgICAgICAgIEhhdmUgcXVlc3Rpb25zIG9yIHdhbnQgdG8gY29sbGFib3JhdGU/IFJlYWNoIG91dCB0aHJvdWdoIGFueSBvZiB0aGVzZSBjaGFubmVscy5cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtNlwiPlxyXG4gICAgICAgICAgICB7LyogRW1haWwgKi99XHJcbiAgICAgICAgICAgIDxhIFxyXG4gICAgICAgICAgICAgIGhyZWY9XCJtYWlsdG86cm9oaXRzaGFybWFkZXYxQG91dGxvb2suY29tXCIgXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcHgtNiBweS00IGJnLXdoaXRlLzEwIGJhY2tkcm9wLWJsdXIgYm9yZGVyIGJvcmRlci13aGl0ZS8yMCByb3VuZGVkLXhsIGhvdmVyOmJnLXdoaXRlLzIwIHRyYW5zaXRpb24tYWxsIGdyb3VwXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIGJnLXdoaXRlLzEwIHJvdW5kZWQtbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtXCI+XHJcbiAgICAgICAgICAgICAgICA8TWFpbEljb24gY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXdoaXRlXCIgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtaW5kaWdvLTMwMFwiPkVtYWlsPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1tZWRpdW1cIj5yb2hpdHNoYXJtYWRldjFAb3V0bG9vay5jb208L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgey8qIFBob25lICovfVxyXG4gICAgICAgICAgICA8YSBcclxuICAgICAgICAgICAgICBocmVmPVwidGVsOis5MTYzNzcyODkzMjRcIiBcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBweC02IHB5LTQgYmctd2hpdGUvMTAgYmFja2Ryb3AtYmx1ciBib3JkZXIgYm9yZGVyLXdoaXRlLzIwIHJvdW5kZWQteGwgaG92ZXI6Ymctd2hpdGUvMjAgdHJhbnNpdGlvbi1hbGwgZ3JvdXBcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgYmctd2hpdGUvMTAgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm1cIj5cclxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXdoaXRlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIyIDE2LjkydjNhMiAyIDAgMCAxLTIuMTggMiAxOS43OSAxOS43OSAwIDAgMS04LjYzLTMuMDcgMTkuNSAxOS41IDAgMCAxLTYtNiAxOS43OSAxOS43OSAwIDAgMS0zLjA3LTguNjdBMiAyIDAgMCAxIDQuMTEgMmgzYTIgMiAwIDAgMSAyIDEuNzIgMTIuODQgMTIuODQgMCAwIDAgLjcgMi44MSAyIDIgMCAwIDEtLjQ1IDIuMTFMOC4wOSA5LjkxYTE2IDE2IDAgMCAwIDYgNmwxLjI3LTEuMjdhMiAyIDAgMCAxIDIuMTEtLjQ1IDEyLjg0IDEyLjg0IDAgMCAwIDIuODEuN0EyIDIgMCAwIDEgMjIgMTYuOTJ6XCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1pbmRpZ28tMzAwXCI+UGhvbmU8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LW1lZGl1bVwiPis5MSA2Mzc3Mjg5MzI0PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHsvKiBMaW5rZWRJbiAqL31cclxuICAgICAgICAgICAgPGEgXHJcbiAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9yb2hpdC1zaGFybWEtNjM3Ny1kZXYvXCIgXHJcbiAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBweC02IHB5LTQgYmctd2hpdGUvMTAgYmFja2Ryb3AtYmx1ciBib3JkZXIgYm9yZGVyLXdoaXRlLzIwIHJvdW5kZWQteGwgaG92ZXI6Ymctd2hpdGUvMjAgdHJhbnNpdGlvbi1hbGwgZ3JvdXBcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgYmctd2hpdGUvMTAgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm1cIj5cclxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXdoaXRlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yMC40NDcgMjAuNDUyaC0zLjU1NHYtNS41NjljMC0xLjMyOC0uMDI3LTMuMDM3LTEuODUyLTMuMDM3LTEuODUzIDAtMi4xMzYgMS40NDUtMi4xMzYgMi45Mzl2NS42NjdIOS4zNTFWOWgzLjQxNHYxLjU2MWguMDQ2Yy40NzctLjkgMS42MzctMS44NSAzLjM3LTEuODUgMy42MDEgMCA0LjI2NyAyLjM3IDQuMjY3IDUuNDU1djYuMjg2ek01LjMzNyA3LjQzM2MtMS4xNDQgMC0yLjA2My0uOTI2LTIuMDYzLTIuMDY1IDAtMS4xMzguOTItMi4wNjMgMi4wNjMtMi4wNjMgMS4xNCAwIDIuMDY0LjkyNSAyLjA2NCAyLjA2MyAwIDEuMTM5LS45MjUgMi4wNjUtMi4wNjQgMi4wNjV6bTEuNzgyIDEzLjAxOUgzLjU1NVY5aDMuNTY0djExLjQ1MnpNMjIuMjI1IDBIMS43NzFDLjc5MiAwIDAgLjc3NCAwIDEuNzI5djIwLjU0MkMwIDIzLjIyNy43OTIgMjQgMS43NzEgMjRoMjAuNDUxQzIzLjIgMjQgMjQgMjMuMjI3IDI0IDIyLjI3MVYxLjcyOUMyNCAuNzc0IDIzLjIgMCAyMi4yMjIgMGguMDAzelwiLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1pbmRpZ28tMzAwXCI+TGlua2VkSW48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LW1lZGl1bVwiPnJvaGl0LXNoYXJtYS02Mzc3LWRldjwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgey8qIENUQSBTZWN0aW9uIC0gTW9kZXJuIFN0eWxlICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBweS0yNCBvdmVyZmxvdy1oaWRkZW5cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tNjAwIHZpYS1wdXJwbGUtNjAwIHRvLXBpbmstNjAwXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIG9wYWNpdHktMzBcIj5cclxuICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbFwiIHZpZXdCb3g9XCIwIDAgMTQ0MCA4MDBcIiBmaWxsPVwibm9uZVwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMjAwXCIgY3k9XCIyMDBcIiByPVwiMzAwXCIgZmlsbD1cIndoaXRlXCIgZmlsbE9wYWNpdHk9XCIwLjFcIi8+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIxMjAwXCIgY3k9XCI2MDBcIiByPVwiNDAwXCIgZmlsbD1cIndoaXRlXCIgZmlsbE9wYWNpdHk9XCIwLjFcIi8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG1heC13LTR4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC00eGwgc206dGV4dC01eGwgbGc6dGV4dC02eGwgZm9udC1ib2xkIHRleHQtd2hpdGUgbWItNiB0cmFja2luZy10aWdodFwiPlxyXG4gICAgICAgICAgICBSZWFkeSB0byBzaGlwIGZhc3Rlcj9cclxuICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtd2hpdGUvODAgbWItMTAgbWF4LXctMnhsIG14LWF1dG9cIj5cclxuICAgICAgICAgICAgU3RhcnQgYnVpbGRpbmcgeW91ciBuZXh0IHByb2plY3Qgd2l0aCBJTkRKUyB0b2RheS4gWmVybyBjb25maWd1cmF0aW9uLCBtYXhpbXVtIHByb2R1Y3Rpdml0eS5cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBnYXAtNCBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8TGluayBocmVmPVwiL2RvY3NcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImdyb3VwIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweC04IHB5LTQgYmctd2hpdGUgdGV4dC1ncmF5LTkwMCBmb250LXNlbWlib2xkIHJvdW5kZWQteGwgaG92ZXI6YmctZ3JheS0xMDAgdHJhbnNpdGlvbi1hbGwgc2hhZG93LWxnXCI+XHJcbiAgICAgICAgICAgICAgICBHZXQgU3RhcnRlZFxyXG4gICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTUgaC01IGdyb3VwLWhvdmVyOnRyYW5zbGF0ZS14LTAuNSB0cmFuc2l0aW9uLXRyYW5zZm9ybVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezJ9IGQ9XCJNMTMgN2w1IDVtMCAwbC01IDVtNS01SDZcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL1JvaGl0c2hhcm1hNjM3Ny9JTkRcIlxyXG4gICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHB4LTggcHktNCBiZy13aGl0ZS8xMCBiYWNrZHJvcC1ibHVyIHRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvMjAgaG92ZXI6Ymctd2hpdGUvMjAgdHJhbnNpdGlvbi1hbGxcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTUgaC01XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGxSdWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTIgMkM2LjQ3NyAyIDIgNi40ODQgMiAxMi4wMTdjMCA0LjQyNSAyLjg2NSA4LjE4IDYuODM5IDkuNTA0LjUuMDkyLjY4Mi0uMjE3LjY4Mi0uNDgzIDAtLjIzNy0uMDA4LS44NjgtLjAxMy0xLjcwMy0yLjc4Mi42MDUtMy4zNjktMS4zNDMtMy4zNjktMS4zNDMtLjQ1NC0xLjE1OC0xLjExLTEuNDY2LTEuMTEtMS40NjYtLjkwOC0uNjIuMDY5LS42MDguMDY5LS42MDggMS4wMDMuMDcgMS41MzEgMS4wMzIgMS41MzEgMS4wMzIuODkyIDEuNTMgMi4zNDEgMS4wODggMi45MS44MzIuMDkyLS42NDcuMzUtMS4wODguNjM2LTEuMzM4LTIuMjItLjI1My00LjU1NS0xLjExMy00LjU1NS00Ljk1MSAwLTEuMDkzLjM5LTEuOTg4IDEuMDI5LTIuNjg4LS4xMDMtLjI1My0uNDQ2LTEuMjcyLjA5OC0yLjY1IDAgMCAuODQtLjI3IDIuNzUgMS4wMjZBOS41NjQgOS41NjQgMCAwMTEyIDYuODQ0Yy44NS4wMDQgMS43MDUuMTE1IDIuNTA0LjMzNyAxLjkwOS0xLjI5NiAyLjc0Ny0xLjAyNyAyLjc0Ny0xLjAyNy41NDYgMS4zNzkuMjAyIDIuMzk4LjEgMi42NTEuNjQuNyAxLjAyOCAxLjU5NSAxLjAyOCAyLjY4OCAwIDMuODQ4LTIuMzM5IDQuNjk1LTQuNTY2IDQuOTQzLjM1OS4zMDkuNjc4LjkyLjY3OCAxLjg1NSAwIDEuMzM4LS4wMTIgMi40MTktLjAxMiAyLjc0NyAwIC4yNjguMTguNTguNjg4LjQ4MkExMC4wMTkgMTAuMDE5IDAgMDAyMiAxMi4wMTdDMjIgNi40ODQgMTcuNTIyIDIgMTIgMnpcIiBjbGlwUnVsZT1cImV2ZW5vZGRcIiAvPlxyXG4gICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIFZpZXcgb24gR2l0SHViXHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3NlY3Rpb24+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59IiwgIi8qKlxuICogUGxhdGZvcm0gZGV0ZWN0aW9uIHV0aWxpdGllcyBmb3IgSU5ESlNcbiAqXG4gKiBVc2FnZTpcbiAqIGltcG9ydCB7IGlzV2ViLCBpc0Rlc2t0b3AsIGlzTW9iaWxlLCBpc0FuZHJvaWQsIGlzSU9TLCBwbGF0Zm9ybSB9IGZyb20gJ2luZGpzJztcbiAqXG4gKiBpZiAoaXNNb2JpbGUpIHsgLi4uIH1cbiAqL1xuXG4vLyBDaGVjayBpZiBydW5uaW5nIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudFxuY29uc3QgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIjtcblxuLy8gRWxlY3Ryb24gZGV0ZWN0aW9uIChyZW5kZXJlciBwcm9jZXNzKVxuZXhwb3J0IGNvbnN0IGlzRGVza3RvcCA9XG4gIGlzQnJvd3NlciAmJlxuICAod2luZG93LnByb2Nlc3M/LnR5cGUgPT09IFwicmVuZGVyZXJcIiB8fFxuICAgICEhd2luZG93LmVsZWN0cm9uIHx8XG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkVsZWN0cm9uXCIpKTtcblxuLy8gQ2FwYWNpdG9yIGRldGVjdGlvblxuZXhwb3J0IGNvbnN0IGlzTW9iaWxlID1cbiAgaXNCcm93c2VyICYmXG4gICghIXdpbmRvdy5DYXBhY2l0b3IgfHxcbiAgICAhIXdpbmRvdy5hbmRyb2lkQnJpZGdlIHx8XG4gICAgISF3aW5kb3cud2Via2l0Py5tZXNzYWdlSGFuZGxlcnM/LmJyaWRnZSB8fFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJDYXBhY2l0b3JcIikpO1xuXG4vLyBTcGVjaWZpYyBtb2JpbGUgcGxhdGZvcm1zXG5leHBvcnQgY29uc3QgaXNBbmRyb2lkID0gaXNNb2JpbGUgJiYgL2FuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuZXhwb3J0IGNvbnN0IGlzSU9TID0gaXNNb2JpbGUgJiYgL2lwaG9uZXxpcGFkfGlwb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vLyBXZWIgZmFsbGJhY2sgKGlmIG5vdCBkZXNrdG9wIG9yIG1vYmlsZSBhcHApXG5leHBvcnQgY29uc3QgaXNXZWIgPSAhaXNEZXNrdG9wICYmICFpc01vYmlsZTtcblxuLy8gR2V0IGN1cnJlbnQgcGxhdGZvcm0gbmFtZVxuZXhwb3J0IGNvbnN0IHBsYXRmb3JtID0gKCgpID0+IHtcbiAgaWYgKGlzRGVza3RvcCkgcmV0dXJuIFwiZGVza3RvcFwiO1xuICBpZiAoaXNBbmRyb2lkKSByZXR1cm4gXCJhbmRyb2lkXCI7XG4gIGlmIChpc0lPUykgcmV0dXJuIFwiaW9zXCI7XG4gIGlmIChpc01vYmlsZSkgcmV0dXJuIFwibW9iaWxlXCI7IC8vIGZhbGxiYWNrXG4gIHJldHVybiBcIndlYlwiO1xufSkoKTtcblxuLy8gUmVhY3QgTmF0aXZlIGNvbXBhdGlibGUgQVBJXG5leHBvcnQgY29uc3QgT1MgPSBwbGF0Zm9ybTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IChvYmopID0+IHtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShPUykpIHJldHVybiBvYmpbT1NdO1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KFwibmF0aXZlXCIpICYmIGlzTW9iaWxlKSByZXR1cm4gb2JqW1wibmF0aXZlXCJdO1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KFwiZGVmYXVsdFwiKSkgcmV0dXJuIG9ialtcImRlZmF1bHRcIl07XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzV2ViLFxuICBpc0Rlc2t0b3AsXG4gIGlzTW9iaWxlLFxuICBpc0FuZHJvaWQsXG4gIGlzSU9TLFxuICBwbGF0Zm9ybSxcbiAgT1MsXG4gIHNlbGVjdCxcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgSW1hZ2UgPSBmb3J3YXJkUmVmKCh7IHN0eWxlLCBzb3VyY2UsIHNyYywgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJpbWFnZVwiKTtcblxuICAvLyBSZWFjdCBOYXRpdmUgdXNlcyAnc291cmNlJywgV2ViIHVzZXMgJ3NyYycuXG4gIC8vIFdlIHN1cHBvcnQgYm90aCBwcm9wcyBmb3IgdW5pdmVyc2FsIHVzYWdlLlxuICBjb25zdCBpbWFnZVNvdXJjZSA9IHNyYyB8fCAoc291cmNlICYmIHNvdXJjZS51cmkpIHx8IFwiXCI7XG5cbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgLi4ucmVzdCxcbiAgICBzcmM6IGltYWdlU291cmNlLFxuICAgIHJlZixcbiAgfTtcblxuICBpZiAoQ29tcG9uZW50ICE9PSBcImltZ1wiICYmIENvbXBvbmVudCAhPT0gXCJpbWFnZVwiKSB7XG4gICAgLy8gSWYgaXQgcmVmZXJzIHRvIFJlYWN0IE5hdGl2ZSBJbWFnZSwgaXQgZXhwZWN0cyAnc291cmNlJ1xuICAgIHByb3BzLnNvdXJjZSA9IHNvdXJjZSB8fCB7IHVyaTogc3JjIH07XG4gICAgZGVsZXRlIHByb3BzLnNyYztcbiAgfVxuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gPENvbXBvbmVudCBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucHJvcHN9IC8+O1xufSk7XG5cbkltYWdlLmRpc3BsYXlOYW1lID0gXCJJbWFnZVwiO1xuZXhwb3J0IGRlZmF1bHQgSW1hZ2U7XG4iLCAiZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVFbGVtZW50KHR5cGUpIHtcbiAgY29uc3QgcGxhdGZvcm0gPSB0eXBlb2YgUExBVEZPUk0gIT09IFwidW5kZWZpbmVkXCIgPyBQTEFURk9STSA6IFwid2ViXCI7XG5cbiAgaWYgKHBsYXRmb3JtID09PSBcIndlYlwiKSB7XG4gICAgY29uc3Qgd2ViTWFwID0ge1xuICAgICAgdmlldzogXCJkaXZcIixcbiAgICAgIHRleHQ6IFwic3BhblwiLFxuICAgICAgaW1hZ2U6IFwiaW1nXCIsXG4gICAgICBpbWFnZWJhY2tncm91bmQ6IFwiZGl2XCIsIC8vIG1hcCBpbWFnZS1iYWNrZ3JvdW5kIHRvIGRpdiB3aXRoIHN0eWxlXG4gICAgICBzY3JvbGx2aWV3OiBcImRpdlwiLFxuICAgICAgZmxhdGxpc3Q6IFwiZGl2XCIsXG4gICAgICBzZWN0aW9ubGlzdDogXCJkaXZcIixcbiAgICAgIGtleWJvYXJkYXZvaWRpbmd2aWV3OiBcImRpdlwiLFxuICAgICAgc2FmZWFyZWF2aWV3OiBcImRpdlwiLFxuICAgICAgcHJlc3NhYmxlOiBcImJ1dHRvblwiLFxuICAgICAgdG91Y2hhYmxlb3BhY2l0eTogXCJidXR0b25cIixcbiAgICAgIHRvdWNoYWJsZWhpZ2hsaWdodDogXCJidXR0b25cIixcbiAgICAgIHN3aXRjaDogXCJpbnB1dFwiLCAvLyB0eXBlPSdjaGVja2JveCdcbiAgICAgIHRleHRhcmVhOiBcInRleHRhcmVhXCIsXG4gICAgICBidXR0b246IFwiYnV0dG9uXCIsXG4gICAgICBtb2RhbDogXCJkaXZcIixcbiAgICAgIGFjdGl2aXR5aW5kaWNhdG9yOiBcImRpdlwiLFxuICAgICAgcmVmcmVzaGNvbnRyb2w6IFwiZGl2XCIsXG4gICAgfTtcbiAgICByZXR1cm4gd2ViTWFwW3R5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tL2csIFwiXCIpXSB8fCBcImRpdlwiO1xuICB9XG5cbiAgaWYgKHBsYXRmb3JtID09PSBcIm1vYmlsZVwiKSB7XG4gICAgLy8gSW4gUmVhY3QgTmF0aXZlLCBjb21wb25lbnRzIGFyZSBDYW1lbENhc2VcbiAgICAvLyBXZSBuZWVkIHRvIG1hcCBnZW5lcmljIG5hbWVzIHRvIFJOIG5hbWVzXG4gICAgY29uc3QgbW9iaWxlTWFwID0ge1xuICAgICAgdmlldzogXCJWaWV3XCIsXG4gICAgICB0ZXh0OiBcIlRleHRcIixcbiAgICAgIGltYWdlOiBcIkltYWdlXCIsXG4gICAgICBpbWFnZWJhY2tncm91bmQ6IFwiSW1hZ2VCYWNrZ3JvdW5kXCIsXG4gICAgICBzY3JvbGx2aWV3OiBcIlNjcm9sbFZpZXdcIixcbiAgICAgIGZsYXRsaXN0OiBcIkZsYXRMaXN0XCIsXG4gICAgICBzZWN0aW9ubGlzdDogXCJTZWN0aW9uTGlzdFwiLFxuICAgICAga2V5Ym9hcmRhdm9pZGluZ3ZpZXc6IFwiS2V5Ym9hcmRBdm9pZGluZ1ZpZXdcIixcbiAgICAgIHNhZmVhcmVhdmlldzogXCJTYWZlQXJlYVZpZXdcIixcbiAgICAgIHByZXNzYWJsZTogXCJQcmVzc2FibGVcIixcbiAgICAgIHRvdWNoYWJsZW9wYWNpdHk6IFwiVG91Y2hhYmxlT3BhY2l0eVwiLFxuICAgICAgdG91Y2hhYmxlaGlnaGxpZ2h0OiBcIlRvdWNoYWJsZUhpZ2hsaWdodFwiLFxuICAgICAgc3dpdGNoOiBcIlN3aXRjaFwiLFxuICAgICAgbW9kYWw6IFwiTW9kYWxcIixcbiAgICAgIGFjdGl2aXR5aW5kaWNhdG9yOiBcIkFjdGl2aXR5SW5kaWNhdG9yXCIsXG4gICAgICByZWZyZXNoY29udHJvbDogXCJSZWZyZXNoQ29udHJvbFwiLFxuICAgICAgYnV0dG9uOiBcIkJ1dHRvblwiLFxuICAgIH07XG4gICAgY29uc3Qgcm5OYW1lID1cbiAgICAgIG1vYmlsZU1hcFt0eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIlwiKV0gfHwgY2FwaXRhbGl6ZSh0eXBlKTtcblxuICAgIC8vIFNhZmV0eSBjaGVjayBmb3IgUmVhY3QgTmF0aXZlIGVudmlyb25tZW50XG4gICAgLy8gcmVhY3QtbmF0aXZlLXdlYiBtaWdodCBiZSBhbGlhc2VkLCBvciB3ZSBtaWdodCBiZSBpbiBhIHJlYWwgUk4gZW52aXJvbm1lbnRcbiAgICB0cnkge1xuICAgICAgLy8gVXNpbmcgZ2xvYmFsIGNoZWNrIG9yIHNhZmUgcmVxdWlyZVxuICAgICAgaWYgKHR5cGVvZiByZXF1aXJlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKFwicmVhY3QtbmF0aXZlXCIpW3JuTmFtZV07XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHdpbmRvdy5SZWFjdCAmJlxuICAgICAgICB3aW5kb3cuUmVhY3QuTmF0aXZlXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5SZWFjdC5OYXRpdmVbcm5OYW1lXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFJlYWN0IE5hdGl2ZSBjb21wb25lbnQgJHtybk5hbWV9IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgICAvLyBGYWxsYmFjayB0byBWaWV3IG9yIGRpdiBkZXBlbmRpbmcgb24gY29udGV4dCwgYnV0IFZpZXcgaXMgc2FmZSBlbm91Z2ggZm9yIGxvZ2ljYWwgcmV0dXJuIGlmIG1vY2tlZFxuICAgIHJldHVybiBcIlZpZXdcIjtcbiAgfVxuXG4gIHJldHVybiBcImRpdlwiO1xufVxuIiwgIi8vIE1vY2sgU3R5bGVTaGVldCBmb3IgY29tcGF0aWJpbGl0eS5cbi8vIEluIElOREpTIHdlYiwgd2UgdXN1YWxseSB1c2Ugc3RhbmRhcmQgc3R5bGUgb2JqZWN0cyBvciBDU1MuXG4vLyBUaGlzIGFsbG93cyBTdHlsZVNoZWV0LmNyZWF0ZSh7fSkgdG8gcmV0dXJuIHRoZSBvYmplY3RzIGFzLWlzLlxuXG5leHBvcnQgY29uc3QgU3R5bGVTaGVldCA9IHtcbiAgY3JlYXRlOiAoc3R5bGVzKSA9PiBzdHlsZXMsXG4gIGZsYXR0ZW46IChzdHlsZXMpID0+IHtcbiAgICBpZiAoIXN0eWxlcykgcmV0dXJuIHt9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN0eWxlcykpIHtcbiAgICAgIHJldHVybiBzdHlsZXNcbiAgICAgICAgLmZsYXQoSW5maW5pdHkpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gKGl0ZW0gPyB7IC4uLmFjYywgLi4uaXRlbSB9IDogYWNjKSwge30pO1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9LFxuICBoYWlybGluZVdpZHRoOiAxLFxuICBhYnNvbHV0ZUZpbGw6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIGJvdHRvbTogMCxcbiAgfSxcbiAgYWJzb2x1dGVGaWxsT2JqZWN0OiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIHRvcDogMCxcbiAgICBib3R0b206IDAsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdHlsZVNoZWV0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuLy8gSU5ESlMgTGluayBjb21wb25lbnQgLSBsaWdodHdlaWdodCBjbGllbnQtc2lkZSBuYXZpZ2F0aW9uIGhlbHBlclxuLy8gUGVyZm9ybXMgU1BBLWxpa2UgbmF2aWdhdGlvbiBmb3Igc2FtZS1vcmlnaW4gaW50ZXJuYWwgbGlua3MuXG4vLyBQcm9wczogaHJlZiwgcHJlZmV0Y2gsIHJlcGxhY2UsIHNjcm9sbCAoZGVmYXVsdCB0cnVlKSwgb25DbGljaywgdGFyZ2V0LCByZWwsIGNsYXNzTmFtZSwgc3R5bGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpbmsoe1xuICBocmVmLFxuICBjaGlsZHJlbixcbiAgcHJlZmV0Y2ggPSBmYWxzZSxcbiAgcmVwbGFjZSA9IGZhbHNlLFxuICBzY3JvbGwgPSB0cnVlLFxuICBvbkNsaWNrLFxuICBjbGFzc05hbWUsXG4gIHN0eWxlLFxuICB0YXJnZXQsXG4gIHJlbCxcbiAgLi4ucmVzdFxufSkge1xuICAvLyBCYXNpYyBwcmVmZXRjaDogaGludCB0aGUgYnJvd3NlciB2aWEgPGxpbmsgcmVsPVwicHJlZmV0Y2hcIj5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXByZWZldGNoIHx8ICFocmVmKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgICAgIGwucmVsID0gXCJwcmVmZXRjaFwiO1xuICAgICAgbC5ocmVmID0gaHJlZjtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQobCk7XG4gICAgICAgIH0gY2F0Y2gge31cbiAgICAgIH07XG4gICAgfSBjYXRjaCB7fVxuICB9LCBbaHJlZiwgcHJlZmV0Y2hdKTtcblxuICBjb25zdCBoYW5kbGVDbGljayA9IChlKSA9PiB7XG4gICAgaWYgKG9uQ2xpY2spIG9uQ2xpY2soZSk7XG4gICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuICAgIC8vIE9ubHkgaW50ZXJjZXB0IHNpbXBsZSBsZWZ0LWNsaWNrcyB3aXRob3V0IG1vZGlmaWVyIGtleXNcbiAgICBpZiAoZS5idXR0b24gIT09IDAgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5KVxuICAgICAgcmV0dXJuO1xuICAgIGlmICghaHJlZikgcmV0dXJuO1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBcIl9zZWxmXCIpIHJldHVybjtcbiAgICBsZXQgdXJsO1xuICAgIHRyeSB7XG4gICAgICB1cmwgPSBuZXcgVVJMKGhyZWYsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSW52YWxpZCBVUkwsIGxldCBicm93c2VyIGhhbmRsZVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBTa2lwIG5vbi1odHRwKHMpIHByb3RvY29scyBhbmQgc3BlY2lhbCBzY2hlbWVzXG4gICAgY29uc3QgcHJvdG8gPSB1cmwucHJvdG9jb2w7XG4gICAgaWYgKHByb3RvICYmIHByb3RvICE9PSBcImh0dHA6XCIgJiYgcHJvdG8gIT09IFwiaHR0cHM6XCIpIHJldHVybjtcbiAgICAvLyBFeHRlcm5hbFxuICAgIGlmICh1cmwub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSByZXR1cm47XG4gICAgLy8gUmVzcGVjdCBkb3dubG9hZCBsaW5rc1xuICAgIGlmIChyZXN0LmRvd25sb2FkKSByZXR1cm47XG4gICAgLy8gSGFzaC1vbmx5IG5hdmlnYXRpb24gb3B0aW1pemF0aW9uXG4gICAgY29uc3QgY3VycmVudCA9XG4gICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgY29uc3QgbmV4dCA9IHVybC5wYXRobmFtZSArIHVybC5zZWFyY2ggKyB1cmwuaGFzaDtcbiAgICBpZiAobmV4dCA9PT0gY3VycmVudCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHNjcm9sbCkge1xuICAgICAgICBpZiAodXJsLmhhc2gpIHtcbiAgICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHVybC5oYXNoLnNsaWNlKDEpKTtcbiAgICAgICAgICBpZiAoZWwpIGVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgICAgZWxzZSB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBEbyBwdXNoL3JlcGxhY2Ugc3RhdGVcbiAgICBpZiAocmVwbGFjZSkgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcbiAgICBlbHNlIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XG4gICAgLy8gRW1pdCBhIGN1c3RvbSBuYXZpZ2F0aW9uIGV2ZW50IHNvIHRoZSBhcHAgY2FuIGxvYWQgdGhlIHRhcmdldCBtb2R1bGVcbiAgICB0cnkge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChcImluZDpuYXZpZ2F0ZVwiLCB7IGRldGFpbDogeyBocmVmOiBuZXh0IH0gfSksXG4gICAgICApO1xuICAgIH0gY2F0Y2gge31cbiAgICAvLyBTY3JvbGwgYmVoYXZpb3JcbiAgICBpZiAoc2Nyb2xsKSB7XG4gICAgICBpZiAodXJsLmhhc2gpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1cmwuaGFzaC5zbGljZSgxKSk7XG4gICAgICAgIGlmIChlbCkgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgZWxzZSB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbEZpbmFsID1cbiAgICB0YXJnZXQgPT09IFwiX2JsYW5rXCJcbiAgICAgID8gW3JlbCwgXCJub29wZW5lclwiLCBcIm5vcmVmZXJyZXJcIl0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpXG4gICAgICA6IHJlbDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgXCJhXCIsXG4gICAge1xuICAgICAgaHJlZixcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHN0eWxlLFxuICAgICAgdGFyZ2V0LFxuICAgICAgcmVsOiByZWxGaW5hbCxcbiAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrLFxuICAgICAgLi4ucmVzdCxcbiAgICB9LFxuICAgIGNoaWxkcmVuLFxuICApO1xufVxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInZpZXdcIik7XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5WaWV3LmRpc3BsYXlOYW1lID0gXCJWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRleHQgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRleHRcIik7XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5UZXh0LmRpc3BsYXlOYW1lID0gXCJUZXh0XCI7XG5leHBvcnQgZGVmYXVsdCBUZXh0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNjcm9sbFZpZXcgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIGhvcml6b250YWwgPSBmYWxzZSxcbiAgICAgIHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvciA9IHRydWUsXG4gICAgICBzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yID0gdHJ1ZSxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzY3JvbGx2aWV3XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2tcbiAgICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICAgICAgICBvdmVyZmxvd1g6IGhvcml6b250YWwgPyBcImF1dG9cIiA6IFwiaGlkZGVuXCIsXG4gICAgICAgIG92ZXJmbG93WTogaG9yaXpvbnRhbCA/IFwiaGlkZGVuXCIgOiBcImF1dG9cIixcbiAgICAgICAgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6IFwidG91Y2hcIixcbiAgICAgICAgc2Nyb2xsYmFyV2lkdGg6IChcbiAgICAgICAgICBob3Jpem9udGFsXG4gICAgICAgICAgICA/ICFzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgICAgIDogIXNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgKVxuICAgICAgICAgID8gXCJub25lXCJcbiAgICAgICAgICA6IFwiYXV0b1wiLFxuICAgICAgICBtc092ZXJmbG93U3R5bGU6IChcbiAgICAgICAgICBob3Jpem9udGFsXG4gICAgICAgICAgICA/ICFzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgICAgIDogIXNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgKVxuICAgICAgICAgID8gXCJub25lXCJcbiAgICAgICAgICA6IFwiYXV0b1wiLFxuICAgICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbY29udGVudENvbnRhaW5lclN0eWxlXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17Y29udGFpbmVyU3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17Y29udGVudFN0eWxlfT57Y2hpbGRyZW59PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yPXtzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3J9XG4gICAgICAgIHNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3I9e3Nob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3J9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblNjcm9sbFZpZXcuZGlzcGxheU5hbWUgPSBcIlNjcm9sbFZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFNjcm9sbFZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgVGV4dElucHV0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIHZhbHVlLFxuICAgICAgZGVmYXVsdFZhbHVlLFxuICAgICAgb25DaGFuZ2VUZXh0LFxuICAgICAgb25Gb2N1cyxcbiAgICAgIG9uQmx1cixcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgc2VjdXJlVGV4dEVudHJ5ID0gZmFsc2UsXG4gICAgICBtdWx0aWxpbmUgPSBmYWxzZSxcbiAgICAgIG51bWJlck9mTGluZXMgPSA0LFxuICAgICAgZWRpdGFibGUgPSB0cnVlLFxuICAgICAgc3R5bGUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChlKSA9PiB7XG4gICAgICBpZiAob25DaGFuZ2VUZXh0KSBvbkNoYW5nZVRleHQoZS50YXJnZXQudmFsdWUpO1xuICAgIH07XG5cbiAgICBjb25zdCBjb21tb25TdHlsZSA9IHtcbiAgICAgIGFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICAgICAgb3V0bGluZTogXCJub25lXCIsXG4gICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICB9O1xuXG4gICAgaWYgKG11bHRpbGluZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgcmVhZE9ubHk9eyFlZGl0YWJsZX1cbiAgICAgICAgICByb3dzPXtudW1iZXJPZkxpbmVzfVxuICAgICAgICAgIHN0eWxlPXt7IC4uLmNvbW1vblN0eWxlLCByZXNpemU6IFwibm9uZVwiIH19XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHR5cGU9e3NlY3VyZVRleHRFbnRyeSA/IFwicGFzc3dvcmRcIiA6IFwidGV4dFwifVxuICAgICAgICBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxuICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICByZWFkT25seT17IWVkaXRhYmxlfVxuICAgICAgICBzdHlsZT17Y29tbW9uU3R5bGV9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblRleHRJbnB1dC5kaXNwbGF5TmFtZSA9IFwiVGV4dElucHV0XCI7XG5leHBvcnQgZGVmYXVsdCBUZXh0SW5wdXQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgQnV0dG9uID0gZm9yd2FyZFJlZihcbiAgKHsgdGl0bGUsIG9uUHJlc3MsIGNvbG9yLCBkaXNhYmxlZCwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7dGl0bGV9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5CdXR0b24uZGlzcGxheU5hbWUgPSBcIkJ1dHRvblwiO1xuZXhwb3J0IGRlZmF1bHQgQnV0dG9uO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEFjdGl2aXR5SW5kaWNhdG9yID0gZm9yd2FyZFJlZihcbiAgKHsgc2l6ZSA9IFwic21hbGxcIiwgY29sb3IgPSBcIiM5OTlcIiwgc3R5bGUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJhY3Rpdml0eWluZGljYXRvclwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgY29uc3Qgc3Bpbm5lclN0eWxlID0ge1xuICAgICAgICBhbmltYXRpb246IFwiaW5kanMtc3BpbiAxcyBsaW5lYXIgaW5maW5pdGVcIixcbiAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEluamVjdCBrZXlmcmFtZXMgaWYgbm90IHByZXNlbnRcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZGpzLXNwaW4tc3R5bGVcIilcbiAgICAgICkge1xuICAgICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICBzdHlsZUVsLmlkID0gXCJpbmRqcy1zcGluLXN0eWxlXCI7XG4gICAgICAgIHN0eWxlRWwuaW5uZXJIVE1MID0gYEBrZXlmcmFtZXMgaW5kanMtc3BpbiB7IDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0gMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfWA7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiA8ZGl2IHJlZj17cmVmfSBzdHlsZT17c3Bpbm5lclN0eWxlfSB7Li4ucmVzdH0gLz47XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHNpemU9e3NpemV9IGNvbG9yPXtjb2xvcn0gc3R5bGU9e3N0eWxlfSB7Li4ucmVzdH0gLz5cbiAgICApO1xuICB9LFxuKTtcblxuQWN0aXZpdHlJbmRpY2F0b3IuZGlzcGxheU5hbWUgPSBcIkFjdGl2aXR5SW5kaWNhdG9yXCI7XG5leHBvcnQgZGVmYXVsdCBBY3Rpdml0eUluZGljYXRvcjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTd2l0Y2ggPSBmb3J3YXJkUmVmKFxuICAoXG4gICAgeyB2YWx1ZSwgb25WYWx1ZUNoYW5nZSwgZGlzYWJsZWQsIHRyYWNrQ29sb3IsIHRodW1iQ29sb3IsIHN0eWxlLCAuLi5yZXN0IH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInN3aXRjaFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiaW5wdXRcIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgY2hlY2tlZD17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvblZhbHVlQ2hhbmdlICYmIG9uVmFsdWVDaGFuZ2UoZS50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIHN0eWxlPXtTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSl9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgIG9uVmFsdWVDaGFuZ2U9e29uVmFsdWVDaGFuZ2V9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgdHJhY2tDb2xvcj17dHJhY2tDb2xvcn1cbiAgICAgICAgdGh1bWJDb2xvcj17dGh1bWJDb2xvcn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblN3aXRjaC5kaXNwbGF5TmFtZSA9IFwiU3dpdGNoXCI7XG5leHBvcnQgZGVmYXVsdCBTd2l0Y2g7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU2Nyb2xsVmlldyBmcm9tIFwiLi9zY3JvbGwtdmlldy5qc3hcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBGbGF0TGlzdCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBkYXRhLFxuICAgICAgcmVuZGVySXRlbSxcbiAgICAgIGtleUV4dHJhY3RvcixcbiAgICAgIExpc3RIZWFkZXJDb21wb25lbnQsXG4gICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEVtcHR5Q29tcG9uZW50LFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgbnVtQ29sdW1ucyA9IDEsXG4gICAgICBob3Jpem9udGFsID0gZmFsc2UsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiZmxhdGxpc3RcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIC8vIFdlYiBmYWxsYmFjayBpbXBsZW1lbnRhdGlvblxuICAgICAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChMaXN0RW1wdHlDb21wb25lbnQpIHtcbiAgICAgICAgICBjb25zdCBFbXB0eSA9IFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RFbXB0eUNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICBMaXN0RW1wdHlDb21wb25lbnRcbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPExpc3RFbXB0eUNvbXBvbmVudCAvPlxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICB7RW1wdHl9XG4gICAgICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXRlbXMgPSBkYXRhIHx8IFtdO1xuICAgICAgY29uc3QgcmVuZGVyTGlzdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlFeHRyYWN0b3JcbiAgICAgICAgICAgID8ga2V5RXh0cmFjdG9yKGl0ZW0sIGluZGV4KVxuICAgICAgICAgICAgOiBpbmRleC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtrZXl9PlxuICAgICAgICAgICAgICB7cmVuZGVySXRlbSh7IGl0ZW0sIGluZGV4IH0pfVxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGZsYXRDb250ZW50U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW2NvbnRlbnRDb250YWluZXJTdHlsZV0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17ZmxhdENvbnRlbnRTdHlsZX1cbiAgICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge0xpc3RIZWFkZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIHtyZW5kZXJMaXN0KCl9XG4gICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICByZW5kZXJJdGVtPXtyZW5kZXJJdGVtfVxuICAgICAgICBrZXlFeHRyYWN0b3I9e2tleUV4dHJhY3Rvcn1cbiAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudD17TGlzdEhlYWRlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudD17TGlzdEZvb3RlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEVtcHR5Q29tcG9uZW50PXtMaXN0RW1wdHlDb21wb25lbnR9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBudW1Db2x1bW5zPXtudW1Db2x1bW5zfVxuICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkZsYXRMaXN0LmRpc3BsYXlOYW1lID0gXCJGbGF0TGlzdFwiO1xuZXhwb3J0IGRlZmF1bHQgRmxhdExpc3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVG91Y2hhYmxlT3BhY2l0eSA9IGZvcndhcmRSZWYoXG4gICh7IGNoaWxkcmVuLCBzdHlsZSwgb25QcmVzcywgYWN0aXZlT3BhY2l0eSA9IDAuMiwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRvdWNoYWJsZW9wYWNpdHlcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtTdHlsZVNoZWV0LmZsYXR0ZW4oW3sgY3Vyc29yOiBcInBvaW50ZXJcIiB9LCBzdHlsZV0pfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiAoZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBhY3RpdmVPcGFjaXR5KX1cbiAgICAgICAgICBvbk1vdXNlVXA9eyhlKSA9PiAoZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxKX1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhlKSA9PiAoZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxKX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XG4gICAgICAgIGFjdGl2ZU9wYWNpdHk9e2FjdGl2ZU9wYWNpdHl9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuVG91Y2hhYmxlT3BhY2l0eS5kaXNwbGF5TmFtZSA9IFwiVG91Y2hhYmxlT3BhY2l0eVwiO1xuZXhwb3J0IGRlZmF1bHQgVG91Y2hhYmxlT3BhY2l0eTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBQcmVzc2FibGUgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgb25QcmVzcywgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJwcmVzc2FibGVcIik7XG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW1xuICAgICAgeyBjdXJzb3I6IFwicG9pbnRlclwiIH0sXG4gICAgICB0eXBlb2Ygc3R5bGUgPT09IFwiZnVuY3Rpb25cIiA/IHN0eWxlKHsgcHJlc3NlZDogZmFsc2UgfSkgOiBzdHlsZSxcbiAgICBdKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uIHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSBvbkNsaWNrPXtvblByZXNzfSB7Li4ucmVzdH0+XG4gICAgICAgIHt0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gY2hpbGRyZW4oeyBwcmVzc2VkOiBmYWxzZSB9KVxuICAgICAgICAgIDogY2hpbGRyZW59XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzdHlsZT17c3R5bGV9IG9uUHJlc3M9e29uUHJlc3N9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5QcmVzc2FibGUuZGlzcGxheU5hbWUgPSBcIlByZXNzYWJsZVwiO1xuZXhwb3J0IGRlZmF1bHQgUHJlc3NhYmxlO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEltYWdlQmFja2dyb3VuZCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7IGNoaWxkcmVuLCBzdHlsZSwgaW1hZ2VTdHlsZSwgc291cmNlLCBzcmMsIHJlc2l6ZU1vZGUgPSBcImNvdmVyXCIsIC4uLnJlc3QgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiaW1hZ2ViYWNrZ3JvdW5kXCIpO1xuXG4gICAgY29uc3QgaW1hZ2VTb3VyY2UgPSBzcmMgfHwgKHNvdXJjZSAmJiBzb3VyY2UudXJpKSB8fCBcIlwiO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW1xuICAgICAgICB7XG4gICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpbWFnZVNvdXJjZX0pYCxcbiAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogcmVzaXplTW9kZSA9PT0gXCJzdHJldGNoXCIgPyBcIjEwMCUgMTAwJVwiIDogcmVzaXplTW9kZSxcbiAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgYmFja2dyb3VuZFJlcGVhdDogXCJuby1yZXBlYXRcIixcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGUsXG4gICAgICBdKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IHsuLi5yZXN0fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBpbWFnZVN0eWxlPXtpbWFnZVN0eWxlfVxuICAgICAgICBzb3VyY2U9e3NvdXJjZSB8fCB7IHVyaTogc3JjIH19XG4gICAgICAgIHJlc2l6ZU1vZGU9e3Jlc2l6ZU1vZGV9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuSW1hZ2VCYWNrZ3JvdW5kLmRpc3BsYXlOYW1lID0gXCJJbWFnZUJhY2tncm91bmRcIjtcbmV4cG9ydCBkZWZhdWx0IEltYWdlQmFja2dyb3VuZDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcblxuY29uc3QgTW9kYWwgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICB2aXNpYmxlLFxuICAgICAgdHJhbnNwYXJlbnQsXG4gICAgICBhbmltYXRpb25UeXBlLFxuICAgICAgb25SZXF1ZXN0Q2xvc2UsXG4gICAgICBzdHlsZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJtb2RhbFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgaWYgKCF2aXNpYmxlKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3QgbW9kYWxTdHlsZSA9IHtcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIFJlbmRlciBhcyBwb3J0YWwgaWYgcG9zc2libGVcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXttb2RhbFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG5cbiAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLmNyZWF0ZVBvcnRhbChjb250ZW50LCBkb2N1bWVudC5ib2R5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB2aXNpYmxlPXt2aXNpYmxlfVxuICAgICAgICB0cmFuc3BhcmVudD17dHJhbnNwYXJlbnR9XG4gICAgICAgIGFuaW1hdGlvblR5cGU9e2FuaW1hdGlvblR5cGV9XG4gICAgICAgIG9uUmVxdWVzdENsb3NlPXtvblJlcXVlc3RDbG9zZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5Nb2RhbC5kaXNwbGF5TmFtZSA9IFwiTW9kYWxcIjtcbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNhZmVBcmVhVmlldyA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNhZmVhcmVhdmlld1wiKTtcblxuICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IHsuLi5yZXN0fT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuU2FmZUFyZWFWaWV3LmRpc3BsYXlOYW1lID0gXCJTYWZlQXJlYVZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFNhZmVBcmVhVmlldztcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xuXG4vLyBXZWIgbW9jayBvZiBTdGF0dXNCYXIuIEluIG5hdGl2ZSBpdCB3b3VsZCBjaGFuZ2UgdGhlIGJhciBzdHlsZS5cbi8vIEluIHdlYiwgbWF5YmUgaXQgY2hhbmdlcyB0aGUgbWV0YSB0aGVtZS1jb2xvciB0YWcuXG5cbmZ1bmN0aW9uIFN0YXR1c0Jhcih7IGJhclN0eWxlID0gXCJkZWZhdWx0XCIsIGJhY2tncm91bmRDb2xvciwgaGlkZGVuID0gZmFsc2UgfSkge1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIC8vIEF0dGVtcHQgdG8gc2V0IHRoZW1lLWNvbG9yIG1ldGEgdGFnIGlmIGJhY2tncm91bmRDb2xvciBwcm92aWRlZFxuICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgIGxldCBtZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidGhlbWUtY29sb3JcIl0nKTtcbiAgICAgIGlmICghbWV0YSkge1xuICAgICAgICBtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1ldGFcIik7XG4gICAgICAgIG1ldGEubmFtZSA9IFwidGhlbWUtY29sb3JcIjtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChtZXRhKTtcbiAgICAgIH1cbiAgICAgIG1ldGEuY29udGVudCA9IGJhY2tncm91bmRDb2xvcjtcbiAgICB9XG4gIH0sIFtiYWNrZ3JvdW5kQ29sb3JdKTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHVzQmFyO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFNjcm9sbFZpZXcgZnJvbSBcIi4vc2Nyb2xsLXZpZXcuanN4XCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dC5qc3hcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTZWN0aW9uTGlzdCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBzZWN0aW9ucyxcbiAgICAgIHJlbmRlckl0ZW0sXG4gICAgICByZW5kZXJTZWN0aW9uSGVhZGVyLFxuICAgICAga2V5RXh0cmFjdG9yLFxuICAgICAgTGlzdEhlYWRlckNvbXBvbmVudCxcbiAgICAgIExpc3RGb290ZXJDb21wb25lbnQsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWQgPSB0cnVlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNlY3Rpb25saXN0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2tcbiAgICAgIGNvbnN0IHJlbmRlclNlY3Rpb25zID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gKHNlY3Rpb25zIHx8IFtdKS5tYXAoKHNlY3Rpb24sIHNlY3Rpb25JbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBzZWN0aW9uLmRhdGEgfHwgW107XG4gICAgICAgICAgY29uc3Qga2V5ID0gc2VjdGlvbi5rZXkgfHwgc2VjdGlvbkluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2tleX0+XG4gICAgICAgICAgICAgIHtyZW5kZXJTZWN0aW9uSGVhZGVyICYmIHJlbmRlclNlY3Rpb25IZWFkZXIoeyBzZWN0aW9uIH0pfVxuICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGl0ZW0sIGl0ZW1JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1LZXkgPSBrZXlFeHRyYWN0b3JcbiAgICAgICAgICAgICAgICAgID8ga2V5RXh0cmFjdG9yKGl0ZW0sIGl0ZW1JbmRleClcbiAgICAgICAgICAgICAgICAgIDogaXRlbS5rZXkgfHwgaXRlbS5pZCB8fCBrZXkgKyBcIi1cIiArIGl0ZW1JbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17aXRlbUtleX0+XG4gICAgICAgICAgICAgICAgICAgIHtyZW5kZXJJdGVtKHsgaXRlbSwgaW5kZXg6IGl0ZW1JbmRleCwgc2VjdGlvbiB9KX1cbiAgICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICB7cmVuZGVyU2VjdGlvbnMoKX1cbiAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHNlY3Rpb25zPXtzZWN0aW9uc31cbiAgICAgICAgcmVuZGVySXRlbT17cmVuZGVySXRlbX1cbiAgICAgICAgcmVuZGVyU2VjdGlvbkhlYWRlcj17cmVuZGVyU2VjdGlvbkhlYWRlcn1cbiAgICAgICAga2V5RXh0cmFjdG9yPXtrZXlFeHRyYWN0b3J9XG4gICAgICAgIExpc3RIZWFkZXJDb21wb25lbnQ9e0xpc3RIZWFkZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RGb290ZXJDb21wb25lbnQ9e0xpc3RGb290ZXJDb21wb25lbnR9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWQ9e3N0aWNreVNlY3Rpb25IZWFkZXJzRW5hYmxlZH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5TZWN0aW9uTGlzdC5kaXNwbGF5TmFtZSA9IFwiU2VjdGlvbkxpc3RcIjtcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb25MaXN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEtleWJvYXJkQXZvaWRpbmdWaWV3ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBiZWhhdmlvcixcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIGtleWJvYXJkVmVydGljYWxPZmZzZXQsXG4gICAgICBlbmFibGVkLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImtleWJvYXJkYXZvaWRpbmd2aWV3XCIpO1xuXG4gICAgLy8gT24gd2ViLCBrZXlib2FyZCBhdm9pZGluZyBpcyB1c3VhbGx5IGhhbmRsZWQgYnkgdGhlIGJyb3dzZXIgZGVmYXVsdCBiZWhhdmlvciBvciBpcyBpcnJlbGV2YW50XG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIGJlaGF2aW9yPXtiZWhhdmlvcn1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIGtleWJvYXJkVmVydGljYWxPZmZzZXQ9e2tleWJvYXJkVmVydGljYWxPZmZzZXR9XG4gICAgICAgIGVuYWJsZWQ9e2VuYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuS2V5Ym9hcmRBdm9pZGluZ1ZpZXcuZGlzcGxheU5hbWUgPSBcIktleWJvYXJkQXZvaWRpbmdWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBLZXlib2FyZEF2b2lkaW5nVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBSZWZyZXNoQ29udHJvbCA9IGZvcndhcmRSZWYoKHsgcmVmcmVzaGluZywgb25SZWZyZXNoLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInJlZnJlc2hjb250cm9sXCIpO1xuXG4gIC8vIE9uIHdlYiwgcGFzcy10aHJvdWdoIG9yIGltcGxlbWVudCBiYXNpYyB2aXN1YWw/XG4gIC8vIFVzdWFsbHkgUmVmcmVzaENvbnRyb2wgaXMgcGFzc2VkIGFzIHByb3AgdG8gU2Nyb2xsVmlldy5cbiAgLy8gSWYgdXNlZCBhcyBjb21wb25lbnQsIGl0IG1pZ2h0IHdyYXAgY29udGVudC5cblxuICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgLy8gTm8tb3AgZm9yIHdlYiB2aXN1YWwgdXN1YWxseSwgdW5sZXNzIHdlIGltcGxlbWVudCBwdWxsLXRvLXJlZnJlc2hcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudFxuICAgICAgcmVmPXtyZWZ9XG4gICAgICByZWZyZXNoaW5nPXtyZWZyZXNoaW5nfVxuICAgICAgb25SZWZyZXNoPXtvblJlZnJlc2h9XG4gICAgICB7Li4ucmVzdH1cbiAgICAvPlxuICApO1xufSk7XG5cblJlZnJlc2hDb250cm9sLmRpc3BsYXlOYW1lID0gXCJSZWZyZXNoQ29udHJvbFwiO1xuZXhwb3J0IGRlZmF1bHQgUmVmcmVzaENvbnRyb2w7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVG91Y2hhYmxlSGlnaGxpZ2h0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBvblByZXNzLFxuICAgICAgdW5kZXJsYXlDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgIGFjdGl2ZU9wYWNpdHkgPSAwLjg1LFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRvdWNoYWJsZWhpZ2hsaWdodFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3sgY3Vyc29yOiBcInBvaW50ZXJcIiB9LCBzdHlsZV0pO1xuXG4gICAgICAvLyBTaW1wbGUgd2ViIGltcGxlbWVudGF0aW9uOiBqdXN0IG9wYWNpdHksIG1pbWlja2luZyBvdmVybGF5IGlzIGhhcmRlciB3aXRob3V0IHN0YXRlXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgc3R5bGU9e2ZsYXRTdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHVuZGVybGF5Q29sb3I7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IGFjdGl2ZU9wYWNpdHk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbk1vdXNlVXA9eyhlKSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cbiAgICAgICAgICAgICAgZmxhdFN0eWxlLmJhY2tncm91bmRDb2xvciB8fCBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhlKSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cbiAgICAgICAgICAgICAgZmxhdFN0eWxlLmJhY2tncm91bmRDb2xvciB8fCBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XG4gICAgICAgIHVuZGVybGF5Q29sb3I9e3VuZGVybGF5Q29sb3J9XG4gICAgICAgIGFjdGl2ZU9wYWNpdHk9e2FjdGl2ZU9wYWNpdHl9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuVG91Y2hhYmxlSGlnaGxpZ2h0LmRpc3BsYXlOYW1lID0gXCJUb3VjaGFibGVIaWdobGlnaHRcIjtcbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZUhpZ2hsaWdodDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgY2xvbmVFbGVtZW50LCBDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2sganVzdCBhY2NlcHRzIG9uUHJlc3MgYW5kIHBhc3NlcyBpdCB0byB0aGUgY2hpbGRcbi8vIEl0IGRvZXMgbm90IGFkZCBhbnkgdmlzdWFsIGZlZWRiYWNrLlxuY29uc3QgVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrID0gKHtcbiAgY2hpbGRyZW4sXG4gIG9uUHJlc3MsXG4gIG9uUHJlc3NJbixcbiAgb25QcmVzc091dCxcbiAgZGlzYWJsZWQsXG4gIC4uLnJlc3Rcbn0pID0+IHtcbiAgY29uc3QgY2hpbGQgPSBDaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTtcblxuICByZXR1cm4gY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgb25DbGljazogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzcykgb25QcmVzcyhlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbkNsaWNrKSBjaGlsZC5wcm9wcy5vbkNsaWNrKGUpO1xuICAgIH0sXG4gICAgb25Nb3VzZURvd246IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NJbikgb25QcmVzc0luKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uTW91c2VEb3duKSBjaGlsZC5wcm9wcy5vbk1vdXNlRG93bihlKTtcbiAgICB9LFxuICAgIG9uTW91c2VVcDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc091dCkgb25QcmVzc091dChlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbk1vdXNlVXApIGNoaWxkLnByb3BzLm9uTW91c2VVcChlKTtcbiAgICB9LFxuICAgIG9uVG91Y2hTdGFydDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc0luKSBvblByZXNzSW4oZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Ub3VjaFN0YXJ0KSBjaGlsZC5wcm9wcy5vblRvdWNoU3RhcnQoZSk7XG4gICAgfSxcbiAgICBvblRvdWNoRW5kOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzT3V0KSBvblByZXNzT3V0KGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uVG91Y2hFbmQpIGNoaWxkLnByb3BzLm9uVG91Y2hFbmQoZSk7XG4gICAgfSxcbiAgICBzdHlsZToge1xuICAgICAgY3Vyc29yOiBkaXNhYmxlZCA/IFwibm90LWFsbG93ZWRcIiA6IFwicG9pbnRlclwiLFxuICAgICAgLi4uY2hpbGQucHJvcHMuc3R5bGUsXG4gICAgfSxcbiAgICAuLi5yZXN0LFxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjaztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBTY3JlZW4gQ29tcG9uZW50XHJcbiAqIEZ1bGwtaGVpZ2h0IHNjcmVlbiBjb250YWluZXIgd2l0aCBiYWNrZ3JvdW5kXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBTY3JlZW4gPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBiYWNrZ3JvdW5kID0gJ2xpZ2h0JywgY2xhc3NOYW1lID0gJycsIHN0eWxlLCAuLi5wcm9wcyB9LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5TY3JlZW4uZGlzcGxheU5hbWUgPSBcIlNjcmVlblwiO1xyXG5leHBvcnQgZGVmYXVsdCBTY3JlZW47XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBDb250YWluZXIgQ29tcG9uZW50XHJcbiAqIFJlc3BvbnNpdmUgY29udGFpbmVyIHdpdGggbWF4LXdpZHRoIGFuZCBjZW50ZXJpbmdcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IENvbnRhaW5lciA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkNvbnRhaW5lci5kaXNwbGF5TmFtZSA9IFwiQ29udGFpbmVyXCI7XHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIENhcmQgQ29tcG9uZW50XHJcbiAqIFN0eWxlZCBjYXJkIGNvbnRhaW5lciB3aXRoIHNoYWRvdyBhbmQgcm91bmRlZCBjb3JuZXJzXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBDYXJkID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuQ2FyZC5kaXNwbGF5TmFtZSA9IFwiQ2FyZFwiO1xyXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgR3JpZCBDb21wb25lbnRcclxuICogUmVzcG9uc2l2ZSBncmlkIGxheW91dCBzeXN0ZW1cclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IEdyaWQgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5HcmlkLmRpc3BsYXlOYW1lID0gXCJHcmlkXCI7XHJcbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBTdGFjayBDb21wb25lbnRcclxuICogVmVydGljYWwgb3IgaG9yaXpvbnRhbCBsYXlvdXQgd2l0aCBzcGFjaW5nXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBTdGFjayA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJyxcclxuICAgIHNwYWNpbmcgPSA0LFxyXG4gICAgYWxpZ24gPSAnc3RhcnQnLFxyXG4gICAganVzdGlmeSA9ICdzdGFydCcsXHJcbiAgICBjbGFzc05hbWUgPSAnJyxcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuU3RhY2suZGlzcGxheU5hbWUgPSBcIlN0YWNrXCI7XHJcbmV4cG9ydCBkZWZhdWx0IFN0YWNrO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dC5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgSWNvbiBDb21wb25lbnRcclxuICogRGlzcGxheXMgZW1vamkgaWNvbnMgY29uc2lzdGVudGx5IGFjcm9zcyBwbGF0Zm9ybXNcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IEljb24gPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBuYW1lLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUZXh0IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge25hbWV9XHJcbiAgICAgICAgPC9UZXh0ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuSWNvbi5kaXNwbGF5TmFtZSA9IFwiSWNvblwiO1xyXG5leHBvcnQgZGVmYXVsdCBJY29uO1xyXG4iLCAiLy8gRGltZW5zaW9ucyBBUEkgZm9yIFdlYlxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5jb25zdCBsaXN0ZW5lcnMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICBsaXN0ZW5lcnMuZW1pdChcImNoYW5nZVwiLCB7IHdpbmRvdzogZ2V0V2luZG93KCksIHNjcmVlbjogZ2V0U2NyZWVuKCkgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3coKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHNjYWxlOiAxLCBmb250U2NhbGU6IDEgfTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgc2NhbGU6IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsXG4gICAgZm9udFNjYWxlOiAxLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTY3JlZW4oKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHNjYWxlOiAxLCBmb250U2NhbGU6IDEgfTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2luZG93LnNjcmVlbi53aWR0aCxcbiAgICBoZWlnaHQ6IHdpbmRvdy5zY3JlZW4uaGVpZ2h0LFxuICAgIHNjYWxlOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLFxuICAgIGZvbnRTY2FsZTogMSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IERpbWVuc2lvbnMgPSB7XG4gIGdldDogKGRpbSkgPT4ge1xuICAgIGlmIChkaW0gPT09IFwid2luZG93XCIpIHJldHVybiBnZXRXaW5kb3coKTtcbiAgICBpZiAoZGltID09PSBcInNjcmVlblwiKSByZXR1cm4gZ2V0U2NyZWVuKCk7XG4gICAgcmV0dXJuIGdldFdpbmRvdygpO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcImNoYW5nZVwiKSB7XG4gICAgICBsaXN0ZW5lcnMub24oXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6ICgpID0+IGxpc3RlbmVycy5vZmYoXCJjaGFuZ2VcIiwgaGFuZGxlciksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyByZW1vdmU6ICgpID0+IHt9IH07XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwiY2hhbmdlXCIpIHtcbiAgICAgIGxpc3RlbmVycy5vZmYoXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGltZW5zaW9ucztcbiIsICJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRzXCI7XG5cbmNvbnN0IGV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuZXhwb3J0IGNvbnN0IExpbmtpbmcgPSB7XG4gIG9wZW5VUkw6ICh1cmwpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgd2luZG93Lm9wZW4odXJsLCBcIl9ibGFua1wiLCBcIm5vb3BlbmVyLG5vcmVmZXJyZXJcIik7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfSxcbiAgY2FuT3BlblVSTDogKHVybCkgPT4gUHJvbWlzZS5yZXNvbHZlKHRydWUpLFxuICBnZXRJbml0aWFsVVJMOiAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcInVybFwiKSB7XG4gICAgICAvLyBJbiBhIHJlYWwgd2ViIGFwcCwgd2UgbWlnaHQgbGlzdGVuIHRvIHBvcHN0YXRlIG9yIGhhc2hjaGFuZ2VcbiAgICAgIC8vIGVuc3VyaW5nIHdlIHJldHVybiBhIHN1YnNjcmlwdGlvbi1saWtlIG9iamVjdFxuICAgICAgY29uc3QgbGlzdGVuZXIgPSAoZSkgPT4gaGFuZGxlcih7IHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGxpc3RlbmVyKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBsaXN0ZW5lciksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyByZW1vdmU6ICgpID0+IHt9IH07XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgLy8gRGVwcmVjYXRlZCBpbiBSTiBidXQgZ29vZCB0byBoYXZlIHNpZ25hdHVyZVxuICB9LFxuICBzZW5kSW50ZW50OiAoYWN0aW9uLCBleHRyYXMpID0+IFByb21pc2UucmVzb2x2ZSgpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlua2luZztcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRmVhdHVyZUNhcmQoeyBpY29uLCB0aXRsZSwgZGVzY3JpcHRpb24sIGdyYWRpZW50IH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJncm91cCByZWxhdGl2ZSBiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTYgc206cC04IHNoYWRvdy1sZyBob3ZlcjpzaGFkb3ctMnhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCB0cmFuc2Zvcm0gaG92ZXI6LXRyYW5zbGF0ZS15LTIgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBvdmVyZmxvdy1oaWRkZW5cIj5cclxuICAgICAgey8qIEJhY2tncm91bmQgR3JhZGllbnQgb24gSG92ZXIgKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS01IHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi01MDAgJHtncmFkaWVudCB8fCAnYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tNjAwIHRvLXB1cnBsZS02MDAnfWB9PjwvZGl2PlxyXG4gICAgICBcclxuICAgICAgey8qIEljb24gQ29udGFpbmVyICovfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctMTQgaC0xNCBzbTp3LTE2IHNtOmgtMTYgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tMTAwIHRvLXB1cnBsZS0xMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItNSBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC0zeGwgc206dGV4dC00eGxcIj57aWNvbn08L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBcclxuICAgICAgey8qIENvbnRlbnQgKi99XHJcbiAgICAgIDxoMyBjbGFzc05hbWU9XCJyZWxhdGl2ZSB0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTMgZ3JvdXAtaG92ZXI6dGV4dC1pbmRpZ28tNjAwIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTMwMFwiPlxyXG4gICAgICAgIHt0aXRsZX1cclxuICAgICAgPC9oMz5cclxuICAgICAgPHAgY2xhc3NOYW1lPVwicmVsYXRpdmUgdGV4dC1ncmF5LTYwMCBsZWFkaW5nLXJlbGF4ZWQgdGV4dC1zbSBzbTp0ZXh0LWJhc2VcIj5cclxuICAgICAgICB7ZGVzY3JpcHRpb259XHJcbiAgICAgIDwvcD5cclxuICAgICAgXHJcbiAgICAgIHsvKiBBcnJvdyBJY29uICovfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG10LTQgZmxleCBpdGVtcy1jZW50ZXIgdGV4dC1pbmRpZ28tNjAwIG9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIHRyYW5zbGF0ZS14LTAgZ3JvdXAtaG92ZXI6dHJhbnNsYXRlLXgtMlwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZFwiPkxlYXJuIG1vcmU8L3NwYW4+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTQgaC00IG1sLTJcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17Mn0gZD1cIk0xNyA4bDQgNG0wIDBsLTQgNG00LTRIM1wiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBcclxuICAgICAgey8qIERlY29yYXRpdmUgQ29ybmVyICovfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgdy0yMCBoLTIwIGJnLWdyYWRpZW50LXRvLWJsIGZyb20taW5kaWdvLTEwMC81MCB0by10cmFuc3BhcmVudCByb3VuZGVkLWJsLVsxMDBweF0gb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi01MDBcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1c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CiAgIm5hbWVzIjogWyJSZWFjdCIsICJwbGF0Zm9ybSIsICJTdHlsZVNoZWV0IiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImpzeHMiLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJFdmVudEVtaXR0ZXIiLCAiUmVhY3QiLCAianN4IiwgImpzeHMiLCAianN4IiwgImpzeHMiLCAicGxhdGZvcm0iXQp9Cg==
