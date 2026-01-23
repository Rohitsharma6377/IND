var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// pages/admin/index.jsx
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

// pages/admin/index.jsx
import { jsx as jsx25, jsxs as jsxs3 } from "react/jsx-runtime";
var HomeIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
  /* @__PURE__ */ jsx25("polyline", { points: "9 22 9 12 15 12 15 22" })
] });
var UsersIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
  /* @__PURE__ */ jsx25("circle", { cx: "9", cy: "7", r: "4" }),
  /* @__PURE__ */ jsx25("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
  /* @__PURE__ */ jsx25("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
] });
var ChartIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("line", { x1: "12", y1: "20", x2: "12", y2: "10" }),
  /* @__PURE__ */ jsx25("line", { x1: "18", y1: "20", x2: "18", y2: "4" }),
  /* @__PURE__ */ jsx25("line", { x1: "6", y1: "20", x2: "6", y2: "16" })
] });
var SettingsIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("circle", { cx: "12", cy: "12", r: "3" }),
  /* @__PURE__ */ jsx25("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })
] });
var FileIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" }),
  /* @__PURE__ */ jsx25("polyline", { points: "13 2 13 9 20 9" })
] });
var LogoutIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
  /* @__PURE__ */ jsx25("polyline", { points: "16 17 21 12 16 7" }),
  /* @__PURE__ */ jsx25("line", { x1: "21", y1: "12", x2: "9", y2: "12" })
] });
var MenuIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ jsx25("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ jsx25("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
] });
var BellIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }),
  /* @__PURE__ */ jsx25("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" })
] });
var SearchIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ jsx25("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
] });
var TrendUpIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" }),
  /* @__PURE__ */ jsx25("polyline", { points: "17 6 23 6 23 12" })
] });
var TrendDownIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("polyline", { points: "23 18 13.5 8.5 8.5 13.5 1 6" }),
  /* @__PURE__ */ jsx25("polyline", { points: "17 18 23 18 23 12" })
] });
var EyeIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
  /* @__PURE__ */ jsx25("circle", { cx: "12", cy: "12", r: "3" })
] });
var DownloadIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
  /* @__PURE__ */ jsx25("polyline", { points: "7 10 12 15 17 10" }),
  /* @__PURE__ */ jsx25("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
] });
var CodeIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("polyline", { points: "16 18 22 12 16 6" }),
  /* @__PURE__ */ jsx25("polyline", { points: "8 6 2 12 8 18" })
] });
var DatabaseIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }),
  /* @__PURE__ */ jsx25("path", { d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" }),
  /* @__PURE__ */ jsx25("path", { d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" })
] });
var PlusIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
  /* @__PURE__ */ jsx25("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
] });
var MoreIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("circle", { cx: "12", cy: "12", r: "1" }),
  /* @__PURE__ */ jsx25("circle", { cx: "19", cy: "12", r: "1" }),
  /* @__PURE__ */ jsx25("circle", { cx: "5", cy: "12", r: "1" })
] });
function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    window.location.href = "/admin/login";
  };
  const stats = [
    { label: "Total Users", value: "12,456", change: "+12.5%", trend: "up", icon: UsersIcon, color: "indigo" },
    { label: "Page Views", value: "1.2M", change: "+8.2%", trend: "up", icon: EyeIcon, color: "purple" },
    { label: "Downloads", value: "45,892", change: "+23.1%", trend: "up", icon: DownloadIcon, color: "pink" },
    { label: "Active Projects", value: "3,456", change: "-2.4%", trend: "down", icon: CodeIcon, color: "cyan" }
  ];
  const recentActivity = [
    { user: "John Doe", action: "Created new project", time: "2 min ago", avatar: "JD" },
    { user: "Sarah Smith", action: "Downloaded INDJS v3.1.2", time: "15 min ago", avatar: "SS" },
    { user: "Mike Johnson", action: "Starred the repository", time: "1 hour ago", avatar: "MJ" },
    { user: "Emily Brown", action: "Submitted a bug report", time: "2 hours ago", avatar: "EB" },
    { user: "Alex Wilson", action: "Published documentation", time: "3 hours ago", avatar: "AW" }
  ];
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon },
    { id: "users", label: "Users", icon: UsersIcon },
    { id: "analytics", label: "Analytics", icon: ChartIcon },
    { id: "content", label: "Content", icon: FileIcon },
    { id: "database", label: "Database", icon: DatabaseIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon }
  ];
  if (!user) {
    return /* @__PURE__ */ jsx25("div", { className: "min-h-screen bg-gray-900 flex items-center justify-center", children: /* @__PURE__ */ jsx25("div", { className: "w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs3("div", { className: "min-h-screen bg-gray-900 flex", children: [
    /* @__PURE__ */ jsxs3("aside", { className: `${sidebarOpen ? "w-64" : "w-20"} bg-gray-800/50 border-r border-gray-700/50 transition-all duration-300 flex flex-col`, children: [
      /* @__PURE__ */ jsx25("div", { className: "h-16 flex items-center px-6 border-b border-gray-700/50", children: /* @__PURE__ */ jsx25(Link, { href: "/", children: /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-3 cursor-pointer", children: [
        /* @__PURE__ */ jsx25("img", { src: "/logo.svg", alt: "INDJS", className: "w-10 h-10" }),
        sidebarOpen && /* @__PURE__ */ jsx25("span", { className: "text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent", children: "indjs" })
      ] }) }) }),
      /* @__PURE__ */ jsx25("nav", { className: "flex-1 p-4 space-y-2", children: navItems.map((item) => {
        const Icon2 = item.icon;
        return /* @__PURE__ */ jsxs3(
          "button",
          {
            onClick: () => setActiveTab(item.id),
            className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "text-gray-400 hover:bg-gray-700/50 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsx25(Icon2, { className: "w-5 h-5 flex-shrink-0" }),
              sidebarOpen && /* @__PURE__ */ jsx25("span", { className: "font-medium", children: item.label })
            ]
          },
          item.id
        );
      }) }),
      /* @__PURE__ */ jsx25("div", { className: "p-4 border-t border-gray-700/50", children: /* @__PURE__ */ jsxs3(
        "button",
        {
          onClick: handleLogout,
          className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all",
          children: [
            /* @__PURE__ */ jsx25(LogoutIcon, { className: "w-5 h-5 flex-shrink-0" }),
            sidebarOpen && /* @__PURE__ */ jsx25("span", { className: "font-medium", children: "Logout" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "flex-1 flex flex-col", children: [
      /* @__PURE__ */ jsxs3("header", { className: "h-16 bg-gray-800/30 border-b border-gray-700/50 flex items-center justify-between px-6", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx25(
            "button",
            {
              onClick: () => setSidebarOpen(!sidebarOpen),
              className: "p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors",
              children: /* @__PURE__ */ jsx25(MenuIcon, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxs3("div", { className: "relative hidden md:block", children: [
            /* @__PURE__ */ jsx25(SearchIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsx25(
              "input",
              {
                type: "text",
                placeholder: "Search...",
                className: "w-64 pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs3("button", { className: "relative p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors", children: [
            /* @__PURE__ */ jsx25(BellIcon, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx25("span", { className: "absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx25("div", { className: "w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm", children: user?.name?.split(" ").map((n) => n[0]).join("") || "AU" }),
            /* @__PURE__ */ jsxs3("div", { className: "hidden md:block", children: [
              /* @__PURE__ */ jsx25("div", { className: "text-sm font-medium text-white", children: user?.name || "Admin User" }),
              /* @__PURE__ */ jsx25("div", { className: "text-xs text-gray-500", children: user?.email })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("main", { className: "flex-1 p-6 overflow-auto", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between mb-8", children: [
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx25("h1", { className: "text-2xl font-bold text-white mb-1", children: "Dashboard" }),
            /* @__PURE__ */ jsxs3("p", { className: "text-gray-400", children: [
              "Welcome back, ",
              user?.name?.split(" ")[0] || "Admin",
              "! Here's what's happening."
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("button", { className: "flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25", children: [
            /* @__PURE__ */ jsx25(PlusIcon, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx25("span", { children: "New Project" })
          ] })
        ] }),
        /* @__PURE__ */ jsx25("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: stats.map((stat, index) => {
          const Icon2 = stat.icon;
          return /* @__PURE__ */ jsxs3("div", { className: "bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all", children: [
            /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsx25("div", { className: `w-12 h-12 bg-${stat.color}-500/10 rounded-xl flex items-center justify-center`, children: /* @__PURE__ */ jsx25(Icon2, { className: `w-6 h-6 text-${stat.color}-400` }) }),
              /* @__PURE__ */ jsxs3("div", { className: `flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`, children: [
                stat.trend === "up" ? /* @__PURE__ */ jsx25(TrendUpIcon, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx25(TrendDownIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx25("span", { children: stat.change })
              ] })
            ] }),
            /* @__PURE__ */ jsx25("div", { className: "text-2xl font-bold text-white mb-1", children: stat.value }),
            /* @__PURE__ */ jsx25("div", { className: "text-sm text-gray-400", children: stat.label })
          ] }, index);
        }) }),
        /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs3("div", { className: "lg:col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-xl p-6", children: [
            /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsx25("h2", { className: "text-lg font-semibold text-white", children: "Traffic Overview" }),
              /* @__PURE__ */ jsxs3("select", { className: "bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500", children: [
                /* @__PURE__ */ jsx25("option", { children: "Last 7 days" }),
                /* @__PURE__ */ jsx25("option", { children: "Last 30 days" }),
                /* @__PURE__ */ jsx25("option", { children: "Last 90 days" })
              ] })
            ] }),
            /* @__PURE__ */ jsx25("div", { className: "h-64 flex items-end justify-between gap-2 px-4", children: [40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((height, i) => /* @__PURE__ */ jsxs3("div", { className: "flex-1 flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx25(
                "div",
                {
                  className: "w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-sm transition-all hover:from-indigo-500 hover:to-purple-400",
                  style: { height: `${height}%` }
                }
              ),
              /* @__PURE__ */ jsx25("span", { className: "text-xs text-gray-500", children: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i] })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "bg-gray-800/50 border border-gray-700/50 rounded-xl p-6", children: [
            /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsx25("h2", { className: "text-lg font-semibold text-white", children: "Recent Activity" }),
              /* @__PURE__ */ jsx25("button", { className: "p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors", children: /* @__PURE__ */ jsx25(MoreIcon, { className: "w-5 h-5" }) })
            ] }),
            /* @__PURE__ */ jsx25("div", { className: "space-y-4", children: recentActivity.map((activity, index) => /* @__PURE__ */ jsxs3("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx25("div", { className: "w-9 h-9 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0", children: activity.avatar }),
              /* @__PURE__ */ jsxs3("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx25("p", { className: "text-sm text-white truncate", children: /* @__PURE__ */ jsx25("span", { className: "font-medium", children: activity.user }) }),
                /* @__PURE__ */ jsx25("p", { className: "text-sm text-gray-400 truncate", children: activity.action }),
                /* @__PURE__ */ jsx25("p", { className: "text-xs text-gray-500 mt-0.5", children: activity.time })
              ] })
            ] }, index)) }),
            /* @__PURE__ */ jsx25("button", { className: "w-full mt-4 py-2.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors", children: "View All Activity \u2192" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsx25("h2", { className: "text-lg font-semibold text-white mb-4", children: "Quick Actions" }),
          /* @__PURE__ */ jsx25("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
            { icon: UsersIcon, label: "Manage Users", color: "indigo" },
            { icon: FileIcon, label: "Edit Content", color: "purple" },
            { icon: ChartIcon, label: "View Analytics", color: "pink" },
            { icon: SettingsIcon, label: "Settings", color: "cyan" }
          ].map((action, index) => {
            const Icon2 = action.icon;
            return /* @__PURE__ */ jsxs3(
              "button",
              {
                className: "flex items-center gap-3 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:bg-gray-800/70 hover:border-gray-600 transition-all group",
                children: [
                  /* @__PURE__ */ jsx25("div", { className: `w-10 h-10 bg-${action.color}-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`, children: /* @__PURE__ */ jsx25(Icon2, { className: `w-5 h-5 text-${action.color}-400` }) }),
                  /* @__PURE__ */ jsx25("span", { className: "text-sm font-medium text-white", children: action.label })
                ]
              },
              index
            );
          }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvYWRtaW4vaW5kZXguanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvcGxhdGZvcm0ubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pbWFnZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy91bml2ZXJzYWwvcmVzb2x2ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvc3R5bGUtc2hlZXQubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9saW5rLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JvbGwtdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQtaW5wdXQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9idXR0b24uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS1pbmRpY2F0b3IuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zd2l0Y2guanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9mbGF0LWxpc3QuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtb3BhY2l0eS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3ByZXNzYWJsZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLWJhY2tncm91bmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9tb2RhbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NhZmUtYXJlYS12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhdHVzLWJhci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NlY3Rpb24tbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2tleWJvYXJkLWF2b2lkaW5nLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9yZWZyZXNoLWNvbnRyb2wuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtaGlnaGxpZ2h0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdG91Y2hhYmxlLXdpdGhvdXQtZmVlZGJhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JlZW4uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jb250YWluZXIuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jYXJkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvZ3JpZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N0YWNrLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaWNvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2RpbWVuc2lvbnMubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9saW5raW5nLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdpbmRqcyc7XHJcblxyXG4vLyBTVkcgSWNvbnNcclxuY29uc3QgSG9tZUljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNSBoLTVcIiB9KSA9PiAoXHJcbiAgICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICAgICAgPHBhdGggZD1cIk0zIDlsOS03IDkgN3YxMWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnpcIiAvPlxyXG4gICAgICAgIDxwb2x5bGluZSBwb2ludHM9XCI5IDIyIDkgMTIgMTUgMTIgMTUgMjJcIiAvPlxyXG4gICAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBVc2Vyc0ljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNSBoLTVcIiB9KSA9PiAoXHJcbiAgICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICAgICAgPHBhdGggZD1cIk0xNyAyMXYtMmE0IDQgMCAwIDAtNC00SDVhNCA0IDAgMCAwLTQgNHYyXCIgLz5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiOVwiIGN5PVwiN1wiIHI9XCI0XCIgLz5cclxuICAgICAgICA8cGF0aCBkPVwiTTIzIDIxdi0yYTQgNCAwIDAgMC0zLTMuODdcIiAvPlxyXG4gICAgICAgIDxwYXRoIGQ9XCJNMTYgMy4xM2E0IDQgMCAwIDEgMCA3Ljc1XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgQ2hhcnRJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTUgaC01XCIgfSkgPT4gKFxyXG4gICAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgICAgIDxsaW5lIHgxPVwiMTJcIiB5MT1cIjIwXCIgeDI9XCIxMlwiIHkyPVwiMTBcIiAvPlxyXG4gICAgICAgIDxsaW5lIHgxPVwiMThcIiB5MT1cIjIwXCIgeDI9XCIxOFwiIHkyPVwiNFwiIC8+XHJcbiAgICAgICAgPGxpbmUgeDE9XCI2XCIgeTE9XCIyMFwiIHgyPVwiNlwiIHkyPVwiMTZcIiAvPlxyXG4gICAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBTZXR0aW5nc0ljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNSBoLTVcIiB9KSA9PiAoXHJcbiAgICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICAgICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIzXCIgLz5cclxuICAgICAgICA8cGF0aCBkPVwiTTE5LjQgMTVhMS42NSAxLjY1IDAgMCAwIC4zMyAxLjgybC4wNi4wNmEyIDIgMCAwIDEgMCAyLjgzIDIgMiAwIDAgMS0yLjgzIDBsLS4wNi0uMDZhMS42NSAxLjY1IDAgMCAwLTEuODItLjMzIDEuNjUgMS42NSAwIDAgMC0xIDEuNTFWMjFhMiAyIDAgMCAxLTIgMiAyIDIgMCAwIDEtMi0ydi0uMDlBMS42NSAxLjY1IDAgMCAwIDkgMTkuNGExLjY1IDEuNjUgMCAwIDAtMS44Mi4zM2wtLjA2LjA2YTIgMiAwIDAgMS0yLjgzIDAgMiAyIDAgMCAxIDAtMi44M2wuMDYtLjA2YTEuNjUgMS42NSAwIDAgMCAuMzMtMS44MiAxLjY1IDEuNjUgMCAwIDAtMS41MS0xSDNhMiAyIDAgMCAxLTItMiAyIDIgMCAwIDEgMi0yaC4wOUExLjY1IDEuNjUgMCAwIDAgNC42IDlhMS42NSAxLjY1IDAgMCAwLS4zMy0xLjgybC0uMDYtLjA2YTIgMiAwIDAgMSAwLTIuODMgMiAyIDAgMCAxIDIuODMgMGwuMDYuMDZhMS42NSAxLjY1IDAgMCAwIDEuODIuMzNIOWExLjY1IDEuNjUgMCAwIDAgMS0xLjUxVjNhMiAyIDAgMCAxIDItMiAyIDIgMCAwIDEgMiAydi4wOWExLjY1IDEuNjUgMCAwIDAgMSAxLjUxIDEuNjUgMS42NSAwIDAgMCAxLjgyLS4zM2wuMDYtLjA2YTIgMiAwIDAgMSAyLjgzIDAgMiAyIDAgMCAxIDAgMi44M2wtLjA2LjA2YTEuNjUgMS42NSAwIDAgMC0uMzMgMS44MlY5YTEuNjUgMS42NSAwIDAgMCAxLjUxIDFIMjFhMiAyIDAgMCAxIDIgMiAyIDIgMCAwIDEtMiAyaC0uMDlhMS42NSAxLjY1IDAgMCAwLTEuNTEgMXpcIiAvPlxyXG4gICAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBGaWxlSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy01IGgtNVwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8cGF0aCBkPVwiTTEzIDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY5elwiIC8+XHJcbiAgICAgICAgPHBvbHlsaW5lIHBvaW50cz1cIjEzIDIgMTMgOSAyMCA5XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgTG9nb3V0SWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy01IGgtNVwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8cGF0aCBkPVwiTTkgMjFINWEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmg0XCIgLz5cclxuICAgICAgICA8cG9seWxpbmUgcG9pbnRzPVwiMTYgMTcgMjEgMTIgMTYgN1wiIC8+XHJcbiAgICAgICAgPGxpbmUgeDE9XCIyMVwiIHkxPVwiMTJcIiB4Mj1cIjlcIiB5Mj1cIjEyXCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgTWVudUljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNSBoLTVcIiB9KSA9PiAoXHJcbiAgICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICAgICAgPGxpbmUgeDE9XCIzXCIgeTE9XCIxMlwiIHgyPVwiMjFcIiB5Mj1cIjEyXCIgLz5cclxuICAgICAgICA8bGluZSB4MT1cIjNcIiB5MT1cIjZcIiB4Mj1cIjIxXCIgeTI9XCI2XCIgLz5cclxuICAgICAgICA8bGluZSB4MT1cIjNcIiB5MT1cIjE4XCIgeDI9XCIyMVwiIHkyPVwiMThcIiAvPlxyXG4gICAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBCZWxsSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy01IGgtNVwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8cGF0aCBkPVwiTTE4IDhBNiA2IDAgMCAwIDYgOGMwIDctMyA5LTMgOWgxOHMtMy0yLTMtOVwiIC8+XHJcbiAgICAgICAgPHBhdGggZD1cIk0xMy43MyAyMWEyIDIgMCAwIDEtMy40NiAwXCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgU2VhcmNoSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy01IGgtNVwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiMTFcIiBjeT1cIjExXCIgcj1cIjhcIiAvPlxyXG4gICAgICAgIDxsaW5lIHgxPVwiMjFcIiB5MT1cIjIxXCIgeDI9XCIxNi42NVwiIHkyPVwiMTYuNjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBUcmVuZFVwSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy01IGgtNVwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8cG9seWxpbmUgcG9pbnRzPVwiMjMgNiAxMy41IDE1LjUgOC41IDEwLjUgMSAxOFwiIC8+XHJcbiAgICAgICAgPHBvbHlsaW5lIHBvaW50cz1cIjE3IDYgMjMgNiAyMyAxMlwiIC8+XHJcbiAgICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IFRyZW5kRG93bkljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNSBoLTVcIiB9KSA9PiAoXHJcbiAgICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICAgICAgPHBvbHlsaW5lIHBvaW50cz1cIjIzIDE4IDEzLjUgOC41IDguNSAxMy41IDEgNlwiIC8+XHJcbiAgICAgICAgPHBvbHlsaW5lIHBvaW50cz1cIjE3IDE4IDIzIDE4IDIzIDEyXCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgRXllSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy01IGgtNVwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8cGF0aCBkPVwiTTEgMTJzNC04IDExLTggMTEgOCAxMSA4LTQgOC0xMSA4LTExLTgtMTEtOHpcIiAvPlxyXG4gICAgICAgIDxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiM1wiIC8+XHJcbiAgICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IERvd25sb2FkSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy01IGgtNVwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8cGF0aCBkPVwiTTIxIDE1djRhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ2LTRcIiAvPlxyXG4gICAgICAgIDxwb2x5bGluZSBwb2ludHM9XCI3IDEwIDEyIDE1IDE3IDEwXCIgLz5cclxuICAgICAgICA8bGluZSB4MT1cIjEyXCIgeTE9XCIxNVwiIHgyPVwiMTJcIiB5Mj1cIjNcIiAvPlxyXG4gICAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBHbG9iZUljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNSBoLTVcIiB9KSA9PiAoXHJcbiAgICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICAgICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIxMFwiIC8+XHJcbiAgICAgICAgPGxpbmUgeDE9XCIyXCIgeTE9XCIxMlwiIHgyPVwiMjJcIiB5Mj1cIjEyXCIgLz5cclxuICAgICAgICA8cGF0aCBkPVwiTTEyIDJhMTUuMyAxNS4zIDAgMCAxIDQgMTAgMTUuMyAxNS4zIDAgMCAxLTQgMTAgMTUuMyAxNS4zIDAgMCAxLTQtMTAgMTUuMyAxNS4zIDAgMCAxIDQtMTB6XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgQ29kZUljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNSBoLTVcIiB9KSA9PiAoXHJcbiAgICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICAgICAgPHBvbHlsaW5lIHBvaW50cz1cIjE2IDE4IDIyIDEyIDE2IDZcIiAvPlxyXG4gICAgICAgIDxwb2x5bGluZSBwb2ludHM9XCI4IDYgMiAxMiA4IDE4XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgRGF0YWJhc2VJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTUgaC01XCIgfSkgPT4gKFxyXG4gICAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgICAgIDxlbGxpcHNlIGN4PVwiMTJcIiBjeT1cIjVcIiByeD1cIjlcIiByeT1cIjNcIiAvPlxyXG4gICAgICAgIDxwYXRoIGQ9XCJNMjEgMTJjMCAxLjY2LTQgMy05IDNzLTktMS4zNC05LTNcIiAvPlxyXG4gICAgICAgIDxwYXRoIGQ9XCJNMyA1djE0YzAgMS42NiA0IDMgOSAzczktMS4zNCA5LTNWNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IFBsdXNJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTUgaC01XCIgfSkgPT4gKFxyXG4gICAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgICAgIDxsaW5lIHgxPVwiMTJcIiB5MT1cIjVcIiB4Mj1cIjEyXCIgeTI9XCIxOVwiIC8+XHJcbiAgICAgICAgPGxpbmUgeDE9XCI1XCIgeTE9XCIxMlwiIHgyPVwiMTlcIiB5Mj1cIjEyXCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgTW9yZUljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNSBoLTVcIiB9KSA9PiAoXHJcbiAgICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICAgICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIxXCIgLz5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiMTlcIiBjeT1cIjEyXCIgcj1cIjFcIiAvPlxyXG4gICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCIxMlwiIHI9XCIxXCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQWRtaW5EYXNoYm9hcmQoKSB7XHJcbiAgICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICAgIGNvbnN0IFtzaWRlYmFyT3Blbiwgc2V0U2lkZWJhck9wZW5dID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ2Rhc2hib2FyZCcpO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgLy8gQ2hlY2sgYXV0aGVudGljYXRpb25cclxuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhZG1pblRva2VuJyk7XHJcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWRtaW5Vc2VyJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCF0b2tlbikge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYWRtaW4vbG9naW4nO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXNlckRhdGEpIHtcclxuICAgICAgICAgICAgc2V0VXNlcihKU09OLnBhcnNlKHVzZXJEYXRhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWRtaW5Ub2tlbicpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhZG1pblVzZXInKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYWRtaW4vbG9naW4nO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzdGF0cyA9IFtcclxuICAgICAgICB7IGxhYmVsOiAnVG90YWwgVXNlcnMnLCB2YWx1ZTogJzEyLDQ1NicsIGNoYW5nZTogJysxMi41JScsIHRyZW5kOiAndXAnLCBpY29uOiBVc2Vyc0ljb24sIGNvbG9yOiAnaW5kaWdvJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdQYWdlIFZpZXdzJywgdmFsdWU6ICcxLjJNJywgY2hhbmdlOiAnKzguMiUnLCB0cmVuZDogJ3VwJywgaWNvbjogRXllSWNvbiwgY29sb3I6ICdwdXJwbGUnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0Rvd25sb2FkcycsIHZhbHVlOiAnNDUsODkyJywgY2hhbmdlOiAnKzIzLjElJywgdHJlbmQ6ICd1cCcsIGljb246IERvd25sb2FkSWNvbiwgY29sb3I6ICdwaW5rJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdBY3RpdmUgUHJvamVjdHMnLCB2YWx1ZTogJzMsNDU2JywgY2hhbmdlOiAnLTIuNCUnLCB0cmVuZDogJ2Rvd24nLCBpY29uOiBDb2RlSWNvbiwgY29sb3I6ICdjeWFuJyB9LFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCByZWNlbnRBY3Rpdml0eSA9IFtcclxuICAgICAgICB7IHVzZXI6ICdKb2huIERvZScsIGFjdGlvbjogJ0NyZWF0ZWQgbmV3IHByb2plY3QnLCB0aW1lOiAnMiBtaW4gYWdvJywgYXZhdGFyOiAnSkQnIH0sXHJcbiAgICAgICAgeyB1c2VyOiAnU2FyYWggU21pdGgnLCBhY3Rpb246ICdEb3dubG9hZGVkIElOREpTIHYzLjEuMicsIHRpbWU6ICcxNSBtaW4gYWdvJywgYXZhdGFyOiAnU1MnIH0sXHJcbiAgICAgICAgeyB1c2VyOiAnTWlrZSBKb2huc29uJywgYWN0aW9uOiAnU3RhcnJlZCB0aGUgcmVwb3NpdG9yeScsIHRpbWU6ICcxIGhvdXIgYWdvJywgYXZhdGFyOiAnTUonIH0sXHJcbiAgICAgICAgeyB1c2VyOiAnRW1pbHkgQnJvd24nLCBhY3Rpb246ICdTdWJtaXR0ZWQgYSBidWcgcmVwb3J0JywgdGltZTogJzIgaG91cnMgYWdvJywgYXZhdGFyOiAnRUInIH0sXHJcbiAgICAgICAgeyB1c2VyOiAnQWxleCBXaWxzb24nLCBhY3Rpb246ICdQdWJsaXNoZWQgZG9jdW1lbnRhdGlvbicsIHRpbWU6ICczIGhvdXJzIGFnbycsIGF2YXRhcjogJ0FXJyB9LFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBuYXZJdGVtcyA9IFtcclxuICAgICAgICB7IGlkOiAnZGFzaGJvYXJkJywgbGFiZWw6ICdEYXNoYm9hcmQnLCBpY29uOiBIb21lSWNvbiB9LFxyXG4gICAgICAgIHsgaWQ6ICd1c2VycycsIGxhYmVsOiAnVXNlcnMnLCBpY29uOiBVc2Vyc0ljb24gfSxcclxuICAgICAgICB7IGlkOiAnYW5hbHl0aWNzJywgbGFiZWw6ICdBbmFseXRpY3MnLCBpY29uOiBDaGFydEljb24gfSxcclxuICAgICAgICB7IGlkOiAnY29udGVudCcsIGxhYmVsOiAnQ29udGVudCcsIGljb246IEZpbGVJY29uIH0sXHJcbiAgICAgICAgeyBpZDogJ2RhdGFiYXNlJywgbGFiZWw6ICdEYXRhYmFzZScsIGljb246IERhdGFiYXNlSWNvbiB9LFxyXG4gICAgICAgIHsgaWQ6ICdzZXR0aW5ncycsIGxhYmVsOiAnU2V0dGluZ3MnLCBpY29uOiBTZXR0aW5nc0ljb24gfSxcclxuICAgIF07XHJcblxyXG4gICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctZ3JheS05MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCBib3JkZXItNCBib3JkZXItaW5kaWdvLTUwMCBib3JkZXItdC10cmFuc3BhcmVudCByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTkwMCBmbGV4XCI+XHJcbiAgICAgICAgICAgIHsvKiBTaWRlYmFyICovfVxyXG4gICAgICAgICAgICA8YXNpZGUgY2xhc3NOYW1lPXtgJHtzaWRlYmFyT3BlbiA/ICd3LTY0JyA6ICd3LTIwJ30gYmctZ3JheS04MDAvNTAgYm9yZGVyLXIgYm9yZGVyLWdyYXktNzAwLzUwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBmbGV4IGZsZXgtY29sYH0+XHJcbiAgICAgICAgICAgICAgICB7LyogTG9nbyAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC0xNiBmbGV4IGl0ZW1zLWNlbnRlciBweC02IGJvcmRlci1iIGJvcmRlci1ncmF5LTcwMC81MFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgY3Vyc29yLXBvaW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2xvZ28uc3ZnXCIgYWx0PVwiSU5ESlNcIiBjbGFzc05hbWU9XCJ3LTEwIGgtMTBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NpZGViYXJPcGVuICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCBiZy1ncmFkaWVudC10by1yIGZyb20taW5kaWdvLTQwMCB0by1wdXJwbGUtNDAwIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGpzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIE5hdmlnYXRpb24gKi99XHJcbiAgICAgICAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cImZsZXgtMSBwLTQgc3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge25hdkl0ZW1zLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBJY29uID0gaXRlbS5pY29uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoaXRlbS5pZCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHB4LTQgcHktMyByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsICR7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gaXRlbS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctaW5kaWdvLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctaW5kaWdvLTUwMC8yNSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtZ3JheS00MDAgaG92ZXI6YmctZ3JheS03MDAvNTAgaG92ZXI6dGV4dC13aGl0ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBjbGFzc05hbWU9XCJ3LTUgaC01IGZsZXgtc2hyaW5rLTBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzaWRlYmFyT3BlbiAmJiA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPntpdGVtLmxhYmVsfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDwvbmF2PlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBMb2dvdXQgKi99XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBib3JkZXItdCBib3JkZXItZ3JheS03MDAvNTBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUxvZ291dH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHB4LTQgcHktMyByb3VuZGVkLXhsIHRleHQtZ3JheS00MDAgaG92ZXI6YmctcmVkLTUwMC8xMCBob3Zlcjp0ZXh0LXJlZC00MDAgdHJhbnNpdGlvbi1hbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExvZ291dEljb24gY2xhc3NOYW1lPVwidy01IGgtNSBmbGV4LXNocmluay0wXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3NpZGViYXJPcGVuICYmIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+TG9nb3V0PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2FzaWRlPlxyXG5cclxuICAgICAgICAgICAgey8qIE1haW4gQ29udGVudCAqL31cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbFwiPlxyXG4gICAgICAgICAgICAgICAgey8qIEhlYWRlciAqL31cclxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiaC0xNiBiZy1ncmF5LTgwMC8zMCBib3JkZXItYiBib3JkZXItZ3JheS03MDAvNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTZcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNpZGViYXJPcGVuKCFzaWRlYmFyT3Blbil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLWdyYXktNzAwLzUwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TWVudUljb24gY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIFNlYXJjaCAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBoaWRkZW4gbWQ6YmxvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWFyY2hJY29uIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMyB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdy01IGgtNSB0ZXh0LWdyYXktNTAwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaC4uLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy02NCBwbC0xMCBwci00IHB5LTIgYmctZ3JheS04MDAvNTAgYm9yZGVyIGJvcmRlci1ncmF5LTcwMCByb3VuZGVkLWxnIHRleHQtd2hpdGUgcGxhY2Vob2xkZXItZ3JheS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWluZGlnby01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBOb3RpZmljYXRpb25zICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHAtMiB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6YmctZ3JheS03MDAvNTAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9yc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJlbGxJY29uIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEgcmlnaHQtMSB3LTIgaC0yIGJnLXJlZC01MDAgcm91bmRlZC1mdWxsXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBVc2VyICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOSBoLTkgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tNTAwIHRvLXB1cnBsZS01MDAgcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtd2hpdGUgZm9udC1tZWRpdW0gdGV4dC1zbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt1c2VyPy5uYW1lPy5zcGxpdCgnICcpLm1hcChuID0+IG5bMF0pLmpvaW4oJycpIHx8ICdBVSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIG1kOmJsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtd2hpdGVcIj57dXNlcj8ubmFtZSB8fCAnQWRtaW4gVXNlcid9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDBcIj57dXNlcj8uZW1haWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogQ29udGVudCAqL31cclxuICAgICAgICAgICAgICAgIDxtYWluIGNsYXNzTmFtZT1cImZsZXgtMSBwLTYgb3ZlcmZsb3ctYXV0b1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBQYWdlIEhlYWRlciAqL31cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtd2hpdGUgbWItMVwiPkRhc2hib2FyZDwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+V2VsY29tZSBiYWNrLCB7dXNlcj8ubmFtZT8uc3BsaXQoJyAnKVswXSB8fCAnQWRtaW4nfSEgSGVyZSdzIHdoYXQncyBoYXBwZW5pbmcuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIuNSBiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUgZm9udC1tZWRpdW0gcm91bmRlZC1sZyBob3ZlcjpiZy1pbmRpZ28tNzAwIHRyYW5zaXRpb24tY29sb3JzIHNoYWRvdy1sZyBzaGFkb3ctaW5kaWdvLTUwMC8yNVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBsdXNJY29uIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+TmV3IFByb2plY3Q8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogU3RhdHMgR3JpZCAqL31cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTYgbWItOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c3RhdHMubWFwKChzdGF0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgSWNvbiA9IHN0YXQuaWNvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJiZy1ncmF5LTgwMC81MCBib3JkZXIgYm9yZGVyLWdyYXktNzAwLzUwIHJvdW5kZWQteGwgcC02IGhvdmVyOmJnLWdyYXktODAwLzcwIHRyYW5zaXRpb24tYWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdy0xMiBoLTEyIGJnLSR7c3RhdC5jb2xvcn0tNTAwLzEwIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBjbGFzc05hbWU9e2B3LTYgaC02IHRleHQtJHtzdGF0LmNvbG9yfS00MDBgfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtc20gJHtzdGF0LnRyZW5kID09PSAndXAnID8gJ3RleHQtZ3JlZW4tNDAwJyA6ICd0ZXh0LXJlZC00MDAnfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzdGF0LnRyZW5kID09PSAndXAnID8gPFRyZW5kVXBJY29uIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiA6IDxUcmVuZERvd25JY29uIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57c3RhdC5jaGFuZ2V9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTFcIj57c3RhdC52YWx1ZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS00MDBcIj57c3RhdC5sYWJlbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogQ2hhcnRzICYgQWN0aXZpdHkgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0zIGdhcC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBUcmFmZmljIENoYXJ0IFBsYWNlaG9sZGVyICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTIgYmctZ3JheS04MDAvNTAgYm9yZGVyIGJvcmRlci1ncmF5LTcwMC81MCByb3VuZGVkLXhsIHAtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPlRyYWZmaWMgT3ZlcnZpZXc8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiYmctZ3JheS03MDAgYm9yZGVyIGJvcmRlci1ncmF5LTYwMCB0ZXh0LXdoaXRlIHRleHQtc20gcm91bmRlZC1sZyBweC0zIHB5LTEuNSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctaW5kaWdvLTUwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uPkxhc3QgNyBkYXlzPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24+TGFzdCAzMCBkYXlzPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24+TGFzdCA5MCBkYXlzPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIENoYXJ0IFBsYWNlaG9sZGVyICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTY0IGZsZXggaXRlbXMtZW5kIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBweC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1s0MCwgNjUsIDQ1LCA4MCwgNTUsIDcwLCA5MCwgNjAsIDc1LCA1MCwgODUsIDk1XS5tYXAoKGhlaWdodCwgaSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1ncmFkaWVudC10by10IGZyb20taW5kaWdvLTYwMCB0by1wdXJwbGUtNTAwIHJvdW5kZWQtdC1zbSB0cmFuc2l0aW9uLWFsbCBob3Zlcjpmcm9tLWluZGlnby01MDAgaG92ZXI6dG8tcHVycGxlLTQwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgaGVpZ2h0OiBgJHtoZWlnaHR9JWAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMFwiPntbJ0onLCAnRicsICdNJywgJ0EnLCAnTScsICdKJywgJ0onLCAnQScsICdTJywgJ08nLCAnTicsICdEJ11baV19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBSZWNlbnQgQWN0aXZpdHkgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS04MDAvNTAgYm9yZGVyIGJvcmRlci1ncmF5LTcwMC81MCByb3VuZGVkLXhsIHAtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPlJlY2VudCBBY3Rpdml0eTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJwLTEuNSB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6YmctZ3JheS03MDAvNTAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9yc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TW9yZUljb24gY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWNlbnRBY3Rpdml0eS5tYXAoKGFjdGl2aXR5LCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy05IGgtOSBiZy1ncmFkaWVudC10by1iciBmcm9tLWdyYXktNzAwIHRvLWdyYXktNjAwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1tZWRpdW0gZmxleC1zaHJpbmstMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpdml0eS5hdmF0YXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtd2hpdGUgdHJ1bmNhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj57YWN0aXZpdHkudXNlcn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTQwMCB0cnVuY2F0ZVwiPnthY3Rpdml0eS5hY3Rpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMCBtdC0wLjVcIj57YWN0aXZpdHkudGltZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInctZnVsbCBtdC00IHB5LTIuNSB0ZXh0LXNtIHRleHQtaW5kaWdvLTQwMCBob3Zlcjp0ZXh0LWluZGlnby0zMDAgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWaWV3IEFsbCBBY3Rpdml0eSBcdTIxOTJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIFF1aWNrIEFjdGlvbnMgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBtYi00XCI+UXVpY2sgQWN0aW9uczwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBtZDpncmlkLWNvbHMtNCBnYXAtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGljb246IFVzZXJzSWNvbiwgbGFiZWw6ICdNYW5hZ2UgVXNlcnMnLCBjb2xvcjogJ2luZGlnbycgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGljb246IEZpbGVJY29uLCBsYWJlbDogJ0VkaXQgQ29udGVudCcsIGNvbG9yOiAncHVycGxlJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWNvbjogQ2hhcnRJY29uLCBsYWJlbDogJ1ZpZXcgQW5hbHl0aWNzJywgY29sb3I6ICdwaW5rJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWNvbjogU2V0dGluZ3NJY29uLCBsYWJlbDogJ1NldHRpbmdzJywgY29sb3I6ICdjeWFuJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5tYXAoKGFjdGlvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBJY29uID0gYWN0aW9uLmljb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHAtNCBiZy1ncmF5LTgwMC81MCBib3JkZXIgYm9yZGVyLWdyYXktNzAwLzUwIHJvdW5kZWQteGwgaG92ZXI6YmctZ3JheS04MDAvNzAgaG92ZXI6Ym9yZGVyLWdyYXktNjAwIHRyYW5zaXRpb24tYWxsIGdyb3VwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2B3LTEwIGgtMTAgYmctJHthY3Rpb24uY29sb3J9LTUwMC8xMCByb3VuZGVkLWxnIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdyb3VwLWhvdmVyOnNjYWxlLTExMCB0cmFuc2l0aW9uLXRyYW5zZm9ybWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIGNsYXNzTmFtZT17YHctNSBoLTUgdGV4dC0ke2FjdGlvbi5jb2xvcn0tNDAwYH0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXdoaXRlXCI+e2FjdGlvbi5sYWJlbH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L21haW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG4iLCAiLyoqXG4gKiBQbGF0Zm9ybSBkZXRlY3Rpb24gdXRpbGl0aWVzIGZvciBJTkRKU1xuICpcbiAqIFVzYWdlOlxuICogaW1wb3J0IHsgaXNXZWIsIGlzRGVza3RvcCwgaXNNb2JpbGUsIGlzQW5kcm9pZCwgaXNJT1MsIHBsYXRmb3JtIH0gZnJvbSAnaW5kanMnO1xuICpcbiAqIGlmIChpc01vYmlsZSkgeyAuLi4gfVxuICovXG5cbi8vIENoZWNrIGlmIHJ1bm5pbmcgaW4gYSBicm93c2VyIGVudmlyb25tZW50XG5jb25zdCBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xuXG4vLyBFbGVjdHJvbiBkZXRlY3Rpb24gKHJlbmRlcmVyIHByb2Nlc3MpXG5leHBvcnQgY29uc3QgaXNEZXNrdG9wID1cbiAgaXNCcm93c2VyICYmXG4gICh3aW5kb3cucHJvY2Vzcz8udHlwZSA9PT0gXCJyZW5kZXJlclwiIHx8XG4gICAgISF3aW5kb3cuZWxlY3Ryb24gfHxcbiAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiRWxlY3Ryb25cIikpO1xuXG4vLyBDYXBhY2l0b3IgZGV0ZWN0aW9uXG5leHBvcnQgY29uc3QgaXNNb2JpbGUgPVxuICBpc0Jyb3dzZXIgJiZcbiAgKCEhd2luZG93LkNhcGFjaXRvciB8fFxuICAgICEhd2luZG93LmFuZHJvaWRCcmlkZ2UgfHxcbiAgICAhIXdpbmRvdy53ZWJraXQ/Lm1lc3NhZ2VIYW5kbGVycz8uYnJpZGdlIHx8XG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkNhcGFjaXRvclwiKSk7XG5cbi8vIFNwZWNpZmljIG1vYmlsZSBwbGF0Zm9ybXNcbmV4cG9ydCBjb25zdCBpc0FuZHJvaWQgPSBpc01vYmlsZSAmJiAvYW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5leHBvcnQgY29uc3QgaXNJT1MgPSBpc01vYmlsZSAmJiAvaXBob25lfGlwYWR8aXBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbi8vIFdlYiBmYWxsYmFjayAoaWYgbm90IGRlc2t0b3Agb3IgbW9iaWxlIGFwcClcbmV4cG9ydCBjb25zdCBpc1dlYiA9ICFpc0Rlc2t0b3AgJiYgIWlzTW9iaWxlO1xuXG4vLyBHZXQgY3VycmVudCBwbGF0Zm9ybSBuYW1lXG5leHBvcnQgY29uc3QgcGxhdGZvcm0gPSAoKCkgPT4ge1xuICBpZiAoaXNEZXNrdG9wKSByZXR1cm4gXCJkZXNrdG9wXCI7XG4gIGlmIChpc0FuZHJvaWQpIHJldHVybiBcImFuZHJvaWRcIjtcbiAgaWYgKGlzSU9TKSByZXR1cm4gXCJpb3NcIjtcbiAgaWYgKGlzTW9iaWxlKSByZXR1cm4gXCJtb2JpbGVcIjsgLy8gZmFsbGJhY2tcbiAgcmV0dXJuIFwid2ViXCI7XG59KSgpO1xuXG4vLyBSZWFjdCBOYXRpdmUgY29tcGF0aWJsZSBBUElcbmV4cG9ydCBjb25zdCBPUyA9IHBsYXRmb3JtO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0ID0gKG9iaikgPT4ge1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KE9TKSkgcmV0dXJuIG9ialtPU107XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoXCJuYXRpdmVcIikgJiYgaXNNb2JpbGUpIHJldHVybiBvYmpbXCJuYXRpdmVcIl07XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoXCJkZWZhdWx0XCIpKSByZXR1cm4gb2JqW1wiZGVmYXVsdFwiXTtcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNXZWIsXG4gIGlzRGVza3RvcCxcbiAgaXNNb2JpbGUsXG4gIGlzQW5kcm9pZCxcbiAgaXNJT1MsXG4gIHBsYXRmb3JtLFxuICBPUyxcbiAgc2VsZWN0LFxufTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBJbWFnZSA9IGZvcndhcmRSZWYoKHsgc3R5bGUsIHNvdXJjZSwgc3JjLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImltYWdlXCIpO1xuXG4gIC8vIFJlYWN0IE5hdGl2ZSB1c2VzICdzb3VyY2UnLCBXZWIgdXNlcyAnc3JjJy5cbiAgLy8gV2Ugc3VwcG9ydCBib3RoIHByb3BzIGZvciB1bml2ZXJzYWwgdXNhZ2UuXG4gIGNvbnN0IGltYWdlU291cmNlID0gc3JjIHx8IChzb3VyY2UgJiYgc291cmNlLnVyaSkgfHwgXCJcIjtcblxuICBjb25zdCBwcm9wcyA9IHtcbiAgICAuLi5yZXN0LFxuICAgIHNyYzogaW1hZ2VTb3VyY2UsXG4gICAgcmVmLFxuICB9O1xuXG4gIGlmIChDb21wb25lbnQgIT09IFwiaW1nXCIgJiYgQ29tcG9uZW50ICE9PSBcImltYWdlXCIpIHtcbiAgICAvLyBJZiBpdCByZWZlcnMgdG8gUmVhY3QgTmF0aXZlIEltYWdlLCBpdCBleHBlY3RzICdzb3VyY2UnXG4gICAgcHJvcHMuc291cmNlID0gc291cmNlIHx8IHsgdXJpOiBzcmMgfTtcbiAgICBkZWxldGUgcHJvcHMuc3JjO1xuICB9XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiA8Q29tcG9uZW50IHN0eWxlPXtmbGF0U3R5bGV9IHsuLi5wcm9wc30gLz47XG59KTtcblxuSW1hZ2UuZGlzcGxheU5hbWUgPSBcIkltYWdlXCI7XG5leHBvcnQgZGVmYXVsdCBJbWFnZTtcbiIsICJmdW5jdGlvbiBjYXBpdGFsaXplKHN0cikge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUVsZW1lbnQodHlwZSkge1xuICBjb25zdCBwbGF0Zm9ybSA9IHR5cGVvZiBQTEFURk9STSAhPT0gXCJ1bmRlZmluZWRcIiA/IFBMQVRGT1JNIDogXCJ3ZWJcIjtcblxuICBpZiAocGxhdGZvcm0gPT09IFwid2ViXCIpIHtcbiAgICBjb25zdCB3ZWJNYXAgPSB7XG4gICAgICB2aWV3OiBcImRpdlwiLFxuICAgICAgdGV4dDogXCJzcGFuXCIsXG4gICAgICBpbWFnZTogXCJpbWdcIixcbiAgICAgIGltYWdlYmFja2dyb3VuZDogXCJkaXZcIiwgLy8gbWFwIGltYWdlLWJhY2tncm91bmQgdG8gZGl2IHdpdGggc3R5bGVcbiAgICAgIHNjcm9sbHZpZXc6IFwiZGl2XCIsXG4gICAgICBmbGF0bGlzdDogXCJkaXZcIixcbiAgICAgIHNlY3Rpb25saXN0OiBcImRpdlwiLFxuICAgICAga2V5Ym9hcmRhdm9pZGluZ3ZpZXc6IFwiZGl2XCIsXG4gICAgICBzYWZlYXJlYXZpZXc6IFwiZGl2XCIsXG4gICAgICBwcmVzc2FibGU6IFwiYnV0dG9uXCIsXG4gICAgICB0b3VjaGFibGVvcGFjaXR5OiBcImJ1dHRvblwiLFxuICAgICAgdG91Y2hhYmxlaGlnaGxpZ2h0OiBcImJ1dHRvblwiLFxuICAgICAgc3dpdGNoOiBcImlucHV0XCIsIC8vIHR5cGU9J2NoZWNrYm94J1xuICAgICAgdGV4dGFyZWE6IFwidGV4dGFyZWFcIixcbiAgICAgIGJ1dHRvbjogXCJidXR0b25cIixcbiAgICAgIG1vZGFsOiBcImRpdlwiLFxuICAgICAgYWN0aXZpdHlpbmRpY2F0b3I6IFwiZGl2XCIsXG4gICAgICByZWZyZXNoY29udHJvbDogXCJkaXZcIixcbiAgICB9O1xuICAgIHJldHVybiB3ZWJNYXBbdHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0vZywgXCJcIildIHx8IFwiZGl2XCI7XG4gIH1cblxuICBpZiAocGxhdGZvcm0gPT09IFwibW9iaWxlXCIpIHtcbiAgICAvLyBJbiBSZWFjdCBOYXRpdmUsIGNvbXBvbmVudHMgYXJlIENhbWVsQ2FzZVxuICAgIC8vIFdlIG5lZWQgdG8gbWFwIGdlbmVyaWMgbmFtZXMgdG8gUk4gbmFtZXNcbiAgICBjb25zdCBtb2JpbGVNYXAgPSB7XG4gICAgICB2aWV3OiBcIlZpZXdcIixcbiAgICAgIHRleHQ6IFwiVGV4dFwiLFxuICAgICAgaW1hZ2U6IFwiSW1hZ2VcIixcbiAgICAgIGltYWdlYmFja2dyb3VuZDogXCJJbWFnZUJhY2tncm91bmRcIixcbiAgICAgIHNjcm9sbHZpZXc6IFwiU2Nyb2xsVmlld1wiLFxuICAgICAgZmxhdGxpc3Q6IFwiRmxhdExpc3RcIixcbiAgICAgIHNlY3Rpb25saXN0OiBcIlNlY3Rpb25MaXN0XCIsXG4gICAgICBrZXlib2FyZGF2b2lkaW5ndmlldzogXCJLZXlib2FyZEF2b2lkaW5nVmlld1wiLFxuICAgICAgc2FmZWFyZWF2aWV3OiBcIlNhZmVBcmVhVmlld1wiLFxuICAgICAgcHJlc3NhYmxlOiBcIlByZXNzYWJsZVwiLFxuICAgICAgdG91Y2hhYmxlb3BhY2l0eTogXCJUb3VjaGFibGVPcGFjaXR5XCIsXG4gICAgICB0b3VjaGFibGVoaWdobGlnaHQ6IFwiVG91Y2hhYmxlSGlnaGxpZ2h0XCIsXG4gICAgICBzd2l0Y2g6IFwiU3dpdGNoXCIsXG4gICAgICBtb2RhbDogXCJNb2RhbFwiLFxuICAgICAgYWN0aXZpdHlpbmRpY2F0b3I6IFwiQWN0aXZpdHlJbmRpY2F0b3JcIixcbiAgICAgIHJlZnJlc2hjb250cm9sOiBcIlJlZnJlc2hDb250cm9sXCIsXG4gICAgICBidXR0b246IFwiQnV0dG9uXCIsXG4gICAgfTtcbiAgICBjb25zdCBybk5hbWUgPVxuICAgICAgbW9iaWxlTWFwW3R5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tL2csIFwiXCIpXSB8fCBjYXBpdGFsaXplKHR5cGUpO1xuXG4gICAgLy8gU2FmZXR5IGNoZWNrIGZvciBSZWFjdCBOYXRpdmUgZW52aXJvbm1lbnRcbiAgICAvLyByZWFjdC1uYXRpdmUtd2ViIG1pZ2h0IGJlIGFsaWFzZWQsIG9yIHdlIG1pZ2h0IGJlIGluIGEgcmVhbCBSTiBlbnZpcm9ubWVudFxuICAgIHRyeSB7XG4gICAgICAvLyBVc2luZyBnbG9iYWwgY2hlY2sgb3Igc2FmZSByZXF1aXJlXG4gICAgICBpZiAodHlwZW9mIHJlcXVpcmUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoXCJyZWFjdC1uYXRpdmVcIilbcm5OYW1lXTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgd2luZG93LlJlYWN0ICYmXG4gICAgICAgIHdpbmRvdy5SZWFjdC5OYXRpdmVcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gd2luZG93LlJlYWN0Lk5hdGl2ZVtybk5hbWVdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihgUmVhY3QgTmF0aXZlIGNvbXBvbmVudCAke3JuTmFtZX0gbm90IGZvdW5kYCk7XG4gICAgfVxuICAgIC8vIEZhbGxiYWNrIHRvIFZpZXcgb3IgZGl2IGRlcGVuZGluZyBvbiBjb250ZXh0LCBidXQgVmlldyBpcyBzYWZlIGVub3VnaCBmb3IgbG9naWNhbCByZXR1cm4gaWYgbW9ja2VkXG4gICAgcmV0dXJuIFwiVmlld1wiO1xuICB9XG5cbiAgcmV0dXJuIFwiZGl2XCI7XG59XG4iLCAiLy8gTW9jayBTdHlsZVNoZWV0IGZvciBjb21wYXRpYmlsaXR5LlxuLy8gSW4gSU5ESlMgd2ViLCB3ZSB1c3VhbGx5IHVzZSBzdGFuZGFyZCBzdHlsZSBvYmplY3RzIG9yIENTUy5cbi8vIFRoaXMgYWxsb3dzIFN0eWxlU2hlZXQuY3JlYXRlKHt9KSB0byByZXR1cm4gdGhlIG9iamVjdHMgYXMtaXMuXG5cbmV4cG9ydCBjb25zdCBTdHlsZVNoZWV0ID0ge1xuICBjcmVhdGU6IChzdHlsZXMpID0+IHN0eWxlcyxcbiAgZmxhdHRlbjogKHN0eWxlcykgPT4ge1xuICAgIGlmICghc3R5bGVzKSByZXR1cm4ge307XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3R5bGVzKSkge1xuICAgICAgcmV0dXJuIHN0eWxlc1xuICAgICAgICAuZmxhdChJbmZpbml0eSlcbiAgICAgICAgLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiAoaXRlbSA/IHsgLi4uYWNjLCAuLi5pdGVtIH0gOiBhY2MpLCB7fSk7XG4gICAgfVxuICAgIHJldHVybiBzdHlsZXM7XG4gIH0sXG4gIGhhaXJsaW5lV2lkdGg6IDEsXG4gIGFic29sdXRlRmlsbDoge1xuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogMCxcbiAgICB0b3A6IDAsXG4gICAgYm90dG9tOiAwLFxuICB9LFxuICBhYnNvbHV0ZUZpbGxPYmplY3Q6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIGJvdHRvbTogMCxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0eWxlU2hlZXQ7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBJTkRKUyBMaW5rIGNvbXBvbmVudCAtIGxpZ2h0d2VpZ2h0IGNsaWVudC1zaWRlIG5hdmlnYXRpb24gaGVscGVyXG4vLyBQZXJmb3JtcyBTUEEtbGlrZSBuYXZpZ2F0aW9uIGZvciBzYW1lLW9yaWdpbiBpbnRlcm5hbCBsaW5rcy5cbi8vIFByb3BzOiBocmVmLCBwcmVmZXRjaCwgcmVwbGFjZSwgc2Nyb2xsIChkZWZhdWx0IHRydWUpLCBvbkNsaWNrLCB0YXJnZXQsIHJlbCwgY2xhc3NOYW1lLCBzdHlsZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGluayh7XG4gIGhyZWYsXG4gIGNoaWxkcmVuLFxuICBwcmVmZXRjaCA9IGZhbHNlLFxuICByZXBsYWNlID0gZmFsc2UsXG4gIHNjcm9sbCA9IHRydWUsXG4gIG9uQ2xpY2ssXG4gIGNsYXNzTmFtZSxcbiAgc3R5bGUsXG4gIHRhcmdldCxcbiAgcmVsLFxuICAuLi5yZXN0XG59KSB7XG4gIC8vIEJhc2ljIHByZWZldGNoOiBoaW50IHRoZSBicm93c2VyIHZpYSA8bGluayByZWw9XCJwcmVmZXRjaFwiPlxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcHJlZmV0Y2ggfHwgIWhyZWYpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICAgICAgbC5yZWwgPSBcInByZWZldGNoXCI7XG4gICAgICBsLmhyZWYgPSBocmVmO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZChsKTtcbiAgICAgICAgfSBjYXRjaCB7fVxuICAgICAgfTtcbiAgICB9IGNhdGNoIHt9XG4gIH0sIFtocmVmLCBwcmVmZXRjaF0pO1xuXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGUpID0+IHtcbiAgICBpZiAob25DbGljaykgb25DbGljayhlKTtcbiAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG4gICAgLy8gT25seSBpbnRlcmNlcHQgc2ltcGxlIGxlZnQtY2xpY2tzIHdpdGhvdXQgbW9kaWZpZXIga2V5c1xuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCB8fCBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkgfHwgZS5hbHRLZXkpXG4gICAgICByZXR1cm47XG4gICAgaWYgKCFocmVmKSByZXR1cm47XG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IFwiX3NlbGZcIikgcmV0dXJuO1xuICAgIGxldCB1cmw7XG4gICAgdHJ5IHtcbiAgICAgIHVybCA9IG5ldyBVUkwoaHJlZiwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJbnZhbGlkIFVSTCwgbGV0IGJyb3dzZXIgaGFuZGxlXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFNraXAgbm9uLWh0dHAocykgcHJvdG9jb2xzIGFuZCBzcGVjaWFsIHNjaGVtZXNcbiAgICBjb25zdCBwcm90byA9IHVybC5wcm90b2NvbDtcbiAgICBpZiAocHJvdG8gJiYgcHJvdG8gIT09IFwiaHR0cDpcIiAmJiBwcm90byAhPT0gXCJodHRwczpcIikgcmV0dXJuO1xuICAgIC8vIEV4dGVybmFsXG4gICAgaWYgKHVybC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHJldHVybjtcbiAgICAvLyBSZXNwZWN0IGRvd25sb2FkIGxpbmtzXG4gICAgaWYgKHJlc3QuZG93bmxvYWQpIHJldHVybjtcbiAgICAvLyBIYXNoLW9ubHkgbmF2aWdhdGlvbiBvcHRpbWl6YXRpb25cbiAgICBjb25zdCBjdXJyZW50ID1cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICBjb25zdCBuZXh0ID0gdXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaCArIHVybC5oYXNoO1xuICAgIGlmIChuZXh0ID09PSBjdXJyZW50KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoc2Nyb2xsKSB7XG4gICAgICAgIGlmICh1cmwuaGFzaCkge1xuICAgICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodXJsLmhhc2guc2xpY2UoMSkpO1xuICAgICAgICAgIGlmIChlbCkgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgICBlbHNlIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIERvIHB1c2gvcmVwbGFjZSBzdGF0ZVxuICAgIGlmIChyZXBsYWNlKSB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICAgIGVsc2Ugd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcbiAgICAvLyBFbWl0IGEgY3VzdG9tIG5hdmlnYXRpb24gZXZlbnQgc28gdGhlIGFwcCBjYW4gbG9hZCB0aGUgdGFyZ2V0IG1vZHVsZVxuICAgIHRyeSB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwiaW5kOm5hdmlnYXRlXCIsIHsgZGV0YWlsOiB7IGhyZWY6IG5leHQgfSB9KSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCB7fVxuICAgIC8vIFNjcm9sbCBiZWhhdmlvclxuICAgIGlmIChzY3JvbGwpIHtcbiAgICAgIGlmICh1cmwuaGFzaCkge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHVybC5oYXNoLnNsaWNlKDEpKTtcbiAgICAgICAgaWYgKGVsKSBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICBlbHNlIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVsRmluYWwgPVxuICAgIHRhcmdldCA9PT0gXCJfYmxhbmtcIlxuICAgICAgPyBbcmVsLCBcIm5vb3BlbmVyXCIsIFwibm9yZWZlcnJlclwiXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIilcbiAgICAgIDogcmVsO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICBcImFcIixcbiAgICB7XG4gICAgICBocmVmLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgc3R5bGUsXG4gICAgICB0YXJnZXQsXG4gICAgICByZWw6IHJlbEZpbmFsLFxuICAgICAgb25DbGljazogaGFuZGxlQ2xpY2ssXG4gICAgICAuLi5yZXN0LFxuICAgIH0sXG4gICAgY2hpbGRyZW4sXG4gICk7XG59XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVmlldyA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidmlld1wiKTtcblxuICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblZpZXcuZGlzcGxheU5hbWUgPSBcIlZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVGV4dCA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidGV4dFwiKTtcblxuICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblRleHQuZGlzcGxheU5hbWUgPSBcIlRleHRcIjtcbmV4cG9ydCBkZWZhdWx0IFRleHQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU2Nyb2xsVmlldyA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlLFxuICAgICAgc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yID0gdHJ1ZSxcbiAgICAgIHNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3IgPSB0cnVlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNjcm9sbHZpZXdcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIC8vIFdlYiBmYWxsYmFja1xuICAgICAgY29uc3QgY29udGFpbmVyU3R5bGUgPSB7XG4gICAgICAgIG92ZXJmbG93WDogaG9yaXpvbnRhbCA/IFwiYXV0b1wiIDogXCJoaWRkZW5cIixcbiAgICAgICAgb3ZlcmZsb3dZOiBob3Jpem9udGFsID8gXCJoaWRkZW5cIiA6IFwiYXV0b1wiLFxuICAgICAgICBXZWJraXRPdmVyZmxvd1Njcm9sbGluZzogXCJ0b3VjaFwiLFxuICAgICAgICBzY3JvbGxiYXJXaWR0aDogKFxuICAgICAgICAgIGhvcml6b250YWxcbiAgICAgICAgICAgID8gIXNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvclxuICAgICAgICAgICAgOiAhc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvclxuICAgICAgICApXG4gICAgICAgICAgPyBcIm5vbmVcIlxuICAgICAgICAgIDogXCJhdXRvXCIsXG4gICAgICAgIG1zT3ZlcmZsb3dTdHlsZTogKFxuICAgICAgICAgIGhvcml6b250YWxcbiAgICAgICAgICAgID8gIXNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvclxuICAgICAgICAgICAgOiAhc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvclxuICAgICAgICApXG4gICAgICAgICAgPyBcIm5vbmVcIlxuICAgICAgICAgIDogXCJhdXRvXCIsXG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuICAgICAgY29uc3QgY29udGVudFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtjb250ZW50Q29udGFpbmVyU3R5bGVdKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtjb250YWluZXJTdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5yZXN0fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtjb250ZW50U3R5bGV9PntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICBzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3I9e3Nob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvcn1cbiAgICAgICAgc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvcj17c2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvcn1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuU2Nyb2xsVmlldy5kaXNwbGF5TmFtZSA9IFwiU2Nyb2xsVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgU2Nyb2xsVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBUZXh0SW5wdXQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgdmFsdWUsXG4gICAgICBkZWZhdWx0VmFsdWUsXG4gICAgICBvbkNoYW5nZVRleHQsXG4gICAgICBvbkZvY3VzLFxuICAgICAgb25CbHVyLFxuICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICBzZWN1cmVUZXh0RW50cnkgPSBmYWxzZSxcbiAgICAgIG11bHRpbGluZSA9IGZhbHNlLFxuICAgICAgbnVtYmVyT2ZMaW5lcyA9IDQsXG4gICAgICBlZGl0YWJsZSA9IHRydWUsXG4gICAgICBzdHlsZSxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgIGlmIChvbkNoYW5nZVRleHQpIG9uQ2hhbmdlVGV4dChlLnRhcmdldC52YWx1ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNvbW1vblN0eWxlID0ge1xuICAgICAgYXBwZWFyYW5jZTogXCJub25lXCIsXG4gICAgICBvdXRsaW5lOiBcIm5vbmVcIixcbiAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgIH07XG5cbiAgICBpZiAobXVsdGlsaW5lKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxuICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICByZWFkT25seT17IWVkaXRhYmxlfVxuICAgICAgICAgIHJvd3M9e251bWJlck9mTGluZXN9XG4gICAgICAgICAgc3R5bGU9e3sgLi4uY29tbW9uU3R5bGUsIHJlc2l6ZTogXCJub25lXCIgfX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdHlwZT17c2VjdXJlVGV4dEVudHJ5ID8gXCJwYXNzd29yZFwiIDogXCJ0ZXh0XCJ9XG4gICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfVxuICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XG4gICAgICAgIG9uQmx1cj17b25CbHVyfVxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgIHJlYWRPbmx5PXshZWRpdGFibGV9XG4gICAgICAgIHN0eWxlPXtjb21tb25TdHlsZX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuVGV4dElucHV0LmRpc3BsYXlOYW1lID0gXCJUZXh0SW5wdXRcIjtcbmV4cG9ydCBkZWZhdWx0IFRleHRJbnB1dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBCdXR0b24gPSBmb3J3YXJkUmVmKFxuICAoeyB0aXRsZSwgb25QcmVzcywgY29sb3IsIGRpc2FibGVkLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XG4gICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkJ1dHRvbi5kaXNwbGF5TmFtZSA9IFwiQnV0dG9uXCI7XG5leHBvcnQgZGVmYXVsdCBCdXR0b247XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgQWN0aXZpdHlJbmRpY2F0b3IgPSBmb3J3YXJkUmVmKFxuICAoeyBzaXplID0gXCJzbWFsbFwiLCBjb2xvciA9IFwiIzk5OVwiLCBzdHlsZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImFjdGl2aXR5aW5kaWNhdG9yXCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICBjb25zdCBzcGlubmVyU3R5bGUgPSB7XG4gICAgICAgIGFuaW1hdGlvbjogXCJpbmRqcy1zcGluIDFzIGxpbmVhciBpbmZpbml0ZVwiLFxuICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiLFxuICAgICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgICAgfTtcblxuICAgICAgLy8gSW5qZWN0IGtleWZyYW1lcyBpZiBub3QgcHJlc2VudFxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kanMtc3Bpbi1zdHlsZVwiKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgIHN0eWxlRWwuaWQgPSBcImluZGpzLXNwaW4tc3R5bGVcIjtcbiAgICAgICAgc3R5bGVFbC5pbm5lckhUTUwgPSBgQGtleWZyYW1lcyBpbmRqcy1zcGluIHsgMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfSAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfSB9YDtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtzcGlubmVyU3R5bGV9IHsuLi5yZXN0fSAvPjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudCByZWY9e3JlZn0gc2l6ZT17c2l6ZX0gY29sb3I9e2NvbG9yfSBzdHlsZT17c3R5bGV9IHsuLi5yZXN0fSAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5BY3Rpdml0eUluZGljYXRvci5kaXNwbGF5TmFtZSA9IFwiQWN0aXZpdHlJbmRpY2F0b3JcIjtcbmV4cG9ydCBkZWZhdWx0IEFjdGl2aXR5SW5kaWNhdG9yO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFN3aXRjaCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7IHZhbHVlLCBvblZhbHVlQ2hhbmdlLCBkaXNhYmxlZCwgdHJhY2tDb2xvciwgdGh1bWJDb2xvciwgc3R5bGUsIC4uLnJlc3QgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic3dpdGNoXCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJpbnB1dFwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICBjaGVja2VkPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uVmFsdWVDaGFuZ2UgJiYgb25WYWx1ZUNoYW5nZShlLnRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgb25WYWx1ZUNoYW5nZT17b25WYWx1ZUNoYW5nZX1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICB0cmFja0NvbG9yPXt0cmFja0NvbG9yfVxuICAgICAgICB0aHVtYkNvbG9yPXt0aHVtYkNvbG9yfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuU3dpdGNoLmRpc3BsYXlOYW1lID0gXCJTd2l0Y2hcIjtcbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTY3JvbGxWaWV3IGZyb20gXCIuL3Njcm9sbC12aWV3LmpzeFwiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEZsYXRMaXN0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGRhdGEsXG4gICAgICByZW5kZXJJdGVtLFxuICAgICAga2V5RXh0cmFjdG9yLFxuICAgICAgTGlzdEhlYWRlckNvbXBvbmVudCxcbiAgICAgIExpc3RGb290ZXJDb21wb25lbnQsXG4gICAgICBMaXN0RW1wdHlDb21wb25lbnQsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBudW1Db2x1bW5zID0gMSxcbiAgICAgIGhvcml6b250YWwgPSBmYWxzZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJmbGF0bGlzdFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uXG4gICAgICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKExpc3RFbXB0eUNvbXBvbmVudCkge1xuICAgICAgICAgIGNvbnN0IEVtcHR5ID0gUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEVtcHR5Q29tcG9uZW50KSA/IChcbiAgICAgICAgICAgIExpc3RFbXB0eUNvbXBvbmVudFxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8TGlzdEVtcHR5Q29tcG9uZW50IC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge0xpc3RIZWFkZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIHtFbXB0eX1cbiAgICAgICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEZvb3RlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxMaXN0Rm9vdGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpdGVtcyA9IGRhdGEgfHwgW107XG4gICAgICBjb25zdCByZW5kZXJMaXN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGtleUV4dHJhY3RvclxuICAgICAgICAgICAgPyBrZXlFeHRyYWN0b3IoaXRlbSwgaW5kZXgpXG4gICAgICAgICAgICA6IGluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2tleX0+XG4gICAgICAgICAgICAgIHtyZW5kZXJJdGVtKHsgaXRlbSwgaW5kZXggfSl9XG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgZmxhdENvbnRlbnRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbY29udGVudENvbnRhaW5lclN0eWxlXSk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtmbGF0Q29udGVudFN0eWxlfVxuICAgICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAge3JlbmRlckxpc3QoKX1cbiAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgIHJlbmRlckl0ZW09e3JlbmRlckl0ZW19XG4gICAgICAgIGtleUV4dHJhY3Rvcj17a2V5RXh0cmFjdG9yfVxuICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50PXtMaXN0SGVhZGVyQ29tcG9uZW50fVxuICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50PXtMaXN0Rm9vdGVyQ29tcG9uZW50fVxuICAgICAgICBMaXN0RW1wdHlDb21wb25lbnQ9e0xpc3RFbXB0eUNvbXBvbmVudH1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIG51bUNvbHVtbnM9e251bUNvbHVtbnN9XG4gICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuRmxhdExpc3QuZGlzcGxheU5hbWUgPSBcIkZsYXRMaXN0XCI7XG5leHBvcnQgZGVmYXVsdCBGbGF0TGlzdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUb3VjaGFibGVPcGFjaXR5ID0gZm9yd2FyZFJlZihcbiAgKHsgY2hpbGRyZW4sIHN0eWxlLCBvblByZXNzLCBhY3RpdmVPcGFjaXR5ID0gMC4yLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidG91Y2hhYmxlb3BhY2l0eVwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihbeyBjdXJzb3I6IFwicG9pbnRlclwiIH0sIHN0eWxlXSl9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IGFjdGl2ZU9wYWNpdHkpfVxuICAgICAgICAgIG9uTW91c2VVcD17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDEpfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDEpfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgYWN0aXZlT3BhY2l0eT17YWN0aXZlT3BhY2l0eX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5Ub3VjaGFibGVPcGFjaXR5LmRpc3BsYXlOYW1lID0gXCJUb3VjaGFibGVPcGFjaXR5XCI7XG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVPcGFjaXR5O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFByZXNzYWJsZSA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCBvblByZXNzLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInByZXNzYWJsZVwiKTtcblxuICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbXG4gICAgICB7IGN1cnNvcjogXCJwb2ludGVyXCIgfSxcbiAgICAgIHR5cGVvZiBzdHlsZSA9PT0gXCJmdW5jdGlvblwiID8gc3R5bGUoeyBwcmVzc2VkOiBmYWxzZSB9KSA6IHN0eWxlLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b24gcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IG9uQ2xpY2s9e29uUHJlc3N9IHsuLi5yZXN0fT5cbiAgICAgICAge3R5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBjaGlsZHJlbih7IHByZXNzZWQ6IGZhbHNlIH0pXG4gICAgICAgICAgOiBjaGlsZHJlbn1cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtzdHlsZX0gb25QcmVzcz17b25QcmVzc30gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblByZXNzYWJsZS5kaXNwbGF5TmFtZSA9IFwiUHJlc3NhYmxlXCI7XG5leHBvcnQgZGVmYXVsdCBQcmVzc2FibGU7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgSW1hZ2VCYWNrZ3JvdW5kID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHsgY2hpbGRyZW4sIHN0eWxlLCBpbWFnZVN0eWxlLCBzb3VyY2UsIHNyYywgcmVzaXplTW9kZSA9IFwiY292ZXJcIiwgLi4ucmVzdCB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJpbWFnZWJhY2tncm91bmRcIik7XG5cbiAgICBjb25zdCBpbWFnZVNvdXJjZSA9IHNyYyB8fCAoc291cmNlICYmIHNvdXJjZS51cmkpIHx8IFwiXCI7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbXG4gICAgICAgIHtcbiAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2ltYWdlU291cmNlfSlgLFxuICAgICAgICAgIGJhY2tncm91bmRTaXplOiByZXNpemVNb2RlID09PSBcInN0cmV0Y2hcIiA/IFwiMTAwJSAxMDAlXCIgOiByZXNpemVNb2RlLFxuICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0OiBcIm5vLXJlcGVhdFwiLFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZSxcbiAgICAgIF0pO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIGltYWdlU3R5bGU9e2ltYWdlU3R5bGV9XG4gICAgICAgIHNvdXJjZT17c291cmNlIHx8IHsgdXJpOiBzcmMgfX1cbiAgICAgICAgcmVzaXplTW9kZT17cmVzaXplTW9kZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5JbWFnZUJhY2tncm91bmQuZGlzcGxheU5hbWUgPSBcIkltYWdlQmFja2dyb3VuZFwiO1xuZXhwb3J0IGRlZmF1bHQgSW1hZ2VCYWNrZ3JvdW5kO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuXG5jb25zdCBNb2RhbCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHZpc2libGUsXG4gICAgICB0cmFuc3BhcmVudCxcbiAgICAgIGFuaW1hdGlvblR5cGUsXG4gICAgICBvblJlcXVlc3RDbG9zZSxcbiAgICAgIHN0eWxlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcIm1vZGFsXCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICBpZiAoIXZpc2libGUpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBtb2RhbFN0eWxlID0ge1xuICAgICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgICAgfTtcblxuICAgICAgLy8gUmVuZGVyIGFzIHBvcnRhbCBpZiBwb3NzaWJsZVxuICAgICAgY29uc3QgY29udGVudCA9IChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e21vZGFsU3R5bGV9IHsuLi5yZXN0fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcblxuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gUmVhY3RET00uY3JlYXRlUG9ydGFsKGNvbnRlbnQsIGRvY3VtZW50LmJvZHkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHZpc2libGU9e3Zpc2libGV9XG4gICAgICAgIHRyYW5zcGFyZW50PXt0cmFuc3BhcmVudH1cbiAgICAgICAgYW5pbWF0aW9uVHlwZT17YW5pbWF0aW9uVHlwZX1cbiAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e29uUmVxdWVzdENsb3NlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbk1vZGFsLmRpc3BsYXlOYW1lID0gXCJNb2RhbFwiO1xuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU2FmZUFyZWFWaWV3ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic2FmZWFyZWF2aWV3XCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gey4uLnJlc3R9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzdHlsZT17c3R5bGV9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5TYWZlQXJlYVZpZXcuZGlzcGxheU5hbWUgPSBcIlNhZmVBcmVhVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgU2FmZUFyZWFWaWV3O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XG5cbi8vIFdlYiBtb2NrIG9mIFN0YXR1c0Jhci4gSW4gbmF0aXZlIGl0IHdvdWxkIGNoYW5nZSB0aGUgYmFyIHN0eWxlLlxuLy8gSW4gd2ViLCBtYXliZSBpdCBjaGFuZ2VzIHRoZSBtZXRhIHRoZW1lLWNvbG9yIHRhZy5cblxuZnVuY3Rpb24gU3RhdHVzQmFyKHsgYmFyU3R5bGUgPSBcImRlZmF1bHRcIiwgYmFja2dyb3VuZENvbG9yLCBoaWRkZW4gPSBmYWxzZSB9KSB7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgLy8gQXR0ZW1wdCB0byBzZXQgdGhlbWUtY29sb3IgbWV0YSB0YWcgaWYgYmFja2dyb3VuZENvbG9yIHByb3ZpZGVkXG4gICAgaWYgKGJhY2tncm91bmRDb2xvcikge1xuICAgICAgbGV0IG1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ0aGVtZS1jb2xvclwiXScpO1xuICAgICAgaWYgKCFtZXRhKSB7XG4gICAgICAgIG1ldGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWV0YVwiKTtcbiAgICAgICAgbWV0YS5uYW1lID0gXCJ0aGVtZS1jb2xvclwiO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG1ldGEpO1xuICAgICAgfVxuICAgICAgbWV0YS5jb250ZW50ID0gYmFja2dyb3VuZENvbG9yO1xuICAgIH1cbiAgfSwgW2JhY2tncm91bmRDb2xvcl0pO1xuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0dXNCYXI7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU2Nyb2xsVmlldyBmcm9tIFwiLi9zY3JvbGwtdmlldy5qc3hcIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0LmpzeFwiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNlY3Rpb25MaXN0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIHNlY3Rpb25zLFxuICAgICAgcmVuZGVySXRlbSxcbiAgICAgIHJlbmRlclNlY3Rpb25IZWFkZXIsXG4gICAgICBrZXlFeHRyYWN0b3IsXG4gICAgICBMaXN0SGVhZGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIHN0aWNreVNlY3Rpb25IZWFkZXJzRW5hYmxlZCA9IHRydWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic2VjdGlvbmxpc3RcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIC8vIFdlYiBmYWxsYmFja1xuICAgICAgY29uc3QgcmVuZGVyU2VjdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAoc2VjdGlvbnMgfHwgW10pLm1hcCgoc2VjdGlvbiwgc2VjdGlvbkluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHNlY3Rpb24uZGF0YSB8fCBbXTtcbiAgICAgICAgICBjb25zdCBrZXkgPSBzZWN0aW9uLmtleSB8fCBzZWN0aW9uSW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17a2V5fT5cbiAgICAgICAgICAgICAge3JlbmRlclNlY3Rpb25IZWFkZXIgJiYgcmVuZGVyU2VjdGlvbkhlYWRlcih7IHNlY3Rpb24gfSl9XG4gICAgICAgICAgICAgIHtkYXRhLm1hcCgoaXRlbSwgaXRlbUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUtleSA9IGtleUV4dHJhY3RvclxuICAgICAgICAgICAgICAgICAgPyBrZXlFeHRyYWN0b3IoaXRlbSwgaXRlbUluZGV4KVxuICAgICAgICAgICAgICAgICAgOiBpdGVtLmtleSB8fCBpdGVtLmlkIHx8IGtleSArIFwiLVwiICsgaXRlbUluZGV4O1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtpdGVtS2V5fT5cbiAgICAgICAgICAgICAgICAgICAge3JlbmRlckl0ZW0oeyBpdGVtLCBpbmRleDogaXRlbUluZGV4LCBzZWN0aW9uIH0pfVxuICAgICAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge0xpc3RIZWFkZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIHtyZW5kZXJTZWN0aW9ucygpfVxuICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEZvb3RlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0Rm9vdGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc2VjdGlvbnM9e3NlY3Rpb25zfVxuICAgICAgICByZW5kZXJJdGVtPXtyZW5kZXJJdGVtfVxuICAgICAgICByZW5kZXJTZWN0aW9uSGVhZGVyPXtyZW5kZXJTZWN0aW9uSGVhZGVyfVxuICAgICAgICBrZXlFeHRyYWN0b3I9e2tleUV4dHJhY3Rvcn1cbiAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudD17TGlzdEhlYWRlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudD17TGlzdEZvb3RlckNvbXBvbmVudH1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIHN0aWNreVNlY3Rpb25IZWFkZXJzRW5hYmxlZD17c3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblNlY3Rpb25MaXN0LmRpc3BsYXlOYW1lID0gXCJTZWN0aW9uTGlzdFwiO1xuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbkxpc3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgS2V5Ym9hcmRBdm9pZGluZ1ZpZXcgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIGJlaGF2aW9yLFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAga2V5Ym9hcmRWZXJ0aWNhbE9mZnNldCxcbiAgICAgIGVuYWJsZWQsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwia2V5Ym9hcmRhdm9pZGluZ3ZpZXdcIik7XG5cbiAgICAvLyBPbiB3ZWIsIGtleWJvYXJkIGF2b2lkaW5nIGlzIHVzdWFsbHkgaGFuZGxlZCBieSB0aGUgYnJvd3NlciBkZWZhdWx0IGJlaGF2aW9yIG9yIGlzIGlycmVsZXZhbnRcbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtTdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgYmVoYXZpb3I9e2JlaGF2aW9yfVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAga2V5Ym9hcmRWZXJ0aWNhbE9mZnNldD17a2V5Ym9hcmRWZXJ0aWNhbE9mZnNldH1cbiAgICAgICAgZW5hYmxlZD17ZW5hYmxlZH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5LZXlib2FyZEF2b2lkaW5nVmlldy5kaXNwbGF5TmFtZSA9IFwiS2V5Ym9hcmRBdm9pZGluZ1ZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IEtleWJvYXJkQXZvaWRpbmdWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFJlZnJlc2hDb250cm9sID0gZm9yd2FyZFJlZigoeyByZWZyZXNoaW5nLCBvblJlZnJlc2gsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwicmVmcmVzaGNvbnRyb2xcIik7XG5cbiAgLy8gT24gd2ViLCBwYXNzLXRocm91Z2ggb3IgaW1wbGVtZW50IGJhc2ljIHZpc3VhbD9cbiAgLy8gVXN1YWxseSBSZWZyZXNoQ29udHJvbCBpcyBwYXNzZWQgYXMgcHJvcCB0byBTY3JvbGxWaWV3LlxuICAvLyBJZiB1c2VkIGFzIGNvbXBvbmVudCwgaXQgbWlnaHQgd3JhcCBjb250ZW50LlxuXG4gIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAvLyBOby1vcCBmb3Igd2ViIHZpc3VhbCB1c3VhbGx5LCB1bmxlc3Mgd2UgaW1wbGVtZW50IHB1bGwtdG8tcmVmcmVzaFxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50XG4gICAgICByZWY9e3JlZn1cbiAgICAgIHJlZnJlc2hpbmc9e3JlZnJlc2hpbmd9XG4gICAgICBvblJlZnJlc2g9e29uUmVmcmVzaH1cbiAgICAgIHsuLi5yZXN0fVxuICAgIC8+XG4gICk7XG59KTtcblxuUmVmcmVzaENvbnRyb2wuZGlzcGxheU5hbWUgPSBcIlJlZnJlc2hDb250cm9sXCI7XG5leHBvcnQgZGVmYXVsdCBSZWZyZXNoQ29udHJvbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUb3VjaGFibGVIaWdobGlnaHQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIG9uUHJlc3MsXG4gICAgICB1bmRlcmxheUNvbG9yID0gXCJibGFja1wiLFxuICAgICAgYWN0aXZlT3BhY2l0eSA9IDAuODUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidG91Y2hhYmxlaGlnaGxpZ2h0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbeyBjdXJzb3I6IFwicG9pbnRlclwiIH0sIHN0eWxlXSk7XG5cbiAgICAgIC8vIFNpbXBsZSB3ZWIgaW1wbGVtZW50YXRpb246IGp1c3Qgb3BhY2l0eSwgbWltaWNraW5nIG92ZXJsYXkgaXMgaGFyZGVyIHdpdGhvdXQgc3RhdGVcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBzdHlsZT17ZmxhdFN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdW5kZXJsYXlDb2xvcjtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gYWN0aXZlT3BhY2l0eTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uTW91c2VVcD17KGUpID0+IHtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgICAgICAgICBmbGF0U3R5bGUuYmFja2dyb3VuZENvbG9yIHx8IFwidHJhbnNwYXJlbnRcIjtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17KGUpID0+IHtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgICAgICAgICBmbGF0U3R5bGUuYmFja2dyb3VuZENvbG9yIHx8IFwidHJhbnNwYXJlbnRcIjtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgdW5kZXJsYXlDb2xvcj17dW5kZXJsYXlDb2xvcn1cbiAgICAgICAgYWN0aXZlT3BhY2l0eT17YWN0aXZlT3BhY2l0eX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5Ub3VjaGFibGVIaWdobGlnaHQuZGlzcGxheU5hbWUgPSBcIlRvdWNoYWJsZUhpZ2hsaWdodFwiO1xuZXhwb3J0IGRlZmF1bHQgVG91Y2hhYmxlSGlnaGxpZ2h0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBjbG9uZUVsZW1lbnQsIENoaWxkcmVuIH0gZnJvbSBcInJlYWN0XCI7XG5cbi8vIFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjayBqdXN0IGFjY2VwdHMgb25QcmVzcyBhbmQgcGFzc2VzIGl0IHRvIHRoZSBjaGlsZFxuLy8gSXQgZG9lcyBub3QgYWRkIGFueSB2aXN1YWwgZmVlZGJhY2suXG5jb25zdCBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2sgPSAoe1xuICBjaGlsZHJlbixcbiAgb25QcmVzcyxcbiAgb25QcmVzc0luLFxuICBvblByZXNzT3V0LFxuICBkaXNhYmxlZCxcbiAgLi4ucmVzdFxufSkgPT4ge1xuICBjb25zdCBjaGlsZCA9IENoaWxkcmVuLm9ubHkoY2hpbGRyZW4pO1xuXG4gIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICBvbkNsaWNrOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzKSBvblByZXNzKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uQ2xpY2spIGNoaWxkLnByb3BzLm9uQ2xpY2soZSk7XG4gICAgfSxcbiAgICBvbk1vdXNlRG93bjogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc0luKSBvblByZXNzSW4oZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Nb3VzZURvd24pIGNoaWxkLnByb3BzLm9uTW91c2VEb3duKGUpO1xuICAgIH0sXG4gICAgb25Nb3VzZVVwOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzT3V0KSBvblByZXNzT3V0KGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uTW91c2VVcCkgY2hpbGQucHJvcHMub25Nb3VzZVVwKGUpO1xuICAgIH0sXG4gICAgb25Ub3VjaFN0YXJ0OiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzSW4pIG9uUHJlc3NJbihlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vblRvdWNoU3RhcnQpIGNoaWxkLnByb3BzLm9uVG91Y2hTdGFydChlKTtcbiAgICB9LFxuICAgIG9uVG91Y2hFbmQ6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NPdXQpIG9uUHJlc3NPdXQoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Ub3VjaEVuZCkgY2hpbGQucHJvcHMub25Ub3VjaEVuZChlKTtcbiAgICB9LFxuICAgIHN0eWxlOiB7XG4gICAgICBjdXJzb3I6IGRpc2FibGVkID8gXCJub3QtYWxsb3dlZFwiIDogXCJwb2ludGVyXCIsXG4gICAgICAuLi5jaGlsZC5wcm9wcy5zdHlsZSxcbiAgICB9LFxuICAgIC4uLnJlc3QsXG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIFNjcmVlbiBDb21wb25lbnRcclxuICogRnVsbC1oZWlnaHQgc2NyZWVuIGNvbnRhaW5lciB3aXRoIGJhY2tncm91bmRcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IFNjcmVlbiA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIGJhY2tncm91bmQgPSAnbGlnaHQnLCBjbGFzc05hbWUgPSAnJywgc3R5bGUsIC4uLnByb3BzIH0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG59KTtcclxuXHJcblNjcmVlbi5kaXNwbGF5TmFtZSA9IFwiU2NyZWVuXCI7XHJcbmV4cG9ydCBkZWZhdWx0IFNjcmVlbjtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIENvbnRhaW5lciBDb21wb25lbnRcclxuICogUmVzcG9uc2l2ZSBjb250YWluZXIgd2l0aCBtYXgtd2lkdGggYW5kIGNlbnRlcmluZ1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgQ29udGFpbmVyID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuQ29udGFpbmVyLmRpc3BsYXlOYW1lID0gXCJDb250YWluZXJcIjtcclxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgQ2FyZCBDb21wb25lbnRcclxuICogU3R5bGVkIGNhcmQgY29udGFpbmVyIHdpdGggc2hhZG93IGFuZCByb3VuZGVkIGNvcm5lcnNcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IENhcmQgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5DYXJkLmRpc3BsYXlOYW1lID0gXCJDYXJkXCI7XHJcbmV4cG9ydCBkZWZhdWx0IENhcmQ7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBHcmlkIENvbXBvbmVudFxyXG4gKiBSZXNwb25zaXZlIGdyaWQgbGF5b3V0IHN5c3RlbVxyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgR3JpZCA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkdyaWQuZGlzcGxheU5hbWUgPSBcIkdyaWRcIjtcclxuZXhwb3J0IGRlZmF1bHQgR3JpZDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIFN0YWNrIENvbXBvbmVudFxyXG4gKiBWZXJ0aWNhbCBvciBob3Jpem9udGFsIGxheW91dCB3aXRoIHNwYWNpbmdcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IFN0YWNrID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBkaXJlY3Rpb24gPSAndmVydGljYWwnLFxyXG4gICAgc3BhY2luZyA9IDQsXHJcbiAgICBhbGlnbiA9ICdzdGFydCcsXHJcbiAgICBqdXN0aWZ5ID0gJ3N0YXJ0JyxcclxuICAgIGNsYXNzTmFtZSA9ICcnLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5TdGFjay5kaXNwbGF5TmFtZSA9IFwiU3RhY2tcIjtcclxuZXhwb3J0IGRlZmF1bHQgU3RhY2s7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBJY29uIENvbXBvbmVudFxyXG4gKiBEaXNwbGF5cyBlbW9qaSBpY29ucyBjb25zaXN0ZW50bHkgYWNyb3NzIHBsYXRmb3Jtc1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgSWNvbiA9IGZvcndhcmRSZWYoKHtcclxuICAgIG5hbWUsXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRleHQgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7bmFtZX1cclxuICAgICAgICA8L1RleHQgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5JY29uLmRpc3BsYXlOYW1lID0gXCJJY29uXCI7XHJcbmV4cG9ydCBkZWZhdWx0IEljb247XHJcbiIsICIvLyBEaW1lbnNpb25zIEFQSSBmb3IgV2ViXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRzXCI7XG5cbmNvbnN0IGxpc3RlbmVycyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgIGxpc3RlbmVycy5lbWl0KFwiY2hhbmdlXCIsIHsgd2luZG93OiBnZXRXaW5kb3coKSwgc2NyZWVuOiBnZXRTY3JlZW4oKSB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFdpbmRvdygpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgcmV0dXJuIHsgd2lkdGg6IDAsIGhlaWdodDogMCwgc2NhbGU6IDEsIGZvbnRTY2FsZTogMSB9O1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICBzY2FsZTogd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSxcbiAgICBmb250U2NhbGU6IDEsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFNjcmVlbigpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgcmV0dXJuIHsgd2lkdGg6IDAsIGhlaWdodDogMCwgc2NhbGU6IDEsIGZvbnRTY2FsZTogMSB9O1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiB3aW5kb3cuc2NyZWVuLndpZHRoLFxuICAgIGhlaWdodDogd2luZG93LnNjcmVlbi5oZWlnaHQsXG4gICAgc2NhbGU6IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsXG4gICAgZm9udFNjYWxlOiAxLFxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgRGltZW5zaW9ucyA9IHtcbiAgZ2V0OiAoZGltKSA9PiB7XG4gICAgaWYgKGRpbSA9PT0gXCJ3aW5kb3dcIikgcmV0dXJuIGdldFdpbmRvdygpO1xuICAgIGlmIChkaW0gPT09IFwic2NyZWVuXCIpIHJldHVybiBnZXRTY3JlZW4oKTtcbiAgICByZXR1cm4gZ2V0V2luZG93KCk7XG4gIH0sXG4gIGFkZEV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwiY2hhbmdlXCIpIHtcbiAgICAgIGxpc3RlbmVycy5vbihcImNoYW5nZVwiLCBoYW5kbGVyKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogKCkgPT4gbGlzdGVuZXJzLm9mZihcImNoYW5nZVwiLCBoYW5kbGVyKSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7IHJlbW92ZTogKCkgPT4ge30gfTtcbiAgfSxcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJjaGFuZ2VcIikge1xuICAgICAgbGlzdGVuZXJzLm9mZihcImNoYW5nZVwiLCBoYW5kbGVyKTtcbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaW1lbnNpb25zO1xuIiwgImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcblxuY29uc3QgZXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5leHBvcnQgY29uc3QgTGlua2luZyA9IHtcbiAgb3BlblVSTDogKHVybCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB3aW5kb3cub3Blbih1cmwsIFwiX2JsYW5rXCIsIFwibm9vcGVuZXIsbm9yZWZlcnJlclwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9LFxuICBjYW5PcGVuVVJMOiAodXJsKSA9PiBQcm9taXNlLnJlc29sdmUodHJ1ZSksXG4gIGdldEluaXRpYWxVUkw6ICgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH0sXG4gIGFkZEV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwidXJsXCIpIHtcbiAgICAgIC8vIEluIGEgcmVhbCB3ZWIgYXBwLCB3ZSBtaWdodCBsaXN0ZW4gdG8gcG9wc3RhdGUgb3IgaGFzaGNoYW5nZVxuICAgICAgLy8gZW5zdXJpbmcgd2UgcmV0dXJuIGEgc3Vic2NyaXB0aW9uLWxpa2Ugb2JqZWN0XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IChlKSA9PiBoYW5kbGVyKHsgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZiB9KTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgbGlzdGVuZXIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVtb3ZlOiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGxpc3RlbmVyKSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7IHJlbW92ZTogKCkgPT4ge30gfTtcbiAgfSxcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAvLyBEZXByZWNhdGVkIGluIFJOIGJ1dCBnb29kIHRvIGhhdmUgc2lnbmF0dXJlXG4gIH0sXG4gIHNlbmRJbnRlbnQ6IChhY3Rpb24sIGV4dHJhcykgPT4gUHJvbWlzZS5yZXNvbHZlKCksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaW5raW5nO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7QUFBQSxPQUFPQSxXQUFTLFVBQVUsaUJBQWlCOzs7QUNVM0MsSUFBTSxZQUFZLE9BQU8sV0FBVztBQUc3QixJQUFNLFlBQ1gsY0FDQyxPQUFPLFNBQVMsU0FBUyxjQUN4QixDQUFDLENBQUMsT0FBTyxZQUNULFVBQVUsVUFBVSxTQUFTLFVBQVU7QUFHcEMsSUFBTSxXQUNYLGNBQ0MsQ0FBQyxDQUFDLE9BQU8sYUFDUixDQUFDLENBQUMsT0FBTyxpQkFDVCxDQUFDLENBQUMsT0FBTyxRQUFRLGlCQUFpQixVQUNsQyxVQUFVLFVBQVUsU0FBUyxXQUFXO0FBR3JDLElBQU0sWUFBWSxZQUFZLFdBQVcsS0FBSyxVQUFVLFNBQVM7QUFDakUsSUFBTSxRQUFRLFlBQVksb0JBQW9CLEtBQUssVUFBVSxTQUFTO0FBTXRFLElBQU0sWUFBWSxNQUFNO0FBQzdCLE1BQUksVUFBVyxRQUFPO0FBQ3RCLE1BQUksVUFBVyxRQUFPO0FBQ3RCLE1BQUksTUFBTyxRQUFPO0FBQ2xCLE1BQUksU0FBVSxRQUFPO0FBQ3JCLFNBQU87QUFDVCxHQUFHOzs7QUN6Q0gsT0FBTyxTQUFTLGtCQUFrQjs7O0FDQWxDLFNBQVMsV0FBVyxLQUFLO0FBQ3ZCLFNBQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxZQUFZLElBQUksSUFBSSxNQUFNLENBQUM7QUFDbEQ7QUFFTyxTQUFTLGVBQWUsTUFBTTtBQUNuQyxRQUFNQyxZQUFXLE9BQU8sYUFBYSxjQUFjLFdBQVc7QUFFOUQsTUFBSUEsY0FBYSxPQUFPO0FBQ3RCLFVBQU0sU0FBUztBQUFBLE1BQ2IsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsaUJBQWlCO0FBQUE7QUFBQSxNQUNqQixZQUFZO0FBQUEsTUFDWixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixzQkFBc0I7QUFBQSxNQUN0QixjQUFjO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxrQkFBa0I7QUFBQSxNQUNsQixvQkFBb0I7QUFBQSxNQUNwQixRQUFRO0FBQUE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLG1CQUFtQjtBQUFBLE1BQ25CLGdCQUFnQjtBQUFBLElBQ2xCO0FBQ0EsV0FBTyxPQUFPLEtBQUssWUFBWSxFQUFFLFFBQVEsTUFBTSxFQUFFLENBQUMsS0FBSztBQUFBLEVBQ3pEO0FBRUEsTUFBSUEsY0FBYSxVQUFVO0FBR3pCLFVBQU0sWUFBWTtBQUFBLE1BQ2hCLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLGlCQUFpQjtBQUFBLE1BQ2pCLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLHNCQUFzQjtBQUFBLE1BQ3RCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLGtCQUFrQjtBQUFBLE1BQ2xCLG9CQUFvQjtBQUFBLE1BQ3BCLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLG1CQUFtQjtBQUFBLE1BQ25CLGdCQUFnQjtBQUFBLE1BQ2hCLFFBQVE7QUFBQSxJQUNWO0FBQ0EsVUFBTSxTQUNKLFVBQVUsS0FBSyxZQUFZLEVBQUUsUUFBUSxNQUFNLEVBQUUsQ0FBQyxLQUFLLFdBQVcsSUFBSTtBQUlwRSxRQUFJO0FBRUYsVUFBSSxPQUFPLGNBQVksYUFBYTtBQUNsQyxlQUFPLFVBQVEsY0FBYyxFQUFFLE1BQU07QUFBQSxNQUN2QyxXQUNFLE9BQU8sV0FBVyxlQUNsQixPQUFPLFNBQ1AsT0FBTyxNQUFNLFFBQ2I7QUFDQSxlQUFPLE9BQU8sTUFBTSxPQUFPLE1BQU07QUFBQSxNQUNuQztBQUFBLElBQ0YsU0FBUyxHQUFHO0FBQ1YsY0FBUSxLQUFLLDBCQUEwQixNQUFNLFlBQVk7QUFBQSxJQUMzRDtBQUVBLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTztBQUNUOzs7QUN6RU8sSUFBTUMsY0FBYTtBQUFBLEVBQ3hCLFFBQVEsQ0FBQyxXQUFXO0FBQUEsRUFDcEIsU0FBUyxDQUFDLFdBQVc7QUFDbkIsUUFBSSxDQUFDLE9BQVEsUUFBTyxDQUFDO0FBQ3JCLFFBQUksTUFBTSxRQUFRLE1BQU0sR0FBRztBQUN6QixhQUFPLE9BQ0osS0FBSyxRQUFRLEVBQ2IsT0FBTyxDQUFDLEtBQUssU0FBVSxPQUFPLEVBQUUsR0FBRyxLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQU0sQ0FBQyxDQUFDO0FBQUEsSUFDakU7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2YsY0FBYztBQUFBLElBQ1osVUFBVTtBQUFBLElBQ1YsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLG9CQUFvQjtBQUFBLElBQ2xCLFVBQVU7QUFBQSxJQUNWLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRQTs7O0FGUE47QUFyQlQsSUFBTSxRQUFRLFdBQVcsQ0FBQyxFQUFFLE9BQU8sUUFBUSxLQUFLLEdBQUcsS0FBSyxHQUFHLFFBQVE7QUFDakUsUUFBTSxZQUFZLGVBQWUsT0FBTztBQUl4QyxRQUFNLGNBQWMsT0FBUSxVQUFVLE9BQU8sT0FBUTtBQUVyRCxRQUFNLFFBQVE7QUFBQSxJQUNaLEdBQUc7QUFBQSxJQUNILEtBQUs7QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUVBLE1BQUksY0FBYyxTQUFTLGNBQWMsU0FBUztBQUVoRCxVQUFNLFNBQVMsVUFBVSxFQUFFLEtBQUssSUFBSTtBQUNwQyxXQUFPLE1BQU07QUFBQSxFQUNmO0FBRUEsUUFBTSxZQUFZLG9CQUFXLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFFNUMsU0FBTyxvQkFBQyxhQUFVLE9BQU8sV0FBWSxHQUFHLE9BQU87QUFDakQsQ0FBQztBQUVELE1BQU0sY0FBYzs7O0FHNUJwQixPQUFPQyxZQUFXO0FBS0gsU0FBUixLQUFzQjtBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1gsVUFBVTtBQUFBLEVBQ1YsU0FBUztBQUFBLEVBQ1Q7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxHQUFHO0FBQ0wsR0FBRztBQUVELEVBQUFBLE9BQU0sVUFBVSxNQUFNO0FBQ3BCLFFBQUksQ0FBQyxZQUFZLENBQUMsS0FBTTtBQUN4QixRQUFJO0FBQ0YsWUFBTSxJQUFJLFNBQVMsY0FBYyxNQUFNO0FBQ3ZDLFFBQUUsTUFBTTtBQUNSLFFBQUUsT0FBTztBQUNULGVBQVMsS0FBSyxZQUFZLENBQUM7QUFDM0IsYUFBTyxNQUFNO0FBQ1gsWUFBSTtBQUNGLG1CQUFTLEtBQUssWUFBWSxDQUFDO0FBQUEsUUFDN0IsUUFBUTtBQUFBLFFBQUM7QUFBQSxNQUNYO0FBQUEsSUFDRixRQUFRO0FBQUEsSUFBQztBQUFBLEVBQ1gsR0FBRyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRW5CLFFBQU0sY0FBYyxDQUFDLE1BQU07QUFDekIsUUFBSSxRQUFTLFNBQVEsQ0FBQztBQUN0QixRQUFJLEVBQUUsaUJBQWtCO0FBRXhCLFFBQUksRUFBRSxXQUFXLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRTtBQUM5RDtBQUNGLFFBQUksQ0FBQyxLQUFNO0FBQ1gsUUFBSSxVQUFVLFdBQVcsUUFBUztBQUNsQyxRQUFJO0FBQ0osUUFBSTtBQUNGLFlBQU0sSUFBSSxJQUFJLE1BQU0sT0FBTyxTQUFTLE1BQU07QUFBQSxJQUM1QyxRQUFRO0FBRU47QUFBQSxJQUNGO0FBRUEsVUFBTSxRQUFRLElBQUk7QUFDbEIsUUFBSSxTQUFTLFVBQVUsV0FBVyxVQUFVLFNBQVU7QUFFdEQsUUFBSSxJQUFJLFdBQVcsT0FBTyxTQUFTLE9BQVE7QUFFM0MsUUFBSSxLQUFLLFNBQVU7QUFFbkIsVUFBTSxVQUNKLE9BQU8sU0FBUyxXQUFXLE9BQU8sU0FBUyxTQUFTLE9BQU8sU0FBUztBQUN0RSxVQUFNLE9BQU8sSUFBSSxXQUFXLElBQUksU0FBUyxJQUFJO0FBQzdDLFFBQUksU0FBUyxTQUFTO0FBQ3BCLFFBQUUsZUFBZTtBQUNqQixVQUFJLFFBQVE7QUFDVixZQUFJLElBQUksTUFBTTtBQUNaLGdCQUFNLEtBQUssU0FBUyxlQUFlLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQztBQUNwRCxjQUFJLEdBQUksSUFBRyxlQUFlO0FBQUEsY0FDckIsUUFBTyxTQUFTLEdBQUcsQ0FBQztBQUFBLFFBQzNCLE9BQU87QUFDTCxpQkFBTyxTQUFTLEdBQUcsQ0FBQztBQUFBLFFBQ3RCO0FBQUEsTUFDRjtBQUNBO0FBQUEsSUFDRjtBQUNBLE1BQUUsZUFBZTtBQUVqQixRQUFJLFFBQVMsUUFBTyxRQUFRLGFBQWEsQ0FBQyxHQUFHLElBQUksSUFBSTtBQUFBLFFBQ2hELFFBQU8sUUFBUSxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUk7QUFFMUMsUUFBSTtBQUNGLGFBQU87QUFBQSxRQUNMLElBQUksWUFBWSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxLQUFLLEVBQUUsQ0FBQztBQUFBLE1BQzVEO0FBQUEsSUFDRixRQUFRO0FBQUEsSUFBQztBQUVULFFBQUksUUFBUTtBQUNWLFVBQUksSUFBSSxNQUFNO0FBQ1osY0FBTSxLQUFLLFNBQVMsZUFBZSxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUM7QUFDcEQsWUFBSSxHQUFJLElBQUcsZUFBZTtBQUFBLFlBQ3JCLFFBQU8sU0FBUyxHQUFHLENBQUM7QUFBQSxNQUMzQixPQUFPO0FBQ0wsZUFBTyxTQUFTLEdBQUcsQ0FBQztBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFdBQ0osV0FBVyxXQUNQLENBQUMsS0FBSyxZQUFZLFlBQVksRUFBRSxPQUFPLE9BQU8sRUFBRSxLQUFLLEdBQUcsSUFDeEQ7QUFDTixTQUFPQSxPQUFNO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxLQUFLO0FBQUEsTUFDTCxTQUFTO0FBQUEsTUFDVCxHQUFHO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ2hIQSxPQUFPQyxVQUFTLGNBQUFDLG1CQUFrQjtBQVU5QixnQkFBQUMsWUFBQTtBQU5KLElBQU0sT0FBT0MsWUFBVyxDQUFDLEVBQUUsVUFBVSxPQUFPLFdBQVcsR0FBRyxLQUFLLEdBQUcsUUFBUTtBQUN4RSxRQUFNLFlBQVksZUFBZSxNQUFNO0FBRXZDLFFBQU0sWUFBWSxvQkFBVyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBRTVDLFNBQ0UsZ0JBQUFELEtBQUMsYUFBVSxLQUFVLE9BQU8sV0FBVyxXQUF1QixHQUFHLE1BQzlELFVBQ0g7QUFFSixDQUFDO0FBRUQsS0FBSyxjQUFjO0FBQ25CLElBQU8sZUFBUTs7O0FDakJmLE9BQU9FLFVBQVMsY0FBQUMsbUJBQWtCO0FBVTlCLGdCQUFBQyxZQUFBO0FBTkosSUFBTSxPQUFPQyxZQUFXLENBQUMsRUFBRSxVQUFVLE9BQU8sV0FBVyxHQUFHLEtBQUssR0FBRyxRQUFRO0FBQ3hFLFFBQU0sWUFBWSxlQUFlLE1BQU07QUFFdkMsUUFBTSxZQUFZLG9CQUFXLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFFNUMsU0FDRSxnQkFBQUQsS0FBQyxhQUFVLEtBQVUsT0FBTyxXQUFXLFdBQXVCLEdBQUcsTUFDOUQsVUFDSDtBQUVKLENBQUM7QUFFRCxLQUFLLGNBQWM7QUFDbkIsSUFBTyxlQUFROzs7QUNqQmYsT0FBT0UsVUFBUyxjQUFBQyxtQkFBa0I7QUE2Q3hCLGdCQUFBQyxZQUFBO0FBekNWLElBQU0sYUFBYUM7QUFBQSxFQUNqQixDQUNFO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxhQUFhO0FBQUEsSUFDYixpQ0FBaUM7QUFBQSxJQUNqQywrQkFBK0I7QUFBQSxJQUMvQjtBQUFBLElBQ0EsR0FBRztBQUFBLEVBQ0wsR0FDQSxRQUNHO0FBQ0gsVUFBTSxZQUFZLGVBQWUsWUFBWTtBQUU3QyxRQUFJLGNBQWMsU0FBUyxjQUFjLFFBQVE7QUFFL0MsWUFBTSxpQkFBaUI7QUFBQSxRQUNyQixXQUFXLGFBQWEsU0FBUztBQUFBLFFBQ2pDLFdBQVcsYUFBYSxXQUFXO0FBQUEsUUFDbkMseUJBQXlCO0FBQUEsUUFDekIsaUJBQ0UsYUFDSSxDQUFDLGlDQUNELENBQUMsZ0NBRUgsU0FDQTtBQUFBLFFBQ0osa0JBQ0UsYUFDSSxDQUFDLGlDQUNELENBQUMsZ0NBRUgsU0FDQTtBQUFBLFFBQ0osR0FBRyxvQkFBVyxRQUFRLEtBQUs7QUFBQSxNQUM3QjtBQUNBLFlBQU0sZUFBZSxvQkFBVyxRQUFRLENBQUMscUJBQXFCLENBQUM7QUFDL0QsYUFDRSxnQkFBQUQsS0FBQyxTQUFJLEtBQVUsT0FBTyxnQkFBZ0IsV0FBdUIsR0FBRyxNQUM5RCwwQkFBQUEsS0FBQyxTQUFJLE9BQU8sY0FBZSxVQUFTLEdBQ3RDO0FBQUEsSUFFSjtBQUdBLFdBQ0UsZ0JBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0MsR0FBRztBQUFBLFFBRUg7QUFBQTtBQUFBLElBQ0g7QUFBQSxFQUVKO0FBQ0Y7QUFFQSxXQUFXLGNBQWM7QUFDekIsSUFBTyxzQkFBUTs7O0FDckVmLE9BQU9FLFVBQVMsY0FBQUMsbUJBQWtCO0FBa0MxQixnQkFBQUMsWUFBQTtBQWhDUixJQUFNLFlBQVlEO0FBQUEsRUFDaEIsQ0FDRTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0Esa0JBQWtCO0FBQUEsSUFDbEIsWUFBWTtBQUFBLElBQ1osZ0JBQWdCO0FBQUEsSUFDaEIsV0FBVztBQUFBLElBQ1g7QUFBQSxJQUNBO0FBQUEsSUFDQSxHQUFHO0FBQUEsRUFDTCxHQUNBLFFBQ0c7QUFDSCxVQUFNLGVBQWUsQ0FBQyxNQUFNO0FBQzFCLFVBQUksYUFBYyxjQUFhLEVBQUUsT0FBTyxLQUFLO0FBQUEsSUFDL0M7QUFFQSxVQUFNLGNBQWM7QUFBQSxNQUNsQixZQUFZO0FBQUEsTUFDWixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxHQUFHLFdBQVcsUUFBUSxLQUFLO0FBQUEsSUFDN0I7QUFFQSxRQUFJLFdBQVc7QUFDYixhQUNFLGdCQUFBQztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0M7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsVUFBVTtBQUFBLFVBQ1Y7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsVUFBVSxDQUFDO0FBQUEsVUFDWCxNQUFNO0FBQUEsVUFDTixPQUFPLEVBQUUsR0FBRyxhQUFhLFFBQVEsT0FBTztBQUFBLFVBQ3hDO0FBQUEsVUFDQyxHQUFHO0FBQUE7QUFBQSxNQUNOO0FBQUEsSUFFSjtBQUVBLFdBQ0UsZ0JBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0EsTUFBTSxrQkFBa0IsYUFBYTtBQUFBLFFBQ3JDO0FBQUEsUUFDQTtBQUFBLFFBQ0EsVUFBVTtBQUFBLFFBQ1Y7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsVUFBVSxDQUFDO0FBQUEsUUFDWCxPQUFPO0FBQUEsUUFDUDtBQUFBLFFBQ0MsR0FBRztBQUFBO0FBQUEsSUFDTjtBQUFBLEVBRUo7QUFDRjtBQUVBLFVBQVUsY0FBYzs7O0FDdEV4QixPQUFPQyxVQUFTLGNBQUFDLG1CQUFrQjtBQVUxQixnQkFBQUMsWUFBQTtBQU5SLElBQU0sU0FBU0M7QUFBQSxFQUNiLENBQUMsRUFBRSxPQUFPLFNBQVMsT0FBTyxVQUFVLEdBQUcsS0FBSyxHQUFHLFFBQVE7QUFDckQsVUFBTSxZQUFZLGVBQWUsUUFBUTtBQUV6QyxRQUFJLGNBQWMsWUFBWSxjQUFjLE9BQU87QUFDakQsYUFDRSxnQkFBQUQ7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQSxTQUFTO0FBQUEsVUFDVDtBQUFBLFVBQ0MsR0FBRztBQUFBLFVBRUg7QUFBQTtBQUFBLE1BQ0g7QUFBQSxJQUVKO0FBRUEsV0FDRSxnQkFBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0MsR0FBRztBQUFBO0FBQUEsSUFDTjtBQUFBLEVBRUo7QUFDRjtBQUVBLE9BQU8sY0FBYzs7O0FDbENyQixPQUFPRSxVQUFTLGNBQUFDLG1CQUFrQjtBQTBCckIsZ0JBQUFDLFlBQUE7QUF0QmIsSUFBTSxvQkFBb0JDO0FBQUEsRUFDeEIsQ0FBQyxFQUFFLE9BQU8sU0FBUyxRQUFRLFFBQVEsT0FBTyxHQUFHLEtBQUssR0FBRyxRQUFRO0FBQzNELFVBQU0sWUFBWSxlQUFlLG1CQUFtQjtBQUVwRCxRQUFJLGNBQWMsU0FBUyxjQUFjLFFBQVE7QUFDL0MsWUFBTSxlQUFlO0FBQUEsUUFDbkIsV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1QsR0FBRyxvQkFBVyxRQUFRLEtBQUs7QUFBQSxNQUM3QjtBQUdBLFVBQ0UsT0FBTyxhQUFhLGVBQ3BCLENBQUMsU0FBUyxlQUFlLGtCQUFrQixHQUMzQztBQUNBLGNBQU0sVUFBVSxTQUFTLGNBQWMsT0FBTztBQUM5QyxnQkFBUSxLQUFLO0FBQ2IsZ0JBQVEsWUFBWTtBQUNwQixpQkFBUyxLQUFLLFlBQVksT0FBTztBQUFBLE1BQ25DO0FBRUEsYUFBTyxnQkFBQUQsS0FBQyxTQUFJLEtBQVUsT0FBTyxjQUFlLEdBQUcsTUFBTTtBQUFBLElBQ3ZEO0FBRUEsV0FDRSxnQkFBQUEsS0FBQyxhQUFVLEtBQVUsTUFBWSxPQUFjLE9BQWUsR0FBRyxNQUFNO0FBQUEsRUFFM0U7QUFDRjtBQUVBLGtCQUFrQixjQUFjOzs7QUNuQ2hDLE9BQU9FLFVBQVMsY0FBQUMsbUJBQWtCO0FBYTFCLGdCQUFBQyxZQUFBO0FBVFIsSUFBTSxTQUFTQztBQUFBLEVBQ2IsQ0FDRSxFQUFFLE9BQU8sZUFBZSxVQUFVLFlBQVksWUFBWSxPQUFPLEdBQUcsS0FBSyxHQUN6RSxRQUNHO0FBQ0gsVUFBTSxZQUFZLGVBQWUsUUFBUTtBQUV6QyxRQUFJLGNBQWMsV0FBVyxjQUFjLE9BQU87QUFDaEQsYUFDRSxnQkFBQUQ7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQSxNQUFLO0FBQUEsVUFDTCxTQUFTO0FBQUEsVUFDVCxVQUFVLENBQUMsTUFBTSxpQkFBaUIsY0FBYyxFQUFFLE9BQU8sT0FBTztBQUFBLFVBQ2hFO0FBQUEsVUFDQSxPQUFPLG9CQUFXLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFBQSxVQUNoQyxHQUFHO0FBQUE7QUFBQSxNQUNOO0FBQUEsSUFFSjtBQUdBLFdBQ0UsZ0JBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0MsR0FBRztBQUFBO0FBQUEsSUFDTjtBQUFBLEVBRUo7QUFDRjtBQUVBLE9BQU8sY0FBYzs7O0FDekNyQixPQUFPRSxXQUFTLGNBQUFDLG1CQUFrQjtBQThCdEIsZ0JBQUFDLE1BR0EsWUFIQTtBQXpCWixJQUFNLFdBQVdDO0FBQUEsRUFDZixDQUNFO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsR0FBRztBQUFBLEVBQ0wsR0FDQSxRQUNHO0FBQ0gsVUFBTSxZQUFZLGVBQWUsVUFBVTtBQUUzQyxRQUFJLGNBQWMsU0FBUyxjQUFjLFFBQVE7QUFFL0MsVUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLEdBQUc7QUFDOUIsWUFBSSxvQkFBb0I7QUFDdEIsZ0JBQU0sUUFBUUMsUUFBTSxlQUFlLGtCQUFrQixJQUNuRCxxQkFFQSxnQkFBQUYsS0FBQyxzQkFBbUI7QUFFdEIsaUJBQ0U7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNDLEdBQUc7QUFBQSxjQUVIO0FBQUEsd0NBQ0VFLFFBQU0sZUFBZSxtQkFBbUIsSUFDdkMsc0JBRUEsZ0JBQUFGLEtBQUMsdUJBQW9CO0FBQUEsZ0JBRXhCO0FBQUEsZ0JBQ0Esd0JBQ0VFLFFBQU0sZUFBZSxtQkFBbUIsSUFDdkMsc0JBRUEsZ0JBQUFGLEtBQUMsdUJBQW9CO0FBQUE7QUFBQTtBQUFBLFVBRTNCO0FBQUEsUUFFSjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFFBQVEsUUFBUSxDQUFDO0FBQ3ZCLFlBQU0sYUFBYSxNQUFNO0FBQ3ZCLGVBQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxVQUFVO0FBQ2hDLGdCQUFNLE1BQU0sZUFDUixhQUFhLE1BQU0sS0FBSyxJQUN4QixNQUFNLFNBQVM7QUFDbkIsaUJBQ0UsZ0JBQUFBLEtBQUNFLFFBQU0sVUFBTixFQUNFLHFCQUFXLEVBQUUsTUFBTSxNQUFNLENBQUMsS0FEUixHQUVyQjtBQUFBLFFBRUosQ0FBQztBQUFBLE1BQ0g7QUFFQSxZQUFNLG1CQUFtQixvQkFBVyxRQUFRLENBQUMscUJBQXFCLENBQUM7QUFFbkUsYUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsdUJBQXVCO0FBQUEsVUFDdkI7QUFBQSxVQUNBO0FBQUEsVUFDQyxHQUFHO0FBQUEsVUFFSDtBQUFBLG9DQUNFQSxRQUFNLGVBQWUsbUJBQW1CLElBQ3ZDLHNCQUVBLGdCQUFBRixLQUFDLHVCQUFvQjtBQUFBLFlBRXhCLFdBQVc7QUFBQSxZQUNYLHdCQUNFRSxRQUFNLGVBQWUsbUJBQW1CLElBQ3ZDLHNCQUVBLGdCQUFBRixLQUFDLHVCQUFvQjtBQUFBO0FBQUE7QUFBQSxNQUUzQjtBQUFBLElBRUo7QUFHQSxXQUNFLGdCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNDLEdBQUc7QUFBQTtBQUFBLElBQ047QUFBQSxFQUVKO0FBQ0Y7QUFFQSxTQUFTLGNBQWM7OztBQ3BIdkIsT0FBT0csV0FBUyxjQUFBQyxvQkFBa0I7QUFVMUIsZ0JBQUFDLGFBQUE7QUFOUixJQUFNLG1CQUFtQkM7QUFBQSxFQUN2QixDQUFDLEVBQUUsVUFBVSxPQUFPLFNBQVMsZ0JBQWdCLEtBQUssR0FBRyxLQUFLLEdBQUcsUUFBUTtBQUNuRSxVQUFNLFlBQVksZUFBZSxrQkFBa0I7QUFFbkQsUUFBSSxjQUFjLFlBQVksY0FBYyxPQUFPO0FBQ2pELGFBQ0UsZ0JBQUFEO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0EsT0FBTyxvQkFBVyxRQUFRLENBQUMsRUFBRSxRQUFRLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFBQSxVQUN4RCxTQUFTO0FBQUEsVUFDVCxhQUFhLENBQUMsTUFBTyxFQUFFLGNBQWMsTUFBTSxVQUFVO0FBQUEsVUFDckQsV0FBVyxDQUFDLE1BQU8sRUFBRSxjQUFjLE1BQU0sVUFBVTtBQUFBLFVBQ25ELGNBQWMsQ0FBQyxNQUFPLEVBQUUsY0FBYyxNQUFNLFVBQVU7QUFBQSxVQUNyRCxHQUFHO0FBQUEsVUFFSDtBQUFBO0FBQUEsTUFDSDtBQUFBLElBRUo7QUFFQSxXQUNFLGdCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNDLEdBQUc7QUFBQSxRQUVIO0FBQUE7QUFBQSxJQUNIO0FBQUEsRUFFSjtBQUNGO0FBRUEsaUJBQWlCLGNBQWM7OztBQ3RDL0IsT0FBT0UsV0FBUyxjQUFBQyxvQkFBa0I7QUFjNUIsZ0JBQUFDLGFBQUE7QUFWTixJQUFNLFlBQVlDLGFBQVcsQ0FBQyxFQUFFLFVBQVUsT0FBTyxTQUFTLEdBQUcsS0FBSyxHQUFHLFFBQVE7QUFDM0UsUUFBTSxZQUFZLGVBQWUsV0FBVztBQUU1QyxNQUFJLGNBQWMsWUFBWSxjQUFjLE9BQU87QUFDakQsVUFBTSxZQUFZLG9CQUFXLFFBQVE7QUFBQSxNQUNuQyxFQUFFLFFBQVEsVUFBVTtBQUFBLE1BQ3BCLE9BQU8sVUFBVSxhQUFhLE1BQU0sRUFBRSxTQUFTLE1BQU0sQ0FBQyxJQUFJO0FBQUEsSUFDNUQsQ0FBQztBQUVELFdBQ0UsZ0JBQUFELE1BQUMsWUFBTyxLQUFVLE9BQU8sV0FBVyxTQUFTLFNBQVUsR0FBRyxNQUN2RCxpQkFBTyxhQUFhLGFBQ2pCLFNBQVMsRUFBRSxTQUFTLE1BQU0sQ0FBQyxJQUMzQixVQUNOO0FBQUEsRUFFSjtBQUVBLFNBQ0UsZ0JBQUFBLE1BQUMsYUFBVSxLQUFVLE9BQWMsU0FBbUIsR0FBRyxNQUN0RCxVQUNIO0FBRUosQ0FBQztBQUVELFVBQVUsY0FBYzs7O0FDN0J4QixPQUFPRSxXQUFTLGNBQUFDLG9CQUFrQjtBQXlCMUIsZ0JBQUFDLGFBQUE7QUFyQlIsSUFBTSxrQkFBa0JDO0FBQUEsRUFDdEIsQ0FDRSxFQUFFLFVBQVUsT0FBTyxZQUFZLFFBQVEsS0FBSyxhQUFhLFNBQVMsR0FBRyxLQUFLLEdBQzFFLFFBQ0c7QUFDSCxVQUFNLFlBQVksZUFBZSxpQkFBaUI7QUFFbEQsVUFBTSxjQUFjLE9BQVEsVUFBVSxPQUFPLE9BQVE7QUFFckQsUUFBSSxjQUFjLFNBQVMsY0FBYyxRQUFRO0FBQy9DLFlBQU0sWUFBWSxvQkFBVyxRQUFRO0FBQUEsUUFDbkM7QUFBQSxVQUNFLFVBQVU7QUFBQSxVQUNWLGlCQUFpQixPQUFPLFdBQVc7QUFBQSxVQUNuQyxnQkFBZ0IsZUFBZSxZQUFZLGNBQWM7QUFBQSxVQUN6RCxvQkFBb0I7QUFBQSxVQUNwQixrQkFBa0I7QUFBQSxRQUNwQjtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQUM7QUFDRCxhQUNFLGdCQUFBRCxNQUFDLFNBQUksS0FBVSxPQUFPLFdBQVksR0FBRyxNQUNsQyxVQUNIO0FBQUEsSUFFSjtBQUdBLFdBQ0UsZ0JBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxRQUFRLFVBQVUsRUFBRSxLQUFLLElBQUk7QUFBQSxRQUM3QjtBQUFBLFFBQ0MsR0FBRztBQUFBLFFBRUg7QUFBQTtBQUFBLElBQ0g7QUFBQSxFQUVKO0FBQ0Y7QUFFQSxnQkFBZ0IsY0FBYzs7O0FDL0M5QixPQUFPRSxXQUFTLGNBQUFDLG9CQUFrQjtBQUdsQyxPQUFPLGNBQWM7QUEwQmIsZ0JBQUFDLGFBQUE7QUF4QlIsSUFBTSxRQUFRQztBQUFBLEVBQ1osQ0FDRTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsR0FBRztBQUFBLEVBQ0wsR0FDQSxRQUNHO0FBQ0gsVUFBTSxZQUFZLGVBQWUsT0FBTztBQUV4QyxRQUFJLGNBQWMsU0FBUyxjQUFjLFFBQVE7QUFDL0MsVUFBSSxDQUFDLFFBQVMsUUFBTztBQUVyQixZQUFNLGFBQWE7QUFBQSxRQUNqQixHQUFHLG9CQUFXLFFBQVEsS0FBSztBQUFBLE1BQzdCO0FBR0EsWUFBTSxVQUNKLGdCQUFBRCxNQUFDLFNBQUksS0FBVSxPQUFPLFlBQWEsR0FBRyxNQUNuQyxVQUNIO0FBR0YsVUFBSSxPQUFPLGFBQWEsYUFBYTtBQUNuQyxlQUFPLFNBQVMsYUFBYSxTQUFTLFNBQVMsSUFBSTtBQUFBLE1BQ3JEO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUNFLGdCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQyxHQUFHO0FBQUEsUUFFSDtBQUFBO0FBQUEsSUFDSDtBQUFBLEVBRUo7QUFDRjtBQUVBLE1BQU0sY0FBYzs7O0FDdkRwQixPQUFPRSxXQUFTLGNBQUFDLG9CQUFrQjtBQVU1QixnQkFBQUMsYUFBQTtBQU5OLElBQU0sZUFBZUMsYUFBVyxDQUFDLEVBQUUsVUFBVSxPQUFPLEdBQUcsS0FBSyxHQUFHLFFBQVE7QUFDckUsUUFBTSxZQUFZLGVBQWUsY0FBYztBQUUvQyxNQUFJLGNBQWMsU0FBUyxjQUFjLFFBQVE7QUFDL0MsVUFBTSxZQUFZLG9CQUFXLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDNUMsV0FDRSxnQkFBQUQsTUFBQyxTQUFJLEtBQVUsT0FBTyxXQUFZLEdBQUcsTUFDbEMsVUFDSDtBQUFBLEVBRUo7QUFFQSxTQUNFLGdCQUFBQSxNQUFDLGFBQVUsS0FBVSxPQUFlLEdBQUcsTUFDcEMsVUFDSDtBQUVKLENBQUM7QUFFRCxhQUFhLGNBQWM7OztBQ3ZCM0IsT0FBT0UsYUFBVzs7O0FDQWxCLE9BQU9DLFdBQVMsY0FBQUMsb0JBQWtCO0FBK0J0QixTQU9NLE9BQUFDLE9BUE4sUUFBQUMsYUFBQTtBQXhCWixJQUFNLGNBQWNDO0FBQUEsRUFDbEIsQ0FDRTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLDhCQUE4QjtBQUFBLElBQzlCLEdBQUc7QUFBQSxFQUNMLEdBQ0EsUUFDRztBQUNILFVBQU0sWUFBWSxlQUFlLGFBQWE7QUFFOUMsUUFBSSxjQUFjLFNBQVMsY0FBYyxRQUFRO0FBRS9DLFlBQU0saUJBQWlCLE1BQU07QUFDM0IsZ0JBQVEsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsaUJBQWlCO0FBQ3JELGdCQUFNLE9BQU8sUUFBUSxRQUFRLENBQUM7QUFDOUIsZ0JBQU0sTUFBTSxRQUFRLE9BQU8sYUFBYSxTQUFTO0FBQ2pELGlCQUNFLGdCQUFBRCxNQUFDRSxRQUFNLFVBQU4sRUFDRTtBQUFBLG1DQUF1QixvQkFBb0IsRUFBRSxRQUFRLENBQUM7QUFBQSxZQUN0RCxLQUFLLElBQUksQ0FBQyxNQUFNLGNBQWM7QUFDN0Isb0JBQU0sVUFBVSxlQUNaLGFBQWEsTUFBTSxTQUFTLElBQzVCLEtBQUssT0FBTyxLQUFLLE1BQU0sTUFBTSxNQUFNO0FBQ3ZDLHFCQUNFLGdCQUFBSCxNQUFDRyxRQUFNLFVBQU4sRUFDRSxxQkFBVyxFQUFFLE1BQU0sT0FBTyxXQUFXLFFBQVEsQ0FBQyxLQUQ1QixPQUVyQjtBQUFBLFlBRUosQ0FBQztBQUFBLGVBWGtCLEdBWXJCO0FBQUEsUUFFSixDQUFDO0FBQUEsTUFDSDtBQUVBLGFBQ0UsZ0JBQUFGO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0E7QUFBQSxVQUNDLEdBQUc7QUFBQSxVQUVIO0FBQUEsb0NBQ0VFLFFBQU0sZUFBZSxtQkFBbUIsSUFDdkMsc0JBRUEsZ0JBQUFILE1BQUMsdUJBQW9CO0FBQUEsWUFFeEIsZUFBZTtBQUFBLFlBQ2Ysd0JBQ0VHLFFBQU0sZUFBZSxtQkFBbUIsSUFDdkMsc0JBRUEsZ0JBQUFILE1BQUMsdUJBQW9CO0FBQUE7QUFBQTtBQUFBLE1BRTNCO0FBQUEsSUFFSjtBQUdBLFdBQ0UsZ0JBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQyxHQUFHO0FBQUE7QUFBQSxJQUNOO0FBQUEsRUFFSjtBQUNGO0FBRUEsWUFBWSxjQUFjOzs7QUN6RjFCLE9BQU9JLFdBQVMsY0FBQUMsb0JBQWtCO0FBc0IxQixnQkFBQUMsYUFBQTtBQWxCUixJQUFNLHVCQUF1QkM7QUFBQSxFQUMzQixDQUNFO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxHQUFHO0FBQUEsRUFDTCxHQUNBLFFBQ0c7QUFDSCxVQUFNLFlBQVksZUFBZSxzQkFBc0I7QUFHdkQsUUFBSSxjQUFjLFNBQVMsY0FBYyxRQUFRO0FBQy9DLGFBQ0UsZ0JBQUFELE1BQUMsU0FBSSxLQUFVLE9BQU8sb0JBQVcsUUFBUSxLQUFLLEdBQUksR0FBRyxNQUNsRCxVQUNIO0FBQUEsSUFFSjtBQUVBLFdBQ0UsZ0JBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQyxHQUFHO0FBQUEsUUFFSDtBQUFBO0FBQUEsSUFDSDtBQUFBLEVBRUo7QUFDRjtBQUVBLHFCQUFxQixjQUFjOzs7QUM1Q25DLE9BQU9FLFdBQVMsY0FBQUMsb0JBQWtCO0FBaUI5QixnQkFBQUMsYUFBQTtBQWJKLElBQU0saUJBQWlCQyxhQUFXLENBQUMsRUFBRSxZQUFZLFdBQVcsR0FBRyxLQUFLLEdBQUcsUUFBUTtBQUM3RSxRQUFNLFlBQVksZUFBZSxnQkFBZ0I7QUFNakQsTUFBSSxjQUFjLE9BQU87QUFFdkIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUNFLGdCQUFBRDtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0M7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0MsR0FBRztBQUFBO0FBQUEsRUFDTjtBQUVKLENBQUM7QUFFRCxlQUFlLGNBQWM7OztBQzFCN0IsT0FBT0UsV0FBUyxjQUFBQyxvQkFBa0I7QUF1QjFCLGdCQUFBQyxhQUFBO0FBbkJSLElBQU0scUJBQXFCQztBQUFBLEVBQ3pCLENBQ0U7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGdCQUFnQjtBQUFBLElBQ2hCLEdBQUc7QUFBQSxFQUNMLEdBQ0EsUUFDRztBQUNILFVBQU0sWUFBWSxlQUFlLG9CQUFvQjtBQUVyRCxRQUFJLGNBQWMsWUFBWSxjQUFjLE9BQU87QUFDakQsWUFBTSxZQUFZLG9CQUFXLFFBQVEsQ0FBQyxFQUFFLFFBQVEsVUFBVSxHQUFHLEtBQUssQ0FBQztBQUduRSxhQUNFLGdCQUFBRDtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0M7QUFBQSxVQUNBLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULGFBQWEsQ0FBQyxNQUFNO0FBQ2xCLGNBQUUsY0FBYyxNQUFNLGtCQUFrQjtBQUN4QyxjQUFFLGNBQWMsTUFBTSxVQUFVO0FBQUEsVUFDbEM7QUFBQSxVQUNBLFdBQVcsQ0FBQyxNQUFNO0FBQ2hCLGNBQUUsY0FBYyxNQUFNLGtCQUNwQixVQUFVLG1CQUFtQjtBQUMvQixjQUFFLGNBQWMsTUFBTSxVQUFVO0FBQUEsVUFDbEM7QUFBQSxVQUNBLGNBQWMsQ0FBQyxNQUFNO0FBQ25CLGNBQUUsY0FBYyxNQUFNLGtCQUNwQixVQUFVLG1CQUFtQjtBQUMvQixjQUFFLGNBQWMsTUFBTSxVQUFVO0FBQUEsVUFDbEM7QUFBQSxVQUNDLEdBQUc7QUFBQSxVQUVIO0FBQUE7QUFBQSxNQUNIO0FBQUEsSUFFSjtBQUVBLFdBQ0UsZ0JBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNDLEdBQUc7QUFBQSxRQUVIO0FBQUE7QUFBQSxJQUNIO0FBQUEsRUFFSjtBQUNGO0FBRUEsbUJBQW1CLGNBQWM7OztBQy9EakMsT0FBT0UsV0FBUyxjQUFjLGdCQUFnQjs7O0FDQTlDLE9BQU9DLFdBQVMsY0FBQUMsb0JBQWtCO0FBWTFCLGdCQUFBQyxhQUFBO0FBSlIsSUFBTSxTQUFTQyxhQUFXLENBQUMsRUFBRSxVQUFVLGFBQWEsU0FBUyxZQUFZLElBQUksT0FBTyxHQUFHLE1BQU0sR0FBRyxRQUFRO0FBQ3BHLFFBQU0sYUFBYSxVQUFVLEtBQUs7QUFFbEMsU0FDSSxnQkFBQUQsTUFBQyxnQkFBSyxLQUFVLFdBQVcsWUFBWSxPQUFlLEdBQUcsT0FDcEQsVUFDTDtBQUVSLENBQUM7QUFFRCxPQUFPLGNBQWM7OztBQ2xCckIsT0FBT0UsV0FBUyxjQUFBQyxvQkFBa0I7QUFpQjFCLGdCQUFBQyxhQUFBO0FBVFIsSUFBTSxZQUFZQyxhQUFXLENBQUM7QUFBQSxFQUMxQjtBQUFBLEVBQ0EsWUFBWTtBQUFBLEVBQ1o7QUFBQSxFQUNBLEdBQUc7QUFDUCxHQUFHLFFBQVE7QUFDUCxRQUFNLGFBQWEsVUFBVSxLQUFLO0FBRWxDLFNBQ0ksZ0JBQUFELE1BQUMsZ0JBQUssS0FBVSxXQUFXLFlBQVksT0FBZSxHQUFHLE9BQ3BELFVBQ0w7QUFFUixDQUFDO0FBRUQsVUFBVSxjQUFjOzs7QUN2QnhCLE9BQU9FLFdBQVMsY0FBQUMsb0JBQWtCO0FBaUIxQixnQkFBQUMsYUFBQTtBQVRSLElBQU0sT0FBT0MsYUFBVyxDQUFDO0FBQUEsRUFDckI7QUFBQSxFQUNBLFlBQVk7QUFBQSxFQUNaO0FBQUEsRUFDQSxHQUFHO0FBQ1AsR0FBRyxRQUFRO0FBQ1AsUUFBTSxhQUFhLFVBQVUsS0FBSztBQUVsQyxTQUNJLGdCQUFBRCxNQUFDLGdCQUFLLEtBQVUsV0FBVyxZQUFZLE9BQWUsR0FBRyxPQUNwRCxVQUNMO0FBRVIsQ0FBQztBQUVELEtBQUssY0FBYzs7O0FDdkJuQixPQUFPRSxXQUFTLGNBQUFDLG9CQUFrQjtBQWlCMUIsZ0JBQUFDLGFBQUE7QUFUUixJQUFNLE9BQU9DLGFBQVcsQ0FBQztBQUFBLEVBQ3JCO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWjtBQUFBLEVBQ0EsR0FBRztBQUNQLEdBQUcsUUFBUTtBQUNQLFFBQU0sYUFBYSxVQUFVLEtBQUs7QUFFbEMsU0FDSSxnQkFBQUQsTUFBQyxnQkFBSyxLQUFVLFdBQVcsWUFBWSxPQUFlLEdBQUcsT0FDcEQsVUFDTDtBQUVSLENBQUM7QUFFRCxLQUFLLGNBQWM7OztBQ3ZCbkIsT0FBT0UsV0FBUyxjQUFBQyxvQkFBa0I7QUFxQjFCLGdCQUFBQyxhQUFBO0FBYlIsSUFBTSxRQUFRQyxhQUFXLENBQUM7QUFBQSxFQUN0QjtBQUFBLEVBQ0EsWUFBWTtBQUFBLEVBQ1osVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsVUFBVTtBQUFBLEVBQ1YsWUFBWTtBQUFBLEVBQ1o7QUFBQSxFQUNBLEdBQUc7QUFDUCxHQUFHLFFBQVE7QUFDUCxRQUFNLGFBQWEsVUFBVSxLQUFLO0FBRWxDLFNBQ0ksZ0JBQUFELE1BQUMsZ0JBQUssS0FBVSxXQUFXLFlBQVksT0FBZSxHQUFHLE9BQ3BELFVBQ0w7QUFFUixDQUFDO0FBRUQsTUFBTSxjQUFjOzs7QUMzQnBCLE9BQU9FLFdBQVMsY0FBQUMsb0JBQWtCO0FBaUIxQixnQkFBQUMsYUFBQTtBQVRSLElBQU0sT0FBT0MsYUFBVyxDQUFDO0FBQUEsRUFDckI7QUFBQSxFQUNBLFlBQVk7QUFBQSxFQUNaO0FBQUEsRUFDQSxHQUFHO0FBQ1AsR0FBRyxRQUFRO0FBQ1AsUUFBTSxhQUFhLFVBQVUsS0FBSztBQUVsQyxTQUNJLGdCQUFBRCxNQUFDLGdCQUFLLEtBQVUsV0FBVyxZQUFZLE9BQWUsR0FBRyxPQUNwRCxnQkFDTDtBQUVSLENBQUM7QUFFRCxLQUFLLGNBQWM7OztBQ3RCbkIsU0FBUyxvQkFBb0I7QUFFN0IsSUFBTSxZQUFZLElBQUksYUFBYTtBQUVuQyxJQUFJLE9BQU8sV0FBVyxhQUFhO0FBQ2pDLFNBQU8saUJBQWlCLFVBQVUsTUFBTTtBQUN0QyxjQUFVLEtBQUssVUFBVSxFQUFFLFFBQVEsVUFBVSxHQUFHLFFBQVEsVUFBVSxFQUFFLENBQUM7QUFBQSxFQUN2RSxDQUFDO0FBQ0g7QUFFQSxTQUFTLFlBQVk7QUFDbkIsTUFBSSxPQUFPLFdBQVc7QUFDcEIsV0FBTyxFQUFFLE9BQU8sR0FBRyxRQUFRLEdBQUcsT0FBTyxHQUFHLFdBQVcsRUFBRTtBQUN2RCxTQUFPO0FBQUEsSUFDTCxPQUFPLE9BQU87QUFBQSxJQUNkLFFBQVEsT0FBTztBQUFBLElBQ2YsT0FBTyxPQUFPLG9CQUFvQjtBQUFBLElBQ2xDLFdBQVc7QUFBQSxFQUNiO0FBQ0Y7QUFFQSxTQUFTLFlBQVk7QUFDbkIsTUFBSSxPQUFPLFdBQVc7QUFDcEIsV0FBTyxFQUFFLE9BQU8sR0FBRyxRQUFRLEdBQUcsT0FBTyxHQUFHLFdBQVcsRUFBRTtBQUN2RCxTQUFPO0FBQUEsSUFDTCxPQUFPLE9BQU8sT0FBTztBQUFBLElBQ3JCLFFBQVEsT0FBTyxPQUFPO0FBQUEsSUFDdEIsT0FBTyxPQUFPLG9CQUFvQjtBQUFBLElBQ2xDLFdBQVc7QUFBQSxFQUNiO0FBQ0Y7OztBQy9CQSxTQUFTLGdCQUFBRSxxQkFBb0I7QUFFN0IsSUFBTSxlQUFlLElBQUlBLGNBQWE7OztBaENHbEMsU0FDSSxPQUFBQyxPQURKLFFBQUFDLGFBQUE7QUFESixJQUFNLFdBQVcsQ0FBQyxFQUFFLFlBQVksVUFBVSxNQUN0QyxnQkFBQUEsTUFBQyxTQUFJLFdBQXNCLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFZLEtBQUksZUFBYyxTQUFRLGdCQUFlLFNBQ2xJO0FBQUEsa0JBQUFELE1BQUMsVUFBSyxHQUFFLGtEQUFpRDtBQUFBLEVBQ3pELGdCQUFBQSxNQUFDLGNBQVMsUUFBTyx5QkFBd0I7QUFBQSxHQUM3QztBQUdKLElBQU0sWUFBWSxDQUFDLEVBQUUsWUFBWSxVQUFVLE1BQ3ZDLGdCQUFBQyxNQUFDLFNBQUksV0FBc0IsU0FBUSxhQUFZLE1BQUssUUFBTyxRQUFPLGdCQUFlLGFBQVksS0FBSSxlQUFjLFNBQVEsZ0JBQWUsU0FDbEk7QUFBQSxrQkFBQUQsTUFBQyxVQUFLLEdBQUUsNkNBQTRDO0FBQUEsRUFDcEQsZ0JBQUFBLE1BQUMsWUFBTyxJQUFHLEtBQUksSUFBRyxLQUFJLEdBQUUsS0FBSTtBQUFBLEVBQzVCLGdCQUFBQSxNQUFDLFVBQUssR0FBRSw4QkFBNkI7QUFBQSxFQUNyQyxnQkFBQUEsTUFBQyxVQUFLLEdBQUUsNkJBQTRCO0FBQUEsR0FDeEM7QUFHSixJQUFNLFlBQVksQ0FBQyxFQUFFLFlBQVksVUFBVSxNQUN2QyxnQkFBQUMsTUFBQyxTQUFJLFdBQXNCLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFZLEtBQUksZUFBYyxTQUFRLGdCQUFlLFNBQ2xJO0FBQUEsa0JBQUFELE1BQUMsVUFBSyxJQUFHLE1BQUssSUFBRyxNQUFLLElBQUcsTUFBSyxJQUFHLE1BQUs7QUFBQSxFQUN0QyxnQkFBQUEsTUFBQyxVQUFLLElBQUcsTUFBSyxJQUFHLE1BQUssSUFBRyxNQUFLLElBQUcsS0FBSTtBQUFBLEVBQ3JDLGdCQUFBQSxNQUFDLFVBQUssSUFBRyxLQUFJLElBQUcsTUFBSyxJQUFHLEtBQUksSUFBRyxNQUFLO0FBQUEsR0FDeEM7QUFHSixJQUFNLGVBQWUsQ0FBQyxFQUFFLFlBQVksVUFBVSxNQUMxQyxnQkFBQUMsTUFBQyxTQUFJLFdBQXNCLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFZLEtBQUksZUFBYyxTQUFRLGdCQUFlLFNBQ2xJO0FBQUEsa0JBQUFELE1BQUMsWUFBTyxJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSTtBQUFBLEVBQzlCLGdCQUFBQSxNQUFDLFVBQUssR0FBRSxrdUJBQWl1QjtBQUFBLEdBQzd1QjtBQUdKLElBQU0sV0FBVyxDQUFDLEVBQUUsWUFBWSxVQUFVLE1BQ3RDLGdCQUFBQyxNQUFDLFNBQUksV0FBc0IsU0FBUSxhQUFZLE1BQUssUUFBTyxRQUFPLGdCQUFlLGFBQVksS0FBSSxlQUFjLFNBQVEsZ0JBQWUsU0FDbEk7QUFBQSxrQkFBQUQsTUFBQyxVQUFLLEdBQUUsOERBQTZEO0FBQUEsRUFDckUsZ0JBQUFBLE1BQUMsY0FBUyxRQUFPLGtCQUFpQjtBQUFBLEdBQ3RDO0FBR0osSUFBTSxhQUFhLENBQUMsRUFBRSxZQUFZLFVBQVUsTUFDeEMsZ0JBQUFDLE1BQUMsU0FBSSxXQUFzQixTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBWSxLQUFJLGVBQWMsU0FBUSxnQkFBZSxTQUNsSTtBQUFBLGtCQUFBRCxNQUFDLFVBQUssR0FBRSwyQ0FBMEM7QUFBQSxFQUNsRCxnQkFBQUEsTUFBQyxjQUFTLFFBQU8sb0JBQW1CO0FBQUEsRUFDcEMsZ0JBQUFBLE1BQUMsVUFBSyxJQUFHLE1BQUssSUFBRyxNQUFLLElBQUcsS0FBSSxJQUFHLE1BQUs7QUFBQSxHQUN6QztBQUdKLElBQU0sV0FBVyxDQUFDLEVBQUUsWUFBWSxVQUFVLE1BQ3RDLGdCQUFBQyxNQUFDLFNBQUksV0FBc0IsU0FBUSxhQUFZLE1BQUssUUFBTyxRQUFPLGdCQUFlLGFBQVksS0FBSSxlQUFjLFNBQVEsZ0JBQWUsU0FDbEk7QUFBQSxrQkFBQUQsTUFBQyxVQUFLLElBQUcsS0FBSSxJQUFHLE1BQUssSUFBRyxNQUFLLElBQUcsTUFBSztBQUFBLEVBQ3JDLGdCQUFBQSxNQUFDLFVBQUssSUFBRyxLQUFJLElBQUcsS0FBSSxJQUFHLE1BQUssSUFBRyxLQUFJO0FBQUEsRUFDbkMsZ0JBQUFBLE1BQUMsVUFBSyxJQUFHLEtBQUksSUFBRyxNQUFLLElBQUcsTUFBSyxJQUFHLE1BQUs7QUFBQSxHQUN6QztBQUdKLElBQU0sV0FBVyxDQUFDLEVBQUUsWUFBWSxVQUFVLE1BQ3RDLGdCQUFBQyxNQUFDLFNBQUksV0FBc0IsU0FBUSxhQUFZLE1BQUssUUFBTyxRQUFPLGdCQUFlLGFBQVksS0FBSSxlQUFjLFNBQVEsZ0JBQWUsU0FDbEk7QUFBQSxrQkFBQUQsTUFBQyxVQUFLLEdBQUUsK0NBQThDO0FBQUEsRUFDdEQsZ0JBQUFBLE1BQUMsVUFBSyxHQUFFLDhCQUE2QjtBQUFBLEdBQ3pDO0FBR0osSUFBTSxhQUFhLENBQUMsRUFBRSxZQUFZLFVBQVUsTUFDeEMsZ0JBQUFDLE1BQUMsU0FBSSxXQUFzQixTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBWSxLQUFJLGVBQWMsU0FBUSxnQkFBZSxTQUNsSTtBQUFBLGtCQUFBRCxNQUFDLFlBQU8sSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLEtBQUk7QUFBQSxFQUM5QixnQkFBQUEsTUFBQyxVQUFLLElBQUcsTUFBSyxJQUFHLE1BQUssSUFBRyxTQUFRLElBQUcsU0FBUTtBQUFBLEdBQ2hEO0FBR0osSUFBTSxjQUFjLENBQUMsRUFBRSxZQUFZLFVBQVUsTUFDekMsZ0JBQUFDLE1BQUMsU0FBSSxXQUFzQixTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBWSxLQUFJLGVBQWMsU0FBUSxnQkFBZSxTQUNsSTtBQUFBLGtCQUFBRCxNQUFDLGNBQVMsUUFBTyxnQ0FBK0I7QUFBQSxFQUNoRCxnQkFBQUEsTUFBQyxjQUFTLFFBQU8sbUJBQWtCO0FBQUEsR0FDdkM7QUFHSixJQUFNLGdCQUFnQixDQUFDLEVBQUUsWUFBWSxVQUFVLE1BQzNDLGdCQUFBQyxNQUFDLFNBQUksV0FBc0IsU0FBUSxhQUFZLE1BQUssUUFBTyxRQUFPLGdCQUFlLGFBQVksS0FBSSxlQUFjLFNBQVEsZ0JBQWUsU0FDbEk7QUFBQSxrQkFBQUQsTUFBQyxjQUFTLFFBQU8sK0JBQThCO0FBQUEsRUFDL0MsZ0JBQUFBLE1BQUMsY0FBUyxRQUFPLHFCQUFvQjtBQUFBLEdBQ3pDO0FBR0osSUFBTSxVQUFVLENBQUMsRUFBRSxZQUFZLFVBQVUsTUFDckMsZ0JBQUFDLE1BQUMsU0FBSSxXQUFzQixTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBWSxLQUFJLGVBQWMsU0FBUSxnQkFBZSxTQUNsSTtBQUFBLGtCQUFBRCxNQUFDLFVBQUssR0FBRSxnREFBK0M7QUFBQSxFQUN2RCxnQkFBQUEsTUFBQyxZQUFPLElBQUcsTUFBSyxJQUFHLE1BQUssR0FBRSxLQUFJO0FBQUEsR0FDbEM7QUFHSixJQUFNLGVBQWUsQ0FBQyxFQUFFLFlBQVksVUFBVSxNQUMxQyxnQkFBQUMsTUFBQyxTQUFJLFdBQXNCLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFZLEtBQUksZUFBYyxTQUFRLGdCQUFlLFNBQ2xJO0FBQUEsa0JBQUFELE1BQUMsVUFBSyxHQUFFLDZDQUE0QztBQUFBLEVBQ3BELGdCQUFBQSxNQUFDLGNBQVMsUUFBTyxvQkFBbUI7QUFBQSxFQUNwQyxnQkFBQUEsTUFBQyxVQUFLLElBQUcsTUFBSyxJQUFHLE1BQUssSUFBRyxNQUFLLElBQUcsS0FBSTtBQUFBLEdBQ3pDO0FBV0osSUFBTSxXQUFXLENBQUMsRUFBRSxZQUFZLFVBQVUsTUFDdEMsZ0JBQUFFLE1BQUMsU0FBSSxXQUFzQixTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBWSxLQUFJLGVBQWMsU0FBUSxnQkFBZSxTQUNsSTtBQUFBLGtCQUFBQyxNQUFDLGNBQVMsUUFBTyxvQkFBbUI7QUFBQSxFQUNwQyxnQkFBQUEsTUFBQyxjQUFTLFFBQU8saUJBQWdCO0FBQUEsR0FDckM7QUFHSixJQUFNLGVBQWUsQ0FBQyxFQUFFLFlBQVksVUFBVSxNQUMxQyxnQkFBQUQsTUFBQyxTQUFJLFdBQXNCLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFZLEtBQUksZUFBYyxTQUFRLGdCQUFlLFNBQ2xJO0FBQUEsa0JBQUFDLE1BQUMsYUFBUSxJQUFHLE1BQUssSUFBRyxLQUFJLElBQUcsS0FBSSxJQUFHLEtBQUk7QUFBQSxFQUN0QyxnQkFBQUEsTUFBQyxVQUFLLEdBQUUscUNBQW9DO0FBQUEsRUFDNUMsZ0JBQUFBLE1BQUMsVUFBSyxHQUFFLHVDQUFzQztBQUFBLEdBQ2xEO0FBR0osSUFBTSxXQUFXLENBQUMsRUFBRSxZQUFZLFVBQVUsTUFDdEMsZ0JBQUFELE1BQUMsU0FBSSxXQUFzQixTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBWSxLQUFJLGVBQWMsU0FBUSxnQkFBZSxTQUNsSTtBQUFBLGtCQUFBQyxNQUFDLFVBQUssSUFBRyxNQUFLLElBQUcsS0FBSSxJQUFHLE1BQUssSUFBRyxNQUFLO0FBQUEsRUFDckMsZ0JBQUFBLE1BQUMsVUFBSyxJQUFHLEtBQUksSUFBRyxNQUFLLElBQUcsTUFBSyxJQUFHLE1BQUs7QUFBQSxHQUN6QztBQUdKLElBQU0sV0FBVyxDQUFDLEVBQUUsWUFBWSxVQUFVLE1BQ3RDLGdCQUFBRCxNQUFDLFNBQUksV0FBc0IsU0FBUSxhQUFZLE1BQUssUUFBTyxRQUFPLGdCQUFlLGFBQVksS0FBSSxlQUFjLFNBQVEsZ0JBQWUsU0FDbEk7QUFBQSxrQkFBQUMsTUFBQyxZQUFPLElBQUcsTUFBSyxJQUFHLE1BQUssR0FBRSxLQUFJO0FBQUEsRUFDOUIsZ0JBQUFBLE1BQUMsWUFBTyxJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSTtBQUFBLEVBQzlCLGdCQUFBQSxNQUFDLFlBQU8sSUFBRyxLQUFJLElBQUcsTUFBSyxHQUFFLEtBQUk7QUFBQSxHQUNqQztBQUdXLFNBQVIsaUJBQWtDO0FBQ3JDLFFBQU0sQ0FBQyxNQUFNLE9BQU8sSUFBSSxTQUFTLElBQUk7QUFDckMsUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNBQVMsSUFBSTtBQUNuRCxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBUyxXQUFXO0FBRXRELFlBQVUsTUFBTTtBQUVaLFVBQU0sUUFBUSxhQUFhLFFBQVEsWUFBWTtBQUMvQyxVQUFNLFdBQVcsYUFBYSxRQUFRLFdBQVc7QUFFakQsUUFBSSxDQUFDLE9BQU87QUFDUixhQUFPLFNBQVMsT0FBTztBQUN2QjtBQUFBLElBQ0o7QUFFQSxRQUFJLFVBQVU7QUFDVixjQUFRLEtBQUssTUFBTSxRQUFRLENBQUM7QUFBQSxJQUNoQztBQUFBLEVBQ0osR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGVBQWUsTUFBTTtBQUN2QixpQkFBYSxXQUFXLFlBQVk7QUFDcEMsaUJBQWEsV0FBVyxXQUFXO0FBQ25DLFdBQU8sU0FBUyxPQUFPO0FBQUEsRUFDM0I7QUFFQSxRQUFNLFFBQVE7QUFBQSxJQUNWLEVBQUUsT0FBTyxlQUFlLE9BQU8sVUFBVSxRQUFRLFVBQVUsT0FBTyxNQUFNLE1BQU0sV0FBVyxPQUFPLFNBQVM7QUFBQSxJQUN6RyxFQUFFLE9BQU8sY0FBYyxPQUFPLFFBQVEsUUFBUSxTQUFTLE9BQU8sTUFBTSxNQUFNLFNBQVMsT0FBTyxTQUFTO0FBQUEsSUFDbkcsRUFBRSxPQUFPLGFBQWEsT0FBTyxVQUFVLFFBQVEsVUFBVSxPQUFPLE1BQU0sTUFBTSxjQUFjLE9BQU8sT0FBTztBQUFBLElBQ3hHLEVBQUUsT0FBTyxtQkFBbUIsT0FBTyxTQUFTLFFBQVEsU0FBUyxPQUFPLFFBQVEsTUFBTSxVQUFVLE9BQU8sT0FBTztBQUFBLEVBQzlHO0FBRUEsUUFBTSxpQkFBaUI7QUFBQSxJQUNuQixFQUFFLE1BQU0sWUFBWSxRQUFRLHVCQUF1QixNQUFNLGFBQWEsUUFBUSxLQUFLO0FBQUEsSUFDbkYsRUFBRSxNQUFNLGVBQWUsUUFBUSwyQkFBMkIsTUFBTSxjQUFjLFFBQVEsS0FBSztBQUFBLElBQzNGLEVBQUUsTUFBTSxnQkFBZ0IsUUFBUSwwQkFBMEIsTUFBTSxjQUFjLFFBQVEsS0FBSztBQUFBLElBQzNGLEVBQUUsTUFBTSxlQUFlLFFBQVEsMEJBQTBCLE1BQU0sZUFBZSxRQUFRLEtBQUs7QUFBQSxJQUMzRixFQUFFLE1BQU0sZUFBZSxRQUFRLDJCQUEyQixNQUFNLGVBQWUsUUFBUSxLQUFLO0FBQUEsRUFDaEc7QUFFQSxRQUFNLFdBQVc7QUFBQSxJQUNiLEVBQUUsSUFBSSxhQUFhLE9BQU8sYUFBYSxNQUFNLFNBQVM7QUFBQSxJQUN0RCxFQUFFLElBQUksU0FBUyxPQUFPLFNBQVMsTUFBTSxVQUFVO0FBQUEsSUFDL0MsRUFBRSxJQUFJLGFBQWEsT0FBTyxhQUFhLE1BQU0sVUFBVTtBQUFBLElBQ3ZELEVBQUUsSUFBSSxXQUFXLE9BQU8sV0FBVyxNQUFNLFNBQVM7QUFBQSxJQUNsRCxFQUFFLElBQUksWUFBWSxPQUFPLFlBQVksTUFBTSxhQUFhO0FBQUEsSUFDeEQsRUFBRSxJQUFJLFlBQVksT0FBTyxZQUFZLE1BQU0sYUFBYTtBQUFBLEVBQzVEO0FBRUEsTUFBSSxDQUFDLE1BQU07QUFDUCxXQUNJLGdCQUFBQSxNQUFDLFNBQUksV0FBVSw2REFDWCwwQkFBQUEsTUFBQyxTQUFJLFdBQVUscUZBQW9GLEdBQ3ZHO0FBQUEsRUFFUjtBQUVBLFNBQ0ksZ0JBQUFELE1BQUMsU0FBSSxXQUFVLGlDQUVYO0FBQUEsb0JBQUFBLE1BQUMsV0FBTSxXQUFXLEdBQUcsY0FBYyxTQUFTLE1BQU0seUZBRTlDO0FBQUEsc0JBQUFDLE1BQUMsU0FBSSxXQUFVLDJEQUNYLDBCQUFBQSxNQUFDLFFBQUssTUFBSyxLQUNQLDBCQUFBRCxNQUFDLFNBQUksV0FBVSwwQ0FDWDtBQUFBLHdCQUFBQyxNQUFDLFNBQUksS0FBSSxhQUFZLEtBQUksU0FBUSxXQUFVLGFBQVk7QUFBQSxRQUN0RCxlQUNHLGdCQUFBQSxNQUFDLFVBQUssV0FBVSxrR0FBaUcsbUJBRWpIO0FBQUEsU0FFUixHQUNKLEdBQ0o7QUFBQSxNQUdBLGdCQUFBQSxNQUFDLFNBQUksV0FBVSx3QkFDVixtQkFBUyxJQUFJLENBQUMsU0FBUztBQUNwQixjQUFNQyxRQUFPLEtBQUs7QUFDbEIsZUFDSSxnQkFBQUY7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUVHLFNBQVMsTUFBTSxhQUFhLEtBQUssRUFBRTtBQUFBLFlBQ25DLFdBQVcsc0VBQ1AsY0FBYyxLQUFLLEtBQ2IsNERBQ0EscURBQ1Y7QUFBQSxZQUVBO0FBQUEsOEJBQUFDLE1BQUNDLE9BQUEsRUFBSyxXQUFVLHlCQUF3QjtBQUFBLGNBQ3ZDLGVBQWUsZ0JBQUFELE1BQUMsVUFBSyxXQUFVLGVBQWUsZUFBSyxPQUFNO0FBQUE7QUFBQTtBQUFBLFVBVHJELEtBQUs7QUFBQSxRQVVkO0FBQUEsTUFFUixDQUFDLEdBQ0w7QUFBQSxNQUdBLGdCQUFBQSxNQUFDLFNBQUksV0FBVSxtQ0FDWCwwQkFBQUQ7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNHLFNBQVM7QUFBQSxVQUNULFdBQVU7QUFBQSxVQUVWO0FBQUEsNEJBQUFDLE1BQUMsY0FBVyxXQUFVLHlCQUF3QjtBQUFBLFlBQzdDLGVBQWUsZ0JBQUFBLE1BQUMsVUFBSyxXQUFVLGVBQWMsb0JBQU07QUFBQTtBQUFBO0FBQUEsTUFDeEQsR0FDSjtBQUFBLE9BQ0o7QUFBQSxJQUdBLGdCQUFBRCxNQUFDLFNBQUksV0FBVSx3QkFFWDtBQUFBLHNCQUFBQSxNQUFDLFlBQU8sV0FBVSwwRkFDZDtBQUFBLHdCQUFBQSxNQUFDLFNBQUksV0FBVSwyQkFDWDtBQUFBLDBCQUFBQztBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0csU0FBUyxNQUFNLGVBQWUsQ0FBQyxXQUFXO0FBQUEsY0FDMUMsV0FBVTtBQUFBLGNBRVYsMEJBQUFBLE1BQUMsWUFBUyxXQUFVLFdBQVU7QUFBQTtBQUFBLFVBQ2xDO0FBQUEsVUFHQSxnQkFBQUQsTUFBQyxTQUFJLFdBQVUsNEJBQ1g7QUFBQSw0QkFBQUMsTUFBQyxjQUFXLFdBQVUsa0VBQWlFO0FBQUEsWUFDdkYsZ0JBQUFBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0csTUFBSztBQUFBLGdCQUNMLGFBQVk7QUFBQSxnQkFDWixXQUFVO0FBQUE7QUFBQSxZQUNkO0FBQUEsYUFDSjtBQUFBLFdBQ0o7QUFBQSxRQUVBLGdCQUFBRCxNQUFDLFNBQUksV0FBVSwyQkFFWDtBQUFBLDBCQUFBQSxNQUFDLFlBQU8sV0FBVSxpR0FDZDtBQUFBLDRCQUFBQyxNQUFDLFlBQVMsV0FBVSxXQUFVO0FBQUEsWUFDOUIsZ0JBQUFBLE1BQUMsVUFBSyxXQUFVLDBEQUF5RDtBQUFBLGFBQzdFO0FBQUEsVUFHQSxnQkFBQUQsTUFBQyxTQUFJLFdBQVUsMkJBQ1g7QUFBQSw0QkFBQUMsTUFBQyxTQUFJLFdBQVUsd0lBQ1YsZ0JBQU0sTUFBTSxNQUFNLEdBQUcsRUFBRSxJQUFJLE9BQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxNQUN2RDtBQUFBLFlBQ0EsZ0JBQUFELE1BQUMsU0FBSSxXQUFVLG1CQUNYO0FBQUEsOEJBQUFDLE1BQUMsU0FBSSxXQUFVLGtDQUFrQyxnQkFBTSxRQUFRLGNBQWE7QUFBQSxjQUM1RSxnQkFBQUEsTUFBQyxTQUFJLFdBQVUseUJBQXlCLGdCQUFNLE9BQU07QUFBQSxlQUN4RDtBQUFBLGFBQ0o7QUFBQSxXQUNKO0FBQUEsU0FDSjtBQUFBLE1BR0EsZ0JBQUFELE1BQUMsVUFBSyxXQUFVLDRCQUVaO0FBQUEsd0JBQUFBLE1BQUMsU0FBSSxXQUFVLDBDQUNYO0FBQUEsMEJBQUFBLE1BQUMsU0FDRztBQUFBLDRCQUFBQyxNQUFDLFFBQUcsV0FBVSxzQ0FBcUMsdUJBQVM7QUFBQSxZQUM1RCxnQkFBQUQsTUFBQyxPQUFFLFdBQVUsaUJBQWdCO0FBQUE7QUFBQSxjQUFlLE1BQU0sTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUs7QUFBQSxjQUFRO0FBQUEsZUFBMEI7QUFBQSxhQUMvRztBQUFBLFVBQ0EsZ0JBQUFBLE1BQUMsWUFBTyxXQUFVLDRKQUNkO0FBQUEsNEJBQUFDLE1BQUMsWUFBUyxXQUFVLFdBQVU7QUFBQSxZQUM5QixnQkFBQUEsTUFBQyxVQUFLLHlCQUFXO0FBQUEsYUFDckI7QUFBQSxXQUNKO0FBQUEsUUFHQSxnQkFBQUEsTUFBQyxTQUFJLFdBQVUsNkRBQ1YsZ0JBQU0sSUFBSSxDQUFDLE1BQU0sVUFBVTtBQUN4QixnQkFBTUMsUUFBTyxLQUFLO0FBQ2xCLGlCQUNJLGdCQUFBRixNQUFDLFNBQWdCLFdBQVUsK0ZBQ3ZCO0FBQUEsNEJBQUFBLE1BQUMsU0FBSSxXQUFVLDBDQUNYO0FBQUEsOEJBQUFDLE1BQUMsU0FBSSxXQUFXLGdCQUFnQixLQUFLLEtBQUssdURBQ3RDLDBCQUFBQSxNQUFDQyxPQUFBLEVBQUssV0FBVyxnQkFBZ0IsS0FBSyxLQUFLLFFBQVEsR0FDdkQ7QUFBQSxjQUNBLGdCQUFBRixNQUFDLFNBQUksV0FBVyxtQ0FBbUMsS0FBSyxVQUFVLE9BQU8sbUJBQW1CLGNBQWMsSUFDckc7QUFBQSxxQkFBSyxVQUFVLE9BQU8sZ0JBQUFDLE1BQUMsZUFBWSxXQUFVLFdBQVUsSUFBSyxnQkFBQUEsTUFBQyxpQkFBYyxXQUFVLFdBQVU7QUFBQSxnQkFDaEcsZ0JBQUFBLE1BQUMsVUFBTSxlQUFLLFFBQU87QUFBQSxpQkFDdkI7QUFBQSxlQUNKO0FBQUEsWUFDQSxnQkFBQUEsTUFBQyxTQUFJLFdBQVUsc0NBQXNDLGVBQUssT0FBTTtBQUFBLFlBQ2hFLGdCQUFBQSxNQUFDLFNBQUksV0FBVSx5QkFBeUIsZUFBSyxPQUFNO0FBQUEsZUFYN0MsS0FZVjtBQUFBLFFBRVIsQ0FBQyxHQUNMO0FBQUEsUUFHQSxnQkFBQUQsTUFBQyxTQUFJLFdBQVUseUNBRVg7QUFBQSwwQkFBQUEsTUFBQyxTQUFJLFdBQVUseUVBQ1g7QUFBQSw0QkFBQUEsTUFBQyxTQUFJLFdBQVUsMENBQ1g7QUFBQSw4QkFBQUMsTUFBQyxRQUFHLFdBQVUsb0NBQW1DLDhCQUFnQjtBQUFBLGNBQ2pFLGdCQUFBRCxNQUFDLFlBQU8sV0FBVSxzSUFDZDtBQUFBLGdDQUFBQyxNQUFDLFlBQU8seUJBQVc7QUFBQSxnQkFDbkIsZ0JBQUFBLE1BQUMsWUFBTywwQkFBWTtBQUFBLGdCQUNwQixnQkFBQUEsTUFBQyxZQUFPLDBCQUFZO0FBQUEsaUJBQ3hCO0FBQUEsZUFDSjtBQUFBLFlBR0EsZ0JBQUFBLE1BQUMsU0FBSSxXQUFVLGtEQUNWLFdBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxNQUMzRCxnQkFBQUQsTUFBQyxTQUFZLFdBQVUsMkNBQ25CO0FBQUEsOEJBQUFDO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUNHLFdBQVU7QUFBQSxrQkFDVixPQUFPLEVBQUUsUUFBUSxHQUFHLE1BQU0sSUFBSTtBQUFBO0FBQUEsY0FDakM7QUFBQSxjQUNELGdCQUFBQSxNQUFDLFVBQUssV0FBVSx5QkFBeUIsV0FBQyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRTtBQUFBLGlCQUxuRyxDQU1WLENBQ0gsR0FDTDtBQUFBLGFBQ0o7QUFBQSxVQUdBLGdCQUFBRCxNQUFDLFNBQUksV0FBVSwyREFDWDtBQUFBLDRCQUFBQSxNQUFDLFNBQUksV0FBVSwwQ0FDWDtBQUFBLDhCQUFBQyxNQUFDLFFBQUcsV0FBVSxvQ0FBbUMsNkJBQWU7QUFBQSxjQUNoRSxnQkFBQUEsTUFBQyxZQUFPLFdBQVUsMEZBQ2QsMEJBQUFBLE1BQUMsWUFBUyxXQUFVLFdBQVUsR0FDbEM7QUFBQSxlQUNKO0FBQUEsWUFFQSxnQkFBQUEsTUFBQyxTQUFJLFdBQVUsYUFDVix5QkFBZSxJQUFJLENBQUMsVUFBVSxVQUMzQixnQkFBQUQsTUFBQyxTQUFnQixXQUFVLDBCQUN2QjtBQUFBLDhCQUFBQyxNQUFDLFNBQUksV0FBVSxrSkFDVixtQkFBUyxRQUNkO0FBQUEsY0FDQSxnQkFBQUQsTUFBQyxTQUFJLFdBQVUsa0JBQ1g7QUFBQSxnQ0FBQUMsTUFBQyxPQUFFLFdBQVUsK0JBQ1QsMEJBQUFBLE1BQUMsVUFBSyxXQUFVLGVBQWUsbUJBQVMsTUFBSyxHQUNqRDtBQUFBLGdCQUNBLGdCQUFBQSxNQUFDLE9BQUUsV0FBVSxrQ0FBa0MsbUJBQVMsUUFBTztBQUFBLGdCQUMvRCxnQkFBQUEsTUFBQyxPQUFFLFdBQVUsZ0NBQWdDLG1CQUFTLE1BQUs7QUFBQSxpQkFDL0Q7QUFBQSxpQkFWTSxLQVdWLENBQ0gsR0FDTDtBQUFBLFlBRUEsZ0JBQUFBLE1BQUMsWUFBTyxXQUFVLGtHQUFpRyxzQ0FFbkg7QUFBQSxhQUNKO0FBQUEsV0FDSjtBQUFBLFFBR0EsZ0JBQUFELE1BQUMsU0FBSSxXQUFVLFFBQ1g7QUFBQSwwQkFBQUMsTUFBQyxRQUFHLFdBQVUseUNBQXdDLDJCQUFhO0FBQUEsVUFDbkUsZ0JBQUFBLE1BQUMsU0FBSSxXQUFVLHlDQUNWO0FBQUEsWUFDRyxFQUFFLE1BQU0sV0FBVyxPQUFPLGdCQUFnQixPQUFPLFNBQVM7QUFBQSxZQUMxRCxFQUFFLE1BQU0sVUFBVSxPQUFPLGdCQUFnQixPQUFPLFNBQVM7QUFBQSxZQUN6RCxFQUFFLE1BQU0sV0FBVyxPQUFPLGtCQUFrQixPQUFPLE9BQU87QUFBQSxZQUMxRCxFQUFFLE1BQU0sY0FBYyxPQUFPLFlBQVksT0FBTyxPQUFPO0FBQUEsVUFDM0QsRUFBRSxJQUFJLENBQUMsUUFBUSxVQUFVO0FBQ3JCLGtCQUFNQyxRQUFPLE9BQU87QUFDcEIsbUJBQ0ksZ0JBQUFGO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBRUcsV0FBVTtBQUFBLGdCQUVWO0FBQUEsa0NBQUFDLE1BQUMsU0FBSSxXQUFXLGdCQUFnQixPQUFPLEtBQUssa0dBQ3hDLDBCQUFBQSxNQUFDQyxPQUFBLEVBQUssV0FBVyxnQkFBZ0IsT0FBTyxLQUFLLFFBQVEsR0FDekQ7QUFBQSxrQkFDQSxnQkFBQUQsTUFBQyxVQUFLLFdBQVUsa0NBQWtDLGlCQUFPLE9BQU07QUFBQTtBQUFBO0FBQUEsY0FOMUQ7QUFBQSxZQU9UO0FBQUEsVUFFUixDQUFDLEdBQ0w7QUFBQSxXQUNKO0FBQUEsU0FDSjtBQUFBLE9BQ0o7QUFBQSxLQUNKO0FBRVI7IiwKICAibmFtZXMiOiBbIlJlYWN0IiwgInBsYXRmb3JtIiwgIlN0eWxlU2hlZXQiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAianN4cyIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIkV2ZW50RW1pdHRlciIsICJqc3giLCAianN4cyIsICJqc3hzIiwgImpzeCIsICJJY29uIl0KfQo=
