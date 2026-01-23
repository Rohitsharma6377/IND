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
import { Fragment, jsx as jsx25, jsxs as jsxs3 } from "react/jsx-runtime";
var BookIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }),
  /* @__PURE__ */ jsx25("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })
] });
var RocketIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" }),
  /* @__PURE__ */ jsx25("path", { d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" }),
  /* @__PURE__ */ jsx25("path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" }),
  /* @__PURE__ */ jsx25("path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" })
] });
var LayersIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("polygon", { points: "12 2 2 7 12 12 22 7 12 2" }),
  /* @__PURE__ */ jsx25("polyline", { points: "2 17 12 22 22 17" }),
  /* @__PURE__ */ jsx25("polyline", { points: "2 12 12 17 22 12" })
] });
var ZapIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx25("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx25("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) });
var CloudIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx25("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx25("path", { d: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" }) });
var SearchIcon = ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ jsx25("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
] });
var CopyIcon = ({ className = "w-4 h-4" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsx25("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
] });
var CheckIcon = ({ className = "w-4 h-4" }) => /* @__PURE__ */ jsx25("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx25("polyline", { points: "20 6 9 17 4 12" }) });
var ArrowRightIcon = ({ className = "w-4 h-4" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
  /* @__PURE__ */ jsx25("polyline", { points: "12 5 19 12 12 19" })
] });
var GithubIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx25("svg", { className, fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx25("path", { fillRule: "evenodd", d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", clipRule: "evenodd" }) });
var LightbulbIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" }),
  /* @__PURE__ */ jsx25("path", { d: "M9 18h6" }),
  /* @__PURE__ */ jsx25("path", { d: "M10 22h4" })
] });
var UsersIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsxs3("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx25("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
  /* @__PURE__ */ jsx25("circle", { cx: "9", cy: "7", r: "4" }),
  /* @__PURE__ */ jsx25("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
  /* @__PURE__ */ jsx25("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
] });
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
      icon: RocketIcon,
      color: "from-blue-500 to-indigo-600",
      topics: ["Installation", "Project Structure", "First Page", "Routing Basics"]
    },
    {
      title: "Core Concepts",
      description: "Understand the fundamental concepts of INDJS",
      icon: LayersIcon,
      color: "from-purple-500 to-pink-600",
      topics: ["File-Based Routing", "API Routes", "Data Fetching", "Middleware"]
    },
    {
      title: "Features",
      description: "Explore all the powerful features INDJS offers",
      icon: ZapIcon,
      color: "from-amber-500 to-orange-600",
      topics: ["Authentication", "Database", "SSR", "Static Export"]
    },
    {
      title: "Deployment",
      description: "Deploy your INDJS app to production",
      icon: CloudIcon,
      color: "from-green-500 to-teal-600",
      topics: ["Vercel", "Cloudflare", "Docker", "Custom Server"]
    }
  ];
  return /* @__PURE__ */ jsxs3("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxs3("section", { className: "relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20", children: [
      /* @__PURE__ */ jsx25("div", { className: "absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" }),
      /* @__PURE__ */ jsx25("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx25("div", { className: "absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx25("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs3("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxs3("div", { className: "inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20", children: [
          /* @__PURE__ */ jsx25(BookIcon, { className: "w-5 h-5 mr-2" }),
          /* @__PURE__ */ jsx25("span", { className: "text-sm font-semibold", children: "Documentation" })
        ] }),
        /* @__PURE__ */ jsx25("h1", { className: "text-5xl md:text-7xl font-black mb-6", children: "Learn INDJS" }),
        /* @__PURE__ */ jsx25("p", { className: "text-xl text-indigo-100 max-w-3xl mx-auto mb-8", children: "Everything you need to know to build amazing applications with INDJS" }),
        /* @__PURE__ */ jsx25("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs3("div", { className: "flex items-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20", children: [
          /* @__PURE__ */ jsx25(
            "input",
            {
              type: "text",
              placeholder: "Search documentation...",
              className: "bg-transparent border-none outline-none text-white placeholder-indigo-200 w-64"
            }
          ),
          /* @__PURE__ */ jsx25(SearchIcon, { className: "w-5 h-5 text-indigo-200" })
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
                    className: "flex items-center gap-1 text-gray-400 hover:text-white transition-colors",
                    children: copiedCommand === "cmd1" ? /* @__PURE__ */ jsxs3(Fragment, { children: [
                      /* @__PURE__ */ jsx25(CheckIcon, { className: "w-4 h-4 text-green-400" }),
                      " Copied!"
                    ] }) : /* @__PURE__ */ jsxs3(Fragment, { children: [
                      /* @__PURE__ */ jsx25(CopyIcon, { className: "w-4 h-4" }),
                      " Copy"
                    ] })
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
                    className: "flex items-center gap-1 text-gray-400 hover:text-white transition-colors",
                    children: copiedCommand === "cmd2" ? /* @__PURE__ */ jsxs3(Fragment, { children: [
                      /* @__PURE__ */ jsx25(CheckIcon, { className: "w-4 h-4 text-green-400" }),
                      " Copied!"
                    ] }) : /* @__PURE__ */ jsxs3(Fragment, { children: [
                      /* @__PURE__ */ jsx25(CopyIcon, { className: "w-4 h-4" }),
                      " Copy"
                    ] })
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
                    className: "flex items-center gap-1 text-gray-400 hover:text-white transition-colors",
                    children: copiedCommand === "cmd3" ? /* @__PURE__ */ jsxs3(Fragment, { children: [
                      /* @__PURE__ */ jsx25(CheckIcon, { className: "w-4 h-4 text-green-400" }),
                      " Copied!"
                    ] }) : /* @__PURE__ */ jsxs3(Fragment, { children: [
                      /* @__PURE__ */ jsx25(CopyIcon, { className: "w-4 h-4" }),
                      " Copy"
                    ] })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "text-green-400", children: [
                /* @__PURE__ */ jsx25("span", { className: "text-gray-500", children: "$" }),
                " npm run dev"
              ] })
            ] }),
            /* @__PURE__ */ jsxs3("p", { className: "text-gray-600 mt-4 flex items-center gap-2", children: [
              "Open ",
              /* @__PURE__ */ jsx25("span", { className: "font-mono bg-gray-100 px-2 py-1 rounded", children: "http://localhost:3000" }),
              " in your browser",
              /* @__PURE__ */ jsx25("span", { className: "text-green-500", children: /* @__PURE__ */ jsx25(CheckIcon, { className: "w-5 h-5" }) })
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
              /* @__PURE__ */ jsx25("div", { className: `w-14 h-14 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`, children: /* @__PURE__ */ jsx25(section.icon, { className: "w-7 h-7" }) }),
              /* @__PURE__ */ jsx25("h3", { className: "text-2xl font-bold text-gray-900 mb-3", children: section.title }),
              /* @__PURE__ */ jsx25("p", { className: "text-gray-600 mb-6", children: section.description }),
              /* @__PURE__ */ jsx25("ul", { className: "space-y-2", children: section.topics.map((topic, topicIdx) => /* @__PURE__ */ jsxs3("li", { className: "flex items-center text-gray-700", children: [
                /* @__PURE__ */ jsx25(ArrowRightIcon, { className: "w-4 h-4 text-indigo-600 mr-2" }),
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
          /* @__PURE__ */ jsx25("div", { className: "bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border-2 border-indigo-200", children: /* @__PURE__ */ jsx25("h1", { className: "text-4xl font-bold text-gray-900", children: "Hello, World!" }) }),
          /* @__PURE__ */ jsxs3("div", { className: "mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded flex items-center gap-2", children: [
            /* @__PURE__ */ jsx25(CheckIcon, { className: "w-5 h-5 text-green-600" }),
            /* @__PURE__ */ jsx25("p", { className: "text-green-800 font-semibold", children: "That's it! No routing configuration needed." })
          ] })
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
              /* @__PURE__ */ jsx25("div", { className: "w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx25(GithubIcon, { className: "w-7 h-7" }) }),
              /* @__PURE__ */ jsx25("h3", { className: "text-2xl font-bold mb-3", children: "GitHub Repository" }),
              /* @__PURE__ */ jsx25("p", { className: "text-gray-300", children: "View source code, report issues, and contribute" })
            ]
          }
        ),
        /* @__PURE__ */ jsx25(Link, { href: "/examples", children: /* @__PURE__ */ jsxs3("div", { className: "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer", children: [
          /* @__PURE__ */ jsx25("div", { className: "w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx25(LightbulbIcon, { className: "w-7 h-7" }) }),
          /* @__PURE__ */ jsx25("h3", { className: "text-2xl font-bold mb-3", children: "Examples" }),
          /* @__PURE__ */ jsx25("p", { className: "text-indigo-100", children: "Explore real-world examples and templates" })
        ] }) }),
        /* @__PURE__ */ jsxs3("div", { className: "bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer", children: [
          /* @__PURE__ */ jsx25("div", { className: "w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx25(UsersIcon, { className: "w-7 h-7" }) }),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9wbGF0Zm9ybS5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL3VuaXZlcnNhbC9yZXNvbHZlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9zdHlsZS1zaGVldC5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2xpbmsuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy92aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdGV4dC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3Njcm9sbC12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdGV4dC1pbnB1dC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2J1dHRvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5LWluZGljYXRvci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N3aXRjaC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ZsYXQtbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RvdWNoYWJsZS1vcGFjaXR5LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvcHJlc3NhYmxlLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaW1hZ2UtYmFja2dyb3VuZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL21vZGFsLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc2FmZS1hcmVhLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zdGF0dXMtYmFyLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc2VjdGlvbi1saXN0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMva2V5Ym9hcmQtYXZvaWRpbmctdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3JlZnJlc2gtY29udHJvbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RvdWNoYWJsZS1oaWdobGlnaHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtd2l0aG91dC1mZWVkYmFjay5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NjcmVlbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2NhcmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9ncmlkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pY29uLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvZGltZW5zaW9ucy5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2xpbmtpbmcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdpbmRqcyc7XHJcblxyXG4vLyBTVkcgSWNvbiBDb21wb25lbnRzXHJcbmNvbnN0IEJvb2tJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTYgaC02XCIgfSkgPT4gKFxyXG4gICAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgICAgIDxwYXRoIGQ9XCJNNCAxOS41QTIuNSAyLjUgMCAwIDEgNi41IDE3SDIwXCIgLz5cclxuICAgICAgICA8cGF0aCBkPVwiTTYuNSAySDIwdjIwSDYuNUEyLjUgMi41IDAgMCAxIDQgMTkuNXYtMTVBMi41IDIuNSAwIDAgMSA2LjUgMnpcIiAvPlxyXG4gICAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBSb2NrZXRJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTYgaC02XCIgfSkgPT4gKFxyXG4gICAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgICAgIDxwYXRoIGQ9XCJNNC41IDE2LjVjLTEuNSAxLjI2LTIgNS0yIDVzMy43NC0uNSA1LTJjLjcxLS44NC43LTIuMTMtLjA5LTIuOTFhMi4xOCAyLjE4IDAgMCAwLTIuOTEtLjA5elwiIC8+XHJcbiAgICAgICAgPHBhdGggZD1cIm0xMiAxNS0zLTNhMjIgMjIgMCAwIDEgMi0zLjk1QTEyLjg4IDEyLjg4IDAgMCAxIDIyIDJjMCAyLjcyLS43OCA3LjUtNiAxMWEyMi4zNSAyMi4zNSAwIDAgMS00IDJ6XCIgLz5cclxuICAgICAgICA8cGF0aCBkPVwiTTkgMTJINHMuNTUtMy4wMyAyLTRjMS42Mi0xLjA4IDUgMCA1IDBcIiAvPlxyXG4gICAgICAgIDxwYXRoIGQ9XCJNMTIgMTV2NXMzLjAzLS41NSA0LTJjMS4wOC0xLjYyIDAtNSAwLTVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBMYXllcnNJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ3LTYgaC02XCIgfSkgPT4gKFxyXG4gICAgPHN2ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxyXG4gICAgICAgIDxwb2x5Z29uIHBvaW50cz1cIjEyIDIgMiA3IDEyIDEyIDIyIDcgMTIgMlwiIC8+XHJcbiAgICAgICAgPHBvbHlsaW5lIHBvaW50cz1cIjIgMTcgMTIgMjIgMjIgMTdcIiAvPlxyXG4gICAgICAgIDxwb2x5bGluZSBwb2ludHM9XCIyIDEyIDEyIDE3IDIyIDEyXCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgWmFwSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy02IGgtNlwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8cG9seWdvbiBwb2ludHM9XCIxMyAyIDMgMTQgMTIgMTQgMTEgMjIgMjEgMTAgMTIgMTAgMTMgMlwiIC8+XHJcbiAgICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IENsb3VkSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy02IGgtNlwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8cGF0aCBkPVwiTTE4IDEwaC0xLjI2QTggOCAwIDEgMCA5IDIwaDlhNSA1IDAgMCAwIDAtMTB6XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgU2VhcmNoSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy01IGgtNVwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiMTFcIiBjeT1cIjExXCIgcj1cIjhcIiAvPlxyXG4gICAgICAgIDxsaW5lIHgxPVwiMjFcIiB5MT1cIjIxXCIgeDI9XCIxNi42NVwiIHkyPVwiMTYuNjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBDb3B5SWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy00IGgtNFwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8cmVjdCB4PVwiOVwiIHk9XCI5XCIgd2lkdGg9XCIxM1wiIGhlaWdodD1cIjEzXCIgcng9XCIyXCIgcnk9XCIyXCIgLz5cclxuICAgICAgICA8cGF0aCBkPVwiTTUgMTVINGEyIDIgMCAwIDEtMi0yVjRhMiAyIDAgMCAxIDItMmg5YTIgMiAwIDAgMSAyIDJ2MVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IENoZWNrSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy00IGgtNFwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8cG9seWxpbmUgcG9pbnRzPVwiMjAgNiA5IDE3IDQgMTJcIiAvPlxyXG4gICAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBBcnJvd1JpZ2h0SWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy00IGgtNFwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8bGluZSB4MT1cIjVcIiB5MT1cIjEyXCIgeDI9XCIxOVwiIHkyPVwiMTJcIiAvPlxyXG4gICAgICAgIDxwb2x5bGluZSBwb2ludHM9XCIxMiA1IDE5IDEyIDEyIDE5XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgR2l0aHViSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidy02IGgtNlwiIH0pID0+IChcclxuICAgIDxzdmcgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgPHBhdGggZmlsbFJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMiAyQzYuNDc3IDIgMiA2LjQ4NCAyIDEyLjAxN2MwIDQuNDI1IDIuODY1IDguMTggNi44MzkgOS41MDQuNS4wOTIuNjgyLS4yMTcuNjgyLS40ODMgMC0uMjM3LS4wMDgtLjg2OC0uMDEzLTEuNzAzLTIuNzgyLjYwNS0zLjM2OS0xLjM0My0zLjM2OS0xLjM0My0uNDU0LTEuMTU4LTEuMTEtMS40NjYtMS4xMS0xLjQ2Ni0uOTA4LS42Mi4wNjktLjYwOC4wNjktLjYwOCAxLjAwMy4wNyAxLjUzMSAxLjAzMiAxLjUzMSAxLjAzMi44OTIgMS41MyAyLjM0MSAxLjA4OCAyLjkxLjgzMi4wOTItLjY0Ny4zNS0xLjA4OC42MzYtMS4zMzgtMi4yMi0uMjUzLTQuNTU1LTEuMTEzLTQuNTU1LTQuOTUxIDAtMS4wOTMuMzktMS45ODggMS4wMjktMi42ODgtLjEwMy0uMjUzLS40NDYtMS4yNzIuMDk4LTIuNjUgMCAwIC44NC0uMjcgMi43NSAxLjAyNkE5LjU2NCA5LjU2NCAwIDAxMTIgNi44NDRjLjg1LjAwNCAxLjcwNS4xMTUgMi41MDQuMzM3IDEuOTA5LTEuMjk2IDIuNzQ3LTEuMDI3IDIuNzQ3LTEuMDI3LjU0NiAxLjM3OS4yMDIgMi4zOTguMSAyLjY1MS42NC43IDEuMDI4IDEuNTk1IDEuMDI4IDIuNjg4IDAgMy44NDgtMi4zMzkgNC42OTUtNC41NjYgNC45NDMuMzU5LjMwOS42NzguOTIuNjc4IDEuODU1IDAgMS4zMzgtLjAxMiAyLjQxOS0uMDEyIDIuNzQ3IDAgLjI2OC4xOC41OC42ODguNDgyQTEwLjAxOSAxMC4wMTkgMCAwMDIyIDEyLjAxN0MyMiA2LjQ4NCAxNy41MjIgMiAxMiAyelwiIGNsaXBSdWxlPVwiZXZlbm9kZFwiIC8+XHJcbiAgICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IExpZ2h0YnVsYkljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNiBoLTZcIiB9KSA9PiAoXHJcbiAgICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICAgICAgPHBhdGggZD1cIk0xNSAxNGMuMi0xIC43LTEuNyAxLjUtMi41IDEtLjkgMS41LTIuMiAxLjUtMy41QTYgNiAwIDAgMCA2IDhjMCAxIC4yIDIuMiAxLjUgMy41LjcuNyAxLjMgMS41IDEuNSAyLjVcIiAvPlxyXG4gICAgICAgIDxwYXRoIGQ9XCJNOSAxOGg2XCIgLz5cclxuICAgICAgICA8cGF0aCBkPVwiTTEwIDIyaDRcIiAvPlxyXG4gICAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBVc2Vyc0ljb24gPSAoeyBjbGFzc05hbWUgPSBcInctNiBoLTZcIiB9KSA9PiAoXHJcbiAgICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XHJcbiAgICAgICAgPHBhdGggZD1cIk0xNyAyMXYtMmE0IDQgMCAwIDAtNC00SDVhNCA0IDAgMCAwLTQgNHYyXCIgLz5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiOVwiIGN5PVwiN1wiIHI9XCI0XCIgLz5cclxuICAgICAgICA8cGF0aCBkPVwiTTIzIDIxdi0yYTQgNCAwIDAgMC0zLTMuODdcIiAvPlxyXG4gICAgICAgIDxwYXRoIGQ9XCJNMTYgMy4xM2E0IDQgMCAwIDEgMCA3Ljc1XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRG9jcygpIHtcclxuICAgIGNvbnN0IFtjb3BpZWRDb21tYW5kLCBzZXRDb3BpZWRDb21tYW5kXSA9IHVzZVN0YXRlKCcnKTtcclxuXHJcbiAgICBjb25zdCBjb3B5VG9DbGlwYm9hcmQgPSAodGV4dCwgaWQpID0+IHtcclxuICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KTtcclxuICAgICAgICBzZXRDb3BpZWRDb21tYW5kKGlkKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNldENvcGllZENvbW1hbmQoJycpLCAyMDAwKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcXVpY2tMaW5rcyA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkdldHRpbmcgU3RhcnRlZFwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWFybiB0aGUgYmFzaWNzIGFuZCBjcmVhdGUgeW91ciBmaXJzdCBJTkRKUyBhcHBcIixcclxuICAgICAgICAgICAgaWNvbjogUm9ja2V0SWNvbixcclxuICAgICAgICAgICAgY29sb3I6IFwiZnJvbS1ibHVlLTUwMCB0by1pbmRpZ28tNjAwXCIsXHJcbiAgICAgICAgICAgIHRvcGljczogW1wiSW5zdGFsbGF0aW9uXCIsIFwiUHJvamVjdCBTdHJ1Y3R1cmVcIiwgXCJGaXJzdCBQYWdlXCIsIFwiUm91dGluZyBCYXNpY3NcIl1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQ29yZSBDb25jZXB0c1wiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVbmRlcnN0YW5kIHRoZSBmdW5kYW1lbnRhbCBjb25jZXB0cyBvZiBJTkRKU1wiLFxyXG4gICAgICAgICAgICBpY29uOiBMYXllcnNJY29uLFxyXG4gICAgICAgICAgICBjb2xvcjogXCJmcm9tLXB1cnBsZS01MDAgdG8tcGluay02MDBcIixcclxuICAgICAgICAgICAgdG9waWNzOiBbXCJGaWxlLUJhc2VkIFJvdXRpbmdcIiwgXCJBUEkgUm91dGVzXCIsIFwiRGF0YSBGZXRjaGluZ1wiLCBcIk1pZGRsZXdhcmVcIl1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiRmVhdHVyZXNcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRXhwbG9yZSBhbGwgdGhlIHBvd2VyZnVsIGZlYXR1cmVzIElOREpTIG9mZmVyc1wiLFxyXG4gICAgICAgICAgICBpY29uOiBaYXBJY29uLFxyXG4gICAgICAgICAgICBjb2xvcjogXCJmcm9tLWFtYmVyLTUwMCB0by1vcmFuZ2UtNjAwXCIsXHJcbiAgICAgICAgICAgIHRvcGljczogW1wiQXV0aGVudGljYXRpb25cIiwgXCJEYXRhYmFzZVwiLCBcIlNTUlwiLCBcIlN0YXRpYyBFeHBvcnRcIl1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiRGVwbG95bWVudFwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXBsb3kgeW91ciBJTkRKUyBhcHAgdG8gcHJvZHVjdGlvblwiLFxyXG4gICAgICAgICAgICBpY29uOiBDbG91ZEljb24sXHJcbiAgICAgICAgICAgIGNvbG9yOiBcImZyb20tZ3JlZW4tNTAwIHRvLXRlYWwtNjAwXCIsXHJcbiAgICAgICAgICAgIHRvcGljczogW1wiVmVyY2VsXCIsIFwiQ2xvdWRmbGFyZVwiLCBcIkRvY2tlclwiLCBcIkN1c3RvbSBTZXJ2ZXJcIl1cclxuICAgICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctZ3JheS01MFwiPlxyXG4gICAgICAgICAgICB7LyogSGVybyBTZWN0aW9uICovfVxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tNjAwIHZpYS1wdXJwbGUtNjAwIHRvLXBpbmstNTAwIHRleHQtd2hpdGUgcHktMjBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmlkLXdoaXRlL1swLjA1XSBiZy1bc2l6ZToyMHB4XzIwcHhdXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIGxlZnQtMS80IHctOTYgaC05NiBiZy13aGl0ZS8xMCByb3VuZGVkLWZ1bGwgYmx1ci0zeGxcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTAgcmlnaHQtMS80IHctOTYgaC05NiBiZy1waW5rLTMwMC8yMCByb3VuZGVkLWZ1bGwgYmx1ci0zeGxcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTQgcHktMiBiZy13aGl0ZS8xMCBiYWNrZHJvcC1ibHVyLXNtIHJvdW5kZWQtZnVsbCBtYi02IGJvcmRlciBib3JkZXItd2hpdGUvMjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb29rSWNvbiBjbGFzc05hbWU9XCJ3LTUgaC01IG1yLTJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkXCI+RG9jdW1lbnRhdGlvbjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBtZDp0ZXh0LTd4bCBmb250LWJsYWNrIG1iLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExlYXJuIElOREpTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgdGV4dC1pbmRpZ28tMTAwIG1heC13LTN4bCBteC1hdXRvIG1iLThcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV2ZXJ5dGhpbmcgeW91IG5lZWQgdG8ga25vdyB0byBidWlsZCBhbWF6aW5nIGFwcGxpY2F0aW9ucyB3aXRoIElOREpTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGJnLXdoaXRlLzEwIGJhY2tkcm9wLWJsdXItc20gcHgtNCBweS0zIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS8yMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGRvY3VtZW50YXRpb24uLi5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy10cmFuc3BhcmVudCBib3JkZXItbm9uZSBvdXRsaW5lLW5vbmUgdGV4dC13aGl0ZSBwbGFjZWhvbGRlci1pbmRpZ28tMjAwIHctNjRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlYXJjaEljb24gY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby0yMDBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIHsvKiBRdWljayBTdGFydCAqL31cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHNoYWRvdy14bCBwLTggbWQ6cC0xMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItOFwiPlF1aWNrIFN0YXJ0PC9oMj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogU3RlcCAxICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHctMTIgaC0xMiBiZy1ncmFkaWVudC10by1iciBmcm9tLWluZGlnby01MDAgdG8tcHVycGxlLTYwMCByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQteGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0zXCI+SW5zdGFsbCBJTkRKUzwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgbWItNFwiPkNyZWF0ZSBhIG5ldyBJTkRKUyBwcm9qZWN0IHdpdGggYSBzaW5nbGUgY29tbWFuZDo8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS05MDAgcm91bmRlZC14bCBwLTQgZm9udC1tb25vIHRleHQtc21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+VGVybWluYWw8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBjb3B5VG9DbGlwYm9hcmQoJ25weCBpbmRqc0BsYXRlc3QgY3JlYXRlIG15LWFwcCcsICdjbWQxJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkQ29tbWFuZCA9PT0gJ2NtZDEnID8gPD48Q2hlY2tJY29uIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1ncmVlbi00MDBcIiAvPiBDb3BpZWQhPC8+IDogPD48Q29weUljb24gY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IENvcHk8Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwXCI+JDwvc3Bhbj4gbnB4IGluZGpzQGxhdGVzdCBjcmVhdGUgbXktYXBwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogU3RlcCAyICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHctMTIgaC0xMiBiZy1ncmFkaWVudC10by1iciBmcm9tLXB1cnBsZS01MDAgdG8tcGluay02MDAgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LXhsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItM1wiPk5hdmlnYXRlIHRvIFlvdXIgUHJvamVjdDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS05MDAgcm91bmRlZC14bCBwLTQgZm9udC1tb25vIHRleHQtc21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+VGVybWluYWw8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBjb3B5VG9DbGlwYm9hcmQoJ2NkIG15LWFwcCcsICdjbWQyJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkQ29tbWFuZCA9PT0gJ2NtZDInID8gPD48Q2hlY2tJY29uIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1ncmVlbi00MDBcIiAvPiBDb3BpZWQhPC8+IDogPD48Q29weUljb24gY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IENvcHk8Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwXCI+JDwvc3Bhbj4gY2QgbXktYXBwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogU3RlcCAzICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHctMTIgaC0xMiBiZy1ncmFkaWVudC10by1iciBmcm9tLXBpbmstNTAwIHRvLXJlZC02MDAgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LXhsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItM1wiPlN0YXJ0IERldmVsb3BtZW50IFNlcnZlcjwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS05MDAgcm91bmRlZC14bCBwLTQgZm9udC1tb25vIHRleHQtc21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+VGVybWluYWw8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBjb3B5VG9DbGlwYm9hcmQoJ25wbSBydW4gZGV2JywgJ2NtZDMnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb3BpZWRDb21tYW5kID09PSAnY21kMycgPyA8PjxDaGVja0ljb24gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWdyZWVuLTQwMFwiIC8+IENvcGllZCE8Lz4gOiA8PjxDb3B5SWNvbiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4gQ29weTwvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWdyZWVuLTQwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDBcIj4kPC9zcGFuPiBucG0gcnVuIGRldlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIG10LTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wZW4gPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGJnLWdyYXktMTAwIHB4LTIgcHktMSByb3VuZGVkXCI+aHR0cDovL2xvY2FsaG9zdDozMDAwPC9zcGFuPiBpbiB5b3VyIGJyb3dzZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNTAwXCI+PENoZWNrSWNvbiBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICB7LyogRG9jdW1lbnRhdGlvbiBTZWN0aW9ucyAqL31cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjAgYmctd2hpdGVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItMTIgdGV4dC1jZW50ZXJcIj5Eb2N1bWVudGF0aW9uIFNlY3Rpb25zPC9oMj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtxdWlja0xpbmtzLm1hcCgoc2VjdGlvbiwgaWR4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpZHh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LTJ4bCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOi10cmFuc2xhdGUteS0yIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLWdyYXktMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGgtMiBiZy1ncmFkaWVudC10by1yICR7c2VjdGlvbi5jb2xvcn1gfT48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHctMTQgaC0xNCBiZy1ncmFkaWVudC10by1iciAke3NlY3Rpb24uY29sb3J9IHJvdW5kZWQtMnhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtd2hpdGUgbWItNCBzaGFkb3ctbGdgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24uaWNvbiBjbGFzc05hbWU9XCJ3LTcgaC03XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTNcIj57c2VjdGlvbi50aXRsZX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIG1iLTZcIj57c2VjdGlvbi5kZXNjcmlwdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWN0aW9uLnRvcGljcy5tYXAoKHRvcGljLCB0b3BpY0lkeCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e3RvcGljSWR4fSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciB0ZXh0LWdyYXktNzAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBcnJvd1JpZ2h0SWNvbiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtaW5kaWdvLTYwMCBtci0yXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RvcGljfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgICB7LyogQ29kZSBFeGFtcGxlICovfVxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yMCBiZy1ncmF5LTUwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYi0xMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItNFwiPllvdXIgRmlyc3QgUGFnZTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgdGV4dC1ncmF5LTYwMFwiPkNyZWF0ZSBhIG5ldyBwYWdlIGluIHNlY29uZHM8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMiBnYXAtOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgcC04IHNoYWRvdy1sZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItNFwiPjEuIENyZWF0ZSBhIEZpbGU8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMCBtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3JlYXRlIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBiZy1ncmF5LTEwMCBweC0yIHB5LTEgcm91bmRlZFwiPnBhZ2VzL2hlbGxvLmpzeDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS05MDAgcm91bmRlZC14bCBwLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1iLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1yZWQtNTAwXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0zIGgtMyByb3VuZGVkLWZ1bGwgYmcteWVsbG93LTUwMFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLWdyZWVuLTUwMFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtbC1hdXRvIHRleHQtZ3JheS00MDAgdGV4dC1zbVwiPnBhZ2VzL2hlbGxvLmpzeDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTMwMCBvdmVyZmxvdy14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+e2BpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSGVsbG8oKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwicC0xMFwiPlxyXG4gICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ib2xkXCI+XHJcbiAgICAgICAgSGVsbG8sIFdvcmxkISBcdUQ4M0RcdURDNEJcclxuICAgICAgPC9oMT5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1gfTwvY29kZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3ByZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBwLTggc2hhZG93LWxnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi00XCI+Mi4gQWNjZXNzIFlvdXIgUGFnZTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIG1iLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWaXNpdCA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gYmctZ3JheS0xMDAgcHgtMiBweS0xIHJvdW5kZWRcIj4vaGVsbG88L3NwYW4+IGluIHlvdXIgYnJvd3NlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLWluZGlnby01MCB0by1wdXJwbGUtNTAgcm91bmRlZC14bCBwLTggYm9yZGVyLTIgYm9yZGVyLWluZGlnby0yMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj5IZWxsbywgV29ybGQhPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC02IHAtNCBiZy1ncmVlbi01MCBib3JkZXItbC00IGJvcmRlci1ncmVlbi01MDAgcm91bmRlZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0ljb24gY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWdyZWVuLTYwMFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi04MDAgZm9udC1zZW1pYm9sZFwiPlRoYXQncyBpdCEgTm8gcm91dGluZyBjb25maWd1cmF0aW9uIG5lZWRlZC48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgey8qIFJlc291cmNlcyAqL31cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjAgYmctd2hpdGVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItMTIgdGV4dC1jZW50ZXJcIj5BZGRpdGlvbmFsIFJlc291cmNlczwvaDI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9Sb2hpdHNoYXJtYTYzNzcvSU5EXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLWJyIGZyb20tZ3JheS05MDAgdG8tZ3JheS04MDAgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHAtOCBob3ZlcjpzaGFkb3ctMnhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCB0cmFuc2Zvcm0gaG92ZXI6LXRyYW5zbGF0ZS15LTJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTQgaC0xNCBiZy13aGl0ZS8xMCByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdpdGh1Ykljb24gY2xhc3NOYW1lPVwidy03IGgtN1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgbWItM1wiPkdpdEh1YiBSZXBvc2l0b3J5PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS0zMDBcIj5WaWV3IHNvdXJjZSBjb2RlLCByZXBvcnQgaXNzdWVzLCBhbmQgY29udHJpYnV0ZTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9leGFtcGxlc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLWluZGlnby02MDAgdG8tcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcC04IGhvdmVyOnNoYWRvdy0yeGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRyYW5zZm9ybSBob3ZlcjotdHJhbnNsYXRlLXktMiBjdXJzb3ItcG9pbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xNCBoLTE0IGJnLXdoaXRlLzEwIHJvdW5kZWQtMnhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1iLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlnaHRidWxiSWNvbiBjbGFzc05hbWU9XCJ3LTcgaC03XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgbWItM1wiPkV4YW1wbGVzPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWluZGlnby0xMDBcIj5FeHBsb3JlIHJlYWwtd29ybGQgZXhhbXBsZXMgYW5kIHRlbXBsYXRlczwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpbms+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLWJyIGZyb20tZ3JlZW4tNTAwIHRvLXRlYWwtNjAwIHRleHQtd2hpdGUgcm91bmRlZC14bCBwLTggaG92ZXI6c2hhZG93LTJ4bCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOi10cmFuc2xhdGUteS0yIGN1cnNvci1wb2ludGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTQgaC0xNCBiZy13aGl0ZS8xMCByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFVzZXJzSWNvbiBjbGFzc05hbWU9XCJ3LTcgaC03XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCBtYi0zXCI+Q29tbXVuaXR5PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tMTAwXCI+Sm9pbiBkaXNjdXNzaW9ucyBhbmQgZ2V0IGhlbHAgZnJvbSB0aGUgY29tbXVuaXR5PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcbiIsICIvKipcbiAqIFBsYXRmb3JtIGRldGVjdGlvbiB1dGlsaXRpZXMgZm9yIElOREpTXG4gKlxuICogVXNhZ2U6XG4gKiBpbXBvcnQgeyBpc1dlYiwgaXNEZXNrdG9wLCBpc01vYmlsZSwgaXNBbmRyb2lkLCBpc0lPUywgcGxhdGZvcm0gfSBmcm9tICdpbmRqcyc7XG4gKlxuICogaWYgKGlzTW9iaWxlKSB7IC4uLiB9XG4gKi9cblxuLy8gQ2hlY2sgaWYgcnVubmluZyBpbiBhIGJyb3dzZXIgZW52aXJvbm1lbnRcbmNvbnN0IGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG5cbi8vIEVsZWN0cm9uIGRldGVjdGlvbiAocmVuZGVyZXIgcHJvY2VzcylcbmV4cG9ydCBjb25zdCBpc0Rlc2t0b3AgPVxuICBpc0Jyb3dzZXIgJiZcbiAgKHdpbmRvdy5wcm9jZXNzPy50eXBlID09PSBcInJlbmRlcmVyXCIgfHxcbiAgICAhIXdpbmRvdy5lbGVjdHJvbiB8fFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJFbGVjdHJvblwiKSk7XG5cbi8vIENhcGFjaXRvciBkZXRlY3Rpb25cbmV4cG9ydCBjb25zdCBpc01vYmlsZSA9XG4gIGlzQnJvd3NlciAmJlxuICAoISF3aW5kb3cuQ2FwYWNpdG9yIHx8XG4gICAgISF3aW5kb3cuYW5kcm9pZEJyaWRnZSB8fFxuICAgICEhd2luZG93LndlYmtpdD8ubWVzc2FnZUhhbmRsZXJzPy5icmlkZ2UgfHxcbiAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiQ2FwYWNpdG9yXCIpKTtcblxuLy8gU3BlY2lmaWMgbW9iaWxlIHBsYXRmb3Jtc1xuZXhwb3J0IGNvbnN0IGlzQW5kcm9pZCA9IGlzTW9iaWxlICYmIC9hbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbmV4cG9ydCBjb25zdCBpc0lPUyA9IGlzTW9iaWxlICYmIC9pcGhvbmV8aXBhZHxpcG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLy8gV2ViIGZhbGxiYWNrIChpZiBub3QgZGVza3RvcCBvciBtb2JpbGUgYXBwKVxuZXhwb3J0IGNvbnN0IGlzV2ViID0gIWlzRGVza3RvcCAmJiAhaXNNb2JpbGU7XG5cbi8vIEdldCBjdXJyZW50IHBsYXRmb3JtIG5hbWVcbmV4cG9ydCBjb25zdCBwbGF0Zm9ybSA9ICgoKSA9PiB7XG4gIGlmIChpc0Rlc2t0b3ApIHJldHVybiBcImRlc2t0b3BcIjtcbiAgaWYgKGlzQW5kcm9pZCkgcmV0dXJuIFwiYW5kcm9pZFwiO1xuICBpZiAoaXNJT1MpIHJldHVybiBcImlvc1wiO1xuICBpZiAoaXNNb2JpbGUpIHJldHVybiBcIm1vYmlsZVwiOyAvLyBmYWxsYmFja1xuICByZXR1cm4gXCJ3ZWJcIjtcbn0pKCk7XG5cbi8vIFJlYWN0IE5hdGl2ZSBjb21wYXRpYmxlIEFQSVxuZXhwb3J0IGNvbnN0IE9TID0gcGxhdGZvcm07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3QgPSAob2JqKSA9PiB7XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoT1MpKSByZXR1cm4gb2JqW09TXTtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcIm5hdGl2ZVwiKSAmJiBpc01vYmlsZSkgcmV0dXJuIG9ialtcIm5hdGl2ZVwiXTtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcImRlZmF1bHRcIikpIHJldHVybiBvYmpbXCJkZWZhdWx0XCJdO1xuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc1dlYixcbiAgaXNEZXNrdG9wLFxuICBpc01vYmlsZSxcbiAgaXNBbmRyb2lkLFxuICBpc0lPUyxcbiAgcGxhdGZvcm0sXG4gIE9TLFxuICBzZWxlY3QsXG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEltYWdlID0gZm9yd2FyZFJlZigoeyBzdHlsZSwgc291cmNlLCBzcmMsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiaW1hZ2VcIik7XG5cbiAgLy8gUmVhY3QgTmF0aXZlIHVzZXMgJ3NvdXJjZScsIFdlYiB1c2VzICdzcmMnLlxuICAvLyBXZSBzdXBwb3J0IGJvdGggcHJvcHMgZm9yIHVuaXZlcnNhbCB1c2FnZS5cbiAgY29uc3QgaW1hZ2VTb3VyY2UgPSBzcmMgfHwgKHNvdXJjZSAmJiBzb3VyY2UudXJpKSB8fCBcIlwiO1xuXG4gIGNvbnN0IHByb3BzID0ge1xuICAgIC4uLnJlc3QsXG4gICAgc3JjOiBpbWFnZVNvdXJjZSxcbiAgICByZWYsXG4gIH07XG5cbiAgaWYgKENvbXBvbmVudCAhPT0gXCJpbWdcIiAmJiBDb21wb25lbnQgIT09IFwiaW1hZ2VcIikge1xuICAgIC8vIElmIGl0IHJlZmVycyB0byBSZWFjdCBOYXRpdmUgSW1hZ2UsIGl0IGV4cGVjdHMgJ3NvdXJjZSdcbiAgICBwcm9wcy5zb3VyY2UgPSBzb3VyY2UgfHwgeyB1cmk6IHNyYyB9O1xuICAgIGRlbGV0ZSBwcm9wcy5zcmM7XG4gIH1cblxuICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG5cbiAgcmV0dXJuIDxDb21wb25lbnQgc3R5bGU9e2ZsYXRTdHlsZX0gey4uLnByb3BzfSAvPjtcbn0pO1xuXG5JbWFnZS5kaXNwbGF5TmFtZSA9IFwiSW1hZ2VcIjtcbmV4cG9ydCBkZWZhdWx0IEltYWdlO1xuIiwgImZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRWxlbWVudCh0eXBlKSB7XG4gIGNvbnN0IHBsYXRmb3JtID0gdHlwZW9mIFBMQVRGT1JNICE9PSBcInVuZGVmaW5lZFwiID8gUExBVEZPUk0gOiBcIndlYlwiO1xuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJ3ZWJcIikge1xuICAgIGNvbnN0IHdlYk1hcCA9IHtcbiAgICAgIHZpZXc6IFwiZGl2XCIsXG4gICAgICB0ZXh0OiBcInNwYW5cIixcbiAgICAgIGltYWdlOiBcImltZ1wiLFxuICAgICAgaW1hZ2ViYWNrZ3JvdW5kOiBcImRpdlwiLCAvLyBtYXAgaW1hZ2UtYmFja2dyb3VuZCB0byBkaXYgd2l0aCBzdHlsZVxuICAgICAgc2Nyb2xsdmlldzogXCJkaXZcIixcbiAgICAgIGZsYXRsaXN0OiBcImRpdlwiLFxuICAgICAgc2VjdGlvbmxpc3Q6IFwiZGl2XCIsXG4gICAgICBrZXlib2FyZGF2b2lkaW5ndmlldzogXCJkaXZcIixcbiAgICAgIHNhZmVhcmVhdmlldzogXCJkaXZcIixcbiAgICAgIHByZXNzYWJsZTogXCJidXR0b25cIixcbiAgICAgIHRvdWNoYWJsZW9wYWNpdHk6IFwiYnV0dG9uXCIsXG4gICAgICB0b3VjaGFibGVoaWdobGlnaHQ6IFwiYnV0dG9uXCIsXG4gICAgICBzd2l0Y2g6IFwiaW5wdXRcIiwgLy8gdHlwZT0nY2hlY2tib3gnXG4gICAgICB0ZXh0YXJlYTogXCJ0ZXh0YXJlYVwiLFxuICAgICAgYnV0dG9uOiBcImJ1dHRvblwiLFxuICAgICAgbW9kYWw6IFwiZGl2XCIsXG4gICAgICBhY3Rpdml0eWluZGljYXRvcjogXCJkaXZcIixcbiAgICAgIHJlZnJlc2hjb250cm9sOiBcImRpdlwiLFxuICAgIH07XG4gICAgcmV0dXJuIHdlYk1hcFt0eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIlwiKV0gfHwgXCJkaXZcIjtcbiAgfVxuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJtb2JpbGVcIikge1xuICAgIC8vIEluIFJlYWN0IE5hdGl2ZSwgY29tcG9uZW50cyBhcmUgQ2FtZWxDYXNlXG4gICAgLy8gV2UgbmVlZCB0byBtYXAgZ2VuZXJpYyBuYW1lcyB0byBSTiBuYW1lc1xuICAgIGNvbnN0IG1vYmlsZU1hcCA9IHtcbiAgICAgIHZpZXc6IFwiVmlld1wiLFxuICAgICAgdGV4dDogXCJUZXh0XCIsXG4gICAgICBpbWFnZTogXCJJbWFnZVwiLFxuICAgICAgaW1hZ2ViYWNrZ3JvdW5kOiBcIkltYWdlQmFja2dyb3VuZFwiLFxuICAgICAgc2Nyb2xsdmlldzogXCJTY3JvbGxWaWV3XCIsXG4gICAgICBmbGF0bGlzdDogXCJGbGF0TGlzdFwiLFxuICAgICAgc2VjdGlvbmxpc3Q6IFwiU2VjdGlvbkxpc3RcIixcbiAgICAgIGtleWJvYXJkYXZvaWRpbmd2aWV3OiBcIktleWJvYXJkQXZvaWRpbmdWaWV3XCIsXG4gICAgICBzYWZlYXJlYXZpZXc6IFwiU2FmZUFyZWFWaWV3XCIsXG4gICAgICBwcmVzc2FibGU6IFwiUHJlc3NhYmxlXCIsXG4gICAgICB0b3VjaGFibGVvcGFjaXR5OiBcIlRvdWNoYWJsZU9wYWNpdHlcIixcbiAgICAgIHRvdWNoYWJsZWhpZ2hsaWdodDogXCJUb3VjaGFibGVIaWdobGlnaHRcIixcbiAgICAgIHN3aXRjaDogXCJTd2l0Y2hcIixcbiAgICAgIG1vZGFsOiBcIk1vZGFsXCIsXG4gICAgICBhY3Rpdml0eWluZGljYXRvcjogXCJBY3Rpdml0eUluZGljYXRvclwiLFxuICAgICAgcmVmcmVzaGNvbnRyb2w6IFwiUmVmcmVzaENvbnRyb2xcIixcbiAgICAgIGJ1dHRvbjogXCJCdXR0b25cIixcbiAgICB9O1xuICAgIGNvbnN0IHJuTmFtZSA9XG4gICAgICBtb2JpbGVNYXBbdHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0vZywgXCJcIildIHx8IGNhcGl0YWxpemUodHlwZSk7XG5cbiAgICAvLyBTYWZldHkgY2hlY2sgZm9yIFJlYWN0IE5hdGl2ZSBlbnZpcm9ubWVudFxuICAgIC8vIHJlYWN0LW5hdGl2ZS13ZWIgbWlnaHQgYmUgYWxpYXNlZCwgb3Igd2UgbWlnaHQgYmUgaW4gYSByZWFsIFJOIGVudmlyb25tZW50XG4gICAgdHJ5IHtcbiAgICAgIC8vIFVzaW5nIGdsb2JhbCBjaGVjayBvciBzYWZlIHJlcXVpcmVcbiAgICAgIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gcmVxdWlyZShcInJlYWN0LW5hdGl2ZVwiKVtybk5hbWVdO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB3aW5kb3cuUmVhY3QgJiZcbiAgICAgICAgd2luZG93LlJlYWN0Lk5hdGl2ZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuUmVhY3QuTmF0aXZlW3JuTmFtZV07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKGBSZWFjdCBOYXRpdmUgY29tcG9uZW50ICR7cm5OYW1lfSBub3QgZm91bmRgKTtcbiAgICB9XG4gICAgLy8gRmFsbGJhY2sgdG8gVmlldyBvciBkaXYgZGVwZW5kaW5nIG9uIGNvbnRleHQsIGJ1dCBWaWV3IGlzIHNhZmUgZW5vdWdoIGZvciBsb2dpY2FsIHJldHVybiBpZiBtb2NrZWRcbiAgICByZXR1cm4gXCJWaWV3XCI7XG4gIH1cblxuICByZXR1cm4gXCJkaXZcIjtcbn1cbiIsICIvLyBNb2NrIFN0eWxlU2hlZXQgZm9yIGNvbXBhdGliaWxpdHkuXG4vLyBJbiBJTkRKUyB3ZWIsIHdlIHVzdWFsbHkgdXNlIHN0YW5kYXJkIHN0eWxlIG9iamVjdHMgb3IgQ1NTLlxuLy8gVGhpcyBhbGxvd3MgU3R5bGVTaGVldC5jcmVhdGUoe30pIHRvIHJldHVybiB0aGUgb2JqZWN0cyBhcy1pcy5cblxuZXhwb3J0IGNvbnN0IFN0eWxlU2hlZXQgPSB7XG4gIGNyZWF0ZTogKHN0eWxlcykgPT4gc3R5bGVzLFxuICBmbGF0dGVuOiAoc3R5bGVzKSA9PiB7XG4gICAgaWYgKCFzdHlsZXMpIHJldHVybiB7fTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZXMpKSB7XG4gICAgICByZXR1cm4gc3R5bGVzXG4gICAgICAgIC5mbGF0KEluZmluaXR5KVxuICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IChpdGVtID8geyAuLi5hY2MsIC4uLml0ZW0gfSA6IGFjYyksIHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfSxcbiAgaGFpcmxpbmVXaWR0aDogMSxcbiAgYWJzb2x1dGVGaWxsOiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIHRvcDogMCxcbiAgICBib3R0b206IDAsXG4gIH0sXG4gIGFic29sdXRlRmlsbE9iamVjdDoge1xuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogMCxcbiAgICB0b3A6IDAsXG4gICAgYm90dG9tOiAwLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3R5bGVTaGVldDtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbi8vIElOREpTIExpbmsgY29tcG9uZW50IC0gbGlnaHR3ZWlnaHQgY2xpZW50LXNpZGUgbmF2aWdhdGlvbiBoZWxwZXJcbi8vIFBlcmZvcm1zIFNQQS1saWtlIG5hdmlnYXRpb24gZm9yIHNhbWUtb3JpZ2luIGludGVybmFsIGxpbmtzLlxuLy8gUHJvcHM6IGhyZWYsIHByZWZldGNoLCByZXBsYWNlLCBzY3JvbGwgKGRlZmF1bHQgdHJ1ZSksIG9uQ2xpY2ssIHRhcmdldCwgcmVsLCBjbGFzc05hbWUsIHN0eWxlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaW5rKHtcbiAgaHJlZixcbiAgY2hpbGRyZW4sXG4gIHByZWZldGNoID0gZmFsc2UsXG4gIHJlcGxhY2UgPSBmYWxzZSxcbiAgc2Nyb2xsID0gdHJ1ZSxcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBzdHlsZSxcbiAgdGFyZ2V0LFxuICByZWwsXG4gIC4uLnJlc3Rcbn0pIHtcbiAgLy8gQmFzaWMgcHJlZmV0Y2g6IGhpbnQgdGhlIGJyb3dzZXIgdmlhIDxsaW5rIHJlbD1cInByZWZldGNoXCI+XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFwcmVmZXRjaCB8fCAhaHJlZikgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gICAgICBsLnJlbCA9IFwicHJlZmV0Y2hcIjtcbiAgICAgIGwuaHJlZiA9IGhyZWY7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGwpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGwpO1xuICAgICAgICB9IGNhdGNoIHt9XG4gICAgICB9O1xuICAgIH0gY2F0Y2gge31cbiAgfSwgW2hyZWYsIHByZWZldGNoXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGlmIChvbkNsaWNrKSBvbkNsaWNrKGUpO1xuICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcbiAgICAvLyBPbmx5IGludGVyY2VwdCBzaW1wbGUgbGVmdC1jbGlja3Mgd2l0aG91dCBtb2RpZmllciBrZXlzXG4gICAgaWYgKGUuYnV0dG9uICE9PSAwIHx8IGUubWV0YUtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSB8fCBlLmFsdEtleSlcbiAgICAgIHJldHVybjtcbiAgICBpZiAoIWhyZWYpIHJldHVybjtcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldCAhPT0gXCJfc2VsZlwiKSByZXR1cm47XG4gICAgbGV0IHVybDtcbiAgICB0cnkge1xuICAgICAgdXJsID0gbmV3IFVSTChocmVmLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEludmFsaWQgVVJMLCBsZXQgYnJvd3NlciBoYW5kbGVcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gU2tpcCBub24taHR0cChzKSBwcm90b2NvbHMgYW5kIHNwZWNpYWwgc2NoZW1lc1xuICAgIGNvbnN0IHByb3RvID0gdXJsLnByb3RvY29sO1xuICAgIGlmIChwcm90byAmJiBwcm90byAhPT0gXCJodHRwOlwiICYmIHByb3RvICE9PSBcImh0dHBzOlwiKSByZXR1cm47XG4gICAgLy8gRXh0ZXJuYWxcbiAgICBpZiAodXJsLm9yaWdpbiAhPT0gd2luZG93LmxvY2F0aW9uLm9yaWdpbikgcmV0dXJuO1xuICAgIC8vIFJlc3BlY3QgZG93bmxvYWQgbGlua3NcbiAgICBpZiAocmVzdC5kb3dubG9hZCkgcmV0dXJuO1xuICAgIC8vIEhhc2gtb25seSBuYXZpZ2F0aW9uIG9wdGltaXphdGlvblxuICAgIGNvbnN0IGN1cnJlbnQgPVxuICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCArIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgIGNvbnN0IG5leHQgPSB1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoICsgdXJsLmhhc2g7XG4gICAgaWYgKG5leHQgPT09IGN1cnJlbnQpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgaWYgKHVybC5oYXNoKSB7XG4gICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1cmwuaGFzaC5zbGljZSgxKSk7XG4gICAgICAgICAgaWYgKGVsKSBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgIGVsc2Ugd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gRG8gcHVzaC9yZXBsYWNlIHN0YXRlXG4gICAgaWYgKHJlcGxhY2UpIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XG4gICAgZWxzZSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICAgIC8vIEVtaXQgYSBjdXN0b20gbmF2aWdhdGlvbiBldmVudCBzbyB0aGUgYXBwIGNhbiBsb2FkIHRoZSB0YXJnZXQgbW9kdWxlXG4gICAgdHJ5IHtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJpbmQ6bmF2aWdhdGVcIiwgeyBkZXRhaWw6IHsgaHJlZjogbmV4dCB9IH0pLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIHt9XG4gICAgLy8gU2Nyb2xsIGJlaGF2aW9yXG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgaWYgKHVybC5oYXNoKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodXJsLmhhc2guc2xpY2UoMSkpO1xuICAgICAgICBpZiAoZWwpIGVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIGVsc2Ugd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWxGaW5hbCA9XG4gICAgdGFyZ2V0ID09PSBcIl9ibGFua1wiXG4gICAgICA/IFtyZWwsIFwibm9vcGVuZXJcIiwgXCJub3JlZmVycmVyXCJdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKVxuICAgICAgOiByZWw7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFwiYVwiLFxuICAgIHtcbiAgICAgIGhyZWYsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzdHlsZSxcbiAgICAgIHRhcmdldCxcbiAgICAgIHJlbDogcmVsRmluYWwsXG4gICAgICBvbkNsaWNrOiBoYW5kbGVDbGljayxcbiAgICAgIC4uLnJlc3QsXG4gICAgfSxcbiAgICBjaGlsZHJlbixcbiAgKTtcbn1cbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBWaWV3ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ2aWV3XCIpO1xuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuVmlldy5kaXNwbGF5TmFtZSA9IFwiVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUZXh0ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0ZXh0XCIpO1xuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuVGV4dC5kaXNwbGF5TmFtZSA9IFwiVGV4dFwiO1xuZXhwb3J0IGRlZmF1bHQgVGV4dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTY3JvbGxWaWV3ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBob3Jpem9udGFsID0gZmFsc2UsXG4gICAgICBzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3IgPSB0cnVlLFxuICAgICAgc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvciA9IHRydWUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic2Nyb2xsdmlld1wiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrXG4gICAgICBjb25zdCBjb250YWluZXJTdHlsZSA9IHtcbiAgICAgICAgb3ZlcmZsb3dYOiBob3Jpem9udGFsID8gXCJhdXRvXCIgOiBcImhpZGRlblwiLFxuICAgICAgICBvdmVyZmxvd1k6IGhvcml6b250YWwgPyBcImhpZGRlblwiIDogXCJhdXRvXCIsXG4gICAgICAgIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiBcInRvdWNoXCIsXG4gICAgICAgIHNjcm9sbGJhcldpZHRoOiAoXG4gICAgICAgICAgaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAhc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgICAgICA6ICFzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgIClcbiAgICAgICAgICA/IFwibm9uZVwiXG4gICAgICAgICAgOiBcImF1dG9cIixcbiAgICAgICAgbXNPdmVyZmxvd1N0eWxlOiAoXG4gICAgICAgICAgaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAhc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgICAgICA6ICFzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgIClcbiAgICAgICAgICA/IFwibm9uZVwiXG4gICAgICAgICAgOiBcImF1dG9cIixcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG4gICAgICBjb25zdCBjb250ZW50U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW2NvbnRlbnRDb250YWluZXJTdHlsZV0pO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e2NvbnRhaW5lclN0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnJlc3R9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e2NvbnRlbnRTdHlsZX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgIHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvcj17c2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yfVxuICAgICAgICBzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yPXtzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5TY3JvbGxWaWV3LmRpc3BsYXlOYW1lID0gXCJTY3JvbGxWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBTY3JvbGxWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IFRleHRJbnB1dCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICB2YWx1ZSxcbiAgICAgIGRlZmF1bHRWYWx1ZSxcbiAgICAgIG9uQ2hhbmdlVGV4dCxcbiAgICAgIG9uRm9jdXMsXG4gICAgICBvbkJsdXIsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNlY3VyZVRleHRFbnRyeSA9IGZhbHNlLFxuICAgICAgbXVsdGlsaW5lID0gZmFsc2UsXG4gICAgICBudW1iZXJPZkxpbmVzID0gNCxcbiAgICAgIGVkaXRhYmxlID0gdHJ1ZSxcbiAgICAgIHN0eWxlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgaWYgKG9uQ2hhbmdlVGV4dCkgb25DaGFuZ2VUZXh0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29tbW9uU3R5bGUgPSB7XG4gICAgICBhcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICAgIG91dGxpbmU6IFwibm9uZVwiLFxuICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgfTtcblxuICAgIGlmIChtdWx0aWxpbmUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XG4gICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIHJlYWRPbmx5PXshZWRpdGFibGV9XG4gICAgICAgICAgcm93cz17bnVtYmVyT2ZMaW5lc31cbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdHlsZSwgcmVzaXplOiBcIm5vbmVcIiB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0eXBlPXtzZWN1cmVUZXh0RW50cnkgPyBcInBhc3N3b3JkXCIgOiBcInRleHRcIn1cbiAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgcmVhZE9ubHk9eyFlZGl0YWJsZX1cbiAgICAgICAgc3R5bGU9e2NvbW1vblN0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5UZXh0SW5wdXQuZGlzcGxheU5hbWUgPSBcIlRleHRJbnB1dFwiO1xuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEJ1dHRvbiA9IGZvcndhcmRSZWYoXG4gICh7IHRpdGxlLCBvblByZXNzLCBjb2xvciwgZGlzYWJsZWQsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge3RpdGxlfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJCdXR0b25cIjtcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBBY3Rpdml0eUluZGljYXRvciA9IGZvcndhcmRSZWYoXG4gICh7IHNpemUgPSBcInNtYWxsXCIsIGNvbG9yID0gXCIjOTk5XCIsIHN0eWxlLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiYWN0aXZpdHlpbmRpY2F0b3JcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGNvbnN0IHNwaW5uZXJTdHlsZSA9IHtcbiAgICAgICAgYW5pbWF0aW9uOiBcImluZGpzLXNwaW4gMXMgbGluZWFyIGluZmluaXRlXCIsXG4gICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBJbmplY3Qga2V5ZnJhbWVzIGlmIG5vdCBwcmVzZW50XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRqcy1zcGluLXN0eWxlXCIpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgc3R5bGVFbC5pZCA9IFwiaW5kanMtc3Bpbi1zdHlsZVwiO1xuICAgICAgICBzdHlsZUVsLmlubmVySFRNTCA9IGBAa2V5ZnJhbWVzIGluZGpzLXNwaW4geyAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9IDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1gO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gPGRpdiByZWY9e3JlZn0gc3R5bGU9e3NwaW5uZXJTdHlsZX0gey4uLnJlc3R9IC8+O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzaXplPXtzaXplfSBjb2xvcj17Y29sb3J9IHN0eWxlPXtzdHlsZX0gey4uLnJlc3R9IC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkFjdGl2aXR5SW5kaWNhdG9yLmRpc3BsYXlOYW1lID0gXCJBY3Rpdml0eUluZGljYXRvclwiO1xuZXhwb3J0IGRlZmF1bHQgQWN0aXZpdHlJbmRpY2F0b3I7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU3dpdGNoID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHsgdmFsdWUsIG9uVmFsdWVDaGFuZ2UsIGRpc2FibGVkLCB0cmFja0NvbG9yLCB0aHVtYkNvbG9yLCBzdHlsZSwgLi4ucmVzdCB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzd2l0Y2hcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImlucHV0XCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25WYWx1ZUNoYW5nZSAmJiBvblZhbHVlQ2hhbmdlKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICBvblZhbHVlQ2hhbmdlPXtvblZhbHVlQ2hhbmdlfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHRyYWNrQ29sb3I9e3RyYWNrQ29sb3J9XG4gICAgICAgIHRodW1iQ29sb3I9e3RodW1iQ29sb3J9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5Td2l0Y2guZGlzcGxheU5hbWUgPSBcIlN3aXRjaFwiO1xuZXhwb3J0IGRlZmF1bHQgU3dpdGNoO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFNjcm9sbFZpZXcgZnJvbSBcIi4vc2Nyb2xsLXZpZXcuanN4XCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgRmxhdExpc3QgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgZGF0YSxcbiAgICAgIHJlbmRlckl0ZW0sXG4gICAgICBrZXlFeHRyYWN0b3IsXG4gICAgICBMaXN0SGVhZGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgICAgIExpc3RFbXB0eUNvbXBvbmVudCxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIG51bUNvbHVtbnMgPSAxLFxuICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImZsYXRsaXN0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2sgaW1wbGVtZW50YXRpb25cbiAgICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAoTGlzdEVtcHR5Q29tcG9uZW50KSB7XG4gICAgICAgICAgY29uc3QgRW1wdHkgPSBSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0RW1wdHlDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgTGlzdEVtcHR5Q29tcG9uZW50XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxMaXN0RW1wdHlDb21wb25lbnQgLz5cbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge0VtcHR5fVxuICAgICAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGl0ZW1zID0gZGF0YSB8fCBbXTtcbiAgICAgIGNvbnN0IHJlbmRlckxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5RXh0cmFjdG9yXG4gICAgICAgICAgICA/IGtleUV4dHJhY3RvcihpdGVtLCBpbmRleClcbiAgICAgICAgICAgIDogaW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17a2V5fT5cbiAgICAgICAgICAgICAge3JlbmRlckl0ZW0oeyBpdGVtLCBpbmRleCB9KX1cbiAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBmbGF0Q29udGVudFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtjb250ZW50Q29udGFpbmVyU3R5bGVdKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2ZsYXRDb250ZW50U3R5bGV9XG4gICAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICB7cmVuZGVyTGlzdCgpfVxuICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEZvb3RlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0Rm9vdGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgcmVuZGVySXRlbT17cmVuZGVySXRlbX1cbiAgICAgICAga2V5RXh0cmFjdG9yPXtrZXlFeHRyYWN0b3J9XG4gICAgICAgIExpc3RIZWFkZXJDb21wb25lbnQ9e0xpc3RIZWFkZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RGb290ZXJDb21wb25lbnQ9e0xpc3RGb290ZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RFbXB0eUNvbXBvbmVudD17TGlzdEVtcHR5Q29tcG9uZW50fVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgbnVtQ29sdW1ucz17bnVtQ29sdW1uc31cbiAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5GbGF0TGlzdC5kaXNwbGF5TmFtZSA9IFwiRmxhdExpc3RcIjtcbmV4cG9ydCBkZWZhdWx0IEZsYXRMaXN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZU9wYWNpdHkgPSBmb3J3YXJkUmVmKFxuICAoeyBjaGlsZHJlbiwgc3R5bGUsIG9uUHJlc3MsIGFjdGl2ZU9wYWNpdHkgPSAwLjIsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVvcGFjaXR5XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKX1cbiAgICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gYWN0aXZlT3BhY2l0eSl9XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZU9wYWNpdHkuZGlzcGxheU5hbWUgPSBcIlRvdWNoYWJsZU9wYWNpdHlcIjtcbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZU9wYWNpdHk7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUHJlc3NhYmxlID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIG9uUHJlc3MsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwicHJlc3NhYmxlXCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgIHsgY3Vyc29yOiBcInBvaW50ZXJcIiB9LFxuICAgICAgdHlwZW9mIHN0eWxlID09PSBcImZ1bmN0aW9uXCIgPyBzdHlsZSh7IHByZXNzZWQ6IGZhbHNlIH0pIDogc3R5bGUsXG4gICAgXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvbiByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gb25DbGljaz17b25QcmVzc30gey4uLnJlc3R9PlxuICAgICAgICB7dHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGNoaWxkcmVuKHsgcHJlc3NlZDogZmFsc2UgfSlcbiAgICAgICAgICA6IGNoaWxkcmVufVxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSBvblByZXNzPXtvblByZXNzfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuUHJlc3NhYmxlLmRpc3BsYXlOYW1lID0gXCJQcmVzc2FibGVcIjtcbmV4cG9ydCBkZWZhdWx0IFByZXNzYWJsZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBJbWFnZUJhY2tncm91bmQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAgeyBjaGlsZHJlbiwgc3R5bGUsIGltYWdlU3R5bGUsIHNvdXJjZSwgc3JjLCByZXNpemVNb2RlID0gXCJjb3ZlclwiLCAuLi5yZXN0IH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImltYWdlYmFja2dyb3VuZFwiKTtcblxuICAgIGNvbnN0IGltYWdlU291cmNlID0gc3JjIHx8IChzb3VyY2UgJiYgc291cmNlLnVyaSkgfHwgXCJcIjtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgICAge1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aW1hZ2VTb3VyY2V9KWAsXG4gICAgICAgICAgYmFja2dyb3VuZFNpemU6IHJlc2l6ZU1vZGUgPT09IFwic3RyZXRjaFwiID8gXCIxMDAlIDEwMCVcIiA6IHJlc2l6ZU1vZGUsXG4gICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlLFxuICAgICAgXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgaW1hZ2VTdHlsZT17aW1hZ2VTdHlsZX1cbiAgICAgICAgc291cmNlPXtzb3VyY2UgfHwgeyB1cmk6IHNyYyB9fVxuICAgICAgICByZXNpemVNb2RlPXtyZXNpemVNb2RlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbkltYWdlQmFja2dyb3VuZC5kaXNwbGF5TmFtZSA9IFwiSW1hZ2VCYWNrZ3JvdW5kXCI7XG5leHBvcnQgZGVmYXVsdCBJbWFnZUJhY2tncm91bmQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmNvbnN0IE1vZGFsID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgdmlzaWJsZSxcbiAgICAgIHRyYW5zcGFyZW50LFxuICAgICAgYW5pbWF0aW9uVHlwZSxcbiAgICAgIG9uUmVxdWVzdENsb3NlLFxuICAgICAgc3R5bGUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwibW9kYWxcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IG1vZGFsU3R5bGUgPSB7XG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBSZW5kZXIgYXMgcG9ydGFsIGlmIHBvc3NpYmxlXG4gICAgICBjb25zdCBjb250ZW50ID0gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17bW9kYWxTdHlsZX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwoY29udGVudCwgZG9jdW1lbnQuYm9keSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmlzaWJsZT17dmlzaWJsZX1cbiAgICAgICAgdHJhbnNwYXJlbnQ9e3RyYW5zcGFyZW50fVxuICAgICAgICBhbmltYXRpb25UeXBlPXthbmltYXRpb25UeXBlfVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17b25SZXF1ZXN0Q2xvc2V9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuTW9kYWwuZGlzcGxheU5hbWUgPSBcIk1vZGFsXCI7XG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTYWZlQXJlYVZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzYWZlYXJlYXZpZXdcIik7XG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtzdHlsZX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblNhZmVBcmVhVmlldy5kaXNwbGF5TmFtZSA9IFwiU2FmZUFyZWFWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBTYWZlQXJlYVZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcblxuLy8gV2ViIG1vY2sgb2YgU3RhdHVzQmFyLiBJbiBuYXRpdmUgaXQgd291bGQgY2hhbmdlIHRoZSBiYXIgc3R5bGUuXG4vLyBJbiB3ZWIsIG1heWJlIGl0IGNoYW5nZXMgdGhlIG1ldGEgdGhlbWUtY29sb3IgdGFnLlxuXG5mdW5jdGlvbiBTdGF0dXNCYXIoeyBiYXJTdHlsZSA9IFwiZGVmYXVsdFwiLCBiYWNrZ3JvdW5kQ29sb3IsIGhpZGRlbiA9IGZhbHNlIH0pIHtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICAvLyBBdHRlbXB0IHRvIHNldCB0aGVtZS1jb2xvciBtZXRhIHRhZyBpZiBiYWNrZ3JvdW5kQ29sb3IgcHJvdmlkZWRcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBsZXQgbWV0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInRoZW1lLWNvbG9yXCJdJyk7XG4gICAgICBpZiAoIW1ldGEpIHtcbiAgICAgICAgbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIpO1xuICAgICAgICBtZXRhLm5hbWUgPSBcInRoZW1lLWNvbG9yXCI7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobWV0YSk7XG4gICAgICB9XG4gICAgICBtZXRhLmNvbnRlbnQgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgfVxuICB9LCBbYmFja2dyb3VuZENvbG9yXSk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXR1c0JhcjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTY3JvbGxWaWV3IGZyb20gXCIuL3Njcm9sbC12aWV3LmpzeFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU2VjdGlvbkxpc3QgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgc2VjdGlvbnMsXG4gICAgICByZW5kZXJJdGVtLFxuICAgICAgcmVuZGVyU2VjdGlvbkhlYWRlcixcbiAgICAgIGtleUV4dHJhY3RvcixcbiAgICAgIExpc3RIZWFkZXJDb21wb25lbnQsXG4gICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgc3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkID0gdHJ1ZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzZWN0aW9ubGlzdFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrXG4gICAgICBjb25zdCByZW5kZXJTZWN0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIChzZWN0aW9ucyB8fCBbXSkubWFwKChzZWN0aW9uLCBzZWN0aW9uSW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gc2VjdGlvbi5kYXRhIHx8IFtdO1xuICAgICAgICAgIGNvbnN0IGtleSA9IHNlY3Rpb24ua2V5IHx8IHNlY3Rpb25JbmRleC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtrZXl9PlxuICAgICAgICAgICAgICB7cmVuZGVyU2VjdGlvbkhlYWRlciAmJiByZW5kZXJTZWN0aW9uSGVhZGVyKHsgc2VjdGlvbiB9KX1cbiAgICAgICAgICAgICAge2RhdGEubWFwKChpdGVtLCBpdGVtSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtS2V5ID0ga2V5RXh0cmFjdG9yXG4gICAgICAgICAgICAgICAgICA/IGtleUV4dHJhY3RvcihpdGVtLCBpdGVtSW5kZXgpXG4gICAgICAgICAgICAgICAgICA6IGl0ZW0ua2V5IHx8IGl0ZW0uaWQgfHwga2V5ICsgXCItXCIgKyBpdGVtSW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2l0ZW1LZXl9PlxuICAgICAgICAgICAgICAgICAgICB7cmVuZGVySXRlbSh7IGl0ZW0sIGluZGV4OiBpdGVtSW5kZXgsIHNlY3Rpb24gfSl9XG4gICAgICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAge3JlbmRlclNlY3Rpb25zKCl9XG4gICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzZWN0aW9ucz17c2VjdGlvbnN9XG4gICAgICAgIHJlbmRlckl0ZW09e3JlbmRlckl0ZW19XG4gICAgICAgIHJlbmRlclNlY3Rpb25IZWFkZXI9e3JlbmRlclNlY3Rpb25IZWFkZXJ9XG4gICAgICAgIGtleUV4dHJhY3Rvcj17a2V5RXh0cmFjdG9yfVxuICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50PXtMaXN0SGVhZGVyQ29tcG9uZW50fVxuICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50PXtMaXN0Rm9vdGVyQ29tcG9uZW50fVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgc3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkPXtzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuU2VjdGlvbkxpc3QuZGlzcGxheU5hbWUgPSBcIlNlY3Rpb25MaXN0XCI7XG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uTGlzdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBLZXlib2FyZEF2b2lkaW5nVmlldyA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgYmVoYXZpb3IsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0LFxuICAgICAgZW5hYmxlZCxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJrZXlib2FyZGF2b2lkaW5ndmlld1wiKTtcblxuICAgIC8vIE9uIHdlYiwga2V5Ym9hcmQgYXZvaWRpbmcgaXMgdXN1YWxseSBoYW5kbGVkIGJ5IHRoZSBicm93c2VyIGRlZmF1bHQgYmVoYXZpb3Igb3IgaXMgaXJyZWxldmFudFxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSl9IHsuLi5yZXN0fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBiZWhhdmlvcj17YmVoYXZpb3J9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0PXtrZXlib2FyZFZlcnRpY2FsT2Zmc2V0fVxuICAgICAgICBlbmFibGVkPXtlbmFibGVkfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbktleWJvYXJkQXZvaWRpbmdWaWV3LmRpc3BsYXlOYW1lID0gXCJLZXlib2FyZEF2b2lkaW5nVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgS2V5Ym9hcmRBdm9pZGluZ1ZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUmVmcmVzaENvbnRyb2wgPSBmb3J3YXJkUmVmKCh7IHJlZnJlc2hpbmcsIG9uUmVmcmVzaCwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJyZWZyZXNoY29udHJvbFwiKTtcblxuICAvLyBPbiB3ZWIsIHBhc3MtdGhyb3VnaCBvciBpbXBsZW1lbnQgYmFzaWMgdmlzdWFsP1xuICAvLyBVc3VhbGx5IFJlZnJlc2hDb250cm9sIGlzIHBhc3NlZCBhcyBwcm9wIHRvIFNjcm9sbFZpZXcuXG4gIC8vIElmIHVzZWQgYXMgY29tcG9uZW50LCBpdCBtaWdodCB3cmFwIGNvbnRlbnQuXG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgIC8vIE5vLW9wIGZvciB3ZWIgdmlzdWFsIHVzdWFsbHksIHVubGVzcyB3ZSBpbXBsZW1lbnQgcHVsbC10by1yZWZyZXNoXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnRcbiAgICAgIHJlZj17cmVmfVxuICAgICAgcmVmcmVzaGluZz17cmVmcmVzaGluZ31cbiAgICAgIG9uUmVmcmVzaD17b25SZWZyZXNofVxuICAgICAgey4uLnJlc3R9XG4gICAgLz5cbiAgKTtcbn0pO1xuXG5SZWZyZXNoQ29udHJvbC5kaXNwbGF5TmFtZSA9IFwiUmVmcmVzaENvbnRyb2xcIjtcbmV4cG9ydCBkZWZhdWx0IFJlZnJlc2hDb250cm9sO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZUhpZ2hsaWdodCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgb25QcmVzcyxcbiAgICAgIHVuZGVybGF5Q29sb3IgPSBcImJsYWNrXCIsXG4gICAgICBhY3RpdmVPcGFjaXR5ID0gMC44NSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVoaWdobGlnaHRcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKTtcblxuICAgICAgLy8gU2ltcGxlIHdlYiBpbXBsZW1lbnRhdGlvbjoganVzdCBvcGFjaXR5LCBtaW1pY2tpbmcgb3ZlcmxheSBpcyBoYXJkZXIgd2l0aG91dCBzdGF0ZVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtmbGF0U3R5bGV9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IHtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB1bmRlcmxheUNvbG9yO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBhY3RpdmVPcGFjaXR5O1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICB1bmRlcmxheUNvbG9yPXt1bmRlcmxheUNvbG9yfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZUhpZ2hsaWdodC5kaXNwbGF5TmFtZSA9IFwiVG91Y2hhYmxlSGlnaGxpZ2h0XCI7XG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVIaWdobGlnaHQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcblxuLy8gVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrIGp1c3QgYWNjZXB0cyBvblByZXNzIGFuZCBwYXNzZXMgaXQgdG8gdGhlIGNoaWxkXG4vLyBJdCBkb2VzIG5vdCBhZGQgYW55IHZpc3VhbCBmZWVkYmFjay5cbmNvbnN0IFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjayA9ICh7XG4gIGNoaWxkcmVuLFxuICBvblByZXNzLFxuICBvblByZXNzSW4sXG4gIG9uUHJlc3NPdXQsXG4gIGRpc2FibGVkLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IGNoaWxkID0gQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG5cbiAgcmV0dXJuIGNsb25lRWxlbWVudChjaGlsZCwge1xuICAgIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3MpIG9uUHJlc3MoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25DbGljaykgY2hpbGQucHJvcHMub25DbGljayhlKTtcbiAgICB9LFxuICAgIG9uTW91c2VEb3duOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzSW4pIG9uUHJlc3NJbihlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbk1vdXNlRG93bikgY2hpbGQucHJvcHMub25Nb3VzZURvd24oZSk7XG4gICAgfSxcbiAgICBvbk1vdXNlVXA6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NPdXQpIG9uUHJlc3NPdXQoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Nb3VzZVVwKSBjaGlsZC5wcm9wcy5vbk1vdXNlVXAoZSk7XG4gICAgfSxcbiAgICBvblRvdWNoU3RhcnQ6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NJbikgb25QcmVzc0luKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uVG91Y2hTdGFydCkgY2hpbGQucHJvcHMub25Ub3VjaFN0YXJ0KGUpO1xuICAgIH0sXG4gICAgb25Ub3VjaEVuZDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc091dCkgb25QcmVzc091dChlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vblRvdWNoRW5kKSBjaGlsZC5wcm9wcy5vblRvdWNoRW5kKGUpO1xuICAgIH0sXG4gICAgc3R5bGU6IHtcbiAgICAgIGN1cnNvcjogZGlzYWJsZWQgPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcbiAgICAgIC4uLmNoaWxkLnByb3BzLnN0eWxlLFxuICAgIH0sXG4gICAgLi4ucmVzdCxcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2s7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU2NyZWVuIENvbXBvbmVudFxyXG4gKiBGdWxsLWhlaWdodCBzY3JlZW4gY29udGFpbmVyIHdpdGggYmFja2dyb3VuZFxyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU2NyZWVuID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgYmFja2dyb3VuZCA9ICdsaWdodCcsIGNsYXNzTmFtZSA9ICcnLCBzdHlsZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuU2NyZWVuLmRpc3BsYXlOYW1lID0gXCJTY3JlZW5cIjtcclxuZXhwb3J0IGRlZmF1bHQgU2NyZWVuO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgQ29udGFpbmVyIENvbXBvbmVudFxyXG4gKiBSZXNwb25zaXZlIGNvbnRhaW5lciB3aXRoIG1heC13aWR0aCBhbmQgY2VudGVyaW5nXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBDb250YWluZXIgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5Db250YWluZXIuZGlzcGxheU5hbWUgPSBcIkNvbnRhaW5lclwiO1xyXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBDYXJkIENvbXBvbmVudFxyXG4gKiBTdHlsZWQgY2FyZCBjb250YWluZXIgd2l0aCBzaGFkb3cgYW5kIHJvdW5kZWQgY29ybmVyc1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgQ2FyZCA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkNhcmQuZGlzcGxheU5hbWUgPSBcIkNhcmRcIjtcclxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEdyaWQgQ29tcG9uZW50XHJcbiAqIFJlc3BvbnNpdmUgZ3JpZCBsYXlvdXQgc3lzdGVtXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBHcmlkID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuR3JpZC5kaXNwbGF5TmFtZSA9IFwiR3JpZFwiO1xyXG5leHBvcnQgZGVmYXVsdCBHcmlkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU3RhY2sgQ29tcG9uZW50XHJcbiAqIFZlcnRpY2FsIG9yIGhvcml6b250YWwgbGF5b3V0IHdpdGggc3BhY2luZ1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU3RhY2sgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGRpcmVjdGlvbiA9ICd2ZXJ0aWNhbCcsXHJcbiAgICBzcGFjaW5nID0gNCxcclxuICAgIGFsaWduID0gJ3N0YXJ0JyxcclxuICAgIGp1c3RpZnkgPSAnc3RhcnQnLFxyXG4gICAgY2xhc3NOYW1lID0gJycsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG59KTtcclxuXHJcblN0YWNrLmRpc3BsYXlOYW1lID0gXCJTdGFja1wiO1xyXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEljb24gQ29tcG9uZW50XHJcbiAqIERpc3BsYXlzIGVtb2ppIGljb25zIGNvbnNpc3RlbnRseSBhY3Jvc3MgcGxhdGZvcm1zXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBJY29uID0gZm9yd2FyZFJlZigoe1xyXG4gICAgbmFtZSxcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dCByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtuYW1lfVxyXG4gICAgICAgIDwvVGV4dCA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkljb24uZGlzcGxheU5hbWUgPSBcIkljb25cIjtcclxuZXhwb3J0IGRlZmF1bHQgSWNvbjtcclxuIiwgIi8vIERpbWVuc2lvbnMgQVBJIGZvciBXZWJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcblxuY29uc3QgbGlzdGVuZXJzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgbGlzdGVuZXJzLmVtaXQoXCJjaGFuZ2VcIiwgeyB3aW5kb3c6IGdldFdpbmRvdygpLCBzY3JlZW46IGdldFNjcmVlbigpIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93KCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgIHNjYWxlOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLFxuICAgIGZvbnRTY2FsZTogMSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NyZWVuKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5zY3JlZW4ud2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuc2NyZWVuLmhlaWdodCxcbiAgICBzY2FsZTogd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSxcbiAgICBmb250U2NhbGU6IDEsXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBEaW1lbnNpb25zID0ge1xuICBnZXQ6IChkaW0pID0+IHtcbiAgICBpZiAoZGltID09PSBcIndpbmRvd1wiKSByZXR1cm4gZ2V0V2luZG93KCk7XG4gICAgaWYgKGRpbSA9PT0gXCJzY3JlZW5cIikgcmV0dXJuIGdldFNjcmVlbigpO1xuICAgIHJldHVybiBnZXRXaW5kb3coKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJjaGFuZ2VcIikge1xuICAgICAgbGlzdGVuZXJzLm9uKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVtb3ZlOiAoKSA9PiBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcImNoYW5nZVwiKSB7XG4gICAgICBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpbWVuc2lvbnM7XG4iLCAiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5jb25zdCBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmV4cG9ydCBjb25zdCBMaW5raW5nID0ge1xuICBvcGVuVVJMOiAodXJsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5vcGVuKHVybCwgXCJfYmxhbmtcIiwgXCJub29wZW5lcixub3JlZmVycmVyXCIpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH0sXG4gIGNhbk9wZW5VUkw6ICh1cmwpID0+IFByb21pc2UucmVzb2x2ZSh0cnVlKSxcbiAgZ2V0SW5pdGlhbFVSTDogKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJ1cmxcIikge1xuICAgICAgLy8gSW4gYSByZWFsIHdlYiBhcHAsIHdlIG1pZ2h0IGxpc3RlbiB0byBwb3BzdGF0ZSBvciBoYXNoY2hhbmdlXG4gICAgICAvLyBlbnN1cmluZyB3ZSByZXR1cm4gYSBzdWJzY3JpcHRpb24tbGlrZSBvYmplY3RcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gKGUpID0+IGhhbmRsZXIoeyB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBsaXN0ZW5lcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6ICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgbGlzdGVuZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIC8vIERlcHJlY2F0ZWQgaW4gUk4gYnV0IGdvb2QgdG8gaGF2ZSBzaWduYXR1cmVcbiAgfSxcbiAgc2VuZEludGVudDogKGFjdGlvbiwgZXh0cmFzKSA9PiBQcm9taXNlLnJlc29sdmUoKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtpbmc7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7OztBQUFBLE9BQU9BLFdBQVMsZ0JBQWdCOzs7QUNVaEMsSUFBTSxZQUFZLE9BQU8sV0FBVztBQUc3QixJQUFNLFlBQ1gsY0FDQyxPQUFPLFNBQVMsU0FBUyxjQUN4QixDQUFDLENBQUMsT0FBTyxZQUNULFVBQVUsVUFBVSxT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RUEsZ0JBQUFDLE1BQUMsU0FBSSxXQUFVLHFLQUNYO0FBQUEsMEJBQUFELE1BQUMsU0FBSSxXQUFVLDJFQUNYLDBCQUFBQSxNQUFDLGFBQVUsV0FBVSxXQUFVLEdBQ25DO0FBQUEsVUFDQSxnQkFBQUEsTUFBQyxRQUFHLFdBQVUsMkJBQTBCLHVCQUFTO0FBQUEsVUFDakQsZ0JBQUFBLE1BQUMsT0FBRSxXQUFVLGtCQUFpQiw4REFBZ0Q7QUFBQSxXQUNsRjtBQUFBLFNBQ0o7QUFBQSxPQUNKLEdBQ0o7QUFBQSxLQUNKO0FBRVI7IiwKICAibmFtZXMiOiBbIlJlYWN0IiwgInBsYXRmb3JtIiwgIlN0eWxlU2hlZXQiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAianN4cyIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIkV2ZW50RW1pdHRlciIsICJqc3giLCAianN4cyJdCn0K
