var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// pages/docs.jsx
import React28, { useState } from "react";

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

// pages/docs.jsx
import { jsx as jsx25, jsxs as jsxs3 } from "react/jsx-runtime";
function Docs() {
  const [copiedCommand, setCopiedCommand] = useState("");
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(""), 2e3);
  };
  const quickLinks = [
    {
      title: "Getting Started",
      description: "Learn the basics and create your first INDJS app",
      icon: "\u{1F680}",
      color: "from-blue-500 to-indigo-600",
      topics: ["Installation", "Project Structure", "First Page", "Routing Basics"]
    },
    {
      title: "Core Concepts",
      description: "Understand the fundamental concepts of INDJS",
      icon: "\u{1F4DA}",
      color: "from-purple-500 to-pink-600",
      topics: ["File-Based Routing", "API Routes", "Data Fetching", "Middleware"]
    },
    {
      title: "Features",
      description: "Explore all the powerful features INDJS offers",
      icon: "\u26A1",
      color: "from-yellow-500 to-orange-600",
      topics: ["Authentication", "Database", "SSR", "Static Export"]
    },
    {
      title: "Deployment",
      description: "Deploy your INDJS app to production",
      icon: "\u2601\uFE0F",
      color: "from-green-500 to-teal-600",
      topics: ["Vercel", "Cloudflare", "Docker", "Custom Server"]
    }
  ];
  return /* @__PURE__ */ jsxs3("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxs3("section", { className: "relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20", children: [
      /* @__PURE__ */ jsx25("div", { className: "absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" }),
      /* @__PURE__ */ jsx25("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs3("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxs3("div", { className: "inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6", children: [
          /* @__PURE__ */ jsx25("span", { className: "text-2xl mr-2", children: "\u{1F4D6}" }),
          /* @__PURE__ */ jsx25("span", { className: "text-sm font-semibold", children: "Documentation" })
        ] }),
        /* @__PURE__ */ jsx25("h1", { className: "text-5xl md:text-7xl font-black mb-6", children: "Learn INDJS" }),
        /* @__PURE__ */ jsx25("p", { className: "text-xl text-indigo-100 max-w-3xl mx-auto mb-8", children: "Everything you need to know to build amazing applications with INDJS" }),
        /* @__PURE__ */ jsx25("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs3("div", { className: "bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg", children: [
          /* @__PURE__ */ jsx25(
            "input",
            {
              type: "text",
              placeholder: "Search documentation...",
              className: "bg-transparent border-none outline-none text-white placeholder-indigo-200 w-64"
            }
          ),
          /* @__PURE__ */ jsx25("span", { className: "text-indigo-200", children: "\u{1F50D}" })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx25("section", { className: "py-20", children: /* @__PURE__ */ jsx25("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs3("div", { className: "bg-white rounded-2xl shadow-xl p-8 md:p-12", children: [
      /* @__PURE__ */ jsx25("h2", { className: "text-4xl font-bold text-gray-900 mb-8", children: "Quick Start" }),
      /* @__PURE__ */ jsxs3("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex gap-6", children: [
          /* @__PURE__ */ jsx25("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl", children: "1" }),
          /* @__PURE__ */ jsxs3("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx25("h3", { className: "text-2xl font-bold text-gray-900 mb-3", children: "Install INDJS" }),
            /* @__PURE__ */ jsx25("p", { className: "text-gray-600 mb-4", children: "Create a new INDJS project with a single command:" }),
            /* @__PURE__ */ jsxs3("div", { className: "bg-gray-900 rounded-xl p-4 font-mono text-sm", children: [
              /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsx25("span", { className: "text-gray-400", children: "Terminal" }),
                /* @__PURE__ */ jsx25(
                  "button",
                  {
                    onClick: () => copyToClipboard("npx indjs@latest create my-app", "cmd1"),
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: copiedCommand === "cmd1" ? "\u2705 Copied!" : "\u{1F4CB} Copy"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "text-green-400", children: [
                /* @__PURE__ */ jsx25("span", { className: "text-gray-500", children: "$" }),
                " npx indjs@latest create my-app"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "flex gap-6", children: [
          /* @__PURE__ */ jsx25("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl", children: "2" }),
          /* @__PURE__ */ jsxs3("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx25("h3", { className: "text-2xl font-bold text-gray-900 mb-3", children: "Navigate to Your Project" }),
            /* @__PURE__ */ jsxs3("div", { className: "bg-gray-900 rounded-xl p-4 font-mono text-sm", children: [
              /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsx25("span", { className: "text-gray-400", children: "Terminal" }),
                /* @__PURE__ */ jsx25(
                  "button",
                  {
                    onClick: () => copyToClipboard("cd my-app", "cmd2"),
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: copiedCommand === "cmd2" ? "\u2705 Copied!" : "\u{1F4CB} Copy"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "text-green-400", children: [
                /* @__PURE__ */ jsx25("span", { className: "text-gray-500", children: "$" }),
                " cd my-app"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "flex gap-6", children: [
          /* @__PURE__ */ jsx25("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl", children: "3" }),
          /* @__PURE__ */ jsxs3("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx25("h3", { className: "text-2xl font-bold text-gray-900 mb-3", children: "Start Development Server" }),
            /* @__PURE__ */ jsxs3("div", { className: "bg-gray-900 rounded-xl p-4 font-mono text-sm", children: [
              /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsx25("span", { className: "text-gray-400", children: "Terminal" }),
                /* @__PURE__ */ jsx25(
                  "button",
                  {
                    onClick: () => copyToClipboard("npm run dev", "cmd3"),
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: copiedCommand === "cmd3" ? "\u2705 Copied!" : "\u{1F4CB} Copy"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "text-green-400", children: [
                /* @__PURE__ */ jsx25("span", { className: "text-gray-500", children: "$" }),
                " npm run dev"
              ] })
            ] }),
            /* @__PURE__ */ jsxs3("p", { className: "text-gray-600 mt-4", children: [
              "Open ",
              /* @__PURE__ */ jsx25("span", { className: "font-mono bg-gray-100 px-2 py-1 rounded", children: "http://localhost:3000" }),
              " in your browser \u{1F389}"
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx25("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs3("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx25("h2", { className: "text-4xl font-bold text-gray-900 mb-12 text-center", children: "Documentation Sections" }),
      /* @__PURE__ */ jsx25("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: quickLinks.map((section, idx) => /* @__PURE__ */ jsxs3(
        "div",
        {
          className: "bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100",
          children: [
            /* @__PURE__ */ jsx25("div", { className: `h-2 bg-gradient-to-r ${section.color}` }),
            /* @__PURE__ */ jsxs3("div", { className: "p-8", children: [
              /* @__PURE__ */ jsx25("div", { className: "text-5xl mb-4", children: section.icon }),
              /* @__PURE__ */ jsx25("h3", { className: "text-2xl font-bold text-gray-900 mb-3", children: section.title }),
              /* @__PURE__ */ jsx25("p", { className: "text-gray-600 mb-6", children: section.description }),
              /* @__PURE__ */ jsx25("ul", { className: "space-y-2", children: section.topics.map((topic, topicIdx) => /* @__PURE__ */ jsxs3("li", { className: "flex items-center text-gray-700", children: [
                /* @__PURE__ */ jsx25("span", { className: "text-indigo-600 mr-2", children: "\u2192" }),
                topic
              ] }, topicIdx)) })
            ] })
          ]
        },
        idx
      )) })
    ] }) }),
    /* @__PURE__ */ jsx25("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs3("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs3("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx25("h2", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Your First Page" }),
        /* @__PURE__ */ jsx25("p", { className: "text-xl text-gray-600", children: "Create a new page in seconds" })
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs3("div", { className: "bg-white rounded-xl p-8 shadow-lg", children: [
          /* @__PURE__ */ jsx25("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "1. Create a File" }),
          /* @__PURE__ */ jsxs3("p", { className: "text-gray-600 mb-4", children: [
            "Create ",
            /* @__PURE__ */ jsx25("span", { className: "font-mono bg-gray-100 px-2 py-1 rounded", children: "pages/hello.jsx" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "bg-gray-900 rounded-xl p-6", children: [
            /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsx25("div", { className: "w-3 h-3 rounded-full bg-red-500" }),
              /* @__PURE__ */ jsx25("div", { className: "w-3 h-3 rounded-full bg-yellow-500" }),
              /* @__PURE__ */ jsx25("div", { className: "w-3 h-3 rounded-full bg-green-500" }),
              /* @__PURE__ */ jsx25("span", { className: "ml-auto text-gray-400 text-sm", children: "pages/hello.jsx" })
            ] }),
            /* @__PURE__ */ jsx25("pre", { className: "text-sm text-gray-300 overflow-x-auto", children: /* @__PURE__ */ jsx25("code", { children: `import React from 'react';

export default function Hello() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Hello, World! \u{1F44B}
      </h1>
    </div>
  );
}` }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "bg-white rounded-xl p-8 shadow-lg", children: [
          /* @__PURE__ */ jsx25("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "2. Access Your Page" }),
          /* @__PURE__ */ jsxs3("p", { className: "text-gray-600 mb-4", children: [
            "Visit ",
            /* @__PURE__ */ jsx25("span", { className: "font-mono bg-gray-100 px-2 py-1 rounded", children: "/hello" }),
            " in your browser"
          ] }),
          /* @__PURE__ */ jsx25("div", { className: "bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border-2 border-indigo-200", children: /* @__PURE__ */ jsx25("h1", { className: "text-4xl font-bold text-gray-900", children: "Hello, World! \u{1F44B}" }) }),
          /* @__PURE__ */ jsx25("div", { className: "mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded", children: /* @__PURE__ */ jsx25("p", { className: "text-green-800 font-semibold", children: "\u2705 That's it! No routing configuration needed." }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx25("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs3("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx25("h2", { className: "text-4xl font-bold text-gray-900 mb-12 text-center", children: "Additional Resources" }),
      /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs3(
          "a",
          {
            href: "https://github.com/Rohitsharma6377/IND",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2",
            children: [
              /* @__PURE__ */ jsx25("div", { className: "text-4xl mb-4", children: "\u{1F4DA}" }),
              /* @__PURE__ */ jsx25("h3", { className: "text-2xl font-bold mb-3", children: "GitHub Repository" }),
              /* @__PURE__ */ jsx25("p", { className: "text-gray-300", children: "View source code, report issues, and contribute" })
            ]
          }
        ),
        /* @__PURE__ */ jsx25(Link, { href: "/examples", children: /* @__PURE__ */ jsxs3("div", { className: "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer", children: [
          /* @__PURE__ */ jsx25("div", { className: "text-4xl mb-4", children: "\u{1F4A1}" }),
          /* @__PURE__ */ jsx25("h3", { className: "text-2xl font-bold mb-3", children: "Examples" }),
          /* @__PURE__ */ jsx25("p", { className: "text-indigo-100", children: "Explore real-world examples and templates" })
        ] }) }),
        /* @__PURE__ */ jsxs3("div", { className: "bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer", children: [
          /* @__PURE__ */ jsx25("div", { className: "text-4xl mb-4", children: "\u{1F4AC}" }),
          /* @__PURE__ */ jsx25("h3", { className: "text-2xl font-bold mb-3", children: "Community" }),
          /* @__PURE__ */ jsx25("p", { className: "text-green-100", children: "Join discussions and get help from the community" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Docs as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9wbGF0Zm9ybS5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL3VuaXZlcnNhbC9yZXNvbHZlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9zdHlsZS1zaGVldC5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2xpbmsuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy92aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdGV4dC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3Njcm9sbC12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdGV4dC1pbnB1dC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2J1dHRvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5LWluZGljYXRvci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N3aXRjaC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ZsYXQtbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RvdWNoYWJsZS1vcGFjaXR5LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvcHJlc3NhYmxlLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaW1hZ2UtYmFja2dyb3VuZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL21vZGFsLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc2FmZS1hcmVhLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zdGF0dXMtYmFyLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc2VjdGlvbi1saXN0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMva2V5Ym9hcmQtYXZvaWRpbmctdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3JlZnJlc2gtY29udHJvbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RvdWNoYWJsZS1oaWdobGlnaHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtd2l0aG91dC1mZWVkYmFjay5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NjcmVlbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2NhcmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9ncmlkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pY29uLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvZGltZW5zaW9ucy5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2xpbmtpbmcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdpbmRqcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEb2NzKCkge1xyXG4gICAgY29uc3QgW2NvcGllZENvbW1hbmQsIHNldENvcGllZENvbW1hbmRdID0gdXNlU3RhdGUoJycpO1xyXG5cclxuICAgIGNvbnN0IGNvcHlUb0NsaXBib2FyZCA9ICh0ZXh0LCBpZCkgPT4ge1xyXG4gICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpO1xyXG4gICAgICAgIHNldENvcGllZENvbW1hbmQoaWQpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkQ29tbWFuZCgnJyksIDIwMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBxdWlja0xpbmtzID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiR2V0dGluZyBTdGFydGVkXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYXJuIHRoZSBiYXNpY3MgYW5kIGNyZWF0ZSB5b3VyIGZpcnN0IElOREpTIGFwcFwiLFxyXG4gICAgICAgICAgICBpY29uOiBcIlx1RDgzRFx1REU4MFwiLFxyXG4gICAgICAgICAgICBjb2xvcjogXCJmcm9tLWJsdWUtNTAwIHRvLWluZGlnby02MDBcIixcclxuICAgICAgICAgICAgdG9waWNzOiBbXCJJbnN0YWxsYXRpb25cIiwgXCJQcm9qZWN0IFN0cnVjdHVyZVwiLCBcIkZpcnN0IFBhZ2VcIiwgXCJSb3V0aW5nIEJhc2ljc1wiXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJDb3JlIENvbmNlcHRzXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVuZGVyc3RhbmQgdGhlIGZ1bmRhbWVudGFsIGNvbmNlcHRzIG9mIElOREpTXCIsXHJcbiAgICAgICAgICAgIGljb246IFwiXHVEODNEXHVEQ0RBXCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcImZyb20tcHVycGxlLTUwMCB0by1waW5rLTYwMFwiLFxyXG4gICAgICAgICAgICB0b3BpY3M6IFtcIkZpbGUtQmFzZWQgUm91dGluZ1wiLCBcIkFQSSBSb3V0ZXNcIiwgXCJEYXRhIEZldGNoaW5nXCIsIFwiTWlkZGxld2FyZVwiXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJGZWF0dXJlc1wiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJFeHBsb3JlIGFsbCB0aGUgcG93ZXJmdWwgZmVhdHVyZXMgSU5ESlMgb2ZmZXJzXCIsXHJcbiAgICAgICAgICAgIGljb246IFwiXHUyNkExXCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcImZyb20teWVsbG93LTUwMCB0by1vcmFuZ2UtNjAwXCIsXHJcbiAgICAgICAgICAgIHRvcGljczogW1wiQXV0aGVudGljYXRpb25cIiwgXCJEYXRhYmFzZVwiLCBcIlNTUlwiLCBcIlN0YXRpYyBFeHBvcnRcIl1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiRGVwbG95bWVudFwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXBsb3kgeW91ciBJTkRKUyBhcHAgdG8gcHJvZHVjdGlvblwiLFxyXG4gICAgICAgICAgICBpY29uOiBcIlx1MjYwMVx1RkUwRlwiLFxyXG4gICAgICAgICAgICBjb2xvcjogXCJmcm9tLWdyZWVuLTUwMCB0by10ZWFsLTYwMFwiLFxyXG4gICAgICAgICAgICB0b3BpY3M6IFtcIlZlcmNlbFwiLCBcIkNsb3VkZmxhcmVcIiwgXCJEb2NrZXJcIiwgXCJDdXN0b20gU2VydmVyXCJdXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYXktNTBcIj5cclxuICAgICAgICAgICAgey8qIEhlcm8gU2VjdGlvbiAqL31cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIGJnLWdyYWRpZW50LXRvLWJyIGZyb20taW5kaWdvLTYwMCB2aWEtcHVycGxlLTYwMCB0by1waW5rLTUwMCB0ZXh0LXdoaXRlIHB5LTIwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JpZC13aGl0ZS9bMC4wNV0gYmctW3NpemU6MjBweF8yMHB4XVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgcHgtNCBweS0yIGJnLXdoaXRlLzEwIGJhY2tkcm9wLWJsdXItc20gcm91bmRlZC1mdWxsIG1iLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIG1yLTJcIj5cdUQ4M0RcdURDRDY8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGRcIj5Eb2N1bWVudGF0aW9uPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNXhsIG1kOnRleHQtN3hsIGZvbnQtYmxhY2sgbWItNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGVhcm4gSU5ESlNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14bCB0ZXh0LWluZGlnby0xMDAgbWF4LXctM3hsIG14LWF1dG8gbWItOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXZlcnl0aGluZyB5b3UgbmVlZCB0byBrbm93IHRvIGJ1aWxkIGFtYXppbmcgYXBwbGljYXRpb25zIHdpdGggSU5ESlNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUvMTAgYmFja2Ryb3AtYmx1ci1zbSBweC00IHB5LTIgcm91bmRlZC1sZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGRvY3VtZW50YXRpb24uLi5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy10cmFuc3BhcmVudCBib3JkZXItbm9uZSBvdXRsaW5lLW5vbmUgdGV4dC13aGl0ZSBwbGFjZWhvbGRlci1pbmRpZ28tMjAwIHctNjRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tMjAwXCI+XHVEODNEXHVERDBEPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIHsvKiBRdWljayBTdGFydCAqL31cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHNoYWRvdy14bCBwLTggbWQ6cC0xMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItOFwiPlF1aWNrIFN0YXJ0PC9oMj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogU3RlcCAxICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHctMTIgaC0xMiBiZy1ncmFkaWVudC10by1iciBmcm9tLWluZGlnby01MDAgdG8tcHVycGxlLTYwMCByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQteGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0zXCI+SW5zdGFsbCBJTkRKUzwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgbWItNFwiPkNyZWF0ZSBhIG5ldyBJTkRKUyBwcm9qZWN0IHdpdGggYSBzaW5nbGUgY29tbWFuZDo8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS05MDAgcm91bmRlZC14bCBwLTQgZm9udC1tb25vIHRleHQtc21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+VGVybWluYWw8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBjb3B5VG9DbGlwYm9hcmQoJ25weCBpbmRqc0BsYXRlc3QgY3JlYXRlIG15LWFwcCcsICdjbWQxJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkQ29tbWFuZCA9PT0gJ2NtZDEnID8gJ1x1MjcwNSBDb3BpZWQhJyA6ICdcdUQ4M0RcdURDQ0IgQ29weSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwXCI+JDwvc3Bhbj4gbnB4IGluZGpzQGxhdGVzdCBjcmVhdGUgbXktYXBwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogU3RlcCAyICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHctMTIgaC0xMiBiZy1ncmFkaWVudC10by1iciBmcm9tLXB1cnBsZS01MDAgdG8tcGluay02MDAgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LXhsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItM1wiPk5hdmlnYXRlIHRvIFlvdXIgUHJvamVjdDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS05MDAgcm91bmRlZC14bCBwLTQgZm9udC1tb25vIHRleHQtc21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+VGVybWluYWw8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBjb3B5VG9DbGlwYm9hcmQoJ2NkIG15LWFwcCcsICdjbWQyJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkQ29tbWFuZCA9PT0gJ2NtZDInID8gJ1x1MjcwNSBDb3BpZWQhJyA6ICdcdUQ4M0RcdURDQ0IgQ29weSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwXCI+JDwvc3Bhbj4gY2QgbXktYXBwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogU3RlcCAzICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHctMTIgaC0xMiBiZy1ncmFkaWVudC10by1iciBmcm9tLXBpbmstNTAwIHRvLXJlZC02MDAgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LXhsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItM1wiPlN0YXJ0IERldmVsb3BtZW50IFNlcnZlcjwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS05MDAgcm91bmRlZC14bCBwLTQgZm9udC1tb25vIHRleHQtc21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+VGVybWluYWw8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBjb3B5VG9DbGlwYm9hcmQoJ25wbSBydW4gZGV2JywgJ2NtZDMnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb3BpZWRDb21tYW5kID09PSAnY21kMycgPyAnXHUyNzA1IENvcGllZCEnIDogJ1x1RDgzRFx1RENDQiBDb3B5J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWdyZWVuLTQwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDBcIj4kPC9zcGFuPiBucG0gcnVuIGRldlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIG10LTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wZW4gPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGJnLWdyYXktMTAwIHB4LTIgcHktMSByb3VuZGVkXCI+aHR0cDovL2xvY2FsaG9zdDozMDAwPC9zcGFuPiBpbiB5b3VyIGJyb3dzZXIgXHVEODNDXHVERjg5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICB7LyogRG9jdW1lbnRhdGlvbiBTZWN0aW9ucyAqL31cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjAgYmctd2hpdGVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItMTIgdGV4dC1jZW50ZXJcIj5Eb2N1bWVudGF0aW9uIFNlY3Rpb25zPC9oMj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtxdWlja0xpbmtzLm1hcCgoc2VjdGlvbiwgaWR4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpZHh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LTJ4bCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOi10cmFuc2xhdGUteS0yIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLWdyYXktMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGgtMiBiZy1ncmFkaWVudC10by1yICR7c2VjdGlvbi5jb2xvcn1gfT48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtNXhsIG1iLTRcIj57c2VjdGlvbi5pY29ufTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItM1wiPntzZWN0aW9uLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgbWItNlwiPntzZWN0aW9uLmRlc2NyaXB0aW9ufTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NlY3Rpb24udG9waWNzLm1hcCgodG9waWMsIHRvcGljSWR4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17dG9waWNJZHh9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHRleHQtZ3JheS03MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tNjAwIG1yLTJcIj5cdTIxOTI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0b3BpY31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgey8qIENvZGUgRXhhbXBsZSAqL31cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjAgYmctZ3JheS01MFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTRcIj5Zb3VyIEZpcnN0IFBhZ2U8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtZ3JheS02MDBcIj5DcmVhdGUgYSBuZXcgcGFnZSBpbiBzZWNvbmRzPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTIgZ2FwLThcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIHAtOCBzaGFkb3ctbGdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTRcIj4xLiBDcmVhdGUgYSBGaWxlPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgbWItNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZSA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gYmctZ3JheS0xMDAgcHgtMiBweS0xIHJvdW5kZWRcIj5wYWdlcy9oZWxsby5qc3g8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktOTAwIHJvdW5kZWQteGwgcC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0zIGgtMyByb3VuZGVkLWZ1bGwgYmctcmVkLTUwMFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLXllbGxvdy01MDBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1ncmVlbi01MDBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWwtYXV0byB0ZXh0LWdyYXktNDAwIHRleHQtc21cIj5wYWdlcy9oZWxsby5qc3g8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS0zMDAgb3ZlcmZsb3cteC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPntgaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhlbGxvKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMTBcIj5cclxuICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtYm9sZFwiPlxyXG4gICAgICAgIEhlbGxvLCBXb3JsZCEgXHVEODNEXHVEQzRCXHJcbiAgICAgIDwvaDE+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59YH08L2NvZGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wcmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgcC04IHNoYWRvdy1sZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItNFwiPjIuIEFjY2VzcyBZb3VyIFBhZ2U8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMCBtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmlzaXQgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGJnLWdyYXktMTAwIHB4LTIgcHktMSByb3VuZGVkXCI+L2hlbGxvPC9zcGFuPiBpbiB5b3VyIGJyb3dzZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tNTAgdG8tcHVycGxlLTUwIHJvdW5kZWQteGwgcC04IGJvcmRlci0yIGJvcmRlci1pbmRpZ28tMjAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+SGVsbG8sIFdvcmxkISBcdUQ4M0RcdURDNEI8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTYgcC00IGJnLWdyZWVuLTUwIGJvcmRlci1sLTQgYm9yZGVyLWdyZWVuLTUwMCByb3VuZGVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi04MDAgZm9udC1zZW1pYm9sZFwiPlx1MjcwNSBUaGF0J3MgaXQhIE5vIHJvdXRpbmcgY29uZmlndXJhdGlvbiBuZWVkZWQuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIHsvKiBSZXNvdXJjZXMgKi99XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInB5LTIwIGJnLXdoaXRlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTEyIHRleHQtY2VudGVyXCI+QWRkaXRpb25hbCBSZXNvdXJjZXM8L2gyPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLThcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vUm9oaXRzaGFybWE2Mzc3L0lORFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLWdyYXktOTAwIHRvLWdyYXktODAwIHRleHQtd2hpdGUgcm91bmRlZC14bCBwLTggaG92ZXI6c2hhZG93LTJ4bCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOi10cmFuc2xhdGUteS0yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBtYi00XCI+XHVEODNEXHVEQ0RBPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIG1iLTNcIj5HaXRIdWIgUmVwb3NpdG9yeTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktMzAwXCI+VmlldyBzb3VyY2UgY29kZSwgcmVwb3J0IGlzc3VlcywgYW5kIGNvbnRyaWJ1dGU8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvZXhhbXBsZXNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tNjAwIHRvLXB1cnBsZS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHAtOCBob3ZlcjpzaGFkb3ctMnhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCB0cmFuc2Zvcm0gaG92ZXI6LXRyYW5zbGF0ZS15LTIgY3Vyc29yLXBvaW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtNHhsIG1iLTRcIj5cdUQ4M0RcdURDQTE8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIG1iLTNcIj5FeGFtcGxlczwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tMTAwXCI+RXhwbG9yZSByZWFsLXdvcmxkIGV4YW1wbGVzIGFuZCB0ZW1wbGF0ZXM8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLWdyZWVuLTUwMCB0by10ZWFsLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcC04IGhvdmVyOnNoYWRvdy0yeGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRyYW5zZm9ybSBob3ZlcjotdHJhbnNsYXRlLXktMiBjdXJzb3ItcG9pbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBtYi00XCI+XHVEODNEXHVEQ0FDPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIG1iLTNcIj5Db21tdW5pdHk8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi0xMDBcIj5Kb2luIGRpc2N1c3Npb25zIGFuZCBnZXQgaGVscCBmcm9tIHRoZSBjb21tdW5pdHk8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuIiwgIi8qKlxuICogUGxhdGZvcm0gZGV0ZWN0aW9uIHV0aWxpdGllcyBmb3IgSU5ESlNcbiAqXG4gKiBVc2FnZTpcbiAqIGltcG9ydCB7IGlzV2ViLCBpc0Rlc2t0b3AsIGlzTW9iaWxlLCBpc0FuZHJvaWQsIGlzSU9TLCBwbGF0Zm9ybSB9IGZyb20gJ2luZGpzJztcbiAqXG4gKiBpZiAoaXNNb2JpbGUpIHsgLi4uIH1cbiAqL1xuXG4vLyBDaGVjayBpZiBydW5uaW5nIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudFxuY29uc3QgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIjtcblxuLy8gRWxlY3Ryb24gZGV0ZWN0aW9uIChyZW5kZXJlciBwcm9jZXNzKVxuZXhwb3J0IGNvbnN0IGlzRGVza3RvcCA9XG4gIGlzQnJvd3NlciAmJlxuICAod2luZG93LnByb2Nlc3M/LnR5cGUgPT09IFwicmVuZGVyZXJcIiB8fFxuICAgICEhd2luZG93LmVsZWN0cm9uIHx8XG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkVsZWN0cm9uXCIpKTtcblxuLy8gQ2FwYWNpdG9yIGRldGVjdGlvblxuZXhwb3J0IGNvbnN0IGlzTW9iaWxlID1cbiAgaXNCcm93c2VyICYmXG4gICghIXdpbmRvdy5DYXBhY2l0b3IgfHxcbiAgICAhIXdpbmRvdy5hbmRyb2lkQnJpZGdlIHx8XG4gICAgISF3aW5kb3cud2Via2l0Py5tZXNzYWdlSGFuZGxlcnM/LmJyaWRnZSB8fFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJDYXBhY2l0b3JcIikpO1xuXG4vLyBTcGVjaWZpYyBtb2JpbGUgcGxhdGZvcm1zXG5leHBvcnQgY29uc3QgaXNBbmRyb2lkID0gaXNNb2JpbGUgJiYgL2FuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuZXhwb3J0IGNvbnN0IGlzSU9TID0gaXNNb2JpbGUgJiYgL2lwaG9uZXxpcGFkfGlwb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vLyBXZWIgZmFsbGJhY2sgKGlmIG5vdCBkZXNrdG9wIG9yIG1vYmlsZSBhcHApXG5leHBvcnQgY29uc3QgaXNXZWIgPSAhaXNEZXNrdG9wICYmICFpc01vYmlsZTtcblxuLy8gR2V0IGN1cnJlbnQgcGxhdGZvcm0gbmFtZVxuZXhwb3J0IGNvbnN0IHBsYXRmb3JtID0gKCgpID0+IHtcbiAgaWYgKGlzRGVza3RvcCkgcmV0dXJuIFwiZGVza3RvcFwiO1xuICBpZiAoaXNBbmRyb2lkKSByZXR1cm4gXCJhbmRyb2lkXCI7XG4gIGlmIChpc0lPUykgcmV0dXJuIFwiaW9zXCI7XG4gIGlmIChpc01vYmlsZSkgcmV0dXJuIFwibW9iaWxlXCI7IC8vIGZhbGxiYWNrXG4gIHJldHVybiBcIndlYlwiO1xufSkoKTtcblxuLy8gUmVhY3QgTmF0aXZlIGNvbXBhdGlibGUgQVBJXG5leHBvcnQgY29uc3QgT1MgPSBwbGF0Zm9ybTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IChvYmopID0+IHtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShPUykpIHJldHVybiBvYmpbT1NdO1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KFwibmF0aXZlXCIpICYmIGlzTW9iaWxlKSByZXR1cm4gb2JqW1wibmF0aXZlXCJdO1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KFwiZGVmYXVsdFwiKSkgcmV0dXJuIG9ialtcImRlZmF1bHRcIl07XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzV2ViLFxuICBpc0Rlc2t0b3AsXG4gIGlzTW9iaWxlLFxuICBpc0FuZHJvaWQsXG4gIGlzSU9TLFxuICBwbGF0Zm9ybSxcbiAgT1MsXG4gIHNlbGVjdCxcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgSW1hZ2UgPSBmb3J3YXJkUmVmKCh7IHN0eWxlLCBzb3VyY2UsIHNyYywgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJpbWFnZVwiKTtcblxuICAvLyBSZWFjdCBOYXRpdmUgdXNlcyAnc291cmNlJywgV2ViIHVzZXMgJ3NyYycuXG4gIC8vIFdlIHN1cHBvcnQgYm90aCBwcm9wcyBmb3IgdW5pdmVyc2FsIHVzYWdlLlxuICBjb25zdCBpbWFnZVNvdXJjZSA9IHNyYyB8fCAoc291cmNlICYmIHNvdXJjZS51cmkpIHx8IFwiXCI7XG5cbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgLi4ucmVzdCxcbiAgICBzcmM6IGltYWdlU291cmNlLFxuICAgIHJlZixcbiAgfTtcblxuICBpZiAoQ29tcG9uZW50ICE9PSBcImltZ1wiICYmIENvbXBvbmVudCAhPT0gXCJpbWFnZVwiKSB7XG4gICAgLy8gSWYgaXQgcmVmZXJzIHRvIFJlYWN0IE5hdGl2ZSBJbWFnZSwgaXQgZXhwZWN0cyAnc291cmNlJ1xuICAgIHByb3BzLnNvdXJjZSA9IHNvdXJjZSB8fCB7IHVyaTogc3JjIH07XG4gICAgZGVsZXRlIHByb3BzLnNyYztcbiAgfVxuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gPENvbXBvbmVudCBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucHJvcHN9IC8+O1xufSk7XG5cbkltYWdlLmRpc3BsYXlOYW1lID0gXCJJbWFnZVwiO1xuZXhwb3J0IGRlZmF1bHQgSW1hZ2U7XG4iLCAiZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVFbGVtZW50KHR5cGUpIHtcbiAgY29uc3QgcGxhdGZvcm0gPSB0eXBlb2YgUExBVEZPUk0gIT09IFwidW5kZWZpbmVkXCIgPyBQTEFURk9STSA6IFwid2ViXCI7XG5cbiAgaWYgKHBsYXRmb3JtID09PSBcIndlYlwiKSB7XG4gICAgY29uc3Qgd2ViTWFwID0ge1xuICAgICAgdmlldzogXCJkaXZcIixcbiAgICAgIHRleHQ6IFwic3BhblwiLFxuICAgICAgaW1hZ2U6IFwiaW1nXCIsXG4gICAgICBpbWFnZWJhY2tncm91bmQ6IFwiZGl2XCIsIC8vIG1hcCBpbWFnZS1iYWNrZ3JvdW5kIHRvIGRpdiB3aXRoIHN0eWxlXG4gICAgICBzY3JvbGx2aWV3OiBcImRpdlwiLFxuICAgICAgZmxhdGxpc3Q6IFwiZGl2XCIsXG4gICAgICBzZWN0aW9ubGlzdDogXCJkaXZcIixcbiAgICAgIGtleWJvYXJkYXZvaWRpbmd2aWV3OiBcImRpdlwiLFxuICAgICAgc2FmZWFyZWF2aWV3OiBcImRpdlwiLFxuICAgICAgcHJlc3NhYmxlOiBcImJ1dHRvblwiLFxuICAgICAgdG91Y2hhYmxlb3BhY2l0eTogXCJidXR0b25cIixcbiAgICAgIHRvdWNoYWJsZWhpZ2hsaWdodDogXCJidXR0b25cIixcbiAgICAgIHN3aXRjaDogXCJpbnB1dFwiLCAvLyB0eXBlPSdjaGVja2JveCdcbiAgICAgIHRleHRhcmVhOiBcInRleHRhcmVhXCIsXG4gICAgICBidXR0b246IFwiYnV0dG9uXCIsXG4gICAgICBtb2RhbDogXCJkaXZcIixcbiAgICAgIGFjdGl2aXR5aW5kaWNhdG9yOiBcImRpdlwiLFxuICAgICAgcmVmcmVzaGNvbnRyb2w6IFwiZGl2XCIsXG4gICAgfTtcbiAgICByZXR1cm4gd2ViTWFwW3R5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tL2csIFwiXCIpXSB8fCBcImRpdlwiO1xuICB9XG5cbiAgaWYgKHBsYXRmb3JtID09PSBcIm1vYmlsZVwiKSB7XG4gICAgLy8gSW4gUmVhY3QgTmF0aXZlLCBjb21wb25lbnRzIGFyZSBDYW1lbENhc2VcbiAgICAvLyBXZSBuZWVkIHRvIG1hcCBnZW5lcmljIG5hbWVzIHRvIFJOIG5hbWVzXG4gICAgY29uc3QgbW9iaWxlTWFwID0ge1xuICAgICAgdmlldzogXCJWaWV3XCIsXG4gICAgICB0ZXh0OiBcIlRleHRcIixcbiAgICAgIGltYWdlOiBcIkltYWdlXCIsXG4gICAgICBpbWFnZWJhY2tncm91bmQ6IFwiSW1hZ2VCYWNrZ3JvdW5kXCIsXG4gICAgICBzY3JvbGx2aWV3OiBcIlNjcm9sbFZpZXdcIixcbiAgICAgIGZsYXRsaXN0OiBcIkZsYXRMaXN0XCIsXG4gICAgICBzZWN0aW9ubGlzdDogXCJTZWN0aW9uTGlzdFwiLFxuICAgICAga2V5Ym9hcmRhdm9pZGluZ3ZpZXc6IFwiS2V5Ym9hcmRBdm9pZGluZ1ZpZXdcIixcbiAgICAgIHNhZmVhcmVhdmlldzogXCJTYWZlQXJlYVZpZXdcIixcbiAgICAgIHByZXNzYWJsZTogXCJQcmVzc2FibGVcIixcbiAgICAgIHRvdWNoYWJsZW9wYWNpdHk6IFwiVG91Y2hhYmxlT3BhY2l0eVwiLFxuICAgICAgdG91Y2hhYmxlaGlnaGxpZ2h0OiBcIlRvdWNoYWJsZUhpZ2hsaWdodFwiLFxuICAgICAgc3dpdGNoOiBcIlN3aXRjaFwiLFxuICAgICAgbW9kYWw6IFwiTW9kYWxcIixcbiAgICAgIGFjdGl2aXR5aW5kaWNhdG9yOiBcIkFjdGl2aXR5SW5kaWNhdG9yXCIsXG4gICAgICByZWZyZXNoY29udHJvbDogXCJSZWZyZXNoQ29udHJvbFwiLFxuICAgICAgYnV0dG9uOiBcIkJ1dHRvblwiLFxuICAgIH07XG4gICAgY29uc3Qgcm5OYW1lID1cbiAgICAgIG1vYmlsZU1hcFt0eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIlwiKV0gfHwgY2FwaXRhbGl6ZSh0eXBlKTtcblxuICAgIC8vIFNhZmV0eSBjaGVjayBmb3IgUmVhY3QgTmF0aXZlIGVudmlyb25tZW50XG4gICAgLy8gcmVhY3QtbmF0aXZlLXdlYiBtaWdodCBiZSBhbGlhc2VkLCBvciB3ZSBtaWdodCBiZSBpbiBhIHJlYWwgUk4gZW52aXJvbm1lbnRcbiAgICB0cnkge1xuICAgICAgLy8gVXNpbmcgZ2xvYmFsIGNoZWNrIG9yIHNhZmUgcmVxdWlyZVxuICAgICAgaWYgKHR5cGVvZiByZXF1aXJlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKFwicmVhY3QtbmF0aXZlXCIpW3JuTmFtZV07XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHdpbmRvdy5SZWFjdCAmJlxuICAgICAgICB3aW5kb3cuUmVhY3QuTmF0aXZlXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5SZWFjdC5OYXRpdmVbcm5OYW1lXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFJlYWN0IE5hdGl2ZSBjb21wb25lbnQgJHtybk5hbWV9IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgICAvLyBGYWxsYmFjayB0byBWaWV3IG9yIGRpdiBkZXBlbmRpbmcgb24gY29udGV4dCwgYnV0IFZpZXcgaXMgc2FmZSBlbm91Z2ggZm9yIGxvZ2ljYWwgcmV0dXJuIGlmIG1vY2tlZFxuICAgIHJldHVybiBcIlZpZXdcIjtcbiAgfVxuXG4gIHJldHVybiBcImRpdlwiO1xufVxuIiwgIi8vIE1vY2sgU3R5bGVTaGVldCBmb3IgY29tcGF0aWJpbGl0eS5cbi8vIEluIElOREpTIHdlYiwgd2UgdXN1YWxseSB1c2Ugc3RhbmRhcmQgc3R5bGUgb2JqZWN0cyBvciBDU1MuXG4vLyBUaGlzIGFsbG93cyBTdHlsZVNoZWV0LmNyZWF0ZSh7fSkgdG8gcmV0dXJuIHRoZSBvYmplY3RzIGFzLWlzLlxuXG5leHBvcnQgY29uc3QgU3R5bGVTaGVldCA9IHtcbiAgY3JlYXRlOiAoc3R5bGVzKSA9PiBzdHlsZXMsXG4gIGZsYXR0ZW46IChzdHlsZXMpID0+IHtcbiAgICBpZiAoIXN0eWxlcykgcmV0dXJuIHt9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN0eWxlcykpIHtcbiAgICAgIHJldHVybiBzdHlsZXNcbiAgICAgICAgLmZsYXQoSW5maW5pdHkpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gKGl0ZW0gPyB7IC4uLmFjYywgLi4uaXRlbSB9IDogYWNjKSwge30pO1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9LFxuICBoYWlybGluZVdpZHRoOiAxLFxuICBhYnNvbHV0ZUZpbGw6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIGJvdHRvbTogMCxcbiAgfSxcbiAgYWJzb2x1dGVGaWxsT2JqZWN0OiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIHRvcDogMCxcbiAgICBib3R0b206IDAsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdHlsZVNoZWV0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuLy8gSU5ESlMgTGluayBjb21wb25lbnQgLSBsaWdodHdlaWdodCBjbGllbnQtc2lkZSBuYXZpZ2F0aW9uIGhlbHBlclxuLy8gUGVyZm9ybXMgU1BBLWxpa2UgbmF2aWdhdGlvbiBmb3Igc2FtZS1vcmlnaW4gaW50ZXJuYWwgbGlua3MuXG4vLyBQcm9wczogaHJlZiwgcHJlZmV0Y2gsIHJlcGxhY2UsIHNjcm9sbCAoZGVmYXVsdCB0cnVlKSwgb25DbGljaywgdGFyZ2V0LCByZWwsIGNsYXNzTmFtZSwgc3R5bGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpbmsoe1xuICBocmVmLFxuICBjaGlsZHJlbixcbiAgcHJlZmV0Y2ggPSBmYWxzZSxcbiAgcmVwbGFjZSA9IGZhbHNlLFxuICBzY3JvbGwgPSB0cnVlLFxuICBvbkNsaWNrLFxuICBjbGFzc05hbWUsXG4gIHN0eWxlLFxuICB0YXJnZXQsXG4gIHJlbCxcbiAgLi4ucmVzdFxufSkge1xuICAvLyBCYXNpYyBwcmVmZXRjaDogaGludCB0aGUgYnJvd3NlciB2aWEgPGxpbmsgcmVsPVwicHJlZmV0Y2hcIj5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXByZWZldGNoIHx8ICFocmVmKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgICAgIGwucmVsID0gXCJwcmVmZXRjaFwiO1xuICAgICAgbC5ocmVmID0gaHJlZjtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQobCk7XG4gICAgICAgIH0gY2F0Y2gge31cbiAgICAgIH07XG4gICAgfSBjYXRjaCB7fVxuICB9LCBbaHJlZiwgcHJlZmV0Y2hdKTtcblxuICBjb25zdCBoYW5kbGVDbGljayA9IChlKSA9PiB7XG4gICAgaWYgKG9uQ2xpY2spIG9uQ2xpY2soZSk7XG4gICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuICAgIC8vIE9ubHkgaW50ZXJjZXB0IHNpbXBsZSBsZWZ0LWNsaWNrcyB3aXRob3V0IG1vZGlmaWVyIGtleXNcbiAgICBpZiAoZS5idXR0b24gIT09IDAgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5KVxuICAgICAgcmV0dXJuO1xuICAgIGlmICghaHJlZikgcmV0dXJuO1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBcIl9zZWxmXCIpIHJldHVybjtcbiAgICBsZXQgdXJsO1xuICAgIHRyeSB7XG4gICAgICB1cmwgPSBuZXcgVVJMKGhyZWYsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSW52YWxpZCBVUkwsIGxldCBicm93c2VyIGhhbmRsZVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBTa2lwIG5vbi1odHRwKHMpIHByb3RvY29scyBhbmQgc3BlY2lhbCBzY2hlbWVzXG4gICAgY29uc3QgcHJvdG8gPSB1cmwucHJvdG9jb2w7XG4gICAgaWYgKHByb3RvICYmIHByb3RvICE9PSBcImh0dHA6XCIgJiYgcHJvdG8gIT09IFwiaHR0cHM6XCIpIHJldHVybjtcbiAgICAvLyBFeHRlcm5hbFxuICAgIGlmICh1cmwub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSByZXR1cm47XG4gICAgLy8gUmVzcGVjdCBkb3dubG9hZCBsaW5rc1xuICAgIGlmIChyZXN0LmRvd25sb2FkKSByZXR1cm47XG4gICAgLy8gSGFzaC1vbmx5IG5hdmlnYXRpb24gb3B0aW1pemF0aW9uXG4gICAgY29uc3QgY3VycmVudCA9XG4gICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgY29uc3QgbmV4dCA9IHVybC5wYXRobmFtZSArIHVybC5zZWFyY2ggKyB1cmwuaGFzaDtcbiAgICBpZiAobmV4dCA9PT0gY3VycmVudCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHNjcm9sbCkge1xuICAgICAgICBpZiAodXJsLmhhc2gpIHtcbiAgICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHVybC5oYXNoLnNsaWNlKDEpKTtcbiAgICAgICAgICBpZiAoZWwpIGVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgICAgZWxzZSB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBEbyBwdXNoL3JlcGxhY2Ugc3RhdGVcbiAgICBpZiAocmVwbGFjZSkgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcbiAgICBlbHNlIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XG4gICAgLy8gRW1pdCBhIGN1c3RvbSBuYXZpZ2F0aW9uIGV2ZW50IHNvIHRoZSBhcHAgY2FuIGxvYWQgdGhlIHRhcmdldCBtb2R1bGVcbiAgICB0cnkge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChcImluZDpuYXZpZ2F0ZVwiLCB7IGRldGFpbDogeyBocmVmOiBuZXh0IH0gfSksXG4gICAgICApO1xuICAgIH0gY2F0Y2gge31cbiAgICAvLyBTY3JvbGwgYmVoYXZpb3JcbiAgICBpZiAoc2Nyb2xsKSB7XG4gICAgICBpZiAodXJsLmhhc2gpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1cmwuaGFzaC5zbGljZSgxKSk7XG4gICAgICAgIGlmIChlbCkgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgZWxzZSB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbEZpbmFsID1cbiAgICB0YXJnZXQgPT09IFwiX2JsYW5rXCJcbiAgICAgID8gW3JlbCwgXCJub29wZW5lclwiLCBcIm5vcmVmZXJyZXJcIl0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpXG4gICAgICA6IHJlbDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgXCJhXCIsXG4gICAge1xuICAgICAgaHJlZixcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHN0eWxlLFxuICAgICAgdGFyZ2V0LFxuICAgICAgcmVsOiByZWxGaW5hbCxcbiAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrLFxuICAgICAgLi4ucmVzdCxcbiAgICB9LFxuICAgIGNoaWxkcmVuLFxuICApO1xufVxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInZpZXdcIik7XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5WaWV3LmRpc3BsYXlOYW1lID0gXCJWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRleHQgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRleHRcIik7XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5UZXh0LmRpc3BsYXlOYW1lID0gXCJUZXh0XCI7XG5leHBvcnQgZGVmYXVsdCBUZXh0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNjcm9sbFZpZXcgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIGhvcml6b250YWwgPSBmYWxzZSxcbiAgICAgIHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvciA9IHRydWUsXG4gICAgICBzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yID0gdHJ1ZSxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzY3JvbGx2aWV3XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2tcbiAgICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICAgICAgICBvdmVyZmxvd1g6IGhvcml6b250YWwgPyBcImF1dG9cIiA6IFwiaGlkZGVuXCIsXG4gICAgICAgIG92ZXJmbG93WTogaG9yaXpvbnRhbCA/IFwiaGlkZGVuXCIgOiBcImF1dG9cIixcbiAgICAgICAgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6IFwidG91Y2hcIixcbiAgICAgICAgc2Nyb2xsYmFyV2lkdGg6IChcbiAgICAgICAgICBob3Jpem9udGFsXG4gICAgICAgICAgICA/ICFzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgICAgIDogIXNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgKVxuICAgICAgICAgID8gXCJub25lXCJcbiAgICAgICAgICA6IFwiYXV0b1wiLFxuICAgICAgICBtc092ZXJmbG93U3R5bGU6IChcbiAgICAgICAgICBob3Jpem9udGFsXG4gICAgICAgICAgICA/ICFzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgICAgIDogIXNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgKVxuICAgICAgICAgID8gXCJub25lXCJcbiAgICAgICAgICA6IFwiYXV0b1wiLFxuICAgICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbY29udGVudENvbnRhaW5lclN0eWxlXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17Y29udGFpbmVyU3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17Y29udGVudFN0eWxlfT57Y2hpbGRyZW59PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yPXtzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3J9XG4gICAgICAgIHNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3I9e3Nob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3J9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblNjcm9sbFZpZXcuZGlzcGxheU5hbWUgPSBcIlNjcm9sbFZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFNjcm9sbFZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgVGV4dElucHV0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIHZhbHVlLFxuICAgICAgZGVmYXVsdFZhbHVlLFxuICAgICAgb25DaGFuZ2VUZXh0LFxuICAgICAgb25Gb2N1cyxcbiAgICAgIG9uQmx1cixcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgc2VjdXJlVGV4dEVudHJ5ID0gZmFsc2UsXG4gICAgICBtdWx0aWxpbmUgPSBmYWxzZSxcbiAgICAgIG51bWJlck9mTGluZXMgPSA0LFxuICAgICAgZWRpdGFibGUgPSB0cnVlLFxuICAgICAgc3R5bGUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChlKSA9PiB7XG4gICAgICBpZiAob25DaGFuZ2VUZXh0KSBvbkNoYW5nZVRleHQoZS50YXJnZXQudmFsdWUpO1xuICAgIH07XG5cbiAgICBjb25zdCBjb21tb25TdHlsZSA9IHtcbiAgICAgIGFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICAgICAgb3V0bGluZTogXCJub25lXCIsXG4gICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICB9O1xuXG4gICAgaWYgKG11bHRpbGluZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgcmVhZE9ubHk9eyFlZGl0YWJsZX1cbiAgICAgICAgICByb3dzPXtudW1iZXJPZkxpbmVzfVxuICAgICAgICAgIHN0eWxlPXt7IC4uLmNvbW1vblN0eWxlLCByZXNpemU6IFwibm9uZVwiIH19XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHR5cGU9e3NlY3VyZVRleHRFbnRyeSA/IFwicGFzc3dvcmRcIiA6IFwidGV4dFwifVxuICAgICAgICBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxuICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICByZWFkT25seT17IWVkaXRhYmxlfVxuICAgICAgICBzdHlsZT17Y29tbW9uU3R5bGV9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblRleHRJbnB1dC5kaXNwbGF5TmFtZSA9IFwiVGV4dElucHV0XCI7XG5leHBvcnQgZGVmYXVsdCBUZXh0SW5wdXQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgQnV0dG9uID0gZm9yd2FyZFJlZihcbiAgKHsgdGl0bGUsIG9uUHJlc3MsIGNvbG9yLCBkaXNhYmxlZCwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7dGl0bGV9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5CdXR0b24uZGlzcGxheU5hbWUgPSBcIkJ1dHRvblwiO1xuZXhwb3J0IGRlZmF1bHQgQnV0dG9uO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEFjdGl2aXR5SW5kaWNhdG9yID0gZm9yd2FyZFJlZihcbiAgKHsgc2l6ZSA9IFwic21hbGxcIiwgY29sb3IgPSBcIiM5OTlcIiwgc3R5bGUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJhY3Rpdml0eWluZGljYXRvclwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgY29uc3Qgc3Bpbm5lclN0eWxlID0ge1xuICAgICAgICBhbmltYXRpb246IFwiaW5kanMtc3BpbiAxcyBsaW5lYXIgaW5maW5pdGVcIixcbiAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEluamVjdCBrZXlmcmFtZXMgaWYgbm90IHByZXNlbnRcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZGpzLXNwaW4tc3R5bGVcIilcbiAgICAgICkge1xuICAgICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICBzdHlsZUVsLmlkID0gXCJpbmRqcy1zcGluLXN0eWxlXCI7XG4gICAgICAgIHN0eWxlRWwuaW5uZXJIVE1MID0gYEBrZXlmcmFtZXMgaW5kanMtc3BpbiB7IDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0gMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfWA7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiA8ZGl2IHJlZj17cmVmfSBzdHlsZT17c3Bpbm5lclN0eWxlfSB7Li4ucmVzdH0gLz47XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHNpemU9e3NpemV9IGNvbG9yPXtjb2xvcn0gc3R5bGU9e3N0eWxlfSB7Li4ucmVzdH0gLz5cbiAgICApO1xuICB9LFxuKTtcblxuQWN0aXZpdHlJbmRpY2F0b3IuZGlzcGxheU5hbWUgPSBcIkFjdGl2aXR5SW5kaWNhdG9yXCI7XG5leHBvcnQgZGVmYXVsdCBBY3Rpdml0eUluZGljYXRvcjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTd2l0Y2ggPSBmb3J3YXJkUmVmKFxuICAoXG4gICAgeyB2YWx1ZSwgb25WYWx1ZUNoYW5nZSwgZGlzYWJsZWQsIHRyYWNrQ29sb3IsIHRodW1iQ29sb3IsIHN0eWxlLCAuLi5yZXN0IH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInN3aXRjaFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiaW5wdXRcIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgY2hlY2tlZD17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvblZhbHVlQ2hhbmdlICYmIG9uVmFsdWVDaGFuZ2UoZS50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIHN0eWxlPXtTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSl9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgIG9uVmFsdWVDaGFuZ2U9e29uVmFsdWVDaGFuZ2V9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgdHJhY2tDb2xvcj17dHJhY2tDb2xvcn1cbiAgICAgICAgdGh1bWJDb2xvcj17dGh1bWJDb2xvcn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblN3aXRjaC5kaXNwbGF5TmFtZSA9IFwiU3dpdGNoXCI7XG5leHBvcnQgZGVmYXVsdCBTd2l0Y2g7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU2Nyb2xsVmlldyBmcm9tIFwiLi9zY3JvbGwtdmlldy5qc3hcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBGbGF0TGlzdCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBkYXRhLFxuICAgICAgcmVuZGVySXRlbSxcbiAgICAgIGtleUV4dHJhY3RvcixcbiAgICAgIExpc3RIZWFkZXJDb21wb25lbnQsXG4gICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEVtcHR5Q29tcG9uZW50LFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgbnVtQ29sdW1ucyA9IDEsXG4gICAgICBob3Jpem9udGFsID0gZmFsc2UsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiZmxhdGxpc3RcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIC8vIFdlYiBmYWxsYmFjayBpbXBsZW1lbnRhdGlvblxuICAgICAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChMaXN0RW1wdHlDb21wb25lbnQpIHtcbiAgICAgICAgICBjb25zdCBFbXB0eSA9IFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RFbXB0eUNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICBMaXN0RW1wdHlDb21wb25lbnRcbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPExpc3RFbXB0eUNvbXBvbmVudCAvPlxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICB7RW1wdHl9XG4gICAgICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXRlbXMgPSBkYXRhIHx8IFtdO1xuICAgICAgY29uc3QgcmVuZGVyTGlzdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlFeHRyYWN0b3JcbiAgICAgICAgICAgID8ga2V5RXh0cmFjdG9yKGl0ZW0sIGluZGV4KVxuICAgICAgICAgICAgOiBpbmRleC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtrZXl9PlxuICAgICAgICAgICAgICB7cmVuZGVySXRlbSh7IGl0ZW0sIGluZGV4IH0pfVxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGZsYXRDb250ZW50U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW2NvbnRlbnRDb250YWluZXJTdHlsZV0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17ZmxhdENvbnRlbnRTdHlsZX1cbiAgICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge0xpc3RIZWFkZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIHtyZW5kZXJMaXN0KCl9XG4gICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICByZW5kZXJJdGVtPXtyZW5kZXJJdGVtfVxuICAgICAgICBrZXlFeHRyYWN0b3I9e2tleUV4dHJhY3Rvcn1cbiAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudD17TGlzdEhlYWRlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudD17TGlzdEZvb3RlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEVtcHR5Q29tcG9uZW50PXtMaXN0RW1wdHlDb21wb25lbnR9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBudW1Db2x1bW5zPXtudW1Db2x1bW5zfVxuICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkZsYXRMaXN0LmRpc3BsYXlOYW1lID0gXCJGbGF0TGlzdFwiO1xuZXhwb3J0IGRlZmF1bHQgRmxhdExpc3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVG91Y2hhYmxlT3BhY2l0eSA9IGZvcndhcmRSZWYoXG4gICh7IGNoaWxkcmVuLCBzdHlsZSwgb25QcmVzcywgYWN0aXZlT3BhY2l0eSA9IDAuMiwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRvdWNoYWJsZW9wYWNpdHlcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtTdHlsZVNoZWV0LmZsYXR0ZW4oW3sgY3Vyc29yOiBcInBvaW50ZXJcIiB9LCBzdHlsZV0pfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiAoZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBhY3RpdmVPcGFjaXR5KX1cbiAgICAgICAgICBvbk1vdXNlVXA9eyhlKSA9PiAoZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxKX1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhlKSA9PiAoZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxKX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XG4gICAgICAgIGFjdGl2ZU9wYWNpdHk9e2FjdGl2ZU9wYWNpdHl9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuVG91Y2hhYmxlT3BhY2l0eS5kaXNwbGF5TmFtZSA9IFwiVG91Y2hhYmxlT3BhY2l0eVwiO1xuZXhwb3J0IGRlZmF1bHQgVG91Y2hhYmxlT3BhY2l0eTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBQcmVzc2FibGUgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgb25QcmVzcywgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJwcmVzc2FibGVcIik7XG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW1xuICAgICAgeyBjdXJzb3I6IFwicG9pbnRlclwiIH0sXG4gICAgICB0eXBlb2Ygc3R5bGUgPT09IFwiZnVuY3Rpb25cIiA/IHN0eWxlKHsgcHJlc3NlZDogZmFsc2UgfSkgOiBzdHlsZSxcbiAgICBdKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uIHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSBvbkNsaWNrPXtvblByZXNzfSB7Li4ucmVzdH0+XG4gICAgICAgIHt0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gY2hpbGRyZW4oeyBwcmVzc2VkOiBmYWxzZSB9KVxuICAgICAgICAgIDogY2hpbGRyZW59XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzdHlsZT17c3R5bGV9IG9uUHJlc3M9e29uUHJlc3N9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5QcmVzc2FibGUuZGlzcGxheU5hbWUgPSBcIlByZXNzYWJsZVwiO1xuZXhwb3J0IGRlZmF1bHQgUHJlc3NhYmxlO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEltYWdlQmFja2dyb3VuZCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7IGNoaWxkcmVuLCBzdHlsZSwgaW1hZ2VTdHlsZSwgc291cmNlLCBzcmMsIHJlc2l6ZU1vZGUgPSBcImNvdmVyXCIsIC4uLnJlc3QgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiaW1hZ2ViYWNrZ3JvdW5kXCIpO1xuXG4gICAgY29uc3QgaW1hZ2VTb3VyY2UgPSBzcmMgfHwgKHNvdXJjZSAmJiBzb3VyY2UudXJpKSB8fCBcIlwiO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW1xuICAgICAgICB7XG4gICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpbWFnZVNvdXJjZX0pYCxcbiAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogcmVzaXplTW9kZSA9PT0gXCJzdHJldGNoXCIgPyBcIjEwMCUgMTAwJVwiIDogcmVzaXplTW9kZSxcbiAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgYmFja2dyb3VuZFJlcGVhdDogXCJuby1yZXBlYXRcIixcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGUsXG4gICAgICBdKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IHsuLi5yZXN0fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBpbWFnZVN0eWxlPXtpbWFnZVN0eWxlfVxuICAgICAgICBzb3VyY2U9e3NvdXJjZSB8fCB7IHVyaTogc3JjIH19XG4gICAgICAgIHJlc2l6ZU1vZGU9e3Jlc2l6ZU1vZGV9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuSW1hZ2VCYWNrZ3JvdW5kLmRpc3BsYXlOYW1lID0gXCJJbWFnZUJhY2tncm91bmRcIjtcbmV4cG9ydCBkZWZhdWx0IEltYWdlQmFja2dyb3VuZDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcblxuY29uc3QgTW9kYWwgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICB2aXNpYmxlLFxuICAgICAgdHJhbnNwYXJlbnQsXG4gICAgICBhbmltYXRpb25UeXBlLFxuICAgICAgb25SZXF1ZXN0Q2xvc2UsXG4gICAgICBzdHlsZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJtb2RhbFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgaWYgKCF2aXNpYmxlKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3QgbW9kYWxTdHlsZSA9IHtcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIFJlbmRlciBhcyBwb3J0YWwgaWYgcG9zc2libGVcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXttb2RhbFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG5cbiAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLmNyZWF0ZVBvcnRhbChjb250ZW50LCBkb2N1bWVudC5ib2R5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB2aXNpYmxlPXt2aXNpYmxlfVxuICAgICAgICB0cmFuc3BhcmVudD17dHJhbnNwYXJlbnR9XG4gICAgICAgIGFuaW1hdGlvblR5cGU9e2FuaW1hdGlvblR5cGV9XG4gICAgICAgIG9uUmVxdWVzdENsb3NlPXtvblJlcXVlc3RDbG9zZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5Nb2RhbC5kaXNwbGF5TmFtZSA9IFwiTW9kYWxcIjtcbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNhZmVBcmVhVmlldyA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNhZmVhcmVhdmlld1wiKTtcblxuICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IHsuLi5yZXN0fT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuU2FmZUFyZWFWaWV3LmRpc3BsYXlOYW1lID0gXCJTYWZlQXJlYVZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFNhZmVBcmVhVmlldztcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xuXG4vLyBXZWIgbW9jayBvZiBTdGF0dXNCYXIuIEluIG5hdGl2ZSBpdCB3b3VsZCBjaGFuZ2UgdGhlIGJhciBzdHlsZS5cbi8vIEluIHdlYiwgbWF5YmUgaXQgY2hhbmdlcyB0aGUgbWV0YSB0aGVtZS1jb2xvciB0YWcuXG5cbmZ1bmN0aW9uIFN0YXR1c0Jhcih7IGJhclN0eWxlID0gXCJkZWZhdWx0XCIsIGJhY2tncm91bmRDb2xvciwgaGlkZGVuID0gZmFsc2UgfSkge1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIC8vIEF0dGVtcHQgdG8gc2V0IHRoZW1lLWNvbG9yIG1ldGEgdGFnIGlmIGJhY2tncm91bmRDb2xvciBwcm92aWRlZFxuICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgIGxldCBtZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidGhlbWUtY29sb3JcIl0nKTtcbiAgICAgIGlmICghbWV0YSkge1xuICAgICAgICBtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1ldGFcIik7XG4gICAgICAgIG1ldGEubmFtZSA9IFwidGhlbWUtY29sb3JcIjtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChtZXRhKTtcbiAgICAgIH1cbiAgICAgIG1ldGEuY29udGVudCA9IGJhY2tncm91bmRDb2xvcjtcbiAgICB9XG4gIH0sIFtiYWNrZ3JvdW5kQ29sb3JdKTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHVzQmFyO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFNjcm9sbFZpZXcgZnJvbSBcIi4vc2Nyb2xsLXZpZXcuanN4XCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dC5qc3hcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTZWN0aW9uTGlzdCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBzZWN0aW9ucyxcbiAgICAgIHJlbmRlckl0ZW0sXG4gICAgICByZW5kZXJTZWN0aW9uSGVhZGVyLFxuICAgICAga2V5RXh0cmFjdG9yLFxuICAgICAgTGlzdEhlYWRlckNvbXBvbmVudCxcbiAgICAgIExpc3RGb290ZXJDb21wb25lbnQsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWQgPSB0cnVlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNlY3Rpb25saXN0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2tcbiAgICAgIGNvbnN0IHJlbmRlclNlY3Rpb25zID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gKHNlY3Rpb25zIHx8IFtdKS5tYXAoKHNlY3Rpb24sIHNlY3Rpb25JbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBzZWN0aW9uLmRhdGEgfHwgW107XG4gICAgICAgICAgY29uc3Qga2V5ID0gc2VjdGlvbi5rZXkgfHwgc2VjdGlvbkluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2tleX0+XG4gICAgICAgICAgICAgIHtyZW5kZXJTZWN0aW9uSGVhZGVyICYmIHJlbmRlclNlY3Rpb25IZWFkZXIoeyBzZWN0aW9uIH0pfVxuICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGl0ZW0sIGl0ZW1JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1LZXkgPSBrZXlFeHRyYWN0b3JcbiAgICAgICAgICAgICAgICAgID8ga2V5RXh0cmFjdG9yKGl0ZW0sIGl0ZW1JbmRleClcbiAgICAgICAgICAgICAgICAgIDogaXRlbS5rZXkgfHwgaXRlbS5pZCB8fCBrZXkgKyBcIi1cIiArIGl0ZW1JbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17aXRlbUtleX0+XG4gICAgICAgICAgICAgICAgICAgIHtyZW5kZXJJdGVtKHsgaXRlbSwgaW5kZXg6IGl0ZW1JbmRleCwgc2VjdGlvbiB9KX1cbiAgICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICB7cmVuZGVyU2VjdGlvbnMoKX1cbiAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHNlY3Rpb25zPXtzZWN0aW9uc31cbiAgICAgICAgcmVuZGVySXRlbT17cmVuZGVySXRlbX1cbiAgICAgICAgcmVuZGVyU2VjdGlvbkhlYWRlcj17cmVuZGVyU2VjdGlvbkhlYWRlcn1cbiAgICAgICAga2V5RXh0cmFjdG9yPXtrZXlFeHRyYWN0b3J9XG4gICAgICAgIExpc3RIZWFkZXJDb21wb25lbnQ9e0xpc3RIZWFkZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RGb290ZXJDb21wb25lbnQ9e0xpc3RGb290ZXJDb21wb25lbnR9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWQ9e3N0aWNreVNlY3Rpb25IZWFkZXJzRW5hYmxlZH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5TZWN0aW9uTGlzdC5kaXNwbGF5TmFtZSA9IFwiU2VjdGlvbkxpc3RcIjtcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb25MaXN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEtleWJvYXJkQXZvaWRpbmdWaWV3ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBiZWhhdmlvcixcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIGtleWJvYXJkVmVydGljYWxPZmZzZXQsXG4gICAgICBlbmFibGVkLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImtleWJvYXJkYXZvaWRpbmd2aWV3XCIpO1xuXG4gICAgLy8gT24gd2ViLCBrZXlib2FyZCBhdm9pZGluZyBpcyB1c3VhbGx5IGhhbmRsZWQgYnkgdGhlIGJyb3dzZXIgZGVmYXVsdCBiZWhhdmlvciBvciBpcyBpcnJlbGV2YW50XG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIGJlaGF2aW9yPXtiZWhhdmlvcn1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIGtleWJvYXJkVmVydGljYWxPZmZzZXQ9e2tleWJvYXJkVmVydGljYWxPZmZzZXR9XG4gICAgICAgIGVuYWJsZWQ9e2VuYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuS2V5Ym9hcmRBdm9pZGluZ1ZpZXcuZGlzcGxheU5hbWUgPSBcIktleWJvYXJkQXZvaWRpbmdWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBLZXlib2FyZEF2b2lkaW5nVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBSZWZyZXNoQ29udHJvbCA9IGZvcndhcmRSZWYoKHsgcmVmcmVzaGluZywgb25SZWZyZXNoLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInJlZnJlc2hjb250cm9sXCIpO1xuXG4gIC8vIE9uIHdlYiwgcGFzcy10aHJvdWdoIG9yIGltcGxlbWVudCBiYXNpYyB2aXN1YWw/XG4gIC8vIFVzdWFsbHkgUmVmcmVzaENvbnRyb2wgaXMgcGFzc2VkIGFzIHByb3AgdG8gU2Nyb2xsVmlldy5cbiAgLy8gSWYgdXNlZCBhcyBjb21wb25lbnQsIGl0IG1pZ2h0IHdyYXAgY29udGVudC5cblxuICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgLy8gTm8tb3AgZm9yIHdlYiB2aXN1YWwgdXN1YWxseSwgdW5sZXNzIHdlIGltcGxlbWVudCBwdWxsLXRvLXJlZnJlc2hcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudFxuICAgICAgcmVmPXtyZWZ9XG4gICAgICByZWZyZXNoaW5nPXtyZWZyZXNoaW5nfVxuICAgICAgb25SZWZyZXNoPXtvblJlZnJlc2h9XG4gICAgICB7Li4ucmVzdH1cbiAgICAvPlxuICApO1xufSk7XG5cblJlZnJlc2hDb250cm9sLmRpc3BsYXlOYW1lID0gXCJSZWZyZXNoQ29udHJvbFwiO1xuZXhwb3J0IGRlZmF1bHQgUmVmcmVzaENvbnRyb2w7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVG91Y2hhYmxlSGlnaGxpZ2h0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBvblByZXNzLFxuICAgICAgdW5kZXJsYXlDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgIGFjdGl2ZU9wYWNpdHkgPSAwLjg1LFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRvdWNoYWJsZWhpZ2hsaWdodFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3sgY3Vyc29yOiBcInBvaW50ZXJcIiB9LCBzdHlsZV0pO1xuXG4gICAgICAvLyBTaW1wbGUgd2ViIGltcGxlbWVudGF0aW9uOiBqdXN0IG9wYWNpdHksIG1pbWlja2luZyBvdmVybGF5IGlzIGhhcmRlciB3aXRob3V0IHN0YXRlXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgc3R5bGU9e2ZsYXRTdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHVuZGVybGF5Q29sb3I7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IGFjdGl2ZU9wYWNpdHk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbk1vdXNlVXA9eyhlKSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cbiAgICAgICAgICAgICAgZmxhdFN0eWxlLmJhY2tncm91bmRDb2xvciB8fCBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhlKSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cbiAgICAgICAgICAgICAgZmxhdFN0eWxlLmJhY2tncm91bmRDb2xvciB8fCBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XG4gICAgICAgIHVuZGVybGF5Q29sb3I9e3VuZGVybGF5Q29sb3J9XG4gICAgICAgIGFjdGl2ZU9wYWNpdHk9e2FjdGl2ZU9wYWNpdHl9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuVG91Y2hhYmxlSGlnaGxpZ2h0LmRpc3BsYXlOYW1lID0gXCJUb3VjaGFibGVIaWdobGlnaHRcIjtcbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZUhpZ2hsaWdodDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgY2xvbmVFbGVtZW50LCBDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2sganVzdCBhY2NlcHRzIG9uUHJlc3MgYW5kIHBhc3NlcyBpdCB0byB0aGUgY2hpbGRcbi8vIEl0IGRvZXMgbm90IGFkZCBhbnkgdmlzdWFsIGZlZWRiYWNrLlxuY29uc3QgVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrID0gKHtcbiAgY2hpbGRyZW4sXG4gIG9uUHJlc3MsXG4gIG9uUHJlc3NJbixcbiAgb25QcmVzc091dCxcbiAgZGlzYWJsZWQsXG4gIC4uLnJlc3Rcbn0pID0+IHtcbiAgY29uc3QgY2hpbGQgPSBDaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTtcblxuICByZXR1cm4gY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgb25DbGljazogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzcykgb25QcmVzcyhlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbkNsaWNrKSBjaGlsZC5wcm9wcy5vbkNsaWNrKGUpO1xuICAgIH0sXG4gICAgb25Nb3VzZURvd246IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NJbikgb25QcmVzc0luKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uTW91c2VEb3duKSBjaGlsZC5wcm9wcy5vbk1vdXNlRG93bihlKTtcbiAgICB9LFxuICAgIG9uTW91c2VVcDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc091dCkgb25QcmVzc091dChlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbk1vdXNlVXApIGNoaWxkLnByb3BzLm9uTW91c2VVcChlKTtcbiAgICB9LFxuICAgIG9uVG91Y2hTdGFydDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc0luKSBvblByZXNzSW4oZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Ub3VjaFN0YXJ0KSBjaGlsZC5wcm9wcy5vblRvdWNoU3RhcnQoZSk7XG4gICAgfSxcbiAgICBvblRvdWNoRW5kOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzT3V0KSBvblByZXNzT3V0KGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uVG91Y2hFbmQpIGNoaWxkLnByb3BzLm9uVG91Y2hFbmQoZSk7XG4gICAgfSxcbiAgICBzdHlsZToge1xuICAgICAgY3Vyc29yOiBkaXNhYmxlZCA/IFwibm90LWFsbG93ZWRcIiA6IFwicG9pbnRlclwiLFxuICAgICAgLi4uY2hpbGQucHJvcHMuc3R5bGUsXG4gICAgfSxcbiAgICAuLi5yZXN0LFxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjaztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBTY3JlZW4gQ29tcG9uZW50XHJcbiAqIEZ1bGwtaGVpZ2h0IHNjcmVlbiBjb250YWluZXIgd2l0aCBiYWNrZ3JvdW5kXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBTY3JlZW4gPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBiYWNrZ3JvdW5kID0gJ2xpZ2h0JywgY2xhc3NOYW1lID0gJycsIHN0eWxlLCAuLi5wcm9wcyB9LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5TY3JlZW4uZGlzcGxheU5hbWUgPSBcIlNjcmVlblwiO1xyXG5leHBvcnQgZGVmYXVsdCBTY3JlZW47XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBDb250YWluZXIgQ29tcG9uZW50XHJcbiAqIFJlc3BvbnNpdmUgY29udGFpbmVyIHdpdGggbWF4LXdpZHRoIGFuZCBjZW50ZXJpbmdcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IENvbnRhaW5lciA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkNvbnRhaW5lci5kaXNwbGF5TmFtZSA9IFwiQ29udGFpbmVyXCI7XHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIENhcmQgQ29tcG9uZW50XHJcbiAqIFN0eWxlZCBjYXJkIGNvbnRhaW5lciB3aXRoIHNoYWRvdyBhbmQgcm91bmRlZCBjb3JuZXJzXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBDYXJkID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuQ2FyZC5kaXNwbGF5TmFtZSA9IFwiQ2FyZFwiO1xyXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgR3JpZCBDb21wb25lbnRcclxuICogUmVzcG9uc2l2ZSBncmlkIGxheW91dCBzeXN0ZW1cclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IEdyaWQgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5HcmlkLmRpc3BsYXlOYW1lID0gXCJHcmlkXCI7XHJcbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBTdGFjayBDb21wb25lbnRcclxuICogVmVydGljYWwgb3IgaG9yaXpvbnRhbCBsYXlvdXQgd2l0aCBzcGFjaW5nXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBTdGFjayA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJyxcclxuICAgIHNwYWNpbmcgPSA0LFxyXG4gICAgYWxpZ24gPSAnc3RhcnQnLFxyXG4gICAganVzdGlmeSA9ICdzdGFydCcsXHJcbiAgICBjbGFzc05hbWUgPSAnJyxcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuU3RhY2suZGlzcGxheU5hbWUgPSBcIlN0YWNrXCI7XHJcbmV4cG9ydCBkZWZhdWx0IFN0YWNrO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dC5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgSWNvbiBDb21wb25lbnRcclxuICogRGlzcGxheXMgZW1vamkgaWNvbnMgY29uc2lzdGVudGx5IGFjcm9zcyBwbGF0Zm9ybXNcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IEljb24gPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBuYW1lLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUZXh0IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge25hbWV9XHJcbiAgICAgICAgPC9UZXh0ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuSWNvbi5kaXNwbGF5TmFtZSA9IFwiSWNvblwiO1xyXG5leHBvcnQgZGVmYXVsdCBJY29uO1xyXG4iLCAiLy8gRGltZW5zaW9ucyBBUEkgZm9yIFdlYlxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5jb25zdCBsaXN0ZW5lcnMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICBsaXN0ZW5lcnMuZW1pdChcImNoYW5nZVwiLCB7IHdpbmRvdzogZ2V0V2luZG93KCksIHNjcmVlbjogZ2V0U2NyZWVuKCkgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3coKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHNjYWxlOiAxLCBmb250U2NhbGU6IDEgfTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgc2NhbGU6IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsXG4gICAgZm9udFNjYWxlOiAxLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTY3JlZW4oKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHNjYWxlOiAxLCBmb250U2NhbGU6IDEgfTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2luZG93LnNjcmVlbi53aWR0aCxcbiAgICBoZWlnaHQ6IHdpbmRvdy5zY3JlZW4uaGVpZ2h0LFxuICAgIHNjYWxlOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLFxuICAgIGZvbnRTY2FsZTogMSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IERpbWVuc2lvbnMgPSB7XG4gIGdldDogKGRpbSkgPT4ge1xuICAgIGlmIChkaW0gPT09IFwid2luZG93XCIpIHJldHVybiBnZXRXaW5kb3coKTtcbiAgICBpZiAoZGltID09PSBcInNjcmVlblwiKSByZXR1cm4gZ2V0U2NyZWVuKCk7XG4gICAgcmV0dXJuIGdldFdpbmRvdygpO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcImNoYW5nZVwiKSB7XG4gICAgICBsaXN0ZW5lcnMub24oXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6ICgpID0+IGxpc3RlbmVycy5vZmYoXCJjaGFuZ2VcIiwgaGFuZGxlciksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyByZW1vdmU6ICgpID0+IHt9IH07XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwiY2hhbmdlXCIpIHtcbiAgICAgIGxpc3RlbmVycy5vZmYoXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGltZW5zaW9ucztcbiIsICJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRzXCI7XG5cbmNvbnN0IGV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuZXhwb3J0IGNvbnN0IExpbmtpbmcgPSB7XG4gIG9wZW5VUkw6ICh1cmwpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgd2luZG93Lm9wZW4odXJsLCBcIl9ibGFua1wiLCBcIm5vb3BlbmVyLG5vcmVmZXJyZXJcIik7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfSxcbiAgY2FuT3BlblVSTDogKHVybCkgPT4gUHJvbWlzZS5yZXNvbHZlKHRydWUpLFxuICBnZXRJbml0aWFsVVJMOiAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcInVybFwiKSB7XG4gICAgICAvLyBJbiBhIHJlYWwgd2ViIGFwcCwgd2UgbWlnaHQgbGlzdGVuIHRvIHBvcHN0YXRlIG9yIGhhc2hjaGFuZ2VcbiAgICAgIC8vIGVuc3VyaW5nIHdlIHJldHVybiBhIHN1YnNjcmlwdGlvbi1saWtlIG9iamVjdFxuICAgICAgY29uc3QgbGlzdGVuZXIgPSAoZSkgPT4gaGFuZGxlcih7IHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGxpc3RlbmVyKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBsaXN0ZW5lciksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyByZW1vdmU6ICgpID0+IHt9IH07XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgLy8gRGVwcmVjYXRlZCBpbiBSTiBidXQgZ29vZCB0byBoYXZlIHNpZ25hdHVyZVxuICB9LFxuICBzZW5kSW50ZW50OiAoYWN0aW9uLCBleHRyYXMpID0+IFByb21pc2UucmVzb2x2ZSgpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlua2luZztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQUEsT0FBT0EsV0FBUyxnQkFBZ0I7OztBQ1VoQyxJQUFNLFlBQVksT0FBTyxXQUFXO0FBRzdCLElBQU0sWUFDWCxjQUNDLE9BQU8sU0FBUyxTQUFTLGNBQ3hCLENBQUMsQ0FBQyxPQUFPLFlBQ1QsVUFBVSxVQUFVLFNBQVMsVUFBVTtBQUdwQyxJQUFNLFdBQ1gsY0FDQyxDQUFDLENBQUMsT0FBTyxhQUNSLENBQUMsQ0FBQyxPQUFPLGlCQUNULENBQUMsQ0FBQyxPQUFPLFFBQVEsaUJBQWlCLFVBQ2xDLFVBQVUsVUFBVSxTQUFTLFdBQVc7QUFHckMsSUFBTSxZQUFZLFlBQVksV0FBVyxLQUFLLFVBQVUsU0FBUztBQUNqRSxJQUFNLFFBQVEsWUFBWSxvQkFBb0IsS0FBSyxVQUFVLFNBQVM7QUFNdEUsSUFBTSxZQUFZLE1BQU07QUFDN0IsTUFBSSxVQUFXLFFBQU87QUFDdEIsTUFBSSxVQUFXLFFBQU87QUFDdEIsTUFBSSxNQUFPLFFBQU87QUFDbEIsTUFBSSxTQUFVLFFBQU87QUFDckIsU0FBTztBQUNULEdBQUc7OztBQ3pDSCxPQUFPLFNBQVMsa0JBQWtCOzs7QUNBbEMsU0FBUyxXQUFXLEtBQUs7QUFDdkIsU0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLFlBQVksSUFBSSxJQUFJLE1BQU0sQ0FBQztBQUNsRDtBQUVPLFNBQVMs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ICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJqc3hzIiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiRXZlbnRFbWl0dGVyIiwgImpzeCIsICJqc3hzIl0KfQo=
