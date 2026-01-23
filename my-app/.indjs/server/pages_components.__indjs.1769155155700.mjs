var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// pages/components.jsx
import React39, { useState as useState4 } from "react";

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

// components/ui/Button.jsx
import React28 from "react";
import { jsx as jsx25, jsxs as jsxs3 } from "react/jsx-runtime";
var variants = {
  primary: "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-[length:200%_auto] text-white hover:bg-right-top shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30",
  secondary: "bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm hover:shadow-md",
  outline: "bg-transparent text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white",
  ghost: "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  danger: "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 shadow-lg shadow-red-500/20",
  success: "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/20",
  gradient: "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] text-white hover:bg-right-top shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
};
var sizes = {
  sm: "px-3.5 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
  xl: "px-8 py-4 text-lg gap-2.5"
};
function Button2({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  ...props
}) {
  const baseStyles = `
    inline-flex items-center justify-center font-semibold rounded-xl 
    transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
  `;
  return /* @__PURE__ */ jsxs3(
    "button",
    {
      className: `
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `,
      disabled: disabled || loading,
      ...props,
      children: [
        loading && /* @__PURE__ */ jsxs3("svg", { className: "animate-spin h-4 w-4", viewBox: "0 0 24 24", fill: "none", children: [
          /* @__PURE__ */ jsx25("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "3" }),
          /* @__PURE__ */ jsx25("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
        ] }),
        !loading && icon && iconPosition === "left" && icon,
        children,
        !loading && icon && iconPosition === "right" && icon
      ]
    }
  );
}
function IconButton({
  children,
  variant = "ghost",
  size = "md",
  className = "",
  ...props
}) {
  const iconSizes = {
    sm: "p-1.5",
    md: "p-2.5",
    lg: "p-3",
    xl: "p-4"
  };
  return /* @__PURE__ */ jsx25(
    "button",
    {
      className: `
        inline-flex items-center justify-center rounded-xl 
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        transform hover:scale-105 active:scale-95
        ${variants[variant]}
        ${iconSizes[size]}
        ${className}
      `,
      ...props,
      children
    }
  );
}

// components/ui/Badge.jsx
import React29 from "react";
import { jsx as jsx26, jsxs as jsxs4 } from "react/jsx-runtime";
var variants2 = {
  default: "bg-gray-100 text-gray-700 border border-gray-200/50",
  primary: "bg-indigo-50 text-indigo-700 border border-indigo-100",
  secondary: "bg-purple-50 text-purple-700 border border-purple-100",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  warning: "bg-amber-50 text-amber-700 border border-amber-100",
  danger: "bg-red-50 text-red-700 border border-red-100",
  info: "bg-sky-50 text-sky-700 border border-sky-100",
  outline: "bg-transparent border border-gray-300 text-gray-600",
  gradient: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-sm"
};
var sizes2 = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs font-semibold",
  lg: "px-3 py-1.5 text-sm"
};
function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  dotColor = "bg-current",
  removable = false,
  onRemove,
  icon,
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsxs4(
    "span",
    {
      className: `
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${variants2[variant]}
        ${sizes2[size]}
        ${className}
      `,
      ...props,
      children: [
        dot && /* @__PURE__ */ jsx26("span", { className: `w-1.5 h-1.5 rounded-full ${dotColor}` }),
        icon && /* @__PURE__ */ jsx26("span", { className: "flex-shrink-0", children: icon }),
        children,
        removable && /* @__PURE__ */ jsx26(
          "button",
          {
            onClick: onRemove,
            className: "flex-shrink-0 ml-0.5 hover:bg-black/10 rounded-full p-0.5 transition-colors",
            children: /* @__PURE__ */ jsx26("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
          }
        )
      ]
    }
  );
}
function StatusBadge({ status = "online", className = "" }) {
  const statusConfig = {
    online: { color: "bg-green-500", label: "Online" },
    offline: { color: "bg-gray-400", label: "Offline" },
    away: { color: "bg-yellow-500", label: "Away" },
    busy: { color: "bg-red-500", label: "Busy" }
  };
  const config = statusConfig[status] || statusConfig.offline;
  return /* @__PURE__ */ jsxs4("span", { className: `inline-flex items-center gap-1.5 text-sm text-gray-600 ${className}`, children: [
    /* @__PURE__ */ jsxs4("span", { className: "relative flex h-2 w-2", children: [
      status === "online" && /* @__PURE__ */ jsx26("span", { className: `animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75` }),
      /* @__PURE__ */ jsx26("span", { className: `relative inline-flex rounded-full h-2 w-2 ${config.color}` })
    ] }),
    config.label
  ] });
}

// components/ui/Card.jsx
import React30 from "react";
import { jsx as jsx27, jsxs as jsxs5 } from "react/jsx-runtime";
function Card2({
  children,
  className = "",
  hover = false,
  gradient = false,
  padding = "md",
  glass = false,
  ...props
}) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };
  const baseStyles = glass ? "bg-white/60 backdrop-blur-xl border-white/30" : "bg-white border-gray-100";
  return /* @__PURE__ */ jsx27(
    "div",
    {
      className: `
        rounded-2xl border shadow-sm
        ${baseStyles}
        ${hover ? "hover:shadow-xl hover:shadow-gray-900/5 hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer" : ""}
        ${gradient ? "bg-gradient-to-br from-white via-white to-gray-50/80" : ""}
        ${paddings[padding]}
        ${className}
      `,
      ...props,
      children
    }
  );
}
function FeatureCard({
  icon,
  title,
  description,
  href,
  className = ""
}) {
  const content = /* @__PURE__ */ jsxs5("div", { className: `group relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1 ${className}`, children: [
    /* @__PURE__ */ jsx27("div", { className: "absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-transparent to-purple-50/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/50 rounded-2xl transition-all duration-300" }),
    /* @__PURE__ */ jsxs5("div", { className: "relative", children: [
      icon && /* @__PURE__ */ jsx27("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-200", children: icon }),
      /* @__PURE__ */ jsx27("h3", { className: "text-lg font-bold text-gray-900 mb-2", children: title }),
      /* @__PURE__ */ jsx27("p", { className: "text-gray-500 leading-relaxed text-sm", children: description }),
      href && /* @__PURE__ */ jsxs5("div", { className: "mt-4 flex items-center gap-1 text-indigo-600 font-medium text-sm group-hover:gap-2 transition-all", children: [
        "Learn more",
        /* @__PURE__ */ jsx27("svg", { className: "w-4 h-4 group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx27("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
      ] })
    ] })
  ] });
  if (href) {
    return /* @__PURE__ */ jsx27("a", { href, children: content });
  }
  return content;
}
function StatsCard({
  label,
  value,
  change,
  changeType = "neutral",
  icon,
  className = ""
}) {
  const changeColors = {
    positive: "text-emerald-600 bg-emerald-50 border border-emerald-100",
    negative: "text-red-600 bg-red-50 border border-red-100",
    neutral: "text-gray-600 bg-gray-50 border border-gray-100"
  };
  return /* @__PURE__ */ jsxs5("div", { className: `p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${className}`, children: [
    /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx27("span", { className: "text-gray-500 text-sm font-medium", children: label }),
      icon && /* @__PURE__ */ jsx27("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-500", children: icon })
    ] }),
    /* @__PURE__ */ jsx27("div", { className: "text-3xl font-bold text-gray-900 mb-2 tracking-tight", children: value }),
    change && /* @__PURE__ */ jsxs5("span", { className: `inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${changeColors[changeType]}`, children: [
      changeType === "positive" && /* @__PURE__ */ jsx27("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx27("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M7 11l5-5m0 0l5 5m-5-5v12" }) }),
      changeType === "negative" && /* @__PURE__ */ jsx27("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx27("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M17 13l-5 5m0 0l-5-5m5 5V6" }) }),
      change
    ] })
  ] });
}

// components/ui/Input.jsx
import React31, { forwardRef as forwardRef25 } from "react";
import { jsx as jsx28, jsxs as jsxs6 } from "react/jsx-runtime";
var Input = forwardRef25(({
  label,
  type = "text",
  error,
  hint,
  icon,
  iconPosition = "left",
  disabled = false,
  className = "",
  containerClassName = "",
  ...props
}, ref) => {
  return /* @__PURE__ */ jsxs6("div", { className: containerClassName, children: [
    label && /* @__PURE__ */ jsx28("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: label }),
    /* @__PURE__ */ jsxs6("div", { className: "relative", children: [
      icon && iconPosition === "left" && /* @__PURE__ */ jsx28("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", children: icon }),
      /* @__PURE__ */ jsx28(
        "input",
        {
          ref,
          type,
          disabled,
          className: `
            w-full px-4 py-3 rounded-xl border bg-white
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${icon && iconPosition === "left" ? "pl-10" : ""}
            ${icon && iconPosition === "right" ? "pr-10" : ""}
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
            ${className}
          `,
          ...props
        }
      ),
      icon && iconPosition === "right" && /* @__PURE__ */ jsx28("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400", children: icon })
    ] }),
    error && /* @__PURE__ */ jsxs6("p", { className: "mt-1.5 text-sm text-red-600 flex items-center gap-1", children: [
      /* @__PURE__ */ jsx28("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx28("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
      error
    ] }),
    hint && !error && /* @__PURE__ */ jsx28("p", { className: "mt-1.5 text-sm text-gray-500", children: hint })
  ] });
});
Input.displayName = "Input";
var Input_default = Input;
var Textarea = forwardRef25(({
  label,
  error,
  hint,
  rows = 4,
  disabled = false,
  className = "",
  containerClassName = "",
  ...props
}, ref) => {
  return /* @__PURE__ */ jsxs6("div", { className: containerClassName, children: [
    label && /* @__PURE__ */ jsx28("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: label }),
    /* @__PURE__ */ jsx28(
      "textarea",
      {
        ref,
        rows,
        disabled,
        className: `
          w-full px-4 py-3 rounded-xl border bg-white resize-none
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
          ${className}
        `,
        ...props
      }
    ),
    error && /* @__PURE__ */ jsx28("p", { className: "mt-1.5 text-sm text-red-600", children: error }),
    hint && !error && /* @__PURE__ */ jsx28("p", { className: "mt-1.5 text-sm text-gray-500", children: hint })
  ] });
});
Textarea.displayName = "Textarea";
var Select = forwardRef25(({
  label,
  options = [],
  error,
  disabled = false,
  placeholder = "Select an option",
  className = "",
  containerClassName = "",
  ...props
}, ref) => {
  return /* @__PURE__ */ jsxs6("div", { className: containerClassName, children: [
    label && /* @__PURE__ */ jsx28("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: label }),
    /* @__PURE__ */ jsxs6("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs6(
        "select",
        {
          ref,
          disabled,
          className: `
            w-full px-4 py-3 rounded-xl border bg-white appearance-none cursor-pointer
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
            ${className}
          `,
          ...props,
          children: [
            /* @__PURE__ */ jsx28("option", { value: "", disabled: true, children: placeholder }),
            options.map((option, idx) => /* @__PURE__ */ jsx28("option", { value: option.value, children: option.label }, idx))
          ]
        }
      ),
      /* @__PURE__ */ jsx28("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400", children: /* @__PURE__ */ jsx28("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx28("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }) })
    ] }),
    error && /* @__PURE__ */ jsx28("p", { className: "mt-1.5 text-sm text-red-600", children: error })
  ] });
});
Select.displayName = "Select";
function Toggle({
  label,
  checked,
  onChange,
  disabled = false,
  size = "md",
  className = "",
  ...props
}) {
  const sizes4 = {
    sm: { track: "w-8 h-4", thumb: "w-3 h-3", translate: "translate-x-4" },
    md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5" },
    lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7" }
  };
  const s = sizes4[size];
  return /* @__PURE__ */ jsxs6("label", { className: `inline-flex items-center gap-3 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`, children: [
    /* @__PURE__ */ jsxs6("div", { className: "relative", children: [
      /* @__PURE__ */ jsx28(
        "input",
        {
          type: "checkbox",
          checked,
          onChange,
          disabled,
          className: "sr-only peer",
          ...props
        }
      ),
      /* @__PURE__ */ jsx28("div", { className: `${s.track} rounded-full bg-gray-300 peer-checked:bg-indigo-600 transition-colors` }),
      /* @__PURE__ */ jsx28("div", { className: `absolute top-0.5 left-0.5 ${s.thumb} rounded-full bg-white shadow-sm peer-checked:${s.translate} transition-transform` })
    ] }),
    label && /* @__PURE__ */ jsx28("span", { className: "text-gray-700", children: label })
  ] });
}
function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  className = "",
  ...props
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };
  return /* @__PURE__ */ jsxs6("div", { className: `relative ${className}`, children: [
    /* @__PURE__ */ jsx28("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", children: /* @__PURE__ */ jsxs6("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx28("circle", { cx: "11", cy: "11", r: "8" }),
      /* @__PURE__ */ jsx28("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-4.35-4.35" })
    ] }) }),
    /* @__PURE__ */ jsx28(
      "input",
      {
        type: "text",
        value,
        onChange,
        onKeyDown: handleKeyDown,
        placeholder,
        className: "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all",
        ...props
      }
    ),
    value && /* @__PURE__ */ jsx28(
      "button",
      {
        onClick: () => onChange({ target: { value: "" } }),
        className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
        children: /* @__PURE__ */ jsx28("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx28("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
      }
    )
  ] });
}

// components/ui/Alert.jsx
import React33 from "react";

// components/ui/Icons.jsx
import React32 from "react";
import { jsx as jsx29, jsxs as jsxs7 } from "react/jsx-runtime";
var Icon2 = ({ children, size = 24, className = "", ...props }) => /* @__PURE__ */ jsx29(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    ...props,
    children
  }
);
var ArrowRight = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M5 12h14M12 5l7 7-7 7" }) });
var ChevronDown = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M6 9l6 6 6-6" }) });
var Check = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M20 6L9 17l-5-5" }) });
var X = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M18 6L6 18M6 6l12 12" }) });
var Search = (props) => /* @__PURE__ */ jsxs7(Icon2, { ...props, children: [
  /* @__PURE__ */ jsx29("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ jsx29("path", { d: "M21 21l-4.35-4.35" })
] });
var Settings = (props) => /* @__PURE__ */ jsxs7(Icon2, { ...props, children: [
  /* @__PURE__ */ jsx29("circle", { cx: "12", cy: "12", r: "3" }),
  /* @__PURE__ */ jsx29("path", { d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" })
] });
var User = (props) => /* @__PURE__ */ jsxs7(Icon2, { ...props, children: [
  /* @__PURE__ */ jsx29("path", { d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" }),
  /* @__PURE__ */ jsx29("circle", { cx: "12", cy: "7", r: "4" })
] });
var Mail = (props) => /* @__PURE__ */ jsxs7(Icon2, { ...props, children: [
  /* @__PURE__ */ jsx29("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
  /* @__PURE__ */ jsx29("path", { d: "M22 6l-10 7L2 6" })
] });
var Bell = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" }) });
var Heart = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" }) });
var Star = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) });
var Zap = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" }) });
var Shield = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }) });
var Globe = (props) => /* @__PURE__ */ jsxs7(Icon2, { ...props, children: [
  /* @__PURE__ */ jsx29("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx29("path", { d: "M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" })
] });
var Code = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M16 18l6-6-6-6M8 6l-6 6 6 6" }) });
var Database = (props) => /* @__PURE__ */ jsxs7(Icon2, { ...props, children: [
  /* @__PURE__ */ jsx29("ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }),
  /* @__PURE__ */ jsx29("path", { d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" }),
  /* @__PURE__ */ jsx29("path", { d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" })
] });
var Github = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" }) });
var AlertCircle = (props) => /* @__PURE__ */ jsxs7(Icon2, { ...props, children: [
  /* @__PURE__ */ jsx29("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx29("path", { d: "M12 8v4M12 16h.01" })
] });
var AlertTriangle = (props) => /* @__PURE__ */ jsx29(Icon2, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" }) });
var CheckCircle = (props) => /* @__PURE__ */ jsxs7(Icon2, { ...props, children: [
  /* @__PURE__ */ jsx29("path", { d: "M22 11.08V12a10 10 0 11-5.93-9.14" }),
  /* @__PURE__ */ jsx29("path", { d: "M22 4L12 14.01l-3-3" })
] });
var Info = (props) => /* @__PURE__ */ jsxs7(Icon2, { ...props, children: [
  /* @__PURE__ */ jsx29("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx29("path", { d: "M12 16v-4M12 8h.01" })
] });
var Rocket = (props) => /* @__PURE__ */ jsxs7(Icon2, { ...props, children: [
  /* @__PURE__ */ jsx29("path", { d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" }),
  /* @__PURE__ */ jsx29("path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" })
] });

// components/ui/Alert.jsx
import { jsx as jsx30, jsxs as jsxs8 } from "react/jsx-runtime";
var variants3 = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    icon: /* @__PURE__ */ jsx30(CheckCircle, { className: "text-green-500", size: 20 })
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: /* @__PURE__ */ jsx30(AlertCircle, { className: "text-red-500", size: 20 })
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    icon: /* @__PURE__ */ jsx30(AlertTriangle, { className: "text-yellow-500", size: 20 })
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: /* @__PURE__ */ jsx30(Info, { className: "text-blue-500", size: 20 })
  }
};
function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  actions,
  className = ""
}) {
  const v = variants3[variant];
  return /* @__PURE__ */ jsx30("div", { className: `${v.bg} ${v.border} border rounded-xl p-4 ${className}`, children: /* @__PURE__ */ jsxs8("div", { className: "flex gap-3", children: [
    /* @__PURE__ */ jsx30("div", { className: "flex-shrink-0", children: icon || v.icon }),
    /* @__PURE__ */ jsxs8("div", { className: "flex-1 min-w-0", children: [
      title && /* @__PURE__ */ jsx30("h4", { className: `font-semibold ${v.text} mb-1`, children: title }),
      /* @__PURE__ */ jsx30("div", { className: `text-sm ${v.text} opacity-90`, children }),
      actions && /* @__PURE__ */ jsx30("div", { className: "mt-3 flex gap-2", children: actions })
    ] }),
    dismissible && /* @__PURE__ */ jsx30(
      "button",
      {
        onClick: onDismiss,
        className: `flex-shrink-0 ${v.text} opacity-60 hover:opacity-100 transition-opacity`,
        children: /* @__PURE__ */ jsx30(X, { size: 20 })
      }
    )
  ] }) });
}

// components/ui/Tabs.jsx
import React34, { useState } from "react";
import { jsx as jsx31, jsxs as jsxs9 } from "react/jsx-runtime";
function Tabs({
  tabs,
  defaultTab = 0,
  onChange,
  variant = "default",
  fullWidth = false,
  className = ""
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };
  const variants4 = {
    default: {
      container: "bg-gray-100 p-1 rounded-xl",
      tab: "px-4 py-2 rounded-lg text-sm font-medium transition-all",
      active: "bg-white text-gray-900 shadow-sm",
      inactive: "text-gray-600 hover:text-gray-900"
    },
    underline: {
      container: "border-b border-gray-200",
      tab: "px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px",
      active: "text-indigo-600 border-indigo-600",
      inactive: "text-gray-600 hover:text-gray-900 border-transparent"
    },
    pills: {
      container: "flex gap-2",
      tab: "px-4 py-2 rounded-full text-sm font-medium transition-all",
      active: "bg-indigo-600 text-white",
      inactive: "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }
  };
  const v = variants4[variant];
  return /* @__PURE__ */ jsxs9("div", { className, children: [
    /* @__PURE__ */ jsx31("div", { className: `flex ${fullWidth ? "w-full" : ""} ${v.container}`, children: tabs.map((tab, index) => /* @__PURE__ */ jsx31(
      "button",
      {
        onClick: () => handleTabChange(index),
        className: `
              ${v.tab}
              ${activeTab === index ? v.active : v.inactive}
              ${fullWidth ? "flex-1" : ""}
            `,
        children: /* @__PURE__ */ jsxs9("span", { className: "flex items-center gap-2", children: [
          tab.icon,
          tab.label,
          tab.badge !== void 0 && /* @__PURE__ */ jsx31("span", { className: `
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${activeTab === index ? "bg-white/20" : "bg-gray-200"}
                `, children: tab.badge })
        ] })
      },
      index
    )) }),
    /* @__PURE__ */ jsx31("div", { className: "mt-4", children: tabs[activeTab]?.content })
  ] });
}
function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  className = ""
}) {
  const sizes4 = {
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-2.5 px-5"
  };
  return /* @__PURE__ */ jsx31("div", { className: `inline-flex bg-gray-100 p-1 rounded-xl ${className}`, children: options.map((option, index) => /* @__PURE__ */ jsx31(
    "button",
    {
      onClick: () => onChange(option.value),
      className: `
            ${sizes4[size]} rounded-lg font-medium transition-all
            ${value === option.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}
          `,
      children: option.label
    },
    index
  )) });
}

// components/ui/Avatar.jsx
import React35 from "react";
import { jsx as jsx32, jsxs as jsxs10 } from "react/jsx-runtime";
var sizes3 = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-xl",
  "2xl": "w-20 h-20 text-2xl"
};
var colors = {
  gray: "bg-gray-200 text-gray-600",
  indigo: "bg-indigo-100 text-indigo-600",
  purple: "bg-purple-100 text-purple-600",
  pink: "bg-pink-100 text-pink-600",
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
  red: "bg-red-100 text-red-600"
};
function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  color = "indigo",
  rounded = "full",
  status,
  className = "",
  ...props
}) {
  const roundedClasses = {
    full: "rounded-full",
    lg: "rounded-2xl",
    md: "rounded-xl",
    sm: "rounded-lg"
  };
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500"
  };
  const getInitials = (name2) => {
    if (!name2) return "";
    const parts = name2.split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  return /* @__PURE__ */ jsxs10("div", { className: `relative inline-flex ${className}`, ...props, children: [
    src ? /* @__PURE__ */ jsx32(
      "img",
      {
        src,
        alt: alt || name,
        className: `${sizes3[size]} ${roundedClasses[rounded]} object-cover`
      }
    ) : name ? /* @__PURE__ */ jsx32(
      "div",
      {
        className: `
            ${sizes3[size]} ${roundedClasses[rounded]} ${colors[color]}
            flex items-center justify-center font-semibold
          `,
        children: getInitials(name)
      }
    ) : /* @__PURE__ */ jsx32(
      "div",
      {
        className: `
            ${sizes3[size]} ${roundedClasses[rounded]} ${colors[color]}
            flex items-center justify-center
          `,
        children: /* @__PURE__ */ jsx32(User, { size: size === "xs" ? 12 : size === "sm" ? 16 : 20 })
      }
    ),
    status && /* @__PURE__ */ jsx32(
      "span",
      {
        className: `
            absolute bottom-0 right-0 block rounded-full ring-2 ring-white
            ${statusColors[status]}
            ${size === "xs" || size === "sm" ? "w-2 h-2" : "w-3 h-3"}
          `
      }
    )
  ] });
}
function AvatarGroup({
  avatars,
  max = 5,
  size = "md",
  className = ""
}) {
  const displayed = avatars.slice(0, max);
  const remaining = avatars.length - max;
  return /* @__PURE__ */ jsxs10("div", { className: `flex -space-x-2 ${className}`, children: [
    displayed.map((avatar, index) => /* @__PURE__ */ jsx32(
      Avatar,
      {
        ...avatar,
        size,
        className: "ring-2 ring-white"
      },
      index
    )),
    remaining > 0 && /* @__PURE__ */ jsxs10(
      "div",
      {
        className: `
            ${sizes3[size]} rounded-full bg-gray-200 text-gray-600
            flex items-center justify-center font-semibold ring-2 ring-white
          `,
        children: [
          "+",
          remaining
        ]
      }
    )
  ] });
}

// components/ui/Progress.jsx
import React36 from "react";
import { jsx as jsx33, jsxs as jsxs11 } from "react/jsx-runtime";
function Progress({
  value = 0,
  max = 100,
  size = "md",
  variant = "primary",
  showLabel = false,
  animated = false,
  className = ""
}) {
  const percentage = Math.min(Math.max(value / max * 100, 0), 100);
  const sizes4 = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
    xl: "h-4"
  };
  const variants4 = {
    primary: "bg-indigo-600",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    gradient: "bg-gradient-to-r from-indigo-500 to-purple-500"
  };
  return /* @__PURE__ */ jsxs11("div", { className, children: [
    showLabel && /* @__PURE__ */ jsxs11("div", { className: "flex justify-between mb-1", children: [
      /* @__PURE__ */ jsx33("span", { className: "text-sm font-medium text-gray-700", children: "Progress" }),
      /* @__PURE__ */ jsxs11("span", { className: "text-sm font-medium text-gray-700", children: [
        Math.round(percentage),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx33("div", { className: `w-full bg-gray-200 rounded-full overflow-hidden ${sizes4[size]}`, children: /* @__PURE__ */ jsx33(
      "div",
      {
        className: `
            ${sizes4[size]} ${variants4[variant]} rounded-full
            transition-all duration-500 ease-out
            ${animated ? "animate-pulse" : ""}
          `,
        style: { width: `${percentage}%` }
      }
    ) })
  ] });
}
function CircularProgress({
  value = 0,
  max = 100,
  size = 100,
  strokeWidth = 8,
  variant = "primary",
  showLabel = true,
  className = ""
}) {
  const percentage = Math.min(Math.max(value / max * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - percentage / 100 * circumference;
  const variants4 = {
    primary: "text-indigo-600",
    success: "text-green-500",
    warning: "text-yellow-500",
    danger: "text-red-500"
  };
  return /* @__PURE__ */ jsxs11("div", { className: `relative inline-flex items-center justify-center ${className}`, children: [
    /* @__PURE__ */ jsxs11("svg", { width: size, height: size, className: "-rotate-90", children: [
      /* @__PURE__ */ jsx33(
        "circle",
        {
          cx: size / 2,
          cy: size / 2,
          r: radius,
          strokeWidth,
          stroke: "currentColor",
          fill: "transparent",
          className: "text-gray-200"
        }
      ),
      /* @__PURE__ */ jsx33(
        "circle",
        {
          cx: size / 2,
          cy: size / 2,
          r: radius,
          strokeWidth,
          stroke: "currentColor",
          fill: "transparent",
          strokeLinecap: "round",
          strokeDasharray: circumference,
          strokeDashoffset,
          className: `${variants4[variant]} transition-all duration-500 ease-out`
        }
      )
    ] }),
    showLabel && /* @__PURE__ */ jsxs11("span", { className: "absolute text-lg font-semibold text-gray-900", children: [
      Math.round(percentage),
      "%"
    ] })
  ] });
}
function Steps({
  steps,
  currentStep = 0,
  variant = "default",
  className = ""
}) {
  const variants4 = {
    default: {
      active: "bg-indigo-600 text-white",
      completed: "bg-indigo-600 text-white",
      pending: "bg-gray-200 text-gray-500",
      line: "bg-indigo-600",
      lineInactive: "bg-gray-200"
    },
    numbered: {
      active: "bg-indigo-600 text-white",
      completed: "bg-green-500 text-white",
      pending: "bg-gray-200 text-gray-500",
      line: "bg-green-500",
      lineInactive: "bg-gray-200"
    }
  };
  const v = variants4[variant];
  return /* @__PURE__ */ jsx33("div", { className: `flex items-center ${className}`, children: steps.map((step, index) => /* @__PURE__ */ jsxs11(React36.Fragment, { children: [
    /* @__PURE__ */ jsxs11("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx33(
        "div",
        {
          className: `
                w-10 h-10 rounded-full flex items-center justify-center font-semibold
                transition-all duration-300
                ${index < currentStep ? v.completed : index === currentStep ? v.active : v.pending}
              `,
          children: index < currentStep ? /* @__PURE__ */ jsx33("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx33("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) : index + 1
        }
      ),
      step.label && /* @__PURE__ */ jsx33("span", { className: `mt-2 text-sm font-medium ${index <= currentStep ? "text-gray-900" : "text-gray-500"}`, children: step.label })
    ] }),
    index < steps.length - 1 && /* @__PURE__ */ jsx33("div", { className: `flex-1 h-1 mx-2 rounded ${index < currentStep ? v.line : v.lineInactive}` })
  ] }, index)) });
}
function Spinner({
  size = "md",
  className = ""
}) {
  const sizes4 = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };
  return /* @__PURE__ */ jsxs11(
    "svg",
    {
      className: `animate-spin ${sizes4[size]} text-indigo-600 ${className}`,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsx33(
          "circle",
          {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ jsx33(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          }
        )
      ]
    }
  );
}

// components/ui/Accordion.jsx
import React37, { useState as useState2 } from "react";
import { jsx as jsx34, jsxs as jsxs12 } from "react/jsx-runtime";
function FAQAccordion({
  items,
  className = ""
}) {
  const [openIndex, setOpenIndex] = useState2(null);
  return /* @__PURE__ */ jsx34("div", { className: `space-y-4 ${className}`, children: items.map((item, index) => /* @__PURE__ */ jsxs12(
    "div",
    {
      className: `
            bg-white rounded-xl border transition-all duration-200
            ${openIndex === index ? "border-indigo-200 shadow-lg" : "border-gray-200"}
          `,
      children: [
        /* @__PURE__ */ jsxs12(
          "button",
          {
            onClick: () => setOpenIndex(openIndex === index ? null : index),
            className: "w-full flex items-center justify-between gap-4 p-5 text-left",
            children: [
              /* @__PURE__ */ jsx34("span", { className: "font-semibold text-gray-900", children: item.question }),
              /* @__PURE__ */ jsx34(
                "div",
                {
                  className: `
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                transition-colors duration-200
                ${openIndex === index ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-400"}
              `,
                  children: /* @__PURE__ */ jsx34(
                    ChevronDown,
                    {
                      size: 18,
                      className: `transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx34(
          "div",
          {
            className: `
              overflow-hidden transition-all duration-300 ease-in-out
              ${openIndex === index ? "max-h-96" : "max-h-0"}
            `,
            children: /* @__PURE__ */ jsx34("div", { className: "px-5 pb-5 text-gray-600 leading-relaxed", children: item.answer })
          }
        )
      ]
    },
    index
  )) });
}

// components/ui/Tooltip.jsx
import React38, { useState as useState3, useRef, useEffect } from "react";
import { jsx as jsx35, jsxs as jsxs13 } from "react/jsx-runtime";
function Tooltip({
  children,
  content,
  position = "top",
  delay = 200,
  className = ""
}) {
  const [isVisible, setIsVisible] = useState3(false);
  const timeoutRef = useRef(null);
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };
  const arrows = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900",
    left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900",
    right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900"
  };
  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };
  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);
  return /* @__PURE__ */ jsxs13(
    "div",
    {
      className: `relative inline-flex ${className}`,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        children,
        isVisible && /* @__PURE__ */ jsxs13(
          "div",
          {
            className: `
            absolute z-50 ${positions[position]}
            px-3 py-2 text-sm text-white bg-gray-900 rounded-lg
            whitespace-nowrap animate-tooltip
          `,
            children: [
              content,
              /* @__PURE__ */ jsx35(
                "span",
                {
                  className: `absolute ${arrows[position]} border-4`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx35("style", { jsx: true, children: `
        @keyframes tooltip {
          from {
            opacity: 0;
            transform: translateX(-50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
        }
        .animate-tooltip {
          animation: tooltip 0.15s ease-out;
        }
      ` })
      ]
    }
  );
}

// pages/components.jsx
import { jsx as jsx36, jsxs as jsxs14 } from "react/jsx-runtime";
var Section = ({ title, description, children }) => /* @__PURE__ */ jsxs14("section", { className: "mb-20", children: [
  /* @__PURE__ */ jsxs14("div", { className: "mb-8", children: [
    /* @__PURE__ */ jsx36("h2", { className: "text-2xl font-bold text-gray-900 tracking-tight", children: title }),
    description && /* @__PURE__ */ jsx36("p", { className: "text-gray-500 mt-2", children: description })
  ] }),
  children
] });
function Components() {
  const [inputValue, setInputValue] = useState4("");
  const [toggleValue, setToggleValue] = useState4(false);
  const [searchValue, setSearchValue] = useState4("");
  const [activeSegment, setActiveSegment] = useState4("all");
  const faqItems = [
    { question: "How do I install INDJS?", answer: "Run npx indjs create my-app in your terminal to create a new INDJS project." },
    { question: "Can I use TypeScript?", answer: "Yes! INDJS has first-class TypeScript support out of the box." },
    { question: "Is INDJS production ready?", answer: "Absolutely! INDJS is used in production by many companies." }
  ];
  return /* @__PURE__ */ jsxs14("div", { className: "min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-gray-50", children: [
    /* @__PURE__ */ jsxs14("section", { className: "relative overflow-hidden bg-white border-b border-gray-100", children: [
      /* @__PURE__ */ jsx36("div", { className: "absolute inset-0 bg-grid-pattern opacity-40" }),
      /* @__PURE__ */ jsx36("div", { className: "absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-100/60 via-purple-100/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" }),
      /* @__PURE__ */ jsx36("div", { className: "absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-100/50 via-blue-100/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" }),
      /* @__PURE__ */ jsx36("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28", children: /* @__PURE__ */ jsxs14("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxs14("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6", children: [
          /* @__PURE__ */ jsxs14("span", { className: "relative flex h-2 w-2", children: [
            /* @__PURE__ */ jsx36("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" }),
            /* @__PURE__ */ jsx36("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-indigo-500" })
          ] }),
          /* @__PURE__ */ jsx36("span", { className: "text-sm font-semibold text-indigo-700", children: "50+ Components" })
        ] }),
        /* @__PURE__ */ jsxs14("h1", { className: "text-5xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight", children: [
          "UI Component",
          /* @__PURE__ */ jsx36("span", { className: "block gradient-text", children: "Library" })
        ] }),
        /* @__PURE__ */ jsx36("p", { className: "text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed", children: "Beautiful, accessible, and customizable React components. Built with Tailwind CSS and modern design principles." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs14("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20", children: [
      /* @__PURE__ */ jsx36(Section, { title: "Buttons", description: "Interactive button components with multiple variants, sizes, and states.", children: /* @__PURE__ */ jsxs14(Card2, { padding: "lg", className: "space-y-8", children: [
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Variants" }),
          /* @__PURE__ */ jsxs14("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsx36(Button2, { variant: "primary", children: "Primary" }),
            /* @__PURE__ */ jsx36(Button2, { variant: "secondary", children: "Secondary" }),
            /* @__PURE__ */ jsx36(Button2, { variant: "outline", children: "Outline" }),
            /* @__PURE__ */ jsx36(Button2, { variant: "ghost", children: "Ghost" }),
            /* @__PURE__ */ jsx36(Button2, { variant: "danger", children: "Danger" }),
            /* @__PURE__ */ jsx36(Button2, { variant: "gradient", children: "Gradient" }),
            /* @__PURE__ */ jsx36(Button2, { variant: "primary", loading: true, children: "Loading" }),
            /* @__PURE__ */ jsx36(Button2, { variant: "primary", icon: /* @__PURE__ */ jsx36(ArrowRight, { size: 16 }), iconPosition: "right", children: "With Icon" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Sizes" }),
          /* @__PURE__ */ jsxs14("div", { className: "flex flex-wrap items-center gap-4", children: [
            /* @__PURE__ */ jsx36(Button2, { size: "sm", children: "Small" }),
            /* @__PURE__ */ jsx36(Button2, { size: "md", children: "Medium" }),
            /* @__PURE__ */ jsx36(Button2, { size: "lg", children: "Large" }),
            /* @__PURE__ */ jsx36(Button2, { size: "xl", children: "Extra Large" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Icon Buttons" }),
          /* @__PURE__ */ jsxs14("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx36(Tooltip, { content: "Like this!", children: /* @__PURE__ */ jsx36(IconButton, { variant: "ghost", children: /* @__PURE__ */ jsx36(Heart, { size: 20 }) }) }),
            /* @__PURE__ */ jsx36(Tooltip, { content: "Star it!", children: /* @__PURE__ */ jsx36(IconButton, { variant: "ghost", children: /* @__PURE__ */ jsx36(Star, { size: 20 }) }) }),
            /* @__PURE__ */ jsx36(Tooltip, { content: "Settings", children: /* @__PURE__ */ jsx36(IconButton, { variant: "ghost", children: /* @__PURE__ */ jsx36(Settings, { size: 20 }) }) }),
            /* @__PURE__ */ jsx36(Tooltip, { content: "Notifications", children: /* @__PURE__ */ jsx36(IconButton, { variant: "secondary", children: /* @__PURE__ */ jsx36(Bell, { size: 20 }) }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx36(Section, { title: "Badges", description: "Status indicators and labels for categorization.", children: /* @__PURE__ */ jsxs14(Card2, { padding: "lg", className: "space-y-8", children: [
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Variants" }),
          /* @__PURE__ */ jsxs14("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsx36(Badge, { variant: "default", children: "Default" }),
            /* @__PURE__ */ jsx36(Badge, { variant: "primary", children: "Primary" }),
            /* @__PURE__ */ jsx36(Badge, { variant: "secondary", children: "Secondary" }),
            /* @__PURE__ */ jsx36(Badge, { variant: "success", children: "Success" }),
            /* @__PURE__ */ jsx36(Badge, { variant: "warning", children: "Warning" }),
            /* @__PURE__ */ jsx36(Badge, { variant: "danger", children: "Danger" }),
            /* @__PURE__ */ jsx36(Badge, { variant: "info", children: "Info" }),
            /* @__PURE__ */ jsx36(Badge, { variant: "gradient", children: "Gradient" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "With Features" }),
          /* @__PURE__ */ jsxs14("div", { className: "flex flex-wrap items-center gap-4", children: [
            /* @__PURE__ */ jsx36(Badge, { variant: "success", dot: true, children: "With Dot" }),
            /* @__PURE__ */ jsx36(Badge, { variant: "primary", icon: /* @__PURE__ */ jsx36(Zap, { size: 14 }), children: "With Icon" }),
            /* @__PURE__ */ jsx36(Badge, { variant: "danger", removable: true, onRemove: () => {
            }, children: "Removable" }),
            /* @__PURE__ */ jsx36(StatusBadge, { status: "online" }),
            /* @__PURE__ */ jsx36(StatusBadge, { status: "away" }),
            /* @__PURE__ */ jsx36(StatusBadge, { status: "busy" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs14(Section, { title: "Cards", description: "Container components for grouping related content.", children: [
        /* @__PURE__ */ jsxs14("div", { className: "grid md:grid-cols-3 gap-6 mb-8", children: [
          /* @__PURE__ */ jsx36(
            FeatureCard,
            {
              icon: /* @__PURE__ */ jsx36(Zap, { size: 24 }),
              title: "Lightning Fast",
              description: "Built on esbuild for instant HMR and sub-second builds.",
              href: "#"
            }
          ),
          /* @__PURE__ */ jsx36(
            FeatureCard,
            {
              icon: /* @__PURE__ */ jsx36(Shield, { size: 24 }),
              title: "Secure by Default",
              description: "Built-in security features and authentication.",
              href: "#"
            }
          ),
          /* @__PURE__ */ jsx36(
            FeatureCard,
            {
              icon: /* @__PURE__ */ jsx36(Globe, { size: 24 }),
              title: "Universal Platform",
              description: "Deploy to Web, Desktop, and Mobile.",
              href: "#"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs14("div", { className: "grid md:grid-cols-4 gap-6", children: [
          /* @__PURE__ */ jsx36(
            StatsCard,
            {
              label: "Total Users",
              value: "12,345",
              change: "+12.5%",
              changeType: "positive",
              icon: /* @__PURE__ */ jsx36(Globe, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsx36(
            StatsCard,
            {
              label: "Revenue",
              value: "$45,678",
              change: "+8.2%",
              changeType: "positive",
              icon: /* @__PURE__ */ jsx36(Star, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsx36(
            StatsCard,
            {
              label: "Bounce Rate",
              value: "23.4%",
              change: "-2.1%",
              changeType: "positive",
              icon: /* @__PURE__ */ jsx36(Rocket, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsx36(
            StatsCard,
            {
              label: "Avg. Time",
              value: "4m 32s",
              change: "+0.3%",
              changeType: "neutral",
              icon: /* @__PURE__ */ jsx36(Code, { size: 20 })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx36(Section, { title: "Form Inputs", description: "Text fields, toggles, and other input components.", children: /* @__PURE__ */ jsxs14(Card2, { padding: "lg", className: "space-y-8", children: [
        /* @__PURE__ */ jsxs14("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsx36(
            Input_default,
            {
              label: "Email Address",
              placeholder: "you@example.com",
              icon: /* @__PURE__ */ jsx36(Mail, { size: 20 }),
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value)
            }
          ),
          /* @__PURE__ */ jsx36(
            Input_default,
            {
              label: "Password",
              type: "password",
              placeholder: "Enter password",
              hint: "Must be at least 8 characters"
            }
          ),
          /* @__PURE__ */ jsx36(
            Input_default,
            {
              label: "With Error",
              placeholder: "Enter value",
              error: "This field is required"
            }
          ),
          /* @__PURE__ */ jsx36(
            SearchInput,
            {
              value: searchValue,
              onChange: (e) => setSearchValue(e.target.value),
              placeholder: "Search components..."
            }
          )
        ] }),
        /* @__PURE__ */ jsx36("div", { children: /* @__PURE__ */ jsx36(
          Textarea,
          {
            label: "Message",
            placeholder: "Write your message here...",
            rows: 3
          }
        ) }),
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Toggle Switches" }),
          /* @__PURE__ */ jsxs14("div", { className: "flex flex-wrap items-center gap-8", children: [
            /* @__PURE__ */ jsx36(
              Toggle,
              {
                label: "Enable notifications",
                checked: toggleValue,
                onChange: (e) => setToggleValue(e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx36(
              Toggle,
              {
                label: "Dark mode",
                checked: false,
                onChange: () => {
                },
                size: "sm"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx36(Section, { title: "Alerts", description: "Contextual feedback messages for user actions.", children: /* @__PURE__ */ jsxs14("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx36(Alert, { variant: "success", title: "Success!", dismissible: true, children: "Your changes have been saved successfully." }),
        /* @__PURE__ */ jsx36(Alert, { variant: "error", title: "Error", children: "Something went wrong. Please try again." }),
        /* @__PURE__ */ jsx36(Alert, { variant: "warning", title: "Warning", children: "Your session will expire in 5 minutes." }),
        /* @__PURE__ */ jsx36(Alert, { variant: "info", title: "Information", children: "A new version is available. Refresh to update." })
      ] }) }),
      /* @__PURE__ */ jsx36(Section, { title: "Tabs & Segmented Control", description: "Organize content into switchable panels.", children: /* @__PURE__ */ jsxs14(Card2, { padding: "lg", className: "space-y-10", children: [
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Tabs" }),
          /* @__PURE__ */ jsx36(
            Tabs,
            {
              tabs: [
                { label: "Overview", icon: /* @__PURE__ */ jsx36(Globe, { size: 16 }), content: /* @__PURE__ */ jsx36("p", { className: "text-gray-600 py-4", children: "Overview content goes here. This tab contains general information." }) },
                { label: "Features", icon: /* @__PURE__ */ jsx36(Zap, { size: 16 }), content: /* @__PURE__ */ jsx36("p", { className: "text-gray-600 py-4", children: "Features content goes here. Explore all available features." }) },
                { label: "Pricing", icon: /* @__PURE__ */ jsx36(Star, { size: 16 }), badge: "New", content: /* @__PURE__ */ jsx36("p", { className: "text-gray-600 py-4", children: "Pricing content goes here. View our pricing plans." }) }
              ],
              variant: "default"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Segmented Control" }),
          /* @__PURE__ */ jsx36(
            SegmentedControl,
            {
              options: [
                { label: "All", value: "all" },
                { label: "Active", value: "active" },
                { label: "Archived", value: "archived" }
              ],
              value: activeSegment,
              onChange: setActiveSegment
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx36(Section, { title: "Avatars", description: "User profile images and groups.", children: /* @__PURE__ */ jsxs14(Card2, { padding: "lg", className: "space-y-8", children: [
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Sizes & Variants" }),
          /* @__PURE__ */ jsxs14("div", { className: "flex flex-wrap items-end gap-4", children: [
            /* @__PURE__ */ jsx36(Avatar, { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", size: "xs" }),
            /* @__PURE__ */ jsx36(Avatar, { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", size: "sm" }),
            /* @__PURE__ */ jsx36(Avatar, { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", size: "md" }),
            /* @__PURE__ */ jsx36(Avatar, { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", size: "lg" }),
            /* @__PURE__ */ jsx36(Avatar, { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", size: "xl" }),
            /* @__PURE__ */ jsx36(Avatar, { name: "John Doe", size: "lg", color: "indigo" }),
            /* @__PURE__ */ jsx36(Avatar, { name: "Jane Smith", size: "lg", color: "pink" }),
            /* @__PURE__ */ jsx36(Avatar, { size: "lg", status: "online" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Avatar Group" }),
          /* @__PURE__ */ jsx36(
            AvatarGroup,
            {
              avatars: [
                { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
                { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
                { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
                { name: "Alex Kim" },
                { name: "Sarah Johnson" },
                { name: "Mike Brown" }
              ],
              max: 4,
              size: "md"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx36(Section, { title: "Progress & Loading", description: "Visual indicators for progress and loading states.", children: /* @__PURE__ */ jsxs14(Card2, { padding: "lg", className: "space-y-10", children: [
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Progress Bars" }),
          /* @__PURE__ */ jsxs14("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx36(Progress, { value: 25, variant: "primary", showLabel: true }),
            /* @__PURE__ */ jsx36(Progress, { value: 50, variant: "success" }),
            /* @__PURE__ */ jsx36(Progress, { value: 75, variant: "gradient", size: "lg" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Circular & Spinners" }),
          /* @__PURE__ */ jsxs14("div", { className: "flex items-center gap-8", children: [
            /* @__PURE__ */ jsx36(CircularProgress, { value: 65 }),
            /* @__PURE__ */ jsx36(CircularProgress, { value: 85, variant: "success" }),
            /* @__PURE__ */ jsx36(Spinner, { size: "lg" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx36("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-wider mb-4", children: "Steps" }),
          /* @__PURE__ */ jsx36(
            Steps,
            {
              steps: [
                { label: "Account" },
                { label: "Details" },
                { label: "Payment" },
                { label: "Complete" }
              ],
              currentStep: 2
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx36(Section, { title: "FAQ Accordion", description: "Expandable content sections for FAQs and more.", children: /* @__PURE__ */ jsx36(FAQAccordion, { items: faqItems }) }),
      /* @__PURE__ */ jsx36(Section, { title: "SVG Icons", description: "70+ crisp SVG icons for every use case.", children: /* @__PURE__ */ jsxs14(Card2, { padding: "lg", children: [
        /* @__PURE__ */ jsx36("p", { className: "text-gray-500 mb-6 leading-relaxed", children: "All icons are SVG-based for crisp rendering at any size. Customize color, size, and stroke width." }),
        /* @__PURE__ */ jsx36("div", { className: "grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-15 gap-3", children: [
          Zap,
          Shield,
          Code,
          Database,
          Globe,
          Rocket,
          ArrowRight,
          Check,
          Heart,
          Star,
          Github,
          Mail,
          Bell,
          Search,
          Settings
        ].map((Icon3, idx) => /* @__PURE__ */ jsx36(
          "div",
          {
            className: "group flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 cursor-pointer hover:shadow-md hover:shadow-indigo-100 hover:scale-110",
            children: /* @__PURE__ */ jsx36(Icon3, { size: 22, className: "group-hover:scale-110 transition-transform" })
          },
          idx
        )) })
      ] }) }),
      /* @__PURE__ */ jsxs14("section", { className: "relative text-center py-20 mt-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsx36("div", { className: "absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl mx-4" }),
        /* @__PURE__ */ jsx36("div", { className: "absolute inset-0 bg-grid-pattern opacity-30 rounded-3xl mx-4" }),
        /* @__PURE__ */ jsxs14("div", { className: "relative", children: [
          /* @__PURE__ */ jsx36("h2", { className: "text-4xl font-bold text-gray-900 mb-4 tracking-tight", children: "Ready to build something amazing?" }),
          /* @__PURE__ */ jsx36("p", { className: "text-xl text-gray-500 mb-10 max-w-2xl mx-auto", children: "Start using these components in your INDJS project today." }),
          /* @__PURE__ */ jsxs14("div", { className: "flex flex-wrap justify-center gap-4", children: [
            /* @__PURE__ */ jsx36(Link, { href: "/docs", children: /* @__PURE__ */ jsx36(Button2, { variant: "gradient", size: "lg", icon: /* @__PURE__ */ jsx36(ArrowRight, { size: 18 }), iconPosition: "right", children: "View Documentation" }) }),
            /* @__PURE__ */ jsx36("a", { href: "https://github.com/Rohitsharma6377/IND", target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx36(Button2, { variant: "secondary", size: "lg", icon: /* @__PURE__ */ jsx36(Github, { size: 18 }), children: "GitHub" }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Components as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvY29tcG9uZW50cy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9wbGF0Zm9ybS5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL3VuaXZlcnNhbC9yZXNvbHZlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9zdHlsZS1zaGVldC5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2xpbmsuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy92aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdGV4dC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3Njcm9sbC12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdGV4dC1pbnB1dC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2J1dHRvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5LWluZGljYXRvci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N3aXRjaC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ZsYXQtbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RvdWNoYWJsZS1vcGFjaXR5LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvcHJlc3NhYmxlLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaW1hZ2UtYmFja2dyb3VuZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL21vZGFsLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc2FmZS1hcmVhLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zdGF0dXMtYmFyLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc2VjdGlvbi1saXN0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMva2V5Ym9hcmQtYXZvaWRpbmctdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3JlZnJlc2gtY29udHJvbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RvdWNoYWJsZS1oaWdobGlnaHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtd2l0aG91dC1mZWVkYmFjay5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NjcmVlbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2NhcmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9ncmlkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pY29uLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvZGltZW5zaW9ucy5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2xpbmtpbmcubWpzIiwgIi4uLy4uL2NvbXBvbmVudHMvdWkvQnV0dG9uLmpzeCIsICIuLi8uLi9jb21wb25lbnRzL3VpL0JhZGdlLmpzeCIsICIuLi8uLi9jb21wb25lbnRzL3VpL0NhcmQuanN4IiwgIi4uLy4uL2NvbXBvbmVudHMvdWkvSW5wdXQuanN4IiwgIi4uLy4uL2NvbXBvbmVudHMvdWkvQWxlcnQuanN4IiwgIi4uLy4uL2NvbXBvbmVudHMvdWkvSWNvbnMuanN4IiwgIi4uLy4uL2NvbXBvbmVudHMvdWkvVGFicy5qc3giLCAiLi4vLi4vY29tcG9uZW50cy91aS9BdmF0YXIuanN4IiwgIi4uLy4uL2NvbXBvbmVudHMvdWkvUHJvZ3Jlc3MuanN4IiwgIi4uLy4uL2NvbXBvbmVudHMvdWkvQWNjb3JkaW9uLmpzeCIsICIuLi8uLi9jb21wb25lbnRzL3VpL1Rvb2x0aXAuanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdpbmRqcyc7XHJcblxyXG4vLyBJbXBvcnQgVUkgQ29tcG9uZW50c1xyXG5pbXBvcnQgQnV0dG9uLCB7IEljb25CdXR0b24gfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL0J1dHRvbic7XHJcbmltcG9ydCBCYWRnZSwgeyBTdGF0dXNCYWRnZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvQmFkZ2UnO1xyXG5pbXBvcnQgQ2FyZCwgeyBGZWF0dXJlQ2FyZCwgU3RhdHNDYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9DYXJkJztcclxuaW1wb3J0IElucHV0LCB7IFRleHRhcmVhLCBUb2dnbGUsIFNlYXJjaElucHV0IH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9JbnB1dCc7XHJcbmltcG9ydCBBbGVydCBmcm9tICcuLi9jb21wb25lbnRzL3VpL0FsZXJ0JztcclxuaW1wb3J0IFRhYnMsIHsgU2VnbWVudGVkQ29udHJvbCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvVGFicyc7XHJcbmltcG9ydCBBdmF0YXIsIHsgQXZhdGFyR3JvdXAgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL0F2YXRhcic7XHJcbmltcG9ydCBQcm9ncmVzcywgeyBDaXJjdWxhclByb2dyZXNzLCBTdGVwcywgU3Bpbm5lciB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvUHJvZ3Jlc3MnO1xyXG5pbXBvcnQgeyBGQVFBY2NvcmRpb24gfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL0FjY29yZGlvbic7XHJcbmltcG9ydCBUb29sdGlwIGZyb20gJy4uL2NvbXBvbmVudHMvdWkvVG9vbHRpcCc7XHJcbmltcG9ydCB7XHJcbiAgWmFwLCBTaGllbGQsIENvZGUsIERhdGFiYXNlLCBHbG9iZSwgUm9ja2V0LFxyXG4gIEFycm93UmlnaHQsIENoZWNrLCBIZWFydCwgU3RhciwgR2l0aHViLFxyXG4gIE1haWwsIEJlbGwsIFNlYXJjaCwgU2V0dGluZ3NcclxufSBmcm9tICcuLi9jb21wb25lbnRzL3VpL0ljb25zJztcclxuXHJcbi8vIFNlY3Rpb24gd3JhcHBlciBjb21wb25lbnRcclxuY29uc3QgU2VjdGlvbiA9ICh7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2hpbGRyZW4gfSkgPT4gKFxyXG4gIDxzZWN0aW9uIGNsYXNzTmFtZT1cIm1iLTIwXCI+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLThcIj5cclxuICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRyYWNraW5nLXRpZ2h0XCI+e3RpdGxlfTwvaDI+XHJcbiAgICAgIHtkZXNjcmlwdGlvbiAmJiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwIG10LTJcIj57ZGVzY3JpcHRpb259PC9wPn1cclxuICAgIDwvZGl2PlxyXG4gICAge2NoaWxkcmVufVxyXG4gIDwvc2VjdGlvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbXBvbmVudHMoKSB7XHJcbiAgY29uc3QgW2lucHV0VmFsdWUsIHNldElucHV0VmFsdWVdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFt0b2dnbGVWYWx1ZSwgc2V0VG9nZ2xlVmFsdWVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzZWFyY2hWYWx1ZSwgc2V0U2VhcmNoVmFsdWVdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFthY3RpdmVTZWdtZW50LCBzZXRBY3RpdmVTZWdtZW50XSA9IHVzZVN0YXRlKCdhbGwnKTtcclxuXHJcbiAgY29uc3QgZmFxSXRlbXMgPSBbXHJcbiAgICB7IHF1ZXN0aW9uOiAnSG93IGRvIEkgaW5zdGFsbCBJTkRKUz8nLCBhbnN3ZXI6ICdSdW4gbnB4IGluZGpzIGNyZWF0ZSBteS1hcHAgaW4geW91ciB0ZXJtaW5hbCB0byBjcmVhdGUgYSBuZXcgSU5ESlMgcHJvamVjdC4nIH0sXHJcbiAgICB7IHF1ZXN0aW9uOiAnQ2FuIEkgdXNlIFR5cGVTY3JpcHQ/JywgYW5zd2VyOiAnWWVzISBJTkRKUyBoYXMgZmlyc3QtY2xhc3MgVHlwZVNjcmlwdCBzdXBwb3J0IG91dCBvZiB0aGUgYm94LicgfSxcclxuICAgIHsgcXVlc3Rpb246ICdJcyBJTkRKUyBwcm9kdWN0aW9uIHJlYWR5PycsIGFuc3dlcjogJ0Fic29sdXRlbHkhIElOREpTIGlzIHVzZWQgaW4gcHJvZHVjdGlvbiBieSBtYW55IGNvbXBhbmllcy4nIH0sXHJcbiAgXTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYWRpZW50LXRvLWIgZnJvbS13aGl0ZSB2aWEtZ3JheS01MC81MCB0by1ncmF5LTUwXCI+XHJcbiAgICAgIHsvKiBIZXJvICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gYmctd2hpdGUgYm9yZGVyLWIgYm9yZGVyLWdyYXktMTAwXCI+XHJcbiAgICAgICAgey8qIEJhY2tncm91bmQgZGVjb3JhdGlvbiAqL31cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JpZC1wYXR0ZXJuIG9wYWNpdHktNDBcIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgdy1bNjAwcHhdIGgtWzYwMHB4XSBiZy1ncmFkaWVudC10by1ibCBmcm9tLWluZGlnby0xMDAvNjAgdmlhLXB1cnBsZS0xMDAvNDAgdG8tdHJhbnNwYXJlbnQgcm91bmRlZC1mdWxsIGJsdXItM3hsIC10cmFuc2xhdGUteS0xLzIgdHJhbnNsYXRlLXgtMS80XCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMCBsZWZ0LTAgdy1bNDAwcHhdIGgtWzQwMHB4XSBiZy1ncmFkaWVudC10by10ciBmcm9tLWN5YW4tMTAwLzUwIHZpYS1ibHVlLTEwMC8zMCB0by10cmFuc3BhcmVudCByb3VuZGVkLWZ1bGwgYmx1ci0zeGwgdHJhbnNsYXRlLXktMS8yIC10cmFuc2xhdGUteC0xLzRcIj48L2Rpdj5cclxuICAgICAgICBcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHB5LTIwIHNtOnB5LTI4XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMiBiZy1pbmRpZ28tNTAgcm91bmRlZC1mdWxsIG1iLTZcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGgtMiB3LTJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFuaW1hdGUtcGluZyBhYnNvbHV0ZSBpbmxpbmUtZmxleCBoLWZ1bGwgdy1mdWxsIHJvdW5kZWQtZnVsbCBiZy1pbmRpZ28tNDAwIG9wYWNpdHktNzVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBpbmxpbmUtZmxleCByb3VuZGVkLWZ1bGwgaC0yIHctMiBiZy1pbmRpZ28tNTAwXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1pbmRpZ28tNzAwXCI+NTArIENvbXBvbmVudHM8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC01eGwgc206dGV4dC02eGwgZm9udC1ibGFjayB0ZXh0LWdyYXktOTAwIG1iLTYgdHJhY2tpbmctdGlnaHRcIj5cclxuICAgICAgICAgICAgICBVSSBDb21wb25lbnRcclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayBncmFkaWVudC10ZXh0XCI+TGlicmFyeTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9oMT5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14bCB0ZXh0LWdyYXktNTAwIG1heC13LTJ4bCBteC1hdXRvIGxlYWRpbmctcmVsYXhlZFwiPlxyXG4gICAgICAgICAgICAgIEJlYXV0aWZ1bCwgYWNjZXNzaWJsZSwgYW5kIGN1c3RvbWl6YWJsZSBSZWFjdCBjb21wb25lbnRzLiBcclxuICAgICAgICAgICAgICBCdWlsdCB3aXRoIFRhaWx3aW5kIENTUyBhbmQgbW9kZXJuIGRlc2lnbiBwcmluY2lwbGVzLlxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBweS0xNiBzbTpweS0yMFwiPlxyXG4gICAgICAgIHsvKiBCdXR0b25zIFNlY3Rpb24gKi99XHJcbiAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJCdXR0b25zXCIgZGVzY3JpcHRpb249XCJJbnRlcmFjdGl2ZSBidXR0b24gY29tcG9uZW50cyB3aXRoIG11bHRpcGxlIHZhcmlhbnRzLCBzaXplcywgYW5kIHN0YXRlcy5cIj5cclxuICAgICAgICAgIDxDYXJkIHBhZGRpbmc9XCJsZ1wiIGNsYXNzTmFtZT1cInNwYWNlLXktOFwiPlxyXG4gICAgICAgICAgICB7LyogVmFyaWFudHMgKi99XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi00XCI+VmFyaWFudHM8L3A+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtNFwiPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiPlByaW1hcnk8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiPlNlY29uZGFyeTwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwib3V0bGluZVwiPk91dGxpbmU8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cImdob3N0XCI+R2hvc3Q8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cImRhbmdlclwiPkRhbmdlcjwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwiZ3JhZGllbnRcIj5HcmFkaWVudDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIGxvYWRpbmc+TG9hZGluZzwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIGljb249ezxBcnJvd1JpZ2h0IHNpemU9ezE2fSAvPn0gaWNvblBvc2l0aW9uPVwicmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgV2l0aCBJY29uXHJcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB7LyogU2l6ZXMgKi99XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi00XCI+U2l6ZXM8L3A+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTRcIj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gc2l6ZT1cInNtXCI+U21hbGw8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gc2l6ZT1cIm1kXCI+TWVkaXVtPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uIHNpemU9XCJsZ1wiPkxhcmdlPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uIHNpemU9XCJ4bFwiPkV4dHJhIExhcmdlPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgey8qIEljb24gQnV0dG9ucyAqL31cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTRcIj5JY29uIEJ1dHRvbnM8L3A+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxyXG4gICAgICAgICAgICAgICAgPFRvb2x0aXAgY29udGVudD1cIkxpa2UgdGhpcyFcIj5cclxuICAgICAgICAgICAgICAgICAgPEljb25CdXR0b24gdmFyaWFudD1cImdob3N0XCI+PEhlYXJ0IHNpemU9ezIwfSAvPjwvSWNvbkJ1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvVG9vbHRpcD5cclxuICAgICAgICAgICAgICAgIDxUb29sdGlwIGNvbnRlbnQ9XCJTdGFyIGl0IVwiPlxyXG4gICAgICAgICAgICAgICAgICA8SWNvbkJ1dHRvbiB2YXJpYW50PVwiZ2hvc3RcIj48U3RhciBzaXplPXsyMH0gLz48L0ljb25CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L1Rvb2x0aXA+XHJcbiAgICAgICAgICAgICAgICA8VG9vbHRpcCBjb250ZW50PVwiU2V0dGluZ3NcIj5cclxuICAgICAgICAgICAgICAgICAgPEljb25CdXR0b24gdmFyaWFudD1cImdob3N0XCI+PFNldHRpbmdzIHNpemU9ezIwfSAvPjwvSWNvbkJ1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvVG9vbHRpcD5cclxuICAgICAgICAgICAgICAgIDxUb29sdGlwIGNvbnRlbnQ9XCJOb3RpZmljYXRpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxJY29uQnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIj48QmVsbCBzaXplPXsyMH0gLz48L0ljb25CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L1Rvb2x0aXA+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9DYXJkPlxyXG4gICAgICAgIDwvU2VjdGlvbj5cclxuXHJcbiAgICAgICAgey8qIEJhZGdlcyBTZWN0aW9uICovfVxyXG4gICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiQmFkZ2VzXCIgZGVzY3JpcHRpb249XCJTdGF0dXMgaW5kaWNhdG9ycyBhbmQgbGFiZWxzIGZvciBjYXRlZ29yaXphdGlvbi5cIj5cclxuICAgICAgICAgIDxDYXJkIHBhZGRpbmc9XCJsZ1wiIGNsYXNzTmFtZT1cInNwYWNlLXktOFwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItNFwiPlZhcmlhbnRzPC9wPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTNcIj5cclxuICAgICAgICAgICAgICAgIDxCYWRnZSB2YXJpYW50PVwiZGVmYXVsdFwiPkRlZmF1bHQ8L0JhZGdlPlxyXG4gICAgICAgICAgICAgICAgPEJhZGdlIHZhcmlhbnQ9XCJwcmltYXJ5XCI+UHJpbWFyeTwvQmFkZ2U+XHJcbiAgICAgICAgICAgICAgICA8QmFkZ2UgdmFyaWFudD1cInNlY29uZGFyeVwiPlNlY29uZGFyeTwvQmFkZ2U+XHJcbiAgICAgICAgICAgICAgICA8QmFkZ2UgdmFyaWFudD1cInN1Y2Nlc3NcIj5TdWNjZXNzPC9CYWRnZT5cclxuICAgICAgICAgICAgICAgIDxCYWRnZSB2YXJpYW50PVwid2FybmluZ1wiPldhcm5pbmc8L0JhZGdlPlxyXG4gICAgICAgICAgICAgICAgPEJhZGdlIHZhcmlhbnQ9XCJkYW5nZXJcIj5EYW5nZXI8L0JhZGdlPlxyXG4gICAgICAgICAgICAgICAgPEJhZGdlIHZhcmlhbnQ9XCJpbmZvXCI+SW5mbzwvQmFkZ2U+XHJcbiAgICAgICAgICAgICAgICA8QmFkZ2UgdmFyaWFudD1cImdyYWRpZW50XCI+R3JhZGllbnQ8L0JhZGdlPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTRcIj5XaXRoIEZlYXR1cmVzPC9wPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC00XCI+XHJcbiAgICAgICAgICAgICAgICA8QmFkZ2UgdmFyaWFudD1cInN1Y2Nlc3NcIiBkb3Q+V2l0aCBEb3Q8L0JhZGdlPlxyXG4gICAgICAgICAgICAgICAgPEJhZGdlIHZhcmlhbnQ9XCJwcmltYXJ5XCIgaWNvbj17PFphcCBzaXplPXsxNH0gLz59PldpdGggSWNvbjwvQmFkZ2U+XHJcbiAgICAgICAgICAgICAgICA8QmFkZ2UgdmFyaWFudD1cImRhbmdlclwiIHJlbW92YWJsZSBvblJlbW92ZT17KCkgPT4ge319PlJlbW92YWJsZTwvQmFkZ2U+XHJcbiAgICAgICAgICAgICAgICA8U3RhdHVzQmFkZ2Ugc3RhdHVzPVwib25saW5lXCIgLz5cclxuICAgICAgICAgICAgICAgIDxTdGF0dXNCYWRnZSBzdGF0dXM9XCJhd2F5XCIgLz5cclxuICAgICAgICAgICAgICAgIDxTdGF0dXNCYWRnZSBzdGF0dXM9XCJidXN5XCIgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICAgPC9TZWN0aW9uPlxyXG5cclxuICAgICAgICB7LyogQ2FyZHMgU2VjdGlvbiAqL31cclxuICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIkNhcmRzXCIgZGVzY3JpcHRpb249XCJDb250YWluZXIgY29tcG9uZW50cyBmb3IgZ3JvdXBpbmcgcmVsYXRlZCBjb250ZW50LlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIG1kOmdyaWQtY29scy0zIGdhcC02IG1iLThcIj5cclxuICAgICAgICAgICAgPEZlYXR1cmVDYXJkXHJcbiAgICAgICAgICAgICAgaWNvbj17PFphcCBzaXplPXsyNH0gLz59XHJcbiAgICAgICAgICAgICAgdGl0bGU9XCJMaWdodG5pbmcgRmFzdFwiXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJCdWlsdCBvbiBlc2J1aWxkIGZvciBpbnN0YW50IEhNUiBhbmQgc3ViLXNlY29uZCBidWlsZHMuXCJcclxuICAgICAgICAgICAgICBocmVmPVwiI1wiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxGZWF0dXJlQ2FyZFxyXG4gICAgICAgICAgICAgIGljb249ezxTaGllbGQgc2l6ZT17MjR9IC8+fVxyXG4gICAgICAgICAgICAgIHRpdGxlPVwiU2VjdXJlIGJ5IERlZmF1bHRcIlxyXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiQnVpbHQtaW4gc2VjdXJpdHkgZmVhdHVyZXMgYW5kIGF1dGhlbnRpY2F0aW9uLlwiXHJcbiAgICAgICAgICAgICAgaHJlZj1cIiNcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8RmVhdHVyZUNhcmRcclxuICAgICAgICAgICAgICBpY29uPXs8R2xvYmUgc2l6ZT17MjR9IC8+fVxyXG4gICAgICAgICAgICAgIHRpdGxlPVwiVW5pdmVyc2FsIFBsYXRmb3JtXCJcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIkRlcGxveSB0byBXZWIsIERlc2t0b3AsIGFuZCBNb2JpbGUuXCJcclxuICAgICAgICAgICAgICBocmVmPVwiI1wiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBtZDpncmlkLWNvbHMtNCBnYXAtNlwiPlxyXG4gICAgICAgICAgICA8U3RhdHNDYXJkXHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJUb3RhbCBVc2Vyc1wiXHJcbiAgICAgICAgICAgICAgdmFsdWU9XCIxMiwzNDVcIlxyXG4gICAgICAgICAgICAgIGNoYW5nZT1cIisxMi41JVwiXHJcbiAgICAgICAgICAgICAgY2hhbmdlVHlwZT1cInBvc2l0aXZlXCJcclxuICAgICAgICAgICAgICBpY29uPXs8R2xvYmUgc2l6ZT17MjB9IC8+fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8U3RhdHNDYXJkXHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJSZXZlbnVlXCJcclxuICAgICAgICAgICAgICB2YWx1ZT1cIiQ0NSw2NzhcIlxyXG4gICAgICAgICAgICAgIGNoYW5nZT1cIis4LjIlXCJcclxuICAgICAgICAgICAgICBjaGFuZ2VUeXBlPVwicG9zaXRpdmVcIlxyXG4gICAgICAgICAgICAgIGljb249ezxTdGFyIHNpemU9ezIwfSAvPn1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPFN0YXRzQ2FyZFxyXG4gICAgICAgICAgICAgIGxhYmVsPVwiQm91bmNlIFJhdGVcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPVwiMjMuNCVcIlxyXG4gICAgICAgICAgICAgIGNoYW5nZT1cIi0yLjElXCJcclxuICAgICAgICAgICAgICBjaGFuZ2VUeXBlPVwicG9zaXRpdmVcIlxyXG4gICAgICAgICAgICAgIGljb249ezxSb2NrZXQgc2l6ZT17MjB9IC8+fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8U3RhdHNDYXJkXHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJBdmcuIFRpbWVcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPVwiNG0gMzJzXCJcclxuICAgICAgICAgICAgICBjaGFuZ2U9XCIrMC4zJVwiXHJcbiAgICAgICAgICAgICAgY2hhbmdlVHlwZT1cIm5ldXRyYWxcIlxyXG4gICAgICAgICAgICAgIGljb249ezxDb2RlIHNpemU9ezIwfSAvPn1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvU2VjdGlvbj5cclxuXHJcbiAgICAgICAgey8qIElucHV0cyBTZWN0aW9uICovfVxyXG4gICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiRm9ybSBJbnB1dHNcIiBkZXNjcmlwdGlvbj1cIlRleHQgZmllbGRzLCB0b2dnbGVzLCBhbmQgb3RoZXIgaW5wdXQgY29tcG9uZW50cy5cIj5cclxuICAgICAgICAgIDxDYXJkIHBhZGRpbmc9XCJsZ1wiIGNsYXNzTmFtZT1cInNwYWNlLXktOFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTZcIj5cclxuICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgIGxhYmVsPVwiRW1haWwgQWRkcmVzc1wiXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInlvdUBleGFtcGxlLmNvbVwiXHJcbiAgICAgICAgICAgICAgICBpY29uPXs8TWFpbCBzaXplPXsyMH0gLz59XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0SW5wdXRWYWx1ZShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgIGxhYmVsPVwiUGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgcGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgaGludD1cIk11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJXaXRoIEVycm9yXCJcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdmFsdWVcIlxyXG4gICAgICAgICAgICAgICAgZXJyb3I9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxTZWFyY2hJbnB1dFxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFZhbHVlfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2hWYWx1ZShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBjb21wb25lbnRzLi4uXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8VGV4dGFyZWFcclxuICAgICAgICAgICAgICAgIGxhYmVsPVwiTWVzc2FnZVwiXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIldyaXRlIHlvdXIgbWVzc2FnZSBoZXJlLi4uXCJcclxuICAgICAgICAgICAgICAgIHJvd3M9ezN9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi00XCI+VG9nZ2xlIFN3aXRjaGVzPC9wPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC04XCI+XHJcbiAgICAgICAgICAgICAgICA8VG9nZ2xlXHJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRW5hYmxlIG5vdGlmaWNhdGlvbnNcIlxyXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXt0b2dnbGVWYWx1ZX1cclxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRUb2dnbGVWYWx1ZShlLnRhcmdldC5jaGVja2VkKX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VG9nZ2xlXHJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRGFyayBtb2RlXCJcclxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB7fX1cclxuICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9DYXJkPlxyXG4gICAgICAgIDwvU2VjdGlvbj5cclxuXHJcbiAgICAgICAgey8qIEFsZXJ0cyBTZWN0aW9uICovfVxyXG4gICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiQWxlcnRzXCIgZGVzY3JpcHRpb249XCJDb250ZXh0dWFsIGZlZWRiYWNrIG1lc3NhZ2VzIGZvciB1c2VyIGFjdGlvbnMuXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICAgICAgICA8QWxlcnQgdmFyaWFudD1cInN1Y2Nlc3NcIiB0aXRsZT1cIlN1Y2Nlc3MhXCIgZGlzbWlzc2libGU+XHJcbiAgICAgICAgICAgICAgWW91ciBjaGFuZ2VzIGhhdmUgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICAgICAgICAgIDwvQWxlcnQ+XHJcbiAgICAgICAgICAgIDxBbGVydCB2YXJpYW50PVwiZXJyb3JcIiB0aXRsZT1cIkVycm9yXCI+XHJcbiAgICAgICAgICAgICAgU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uXHJcbiAgICAgICAgICAgIDwvQWxlcnQ+XHJcbiAgICAgICAgICAgIDxBbGVydCB2YXJpYW50PVwid2FybmluZ1wiIHRpdGxlPVwiV2FybmluZ1wiPlxyXG4gICAgICAgICAgICAgIFlvdXIgc2Vzc2lvbiB3aWxsIGV4cGlyZSBpbiA1IG1pbnV0ZXMuXHJcbiAgICAgICAgICAgIDwvQWxlcnQ+XHJcbiAgICAgICAgICAgIDxBbGVydCB2YXJpYW50PVwiaW5mb1wiIHRpdGxlPVwiSW5mb3JtYXRpb25cIj5cclxuICAgICAgICAgICAgICBBIG5ldyB2ZXJzaW9uIGlzIGF2YWlsYWJsZS4gUmVmcmVzaCB0byB1cGRhdGUuXHJcbiAgICAgICAgICAgIDwvQWxlcnQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L1NlY3Rpb24+XHJcblxyXG4gICAgICAgIHsvKiBUYWJzIFNlY3Rpb24gKi99XHJcbiAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJUYWJzICYgU2VnbWVudGVkIENvbnRyb2xcIiBkZXNjcmlwdGlvbj1cIk9yZ2FuaXplIGNvbnRlbnQgaW50byBzd2l0Y2hhYmxlIHBhbmVscy5cIj5cclxuICAgICAgICAgIDxDYXJkIHBhZGRpbmc9XCJsZ1wiIGNsYXNzTmFtZT1cInNwYWNlLXktMTBcIj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTRcIj5UYWJzPC9wPlxyXG4gICAgICAgICAgICAgIDxUYWJzXHJcbiAgICAgICAgICAgICAgICB0YWJzPXtbXHJcbiAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdPdmVydmlldycsIGljb246IDxHbG9iZSBzaXplPXsxNn0gLz4sIGNvbnRlbnQ6IDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgcHktNFwiPk92ZXJ2aWV3IGNvbnRlbnQgZ29lcyBoZXJlLiBUaGlzIHRhYiBjb250YWlucyBnZW5lcmFsIGluZm9ybWF0aW9uLjwvcD4gfSxcclxuICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ0ZlYXR1cmVzJywgaWNvbjogPFphcCBzaXplPXsxNn0gLz4sIGNvbnRlbnQ6IDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgcHktNFwiPkZlYXR1cmVzIGNvbnRlbnQgZ29lcyBoZXJlLiBFeHBsb3JlIGFsbCBhdmFpbGFibGUgZmVhdHVyZXMuPC9wPiB9LFxyXG4gICAgICAgICAgICAgICAgICB7IGxhYmVsOiAnUHJpY2luZycsIGljb246IDxTdGFyIHNpemU9ezE2fSAvPiwgYmFkZ2U6ICdOZXcnLCBjb250ZW50OiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIHB5LTRcIj5QcmljaW5nIGNvbnRlbnQgZ29lcyBoZXJlLiBWaWV3IG91ciBwcmljaW5nIHBsYW5zLjwvcD4gfSxcclxuICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICB2YXJpYW50PVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi00XCI+U2VnbWVudGVkIENvbnRyb2w8L3A+XHJcbiAgICAgICAgICAgICAgPFNlZ21lbnRlZENvbnRyb2xcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e1tcclxuICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ0FsbCcsIHZhbHVlOiAnYWxsJyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IGxhYmVsOiAnQWN0aXZlJywgdmFsdWU6ICdhY3RpdmUnIH0sXHJcbiAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdBcmNoaXZlZCcsIHZhbHVlOiAnYXJjaGl2ZWQnIH0sXHJcbiAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2FjdGl2ZVNlZ21lbnR9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0QWN0aXZlU2VnbWVudH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvQ2FyZD5cclxuICAgICAgICA8L1NlY3Rpb24+XHJcblxyXG4gICAgICAgIHsvKiBBdmF0YXJzIFNlY3Rpb24gKi99XHJcbiAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJBdmF0YXJzXCIgZGVzY3JpcHRpb249XCJVc2VyIHByb2ZpbGUgaW1hZ2VzIGFuZCBncm91cHMuXCI+XHJcbiAgICAgICAgICA8Q2FyZCBwYWRkaW5nPVwibGdcIiBjbGFzc05hbWU9XCJzcGFjZS15LThcIj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTRcIj5TaXplcyAmIFZhcmlhbnRzPC9wPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtZW5kIGdhcC00XCI+XHJcbiAgICAgICAgICAgICAgICA8QXZhdGFyIHNyYz1cImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDcyMDk5NjQ1Nzg1LTU2NThhYmY0ZmY0ZT93PTEwMCZoPTEwMCZmaXQ9Y3JvcFwiIHNpemU9XCJ4c1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8QXZhdGFyIHNyYz1cImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDcyMDk5NjQ1Nzg1LTU2NThhYmY0ZmY0ZT93PTEwMCZoPTEwMCZmaXQ9Y3JvcFwiIHNpemU9XCJzbVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8QXZhdGFyIHNyYz1cImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDcyMDk5NjQ1Nzg1LTU2NThhYmY0ZmY0ZT93PTEwMCZoPTEwMCZmaXQ9Y3JvcFwiIHNpemU9XCJtZFwiIC8+XHJcbiAgICAgICAgICAgICAgICA8QXZhdGFyIHNyYz1cImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDcyMDk5NjQ1Nzg1LTU2NThhYmY0ZmY0ZT93PTEwMCZoPTEwMCZmaXQ9Y3JvcFwiIHNpemU9XCJsZ1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8QXZhdGFyIHNyYz1cImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDcyMDk5NjQ1Nzg1LTU2NThhYmY0ZmY0ZT93PTEwMCZoPTEwMCZmaXQ9Y3JvcFwiIHNpemU9XCJ4bFwiIC8+XHJcbiAgICAgICAgICAgICAgICA8QXZhdGFyIG5hbWU9XCJKb2huIERvZVwiIHNpemU9XCJsZ1wiIGNvbG9yPVwiaW5kaWdvXCIgLz5cclxuICAgICAgICAgICAgICAgIDxBdmF0YXIgbmFtZT1cIkphbmUgU21pdGhcIiBzaXplPVwibGdcIiBjb2xvcj1cInBpbmtcIiAvPlxyXG4gICAgICAgICAgICAgICAgPEF2YXRhciBzaXplPVwibGdcIiBzdGF0dXM9XCJvbmxpbmVcIiAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTRcIj5BdmF0YXIgR3JvdXA8L3A+XHJcbiAgICAgICAgICAgICAgPEF2YXRhckdyb3VwXHJcbiAgICAgICAgICAgICAgICBhdmF0YXJzPXtbXHJcbiAgICAgICAgICAgICAgICAgIHsgc3JjOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NzIwOTk2NDU3ODUtNTY1OGFiZjRmZjRlP3c9MTAwJmg9MTAwJmZpdD1jcm9wJyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHNyYzogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDM4NzYxNjgxMDMzLTY0NjFmZmFkOGQ4MD93PTEwMCZoPTEwMCZmaXQ9Y3JvcCcgfSxcclxuICAgICAgICAgICAgICAgICAgeyBzcmM6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUwMDY0ODc2Nzc5MS0wMGRjYzk5NGE0M2U/dz0xMDAmaD0xMDAmZml0PWNyb3AnIH0sXHJcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ0FsZXggS2ltJyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IG5hbWU6ICdTYXJhaCBKb2huc29uJyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IG5hbWU6ICdNaWtlIEJyb3duJyB9LFxyXG4gICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgIG1heD17NH1cclxuICAgICAgICAgICAgICAgIHNpemU9XCJtZFwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICAgPC9TZWN0aW9uPlxyXG5cclxuICAgICAgICB7LyogUHJvZ3Jlc3MgU2VjdGlvbiAqL31cclxuICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIlByb2dyZXNzICYgTG9hZGluZ1wiIGRlc2NyaXB0aW9uPVwiVmlzdWFsIGluZGljYXRvcnMgZm9yIHByb2dyZXNzIGFuZCBsb2FkaW5nIHN0YXRlcy5cIj5cclxuICAgICAgICAgIDxDYXJkIHBhZGRpbmc9XCJsZ1wiIGNsYXNzTmFtZT1cInNwYWNlLXktMTBcIj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTRcIj5Qcm9ncmVzcyBCYXJzPC9wPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgICAgICAgICAgICA8UHJvZ3Jlc3MgdmFsdWU9ezI1fSB2YXJpYW50PVwicHJpbWFyeVwiIHNob3dMYWJlbCAvPlxyXG4gICAgICAgICAgICAgICAgPFByb2dyZXNzIHZhbHVlPXs1MH0gdmFyaWFudD1cInN1Y2Nlc3NcIiAvPlxyXG4gICAgICAgICAgICAgICAgPFByb2dyZXNzIHZhbHVlPXs3NX0gdmFyaWFudD1cImdyYWRpZW50XCIgc2l6ZT1cImxnXCIgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi00XCI+Q2lyY3VsYXIgJiBTcGlubmVyczwvcD5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC04XCI+XHJcbiAgICAgICAgICAgICAgICA8Q2lyY3VsYXJQcm9ncmVzcyB2YWx1ZT17NjV9IC8+XHJcbiAgICAgICAgICAgICAgICA8Q2lyY3VsYXJQcm9ncmVzcyB2YWx1ZT17ODV9IHZhcmlhbnQ9XCJzdWNjZXNzXCIgLz5cclxuICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJsZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItNFwiPlN0ZXBzPC9wPlxyXG4gICAgICAgICAgICAgIDxTdGVwc1xyXG4gICAgICAgICAgICAgICAgc3RlcHM9e1tcclxuICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ0FjY291bnQnIH0sXHJcbiAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdEZXRhaWxzJyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IGxhYmVsOiAnUGF5bWVudCcgfSxcclxuICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ0NvbXBsZXRlJyB9LFxyXG4gICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGVwPXsyfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9DYXJkPlxyXG4gICAgICAgIDwvU2VjdGlvbj5cclxuXHJcbiAgICAgICAgey8qIEFjY29yZGlvbiBTZWN0aW9uICovfVxyXG4gICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiRkFRIEFjY29yZGlvblwiIGRlc2NyaXB0aW9uPVwiRXhwYW5kYWJsZSBjb250ZW50IHNlY3Rpb25zIGZvciBGQVFzIGFuZCBtb3JlLlwiPlxyXG4gICAgICAgICAgPEZBUUFjY29yZGlvbiBpdGVtcz17ZmFxSXRlbXN9IC8+XHJcbiAgICAgICAgPC9TZWN0aW9uPlxyXG5cclxuICAgICAgICB7LyogSWNvbnMgU2VjdGlvbiAqL31cclxuICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIlNWRyBJY29uc1wiIGRlc2NyaXB0aW9uPVwiNzArIGNyaXNwIFNWRyBpY29ucyBmb3IgZXZlcnkgdXNlIGNhc2UuXCI+XHJcbiAgICAgICAgICA8Q2FyZCBwYWRkaW5nPVwibGdcIj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCBtYi02IGxlYWRpbmctcmVsYXhlZFwiPlxyXG4gICAgICAgICAgICAgIEFsbCBpY29ucyBhcmUgU1ZHLWJhc2VkIGZvciBjcmlzcCByZW5kZXJpbmcgYXQgYW55IHNpemUuIEN1c3RvbWl6ZSBjb2xvciwgc2l6ZSwgYW5kIHN0cm9rZSB3aWR0aC5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTUgc206Z3JpZC1jb2xzLTggbWQ6Z3JpZC1jb2xzLTEwIGxnOmdyaWQtY29scy0xNSBnYXAtM1wiPlxyXG4gICAgICAgICAgICAgIHtbXHJcbiAgICAgICAgICAgICAgICBaYXAsIFNoaWVsZCwgQ29kZSwgRGF0YWJhc2UsIEdsb2JlLCBSb2NrZXQsXHJcbiAgICAgICAgICAgICAgICBBcnJvd1JpZ2h0LCBDaGVjaywgSGVhcnQsIFN0YXIsIEdpdGh1YixcclxuICAgICAgICAgICAgICAgIE1haWwsIEJlbGwsIFNlYXJjaCwgU2V0dGluZ3NcclxuICAgICAgICAgICAgICBdLm1hcCgoSWNvbiwgaWR4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIGtleT17aWR4fVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJncm91cCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB3LTEyIGgtMTIgcm91bmRlZC14bCBiZy1ncmF5LTUwIGJvcmRlciBib3JkZXItZ3JheS0xMDAgaG92ZXI6Ym9yZGVyLWluZGlnby0yMDAgaG92ZXI6YmctaW5kaWdvLTUwIGhvdmVyOnRleHQtaW5kaWdvLTYwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgY3Vyc29yLXBvaW50ZXIgaG92ZXI6c2hhZG93LW1kIGhvdmVyOnNoYWRvdy1pbmRpZ28tMTAwIGhvdmVyOnNjYWxlLTExMFwiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxJY29uIHNpemU9ezIyfSBjbGFzc05hbWU9XCJncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm1cIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9DYXJkPlxyXG4gICAgICAgIDwvU2VjdGlvbj5cclxuXHJcbiAgICAgICAgey8qIENUQSAqL31cclxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB0ZXh0LWNlbnRlciBweS0yMCBtdC0xMCAtbXgtNCBzbTotbXgtNiBsZzotbXgtOCBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxyXG4gICAgICAgICAgey8qIEJhY2tncm91bmQgKi99XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tNTAgdmlhLXB1cnBsZS01MCB0by1waW5rLTUwIHJvdW5kZWQtM3hsIG14LTRcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmlkLXBhdHRlcm4gb3BhY2l0eS0zMCByb3VuZGVkLTN4bCBteC00XCI+PC9kaXY+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTQgdHJhY2tpbmctdGlnaHRcIj5cclxuICAgICAgICAgICAgICBSZWFkeSB0byBidWlsZCBzb21ldGhpbmcgYW1hemluZz9cclxuICAgICAgICAgICAgPC9oMj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14bCB0ZXh0LWdyYXktNTAwIG1iLTEwIG1heC13LTJ4bCBteC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgU3RhcnQgdXNpbmcgdGhlc2UgY29tcG9uZW50cyBpbiB5b3VyIElOREpTIHByb2plY3QgdG9kYXkuXHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBqdXN0aWZ5LWNlbnRlciBnYXAtNFwiPlxyXG4gICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvZG9jc1wiPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwiZ3JhZGllbnRcIiBzaXplPVwibGdcIiBpY29uPXs8QXJyb3dSaWdodCBzaXplPXsxOH0gLz59IGljb25Qb3NpdGlvbj1cInJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgIFZpZXcgRG9jdW1lbnRhdGlvblxyXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vUm9oaXRzaGFybWE2Mzc3L0lORFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIHNpemU9XCJsZ1wiIGljb249ezxHaXRodWIgc2l6ZT17MTh9IC8+fT5cclxuICAgICAgICAgICAgICAgICAgR2l0SHViXHJcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIiwgIi8qKlxuICogUGxhdGZvcm0gZGV0ZWN0aW9uIHV0aWxpdGllcyBmb3IgSU5ESlNcbiAqXG4gKiBVc2FnZTpcbiAqIGltcG9ydCB7IGlzV2ViLCBpc0Rlc2t0b3AsIGlzTW9iaWxlLCBpc0FuZHJvaWQsIGlzSU9TLCBwbGF0Zm9ybSB9IGZyb20gJ2luZGpzJztcbiAqXG4gKiBpZiAoaXNNb2JpbGUpIHsgLi4uIH1cbiAqL1xuXG4vLyBDaGVjayBpZiBydW5uaW5nIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudFxuY29uc3QgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIjtcblxuLy8gRWxlY3Ryb24gZGV0ZWN0aW9uIChyZW5kZXJlciBwcm9jZXNzKVxuZXhwb3J0IGNvbnN0IGlzRGVza3RvcCA9XG4gIGlzQnJvd3NlciAmJlxuICAod2luZG93LnByb2Nlc3M/LnR5cGUgPT09IFwicmVuZGVyZXJcIiB8fFxuICAgICEhd2luZG93LmVsZWN0cm9uIHx8XG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkVsZWN0cm9uXCIpKTtcblxuLy8gQ2FwYWNpdG9yIGRldGVjdGlvblxuZXhwb3J0IGNvbnN0IGlzTW9iaWxlID1cbiAgaXNCcm93c2VyICYmXG4gICghIXdpbmRvdy5DYXBhY2l0b3IgfHxcbiAgICAhIXdpbmRvdy5hbmRyb2lkQnJpZGdlIHx8XG4gICAgISF3aW5kb3cud2Via2l0Py5tZXNzYWdlSGFuZGxlcnM/LmJyaWRnZSB8fFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJDYXBhY2l0b3JcIikpO1xuXG4vLyBTcGVjaWZpYyBtb2JpbGUgcGxhdGZvcm1zXG5leHBvcnQgY29uc3QgaXNBbmRyb2lkID0gaXNNb2JpbGUgJiYgL2FuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuZXhwb3J0IGNvbnN0IGlzSU9TID0gaXNNb2JpbGUgJiYgL2lwaG9uZXxpcGFkfGlwb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vLyBXZWIgZmFsbGJhY2sgKGlmIG5vdCBkZXNrdG9wIG9yIG1vYmlsZSBhcHApXG5leHBvcnQgY29uc3QgaXNXZWIgPSAhaXNEZXNrdG9wICYmICFpc01vYmlsZTtcblxuLy8gR2V0IGN1cnJlbnQgcGxhdGZvcm0gbmFtZVxuZXhwb3J0IGNvbnN0IHBsYXRmb3JtID0gKCgpID0+IHtcbiAgaWYgKGlzRGVza3RvcCkgcmV0dXJuIFwiZGVza3RvcFwiO1xuICBpZiAoaXNBbmRyb2lkKSByZXR1cm4gXCJhbmRyb2lkXCI7XG4gIGlmIChpc0lPUykgcmV0dXJuIFwiaW9zXCI7XG4gIGlmIChpc01vYmlsZSkgcmV0dXJuIFwibW9iaWxlXCI7IC8vIGZhbGxiYWNrXG4gIHJldHVybiBcIndlYlwiO1xufSkoKTtcblxuLy8gUmVhY3QgTmF0aXZlIGNvbXBhdGlibGUgQVBJXG5leHBvcnQgY29uc3QgT1MgPSBwbGF0Zm9ybTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IChvYmopID0+IHtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShPUykpIHJldHVybiBvYmpbT1NdO1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KFwibmF0aXZlXCIpICYmIGlzTW9iaWxlKSByZXR1cm4gb2JqW1wibmF0aXZlXCJdO1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KFwiZGVmYXVsdFwiKSkgcmV0dXJuIG9ialtcImRlZmF1bHRcIl07XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzV2ViLFxuICBpc0Rlc2t0b3AsXG4gIGlzTW9iaWxlLFxuICBpc0FuZHJvaWQsXG4gIGlzSU9TLFxuICBwbGF0Zm9ybSxcbiAgT1MsXG4gIHNlbGVjdCxcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgSW1hZ2UgPSBmb3J3YXJkUmVmKCh7IHN0eWxlLCBzb3VyY2UsIHNyYywgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJpbWFnZVwiKTtcblxuICAvLyBSZWFjdCBOYXRpdmUgdXNlcyAnc291cmNlJywgV2ViIHVzZXMgJ3NyYycuXG4gIC8vIFdlIHN1cHBvcnQgYm90aCBwcm9wcyBmb3IgdW5pdmVyc2FsIHVzYWdlLlxuICBjb25zdCBpbWFnZVNvdXJjZSA9IHNyYyB8fCAoc291cmNlICYmIHNvdXJjZS51cmkpIHx8IFwiXCI7XG5cbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgLi4ucmVzdCxcbiAgICBzcmM6IGltYWdlU291cmNlLFxuICAgIHJlZixcbiAgfTtcblxuICBpZiAoQ29tcG9uZW50ICE9PSBcImltZ1wiICYmIENvbXBvbmVudCAhPT0gXCJpbWFnZVwiKSB7XG4gICAgLy8gSWYgaXQgcmVmZXJzIHRvIFJlYWN0IE5hdGl2ZSBJbWFnZSwgaXQgZXhwZWN0cyAnc291cmNlJ1xuICAgIHByb3BzLnNvdXJjZSA9IHNvdXJjZSB8fCB7IHVyaTogc3JjIH07XG4gICAgZGVsZXRlIHByb3BzLnNyYztcbiAgfVxuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gPENvbXBvbmVudCBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucHJvcHN9IC8+O1xufSk7XG5cbkltYWdlLmRpc3BsYXlOYW1lID0gXCJJbWFnZVwiO1xuZXhwb3J0IGRlZmF1bHQgSW1hZ2U7XG4iLCAiZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVFbGVtZW50KHR5cGUpIHtcbiAgY29uc3QgcGxhdGZvcm0gPSB0eXBlb2YgUExBVEZPUk0gIT09IFwidW5kZWZpbmVkXCIgPyBQTEFURk9STSA6IFwid2ViXCI7XG5cbiAgaWYgKHBsYXRmb3JtID09PSBcIndlYlwiKSB7XG4gICAgY29uc3Qgd2ViTWFwID0ge1xuICAgICAgdmlldzogXCJkaXZcIixcbiAgICAgIHRleHQ6IFwic3BhblwiLFxuICAgICAgaW1hZ2U6IFwiaW1nXCIsXG4gICAgICBpbWFnZWJhY2tncm91bmQ6IFwiZGl2XCIsIC8vIG1hcCBpbWFnZS1iYWNrZ3JvdW5kIHRvIGRpdiB3aXRoIHN0eWxlXG4gICAgICBzY3JvbGx2aWV3OiBcImRpdlwiLFxuICAgICAgZmxhdGxpc3Q6IFwiZGl2XCIsXG4gICAgICBzZWN0aW9ubGlzdDogXCJkaXZcIixcbiAgICAgIGtleWJvYXJkYXZvaWRpbmd2aWV3OiBcImRpdlwiLFxuICAgICAgc2FmZWFyZWF2aWV3OiBcImRpdlwiLFxuICAgICAgcHJlc3NhYmxlOiBcImJ1dHRvblwiLFxuICAgICAgdG91Y2hhYmxlb3BhY2l0eTogXCJidXR0b25cIixcbiAgICAgIHRvdWNoYWJsZWhpZ2hsaWdodDogXCJidXR0b25cIixcbiAgICAgIHN3aXRjaDogXCJpbnB1dFwiLCAvLyB0eXBlPSdjaGVja2JveCdcbiAgICAgIHRleHRhcmVhOiBcInRleHRhcmVhXCIsXG4gICAgICBidXR0b246IFwiYnV0dG9uXCIsXG4gICAgICBtb2RhbDogXCJkaXZcIixcbiAgICAgIGFjdGl2aXR5aW5kaWNhdG9yOiBcImRpdlwiLFxuICAgICAgcmVmcmVzaGNvbnRyb2w6IFwiZGl2XCIsXG4gICAgfTtcbiAgICByZXR1cm4gd2ViTWFwW3R5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tL2csIFwiXCIpXSB8fCBcImRpdlwiO1xuICB9XG5cbiAgaWYgKHBsYXRmb3JtID09PSBcIm1vYmlsZVwiKSB7XG4gICAgLy8gSW4gUmVhY3QgTmF0aXZlLCBjb21wb25lbnRzIGFyZSBDYW1lbENhc2VcbiAgICAvLyBXZSBuZWVkIHRvIG1hcCBnZW5lcmljIG5hbWVzIHRvIFJOIG5hbWVzXG4gICAgY29uc3QgbW9iaWxlTWFwID0ge1xuICAgICAgdmlldzogXCJWaWV3XCIsXG4gICAgICB0ZXh0OiBcIlRleHRcIixcbiAgICAgIGltYWdlOiBcIkltYWdlXCIsXG4gICAgICBpbWFnZWJhY2tncm91bmQ6IFwiSW1hZ2VCYWNrZ3JvdW5kXCIsXG4gICAgICBzY3JvbGx2aWV3OiBcIlNjcm9sbFZpZXdcIixcbiAgICAgIGZsYXRsaXN0OiBcIkZsYXRMaXN0XCIsXG4gICAgICBzZWN0aW9ubGlzdDogXCJTZWN0aW9uTGlzdFwiLFxuICAgICAga2V5Ym9hcmRhdm9pZGluZ3ZpZXc6IFwiS2V5Ym9hcmRBdm9pZGluZ1ZpZXdcIixcbiAgICAgIHNhZmVhcmVhdmlldzogXCJTYWZlQXJlYVZpZXdcIixcbiAgICAgIHByZXNzYWJsZTogXCJQcmVzc2FibGVcIixcbiAgICAgIHRvdWNoYWJsZW9wYWNpdHk6IFwiVG91Y2hhYmxlT3BhY2l0eVwiLFxuICAgICAgdG91Y2hhYmxlaGlnaGxpZ2h0OiBcIlRvdWNoYWJsZUhpZ2hsaWdodFwiLFxuICAgICAgc3dpdGNoOiBcIlN3aXRjaFwiLFxuICAgICAgbW9kYWw6IFwiTW9kYWxcIixcbiAgICAgIGFjdGl2aXR5aW5kaWNhdG9yOiBcIkFjdGl2aXR5SW5kaWNhdG9yXCIsXG4gICAgICByZWZyZXNoY29udHJvbDogXCJSZWZyZXNoQ29udHJvbFwiLFxuICAgICAgYnV0dG9uOiBcIkJ1dHRvblwiLFxuICAgIH07XG4gICAgY29uc3Qgcm5OYW1lID1cbiAgICAgIG1vYmlsZU1hcFt0eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIlwiKV0gfHwgY2FwaXRhbGl6ZSh0eXBlKTtcblxuICAgIC8vIFNhZmV0eSBjaGVjayBmb3IgUmVhY3QgTmF0aXZlIGVudmlyb25tZW50XG4gICAgLy8gcmVhY3QtbmF0aXZlLXdlYiBtaWdodCBiZSBhbGlhc2VkLCBvciB3ZSBtaWdodCBiZSBpbiBhIHJlYWwgUk4gZW52aXJvbm1lbnRcbiAgICB0cnkge1xuICAgICAgLy8gVXNpbmcgZ2xvYmFsIGNoZWNrIG9yIHNhZmUgcmVxdWlyZVxuICAgICAgaWYgKHR5cGVvZiByZXF1aXJlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKFwicmVhY3QtbmF0aXZlXCIpW3JuTmFtZV07XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHdpbmRvdy5SZWFjdCAmJlxuICAgICAgICB3aW5kb3cuUmVhY3QuTmF0aXZlXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5SZWFjdC5OYXRpdmVbcm5OYW1lXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFJlYWN0IE5hdGl2ZSBjb21wb25lbnQgJHtybk5hbWV9IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgICAvLyBGYWxsYmFjayB0byBWaWV3IG9yIGRpdiBkZXBlbmRpbmcgb24gY29udGV4dCwgYnV0IFZpZXcgaXMgc2FmZSBlbm91Z2ggZm9yIGxvZ2ljYWwgcmV0dXJuIGlmIG1vY2tlZFxuICAgIHJldHVybiBcIlZpZXdcIjtcbiAgfVxuXG4gIHJldHVybiBcImRpdlwiO1xufVxuIiwgIi8vIE1vY2sgU3R5bGVTaGVldCBmb3IgY29tcGF0aWJpbGl0eS5cbi8vIEluIElOREpTIHdlYiwgd2UgdXN1YWxseSB1c2Ugc3RhbmRhcmQgc3R5bGUgb2JqZWN0cyBvciBDU1MuXG4vLyBUaGlzIGFsbG93cyBTdHlsZVNoZWV0LmNyZWF0ZSh7fSkgdG8gcmV0dXJuIHRoZSBvYmplY3RzIGFzLWlzLlxuXG5leHBvcnQgY29uc3QgU3R5bGVTaGVldCA9IHtcbiAgY3JlYXRlOiAoc3R5bGVzKSA9PiBzdHlsZXMsXG4gIGZsYXR0ZW46IChzdHlsZXMpID0+IHtcbiAgICBpZiAoIXN0eWxlcykgcmV0dXJuIHt9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN0eWxlcykpIHtcbiAgICAgIHJldHVybiBzdHlsZXNcbiAgICAgICAgLmZsYXQoSW5maW5pdHkpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gKGl0ZW0gPyB7IC4uLmFjYywgLi4uaXRlbSB9IDogYWNjKSwge30pO1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9LFxuICBoYWlybGluZVdpZHRoOiAxLFxuICBhYnNvbHV0ZUZpbGw6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIGJvdHRvbTogMCxcbiAgfSxcbiAgYWJzb2x1dGVGaWxsT2JqZWN0OiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIHRvcDogMCxcbiAgICBib3R0b206IDAsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdHlsZVNoZWV0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuLy8gSU5ESlMgTGluayBjb21wb25lbnQgLSBsaWdodHdlaWdodCBjbGllbnQtc2lkZSBuYXZpZ2F0aW9uIGhlbHBlclxuLy8gUGVyZm9ybXMgU1BBLWxpa2UgbmF2aWdhdGlvbiBmb3Igc2FtZS1vcmlnaW4gaW50ZXJuYWwgbGlua3MuXG4vLyBQcm9wczogaHJlZiwgcHJlZmV0Y2gsIHJlcGxhY2UsIHNjcm9sbCAoZGVmYXVsdCB0cnVlKSwgb25DbGljaywgdGFyZ2V0LCByZWwsIGNsYXNzTmFtZSwgc3R5bGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpbmsoe1xuICBocmVmLFxuICBjaGlsZHJlbixcbiAgcHJlZmV0Y2ggPSBmYWxzZSxcbiAgcmVwbGFjZSA9IGZhbHNlLFxuICBzY3JvbGwgPSB0cnVlLFxuICBvbkNsaWNrLFxuICBjbGFzc05hbWUsXG4gIHN0eWxlLFxuICB0YXJnZXQsXG4gIHJlbCxcbiAgLi4ucmVzdFxufSkge1xuICAvLyBCYXNpYyBwcmVmZXRjaDogaGludCB0aGUgYnJvd3NlciB2aWEgPGxpbmsgcmVsPVwicHJlZmV0Y2hcIj5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXByZWZldGNoIHx8ICFocmVmKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgICAgIGwucmVsID0gXCJwcmVmZXRjaFwiO1xuICAgICAgbC5ocmVmID0gaHJlZjtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQobCk7XG4gICAgICAgIH0gY2F0Y2gge31cbiAgICAgIH07XG4gICAgfSBjYXRjaCB7fVxuICB9LCBbaHJlZiwgcHJlZmV0Y2hdKTtcblxuICBjb25zdCBoYW5kbGVDbGljayA9IChlKSA9PiB7XG4gICAgaWYgKG9uQ2xpY2spIG9uQ2xpY2soZSk7XG4gICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuICAgIC8vIE9ubHkgaW50ZXJjZXB0IHNpbXBsZSBsZWZ0LWNsaWNrcyB3aXRob3V0IG1vZGlmaWVyIGtleXNcbiAgICBpZiAoZS5idXR0b24gIT09IDAgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5KVxuICAgICAgcmV0dXJuO1xuICAgIGlmICghaHJlZikgcmV0dXJuO1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBcIl9zZWxmXCIpIHJldHVybjtcbiAgICBsZXQgdXJsO1xuICAgIHRyeSB7XG4gICAgICB1cmwgPSBuZXcgVVJMKGhyZWYsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSW52YWxpZCBVUkwsIGxldCBicm93c2VyIGhhbmRsZVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBTa2lwIG5vbi1odHRwKHMpIHByb3RvY29scyBhbmQgc3BlY2lhbCBzY2hlbWVzXG4gICAgY29uc3QgcHJvdG8gPSB1cmwucHJvdG9jb2w7XG4gICAgaWYgKHByb3RvICYmIHByb3RvICE9PSBcImh0dHA6XCIgJiYgcHJvdG8gIT09IFwiaHR0cHM6XCIpIHJldHVybjtcbiAgICAvLyBFeHRlcm5hbFxuICAgIGlmICh1cmwub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSByZXR1cm47XG4gICAgLy8gUmVzcGVjdCBkb3dubG9hZCBsaW5rc1xuICAgIGlmIChyZXN0LmRvd25sb2FkKSByZXR1cm47XG4gICAgLy8gSGFzaC1vbmx5IG5hdmlnYXRpb24gb3B0aW1pemF0aW9uXG4gICAgY29uc3QgY3VycmVudCA9XG4gICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgY29uc3QgbmV4dCA9IHVybC5wYXRobmFtZSArIHVybC5zZWFyY2ggKyB1cmwuaGFzaDtcbiAgICBpZiAobmV4dCA9PT0gY3VycmVudCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHNjcm9sbCkge1xuICAgICAgICBpZiAodXJsLmhhc2gpIHtcbiAgICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHVybC5oYXNoLnNsaWNlKDEpKTtcbiAgICAgICAgICBpZiAoZWwpIGVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgICAgZWxzZSB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBEbyBwdXNoL3JlcGxhY2Ugc3RhdGVcbiAgICBpZiAocmVwbGFjZSkgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcbiAgICBlbHNlIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XG4gICAgLy8gRW1pdCBhIGN1c3RvbSBuYXZpZ2F0aW9uIGV2ZW50IHNvIHRoZSBhcHAgY2FuIGxvYWQgdGhlIHRhcmdldCBtb2R1bGVcbiAgICB0cnkge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChcImluZDpuYXZpZ2F0ZVwiLCB7IGRldGFpbDogeyBocmVmOiBuZXh0IH0gfSksXG4gICAgICApO1xuICAgIH0gY2F0Y2gge31cbiAgICAvLyBTY3JvbGwgYmVoYXZpb3JcbiAgICBpZiAoc2Nyb2xsKSB7XG4gICAgICBpZiAodXJsLmhhc2gpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1cmwuaGFzaC5zbGljZSgxKSk7XG4gICAgICAgIGlmIChlbCkgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgZWxzZSB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbEZpbmFsID1cbiAgICB0YXJnZXQgPT09IFwiX2JsYW5rXCJcbiAgICAgID8gW3JlbCwgXCJub29wZW5lclwiLCBcIm5vcmVmZXJyZXJcIl0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpXG4gICAgICA6IHJlbDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgXCJhXCIsXG4gICAge1xuICAgICAgaHJlZixcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHN0eWxlLFxuICAgICAgdGFyZ2V0LFxuICAgICAgcmVsOiByZWxGaW5hbCxcbiAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrLFxuICAgICAgLi4ucmVzdCxcbiAgICB9LFxuICAgIGNoaWxkcmVuLFxuICApO1xufVxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInZpZXdcIik7XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5WaWV3LmRpc3BsYXlOYW1lID0gXCJWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRleHQgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRleHRcIik7XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5UZXh0LmRpc3BsYXlOYW1lID0gXCJUZXh0XCI7XG5leHBvcnQgZGVmYXVsdCBUZXh0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNjcm9sbFZpZXcgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIGhvcml6b250YWwgPSBmYWxzZSxcbiAgICAgIHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvciA9IHRydWUsXG4gICAgICBzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yID0gdHJ1ZSxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzY3JvbGx2aWV3XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2tcbiAgICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICAgICAgICBvdmVyZmxvd1g6IGhvcml6b250YWwgPyBcImF1dG9cIiA6IFwiaGlkZGVuXCIsXG4gICAgICAgIG92ZXJmbG93WTogaG9yaXpvbnRhbCA/IFwiaGlkZGVuXCIgOiBcImF1dG9cIixcbiAgICAgICAgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6IFwidG91Y2hcIixcbiAgICAgICAgc2Nyb2xsYmFyV2lkdGg6IChcbiAgICAgICAgICBob3Jpem9udGFsXG4gICAgICAgICAgICA/ICFzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgICAgIDogIXNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgKVxuICAgICAgICAgID8gXCJub25lXCJcbiAgICAgICAgICA6IFwiYXV0b1wiLFxuICAgICAgICBtc092ZXJmbG93U3R5bGU6IChcbiAgICAgICAgICBob3Jpem9udGFsXG4gICAgICAgICAgICA/ICFzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgICAgIDogIXNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgKVxuICAgICAgICAgID8gXCJub25lXCJcbiAgICAgICAgICA6IFwiYXV0b1wiLFxuICAgICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbY29udGVudENvbnRhaW5lclN0eWxlXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17Y29udGFpbmVyU3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17Y29udGVudFN0eWxlfT57Y2hpbGRyZW59PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yPXtzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3J9XG4gICAgICAgIHNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3I9e3Nob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3J9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblNjcm9sbFZpZXcuZGlzcGxheU5hbWUgPSBcIlNjcm9sbFZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFNjcm9sbFZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgVGV4dElucHV0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIHZhbHVlLFxuICAgICAgZGVmYXVsdFZhbHVlLFxuICAgICAgb25DaGFuZ2VUZXh0LFxuICAgICAgb25Gb2N1cyxcbiAgICAgIG9uQmx1cixcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgc2VjdXJlVGV4dEVudHJ5ID0gZmFsc2UsXG4gICAgICBtdWx0aWxpbmUgPSBmYWxzZSxcbiAgICAgIG51bWJlck9mTGluZXMgPSA0LFxuICAgICAgZWRpdGFibGUgPSB0cnVlLFxuICAgICAgc3R5bGUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChlKSA9PiB7XG4gICAgICBpZiAob25DaGFuZ2VUZXh0KSBvbkNoYW5nZVRleHQoZS50YXJnZXQudmFsdWUpO1xuICAgIH07XG5cbiAgICBjb25zdCBjb21tb25TdHlsZSA9IHtcbiAgICAgIGFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICAgICAgb3V0bGluZTogXCJub25lXCIsXG4gICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICB9O1xuXG4gICAgaWYgKG11bHRpbGluZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgcmVhZE9ubHk9eyFlZGl0YWJsZX1cbiAgICAgICAgICByb3dzPXtudW1iZXJPZkxpbmVzfVxuICAgICAgICAgIHN0eWxlPXt7IC4uLmNvbW1vblN0eWxlLCByZXNpemU6IFwibm9uZVwiIH19XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHR5cGU9e3NlY3VyZVRleHRFbnRyeSA/IFwicGFzc3dvcmRcIiA6IFwidGV4dFwifVxuICAgICAgICBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxuICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICByZWFkT25seT17IWVkaXRhYmxlfVxuICAgICAgICBzdHlsZT17Y29tbW9uU3R5bGV9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblRleHRJbnB1dC5kaXNwbGF5TmFtZSA9IFwiVGV4dElucHV0XCI7XG5leHBvcnQgZGVmYXVsdCBUZXh0SW5wdXQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgQnV0dG9uID0gZm9yd2FyZFJlZihcbiAgKHsgdGl0bGUsIG9uUHJlc3MsIGNvbG9yLCBkaXNhYmxlZCwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7dGl0bGV9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5CdXR0b24uZGlzcGxheU5hbWUgPSBcIkJ1dHRvblwiO1xuZXhwb3J0IGRlZmF1bHQgQnV0dG9uO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEFjdGl2aXR5SW5kaWNhdG9yID0gZm9yd2FyZFJlZihcbiAgKHsgc2l6ZSA9IFwic21hbGxcIiwgY29sb3IgPSBcIiM5OTlcIiwgc3R5bGUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJhY3Rpdml0eWluZGljYXRvclwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgY29uc3Qgc3Bpbm5lclN0eWxlID0ge1xuICAgICAgICBhbmltYXRpb246IFwiaW5kanMtc3BpbiAxcyBsaW5lYXIgaW5maW5pdGVcIixcbiAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEluamVjdCBrZXlmcmFtZXMgaWYgbm90IHByZXNlbnRcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZGpzLXNwaW4tc3R5bGVcIilcbiAgICAgICkge1xuICAgICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICBzdHlsZUVsLmlkID0gXCJpbmRqcy1zcGluLXN0eWxlXCI7XG4gICAgICAgIHN0eWxlRWwuaW5uZXJIVE1MID0gYEBrZXlmcmFtZXMgaW5kanMtc3BpbiB7IDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0gMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfWA7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiA8ZGl2IHJlZj17cmVmfSBzdHlsZT17c3Bpbm5lclN0eWxlfSB7Li4ucmVzdH0gLz47XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHNpemU9e3NpemV9IGNvbG9yPXtjb2xvcn0gc3R5bGU9e3N0eWxlfSB7Li4ucmVzdH0gLz5cbiAgICApO1xuICB9LFxuKTtcblxuQWN0aXZpdHlJbmRpY2F0b3IuZGlzcGxheU5hbWUgPSBcIkFjdGl2aXR5SW5kaWNhdG9yXCI7XG5leHBvcnQgZGVmYXVsdCBBY3Rpdml0eUluZGljYXRvcjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTd2l0Y2ggPSBmb3J3YXJkUmVmKFxuICAoXG4gICAgeyB2YWx1ZSwgb25WYWx1ZUNoYW5nZSwgZGlzYWJsZWQsIHRyYWNrQ29sb3IsIHRodW1iQ29sb3IsIHN0eWxlLCAuLi5yZXN0IH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInN3aXRjaFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiaW5wdXRcIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgY2hlY2tlZD17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvblZhbHVlQ2hhbmdlICYmIG9uVmFsdWVDaGFuZ2UoZS50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIHN0eWxlPXtTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSl9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgIG9uVmFsdWVDaGFuZ2U9e29uVmFsdWVDaGFuZ2V9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgdHJhY2tDb2xvcj17dHJhY2tDb2xvcn1cbiAgICAgICAgdGh1bWJDb2xvcj17dGh1bWJDb2xvcn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblN3aXRjaC5kaXNwbGF5TmFtZSA9IFwiU3dpdGNoXCI7XG5leHBvcnQgZGVmYXVsdCBTd2l0Y2g7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU2Nyb2xsVmlldyBmcm9tIFwiLi9zY3JvbGwtdmlldy5qc3hcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBGbGF0TGlzdCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBkYXRhLFxuICAgICAgcmVuZGVySXRlbSxcbiAgICAgIGtleUV4dHJhY3RvcixcbiAgICAgIExpc3RIZWFkZXJDb21wb25lbnQsXG4gICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEVtcHR5Q29tcG9uZW50LFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgbnVtQ29sdW1ucyA9IDEsXG4gICAgICBob3Jpem9udGFsID0gZmFsc2UsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiZmxhdGxpc3RcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIC8vIFdlYiBmYWxsYmFjayBpbXBsZW1lbnRhdGlvblxuICAgICAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChMaXN0RW1wdHlDb21wb25lbnQpIHtcbiAgICAgICAgICBjb25zdCBFbXB0eSA9IFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RFbXB0eUNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICBMaXN0RW1wdHlDb21wb25lbnRcbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPExpc3RFbXB0eUNvbXBvbmVudCAvPlxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICB7RW1wdHl9XG4gICAgICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXRlbXMgPSBkYXRhIHx8IFtdO1xuICAgICAgY29uc3QgcmVuZGVyTGlzdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlFeHRyYWN0b3JcbiAgICAgICAgICAgID8ga2V5RXh0cmFjdG9yKGl0ZW0sIGluZGV4KVxuICAgICAgICAgICAgOiBpbmRleC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtrZXl9PlxuICAgICAgICAgICAgICB7cmVuZGVySXRlbSh7IGl0ZW0sIGluZGV4IH0pfVxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGZsYXRDb250ZW50U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW2NvbnRlbnRDb250YWluZXJTdHlsZV0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17ZmxhdENvbnRlbnRTdHlsZX1cbiAgICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge0xpc3RIZWFkZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIHtyZW5kZXJMaXN0KCl9XG4gICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICByZW5kZXJJdGVtPXtyZW5kZXJJdGVtfVxuICAgICAgICBrZXlFeHRyYWN0b3I9e2tleUV4dHJhY3Rvcn1cbiAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudD17TGlzdEhlYWRlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudD17TGlzdEZvb3RlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEVtcHR5Q29tcG9uZW50PXtMaXN0RW1wdHlDb21wb25lbnR9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBudW1Db2x1bW5zPXtudW1Db2x1bW5zfVxuICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkZsYXRMaXN0LmRpc3BsYXlOYW1lID0gXCJGbGF0TGlzdFwiO1xuZXhwb3J0IGRlZmF1bHQgRmxhdExpc3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVG91Y2hhYmxlT3BhY2l0eSA9IGZvcndhcmRSZWYoXG4gICh7IGNoaWxkcmVuLCBzdHlsZSwgb25QcmVzcywgYWN0aXZlT3BhY2l0eSA9IDAuMiwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRvdWNoYWJsZW9wYWNpdHlcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtTdHlsZVNoZWV0LmZsYXR0ZW4oW3sgY3Vyc29yOiBcInBvaW50ZXJcIiB9LCBzdHlsZV0pfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiAoZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBhY3RpdmVPcGFjaXR5KX1cbiAgICAgICAgICBvbk1vdXNlVXA9eyhlKSA9PiAoZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxKX1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhlKSA9PiAoZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxKX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XG4gICAgICAgIGFjdGl2ZU9wYWNpdHk9e2FjdGl2ZU9wYWNpdHl9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuVG91Y2hhYmxlT3BhY2l0eS5kaXNwbGF5TmFtZSA9IFwiVG91Y2hhYmxlT3BhY2l0eVwiO1xuZXhwb3J0IGRlZmF1bHQgVG91Y2hhYmxlT3BhY2l0eTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBQcmVzc2FibGUgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgb25QcmVzcywgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJwcmVzc2FibGVcIik7XG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW1xuICAgICAgeyBjdXJzb3I6IFwicG9pbnRlclwiIH0sXG4gICAgICB0eXBlb2Ygc3R5bGUgPT09IFwiZnVuY3Rpb25cIiA/IHN0eWxlKHsgcHJlc3NlZDogZmFsc2UgfSkgOiBzdHlsZSxcbiAgICBdKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uIHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSBvbkNsaWNrPXtvblByZXNzfSB7Li4ucmVzdH0+XG4gICAgICAgIHt0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gY2hpbGRyZW4oeyBwcmVzc2VkOiBmYWxzZSB9KVxuICAgICAgICAgIDogY2hpbGRyZW59XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzdHlsZT17c3R5bGV9IG9uUHJlc3M9e29uUHJlc3N9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5QcmVzc2FibGUuZGlzcGxheU5hbWUgPSBcIlByZXNzYWJsZVwiO1xuZXhwb3J0IGRlZmF1bHQgUHJlc3NhYmxlO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEltYWdlQmFja2dyb3VuZCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7IGNoaWxkcmVuLCBzdHlsZSwgaW1hZ2VTdHlsZSwgc291cmNlLCBzcmMsIHJlc2l6ZU1vZGUgPSBcImNvdmVyXCIsIC4uLnJlc3QgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiaW1hZ2ViYWNrZ3JvdW5kXCIpO1xuXG4gICAgY29uc3QgaW1hZ2VTb3VyY2UgPSBzcmMgfHwgKHNvdXJjZSAmJiBzb3VyY2UudXJpKSB8fCBcIlwiO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW1xuICAgICAgICB7XG4gICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpbWFnZVNvdXJjZX0pYCxcbiAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogcmVzaXplTW9kZSA9PT0gXCJzdHJldGNoXCIgPyBcIjEwMCUgMTAwJVwiIDogcmVzaXplTW9kZSxcbiAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgYmFja2dyb3VuZFJlcGVhdDogXCJuby1yZXBlYXRcIixcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGUsXG4gICAgICBdKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IHsuLi5yZXN0fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBpbWFnZVN0eWxlPXtpbWFnZVN0eWxlfVxuICAgICAgICBzb3VyY2U9e3NvdXJjZSB8fCB7IHVyaTogc3JjIH19XG4gICAgICAgIHJlc2l6ZU1vZGU9e3Jlc2l6ZU1vZGV9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuSW1hZ2VCYWNrZ3JvdW5kLmRpc3BsYXlOYW1lID0gXCJJbWFnZUJhY2tncm91bmRcIjtcbmV4cG9ydCBkZWZhdWx0IEltYWdlQmFja2dyb3VuZDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcblxuY29uc3QgTW9kYWwgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICB2aXNpYmxlLFxuICAgICAgdHJhbnNwYXJlbnQsXG4gICAgICBhbmltYXRpb25UeXBlLFxuICAgICAgb25SZXF1ZXN0Q2xvc2UsXG4gICAgICBzdHlsZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJtb2RhbFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgaWYgKCF2aXNpYmxlKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3QgbW9kYWxTdHlsZSA9IHtcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIFJlbmRlciBhcyBwb3J0YWwgaWYgcG9zc2libGVcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXttb2RhbFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG5cbiAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLmNyZWF0ZVBvcnRhbChjb250ZW50LCBkb2N1bWVudC5ib2R5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB2aXNpYmxlPXt2aXNpYmxlfVxuICAgICAgICB0cmFuc3BhcmVudD17dHJhbnNwYXJlbnR9XG4gICAgICAgIGFuaW1hdGlvblR5cGU9e2FuaW1hdGlvblR5cGV9XG4gICAgICAgIG9uUmVxdWVzdENsb3NlPXtvblJlcXVlc3RDbG9zZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5Nb2RhbC5kaXNwbGF5TmFtZSA9IFwiTW9kYWxcIjtcbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNhZmVBcmVhVmlldyA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNhZmVhcmVhdmlld1wiKTtcblxuICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IHsuLi5yZXN0fT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuU2FmZUFyZWFWaWV3LmRpc3BsYXlOYW1lID0gXCJTYWZlQXJlYVZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFNhZmVBcmVhVmlldztcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xuXG4vLyBXZWIgbW9jayBvZiBTdGF0dXNCYXIuIEluIG5hdGl2ZSBpdCB3b3VsZCBjaGFuZ2UgdGhlIGJhciBzdHlsZS5cbi8vIEluIHdlYiwgbWF5YmUgaXQgY2hhbmdlcyB0aGUgbWV0YSB0aGVtZS1jb2xvciB0YWcuXG5cbmZ1bmN0aW9uIFN0YXR1c0Jhcih7IGJhclN0eWxlID0gXCJkZWZhdWx0XCIsIGJhY2tncm91bmRDb2xvciwgaGlkZGVuID0gZmFsc2UgfSkge1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIC8vIEF0dGVtcHQgdG8gc2V0IHRoZW1lLWNvbG9yIG1ldGEgdGFnIGlmIGJhY2tncm91bmRDb2xvciBwcm92aWRlZFxuICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgIGxldCBtZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidGhlbWUtY29sb3JcIl0nKTtcbiAgICAgIGlmICghbWV0YSkge1xuICAgICAgICBtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1ldGFcIik7XG4gICAgICAgIG1ldGEubmFtZSA9IFwidGhlbWUtY29sb3JcIjtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChtZXRhKTtcbiAgICAgIH1cbiAgICAgIG1ldGEuY29udGVudCA9IGJhY2tncm91bmRDb2xvcjtcbiAgICB9XG4gIH0sIFtiYWNrZ3JvdW5kQ29sb3JdKTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHVzQmFyO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFNjcm9sbFZpZXcgZnJvbSBcIi4vc2Nyb2xsLXZpZXcuanN4XCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dC5qc3hcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTZWN0aW9uTGlzdCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBzZWN0aW9ucyxcbiAgICAgIHJlbmRlckl0ZW0sXG4gICAgICByZW5kZXJTZWN0aW9uSGVhZGVyLFxuICAgICAga2V5RXh0cmFjdG9yLFxuICAgICAgTGlzdEhlYWRlckNvbXBvbmVudCxcbiAgICAgIExpc3RGb290ZXJDb21wb25lbnQsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWQgPSB0cnVlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNlY3Rpb25saXN0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2tcbiAgICAgIGNvbnN0IHJlbmRlclNlY3Rpb25zID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gKHNlY3Rpb25zIHx8IFtdKS5tYXAoKHNlY3Rpb24sIHNlY3Rpb25JbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBzZWN0aW9uLmRhdGEgfHwgW107XG4gICAgICAgICAgY29uc3Qga2V5ID0gc2VjdGlvbi5rZXkgfHwgc2VjdGlvbkluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2tleX0+XG4gICAgICAgICAgICAgIHtyZW5kZXJTZWN0aW9uSGVhZGVyICYmIHJlbmRlclNlY3Rpb25IZWFkZXIoeyBzZWN0aW9uIH0pfVxuICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGl0ZW0sIGl0ZW1JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1LZXkgPSBrZXlFeHRyYWN0b3JcbiAgICAgICAgICAgICAgICAgID8ga2V5RXh0cmFjdG9yKGl0ZW0sIGl0ZW1JbmRleClcbiAgICAgICAgICAgICAgICAgIDogaXRlbS5rZXkgfHwgaXRlbS5pZCB8fCBrZXkgKyBcIi1cIiArIGl0ZW1JbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17aXRlbUtleX0+XG4gICAgICAgICAgICAgICAgICAgIHtyZW5kZXJJdGVtKHsgaXRlbSwgaW5kZXg6IGl0ZW1JbmRleCwgc2VjdGlvbiB9KX1cbiAgICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICB7cmVuZGVyU2VjdGlvbnMoKX1cbiAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHNlY3Rpb25zPXtzZWN0aW9uc31cbiAgICAgICAgcmVuZGVySXRlbT17cmVuZGVySXRlbX1cbiAgICAgICAgcmVuZGVyU2VjdGlvbkhlYWRlcj17cmVuZGVyU2VjdGlvbkhlYWRlcn1cbiAgICAgICAga2V5RXh0cmFjdG9yPXtrZXlFeHRyYWN0b3J9XG4gICAgICAgIExpc3RIZWFkZXJDb21wb25lbnQ9e0xpc3RIZWFkZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RGb290ZXJDb21wb25lbnQ9e0xpc3RGb290ZXJDb21wb25lbnR9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWQ9e3N0aWNreVNlY3Rpb25IZWFkZXJzRW5hYmxlZH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5TZWN0aW9uTGlzdC5kaXNwbGF5TmFtZSA9IFwiU2VjdGlvbkxpc3RcIjtcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb25MaXN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEtleWJvYXJkQXZvaWRpbmdWaWV3ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBiZWhhdmlvcixcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIGtleWJvYXJkVmVydGljYWxPZmZzZXQsXG4gICAgICBlbmFibGVkLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImtleWJvYXJkYXZvaWRpbmd2aWV3XCIpO1xuXG4gICAgLy8gT24gd2ViLCBrZXlib2FyZCBhdm9pZGluZyBpcyB1c3VhbGx5IGhhbmRsZWQgYnkgdGhlIGJyb3dzZXIgZGVmYXVsdCBiZWhhdmlvciBvciBpcyBpcnJlbGV2YW50XG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIGJlaGF2aW9yPXtiZWhhdmlvcn1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIGtleWJvYXJkVmVydGljYWxPZmZzZXQ9e2tleWJvYXJkVmVydGljYWxPZmZzZXR9XG4gICAgICAgIGVuYWJsZWQ9e2VuYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuS2V5Ym9hcmRBdm9pZGluZ1ZpZXcuZGlzcGxheU5hbWUgPSBcIktleWJvYXJkQXZvaWRpbmdWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBLZXlib2FyZEF2b2lkaW5nVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBSZWZyZXNoQ29udHJvbCA9IGZvcndhcmRSZWYoKHsgcmVmcmVzaGluZywgb25SZWZyZXNoLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInJlZnJlc2hjb250cm9sXCIpO1xuXG4gIC8vIE9uIHdlYiwgcGFzcy10aHJvdWdoIG9yIGltcGxlbWVudCBiYXNpYyB2aXN1YWw/XG4gIC8vIFVzdWFsbHkgUmVmcmVzaENvbnRyb2wgaXMgcGFzc2VkIGFzIHByb3AgdG8gU2Nyb2xsVmlldy5cbiAgLy8gSWYgdXNlZCBhcyBjb21wb25lbnQsIGl0IG1pZ2h0IHdyYXAgY29udGVudC5cblxuICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgLy8gTm8tb3AgZm9yIHdlYiB2aXN1YWwgdXN1YWxseSwgdW5sZXNzIHdlIGltcGxlbWVudCBwdWxsLXRvLXJlZnJlc2hcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudFxuICAgICAgcmVmPXtyZWZ9XG4gICAgICByZWZyZXNoaW5nPXtyZWZyZXNoaW5nfVxuICAgICAgb25SZWZyZXNoPXtvblJlZnJlc2h9XG4gICAgICB7Li4ucmVzdH1cbiAgICAvPlxuICApO1xufSk7XG5cblJlZnJlc2hDb250cm9sLmRpc3BsYXlOYW1lID0gXCJSZWZyZXNoQ29udHJvbFwiO1xuZXhwb3J0IGRlZmF1bHQgUmVmcmVzaENvbnRyb2w7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVG91Y2hhYmxlSGlnaGxpZ2h0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBvblByZXNzLFxuICAgICAgdW5kZXJsYXlDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgIGFjdGl2ZU9wYWNpdHkgPSAwLjg1LFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRvdWNoYWJsZWhpZ2hsaWdodFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3sgY3Vyc29yOiBcInBvaW50ZXJcIiB9LCBzdHlsZV0pO1xuXG4gICAgICAvLyBTaW1wbGUgd2ViIGltcGxlbWVudGF0aW9uOiBqdXN0IG9wYWNpdHksIG1pbWlja2luZyBvdmVybGF5IGlzIGhhcmRlciB3aXRob3V0IHN0YXRlXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgc3R5bGU9e2ZsYXRTdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHVuZGVybGF5Q29sb3I7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IGFjdGl2ZU9wYWNpdHk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbk1vdXNlVXA9eyhlKSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cbiAgICAgICAgICAgICAgZmxhdFN0eWxlLmJhY2tncm91bmRDb2xvciB8fCBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhlKSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cbiAgICAgICAgICAgICAgZmxhdFN0eWxlLmJhY2tncm91bmRDb2xvciB8fCBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XG4gICAgICAgIHVuZGVybGF5Q29sb3I9e3VuZGVybGF5Q29sb3J9XG4gICAgICAgIGFjdGl2ZU9wYWNpdHk9e2FjdGl2ZU9wYWNpdHl9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuVG91Y2hhYmxlSGlnaGxpZ2h0LmRpc3BsYXlOYW1lID0gXCJUb3VjaGFibGVIaWdobGlnaHRcIjtcbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZUhpZ2hsaWdodDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgY2xvbmVFbGVtZW50LCBDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2sganVzdCBhY2NlcHRzIG9uUHJlc3MgYW5kIHBhc3NlcyBpdCB0byB0aGUgY2hpbGRcbi8vIEl0IGRvZXMgbm90IGFkZCBhbnkgdmlzdWFsIGZlZWRiYWNrLlxuY29uc3QgVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrID0gKHtcbiAgY2hpbGRyZW4sXG4gIG9uUHJlc3MsXG4gIG9uUHJlc3NJbixcbiAgb25QcmVzc091dCxcbiAgZGlzYWJsZWQsXG4gIC4uLnJlc3Rcbn0pID0+IHtcbiAgY29uc3QgY2hpbGQgPSBDaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTtcblxuICByZXR1cm4gY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgb25DbGljazogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzcykgb25QcmVzcyhlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbkNsaWNrKSBjaGlsZC5wcm9wcy5vbkNsaWNrKGUpO1xuICAgIH0sXG4gICAgb25Nb3VzZURvd246IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NJbikgb25QcmVzc0luKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uTW91c2VEb3duKSBjaGlsZC5wcm9wcy5vbk1vdXNlRG93bihlKTtcbiAgICB9LFxuICAgIG9uTW91c2VVcDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc091dCkgb25QcmVzc091dChlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbk1vdXNlVXApIGNoaWxkLnByb3BzLm9uTW91c2VVcChlKTtcbiAgICB9LFxuICAgIG9uVG91Y2hTdGFydDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc0luKSBvblByZXNzSW4oZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Ub3VjaFN0YXJ0KSBjaGlsZC5wcm9wcy5vblRvdWNoU3RhcnQoZSk7XG4gICAgfSxcbiAgICBvblRvdWNoRW5kOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzT3V0KSBvblByZXNzT3V0KGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uVG91Y2hFbmQpIGNoaWxkLnByb3BzLm9uVG91Y2hFbmQoZSk7XG4gICAgfSxcbiAgICBzdHlsZToge1xuICAgICAgY3Vyc29yOiBkaXNhYmxlZCA/IFwibm90LWFsbG93ZWRcIiA6IFwicG9pbnRlclwiLFxuICAgICAgLi4uY2hpbGQucHJvcHMuc3R5bGUsXG4gICAgfSxcbiAgICAuLi5yZXN0LFxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjaztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBTY3JlZW4gQ29tcG9uZW50XHJcbiAqIEZ1bGwtaGVpZ2h0IHNjcmVlbiBjb250YWluZXIgd2l0aCBiYWNrZ3JvdW5kXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBTY3JlZW4gPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBiYWNrZ3JvdW5kID0gJ2xpZ2h0JywgY2xhc3NOYW1lID0gJycsIHN0eWxlLCAuLi5wcm9wcyB9LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5TY3JlZW4uZGlzcGxheU5hbWUgPSBcIlNjcmVlblwiO1xyXG5leHBvcnQgZGVmYXVsdCBTY3JlZW47XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBDb250YWluZXIgQ29tcG9uZW50XHJcbiAqIFJlc3BvbnNpdmUgY29udGFpbmVyIHdpdGggbWF4LXdpZHRoIGFuZCBjZW50ZXJpbmdcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IENvbnRhaW5lciA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkNvbnRhaW5lci5kaXNwbGF5TmFtZSA9IFwiQ29udGFpbmVyXCI7XHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIENhcmQgQ29tcG9uZW50XHJcbiAqIFN0eWxlZCBjYXJkIGNvbnRhaW5lciB3aXRoIHNoYWRvdyBhbmQgcm91bmRlZCBjb3JuZXJzXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBDYXJkID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuQ2FyZC5kaXNwbGF5TmFtZSA9IFwiQ2FyZFwiO1xyXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgR3JpZCBDb21wb25lbnRcclxuICogUmVzcG9uc2l2ZSBncmlkIGxheW91dCBzeXN0ZW1cclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IEdyaWQgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5HcmlkLmRpc3BsYXlOYW1lID0gXCJHcmlkXCI7XHJcbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBTdGFjayBDb21wb25lbnRcclxuICogVmVydGljYWwgb3IgaG9yaXpvbnRhbCBsYXlvdXQgd2l0aCBzcGFjaW5nXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBTdGFjayA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJyxcclxuICAgIHNwYWNpbmcgPSA0LFxyXG4gICAgYWxpZ24gPSAnc3RhcnQnLFxyXG4gICAganVzdGlmeSA9ICdzdGFydCcsXHJcbiAgICBjbGFzc05hbWUgPSAnJyxcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuU3RhY2suZGlzcGxheU5hbWUgPSBcIlN0YWNrXCI7XHJcbmV4cG9ydCBkZWZhdWx0IFN0YWNrO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dC5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgSWNvbiBDb21wb25lbnRcclxuICogRGlzcGxheXMgZW1vamkgaWNvbnMgY29uc2lzdGVudGx5IGFjcm9zcyBwbGF0Zm9ybXNcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IEljb24gPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBuYW1lLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUZXh0IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge25hbWV9XHJcbiAgICAgICAgPC9UZXh0ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuSWNvbi5kaXNwbGF5TmFtZSA9IFwiSWNvblwiO1xyXG5leHBvcnQgZGVmYXVsdCBJY29uO1xyXG4iLCAiLy8gRGltZW5zaW9ucyBBUEkgZm9yIFdlYlxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5jb25zdCBsaXN0ZW5lcnMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICBsaXN0ZW5lcnMuZW1pdChcImNoYW5nZVwiLCB7IHdpbmRvdzogZ2V0V2luZG93KCksIHNjcmVlbjogZ2V0U2NyZWVuKCkgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3coKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHNjYWxlOiAxLCBmb250U2NhbGU6IDEgfTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgc2NhbGU6IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsXG4gICAgZm9udFNjYWxlOiAxLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTY3JlZW4oKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHNjYWxlOiAxLCBmb250U2NhbGU6IDEgfTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2luZG93LnNjcmVlbi53aWR0aCxcbiAgICBoZWlnaHQ6IHdpbmRvdy5zY3JlZW4uaGVpZ2h0LFxuICAgIHNjYWxlOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLFxuICAgIGZvbnRTY2FsZTogMSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IERpbWVuc2lvbnMgPSB7XG4gIGdldDogKGRpbSkgPT4ge1xuICAgIGlmIChkaW0gPT09IFwid2luZG93XCIpIHJldHVybiBnZXRXaW5kb3coKTtcbiAgICBpZiAoZGltID09PSBcInNjcmVlblwiKSByZXR1cm4gZ2V0U2NyZWVuKCk7XG4gICAgcmV0dXJuIGdldFdpbmRvdygpO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcImNoYW5nZVwiKSB7XG4gICAgICBsaXN0ZW5lcnMub24oXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6ICgpID0+IGxpc3RlbmVycy5vZmYoXCJjaGFuZ2VcIiwgaGFuZGxlciksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyByZW1vdmU6ICgpID0+IHt9IH07XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwiY2hhbmdlXCIpIHtcbiAgICAgIGxpc3RlbmVycy5vZmYoXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGltZW5zaW9ucztcbiIsICJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRzXCI7XG5cbmNvbnN0IGV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuZXhwb3J0IGNvbnN0IExpbmtpbmcgPSB7XG4gIG9wZW5VUkw6ICh1cmwpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgd2luZG93Lm9wZW4odXJsLCBcIl9ibGFua1wiLCBcIm5vb3BlbmVyLG5vcmVmZXJyZXJcIik7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfSxcbiAgY2FuT3BlblVSTDogKHVybCkgPT4gUHJvbWlzZS5yZXNvbHZlKHRydWUpLFxuICBnZXRJbml0aWFsVVJMOiAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcInVybFwiKSB7XG4gICAgICAvLyBJbiBhIHJlYWwgd2ViIGFwcCwgd2UgbWlnaHQgbGlzdGVuIHRvIHBvcHN0YXRlIG9yIGhhc2hjaGFuZ2VcbiAgICAgIC8vIGVuc3VyaW5nIHdlIHJldHVybiBhIHN1YnNjcmlwdGlvbi1saWtlIG9iamVjdFxuICAgICAgY29uc3QgbGlzdGVuZXIgPSAoZSkgPT4gaGFuZGxlcih7IHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGxpc3RlbmVyKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBsaXN0ZW5lciksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyByZW1vdmU6ICgpID0+IHt9IH07XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgLy8gRGVwcmVjYXRlZCBpbiBSTiBidXQgZ29vZCB0byBoYXZlIHNpZ25hdHVyZVxuICB9LFxuICBzZW5kSW50ZW50OiAoYWN0aW9uLCBleHRyYXMpID0+IFByb21pc2UucmVzb2x2ZSgpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlua2luZztcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgdmFyaWFudHMgPSB7XHJcbiAgcHJpbWFyeTogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmF5LTkwMCB2aWEtZ3JheS04MDAgdG8tZ3JheS05MDAgYmctW2xlbmd0aDoyMDAlX2F1dG9dIHRleHQtd2hpdGUgaG92ZXI6YmctcmlnaHQtdG9wIHNoYWRvdy1sZyBzaGFkb3ctZ3JheS05MDAvMjAgaG92ZXI6c2hhZG93LXhsIGhvdmVyOnNoYWRvdy1ncmF5LTkwMC8zMCcsXHJcbiAgc2Vjb25kYXJ5OiAnYmctd2hpdGUgdGV4dC1ncmF5LTkwMCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIGhvdmVyOmJvcmRlci1ncmF5LTMwMCBob3ZlcjpiZy1ncmF5LTUwIHNoYWRvdy1zbSBob3ZlcjpzaGFkb3ctbWQnLFxyXG4gIG91dGxpbmU6ICdiZy10cmFuc3BhcmVudCB0ZXh0LWluZGlnby02MDAgYm9yZGVyLTIgYm9yZGVyLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTYwMCBob3Zlcjp0ZXh0LXdoaXRlJyxcclxuICBnaG9zdDogJ2JnLXRyYW5zcGFyZW50IHRleHQtZ3JheS02MDAgaG92ZXI6dGV4dC1ncmF5LTkwMCBob3ZlcjpiZy1ncmF5LTEwMCcsXHJcbiAgZGFuZ2VyOiAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC02MDAgdG8tcm9zZS02MDAgdGV4dC13aGl0ZSBob3Zlcjpmcm9tLXJlZC03MDAgaG92ZXI6dG8tcm9zZS03MDAgc2hhZG93LWxnIHNoYWRvdy1yZWQtNTAwLzIwJyxcclxuICBzdWNjZXNzOiAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTYwMCB0by1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlIGhvdmVyOmZyb20tZ3JlZW4tNzAwIGhvdmVyOnRvLWVtZXJhbGQtNzAwIHNoYWRvdy1sZyBzaGFkb3ctZ3JlZW4tNTAwLzIwJyxcclxuICBncmFkaWVudDogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNjAwIHZpYS1wdXJwbGUtNjAwIHRvLWluZGlnby02MDAgYmctW2xlbmd0aDoyMDAlX2F1dG9dIHRleHQtd2hpdGUgaG92ZXI6YmctcmlnaHQtdG9wIHNoYWRvdy1sZyBzaGFkb3ctaW5kaWdvLTUwMC8zMCBob3ZlcjpzaGFkb3cteGwgaG92ZXI6c2hhZG93LWluZGlnby01MDAvNDAnLFxyXG59O1xyXG5cclxuY29uc3Qgc2l6ZXMgPSB7XHJcbiAgc206ICdweC0zLjUgcHktMS41IHRleHQtc20gZ2FwLTEuNScsXHJcbiAgbWQ6ICdweC01IHB5LTIuNSB0ZXh0LXNtIGdhcC0yJyxcclxuICBsZzogJ3B4LTYgcHktMyB0ZXh0LWJhc2UgZ2FwLTInLFxyXG4gIHhsOiAncHgtOCBweS00IHRleHQtbGcgZ2FwLTIuNScsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBCdXR0b24oe1xyXG4gIGNoaWxkcmVuLFxyXG4gIHZhcmlhbnQgPSAncHJpbWFyeScsXHJcbiAgc2l6ZSA9ICdtZCcsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBsb2FkaW5nID0gZmFsc2UsXHJcbiAgaWNvbixcclxuICBpY29uUG9zaXRpb24gPSAnbGVmdCcsXHJcbiAgZnVsbFdpZHRoID0gZmFsc2UsXHJcbiAgY2xhc3NOYW1lID0gJycsXHJcbiAgLi4ucHJvcHNcclxufSkge1xyXG4gIGNvbnN0IGJhc2VTdHlsZXMgPSBgXHJcbiAgICBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC1zZW1pYm9sZCByb3VuZGVkLXhsIFxyXG4gICAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGVhc2Utb3V0XHJcbiAgICBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLWluZGlnby01MDAgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC0yIFxyXG4gICAgZGlzYWJsZWQ6b3BhY2l0eS01MCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6dHJhbnNmb3JtLW5vbmVcclxuICAgIHRyYW5zZm9ybSBob3ZlcjotdHJhbnNsYXRlLXktMC41IGFjdGl2ZTp0cmFuc2xhdGUteS0wIGFjdGl2ZTpzY2FsZS1bMC45OF1cclxuICBgO1xyXG4gIFxyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgICR7YmFzZVN0eWxlc31cclxuICAgICAgICAke3ZhcmlhbnRzW3ZhcmlhbnRdfVxyXG4gICAgICAgICR7c2l6ZXNbc2l6ZV19XHJcbiAgICAgICAgJHtmdWxsV2lkdGggPyAndy1mdWxsJyA6ICcnfVxyXG4gICAgICAgICR7Y2xhc3NOYW1lfVxyXG4gICAgICBgfVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgbG9hZGluZ31cclxuICAgICAgey4uLnByb3BzfVxyXG4gICAgPlxyXG4gICAgICB7bG9hZGluZyAmJiAoXHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJhbmltYXRlLXNwaW4gaC00IHctNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiPlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJvcGFjaXR5LTI1XCIgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjNcIiAvPlxyXG4gICAgICAgICAgPHBhdGggY2xhc3NOYW1lPVwib3BhY2l0eS03NVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQgMTJhOCA4IDAgMDE4LThWMEM1LjM3MyAwIDAgNS4zNzMgMCAxMmg0em0yIDUuMjkxQTcuOTYyIDcuOTYyIDAgMDE0IDEySDBjMCAzLjA0MiAxLjEzNSA1LjgyNCAzIDcuOTM4bDMtMi42NDd6XCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgKX1cclxuICAgICAgeyFsb2FkaW5nICYmIGljb24gJiYgaWNvblBvc2l0aW9uID09PSAnbGVmdCcgJiYgaWNvbn1cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgICB7IWxvYWRpbmcgJiYgaWNvbiAmJiBpY29uUG9zaXRpb24gPT09ICdyaWdodCcgJiYgaWNvbn1cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIEljb24gQnV0dG9uIHZhcmlhbnRcclxuZXhwb3J0IGZ1bmN0aW9uIEljb25CdXR0b24oe1xyXG4gIGNoaWxkcmVuLFxyXG4gIHZhcmlhbnQgPSAnZ2hvc3QnLFxyXG4gIHNpemUgPSAnbWQnLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG4gIC4uLnByb3BzXHJcbn0pIHtcclxuICBjb25zdCBpY29uU2l6ZXMgPSB7XHJcbiAgICBzbTogJ3AtMS41JyxcclxuICAgIG1kOiAncC0yLjUnLFxyXG4gICAgbGc6ICdwLTMnLFxyXG4gICAgeGw6ICdwLTQnLFxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLXhsIFxyXG4gICAgICAgIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBlYXNlLW91dFxyXG4gICAgICAgIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctaW5kaWdvLTUwMCBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTJcclxuICAgICAgICB0cmFuc2Zvcm0gaG92ZXI6c2NhbGUtMTA1IGFjdGl2ZTpzY2FsZS05NVxyXG4gICAgICAgICR7dmFyaWFudHNbdmFyaWFudF19XHJcbiAgICAgICAgJHtpY29uU2l6ZXNbc2l6ZV19XHJcbiAgICAgICAgJHtjbGFzc05hbWV9XHJcbiAgICAgIGB9XHJcbiAgICAgIHsuLi5wcm9wc31cclxuICAgID5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gQnV0dG9uIEdyb3VwXHJcbmV4cG9ydCBmdW5jdGlvbiBCdXR0b25Hcm91cCh7IGNoaWxkcmVuLCBjbGFzc05hbWUgPSAnJyB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgaW5saW5lLWZsZXggcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LXNtICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICB7UmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKCFSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcclxuICAgICAgICAgIGNsYXNzTmFtZTogYCR7Y2hpbGQucHJvcHMuY2xhc3NOYW1lIHx8ICcnfSByb3VuZGVkLW5vbmUgZmlyc3Q6cm91bmRlZC1sLXhsIGxhc3Q6cm91bmRlZC1yLXhsIGJvcmRlci1yLTAgbGFzdDpib3JkZXItciBzaGFkb3ctbm9uZSBob3ZlcjpzaGFkb3ctbm9uZSB0cmFuc2Zvcm0tbm9uZSBob3Zlcjp0cmFuc2Zvcm0tbm9uZWAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IHZhcmlhbnRzID0ge1xyXG4gIGRlZmF1bHQ6ICdiZy1ncmF5LTEwMCB0ZXh0LWdyYXktNzAwIGJvcmRlciBib3JkZXItZ3JheS0yMDAvNTAnLFxyXG4gIHByaW1hcnk6ICdiZy1pbmRpZ28tNTAgdGV4dC1pbmRpZ28tNzAwIGJvcmRlciBib3JkZXItaW5kaWdvLTEwMCcsXHJcbiAgc2Vjb25kYXJ5OiAnYmctcHVycGxlLTUwIHRleHQtcHVycGxlLTcwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS0xMDAnLFxyXG4gIHN1Y2Nlc3M6ICdiZy1lbWVyYWxkLTUwIHRleHQtZW1lcmFsZC03MDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTEwMCcsXHJcbiAgd2FybmluZzogJ2JnLWFtYmVyLTUwIHRleHQtYW1iZXItNzAwIGJvcmRlciBib3JkZXItYW1iZXItMTAwJyxcclxuICBkYW5nZXI6ICdiZy1yZWQtNTAgdGV4dC1yZWQtNzAwIGJvcmRlciBib3JkZXItcmVkLTEwMCcsXHJcbiAgaW5mbzogJ2JnLXNreS01MCB0ZXh0LXNreS03MDAgYm9yZGVyIGJvcmRlci1za3ktMTAwJyxcclxuICBvdXRsaW5lOiAnYmctdHJhbnNwYXJlbnQgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktNjAwJyxcclxuICBncmFkaWVudDogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNTAwIHZpYS1wdXJwbGUtNTAwIHRvLXBpbmstNTAwIHRleHQtd2hpdGUgYm9yZGVyLTAgc2hhZG93LXNtJyxcclxufTtcclxuXHJcbmNvbnN0IHNpemVzID0ge1xyXG4gIHNtOiAncHgtMiBweS0wLjUgdGV4dC14cycsXHJcbiAgbWQ6ICdweC0yLjUgcHktMSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQnLFxyXG4gIGxnOiAncHgtMyBweS0xLjUgdGV4dC1zbScsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBCYWRnZSh7XHJcbiAgY2hpbGRyZW4sXHJcbiAgdmFyaWFudCA9ICdkZWZhdWx0JyxcclxuICBzaXplID0gJ21kJyxcclxuICBkb3QgPSBmYWxzZSxcclxuICBkb3RDb2xvciA9ICdiZy1jdXJyZW50JyxcclxuICByZW1vdmFibGUgPSBmYWxzZSxcclxuICBvblJlbW92ZSxcclxuICBpY29uLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG4gIC4uLnByb3BzXHJcbn0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNwYW5cclxuICAgICAgY2xhc3NOYW1lPXtgXHJcbiAgICAgICAgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgZm9udC1tZWRpdW0gcm91bmRlZC1mdWxsXHJcbiAgICAgICAgJHt2YXJpYW50c1t2YXJpYW50XX1cclxuICAgICAgICAke3NpemVzW3NpemVdfVxyXG4gICAgICAgICR7Y2xhc3NOYW1lfVxyXG4gICAgICBgfVxyXG4gICAgICB7Li4ucHJvcHN9XHJcbiAgICA+XHJcbiAgICAgIHtkb3QgJiYgKFxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHctMS41IGgtMS41IHJvdW5kZWQtZnVsbCAke2RvdENvbG9yfWB9IC8+XHJcbiAgICAgICl9XHJcbiAgICAgIHtpY29uICYmIDxzcGFuIGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTBcIj57aWNvbn08L3NwYW4+fVxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIHtyZW1vdmFibGUgJiYgKFxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIG9uQ2xpY2s9e29uUmVtb3ZlfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC1zaHJpbmstMCBtbC0wLjUgaG92ZXI6YmctYmxhY2svMTAgcm91bmRlZC1mdWxsIHAtMC41IHRyYW5zaXRpb24tY29sb3JzXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctMyBoLTNcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTYgMThMMTggNk02IDZsMTIgMTJcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICl9XHJcbiAgICA8L3NwYW4+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gU3RhdHVzIEJhZGdlIHdpdGggcHVsc2UgYW5pbWF0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBTdGF0dXNCYWRnZSh7IHN0YXR1cyA9ICdvbmxpbmUnLCBjbGFzc05hbWUgPSAnJyB9KSB7XHJcbiAgY29uc3Qgc3RhdHVzQ29uZmlnID0ge1xyXG4gICAgb25saW5lOiB7IGNvbG9yOiAnYmctZ3JlZW4tNTAwJywgbGFiZWw6ICdPbmxpbmUnIH0sXHJcbiAgICBvZmZsaW5lOiB7IGNvbG9yOiAnYmctZ3JheS00MDAnLCBsYWJlbDogJ09mZmxpbmUnIH0sXHJcbiAgICBhd2F5OiB7IGNvbG9yOiAnYmcteWVsbG93LTUwMCcsIGxhYmVsOiAnQXdheScgfSxcclxuICAgIGJ1c3k6IHsgY29sb3I6ICdiZy1yZWQtNTAwJywgbGFiZWw6ICdCdXN5JyB9LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNvbmZpZyA9IHN0YXR1c0NvbmZpZ1tzdGF0dXNdIHx8IHN0YXR1c0NvbmZpZy5vZmZsaW5lO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNwYW4gY2xhc3NOYW1lPXtgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1zbSB0ZXh0LWdyYXktNjAwICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGgtMiB3LTJcIj5cclxuICAgICAgICB7c3RhdHVzID09PSAnb25saW5lJyAmJiAoXHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BhbmltYXRlLXBpbmcgYWJzb2x1dGUgaW5saW5lLWZsZXggaC1mdWxsIHctZnVsbCByb3VuZGVkLWZ1bGwgJHtjb25maWcuY29sb3J9IG9wYWNpdHktNzVgfSAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcmVsYXRpdmUgaW5saW5lLWZsZXggcm91bmRlZC1mdWxsIGgtMiB3LTIgJHtjb25maWcuY29sb3J9YH0gLz5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgICB7Y29uZmlnLmxhYmVsfVxyXG4gICAgPC9zcGFuPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIE5vdGlmaWNhdGlvbiBCYWRnZVxyXG5leHBvcnQgZnVuY3Rpb24gTm90aWZpY2F0aW9uQmFkZ2UoeyBjb3VudCA9IDAsIG1heCA9IDk5LCBjbGFzc05hbWUgPSAnJyB9KSB7XHJcbiAgaWYgKGNvdW50ID09PSAwKSByZXR1cm4gbnVsbDtcclxuICBcclxuICBjb25zdCBkaXNwbGF5Q291bnQgPSBjb3VudCA+IG1heCA/IGAke21heH0rYCA6IGNvdW50O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNwYW5cclxuICAgICAgY2xhc3NOYW1lPXtgXHJcbiAgICAgICAgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1pbi13LVsxLjI1cmVtXSBoLTUgcHgtMS41IFxyXG4gICAgICAgIHRleHQteHMgZm9udC1ib2xkIHRleHQtd2hpdGUgYmctcmVkLTUwMCByb3VuZGVkLWZ1bGxcclxuICAgICAgICAke2NsYXNzTmFtZX1cclxuICAgICAgYH1cclxuICAgID5cclxuICAgICAge2Rpc3BsYXlDb3VudH1cclxuICAgIDwvc3Bhbj5cclxuICApO1xyXG59XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FyZCh7XHJcbiAgY2hpbGRyZW4sXHJcbiAgY2xhc3NOYW1lID0gJycsXHJcbiAgaG92ZXIgPSBmYWxzZSxcclxuICBncmFkaWVudCA9IGZhbHNlLFxyXG4gIHBhZGRpbmcgPSAnbWQnLFxyXG4gIGdsYXNzID0gZmFsc2UsXHJcbiAgLi4ucHJvcHNcclxufSkge1xyXG4gIGNvbnN0IHBhZGRpbmdzID0ge1xyXG4gICAgbm9uZTogJycsXHJcbiAgICBzbTogJ3AtNCcsXHJcbiAgICBtZDogJ3AtNicsXHJcbiAgICBsZzogJ3AtOCcsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYmFzZVN0eWxlcyA9IGdsYXNzIFxyXG4gICAgPyAnYmctd2hpdGUvNjAgYmFja2Ryb3AtYmx1ci14bCBib3JkZXItd2hpdGUvMzAnIFxyXG4gICAgOiAnYmctd2hpdGUgYm9yZGVyLWdyYXktMTAwJztcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtgXHJcbiAgICAgICAgcm91bmRlZC0yeGwgYm9yZGVyIHNoYWRvdy1zbVxyXG4gICAgICAgICR7YmFzZVN0eWxlc31cclxuICAgICAgICAke2hvdmVyID8gJ2hvdmVyOnNoYWRvdy14bCBob3ZlcjpzaGFkb3ctZ3JheS05MDAvNSBob3Zlcjpib3JkZXItZ3JheS0yMDAgaG92ZXI6LXRyYW5zbGF0ZS15LTEgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGVhc2Utb3V0IGN1cnNvci1wb2ludGVyJyA6ICcnfVxyXG4gICAgICAgICR7Z3JhZGllbnQgPyAnYmctZ3JhZGllbnQtdG8tYnIgZnJvbS13aGl0ZSB2aWEtd2hpdGUgdG8tZ3JheS01MC84MCcgOiAnJ31cclxuICAgICAgICAke3BhZGRpbmdzW3BhZGRpbmddfVxyXG4gICAgICAgICR7Y2xhc3NOYW1lfVxyXG4gICAgICBgfVxyXG4gICAgICB7Li4ucHJvcHN9XHJcbiAgICA+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIENhcmQgSGVhZGVyXHJcbmV4cG9ydCBmdW5jdGlvbiBDYXJkSGVhZGVyKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSA9ICcnLCBhY3Rpb25zIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNCAke2NsYXNzTmFtZX1gfT5cclxuICAgICAgPGRpdj57Y2hpbGRyZW59PC9kaXY+XHJcbiAgICAgIHthY3Rpb25zICYmIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj57YWN0aW9uc308L2Rpdj59XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBDYXJkIFRpdGxlXHJcbmV4cG9ydCBmdW5jdGlvbiBDYXJkVGl0bGUoeyBjaGlsZHJlbiwgY2xhc3NOYW1lID0gJycgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8aDMgY2xhc3NOYW1lPXtgdGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCB0cmFja2luZy10aWdodCAke2NsYXNzTmFtZX1gfT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9oMz5cclxuICApO1xyXG59XHJcblxyXG4vLyBDYXJkIERlc2NyaXB0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBDYXJkRGVzY3JpcHRpb24oeyBjaGlsZHJlbiwgY2xhc3NOYW1lID0gJycgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8cCBjbGFzc05hbWU9e2B0ZXh0LWdyYXktNTAwIG10LTEuNSBsZWFkaW5nLXJlbGF4ZWQgJHtjbGFzc05hbWV9YH0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvcD5cclxuICApO1xyXG59XHJcblxyXG4vLyBDYXJkIENvbnRlbnRcclxuZXhwb3J0IGZ1bmN0aW9uIENhcmRDb250ZW50KHsgY2hpbGRyZW4sIGNsYXNzTmFtZSA9ICcnIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIENhcmQgRm9vdGVyXHJcbmV4cG9ydCBmdW5jdGlvbiBDYXJkRm9vdGVyKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSA9ICcnIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2BtdC02IHB0LTQgYm9yZGVyLXQgYm9yZGVyLWdyYXktMTAwICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBGZWF0dXJlIENhcmQgd2l0aCBJY29uXHJcbmV4cG9ydCBmdW5jdGlvbiBGZWF0dXJlQ2FyZCh7XHJcbiAgaWNvbixcclxuICB0aXRsZSxcclxuICBkZXNjcmlwdGlvbixcclxuICBocmVmLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG59KSB7XHJcbiAgY29uc3QgY29udGVudCA9IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgZ3JvdXAgcmVsYXRpdmUgcC02IGJnLXdoaXRlIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItZ3JheS0xMDAgaG92ZXI6Ym9yZGVyLWluZGlnby0yMDAgc2hhZG93LXNtIGhvdmVyOnNoYWRvdy14bCBob3ZlcjpzaGFkb3ctaW5kaWdvLTEwMC81MCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6LXRyYW5zbGF0ZS15LTEgJHtjbGFzc05hbWV9YH0+XHJcbiAgICAgIHsvKiBHcmFkaWVudCBvdmVybGF5IG9uIGhvdmVyICovfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tNTAvMCB2aWEtdHJhbnNwYXJlbnQgdG8tcHVycGxlLTUwLzAgZ3JvdXAtaG92ZXI6ZnJvbS1pbmRpZ28tNTAvNTAgZ3JvdXAtaG92ZXI6dG8tcHVycGxlLTUwLzUwIHJvdW5kZWQtMnhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiPjwvZGl2PlxyXG4gICAgICBcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgIHtpY29uICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tMTAwIHRvLXB1cnBsZS0xMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1pbmRpZ28tNjAwIG1iLTQgZ3JvdXAtaG92ZXI6ZnJvbS1pbmRpZ28tNjAwIGdyb3VwLWhvdmVyOnRvLXB1cnBsZS02MDAgZ3JvdXAtaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIGdyb3VwLWhvdmVyOnNoYWRvdy1sZyBncm91cC1ob3ZlcjpzaGFkb3ctaW5kaWdvLTIwMFwiPlxyXG4gICAgICAgICAgICB7aWNvbn1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItMlwiPnt0aXRsZX08L2gzPlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDAgbGVhZGluZy1yZWxheGVkIHRleHQtc21cIj57ZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgIHtocmVmICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LWluZGlnby02MDAgZm9udC1tZWRpdW0gdGV4dC1zbSBncm91cC1ob3ZlcjpnYXAtMiB0cmFuc2l0aW9uLWFsbFwiPlxyXG4gICAgICAgICAgICBMZWFybiBtb3JlXHJcbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy00IGgtNCBncm91cC1ob3Zlcjp0cmFuc2xhdGUteC0xIHRyYW5zaXRpb24tdHJhbnNmb3JtXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTkgNWw3IDctNyA3XCIgLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcblxyXG4gIGlmIChocmVmKSB7XHJcbiAgICByZXR1cm4gPGEgaHJlZj17aHJlZn0+e2NvbnRlbnR9PC9hPjtcclxuICB9XHJcbiAgcmV0dXJuIGNvbnRlbnQ7XHJcbn1cclxuXHJcbi8vIFN0YXRzIENhcmRcclxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRzQ2FyZCh7XHJcbiAgbGFiZWwsXHJcbiAgdmFsdWUsXHJcbiAgY2hhbmdlLFxyXG4gIGNoYW5nZVR5cGUgPSAnbmV1dHJhbCcsXHJcbiAgaWNvbixcclxuICBjbGFzc05hbWUgPSAnJyxcclxufSkge1xyXG4gIGNvbnN0IGNoYW5nZUNvbG9ycyA9IHtcclxuICAgIHBvc2l0aXZlOiAndGV4dC1lbWVyYWxkLTYwMCBiZy1lbWVyYWxkLTUwIGJvcmRlciBib3JkZXItZW1lcmFsZC0xMDAnLFxyXG4gICAgbmVnYXRpdmU6ICd0ZXh0LXJlZC02MDAgYmctcmVkLTUwIGJvcmRlciBib3JkZXItcmVkLTEwMCcsXHJcbiAgICBuZXV0cmFsOiAndGV4dC1ncmF5LTYwMCBiZy1ncmF5LTUwIGJvcmRlciBib3JkZXItZ3JheS0xMDAnLFxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHAtNiBiZy13aGl0ZSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIHNoYWRvdy1zbSBob3ZlcjpzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi00XCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCB0ZXh0LXNtIGZvbnQtbWVkaXVtXCI+e2xhYmVsfTwvc3Bhbj5cclxuICAgICAgICB7aWNvbiAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tZ3JheS01MCB0by1ncmF5LTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LWdyYXktNTAwXCI+XHJcbiAgICAgICAgICAgIHtpY29ufVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItMiB0cmFja2luZy10aWdodFwiPnt2YWx1ZX08L2Rpdj5cclxuICAgICAge2NoYW5nZSAmJiAoXHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQteHMgZm9udC1zZW1pYm9sZCBweC0yLjUgcHktMSByb3VuZGVkLWZ1bGwgJHtjaGFuZ2VDb2xvcnNbY2hhbmdlVHlwZV19YH0+XHJcbiAgICAgICAgICB7Y2hhbmdlVHlwZSA9PT0gJ3Bvc2l0aXZlJyAmJiAoXHJcbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezIuNX0gZD1cIk03IDExbDUtNW0wIDBsNSA1bS01LTV2MTJcIiAvPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICB7Y2hhbmdlVHlwZSA9PT0gJ25lZ2F0aXZlJyAmJiAoXHJcbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezIuNX0gZD1cIk0xNyAxM2wtNSA1bTAgMGwtNS01bTUgNVY2XCIgLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAge2NoYW5nZX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBJbWFnZSBDYXJkXHJcbmV4cG9ydCBmdW5jdGlvbiBJbWFnZUNhcmQoe1xyXG4gIGltYWdlLFxyXG4gIHRpdGxlLFxyXG4gIGRlc2NyaXB0aW9uLFxyXG4gIHRhZ3MgPSBbXSxcclxuICBhY3Rpb25zLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG59KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgZ3JvdXAgYmctd2hpdGUgcm91bmRlZC0yeGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItZ3JheS0yMDAgaG92ZXI6c2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke2NsYXNzTmFtZX1gfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBoLTQ4IG92ZXJmbG93LWhpZGRlblwiPlxyXG4gICAgICAgIDxpbWcgXHJcbiAgICAgICAgICBzcmM9e2ltYWdlfSBcclxuICAgICAgICAgIGFsdD17dGl0bGV9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlciBncm91cC1ob3ZlcjpzY2FsZS0xMDUgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tNTAwXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIHthY3Rpb25zICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ibGFjay81MCBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbi1vcGFjaXR5IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCI+XHJcbiAgICAgICAgICAgIHthY3Rpb25zfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02XCI+XHJcbiAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTJcIj57dGl0bGV9PC9oMz5cclxuICAgICAgICB7ZGVzY3JpcHRpb24gJiYgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCBtYi00XCI+e2Rlc2NyaXB0aW9ufTwvcD59XHJcbiAgICAgICAge3RhZ3MubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0yXCI+XHJcbiAgICAgICAgICAgIHt0YWdzLm1hcCgodGFnLCBpZHgpID0+IChcclxuICAgICAgICAgICAgICA8c3BhbiBrZXk9e2lkeH0gY2xhc3NOYW1lPVwicHgtMyBweS0xIGJnLWdyYXktMTAwIHRleHQtZ3JheS02MDAgcm91bmRlZC1mdWxsIHRleHQtc21cIj5cclxuICAgICAgICAgICAgICAgIHt0YWd9XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBJbnB1dCA9IGZvcndhcmRSZWYoKHtcclxuICBsYWJlbCxcclxuICB0eXBlID0gJ3RleHQnLFxyXG4gIGVycm9yLFxyXG4gIGhpbnQsXHJcbiAgaWNvbixcclxuICBpY29uUG9zaXRpb24gPSAnbGVmdCcsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBjbGFzc05hbWUgPSAnJyxcclxuICBjb250YWluZXJDbGFzc05hbWUgPSAnJyxcclxuICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NvbnRhaW5lckNsYXNzTmFtZX0+XHJcbiAgICAgIHtsYWJlbCAmJiAoXHJcbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xLjVcIj5cclxuICAgICAgICAgIHtsYWJlbH1cclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICApfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAge2ljb24gJiYgaWNvblBvc2l0aW9uID09PSAnbGVmdCcgJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTMgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHRleHQtZ3JheS00MDBcIj5cclxuICAgICAgICAgICAge2ljb259XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgcmVmPXtyZWZ9XHJcbiAgICAgICAgICB0eXBlPXt0eXBlfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgXHJcbiAgICAgICAgICAgIHctZnVsbCBweC00IHB5LTMgcm91bmRlZC14bCBib3JkZXIgYmctd2hpdGVcclxuICAgICAgICAgICAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwXHJcbiAgICAgICAgICAgIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFxyXG4gICAgICAgICAgICBkaXNhYmxlZDpiZy1ncmF5LTEwMCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWRcclxuICAgICAgICAgICAgJHtpY29uICYmIGljb25Qb3NpdGlvbiA9PT0gJ2xlZnQnID8gJ3BsLTEwJyA6ICcnfVxyXG4gICAgICAgICAgICAke2ljb24gJiYgaWNvblBvc2l0aW9uID09PSAncmlnaHQnID8gJ3ByLTEwJyA6ICcnfVxyXG4gICAgICAgICAgICAke2Vycm9yID8gJ2JvcmRlci1yZWQtNTAwIGZvY3VzOnJpbmctcmVkLTUwMCcgOiAnYm9yZGVyLWdyYXktMzAwJ31cclxuICAgICAgICAgICAgJHtjbGFzc05hbWV9XHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgICAgey4uLnByb3BzfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAge2ljb24gJiYgaWNvblBvc2l0aW9uID09PSAncmlnaHQnICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMyB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdGV4dC1ncmF5LTQwMFwiPlxyXG4gICAgICAgICAgICB7aWNvbn1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7ZXJyb3IgJiYgKFxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEuNSB0ZXh0LXNtIHRleHQtcmVkLTYwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxyXG4gICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17Mn0gZD1cIk0xMiA4djRtMCA0aC4wMU0yMSAxMmE5IDkgMCAxMS0xOCAwIDkgOSAwIDAxMTggMHpcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICB7ZXJyb3J9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICApfVxyXG4gICAgICB7aGludCAmJiAhZXJyb3IgJiYgKFxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEuNSB0ZXh0LXNtIHRleHQtZ3JheS01MDBcIj57aGludH08L3A+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59KTtcclxuXHJcbklucHV0LmRpc3BsYXlOYW1lID0gJ0lucHV0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0O1xyXG5cclxuLy8gVGV4dGFyZWEgQ29tcG9uZW50XHJcbmV4cG9ydCBjb25zdCBUZXh0YXJlYSA9IGZvcndhcmRSZWYoKHtcclxuICBsYWJlbCxcclxuICBlcnJvcixcclxuICBoaW50LFxyXG4gIHJvd3MgPSA0LFxyXG4gIGRpc2FibGVkID0gZmFsc2UsXHJcbiAgY2xhc3NOYW1lID0gJycsXHJcbiAgY29udGFpbmVyQ2xhc3NOYW1lID0gJycsXHJcbiAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc05hbWV9PlxyXG4gICAgICB7bGFiZWwgJiYgKFxyXG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMS41XCI+XHJcbiAgICAgICAgICB7bGFiZWx9XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgKX1cclxuICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgcmVmPXtyZWZ9XHJcbiAgICAgICAgcm93cz17cm93c31cclxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgY2xhc3NOYW1lPXtgXHJcbiAgICAgICAgICB3LWZ1bGwgcHgtNCBweS0zIHJvdW5kZWQteGwgYm9yZGVyIGJnLXdoaXRlIHJlc2l6ZS1ub25lXHJcbiAgICAgICAgICB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDBcclxuICAgICAgICAgIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFxyXG4gICAgICAgICAgZGlzYWJsZWQ6YmctZ3JheS0xMDAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXHJcbiAgICAgICAgICAke2Vycm9yID8gJ2JvcmRlci1yZWQtNTAwIGZvY3VzOnJpbmctcmVkLTUwMCcgOiAnYm9yZGVyLWdyYXktMzAwJ31cclxuICAgICAgICAgICR7Y2xhc3NOYW1lfVxyXG4gICAgICAgIGB9XHJcbiAgICAgICAgey4uLnByb3BzfVxyXG4gICAgICAvPlxyXG4gICAgICB7ZXJyb3IgJiYgKFxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEuNSB0ZXh0LXNtIHRleHQtcmVkLTYwMFwiPntlcnJvcn08L3A+XHJcbiAgICAgICl9XHJcbiAgICAgIHtoaW50ICYmICFlcnJvciAmJiAoXHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMS41IHRleHQtc20gdGV4dC1ncmF5LTUwMFwiPntoaW50fTwvcD5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn0pO1xyXG5cclxuVGV4dGFyZWEuZGlzcGxheU5hbWUgPSAnVGV4dGFyZWEnO1xyXG5cclxuLy8gU2VsZWN0IENvbXBvbmVudFxyXG5leHBvcnQgY29uc3QgU2VsZWN0ID0gZm9yd2FyZFJlZigoe1xyXG4gIGxhYmVsLFxyXG4gIG9wdGlvbnMgPSBbXSxcclxuICBlcnJvcixcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHBsYWNlaG9sZGVyID0gJ1NlbGVjdCBhbiBvcHRpb24nLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG4gIGNvbnRhaW5lckNsYXNzTmFtZSA9ICcnLFxyXG4gIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y29udGFpbmVyQ2xhc3NOYW1lfT5cclxuICAgICAge2xhYmVsICYmIChcclxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTEuNVwiPlxyXG4gICAgICAgICAge2xhYmVsfVxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICl9XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8c2VsZWN0XHJcbiAgICAgICAgICByZWY9e3JlZn1cclxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgICAgICB3LWZ1bGwgcHgtNCBweS0zIHJvdW5kZWQteGwgYm9yZGVyIGJnLXdoaXRlIGFwcGVhcmFuY2Utbm9uZSBjdXJzb3ItcG9pbnRlclxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDBcclxuICAgICAgICAgICAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWluZGlnby01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XHJcbiAgICAgICAgICAgIGRpc2FibGVkOmJnLWdyYXktMTAwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFxyXG4gICAgICAgICAgICAke2Vycm9yID8gJ2JvcmRlci1yZWQtNTAwIGZvY3VzOnJpbmctcmVkLTUwMCcgOiAnYm9yZGVyLWdyYXktMzAwJ31cclxuICAgICAgICAgICAgJHtjbGFzc05hbWV9XHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgICAgey4uLnByb3BzfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZD57cGxhY2Vob2xkZXJ9PC9vcHRpb24+XHJcbiAgICAgICAgICB7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaWR4KSA9PiAoXHJcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpZHh9IHZhbHVlPXtvcHRpb24udmFsdWV9PlxyXG4gICAgICAgICAgICAgIHtvcHRpb24ubGFiZWx9XHJcbiAgICAgICAgICAgIDwvb3B0aW9uPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0zIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiBwb2ludGVyLWV2ZW50cy1ub25lIHRleHQtZ3JheS00MDBcIj5cclxuICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezJ9IGQ9XCJNMTkgOWwtNyA3LTctN1wiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHtlcnJvciAmJiAoXHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMS41IHRleHQtc20gdGV4dC1yZWQtNjAwXCI+e2Vycm9yfTwvcD5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn0pO1xyXG5cclxuU2VsZWN0LmRpc3BsYXlOYW1lID0gJ1NlbGVjdCc7XHJcblxyXG4vLyBDaGVja2JveCBDb21wb25lbnRcclxuZXhwb3J0IGZ1bmN0aW9uIENoZWNrYm94KHtcclxuICBsYWJlbCxcclxuICBjaGVja2VkLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIGRpc2FibGVkID0gZmFsc2UsXHJcbiAgY2xhc3NOYW1lID0gJycsXHJcbiAgLi4ucHJvcHNcclxufSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8bGFiZWwgY2xhc3NOYW1lPXtgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0zIGN1cnNvci1wb2ludGVyICR7ZGlzYWJsZWQgPyAnb3BhY2l0eS01MCBjdXJzb3Itbm90LWFsbG93ZWQnIDogJyd9ICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxyXG4gICAgICAgICAgY2hlY2tlZD17Y2hlY2tlZH1cclxuICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cclxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgIGNsYXNzTmFtZT1cInNyLW9ubHkgcGVlclwiXHJcbiAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNSBoLTUgcm91bmRlZCBib3JkZXItMiBib3JkZXItZ3JheS0zMDAgYmctd2hpdGUgcGVlci1jaGVja2VkOmJvcmRlci1pbmRpZ28tNjAwIHBlZXItY2hlY2tlZDpiZy1pbmRpZ28tNjAwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XHJcbiAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC13aGl0ZSBvcGFjaXR5LTAgcGVlci1jaGVja2VkOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezN9IGQ9XCJNNSAxM2w0IDRMMTkgN1wiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHtsYWJlbCAmJiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwXCI+e2xhYmVsfTwvc3Bhbj59XHJcbiAgICA8L2xhYmVsPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFJhZGlvIENvbXBvbmVudFxyXG5leHBvcnQgZnVuY3Rpb24gUmFkaW8oe1xyXG4gIGxhYmVsLFxyXG4gIGNoZWNrZWQsXHJcbiAgb25DaGFuZ2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBuYW1lLFxyXG4gIHZhbHVlLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG4gIC4uLnByb3BzXHJcbn0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGxhYmVsIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBjdXJzb3ItcG9pbnRlciAke2Rpc2FibGVkID8gJ29wYWNpdHktNTAgY3Vyc29yLW5vdC1hbGxvd2VkJyA6ICcnfSAke2NsYXNzTmFtZX1gfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgdHlwZT1cInJhZGlvXCJcclxuICAgICAgICAgIG5hbWU9e25hbWV9XHJcbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgICAgICBjaGVja2VkPXtjaGVja2VkfVxyXG4gICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwic3Itb25seSBwZWVyXCJcclxuICAgICAgICAgIHsuLi5wcm9wc31cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy01IGgtNSByb3VuZGVkLWZ1bGwgYm9yZGVyLTIgYm9yZGVyLWdyYXktMzAwIGJnLXdoaXRlIHBlZXItY2hlY2tlZDpib3JkZXItaW5kaWdvLTYwMCB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctaW5kaWdvLTYwMCBzY2FsZS0wIHBlZXItY2hlY2tlZDpzY2FsZS0xMDAgdHJhbnNpdGlvbi10cmFuc2Zvcm1cIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAge2xhYmVsICYmIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDBcIj57bGFiZWx9PC9zcGFuPn1cclxuICAgIDwvbGFiZWw+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gVG9nZ2xlL1N3aXRjaCBDb21wb25lbnRcclxuZXhwb3J0IGZ1bmN0aW9uIFRvZ2dsZSh7XHJcbiAgbGFiZWwsXHJcbiAgY2hlY2tlZCxcclxuICBvbkNoYW5nZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHNpemUgPSAnbWQnLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG4gIC4uLnByb3BzXHJcbn0pIHtcclxuICBjb25zdCBzaXplcyA9IHtcclxuICAgIHNtOiB7IHRyYWNrOiAndy04IGgtNCcsIHRodW1iOiAndy0zIGgtMycsIHRyYW5zbGF0ZTogJ3RyYW5zbGF0ZS14LTQnIH0sXHJcbiAgICBtZDogeyB0cmFjazogJ3ctMTEgaC02JywgdGh1bWI6ICd3LTUgaC01JywgdHJhbnNsYXRlOiAndHJhbnNsYXRlLXgtNScgfSxcclxuICAgIGxnOiB7IHRyYWNrOiAndy0xNCBoLTcnLCB0aHVtYjogJ3ctNiBoLTYnLCB0cmFuc2xhdGU6ICd0cmFuc2xhdGUteC03JyB9LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHMgPSBzaXplc1tzaXplXTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxsYWJlbCBjbGFzc05hbWU9e2BpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgY3Vyc29yLXBvaW50ZXIgJHtkaXNhYmxlZCA/ICdvcGFjaXR5LTUwIGN1cnNvci1ub3QtYWxsb3dlZCcgOiAnJ30gJHtjbGFzc05hbWV9YH0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICBjaGVja2VkPXtjaGVja2VkfVxyXG4gICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwic3Itb25seSBwZWVyXCJcclxuICAgICAgICAgIHsuLi5wcm9wc31cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtzLnRyYWNrfSByb3VuZGVkLWZ1bGwgYmctZ3JheS0zMDAgcGVlci1jaGVja2VkOmJnLWluZGlnby02MDAgdHJhbnNpdGlvbi1jb2xvcnNgfSAvPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgdG9wLTAuNSBsZWZ0LTAuNSAke3MudGh1bWJ9IHJvdW5kZWQtZnVsbCBiZy13aGl0ZSBzaGFkb3ctc20gcGVlci1jaGVja2VkOiR7cy50cmFuc2xhdGV9IHRyYW5zaXRpb24tdHJhbnNmb3JtYH0gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHtsYWJlbCAmJiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwXCI+e2xhYmVsfTwvc3Bhbj59XHJcbiAgICA8L2xhYmVsPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFNlYXJjaCBJbnB1dFxyXG5leHBvcnQgZnVuY3Rpb24gU2VhcmNoSW5wdXQoe1xyXG4gIHZhbHVlLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIG9uU2VhcmNoLFxyXG4gIHBsYWNlaG9sZGVyID0gJ1NlYXJjaC4uLicsXHJcbiAgY2xhc3NOYW1lID0gJycsXHJcbiAgLi4ucHJvcHNcclxufSkge1xyXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInICYmIG9uU2VhcmNoKSB7XHJcbiAgICAgIG9uU2VhcmNoKHZhbHVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2ByZWxhdGl2ZSAke2NsYXNzTmFtZX1gfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTMgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHRleHQtZ3JheS00MDBcIj5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNSBoLTVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxMVwiIGN5PVwiMTFcIiByPVwiOFwiIC8+XHJcbiAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezJ9IGQ9XCJNMjEgMjFsLTQuMzUtNC4zNVwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cclxuICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwbC0xMCBwci00IHB5LTMgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIGJnLXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudCB0cmFuc2l0aW9uLWFsbFwiXHJcbiAgICAgICAgey4uLnByb3BzfVxyXG4gICAgICAvPlxyXG4gICAgICB7dmFsdWUgJiYgKFxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKHsgdGFyZ2V0OiB7IHZhbHVlOiAnJyB9IH0pfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMyB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LWdyYXktNjAwXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNSBoLTVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTYgMThMMTggNk02IDZsMTIgMTJcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBDaGVja0NpcmNsZSwgQWxlcnRDaXJjbGUsIEFsZXJ0VHJpYW5nbGUsIEluZm8sIFggfSBmcm9tICcuL0ljb25zJztcclxuXHJcbmNvbnN0IHZhcmlhbnRzID0ge1xyXG4gIHN1Y2Nlc3M6IHtcclxuICAgIGJnOiAnYmctZ3JlZW4tNTAnLFxyXG4gICAgYm9yZGVyOiAnYm9yZGVyLWdyZWVuLTIwMCcsXHJcbiAgICB0ZXh0OiAndGV4dC1ncmVlbi04MDAnLFxyXG4gICAgaWNvbjogPENoZWNrQ2lyY2xlIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNTAwXCIgc2l6ZT17MjB9IC8+LFxyXG4gIH0sXHJcbiAgZXJyb3I6IHtcclxuICAgIGJnOiAnYmctcmVkLTUwJyxcclxuICAgIGJvcmRlcjogJ2JvcmRlci1yZWQtMjAwJyxcclxuICAgIHRleHQ6ICd0ZXh0LXJlZC04MDAnLFxyXG4gICAgaWNvbjogPEFsZXJ0Q2lyY2xlIGNsYXNzTmFtZT1cInRleHQtcmVkLTUwMFwiIHNpemU9ezIwfSAvPixcclxuICB9LFxyXG4gIHdhcm5pbmc6IHtcclxuICAgIGJnOiAnYmcteWVsbG93LTUwJyxcclxuICAgIGJvcmRlcjogJ2JvcmRlci15ZWxsb3ctMjAwJyxcclxuICAgIHRleHQ6ICd0ZXh0LXllbGxvdy04MDAnLFxyXG4gICAgaWNvbjogPEFsZXJ0VHJpYW5nbGUgY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctNTAwXCIgc2l6ZT17MjB9IC8+LFxyXG4gIH0sXHJcbiAgaW5mbzoge1xyXG4gICAgYmc6ICdiZy1ibHVlLTUwJyxcclxuICAgIGJvcmRlcjogJ2JvcmRlci1ibHVlLTIwMCcsXHJcbiAgICB0ZXh0OiAndGV4dC1ibHVlLTgwMCcsXHJcbiAgICBpY29uOiA8SW5mbyBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNTAwXCIgc2l6ZT17MjB9IC8+LFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBbGVydCh7XHJcbiAgdmFyaWFudCA9ICdpbmZvJyxcclxuICB0aXRsZSxcclxuICBjaGlsZHJlbixcclxuICBkaXNtaXNzaWJsZSA9IGZhbHNlLFxyXG4gIG9uRGlzbWlzcyxcclxuICBpY29uLFxyXG4gIGFjdGlvbnMsXHJcbiAgY2xhc3NOYW1lID0gJycsXHJcbn0pIHtcclxuICBjb25zdCB2ID0gdmFyaWFudHNbdmFyaWFudF07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YCR7di5iZ30gJHt2LmJvcmRlcn0gYm9yZGVyIHJvdW5kZWQteGwgcC00ICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTBcIj5cclxuICAgICAgICAgIHtpY29uIHx8IHYuaWNvbn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wXCI+XHJcbiAgICAgICAgICB7dGl0bGUgJiYgKFxyXG4gICAgICAgICAgICA8aDQgY2xhc3NOYW1lPXtgZm9udC1zZW1pYm9sZCAke3YudGV4dH0gbWItMWB9Pnt0aXRsZX08L2g0PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdGV4dC1zbSAke3YudGV4dH0gb3BhY2l0eS05MGB9PntjaGlsZHJlbn08L2Rpdj5cclxuICAgICAgICAgIHthY3Rpb25zICYmIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIGZsZXggZ2FwLTJcIj57YWN0aW9uc308L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge2Rpc21pc3NpYmxlICYmIChcclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgb25DbGljaz17b25EaXNtaXNzfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4LXNocmluay0wICR7di50ZXh0fSBvcGFjaXR5LTYwIGhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eWB9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxYIHNpemU9ezIwfSAvPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBJbmxpbmUgQWxlcnQgKGNvbXBhY3QpXHJcbmV4cG9ydCBmdW5jdGlvbiBJbmxpbmVBbGVydCh7XHJcbiAgdmFyaWFudCA9ICdpbmZvJyxcclxuICBjaGlsZHJlbixcclxuICBjbGFzc05hbWUgPSAnJyxcclxufSkge1xyXG4gIGNvbnN0IHYgPSB2YXJpYW50c1t2YXJpYW50XTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSAke3YudGV4dH0gJHtjbGFzc05hbWV9YH0+XHJcbiAgICAgIHt2Lmljb259XHJcbiAgICAgIDxzcGFuPntjaGlsZHJlbn08L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBCYW5uZXIgQWxlcnQgKGZ1bGwgd2lkdGgpXHJcbmV4cG9ydCBmdW5jdGlvbiBCYW5uZXJBbGVydCh7XHJcbiAgdmFyaWFudCA9ICdpbmZvJyxcclxuICBjaGlsZHJlbixcclxuICBkaXNtaXNzaWJsZSA9IGZhbHNlLFxyXG4gIG9uRGlzbWlzcyxcclxuICBhY3Rpb24sXHJcbiAgY2xhc3NOYW1lID0gJycsXHJcbn0pIHtcclxuICBjb25zdCBiZ0NvbG9ycyA9IHtcclxuICAgIHN1Y2Nlc3M6ICdiZy1ncmVlbi02MDAnLFxyXG4gICAgZXJyb3I6ICdiZy1yZWQtNjAwJyxcclxuICAgIHdhcm5pbmc6ICdiZy15ZWxsb3ctNTAwJyxcclxuICAgIGluZm86ICdiZy1ibHVlLTYwMCcsXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtiZ0NvbG9yc1t2YXJpYW50XX0gdGV4dC13aGl0ZSBweS0zIHB4LTQgJHtjbGFzc05hbWV9YH0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTRcIj5cclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyXCI+e2NoaWxkcmVufTwvcD5cclxuICAgICAgICB7YWN0aW9uICYmIChcclxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiZmxleC1zaHJpbmstMCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdW5kZXJsaW5lIGhvdmVyOm5vLXVuZGVybGluZVwiPlxyXG4gICAgICAgICAgICB7YWN0aW9ufVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7ZGlzbWlzc2libGUgJiYgKFxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkRpc21pc3N9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgb3BhY2l0eS04MCBob3ZlcjpvcGFjaXR5LTEwMFwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxYIHNpemU9ezE4fSAvPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gUmV1c2FibGUgSWNvbiB3cmFwcGVyXHJcbmNvbnN0IEljb24gPSAoeyBjaGlsZHJlbiwgc2l6ZSA9IDI0LCBjbGFzc05hbWUgPSAnJywgLi4ucHJvcHMgfSkgPT4gKFxyXG4gIDxzdmdcclxuICAgIHdpZHRoPXtzaXplfVxyXG4gICAgaGVpZ2h0PXtzaXplfVxyXG4gICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICBmaWxsPVwibm9uZVwiXHJcbiAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgc3Ryb2tlV2lkdGg9XCIyXCJcclxuICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgey4uLnByb3BzfVxyXG4gID5cclxuICAgIHtjaGlsZHJlbn1cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbi8vIEFycm93IEljb25zXHJcbmV4cG9ydCBjb25zdCBBcnJvd1JpZ2h0ID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNNSAxMmgxNE0xMiA1bDcgNy03IDdcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBBcnJvd0xlZnQgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0xOSAxMkg1TTEyIDE5bC03LTcgNy03XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgQXJyb3dVcCA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTEyIDE5VjVNNSAxMmw3LTcgNyA3XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgQXJyb3dEb3duID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMTIgNXYxNE0xOSAxMmwtNyA3LTctN1wiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25SaWdodCA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTkgMThsNi02LTYtNlwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25MZWZ0ID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMTUgMThsLTYtNiA2LTZcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGV2cm9uRG93biA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTYgOWw2IDYgNi02XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvblVwID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMTggMTVsLTYtNi02IDZcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbi8vIFVJIEljb25zXHJcbmV4cG9ydCBjb25zdCBDaGVjayA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTIwIDZMOSAxN2wtNS01XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgWCA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTE4IDZMNiAxOE02IDZsMTIgMTJcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBQbHVzID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMTIgNXYxNE01IDEyaDE0XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgTWludXMgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk01IDEyaDE0XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgTWVudSA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTMgMTJoMThNMyA2aDE4TTMgMThoMThcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBTZWFyY2ggPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPGNpcmNsZSBjeD1cIjExXCIgY3k9XCIxMVwiIHI9XCI4XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMjEgMjFsLTQuMzUtNC4zNVwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNldHRpbmdzID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiM1wiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTE5LjQgMTVhMS42NSAxLjY1IDAgMDAuMzMgMS44MmwuMDYuMDZhMiAyIDAgMDEwIDIuODMgMiAyIDAgMDEtMi44MyAwbC0uMDYtLjA2YTEuNjUgMS42NSAwIDAwLTEuODItLjMzIDEuNjUgMS42NSAwIDAwLTEgMS41MVYyMWEyIDIgMCAwMS0yIDIgMiAyIDAgMDEtMi0ydi0uMDlBMS42NSAxLjY1IDAgMDA5IDE5LjRhMS42NSAxLjY1IDAgMDAtMS44Mi4zM2wtLjA2LjA2YTIgMiAwIDAxLTIuODMgMCAyIDIgMCAwMTAtMi44M2wuMDYtLjA2YTEuNjUgMS42NSAwIDAwLjMzLTEuODIgMS42NSAxLjY1IDAgMDAtMS41MS0xSDNhMiAyIDAgMDEtMi0yIDIgMiAwIDAxMi0yaC4wOUExLjY1IDEuNjUgMCAwMDQuNiA5YTEuNjUgMS42NSAwIDAwLS4zMy0xLjgybC0uMDYtLjA2YTIgMiAwIDAxMC0yLjgzIDIgMiAwIDAxMi44MyAwbC4wNi4wNmExLjY1IDEuNjUgMCAwMDEuODIuMzNIOWExLjY1IDEuNjUgMCAwMDEtMS41MVYzYTIgMiAwIDAxMi0yIDIgMiAwIDAxMiAydi4wOWExLjY1IDEuNjUgMCAwMDEgMS41MSAxLjY1IDEuNjUgMCAwMDEuODItLjMzbC4wNi0uMDZhMiAyIDAgMDEyLjgzIDAgMiAyIDAgMDEwIDIuODNsLS4wNi4wNmExLjY1IDEuNjUgMCAwMC0uMzMgMS44MlY5YTEuNjUgMS42NSAwIDAwMS41MSAxSDIxYTIgMiAwIDAxMiAyIDIgMiAwIDAxLTIgMmgtLjA5YTEuNjUgMS42NSAwIDAwLTEuNTEgMXpcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBVc2VyID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMjAgMjF2LTJhNCA0IDAgMDAtNC00SDhhNCA0IDAgMDAtNCA0djJcIiAvPlxyXG4gICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCI3XCIgcj1cIjRcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBVc2VycyA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTE3IDIxdi0yYTQgNCAwIDAwLTQtNEg1YTQgNCAwIDAwLTQgNHYyXCIgLz5cclxuICAgIDxjaXJjbGUgY3g9XCI5XCIgY3k9XCI3XCIgcj1cIjRcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0yMyAyMXYtMmE0IDQgMCAwMC0zLTMuODdNMTYgMy4xM2E0IDQgMCAwMTAgNy43NVwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1haWwgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk00IDRoMTZjMS4xIDAgMiAuOSAyIDJ2MTJjMCAxLjEtLjkgMi0yIDJINGMtMS4xIDAtMi0uOS0yLTJWNmMwLTEuMS45LTIgMi0yelwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTIyIDZsLTEwIDdMMiA2XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgUGhvbmUgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0yMiAxNi45MnYzYTIgMiAwIDAxLTIuMTggMiAxOS43OSAxOS43OSAwIDAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwMS02LTYgMTkuNzkgMTkuNzkgMCAwMS0zLjA3LTguNjdBMiAyIDAgMDE0LjExIDJoM2EyIDIgMCAwMTIgMS43MiAxMi44NCAxMi44NCAwIDAwLjcgMi44MSAyIDIgMCAwMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwMDYgNmwxLjI3LTEuMjdhMiAyIDAgMDEyLjExLS40NSAxMi44NCAxMi44NCAwIDAwMi44MS43QTIgMiAwIDAxMjIgMTYuOTJ6XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgQmVsbCA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTE4IDhBNiA2IDAgMDA2IDhjMCA3LTMgOS0zIDloMThzLTMtMi0zLTlNMTMuNzMgMjFhMiAyIDAgMDEtMy40NiAwXCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgSGVhcnQgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0yMC44NCA0LjYxYTUuNSA1LjUgMCAwMC03Ljc4IDBMMTIgNS42N2wtMS4wNi0xLjA2YTUuNSA1LjUgMCAwMC03Ljc4IDcuNzhsMS4wNiAxLjA2TDEyIDIxLjIzbDcuNzgtNy43OCAxLjA2LTEuMDZhNS41IDUuNSAwIDAwMC03Ljc4elwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFN0YXIgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0xMiAybDMuMDkgNi4yNkwyMiA5LjI3bC01IDQuODcgMS4xOCA2Ljg4TDEyIDE3Ljc3bC02LjE4IDMuMjVMNyAxNC4xNCAyIDkuMjdsNi45MS0xLjAxTDEyIDJ6XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgQm9va21hcmsgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0xOSAyMWwtNy01LTcgNVY1YTIgMiAwIDAxMi0yaDEwYTIgMiAwIDAxMiAyelwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuLy8gRmVhdHVyZSBJY29uc1xyXG5leHBvcnQgY29uc3QgWmFwID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMTMgMkwzIDE0aDlsLTEgOCAxMC0xMmgtOWwxLTh6XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgU2hpZWxkID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMTIgMjJzOC00IDgtMTBWNWwtOC0zLTggM3Y3YzAgNiA4IDEwIDggMTB6XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgTG9jayA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cmVjdCB4PVwiM1wiIHk9XCIxMVwiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxMVwiIHJ4PVwiMlwiIHJ5PVwiMlwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTcgMTFWN2E1IDUgMCAwMTEwIDB2NFwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFVubG9jayA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cmVjdCB4PVwiM1wiIHk9XCIxMVwiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxMVwiIHJ4PVwiMlwiIHJ5PVwiMlwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTcgMTFWN2E1IDUgMCAwMTkuOS0xXCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgR2xvYmUgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIxMFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTIgMTJoMjBNMTIgMmExNS4zIDE1LjMgMCAwMTQgMTAgMTUuMyAxNS4zIDAgMDEtNCAxMCAxNS4zIDE1LjMgMCAwMS00LTEwIDE1LjMgMTUuMyAwIDAxNC0xMHpcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBDb2RlID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMTYgMThsNi02LTYtNk04IDZsLTYgNiA2IDZcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBUZXJtaW5hbCA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTQgMTdsNi02LTYtNk0xMiAxOWg4XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgRGF0YWJhc2UgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPGVsbGlwc2UgY3g9XCIxMlwiIGN5PVwiNVwiIHJ4PVwiOVwiIHJ5PVwiM1wiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTIxIDEyYzAgMS42Ni00IDMtOSAzcy05LTEuMzQtOS0zXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMyA1djE0YzAgMS42NiA0IDMgOSAzczktMS4zNCA5LTNWNVwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNlcnZlciA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cmVjdCB4PVwiMlwiIHk9XCIyXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjhcIiByeD1cIjJcIiByeT1cIjJcIiAvPlxyXG4gICAgPHJlY3QgeD1cIjJcIiB5PVwiMTRcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiOFwiIHJ4PVwiMlwiIHJ5PVwiMlwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTYgNmguMDFNNiAxOGguMDFcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBDbG91ZCA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTE4IDEwaC0xLjI2QTggOCAwIDEwOSAyMGg5YTUgNSAwIDAwMC0xMHpcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBGb2xkZXIgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0yMiAxOWEyIDIgMCAwMS0yIDJINGEyIDIgMCAwMS0yLTJWNWEyIDIgMCAwMTItMmg1bDIgM2g5YTIgMiAwIDAxMiAyelwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IEZpbGUgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0xMyAySDZhMiAyIDAgMDAtMiAydjE2YTIgMiAwIDAwMiAyaDEyYTIgMiAwIDAwMi0yVjl6XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTMgMnY3aDdcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBGaWxlVGV4dCA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTE0IDJINmEyIDIgMCAwMC0yIDJ2MTZhMiAyIDAgMDAyIDJoMTJhMiAyIDAgMDAyLTJWOHpcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xNCAydjZoNk0xNiAxM0g4TTE2IDE3SDhNMTAgOUg4XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgSW1hZ2UgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHJlY3QgeD1cIjNcIiB5PVwiM1wiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxOFwiIHJ4PVwiMlwiIHJ5PVwiMlwiIC8+XHJcbiAgICA8Y2lyY2xlIGN4PVwiOC41XCIgY3k9XCI4LjVcIiByPVwiMS41XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMjEgMTVsLTUtNUw1IDIxXCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgVmlkZW8gPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMjMgNyAxNiAxMiAyMyAxNyAyMyA3XCIgLz5cclxuICAgIDxyZWN0IHg9XCIxXCIgeT1cIjVcIiB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTRcIiByeD1cIjJcIiByeT1cIjJcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbi8vIERldmljZSBJY29uc1xyXG5leHBvcnQgY29uc3QgTW9uaXRvciA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cmVjdCB4PVwiMlwiIHk9XCIzXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjE0XCIgcng9XCIyXCIgcnk9XCIyXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNOCAyMWg4TTEyIDE3djRcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBTbWFydHBob25lID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxyZWN0IHg9XCI1XCIgeT1cIjJcIiB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMjBcIiByeD1cIjJcIiByeT1cIjJcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xMiAxOGguMDFcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBUYWJsZXQgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHJlY3QgeD1cIjRcIiB5PVwiMlwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIyMFwiIHJ4PVwiMlwiIHJ5PVwiMlwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTEyIDE4aC4wMVwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IExhcHRvcCA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cmVjdCB4PVwiMlwiIHk9XCI0XCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjEyXCIgcng9XCIyXCIgcnk9XCIyXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMSAyMGgyMlwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuLy8gU29jaWFsIEljb25zXHJcbmV4cG9ydCBjb25zdCBHaXRodWIgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk05IDE5Yy01IDEuNS01LTIuNS03LTNtMTQgNnYtMy44N2EzLjM3IDMuMzcgMCAwMC0uOTQtMi42MWMzLjE0LS4zNSA2LjQ0LTEuNTQgNi40NC03QTUuNDQgNS40NCAwIDAwMjAgNC43NyA1LjA3IDUuMDcgMCAwMDE5LjkxIDFTMTguNzMuNjUgMTYgMi40OGExMy4zOCAxMy4zOCAwIDAwLTcgMEM2LjI3LjY1IDUuMDkgMSA1LjA5IDFBNS4wNyA1LjA3IDAgMDA1IDQuNzdhNS40NCA1LjQ0IDAgMDAtMS41IDMuNzhjMCA1LjQyIDMuMyA2LjYxIDYuNDQgN0EzLjM3IDMuMzcgMCAwMDkgMTguMTNWMjJcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBUd2l0dGVyID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMjMgM2ExMC45IDEwLjkgMCAwMS0zLjE0IDEuNTMgNC40OCA0LjQ4IDAgMDAtNy44NiAzdjFBMTAuNjYgMTAuNjYgMCAwMTMgNHMtNCA5IDUgMTNhMTEuNjQgMTEuNjQgMCAwMS03IDJjOSA1IDIwIDAgMjAtMTEuNWE0LjUgNC41IDAgMDAtLjA4LS44M0E3LjcyIDcuNzIgMCAwMDIzIDN6XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgTGlua2VkaW4gPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0xNiA4YTYgNiAwIDAxNiA2djdoLTR2LTdhMiAyIDAgMDAtMi0yIDIgMiAwIDAwLTIgMnY3aC00di03YTYgNiAwIDAxNi02ek0yIDloNHYxMkgyelwiIC8+XHJcbiAgICA8Y2lyY2xlIGN4PVwiNFwiIGN5PVwiNFwiIHI9XCIyXCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgWW91dHViZSA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTIyLjU0IDYuNDJhMi43OCAyLjc4IDAgMDAtMS45NC0yQzE4Ljg4IDQgMTIgNCAxMiA0cy02Ljg4IDAtOC42LjQ2YTIuNzggMi43OCAwIDAwLTEuOTQgMkEyOSAyOSAwIDAwMSAxMS43NWEyOSAyOSAwIDAwLjQ2IDUuMzNBMi43OCAyLjc4IDAgMDAzLjQgMTljMS43Mi40NiA4LjYuNDYgOC42LjQ2czYuODggMCA4LjYtLjQ2YTIuNzggMi43OCAwIDAwMS45NC0yIDI5IDI5IDAgMDAuNDYtNS4yNSAyOSAyOSAwIDAwLS40Ni01LjMzelwiIC8+XHJcbiAgICA8cG9seWdvbiBwb2ludHM9XCI5Ljc1IDE1LjAyIDE1LjUgMTEuNzUgOS43NSA4LjQ4IDkuNzUgMTUuMDJcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBEaXNjb3JkID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHN0cm9rZT1cIm5vbmVcIj5cclxuICAgIDxwYXRoIGQ9XCJNMjAuMzE3IDQuMzdhMTkuNzkxIDE5Ljc5MSAwIDAwLTQuODg1LTEuNTE1LjA3NC4wNzQgMCAwMC0uMDc5LjAzN2MtLjIxLjM3NS0uNDQ0Ljg2NC0uNjA4IDEuMjVhMTguMjcgMTguMjcgMCAwMC01LjQ4NyAwIDEyLjY0IDEyLjY0IDAgMDAtLjYxNy0xLjI1LjA3Ny4wNzcgMCAwMC0uMDc5LS4wMzdBMTkuNzM2IDE5LjczNiAwIDAwMy42NzcgNC4zN2EuMDcuMDcgMCAwMC0uMDMyLjAyN0MuNTMzIDkuMDQ2LS4zMiAxMy41OC4wOTkgMTguMDU3YS4wODIuMDgyIDAgMDAuMDMxLjA1NyAxOS45IDE5LjkgMCAwMDUuOTkzIDMuMDMuMDc4LjA3OCAwIDAwLjA4NC0uMDI4Yy40NjItLjYzLjg3NC0xLjI5NSAxLjIyNi0xLjk5NGEuMDc2LjA3NiAwIDAwLS4wNDEtLjEwNiAxMy4xMDcgMTMuMTA3IDAgMDEtMS44NzItLjg5Mi4wNzcuMDc3IDAgMDEtLjAwOC0uMTI4IDEwLjIgMTAuMiAwIDAwLjM3Mi0uMjkyLjA3NC4wNzQgMCAwMS4wNzctLjAxYzMuOTI4IDEuNzkzIDguMTggMS43OTMgMTIuMDYyIDBhLjA3NC4wNzQgMCAwMS4wNzguMDFjLjEyLjA5OC4yNDYuMTk4LjM3My4yOTJhLjA3Ny4wNzcgMCAwMS0uMDA2LjEyNyAxMi4yOTkgMTIuMjk5IDAgMDEtMS44NzMuODkyLjA3Ny4wNzcgMCAwMC0uMDQxLjEwN2MuMzYuNjk4Ljc3MiAxLjM2MiAxLjIyNSAxLjk5M2EuMDc2LjA3NiAwIDAwLjA4NC4wMjggMTkuODM5IDE5LjgzOSAwIDAwNi4wMDItMy4wMy4wNzcuMDc3IDAgMDAuMDMyLS4wNTRjLjUtNS4xNzctLjgzOC05LjY3NC0zLjU0OS0xMy42NmEuMDYxLjA2MSAwIDAwLS4wMzEtLjAzek04LjAyIDE1LjMzYy0xLjE4MyAwLTIuMTU3LTEuMDg1LTIuMTU3LTIuNDE5IDAtMS4zMzMuOTU2LTIuNDE5IDIuMTU3LTIuNDE5IDEuMjEgMCAyLjE3NiAxLjA5NiAyLjE1NyAyLjQyIDAgMS4zMzMtLjk1NiAyLjQxOC0yLjE1NyAyLjQxOHptNy45NzUgMGMtMS4xODMgMC0yLjE1Ny0xLjA4NS0yLjE1Ny0yLjQxOSAwLTEuMzMzLjk1NS0yLjQxOSAyLjE1Ny0yLjQxOSAxLjIxIDAgMi4xNzYgMS4wOTYgMi4xNTcgMi40MiAwIDEuMzMzLS45NDYgMi40MTgtMi4xNTcgMi40MTh6XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG4vLyBBY3Rpb24gSWNvbnNcclxuZXhwb3J0IGNvbnN0IERvd25sb2FkID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMjEgMTV2NGEyIDIgMCAwMS0yIDJINWEyIDIgMCAwMS0yLTJ2LTRNNyAxMGw1IDUgNS01TTEyIDE1VjNcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBVcGxvYWQgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0yMSAxNXY0YTIgMiAwIDAxLTIgMkg1YTIgMiAwIDAxLTItMnYtNE0xNyA4bC01LTUtNSA1TTEyIDN2MTJcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBTaGFyZSA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8Y2lyY2xlIGN4PVwiMThcIiBjeT1cIjVcIiByPVwiM1wiIC8+XHJcbiAgICA8Y2lyY2xlIGN4PVwiNlwiIGN5PVwiMTJcIiByPVwiM1wiIC8+XHJcbiAgICA8Y2lyY2xlIGN4PVwiMThcIiBjeT1cIjE5XCIgcj1cIjNcIiAvPlxyXG4gICAgPHBhdGggZD1cIk04LjU5IDEzLjUxbDYuODMgMy45OE0xNS40MSA2LjUxbC02LjgyIDMuOThcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBDb3B5ID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxyZWN0IHg9XCI5XCIgeT1cIjlcIiB3aWR0aD1cIjEzXCIgaGVpZ2h0PVwiMTNcIiByeD1cIjJcIiByeT1cIjJcIiAvPlxyXG4gICAgPHBhdGggZD1cIk01IDE1SDRhMiAyIDAgMDEtMi0yVjRhMiAyIDAgMDEyLTJoOWEyIDIgMCAwMTIgMnYxXCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgVHJhc2ggPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0zIDZoMThNMTkgNnYxNGEyIDIgMCAwMS0yIDJIN2EyIDIgMCAwMS0yLTJWNm0zIDBWNGEyIDIgMCAwMTItMmg0YTIgMiAwIDAxMiAydjJNMTAgMTF2Nk0xNCAxMXY2XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgRWRpdCA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTExIDRINGEyIDIgMCAwMC0yIDJ2MTRhMiAyIDAgMDAyIDJoMTRhMiAyIDAgMDAyLTJ2LTdcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xOC41IDIuNWEyLjEyMSAyLjEyMSAwIDAxMyAzTDEyIDE1bC00IDEgMS00IDkuNS05LjV6XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgRXllID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMSAxMnM0LTggMTEtOCAxMSA4IDExIDgtNCA4LTExIDgtMTEtOC0xMS04elwiIC8+XHJcbiAgICA8Y2lyY2xlIGN4PVwiMTJcIiBjeT1cIjEyXCIgcj1cIjNcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBFeWVPZmYgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0xNy45NCAxNy45NEExMC4wNyAxMC4wNyAwIDAxMTIgMjBjLTcgMC0xMS04LTExLThhMTguNDUgMTguNDUgMCAwMTUuMDYtNS45NE05LjkgNC4yNEE5LjEyIDkuMTIgMCAwMTEyIDRjNyAwIDExIDggMTEgOGExOC41IDE4LjUgMCAwMS0yLjE2IDMuMTltLTYuNzItMS4wN2EzIDMgMCAxMS00LjI0LTQuMjRNMSAxbDIyIDIyXCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG4vLyBTdGF0dXMgSWNvbnNcclxuZXhwb3J0IGNvbnN0IEFsZXJ0Q2lyY2xlID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTBcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xMiA4djRNMTIgMTZoLjAxXCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgQWxlcnRUcmlhbmdsZSA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTEwLjI5IDMuODZMMS44MiAxOGEyIDIgMCAwMDEuNzEgM2gxNi45NGEyIDIgMCAwMDEuNzEtM0wxMy43MSAzLjg2YTIgMiAwIDAwLTMuNDIgMHpNMTIgOXY0TTEyIDE3aC4wMVwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZWNrQ2lyY2xlID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMjIgMTEuMDhWMTJhMTAgMTAgMCAxMS01LjkzLTkuMTRcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0yMiA0TDEyIDE0LjAxbC0zLTNcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBYQ2lyY2xlID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTBcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xNSA5bC02IDZNOSA5bDYgNlwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IEluZm8gPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIxMFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTEyIDE2di00TTEyIDhoLjAxXCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgSGVscENpcmNsZSA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8Y2lyY2xlIGN4PVwiMTJcIiBjeT1cIjEyXCIgcj1cIjEwXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNOS4wOSA5YTMgMyAwIDAxNS44MyAxYzAgMi0zIDMtMyAzTTEyIDE3aC4wMVwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuLy8gTmF2aWdhdGlvbiBJY29uc1xyXG5leHBvcnQgY29uc3QgSG9tZSA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTMgOWw5LTcgOSA3djExYTIgMiAwIDAxLTIgMkg1YTIgMiAwIDAxLTItMnpcIiAvPlxyXG4gICAgPHBhdGggZD1cIk05IDIyVjEyaDZ2MTBcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBFeHRlcm5hbExpbmsgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0xOCAxM3Y2YTIgMiAwIDAxLTIgMkg1YTIgMiAwIDAxLTItMlY4YTIgMiAwIDAxMi0yaDZNMTUgM2g2djZNMTAgMTRMMjEgM1wiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IExpbmsgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0xMCAxM2E1IDUgMCAwMDcuNTQuNTRsMy0zYTUgNSAwIDAwLTcuMDctNy4wN2wtMS43MiAxLjcxXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTQgMTFhNSA1IDAgMDAtNy41NC0uNTRsLTMgM2E1IDUgMCAwMDcuMDcgNy4wN2wxLjcxLTEuNzFcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbi8vIE1pc2MgSWNvbnNcclxuZXhwb3J0IGNvbnN0IENsb2NrID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTBcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xMiA2djZsNCAyXCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgQ2FsZW5kYXIgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHJlY3QgeD1cIjNcIiB5PVwiNFwiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxOFwiIHJ4PVwiMlwiIHJ5PVwiMlwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTE2IDJ2NE04IDJ2NE0zIDEwaDE4XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgTWFwUGluID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMjEgMTBjMCA3LTkgMTMtOSAxM3MtOS02LTktMTNhOSA5IDAgMDExOCAwelwiIC8+XHJcbiAgICA8Y2lyY2xlIGN4PVwiMTJcIiBjeT1cIjEwXCIgcj1cIjNcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBQYWNrYWdlID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMTYuNSA5LjRsLTktNS4xOU0yMSAxNlY4YTIgMiAwIDAwLTEtMS43M2wtNy00YTIgMiAwIDAwLTIgMGwtNyA0QTIgMiAwIDAwMyA4djhhMiAyIDAgMDAxIDEuNzNsNyA0YTIgMiAwIDAwMiAwbDctNEEyIDIgMCAwMDIxIDE2elwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTMuMjcgNi45NkwxMiAxMi4wMWw4LjczLTUuMDVNMTIgMjIuMDhWMTJcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBMYXllcnMgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMTIgMiAyIDcgMTIgMTIgMjIgNyAxMiAyXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMiAxN2wxMCA1IDEwLTVNMiAxMmwxMCA1IDEwLTVcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBHcmlkID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxyZWN0IHg9XCIzXCIgeT1cIjNcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCI3XCIgLz5cclxuICAgIDxyZWN0IHg9XCIxNFwiIHk9XCIzXCIgd2lkdGg9XCI3XCIgaGVpZ2h0PVwiN1wiIC8+XHJcbiAgICA8cmVjdCB4PVwiMTRcIiB5PVwiMTRcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCI3XCIgLz5cclxuICAgIDxyZWN0IHg9XCIzXCIgeT1cIjE0XCIgd2lkdGg9XCI3XCIgaGVpZ2h0PVwiN1wiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IExpc3QgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk04IDZoMTNNOCAxMmgxM004IDE4aDEzTTMgNmguMDFNMyAxMmguMDFNMyAxOGguMDFcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBGaWx0ZXIgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMjIgMyAyIDMgMTAgMTIuNDYgMTAgMTkgMTQgMjEgMTQgMTIuNDYgMjIgM1wiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJlZnJlc2hDdyA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTIzIDR2NmgtNk0xIDIwdi02aDZcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0zLjUxIDlhOSA5IDAgMDExNC44NS0zLjM2TDIzIDEwTTEgMTRsNC42NCA0LjM2QTkgOSAwIDAwMjAuNDkgMTVcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBSb3RhdGVDY3cgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk0xIDR2Nmg2XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMy41MSAxNWE5IDkgMCAxMDIuMTMtOS4zNkwxIDEwXCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgTG9hZGVyID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfSBjbGFzc05hbWU9e2BhbmltYXRlLXNwaW4gJHtwcm9wcy5jbGFzc05hbWUgfHwgJyd9YH0+XHJcbiAgICA8cGF0aCBkPVwiTTIxIDEyYTkgOSAwIDExLTYuMjE5LTguNTZcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBTdW4gPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCI1XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTIgMXYyTTEyIDIxdjJNNC4yMiA0LjIybDEuNDIgMS40Mk0xOC4zNiAxOC4zNmwxLjQyIDEuNDJNMSAxMmgyTTIxIDEyaDJNNC4yMiAxOS43OGwxLjQyLTEuNDJNMTguMzYgNS42NGwxLjQyLTEuNDJcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBNb29uID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMjEgMTIuNzlBOSA5IDAgMTExMS4yMSAzIDcgNyAwIDAwMjEgMTIuNzl6XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgU2VuZCA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTIyIDJMMTEgMTNNMjIgMmwtNyAyMC00LTktOS00IDIwLTd6XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgTWVzc2FnZUNpcmNsZSA9IChwcm9wcykgPT4gKFxyXG4gIDxJY29uIHsuLi5wcm9wc30+XHJcbiAgICA8cGF0aCBkPVwiTTIxIDExLjVhOC4zOCA4LjM4IDAgMDEtLjkgMy44IDguNSA4LjUgMCAwMS03LjYgNC43IDguMzggOC4zOCAwIDAxLTMuOC0uOUwzIDIxbDEuOS01LjdhOC4zOCA4LjM4IDAgMDEtLjktMy44IDguNSA4LjUgMCAwMTQuNy03LjYgOC4zOCA4LjM4IDAgMDEzLjgtLjloLjVhOC40OCA4LjQ4IDAgMDE4IDh2LjV6XCIgLz5cclxuICA8L0ljb24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgQXdhcmQgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCI4XCIgcj1cIjdcIiAvPlxyXG4gICAgPHBhdGggZD1cIk04LjIxIDEzLjg5TDcgMjNsNS0zIDUgMy0xLjIxLTkuMTJcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBDcHUgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHJlY3QgeD1cIjRcIiB5PVwiNFwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHJ4PVwiMlwiIHJ5PVwiMlwiIC8+XHJcbiAgICA8cmVjdCB4PVwiOVwiIHk9XCI5XCIgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiNlwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTkgMXYzTTE1IDF2M005IDIwdjNNMTUgMjB2M00yMCA5aDNNMjAgMTRoM00xIDloM00xIDE0aDNcIiAvPlxyXG4gIDwvSWNvbj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBSb2NrZXQgPSAocHJvcHMpID0+IChcclxuICA8SWNvbiB7Li4ucHJvcHN9PlxyXG4gICAgPHBhdGggZD1cIk00LjUgMTYuNWMtMS41IDEuMjYtMiA1LTIgNXMzLjc0LS41IDUtMmMuNzEtLjg0LjctMi4xMy0uMDktMi45MWEyLjE4IDIuMTggMCAwMC0yLjkxLS4wOXpNMTIgMTVsLTMtM2EyMiAyMiAwIDAxMi0zLjk1QTEyLjg4IDEyLjg4IDAgMDEyMiAyYzAgMi43Mi0uNzggNy41LTYgMTFhMjIuMzUgMjIuMzUgMCAwMS00IDJ6XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNOSAxMkg0cy41NS0zLjAzIDItNGMxLjYyLTEuMDggNSAwIDUgME0xMiAxNXY1czMuMDMtLjU1IDQtMmMxLjA4LTEuNjIgMC01IDAtNVwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNwYXJrbGVzID0gKHByb3BzKSA9PiAoXHJcbiAgPEljb24gey4uLnByb3BzfT5cclxuICAgIDxwYXRoIGQ9XCJNMTIgM2wxLjUgNC41TDE4IDlsLTQuNSAxLjVMMTIgMTVsLTEuNS00LjVMNiA5bDQuNS0xLjVMMTIgM3pNNSAxOWwxIDMgMS0zIDMtMS0zLTEtMS0zLTEgMy0zIDEgMyAxek0xOSAxMGwuNSAxLjUgMS41LjUtMS41LjUtLjUgMS41LS41LTEuNS0xLjUtLjUgMS41LS41LjUtMS41elwiIC8+XHJcbiAgPC9JY29uPlxyXG4pO1xyXG5cclxuLy8gRGVmYXVsdCBleHBvcnQgd2l0aCBhbGwgaWNvbnNcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIEFycm93UmlnaHQsIEFycm93TGVmdCwgQXJyb3dVcCwgQXJyb3dEb3duLFxyXG4gIENoZXZyb25SaWdodCwgQ2hldnJvbkxlZnQsIENoZXZyb25Eb3duLCBDaGV2cm9uVXAsXHJcbiAgQ2hlY2ssIFgsIFBsdXMsIE1pbnVzLCBNZW51LCBTZWFyY2gsIFNldHRpbmdzLFxyXG4gIFVzZXIsIFVzZXJzLCBNYWlsLCBQaG9uZSwgQmVsbCwgSGVhcnQsIFN0YXIsIEJvb2ttYXJrLFxyXG4gIFphcCwgU2hpZWxkLCBMb2NrLCBVbmxvY2ssIEdsb2JlLCBDb2RlLCBUZXJtaW5hbCwgRGF0YWJhc2UsIFNlcnZlciwgQ2xvdWQsXHJcbiAgRm9sZGVyLCBGaWxlLCBGaWxlVGV4dCwgSW1hZ2UsIFZpZGVvLFxyXG4gIE1vbml0b3IsIFNtYXJ0cGhvbmUsIFRhYmxldCwgTGFwdG9wLFxyXG4gIEdpdGh1YiwgVHdpdHRlciwgTGlua2VkaW4sIFlvdXR1YmUsIERpc2NvcmQsXHJcbiAgRG93bmxvYWQsIFVwbG9hZCwgU2hhcmUsIENvcHksIFRyYXNoLCBFZGl0LCBFeWUsIEV5ZU9mZixcclxuICBBbGVydENpcmNsZSwgQWxlcnRUcmlhbmdsZSwgQ2hlY2tDaXJjbGUsIFhDaXJjbGUsIEluZm8sIEhlbHBDaXJjbGUsXHJcbiAgSG9tZSwgRXh0ZXJuYWxMaW5rLCBMaW5rLFxyXG4gIENsb2NrLCBDYWxlbmRhciwgTWFwUGluLCBQYWNrYWdlLCBMYXllcnMsIEdyaWQsIExpc3QsIEZpbHRlciwgUmVmcmVzaEN3LCBSb3RhdGVDY3csIExvYWRlcixcclxuICBTdW4sIE1vb24sIFNlbmQsIE1lc3NhZ2VDaXJjbGUsIEF3YXJkLCBDcHUsIFJvY2tldCwgU3BhcmtsZXNcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRhYnMoe1xyXG4gIHRhYnMsXHJcbiAgZGVmYXVsdFRhYiA9IDAsXHJcbiAgb25DaGFuZ2UsXHJcbiAgdmFyaWFudCA9ICdkZWZhdWx0JyxcclxuICBmdWxsV2lkdGggPSBmYWxzZSxcclxuICBjbGFzc05hbWUgPSAnJyxcclxufSkge1xyXG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZShkZWZhdWx0VGFiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVGFiQ2hhbmdlID0gKGluZGV4KSA9PiB7XHJcbiAgICBzZXRBY3RpdmVUYWIoaW5kZXgpO1xyXG4gICAgb25DaGFuZ2U/LihpbmRleCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdmFyaWFudHMgPSB7XHJcbiAgICBkZWZhdWx0OiB7XHJcbiAgICAgIGNvbnRhaW5lcjogJ2JnLWdyYXktMTAwIHAtMSByb3VuZGVkLXhsJyxcclxuICAgICAgdGFiOiAncHgtNCBweS0yIHJvdW5kZWQtbGcgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCcsXHJcbiAgICAgIGFjdGl2ZTogJ2JnLXdoaXRlIHRleHQtZ3JheS05MDAgc2hhZG93LXNtJyxcclxuICAgICAgaW5hY3RpdmU6ICd0ZXh0LWdyYXktNjAwIGhvdmVyOnRleHQtZ3JheS05MDAnLFxyXG4gICAgfSxcclxuICAgIHVuZGVybGluZToge1xyXG4gICAgICBjb250YWluZXI6ICdib3JkZXItYiBib3JkZXItZ3JheS0yMDAnLFxyXG4gICAgICB0YWI6ICdweC00IHB5LTMgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCBib3JkZXItYi0yIC1tYi1weCcsXHJcbiAgICAgIGFjdGl2ZTogJ3RleHQtaW5kaWdvLTYwMCBib3JkZXItaW5kaWdvLTYwMCcsXHJcbiAgICAgIGluYWN0aXZlOiAndGV4dC1ncmF5LTYwMCBob3Zlcjp0ZXh0LWdyYXktOTAwIGJvcmRlci10cmFuc3BhcmVudCcsXHJcbiAgICB9LFxyXG4gICAgcGlsbHM6IHtcclxuICAgICAgY29udGFpbmVyOiAnZmxleCBnYXAtMicsXHJcbiAgICAgIHRhYjogJ3B4LTQgcHktMiByb3VuZGVkLWZ1bGwgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCcsXHJcbiAgICAgIGFjdGl2ZTogJ2JnLWluZGlnby02MDAgdGV4dC13aGl0ZScsXHJcbiAgICAgIGluYWN0aXZlOiAnYmctZ3JheS0xMDAgdGV4dC1ncmF5LTYwMCBob3ZlcjpiZy1ncmF5LTIwMCcsXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHYgPSB2YXJpYW50c1t2YXJpYW50XTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggJHtmdWxsV2lkdGggPyAndy1mdWxsJyA6ICcnfSAke3YuY29udGFpbmVyfWB9PlxyXG4gICAgICAgIHt0YWJzLm1hcCgodGFiLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUYWJDaGFuZ2UoaW5kZXgpfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BcclxuICAgICAgICAgICAgICAke3YudGFifVxyXG4gICAgICAgICAgICAgICR7YWN0aXZlVGFiID09PSBpbmRleCA/IHYuYWN0aXZlIDogdi5pbmFjdGl2ZX1cclxuICAgICAgICAgICAgICAke2Z1bGxXaWR0aCA/ICdmbGV4LTEnIDogJyd9XHJcbiAgICAgICAgICAgIGB9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XHJcbiAgICAgICAgICAgICAge3RhYi5pY29ufVxyXG4gICAgICAgICAgICAgIHt0YWIubGFiZWx9XHJcbiAgICAgICAgICAgICAge3RhYi5iYWRnZSAhPT0gdW5kZWZpbmVkICYmIChcclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YFxyXG4gICAgICAgICAgICAgICAgICBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LWJvbGRcclxuICAgICAgICAgICAgICAgICAgJHthY3RpdmVUYWIgPT09IGluZGV4ID8gJ2JnLXdoaXRlLzIwJyA6ICdiZy1ncmF5LTIwMCd9XHJcbiAgICAgICAgICAgICAgICBgfT5cclxuICAgICAgICAgICAgICAgICAge3RhYi5iYWRnZX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICApKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTRcIj5cclxuICAgICAgICB7dGFic1thY3RpdmVUYWJdPy5jb250ZW50fVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFRhYiBQYW5lbCAoZm9yIG1hbnVhbCB0YWIgY29udGVudCBtYW5hZ2VtZW50KVxyXG5leHBvcnQgZnVuY3Rpb24gVGFiUGFuZWwoeyBjaGlsZHJlbiwgYWN0aXZlIH0pIHtcclxuICBpZiAoIWFjdGl2ZSkgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYW5pbWF0ZS1mYWRlLWluXCI+e2NoaWxkcmVufTwvZGl2PjtcclxufVxyXG5cclxuLy8gVmVydGljYWwgVGFic1xyXG5leHBvcnQgZnVuY3Rpb24gVmVydGljYWxUYWJzKHtcclxuICB0YWJzLFxyXG4gIGRlZmF1bHRUYWIgPSAwLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG59KSB7XHJcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKGRlZmF1bHRUYWIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVUYWJDaGFuZ2UgPSAoaW5kZXgpID0+IHtcclxuICAgIHNldEFjdGl2ZVRhYihpbmRleCk7XHJcbiAgICBvbkNoYW5nZT8uKGluZGV4KTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGdhcC02ICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEgbWluLXctWzIwMHB4XVwiPlxyXG4gICAgICAgIHt0YWJzLm1hcCgodGFiLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUYWJDaGFuZ2UoaW5kZXgpfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BcclxuICAgICAgICAgICAgICBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBweC00IHB5LTMgcm91bmRlZC14bCB0ZXh0LWxlZnQgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbFxyXG4gICAgICAgICAgICAgICR7YWN0aXZlVGFiID09PSBpbmRleCBcclxuICAgICAgICAgICAgICAgID8gJ2JnLWluZGlnby01MCB0ZXh0LWluZGlnby02MDAnIFxyXG4gICAgICAgICAgICAgICAgOiAndGV4dC1ncmF5LTYwMCBob3ZlcjpiZy1ncmF5LTEwMCdcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGB9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt0YWIuaWNvbiAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXthY3RpdmVUYWIgPT09IGluZGV4ID8gJ3RleHQtaW5kaWdvLTYwMCcgOiAndGV4dC1ncmF5LTQwMCd9PlxyXG4gICAgICAgICAgICAgICAge3RhYi5pY29ufVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge3RhYi5sYWJlbH1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XHJcbiAgICAgICAge3RhYnNbYWN0aXZlVGFiXT8uY29udGVudH1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBTZWdtZW50ZWQgQ29udHJvbFxyXG5leHBvcnQgZnVuY3Rpb24gU2VnbWVudGVkQ29udHJvbCh7XHJcbiAgb3B0aW9ucyxcclxuICB2YWx1ZSxcclxuICBvbkNoYW5nZSxcclxuICBzaXplID0gJ21kJyxcclxuICBjbGFzc05hbWUgPSAnJyxcclxufSkge1xyXG4gIGNvbnN0IHNpemVzID0ge1xyXG4gICAgc206ICd0ZXh0LXNtIHB5LTEuNSBweC0zJyxcclxuICAgIG1kOiAndGV4dC1iYXNlIHB5LTIgcHgtNCcsXHJcbiAgICBsZzogJ3RleHQtbGcgcHktMi41IHB4LTUnLFxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGJnLWdyYXktMTAwIHAtMSByb3VuZGVkLXhsICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICB7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IChcclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb25DaGFuZ2Uob3B0aW9uLnZhbHVlKX1cclxuICAgICAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgICAgICAke3NpemVzW3NpemVdfSByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsXHJcbiAgICAgICAgICAgICR7dmFsdWUgPT09IG9wdGlvbi52YWx1ZSBcclxuICAgICAgICAgICAgICA/ICdiZy13aGl0ZSB0ZXh0LWdyYXktOTAwIHNoYWRvdy1zbScgXHJcbiAgICAgICAgICAgICAgOiAndGV4dC1ncmF5LTYwMCBob3Zlcjp0ZXh0LWdyYXktOTAwJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtvcHRpb24ubGFiZWx9XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICkpfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vSWNvbnMnO1xyXG5cclxuY29uc3Qgc2l6ZXMgPSB7XHJcbiAgeHM6ICd3LTYgaC02IHRleHQteHMnLFxyXG4gIHNtOiAndy04IGgtOCB0ZXh0LXNtJyxcclxuICBtZDogJ3ctMTAgaC0xMCB0ZXh0LWJhc2UnLFxyXG4gIGxnOiAndy0xMiBoLTEyIHRleHQtbGcnLFxyXG4gIHhsOiAndy0xNiBoLTE2IHRleHQteGwnLFxyXG4gICcyeGwnOiAndy0yMCBoLTIwIHRleHQtMnhsJyxcclxufTtcclxuXHJcbmNvbnN0IGNvbG9ycyA9IHtcclxuICBncmF5OiAnYmctZ3JheS0yMDAgdGV4dC1ncmF5LTYwMCcsXHJcbiAgaW5kaWdvOiAnYmctaW5kaWdvLTEwMCB0ZXh0LWluZGlnby02MDAnLFxyXG4gIHB1cnBsZTogJ2JnLXB1cnBsZS0xMDAgdGV4dC1wdXJwbGUtNjAwJyxcclxuICBwaW5rOiAnYmctcGluay0xMDAgdGV4dC1waW5rLTYwMCcsXHJcbiAgYmx1ZTogJ2JnLWJsdWUtMTAwIHRleHQtYmx1ZS02MDAnLFxyXG4gIGdyZWVuOiAnYmctZ3JlZW4tMTAwIHRleHQtZ3JlZW4tNjAwJyxcclxuICB5ZWxsb3c6ICdiZy15ZWxsb3ctMTAwIHRleHQteWVsbG93LTYwMCcsXHJcbiAgcmVkOiAnYmctcmVkLTEwMCB0ZXh0LXJlZC02MDAnLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXZhdGFyKHtcclxuICBzcmMsXHJcbiAgYWx0ID0gJycsXHJcbiAgbmFtZSxcclxuICBzaXplID0gJ21kJyxcclxuICBjb2xvciA9ICdpbmRpZ28nLFxyXG4gIHJvdW5kZWQgPSAnZnVsbCcsXHJcbiAgc3RhdHVzLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG4gIC4uLnByb3BzXHJcbn0pIHtcclxuICBjb25zdCByb3VuZGVkQ2xhc3NlcyA9IHtcclxuICAgIGZ1bGw6ICdyb3VuZGVkLWZ1bGwnLFxyXG4gICAgbGc6ICdyb3VuZGVkLTJ4bCcsXHJcbiAgICBtZDogJ3JvdW5kZWQteGwnLFxyXG4gICAgc206ICdyb3VuZGVkLWxnJyxcclxuICB9O1xyXG5cclxuICBjb25zdCBzdGF0dXNDb2xvcnMgPSB7XHJcbiAgICBvbmxpbmU6ICdiZy1ncmVlbi01MDAnLFxyXG4gICAgb2ZmbGluZTogJ2JnLWdyYXktNDAwJyxcclxuICAgIGF3YXk6ICdiZy15ZWxsb3ctNTAwJyxcclxuICAgIGJ1c3k6ICdiZy1yZWQtNTAwJyxcclxuICB9O1xyXG5cclxuICBjb25zdCBnZXRJbml0aWFscyA9IChuYW1lKSA9PiB7XHJcbiAgICBpZiAoIW5hbWUpIHJldHVybiAnJztcclxuICAgIGNvbnN0IHBhcnRzID0gbmFtZS5zcGxpdCgnICcpO1xyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHBhcnRzWzBdLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgcmV0dXJuIChwYXJ0c1swXS5jaGFyQXQoMCkgKyBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXS5jaGFyQXQoMCkpLnRvVXBwZXJDYXNlKCk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgcmVsYXRpdmUgaW5saW5lLWZsZXggJHtjbGFzc05hbWV9YH0gey4uLnByb3BzfT5cclxuICAgICAge3NyYyA/IChcclxuICAgICAgICA8aW1nXHJcbiAgICAgICAgICBzcmM9e3NyY31cclxuICAgICAgICAgIGFsdD17YWx0IHx8IG5hbWV9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2Ake3NpemVzW3NpemVdfSAke3JvdW5kZWRDbGFzc2VzW3JvdW5kZWRdfSBvYmplY3QtY292ZXJgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBuYW1lID8gKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgICAgICAke3NpemVzW3NpemVdfSAke3JvdW5kZWRDbGFzc2VzW3JvdW5kZWRdfSAke2NvbG9yc1tjb2xvcl19XHJcbiAgICAgICAgICAgIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtc2VtaWJvbGRcclxuICAgICAgICAgIGB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge2dldEluaXRpYWxzKG5hbWUpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgICAgICAke3NpemVzW3NpemVdfSAke3JvdW5kZWRDbGFzc2VzW3JvdW5kZWRdfSAke2NvbG9yc1tjb2xvcl19XHJcbiAgICAgICAgICAgIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxVc2VyIHNpemU9e3NpemUgPT09ICd4cycgPyAxMiA6IHNpemUgPT09ICdzbScgPyAxNiA6IDIwfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAge3N0YXR1cyAmJiAoXHJcbiAgICAgICAgPHNwYW5cclxuICAgICAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgICAgICBhYnNvbHV0ZSBib3R0b20tMCByaWdodC0wIGJsb2NrIHJvdW5kZWQtZnVsbCByaW5nLTIgcmluZy13aGl0ZVxyXG4gICAgICAgICAgICAke3N0YXR1c0NvbG9yc1tzdGF0dXNdfVxyXG4gICAgICAgICAgICAke3NpemUgPT09ICd4cycgfHwgc2l6ZSA9PT0gJ3NtJyA/ICd3LTIgaC0yJyA6ICd3LTMgaC0zJ31cclxuICAgICAgICAgIGB9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIEF2YXRhciBHcm91cFxyXG5leHBvcnQgZnVuY3Rpb24gQXZhdGFyR3JvdXAoe1xyXG4gIGF2YXRhcnMsXHJcbiAgbWF4ID0gNSxcclxuICBzaXplID0gJ21kJyxcclxuICBjbGFzc05hbWUgPSAnJyxcclxufSkge1xyXG4gIGNvbnN0IGRpc3BsYXllZCA9IGF2YXRhcnMuc2xpY2UoMCwgbWF4KTtcclxuICBjb25zdCByZW1haW5pbmcgPSBhdmF0YXJzLmxlbmd0aCAtIG1heDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCAtc3BhY2UteC0yICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICB7ZGlzcGxheWVkLm1hcCgoYXZhdGFyLCBpbmRleCkgPT4gKFxyXG4gICAgICAgIDxBdmF0YXJcclxuICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICB7Li4uYXZhdGFyfVxyXG4gICAgICAgICAgc2l6ZT17c2l6ZX1cclxuICAgICAgICAgIGNsYXNzTmFtZT1cInJpbmctMiByaW5nLXdoaXRlXCJcclxuICAgICAgICAvPlxyXG4gICAgICApKX1cclxuICAgICAge3JlbWFpbmluZyA+IDAgJiYgKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgICAgICAke3NpemVzW3NpemVdfSByb3VuZGVkLWZ1bGwgYmctZ3JheS0yMDAgdGV4dC1ncmF5LTYwMFxyXG4gICAgICAgICAgICBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LXNlbWlib2xkIHJpbmctMiByaW5nLXdoaXRlXHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgID5cclxuICAgICAgICAgICt7cmVtYWluaW5nfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gQXZhdGFyIHdpdGggQmFkZ2VcclxuZXhwb3J0IGZ1bmN0aW9uIEF2YXRhcldpdGhCYWRnZSh7XHJcbiAgYXZhdGFyLFxyXG4gIGJhZGdlLFxyXG4gIHBvc2l0aW9uID0gJ3RvcC1yaWdodCcsXHJcbiAgY2xhc3NOYW1lID0gJycsXHJcbn0pIHtcclxuICBjb25zdCBwb3NpdGlvbnMgPSB7XHJcbiAgICAndG9wLXJpZ2h0JzogJ3RvcC0wIHJpZ2h0LTAgLXRyYW5zbGF0ZS15LTEvNCB0cmFuc2xhdGUteC0xLzQnLFxyXG4gICAgJ3RvcC1sZWZ0JzogJ3RvcC0wIGxlZnQtMCAtdHJhbnNsYXRlLXktMS80IC10cmFuc2xhdGUteC0xLzQnLFxyXG4gICAgJ2JvdHRvbS1yaWdodCc6ICdib3R0b20tMCByaWdodC0wIHRyYW5zbGF0ZS15LTEvNCB0cmFuc2xhdGUteC0xLzQnLFxyXG4gICAgJ2JvdHRvbS1sZWZ0JzogJ2JvdHRvbS0wIGxlZnQtMCB0cmFuc2xhdGUteS0xLzQgLXRyYW5zbGF0ZS14LTEvNCcsXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgcmVsYXRpdmUgaW5saW5lLWZsZXggJHtjbGFzc05hbWV9YH0+XHJcbiAgICAgIDxBdmF0YXIgey4uLmF2YXRhcn0gLz5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgYWJzb2x1dGUgJHtwb3NpdGlvbnNbcG9zaXRpb25dfWB9PlxyXG4gICAgICAgIHtiYWRnZX1cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gVXNlciBBdmF0YXIgQ2FyZFxyXG5leHBvcnQgZnVuY3Rpb24gVXNlckNhcmQoe1xyXG4gIG5hbWUsXHJcbiAgZW1haWwsXHJcbiAgYXZhdGFyLFxyXG4gIGFjdGlvbixcclxuICBjbGFzc05hbWUgPSAnJyxcclxufSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0zICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICA8QXZhdGFyIHNyYz17YXZhdGFyfSBuYW1lPXtuYW1lfSBzaXplPVwibWRcIiAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wXCI+XHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCB0cnVuY2F0ZVwiPntuYW1lfTwvcD5cclxuICAgICAgICB7ZW1haWwgJiYgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNTAwIHRydW5jYXRlXCI+e2VtYWlsfTwvcD59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7YWN0aW9ufVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFByb2dyZXNzKHtcclxuICB2YWx1ZSA9IDAsXHJcbiAgbWF4ID0gMTAwLFxyXG4gIHNpemUgPSAnbWQnLFxyXG4gIHZhcmlhbnQgPSAncHJpbWFyeScsXHJcbiAgc2hvd0xhYmVsID0gZmFsc2UsXHJcbiAgYW5pbWF0ZWQgPSBmYWxzZSxcclxuICBjbGFzc05hbWUgPSAnJyxcclxufSkge1xyXG4gIGNvbnN0IHBlcmNlbnRhZ2UgPSBNYXRoLm1pbihNYXRoLm1heCgodmFsdWUgLyBtYXgpICogMTAwLCAwKSwgMTAwKTtcclxuXHJcbiAgY29uc3Qgc2l6ZXMgPSB7XHJcbiAgICBzbTogJ2gtMScsXHJcbiAgICBtZDogJ2gtMicsXHJcbiAgICBsZzogJ2gtMycsXHJcbiAgICB4bDogJ2gtNCcsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdmFyaWFudHMgPSB7XHJcbiAgICBwcmltYXJ5OiAnYmctaW5kaWdvLTYwMCcsXHJcbiAgICBzdWNjZXNzOiAnYmctZ3JlZW4tNTAwJyxcclxuICAgIHdhcm5pbmc6ICdiZy15ZWxsb3ctNTAwJyxcclxuICAgIGRhbmdlcjogJ2JnLXJlZC01MDAnLFxyXG4gICAgZ3JhZGllbnQ6ICdiZy1ncmFkaWVudC10by1yIGZyb20taW5kaWdvLTUwMCB0by1wdXJwbGUtNTAwJyxcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XHJcbiAgICAgIHtzaG93TGFiZWwgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gbWItMVwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwXCI+UHJvZ3Jlc3M8L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDBcIj57TWF0aC5yb3VuZChwZXJjZW50YWdlKX0lPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YHctZnVsbCBiZy1ncmF5LTIwMCByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuICR7c2l6ZXNbc2l6ZV19YH0+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgXHJcbiAgICAgICAgICAgICR7c2l6ZXNbc2l6ZV19ICR7dmFyaWFudHNbdmFyaWFudF19IHJvdW5kZWQtZnVsbFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgZWFzZS1vdXRcclxuICAgICAgICAgICAgJHthbmltYXRlZCA/ICdhbmltYXRlLXB1bHNlJyA6ICcnfVxyXG4gICAgICAgICAgYH1cclxuICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtwZXJjZW50YWdlfSVgIH19XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBDaXJjdWxhciBQcm9ncmVzc1xyXG5leHBvcnQgZnVuY3Rpb24gQ2lyY3VsYXJQcm9ncmVzcyh7XHJcbiAgdmFsdWUgPSAwLFxyXG4gIG1heCA9IDEwMCxcclxuICBzaXplID0gMTAwLFxyXG4gIHN0cm9rZVdpZHRoID0gOCxcclxuICB2YXJpYW50ID0gJ3ByaW1hcnknLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbiAgY2xhc3NOYW1lID0gJycsXHJcbn0pIHtcclxuICBjb25zdCBwZXJjZW50YWdlID0gTWF0aC5taW4oTWF0aC5tYXgoKHZhbHVlIC8gbWF4KSAqIDEwMCwgMCksIDEwMCk7XHJcbiAgY29uc3QgcmFkaXVzID0gKHNpemUgLSBzdHJva2VXaWR0aCkgLyAyO1xyXG4gIGNvbnN0IGNpcmN1bWZlcmVuY2UgPSByYWRpdXMgKiAyICogTWF0aC5QSTtcclxuICBjb25zdCBzdHJva2VEYXNob2Zmc2V0ID0gY2lyY3VtZmVyZW5jZSAtIChwZXJjZW50YWdlIC8gMTAwKSAqIGNpcmN1bWZlcmVuY2U7XHJcblxyXG4gIGNvbnN0IHZhcmlhbnRzID0ge1xyXG4gICAgcHJpbWFyeTogJ3RleHQtaW5kaWdvLTYwMCcsXHJcbiAgICBzdWNjZXNzOiAndGV4dC1ncmVlbi01MDAnLFxyXG4gICAgd2FybmluZzogJ3RleHQteWVsbG93LTUwMCcsXHJcbiAgICBkYW5nZXI6ICd0ZXh0LXJlZC01MDAnLFxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHJlbGF0aXZlIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciAke2NsYXNzTmFtZX1gfT5cclxuICAgICAgPHN2ZyB3aWR0aD17c2l6ZX0gaGVpZ2h0PXtzaXplfSBjbGFzc05hbWU9XCItcm90YXRlLTkwXCI+XHJcbiAgICAgICAgey8qIEJhY2tncm91bmQgY2lyY2xlICovfVxyXG4gICAgICAgIDxjaXJjbGVcclxuICAgICAgICAgIGN4PXtzaXplIC8gMn1cclxuICAgICAgICAgIGN5PXtzaXplIC8gMn1cclxuICAgICAgICAgIHI9e3JhZGl1c31cclxuICAgICAgICAgIHN0cm9rZVdpZHRoPXtzdHJva2VXaWR0aH1cclxuICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICBmaWxsPVwidHJhbnNwYXJlbnRcIlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTIwMFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICB7LyogUHJvZ3Jlc3MgY2lyY2xlICovfVxyXG4gICAgICAgIDxjaXJjbGVcclxuICAgICAgICAgIGN4PXtzaXplIC8gMn1cclxuICAgICAgICAgIGN5PXtzaXplIC8gMn1cclxuICAgICAgICAgIHI9e3JhZGl1c31cclxuICAgICAgICAgIHN0cm9rZVdpZHRoPXtzdHJva2VXaWR0aH1cclxuICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICBmaWxsPVwidHJhbnNwYXJlbnRcIlxyXG4gICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgIHN0cm9rZURhc2hhcnJheT17Y2lyY3VtZmVyZW5jZX1cclxuICAgICAgICAgIHN0cm9rZURhc2hvZmZzZXQ9e3N0cm9rZURhc2hvZmZzZXR9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2Ake3ZhcmlhbnRzW3ZhcmlhbnRdfSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgZWFzZS1vdXRgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgICB7c2hvd0xhYmVsICYmIChcclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPlxyXG4gICAgICAgICAge01hdGgucm91bmQocGVyY2VudGFnZSl9JVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFN0ZXBzIFByb2dyZXNzXHJcbmV4cG9ydCBmdW5jdGlvbiBTdGVwcyh7XHJcbiAgc3RlcHMsXHJcbiAgY3VycmVudFN0ZXAgPSAwLFxyXG4gIHZhcmlhbnQgPSAnZGVmYXVsdCcsXHJcbiAgY2xhc3NOYW1lID0gJycsXHJcbn0pIHtcclxuICBjb25zdCB2YXJpYW50cyA9IHtcclxuICAgIGRlZmF1bHQ6IHtcclxuICAgICAgYWN0aXZlOiAnYmctaW5kaWdvLTYwMCB0ZXh0LXdoaXRlJyxcclxuICAgICAgY29tcGxldGVkOiAnYmctaW5kaWdvLTYwMCB0ZXh0LXdoaXRlJyxcclxuICAgICAgcGVuZGluZzogJ2JnLWdyYXktMjAwIHRleHQtZ3JheS01MDAnLFxyXG4gICAgICBsaW5lOiAnYmctaW5kaWdvLTYwMCcsXHJcbiAgICAgIGxpbmVJbmFjdGl2ZTogJ2JnLWdyYXktMjAwJyxcclxuICAgIH0sXHJcbiAgICBudW1iZXJlZDoge1xyXG4gICAgICBhY3RpdmU6ICdiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUnLFxyXG4gICAgICBjb21wbGV0ZWQ6ICdiZy1ncmVlbi01MDAgdGV4dC13aGl0ZScsXHJcbiAgICAgIHBlbmRpbmc6ICdiZy1ncmF5LTIwMCB0ZXh0LWdyYXktNTAwJyxcclxuICAgICAgbGluZTogJ2JnLWdyZWVuLTUwMCcsXHJcbiAgICAgIGxpbmVJbmFjdGl2ZTogJ2JnLWdyYXktMjAwJyxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdiA9IHZhcmlhbnRzW3ZhcmlhbnRdO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciAke2NsYXNzTmFtZX1gfT5cclxuICAgICAge3N0ZXBzLm1hcCgoc3RlcCwgaW5kZXgpID0+IChcclxuICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtpbmRleH0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BcclxuICAgICAgICAgICAgICAgIHctMTAgaC0xMCByb3VuZGVkLWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC1zZW1pYm9sZFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXHJcbiAgICAgICAgICAgICAgICAke2luZGV4IDwgY3VycmVudFN0ZXAgPyB2LmNvbXBsZXRlZCA6IGluZGV4ID09PSBjdXJyZW50U3RlcCA/IHYuYWN0aXZlIDogdi5wZW5kaW5nfVxyXG4gICAgICAgICAgICAgIGB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7aW5kZXggPCBjdXJyZW50U3RlcCA/IChcclxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezJ9IGQ9XCJNNSAxM2w0IDRMMTkgN1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgaW5kZXggKyAxXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHtzdGVwLmxhYmVsICYmIChcclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BtdC0yIHRleHQtc20gZm9udC1tZWRpdW0gJHtpbmRleCA8PSBjdXJyZW50U3RlcCA/ICd0ZXh0LWdyYXktOTAwJyA6ICd0ZXh0LWdyYXktNTAwJ31gfT5cclxuICAgICAgICAgICAgICAgIHtzdGVwLmxhYmVsfVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB7aW5kZXggPCBzdGVwcy5sZW5ndGggLSAxICYmIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4LTEgaC0xIG14LTIgcm91bmRlZCAke2luZGV4IDwgY3VycmVudFN0ZXAgPyB2LmxpbmUgOiB2LmxpbmVJbmFjdGl2ZX1gfSAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgICApKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFNrZWxldG9uIExvYWRlclxyXG5leHBvcnQgZnVuY3Rpb24gU2tlbGV0b24oe1xyXG4gIHdpZHRoLFxyXG4gIGhlaWdodCxcclxuICBjaXJjbGUgPSBmYWxzZSxcclxuICBjbGFzc05hbWUgPSAnJyxcclxufSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgIGFuaW1hdGUtcHVsc2UgYmctZ3JheS0yMDBcclxuICAgICAgICAke2NpcmNsZSA/ICdyb3VuZGVkLWZ1bGwnIDogJ3JvdW5kZWQtbGcnfVxyXG4gICAgICAgICR7Y2xhc3NOYW1lfVxyXG4gICAgICBgfVxyXG4gICAgICBzdHlsZT17eyB3aWR0aCwgaGVpZ2h0IH19XHJcbiAgICAvPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFNrZWxldG9uIFRleHRcclxuZXhwb3J0IGZ1bmN0aW9uIFNrZWxldG9uVGV4dCh7XHJcbiAgbGluZXMgPSAzLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG59KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc3BhY2UteS0zICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogbGluZXMgfSkubWFwKChfLCBpbmRleCkgPT4gKFxyXG4gICAgICAgIDxTa2VsZXRvblxyXG4gICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgIGhlaWdodD17MTZ9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2luZGV4ID09PSBsaW5lcyAtIDEgPyAndy0zLzQnIDogJ3ctZnVsbCd9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBMb2FkaW5nIFNwaW5uZXJcclxuZXhwb3J0IGZ1bmN0aW9uIFNwaW5uZXIoe1xyXG4gIHNpemUgPSAnbWQnLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG59KSB7XHJcbiAgY29uc3Qgc2l6ZXMgPSB7XHJcbiAgICBzbTogJ3ctNCBoLTQnLFxyXG4gICAgbWQ6ICd3LTYgaC02JyxcclxuICAgIGxnOiAndy04IGgtOCcsXHJcbiAgICB4bDogJ3ctMTIgaC0xMicsXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgY2xhc3NOYW1lPXtgYW5pbWF0ZS1zcGluICR7c2l6ZXNbc2l6ZV19IHRleHQtaW5kaWdvLTYwMCAke2NsYXNzTmFtZX1gfVxyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgID5cclxuICAgICAgPGNpcmNsZVxyXG4gICAgICAgIGNsYXNzTmFtZT1cIm9wYWNpdHktMjVcIlxyXG4gICAgICAgIGN4PVwiMTJcIlxyXG4gICAgICAgIGN5PVwiMTJcIlxyXG4gICAgICAgIHI9XCIxMFwiXHJcbiAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICBzdHJva2VXaWR0aD1cIjRcIlxyXG4gICAgICAvPlxyXG4gICAgICA8cGF0aFxyXG4gICAgICAgIGNsYXNzTmFtZT1cIm9wYWNpdHktNzVcIlxyXG4gICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgIGQ9XCJNNCAxMmE4IDggMCAwMTgtOFYwQzUuMzczIDAgMCA1LjM3MyAwIDEyaDR6bTIgNS4yOTFBNy45NjIgNy45NjIgMCAwMTQgMTJIMGMwIDMuMDQyIDEuMTM1IDUuODI0IDMgNy45MzhsMy0yLjY0N3pcIlxyXG4gICAgICAvPlxyXG4gICAgPC9zdmc+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gTG9hZGluZyBEb3RzXHJcbmV4cG9ydCBmdW5jdGlvbiBMb2FkaW5nRG90cyh7IGNsYXNzTmFtZSA9ICcnIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSAke2NsYXNzTmFtZX1gfT5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiBiZy1pbmRpZ28tNjAwIHJvdW5kZWQtZnVsbCBhbmltYXRlLWJvdW5jZVwiIHN0eWxlPXt7IGFuaW1hdGlvbkRlbGF5OiAnMG1zJyB9fSAvPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIGJnLWluZGlnby02MDAgcm91bmRlZC1mdWxsIGFuaW1hdGUtYm91bmNlXCIgc3R5bGU9e3sgYW5pbWF0aW9uRGVsYXk6ICcxNTBtcycgfX0gLz5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiBiZy1pbmRpZ28tNjAwIHJvdW5kZWQtZnVsbCBhbmltYXRlLWJvdW5jZVwiIHN0eWxlPXt7IGFuaW1hdGlvbkRlbGF5OiAnMzAwbXMnIH19IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IENoZXZyb25Eb3duIH0gZnJvbSAnLi9JY29ucyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBY2NvcmRpb24oe1xyXG4gIGl0ZW1zLFxyXG4gIGFsbG93TXVsdGlwbGUgPSBmYWxzZSxcclxuICBkZWZhdWx0T3BlbiA9IFtdLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG59KSB7XHJcbiAgY29uc3QgW29wZW5JdGVtcywgc2V0T3Blbkl0ZW1zXSA9IHVzZVN0YXRlKGRlZmF1bHRPcGVuKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlSXRlbSA9IChpbmRleCkgPT4ge1xyXG4gICAgaWYgKGFsbG93TXVsdGlwbGUpIHtcclxuICAgICAgc2V0T3Blbkl0ZW1zKHByZXYgPT5cclxuICAgICAgICBwcmV2LmluY2x1ZGVzKGluZGV4KVxyXG4gICAgICAgICAgPyBwcmV2LmZpbHRlcihpID0+IGkgIT09IGluZGV4KVxyXG4gICAgICAgICAgOiBbLi4ucHJldiwgaW5kZXhdXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRPcGVuSXRlbXMocHJldiA9PlxyXG4gICAgICAgIHByZXYuaW5jbHVkZXMoaW5kZXgpID8gW10gOiBbaW5kZXhdXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgZGl2aWRlLXkgZGl2aWRlLWdyYXktMjAwIGJvcmRlciBib3JkZXItZ3JheS0yMDAgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gJHtjbGFzc05hbWV9YH0+XHJcbiAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgPEFjY29yZGlvbkl0ZW1cclxuICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cclxuICAgICAgICAgIGljb249e2l0ZW0uaWNvbn1cclxuICAgICAgICAgIGlzT3Blbj17b3Blbkl0ZW1zLmluY2x1ZGVzKGluZGV4KX1cclxuICAgICAgICAgIG9uVG9nZ2xlPXsoKSA9PiB0b2dnbGVJdGVtKGluZGV4KX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7aXRlbS5jb250ZW50fVxyXG4gICAgICAgIDwvQWNjb3JkaW9uSXRlbT5cclxuICAgICAgKSl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBTaW5nbGUgQWNjb3JkaW9uIEl0ZW1cclxuZXhwb3J0IGZ1bmN0aW9uIEFjY29yZGlvbkl0ZW0oe1xyXG4gIHRpdGxlLFxyXG4gIGljb24sXHJcbiAgaXNPcGVuLFxyXG4gIG9uVG9nZ2xlLFxyXG4gIGNoaWxkcmVuLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG59KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgb25DbGljaz17b25Ub2dnbGV9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwLTQgdGV4dC1sZWZ0IGJnLXdoaXRlIGhvdmVyOmJnLWdyYXktNTAgdHJhbnNpdGlvbi1jb2xvcnNcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxyXG4gICAgICAgICAge2ljb24gJiYgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMFwiPntpY29ufTwvc3Bhbj59XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwXCI+e3RpdGxlfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8Q2hldnJvbkRvd25cclxuICAgICAgICAgIHNpemU9ezIwfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1ncmF5LTQwMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0yMDAgJHtpc09wZW4gPyAncm90YXRlLTE4MCcgOiAnJ31gfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPXtgXHJcbiAgICAgICAgICBvdmVyZmxvdy1oaWRkZW4gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGVhc2UtaW4tb3V0XHJcbiAgICAgICAgICAke2lzT3BlbiA/ICdtYXgtaC05NiBvcGFjaXR5LTEwMCcgOiAnbWF4LWgtMCBvcGFjaXR5LTAnfVxyXG4gICAgICAgIGB9XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBwdC0wIHRleHQtZ3JheS02MDBcIj5cclxuICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBGQVEgQWNjb3JkaW9uIChzdHlsZWQgZGlmZmVyZW50bHkpXHJcbmV4cG9ydCBmdW5jdGlvbiBGQVFBY2NvcmRpb24oe1xyXG4gIGl0ZW1zLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG59KSB7XHJcbiAgY29uc3QgW29wZW5JbmRleCwgc2V0T3BlbkluZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2BzcGFjZS15LTQgJHtjbGFzc05hbWV9YH0+XHJcbiAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgICAgICBiZy13aGl0ZSByb3VuZGVkLXhsIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDBcclxuICAgICAgICAgICAgJHtvcGVuSW5kZXggPT09IGluZGV4ID8gJ2JvcmRlci1pbmRpZ28tMjAwIHNoYWRvdy1sZycgOiAnYm9yZGVyLWdyYXktMjAwJ31cclxuICAgICAgICAgIGB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuSW5kZXgob3BlbkluZGV4ID09PSBpbmRleCA/IG51bGwgOiBpbmRleCl9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgcC01IHRleHQtbGVmdFwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPntpdGVtLnF1ZXN0aW9ufTwvc3Bhbj5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgICAgICAgICAgdy04IGgtOCByb3VuZGVkLWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZmxleC1zaHJpbmstMFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwXHJcbiAgICAgICAgICAgICAgICAke29wZW5JbmRleCA9PT0gaW5kZXggPyAnYmctaW5kaWdvLTEwMCB0ZXh0LWluZGlnby02MDAnIDogJ2JnLWdyYXktMTAwIHRleHQtZ3JheS00MDAnfVxyXG4gICAgICAgICAgICAgIGB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8Q2hldnJvbkRvd25cclxuICAgICAgICAgICAgICAgIHNpemU9ezE4fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMjAwICR7b3BlbkluZGV4ID09PSBpbmRleCA/ICdyb3RhdGUtMTgwJyA6ICcnfWB9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgXHJcbiAgICAgICAgICAgICAgb3ZlcmZsb3ctaGlkZGVuIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBlYXNlLWluLW91dFxyXG4gICAgICAgICAgICAgICR7b3BlbkluZGV4ID09PSBpbmRleCA/ICdtYXgtaC05NicgOiAnbWF4LWgtMCd9XHJcbiAgICAgICAgICAgIGB9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNSBwYi01IHRleHQtZ3JheS02MDAgbGVhZGluZy1yZWxheGVkXCI+XHJcbiAgICAgICAgICAgICAge2l0ZW0uYW5zd2VyfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIENvbGxhcHNpYmxlIChzaW5nbGUgdG9nZ2xlKVxyXG5leHBvcnQgZnVuY3Rpb24gQ29sbGFwc2libGUoe1xyXG4gIHRyaWdnZXIsXHJcbiAgY2hpbGRyZW4sXHJcbiAgZGVmYXVsdE9wZW4gPSBmYWxzZSxcclxuICBjbGFzc05hbWUgPSAnJyxcclxufSkge1xyXG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShkZWZhdWx0T3Blbik7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cclxuICAgICAgPGRpdiBvbkNsaWNrPXsoKSA9PiBzZXRJc09wZW4oIWlzT3Blbil9PlxyXG4gICAgICAgIHt0eXBlb2YgdHJpZ2dlciA9PT0gJ2Z1bmN0aW9uJyA/IHRyaWdnZXIoaXNPcGVuKSA6IHRyaWdnZXJ9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPXtgXHJcbiAgICAgICAgICBvdmVyZmxvdy1oaWRkZW4gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGVhc2UtaW4tb3V0XHJcbiAgICAgICAgICAke2lzT3BlbiA/ICdtYXgtaC1bMTAwMHB4XSBvcGFjaXR5LTEwMCcgOiAnbWF4LWgtMCBvcGFjaXR5LTAnfVxyXG4gICAgICAgIGB9XHJcbiAgICAgID5cclxuICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRvb2x0aXAoe1xyXG4gIGNoaWxkcmVuLFxyXG4gIGNvbnRlbnQsXHJcbiAgcG9zaXRpb24gPSAndG9wJyxcclxuICBkZWxheSA9IDIwMCxcclxuICBjbGFzc05hbWUgPSAnJyxcclxufSkge1xyXG4gIGNvbnN0IFtpc1Zpc2libGUsIHNldElzVmlzaWJsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgdGltZW91dFJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3QgcG9zaXRpb25zID0ge1xyXG4gICAgdG9wOiAnYm90dG9tLWZ1bGwgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiBtYi0yJyxcclxuICAgIGJvdHRvbTogJ3RvcC1mdWxsIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgbXQtMicsXHJcbiAgICBsZWZ0OiAncmlnaHQtZnVsbCB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgbXItMicsXHJcbiAgICByaWdodDogJ2xlZnQtZnVsbCB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgbWwtMicsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYXJyb3dzID0ge1xyXG4gICAgdG9wOiAndG9wLWZ1bGwgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiBib3JkZXItbC10cmFuc3BhcmVudCBib3JkZXItci10cmFuc3BhcmVudCBib3JkZXItYi10cmFuc3BhcmVudCBib3JkZXItdC1ncmF5LTkwMCcsXHJcbiAgICBib3R0b206ICdib3R0b20tZnVsbCBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIGJvcmRlci1sLXRyYW5zcGFyZW50IGJvcmRlci1yLXRyYW5zcGFyZW50IGJvcmRlci10LXRyYW5zcGFyZW50IGJvcmRlci1iLWdyYXktOTAwJyxcclxuICAgIGxlZnQ6ICdsZWZ0LWZ1bGwgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIGJvcmRlci10LXRyYW5zcGFyZW50IGJvcmRlci1iLXRyYW5zcGFyZW50IGJvcmRlci1yLXRyYW5zcGFyZW50IGJvcmRlci1sLWdyYXktOTAwJyxcclxuICAgIHJpZ2h0OiAncmlnaHQtZnVsbCB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgYm9yZGVyLXQtdHJhbnNwYXJlbnQgYm9yZGVyLWItdHJhbnNwYXJlbnQgYm9yZGVyLWwtdHJhbnNwYXJlbnQgYm9yZGVyLXItZ3JheS05MDAnLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vdXNlRW50ZXIgPSAoKSA9PiB7XHJcbiAgICB0aW1lb3V0UmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KCgpID0+IHNldElzVmlzaWJsZSh0cnVlKSwgZGVsYXkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vdXNlTGVhdmUgPSAoKSA9PiB7XHJcbiAgICBjbGVhclRpbWVvdXQodGltZW91dFJlZi5jdXJyZW50KTtcclxuICAgIHNldElzVmlzaWJsZShmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiBjbGVhclRpbWVvdXQodGltZW91dFJlZi5jdXJyZW50KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIGlubGluZS1mbGV4ICR7Y2xhc3NOYW1lfWB9XHJcbiAgICAgIG9uTW91c2VFbnRlcj17aGFuZGxlTW91c2VFbnRlcn1cclxuICAgICAgb25Nb3VzZUxlYXZlPXtoYW5kbGVNb3VzZUxlYXZlfVxyXG4gICAgPlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIHtpc1Zpc2libGUgJiYgKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17YFxyXG4gICAgICAgICAgICBhYnNvbHV0ZSB6LTUwICR7cG9zaXRpb25zW3Bvc2l0aW9uXX1cclxuICAgICAgICAgICAgcHgtMyBweS0yIHRleHQtc20gdGV4dC13aGl0ZSBiZy1ncmF5LTkwMCByb3VuZGVkLWxnXHJcbiAgICAgICAgICAgIHdoaXRlc3BhY2Utbm93cmFwIGFuaW1hdGUtdG9vbHRpcFxyXG4gICAgICAgICAgYH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7Y29udGVudH1cclxuICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlICR7YXJyb3dzW3Bvc2l0aW9uXX0gYm9yZGVyLTRgfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgICAgPHN0eWxlIGpzeD57YFxyXG4gICAgICAgIEBrZXlmcmFtZXMgdG9vbHRpcCB7XHJcbiAgICAgICAgICBmcm9tIHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHNjYWxlKDAuOTUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdG8ge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgc2NhbGUoMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5hbmltYXRlLXRvb2x0aXAge1xyXG4gICAgICAgICAgYW5pbWF0aW9uOiB0b29sdGlwIDAuMTVzIGVhc2Utb3V0O1xyXG4gICAgICAgIH1cclxuICAgICAgYH08L3N0eWxlPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gUG9wb3ZlciAoY2xpY2sgdG8gc2hvdywgbW9yZSBjb250ZW50KVxyXG5leHBvcnQgZnVuY3Rpb24gUG9wb3Zlcih7XHJcbiAgY2hpbGRyZW4sXHJcbiAgY29udGVudCxcclxuICB0aXRsZSxcclxuICBwb3NpdGlvbiA9ICdib3R0b20nLFxyXG4gIGNsYXNzTmFtZSA9ICcnLFxyXG59KSB7XHJcbiAgY29uc3QgW2lzVmlzaWJsZSwgc2V0SXNWaXNpYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBwb3BvdmVyUmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICBjb25zdCBwb3NpdGlvbnMgPSB7XHJcbiAgICB0b3A6ICdib3R0b20tZnVsbCBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIG1iLTInLFxyXG4gICAgYm90dG9tOiAndG9wLWZ1bGwgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiBtdC0yJyxcclxuICAgIGxlZnQ6ICdyaWdodC1mdWxsIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiBtci0yJyxcclxuICAgIHJpZ2h0OiAnbGVmdC1mdWxsIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiBtbC0yJyxcclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChwb3BvdmVyUmVmLmN1cnJlbnQgJiYgIXBvcG92ZXJSZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XHJcbiAgICAgICAgc2V0SXNWaXNpYmxlKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVDbGlja091dHNpZGUpO1xyXG4gICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZUNsaWNrT3V0c2lkZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiByZWY9e3BvcG92ZXJSZWZ9IGNsYXNzTmFtZT17YHJlbGF0aXZlIGlubGluZS1mbGV4ICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICA8ZGl2IG9uQ2xpY2s9eygpID0+IHNldElzVmlzaWJsZSghaXNWaXNpYmxlKX0+XHJcbiAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAge2lzVmlzaWJsZSAmJiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgXHJcbiAgICAgICAgICAgIGFic29sdXRlIHotNTAgJHtwb3NpdGlvbnNbcG9zaXRpb25dfVxyXG4gICAgICAgICAgICBtaW4tdy1bMjAwcHhdIGJnLXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LWxnIGJvcmRlciBib3JkZXItZ3JheS0yMDBcclxuICAgICAgICAgICAgYW5pbWF0ZS1wb3BvdmVyXHJcbiAgICAgICAgICBgfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt0aXRsZSAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0zIGJvcmRlci1iIGJvcmRlci1ncmF5LTEwMCBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5cclxuICAgICAgICAgICAgICB7dGl0bGV9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00XCI+XHJcbiAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICAgIDxzdHlsZSBqc3g+e2BcclxuICAgICAgICBAa2V5ZnJhbWVzIHBvcG92ZXIge1xyXG4gICAgICAgICAgZnJvbSB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKDRweCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0byB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAuYW5pbWF0ZS1wb3BvdmVyIHtcclxuICAgICAgICAgIGFuaW1hdGlvbjogcG9wb3ZlciAwLjJzIGVhc2Utb3V0O1xyXG4gICAgICAgIH1cclxuICAgICAgYH08L3N0eWxlPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gVG9hc3QgTm90aWZpY2F0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBUb2FzdCh7XHJcbiAgbWVzc2FnZSxcclxuICB0eXBlID0gJ2luZm8nLFxyXG4gIG9uQ2xvc2UsXHJcbiAgZHVyYXRpb24gPSA1MDAwLFxyXG4gIGFjdGlvbixcclxufSkge1xyXG4gIGNvbnN0IFtpc1Zpc2libGUsIHNldElzVmlzaWJsZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgY29uc3QgdHlwZXMgPSB7XHJcbiAgICBzdWNjZXNzOiB7XHJcbiAgICAgIGJnOiAnYmctZ3JlZW4tNjAwJyxcclxuICAgICAgaWNvbjogKFxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTUgMTNsNCA0TDE5IDdcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICApLFxyXG4gICAgfSxcclxuICAgIGVycm9yOiB7XHJcbiAgICAgIGJnOiAnYmctcmVkLTYwMCcsXHJcbiAgICAgIGljb246IChcclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNSBoLTVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17Mn0gZD1cIk02IDE4TDE4IDZNNiA2bDEyIDEyXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgKSxcclxuICAgIH0sXHJcbiAgICB3YXJuaW5nOiB7XHJcbiAgICAgIGJnOiAnYmcteWVsbG93LTUwMCcsXHJcbiAgICAgIGljb246IChcclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNSBoLTVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17Mn0gZD1cIk0xMiA5djJtMCA0aC4wMW0tNi45MzggNGgxMy44NTZjMS41NCAwIDIuNTAyLTEuNjY3IDEuNzMyLTNMMTMuNzMyIDRjLS43Ny0xLjMzMy0yLjY5NC0xLjMzMy0zLjQ2NCAwTDMuMzQgMTZjLS43NyAxLjMzMy4xOTIgMyAxLjczMiAzelwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICksXHJcbiAgICB9LFxyXG4gICAgaW5mbzoge1xyXG4gICAgICBiZzogJ2JnLWJsdWUtNjAwJyxcclxuICAgICAgaWNvbjogKFxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTEzIDE2aC0xdi00aC0xbTEtNGguMDFNMjEgMTJhOSA5IDAgMTEtMTggMCA5IDkgMCAwMTE4IDB6XCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgKSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChkdXJhdGlvbiA+IDApIHtcclxuICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzZXRJc1Zpc2libGUoZmFsc2UpO1xyXG4gICAgICAgIG9uQ2xvc2U/LigpO1xyXG4gICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICAgIHJldHVybiAoKSA9PiBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgfVxyXG4gIH0sIFtkdXJhdGlvbiwgb25DbG9zZV0pO1xyXG5cclxuICBpZiAoIWlzVmlzaWJsZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IHQgPSB0eXBlc1t0eXBlXTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtgXHJcbiAgICAgICAgZml4ZWQgYm90dG9tLTQgcmlnaHQtNCB6LTUwXHJcbiAgICAgICAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcHgtNCBweS0zIHJvdW5kZWQteGwgc2hhZG93LWxnXHJcbiAgICAgICAgdGV4dC13aGl0ZSAke3QuYmd9XHJcbiAgICAgICAgYW5pbWF0ZS1zbGlkZS11cFxyXG4gICAgICBgfVxyXG4gICAgPlxyXG4gICAgICB7dC5pY29ufVxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPnttZXNzYWdlfTwvc3Bhbj5cclxuICAgICAge2FjdGlvbiAmJiAoXHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJtbC0yIGZvbnQtc2VtaWJvbGQgdW5kZXJsaW5lIGhvdmVyOm5vLXVuZGVybGluZVwiPlxyXG4gICAgICAgICAge2FjdGlvbn1cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgKX1cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgIHNldElzVmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgICBvbkNsb3NlPy4oKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIGNsYXNzTmFtZT1cIm1sLTIgb3BhY2l0eS03MCBob3ZlcjpvcGFjaXR5LTEwMFwiXHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNCBoLTRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17Mn0gZD1cIk02IDE4TDE4IDZNNiA2bDEyIDEyXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxzdHlsZSBqc3g+e2BcclxuICAgICAgICBAa2V5ZnJhbWVzIHNsaWRlLXVwIHtcclxuICAgICAgICAgIGZyb20ge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0byB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLmFuaW1hdGUtc2xpZGUtdXAge1xyXG4gICAgICAgICAgYW5pbWF0aW9uOiBzbGlkZS11cCAwLjNzIGVhc2Utb3V0O1xyXG4gICAgICAgIH1cclxuICAgICAgYH08L3N0eWxlPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7OztBQUFBLE9BQU9BLFdBQVMsWUFBQUMsaUJBQWdCOzs7QUNVaEMsSUFBTSxZQUFZLE9BQU8sV0FBVztBQUc3QixJQUFNLFlBQ1gsY0FDQyxPQUFPLFNBQVMsU0FBUyxjQUN4QixDQUFDLENBQUMsT0FBTyxZQUNULFVBQVUsVUFBVSxTQUFTLFVBQVU7QUFHcEMsSUFBTSxXQUNYLGNBQ0MsQ0FBQyxDQUFDLE9BQU8sYUFDUixDQUFDLENBQUMsT0FBTyxpQkFDVCxDQUFDLENBQUMsT0FBTyxRQUFRLGlCQUFpQixVQUNsQyxVQUFVLFVBQVUsU0FBUyxXQUFXO0FBR3JDLElBQU0sWUFBWSxZQUFZLFdBQVcsS0FBSyxVQUFVLFNBQVM7QUFDakUsSUFBTSxRQUFRLFlBQVksb0JBQW9CLEtBQUssVUFBVSxTQUFTO0FBTXRFLElBQU0sWUFBWSxNQUFNO0FBQzdCLE1BQUksVUFBVyxRQUFPO0FBQ3RCLE1BQUksVUFBVyxRQUFPO0FBQ3RCLE1BQUksTUFBTyxRQUFPO0FBQ2xCLE1BQUksU0FBVSxRQUFPO0FBQ3JCLFNBQU87QUFDVCxHQUFHOzs7QUN6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UUFFOUUsZ0JBQUFDLE9BQUMsU0FBSSxXQUFVLFlBQ2I7QUFBQSwwQkFBQUQsTUFBQyxRQUFHLFdBQVUsd0RBQXVELCtDQUVyRTtBQUFBLFVBQ0EsZ0JBQUFBLE1BQUMsT0FBRSxXQUFVLGlEQUFnRCx1RUFFN0Q7QUFBQSxVQUNBLGdCQUFBQyxPQUFDLFNBQUksV0FBVSx1Q0FDYjtBQUFBLDRCQUFBRCxNQUFDLFFBQUssTUFBSyxTQUNULDBCQUFBQSxNQUFDSSxTQUFBLEVBQU8sU0FBUSxZQUFXLE1BQUssTUFBSyxNQUFNLGdCQUFBSixNQUFDLGNBQVcsTUFBTSxJQUFJLEdBQUksY0FBYSxTQUFRLGdDQUUxRixHQUNGO0FBQUEsWUFDQSxnQkFBQUEsTUFBQyxPQUFFLE1BQUssMENBQXlDLFFBQU8sVUFBUyxLQUFJLHVCQUNuRSwwQkFBQUEsTUFBQ0ksU0FBQSxFQUFPLFNBQVEsYUFBWSxNQUFLLE1BQUssTUFBTSxnQkFBQUosTUFBQyxVQUFPLE1BQU0sSUFBSSxHQUFJLG9CQUVsRSxHQUNGO0FBQUEsYUFDRjtBQUFBLFdBQ0Y7QUFBQSxTQUNGO0FBQUEsT0FDRjtBQUFBLEtBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFsiUmVhY3QiLCAidXNlU3RhdGUiLCAicGxhdGZvcm0iLCAiU3R5bGVTaGVldCIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJqc3hzIiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiRXZlbnRFbWl0dGVyIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgIkJ1dHRvbiIsICJSZWFjdCIsICJqc3giLCAianN4cyIsICJ2YXJpYW50cyIsICJzaXplcyIsICJSZWFjdCIsICJqc3giLCAianN4cyIsICJDYXJkIiwgImpzeHMiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImpzeHMiLCAic2l6ZXMiLCAianN4cyIsICJqc3giLCAiUmVhY3QiLCAiUmVhY3QiLCAianN4IiwgImpzeHMiLCAiSWNvbiIsICJqc3giLCAiSWNvbiIsICJqc3giLCAiSWNvbiIsICJqc3hzIiwgIkljb24iLCAianN4IiwgImpzeHMiLCAiSWNvbiIsICJqc3giLCAianN4IiwgIkljb24iLCAianN4IiwgIkljb24iLCAianN4cyIsICJJY29uIiwgImpzeCIsICJqc3hzIiwgIkljb24iLCAianN4IiwgImpzeCIsICJJY29uIiwgImpzeHMiLCAiSWNvbiIsICJqc3giLCAianN4cyIsICJJY29uIiwgImpzeCIsICJqc3hzIiwgIkljb24iLCAianN4IiwgImpzeCIsICJqc3hzIiwgInZhcmlhbnRzIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgInZhcmlhbnRzIiwgInNpemVzIiwgImpzeCIsICJSZWFjdCIsICJqc3giLCAianN4cyIsICJzaXplcyIsICJuYW1lIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgInNpemVzIiwgInZhcmlhbnRzIiwgInNpemVzIiwgImpzeHMiLCAianN4IiwgIlJlYWN0IiwgInVzZVN0YXRlIiwgImpzeCIsICJqc3hzIiwgInVzZVN0YXRlIiwgImpzeCIsICJqc3hzIiwgIlJlYWN0IiwgInVzZVN0YXRlIiwgImpzeCIsICJqc3hzIiwgImpzeCIsICJqc3hzIiwgInVzZVN0YXRlIiwgIkNhcmQiLCAiQnV0dG9uIiwgIkljb24iXQp9Cg==
