var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// pages/about.jsx
import React29 from "react";

// node_modules/indjs/src/routing/router.mjs
import React from "react";

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
import React2, { forwardRef } from "react";

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
var StyleSheet = {
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
var style_sheet_default = StyleSheet;

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
import React3 from "react";

// node_modules/indjs/src/components/view.jsx
import React4, { forwardRef as forwardRef2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var View = forwardRef2(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("view");
  const flatStyle = style_sheet_default.flatten([style]);
  return /* @__PURE__ */ jsx2(
    Component,
    {
      ref,
      style: flatStyle,
      className: className || "",
      ...rest,
      children
    }
  );
});
View.displayName = "View";
var view_default = View;

// node_modules/indjs/src/components/text.jsx
import React5, { forwardRef as forwardRef3 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var Text = forwardRef3(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("text");
  const flatStyle = style_sheet_default.flatten([style]);
  return /* @__PURE__ */ jsx3(
    Component,
    {
      ref,
      style: flatStyle,
      className: className || "",
      ...rest,
      children
    }
  );
});
Text.displayName = "Text";
var text_default = Text;

// node_modules/indjs/src/components/scroll-view.jsx
import React6, { forwardRef as forwardRef4 } from "react";
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
import React7, { forwardRef as forwardRef5 } from "react";
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
      ...style_sheet_default.flatten(style)
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
          className: className || "",
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
        className: className || "",
        ...rest
      }
    );
  }
);
TextInput.displayName = "TextInput";

// node_modules/indjs/src/components/button.jsx
import React8, { forwardRef as forwardRef6 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Button = forwardRef6(
  ({ title, onPress, color, disabled, className, ...rest }, ref) => {
    const Component = resolveElement("button");
    if (Component === "button" || Component === "div") {
      const flatStyle = style_sheet_default.flatten([
        {
          cursor: "pointer",
          backgroundColor: color || void 0,
          opacity: disabled ? 0.5 : 1
        },
        rest.style
      ]);
      return /* @__PURE__ */ jsx6(
        "button",
        {
          ref,
          onClick: onPress,
          disabled,
          className: className || "",
          style: flatStyle,
          type: "button",
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
        className: className || "",
        ...rest
      }
    );
  }
);
Button.displayName = "Button";

// node_modules/indjs/src/components/activity-indicator.jsx
import React9, { forwardRef as forwardRef7 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var ActivityIndicator = forwardRef7(
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
        ...style_sheet_default.flatten(style)
      };
      if (typeof document !== "undefined" && !document.getElementById("indjs-spin-style")) {
        const styleEl = document.createElement("style");
        styleEl.id = "indjs-spin-style";
        styleEl.innerHTML = `@keyframes indjs-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(styleEl);
      }
      return /* @__PURE__ */ jsx7(
        "div",
        {
          ref,
          style: spinnerStyle,
          className: className || "",
          ...rest
        }
      );
    }
    return /* @__PURE__ */ jsx7(
      Component,
      {
        ref,
        size,
        color,
        style,
        className: className || "",
        ...rest
      }
    );
  }
);
ActivityIndicator.displayName = "ActivityIndicator";

// node_modules/indjs/src/components/switch.jsx
import React10, { forwardRef as forwardRef8 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var Switch = forwardRef8(
  ({ value, onValueChange, disabled, trackColor, thumbColor, style, className, ...rest }, ref) => {
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
          className: className || "",
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
        className: className || "",
        ...rest
      }
    );
  }
);
Switch.displayName = "Switch";

// node_modules/indjs/src/components/flat-list.jsx
import React11, { forwardRef as forwardRef9 } from "react";
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
          const Empty = React11.isValidElement(ListEmptyComponent) ? ListEmptyComponent : /* @__PURE__ */ jsx9(ListEmptyComponent, {});
          return /* @__PURE__ */ jsxs(
            scroll_view_default,
            {
              contentContainerStyle,
              horizontal,
              ref,
              ...rest,
              children: [
                ListHeaderComponent && (React11.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx9(ListHeaderComponent, {})),
                Empty,
                ListFooterComponent && (React11.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx9(ListFooterComponent, {}))
              ]
            }
          );
        }
      }
      const items = data || [];
      const renderList = () => {
        return items.map((item, index) => {
          const key = keyExtractor ? keyExtractor(item, index) : index.toString();
          return /* @__PURE__ */ jsx9(React11.Fragment, { children: renderItem({ item, index }) }, key);
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
            ListHeaderComponent && (React11.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx9(ListHeaderComponent, {})),
            renderList(),
            ListFooterComponent && (React11.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx9(ListFooterComponent, {}))
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
var flat_list_default = FlatList;

// node_modules/indjs/src/components/touchable-opacity.jsx
import React12, { forwardRef as forwardRef10 } from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var TouchableOpacity = forwardRef10(
  ({ children, style, onPress, activeOpacity = 0.2, className, ...rest }, ref) => {
    const Component = resolveElement("touchableopacity");
    if (Component === "button" || Component === "div") {
      return /* @__PURE__ */ jsx10(
        "button",
        {
          ref,
          style: style_sheet_default.flatten([
            { cursor: "pointer", background: "none", border: "none", padding: 0, textAlign: "left", font: "inherit", display: "flex", flexDirection: "column", transition: "opacity 0.15s ease" },
            style
          ]),
          onClick: onPress,
          className: className || "",
          type: "button",
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
        className: className || "",
        ...rest,
        children
      }
    );
  }
);
TouchableOpacity.displayName = "TouchableOpacity";

// node_modules/indjs/src/components/pressable.jsx
import React13, { forwardRef as forwardRef11 } from "react";
import { jsx as jsx11 } from "react/jsx-runtime";
var Pressable = forwardRef11(({ children, style, onPress, className, ...rest }, ref) => {
  const Component = resolveElement("pressable");
  if (Component === "button" || Component === "div") {
    const flatStyle = style_sheet_default.flatten([
      { cursor: "pointer", background: "none", border: "none", padding: 0, textAlign: "left", font: "inherit", display: "flex", flexDirection: "column" },
      typeof style === "function" ? style({ pressed: false }) : style
    ]);
    return /* @__PURE__ */ jsx11(
      "button",
      {
        ref,
        style: flatStyle,
        onClick: onPress,
        className: className || "",
        type: "button",
        ...rest,
        children: typeof children === "function" ? children({ pressed: false }) : children
      }
    );
  }
  return /* @__PURE__ */ jsx11(Component, { ref, style, onPress, className: className || "", ...rest, children });
});
Pressable.displayName = "Pressable";
var pressable_default = Pressable;

// node_modules/indjs/src/components/image-background.jsx
import React14, { forwardRef as forwardRef12 } from "react";
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
import React15, { forwardRef as forwardRef13 } from "react";
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
import React16, { forwardRef as forwardRef14 } from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var SafeAreaView = forwardRef14(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("safeareaview");
  if (Component === "div" || Component === "view") {
    const flatStyle = style_sheet_default.flatten([
      {
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        flex: 1
      },
      style
    ]);
    return /* @__PURE__ */ jsx14("div", { ref, style: flatStyle, className: className || "", ...rest, children });
  }
  return /* @__PURE__ */ jsx14(Component, { ref, style, className: className || "", ...rest, children });
});
SafeAreaView.displayName = "SafeAreaView";

// node_modules/indjs/src/components/status-bar.jsx
import React17 from "react";

// node_modules/indjs/src/components/section-list.jsx
import React18, { forwardRef as forwardRef15 } from "react";
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
          return /* @__PURE__ */ jsxs2(React18.Fragment, { children: [
            renderSectionHeader && renderSectionHeader({ section }),
            data.map((item, itemIndex) => {
              const itemKey = keyExtractor ? keyExtractor(item, itemIndex) : item.key || item.id || key + "-" + itemIndex;
              return /* @__PURE__ */ jsx15(React18.Fragment, { children: renderItem({ item, index: itemIndex, section }) }, itemKey);
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
            ListHeaderComponent && (React18.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx15(ListHeaderComponent, {})),
            renderSections(),
            ListFooterComponent && (React18.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx15(ListFooterComponent, {}))
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
import React19, { forwardRef as forwardRef16 } from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var KeyboardAvoidingView = forwardRef16(
  ({
    children,
    style,
    behavior,
    contentContainerStyle,
    keyboardVerticalOffset,
    enabled,
    className,
    ...rest
  }, ref) => {
    const Component = resolveElement("keyboardavoidingview");
    if (Component === "div" || Component === "view") {
      return /* @__PURE__ */ jsx16(
        "div",
        {
          ref,
          style: style_sheet_default.flatten([{ flex: 1 }, style]),
          className: className || "",
          ...rest,
          children
        }
      );
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
        className: className || "",
        ...rest,
        children
      }
    );
  }
);
KeyboardAvoidingView.displayName = "KeyboardAvoidingView";

// node_modules/indjs/src/components/refresh-control.jsx
import React20, { forwardRef as forwardRef17 } from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
var RefreshControl = forwardRef17(({ refreshing, onRefresh, className, ...rest }, ref) => {
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
      className: className || "",
      ...rest
    }
  );
});
RefreshControl.displayName = "RefreshControl";

// node_modules/indjs/src/components/touchable-highlight.jsx
import React21, { forwardRef as forwardRef18 } from "react";
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
import React22, { cloneElement, Children } from "react";

// node_modules/indjs/src/components/screen.jsx
import React23, { forwardRef as forwardRef19 } from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var Screen = forwardRef19(({ children, background = "light", className = "", style, ...props }, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx19(view_default, { ref, className: finalClass, style, ...props, children });
});
Screen.displayName = "Screen";

// node_modules/indjs/src/components/container.jsx
import React24, { forwardRef as forwardRef20 } from "react";
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
import React25, { forwardRef as forwardRef21 } from "react";
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
import React26, { forwardRef as forwardRef22 } from "react";
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
import React27, { forwardRef as forwardRef23 } from "react";
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
import React28, { forwardRef as forwardRef24 } from "react";
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

// pages/about.jsx
import { jsx as jsx25, jsxs as jsxs3 } from "react/jsx-runtime";
function About() {
  const features = [
    {
      icon: "\u2728",
      title: "Beautiful Design",
      description: "Modern, premium UI with smooth animations and gradients"
    },
    {
      icon: "\u{1F4F1}",
      title: "Mobile First",
      description: "Optimized for mobile devices with responsive design"
    },
    {
      icon: "\u26A1",
      title: "Fast & Efficient",
      description: "Built with React and Redux for optimal performance"
    },
    {
      icon: "\u{1F3AF}",
      title: "Task Priority",
      description: "Organize tasks by priority levels and categories"
    },
    {
      icon: "\u{1F4C5}",
      title: "Due Dates",
      description: "Set deadlines and never miss important tasks"
    },
    {
      icon: "\u{1F504}",
      title: "Real-time Updates",
      description: "Instant state management with Redux Toolkit"
    }
  ];
  const techStack = [
    { name: "INDJS", desc: "Universal Framework" },
    { name: "React 18", desc: "UI Library" },
    { name: "Redux Toolkit", desc: "State Management" },
    { name: "Tailwind CSS", desc: "Styling" }
  ];
  const renderFeature = ({ item, index }) => /* @__PURE__ */ jsxs3(
    view_default,
    {
      className: "bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
      children: [
        /* @__PURE__ */ jsx25(text_default, { className: "text-4xl mb-4", children: item.icon }),
        /* @__PURE__ */ jsx25(text_default, { className: "text-xl font-bold text-gray-800 mb-2", children: item.title }),
        /* @__PURE__ */ jsx25(text_default, { className: "text-gray-600", children: item.description })
      ]
    },
    index
  );
  const renderTech = ({ item, index }) => /* @__PURE__ */ jsxs3(view_default, { className: "text-center p-4 rounded-xl bg-gradient-to-br from-violet-50 to-fuchsia-50", children: [
    /* @__PURE__ */ jsx25(text_default, { className: "font-bold text-lg text-gray-800 mb-1", children: item.name }),
    /* @__PURE__ */ jsx25(text_default, { className: "text-sm text-gray-600", children: item.desc })
  ] }, index);
  return /* @__PURE__ */ jsx25(scroll_view_default, { className: "flex-1", children: /* @__PURE__ */ jsxs3(view_default, { className: "max-w-6xl mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs3(view_default, { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx25(view_default, { className: "inline-block mb-6", children: /* @__PURE__ */ jsx25(view_default, { className: "w-24 h-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto", children: /* @__PURE__ */ jsx25("svg", { className: "w-14 h-14 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx25("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" }) }) }) }),
      /* @__PURE__ */ jsx25(text_default, { className: "text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent", children: "TaskFlow" }),
      /* @__PURE__ */ jsx25(text_default, { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "A simple yet powerful task management app built with the INDJS framework" })
    ] }),
    /* @__PURE__ */ jsx25(view_default, { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16", children: /* @__PURE__ */ jsx25(
      flat_list_default,
      {
        data: features,
        renderItem: renderFeature,
        keyExtractor: (item, index) => index.toString(),
        numColumns: 3,
        contentContainerStyle: { gap: 24 }
      }
    ) }),
    /* @__PURE__ */ jsxs3(view_default, { className: "bg-white rounded-3xl p-8 shadow-xl mb-16", children: [
      /* @__PURE__ */ jsx25(text_default, { className: "text-3xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent", children: "Built With" }),
      /* @__PURE__ */ jsx25(view_default, { className: "grid md:grid-cols-4 gap-6", children: /* @__PURE__ */ jsx25(
        flat_list_default,
        {
          data: techStack,
          renderItem: renderTech,
          keyExtractor: (item, index) => index.toString(),
          numColumns: 4,
          contentContainerStyle: { gap: 24 }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx25(view_default, { className: "text-center", children: /* @__PURE__ */ jsxs3(view_default, { className: "bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl p-12 shadow-2xl", children: [
      /* @__PURE__ */ jsx25(text_default, { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: "Ready to Get Organized?" }),
      /* @__PURE__ */ jsx25(text_default, { className: "text-white text-opacity-90 mb-8 text-lg", children: "Start managing your tasks efficiently today" }),
      /* @__PURE__ */ jsx25(
        pressable_default,
        {
          onPress: () => window.location.href = "/",
          className: "inline-block px-8 py-4 bg-white text-violet-600 font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300",
          children: /* @__PURE__ */ jsx25(text_default, { className: "text-violet-600 font-bold", children: "Go to Tasks" })
        }
      )
    ] }) })
  ] }) });
}
export {
  About as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvYWJvdXQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvcm91dGluZy9yb3V0ZXIubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvcGxhdGZvcm0ubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pbWFnZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy91bml2ZXJzYWwvcmVzb2x2ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvc3R5bGUtc2hlZXQubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9saW5rLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JvbGwtdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQtaW5wdXQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9idXR0b24uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS1pbmRpY2F0b3IuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zd2l0Y2guanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9mbGF0LWxpc3QuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtb3BhY2l0eS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3ByZXNzYWJsZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLWJhY2tncm91bmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9tb2RhbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NhZmUtYXJlYS12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhdHVzLWJhci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NlY3Rpb24tbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2tleWJvYXJkLWF2b2lkaW5nLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9yZWZyZXNoLWNvbnRyb2wuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtaGlnaGxpZ2h0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdG91Y2hhYmxlLXdpdGhvdXQtZmVlZGJhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JlZW4uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jb250YWluZXIuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jYXJkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvZ3JpZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N0YWNrLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaWNvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2RpbWVuc2lvbnMubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9saW5raW5nLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgVmlldywgVGV4dCwgU2Nyb2xsVmlldywgUHJlc3NhYmxlLCBGbGF0TGlzdCB9IGZyb20gJ2luZGpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFib3V0KCkge1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpY29uOiAnXHUyNzI4JyxcclxuICAgICAgICAgICAgdGl0bGU6ICdCZWF1dGlmdWwgRGVzaWduJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdNb2Rlcm4sIHByZW1pdW0gVUkgd2l0aCBzbW9vdGggYW5pbWF0aW9ucyBhbmQgZ3JhZGllbnRzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpY29uOiAnXHVEODNEXHVEQ0YxJyxcclxuICAgICAgICAgICAgdGl0bGU6ICdNb2JpbGUgRmlyc3QnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ09wdGltaXplZCBmb3IgbW9iaWxlIGRldmljZXMgd2l0aCByZXNwb25zaXZlIGRlc2lnbidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbjogJ1x1MjZBMScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnRmFzdCAmIEVmZmljaWVudCcsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQnVpbHQgd2l0aCBSZWFjdCBhbmQgUmVkdXggZm9yIG9wdGltYWwgcGVyZm9ybWFuY2UnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGljb246ICdcdUQ4M0NcdURGQUYnLFxyXG4gICAgICAgICAgICB0aXRsZTogJ1Rhc2sgUHJpb3JpdHknLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ09yZ2FuaXplIHRhc2tzIGJ5IHByaW9yaXR5IGxldmVscyBhbmQgY2F0ZWdvcmllcydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbjogJ1x1RDgzRFx1RENDNScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnRHVlIERhdGVzJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXQgZGVhZGxpbmVzIGFuZCBuZXZlciBtaXNzIGltcG9ydGFudCB0YXNrcydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbjogJ1x1RDgzRFx1REQwNCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnUmVhbC10aW1lIFVwZGF0ZXMnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0luc3RhbnQgc3RhdGUgbWFuYWdlbWVudCB3aXRoIFJlZHV4IFRvb2xraXQnXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCB0ZWNoU3RhY2sgPSBbXHJcbiAgICAgICAgeyBuYW1lOiAnSU5ESlMnLCBkZXNjOiAnVW5pdmVyc2FsIEZyYW1ld29yaycgfSxcclxuICAgICAgICB7IG5hbWU6ICdSZWFjdCAxOCcsIGRlc2M6ICdVSSBMaWJyYXJ5JyB9LFxyXG4gICAgICAgIHsgbmFtZTogJ1JlZHV4IFRvb2xraXQnLCBkZXNjOiAnU3RhdGUgTWFuYWdlbWVudCcgfSxcclxuICAgICAgICB7IG5hbWU6ICdUYWlsd2luZCBDU1MnLCBkZXNjOiAnU3R5bGluZycgfVxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCByZW5kZXJGZWF0dXJlID0gKHsgaXRlbSwgaW5kZXggfSkgPT4gKFxyXG4gICAgICAgIDxWaWV3XHJcbiAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNiBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCB0cmFuc2Zvcm0gaG92ZXI6LXRyYW5zbGF0ZS15LTFcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC00eGwgbWItNFwiPntpdGVtLmljb259PC9UZXh0PlxyXG4gICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTJcIj57aXRlbS50aXRsZX08L1RleHQ+XHJcbiAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDBcIj57aXRlbS5kZXNjcmlwdGlvbn08L1RleHQ+XHJcbiAgICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCByZW5kZXJUZWNoID0gKHsgaXRlbSwgaW5kZXggfSkgPT4gKFxyXG4gICAgICAgIDxWaWV3IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHAtNCByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tdmlvbGV0LTUwIHRvLWZ1Y2hzaWEtNTBcIj5cclxuICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtbGcgdGV4dC1ncmF5LTgwMCBtYi0xXCI+e2l0ZW0ubmFtZX08L1RleHQ+XHJcbiAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMFwiPntpdGVtLmRlc2N9PC9UZXh0PlxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8U2Nyb2xsVmlldyBjbGFzc05hbWU9XCJmbGV4LTFcIj5cclxuICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwibWF4LXctNnhsIG14LWF1dG8gcHgtNCBweS0xMlwiPlxyXG4gICAgICAgICAgICAgICAgey8qIEhlcm8gU2VjdGlvbiAqL31cclxuICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1iLTE2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrIG1iLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwidy0yNCBoLTI0IGJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIHJvdW5kZWQtM3hsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy0yeGwgbXgtYXV0b1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTE0IGgtMTQgdGV4dC13aGl0ZVwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17Mn0gZD1cIk05IDVIN2EyIDIgMCAwMC0yIDJ2MTJhMiAyIDAgMDAyIDJoMTBhMiAyIDAgMDAyLTJWN2EyIDIgMCAwMC0yLTJoLTJNOSA1YTIgMiAwIDAwMiAyaDJhMiAyIDAgMDAyLTJNOSA1YTIgMiAwIDAxMi0yaDJhMiAyIDAgMDEyIDJtLTYgOWwyIDIgNC00XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtNXhsIG1kOnRleHQtNnhsIGZvbnQtYm9sZCBtYi00IGJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRhc2tGbG93XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteGwgdGV4dC1ncmF5LTYwMCBtYXgtdy0yeGwgbXgtYXV0b1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBIHNpbXBsZSB5ZXQgcG93ZXJmdWwgdGFzayBtYW5hZ2VtZW50IGFwcCBidWlsdCB3aXRoIHRoZSBJTkRKUyBmcmFtZXdvcmtcclxuICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIEZlYXR1cmVzIEdyaWQgKi99XHJcbiAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJncmlkIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02IG1iLTE2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZsYXRMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2ZlYXR1cmVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJJdGVtPXtyZW5kZXJGZWF0dXJlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlFeHRyYWN0b3I9eyhpdGVtLCBpbmRleCkgPT4gaW5kZXgudG9TdHJpbmcoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtQ29sdW1ucz17M31cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXt7IGdhcDogMjQgfX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBUZWNoIFN0YWNrICovfVxyXG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0zeGwgcC04IHNoYWRvdy14bCBtYi0xNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWNlbnRlciBtYi04IGJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJ1aWx0IFdpdGhcclxuICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZ3JpZCBtZDpncmlkLWNvbHMtNCBnYXAtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RmxhdExpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RlY2hTdGFja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckl0ZW09e3JlbmRlclRlY2h9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlFeHRyYWN0b3I9eyhpdGVtLCBpbmRleCkgPT4gaW5kZXgudG9TdHJpbmcoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bUNvbHVtbnM9ezR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e3sgZ2FwOiAyNCB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgIDwvVmlldz5cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogQ1RBIFNlY3Rpb24gKi99XHJcbiAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIHJvdW5kZWQtM3hsIHAtMTIgc2hhZG93LTJ4bFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBtZDp0ZXh0LTR4bCBmb250LWJvbGQgdGV4dC13aGl0ZSBtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFkeSB0byBHZXQgT3JnYW5pemVkP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgdGV4dC1vcGFjaXR5LTkwIG1iLTggdGV4dC1sZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RhcnQgbWFuYWdpbmcgeW91ciB0YXNrcyBlZmZpY2llbnRseSB0b2RheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcmVzc2FibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy8nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrIHB4LTggcHktNCBiZy13aGl0ZSB0ZXh0LXZpb2xldC02MDAgZm9udC1ib2xkIHJvdW5kZWQteGwgaG92ZXI6c2hhZG93LTJ4bCB0cmFuc2Zvcm0gaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtdmlvbGV0LTYwMCBmb250LWJvbGRcIj5HbyB0byBUYXNrczwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9QcmVzc2FibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgPC9TY3JvbGxWaWV3PlxyXG4gICAgKTtcclxufSIsICIvKipcbiAqIHVzZVJvdXRlcigpXG4gKlxuICogTWluaW1hbCByb3V0ZXIgaG9vayBpbnNwaXJlZCBieSBOZXh0LmpzLlxuICogUHJvdmlkZXMgcGF0aG5hbWUsIHF1ZXJ5LCBhc1BhdGggYW5kIG5hdmlnYXRpb24gaGVscGVycy5cbiAqXG4gKiBBUEk6XG4gKiAtIHBhdGhuYW1lOiBzdHJpbmdcbiAqIC0gcXVlcnk6IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPlxuICogLSBhc1BhdGg6IHN0cmluZ1xuICogLSBwdXNoKHVybDogc3RyaW5nKTogdm9pZFxuICogLSByZXBsYWNlKHVybDogc3RyaW5nKTogdm9pZFxuICogLSBiYWNrKCk6IHZvaWRcbiAqIC0gcmVsb2FkKCk6IHZvaWRcbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBNaW5pbWFsIFJvdXRlciB1dGlsaXRpZXMgaW5zcGlyZWQgYnkgTmV4dC5qcyB1c2VSb3V0ZXJcbi8vIFByb3ZpZGVzOiB1c2VSb3V0ZXIoKSB3aXRoIHB1c2gsIHJlcGxhY2UsIHBhdGhuYW1lLCBzZWFyY2gsIGhhc2ggYW5kIHF1ZXJ5XG5cbmZ1bmN0aW9uIHBhcnNlUXVlcnkoc2VhcmNoKSB7XG4gIGNvbnN0IHEgPSB7fTtcbiAgY29uc3QgdXNwID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhzZWFyY2ggfHwgXCJcIik7XG4gIGZvciAoY29uc3QgW2ssIHZdIG9mIHVzcC5lbnRyaWVzKCkpIHtcbiAgICBpZiAocVtrXSA9PT0gdW5kZWZpbmVkKSBxW2tdID0gdjtcbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHFba10pKSBxW2tdLnB1c2godik7XG4gICAgZWxzZSBxW2tdID0gW3Fba10sIHZdO1xuICB9XG4gIHJldHVybiBxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IFJlYWN0LnVzZVN0YXRlKCgpID0+ICh7XG4gICAgcGF0aG5hbWU6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgOiBcIi9cIixcbiAgICBzZWFyY2g6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cubG9jYXRpb24uc2VhcmNoIDogXCJcIixcbiAgICBoYXNoOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLmhhc2ggOiBcIlwiLFxuICB9KSk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBmdW5jdGlvbiBvblBvcCgpIHtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgcGF0aG5hbWU6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgc2VhcmNoOiB3aW5kb3cubG9jYXRpb24uc2VhcmNoLFxuICAgICAgICBoYXNoOiB3aW5kb3cubG9jYXRpb24uaGFzaCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIG9uUG9wKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBvblBvcCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBocmVmRnJvbSA9ICh1cmwpID0+ICh0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiID8gdXJsIDogU3RyaW5nKHVybCB8fCBcIlwiKSk7XG5cbiAgY29uc3QgbmF2aWdhdGUgPSBSZWFjdC51c2VDYWxsYmFjaygodXJsLCB7IHJlcGxhY2UgPSBmYWxzZSB9ID0ge30pID0+IHtcbiAgICBjb25zdCBiYXNlID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICBsZXQgdTtcbiAgICB0cnkge1xuICAgICAgdSA9IG5ldyBVUkwoaHJlZkZyb20odXJsKSwgYmFzZSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHQgPSB1LnBhdGhuYW1lICsgdS5zZWFyY2ggKyB1Lmhhc2g7XG4gICAgaWYgKHJlcGxhY2UpIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XG4gICAgZWxzZSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICAgIHRyeSB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwiaW5kOm5hdmlnYXRlXCIsIHsgZGV0YWlsOiB7IGhyZWY6IG5leHQgfSB9KSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCB7fVxuICAgIHNldFN0YXRlKHsgcGF0aG5hbWU6IHUucGF0aG5hbWUsIHNlYXJjaDogdS5zZWFyY2gsIGhhc2g6IHUuaGFzaCB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHB1c2ggPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAodXJsKSA9PiBuYXZpZ2F0ZSh1cmwsIHsgcmVwbGFjZTogZmFsc2UgfSksXG4gICAgW25hdmlnYXRlXSxcbiAgKTtcbiAgY29uc3QgcmVwID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKHVybCkgPT4gbmF2aWdhdGUodXJsLCB7IHJlcGxhY2U6IHRydWUgfSksXG4gICAgW25hdmlnYXRlXSxcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIHBhdGhuYW1lOiBzdGF0ZS5wYXRobmFtZSxcbiAgICBxdWVyeTogcGFyc2VRdWVyeShzdGF0ZS5zZWFyY2gpLFxuICAgIGFzUGF0aDogc3RhdGUucGF0aG5hbWUgKyBzdGF0ZS5zZWFyY2ggKyBzdGF0ZS5oYXNoLFxuICAgIHB1c2gsXG4gICAgcmVwbGFjZTogcmVwLFxuICAgIGJhY2s6ICgpID0+IHdpbmRvdy5oaXN0b3J5LmJhY2soKSxcbiAgICByZWxvYWQ6ICgpID0+IHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IFJvdXRlciA9IHsgdXNlUm91dGVyIH07XG4iLCAiLyoqXG4gKiBQbGF0Zm9ybSBkZXRlY3Rpb24gdXRpbGl0aWVzIGZvciBJTkRKU1xuICpcbiAqIFVzYWdlOlxuICogaW1wb3J0IHsgaXNXZWIsIGlzRGVza3RvcCwgaXNNb2JpbGUsIGlzQW5kcm9pZCwgaXNJT1MsIHBsYXRmb3JtIH0gZnJvbSAnaW5kanMnO1xuICpcbiAqIGlmIChpc01vYmlsZSkgeyAuLi4gfVxuICovXG5cbi8vIENoZWNrIGlmIHJ1bm5pbmcgaW4gYSBicm93c2VyIGVudmlyb25tZW50XG5jb25zdCBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xuXG4vLyBFbGVjdHJvbiBkZXRlY3Rpb24gKHJlbmRlcmVyIHByb2Nlc3MpXG5leHBvcnQgY29uc3QgaXNEZXNrdG9wID1cbiAgaXNCcm93c2VyICYmXG4gICh3aW5kb3cucHJvY2Vzcz8udHlwZSA9PT0gXCJyZW5kZXJlclwiIHx8XG4gICAgISF3aW5kb3cuZWxlY3Ryb24gfHxcbiAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiRWxlY3Ryb25cIikpO1xuXG4vLyBDYXBhY2l0b3IgZGV0ZWN0aW9uXG5leHBvcnQgY29uc3QgaXNNb2JpbGUgPVxuICBpc0Jyb3dzZXIgJiZcbiAgKCEhd2luZG93LkNhcGFjaXRvciB8fFxuICAgICEhd2luZG93LmFuZHJvaWRCcmlkZ2UgfHxcbiAgICAhIXdpbmRvdy53ZWJraXQ/Lm1lc3NhZ2VIYW5kbGVycz8uYnJpZGdlIHx8XG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkNhcGFjaXRvclwiKSk7XG5cbi8vIFNwZWNpZmljIG1vYmlsZSBwbGF0Zm9ybXNcbmV4cG9ydCBjb25zdCBpc0FuZHJvaWQgPSBpc01vYmlsZSAmJiAvYW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5leHBvcnQgY29uc3QgaXNJT1MgPSBpc01vYmlsZSAmJiAvaXBob25lfGlwYWR8aXBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbi8vIFdlYiBmYWxsYmFjayAoaWYgbm90IGRlc2t0b3Agb3IgbW9iaWxlIGFwcClcbmV4cG9ydCBjb25zdCBpc1dlYiA9ICFpc0Rlc2t0b3AgJiYgIWlzTW9iaWxlO1xuXG4vLyBHZXQgY3VycmVudCBwbGF0Zm9ybSBuYW1lXG5leHBvcnQgY29uc3QgcGxhdGZvcm0gPSAoKCkgPT4ge1xuICBpZiAoaXNEZXNrdG9wKSByZXR1cm4gXCJkZXNrdG9wXCI7XG4gIGlmIChpc0FuZHJvaWQpIHJldHVybiBcImFuZHJvaWRcIjtcbiAgaWYgKGlzSU9TKSByZXR1cm4gXCJpb3NcIjtcbiAgaWYgKGlzTW9iaWxlKSByZXR1cm4gXCJtb2JpbGVcIjsgLy8gZmFsbGJhY2tcbiAgcmV0dXJuIFwid2ViXCI7XG59KSgpO1xuXG4vLyBSZWFjdCBOYXRpdmUgY29tcGF0aWJsZSBBUElcbmV4cG9ydCBjb25zdCBPUyA9IHBsYXRmb3JtO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0ID0gKG9iaikgPT4ge1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KE9TKSkgcmV0dXJuIG9ialtPU107XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoXCJuYXRpdmVcIikgJiYgaXNNb2JpbGUpIHJldHVybiBvYmpbXCJuYXRpdmVcIl07XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoXCJkZWZhdWx0XCIpKSByZXR1cm4gb2JqW1wiZGVmYXVsdFwiXTtcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNXZWIsXG4gIGlzRGVza3RvcCxcbiAgaXNNb2JpbGUsXG4gIGlzQW5kcm9pZCxcbiAgaXNJT1MsXG4gIHBsYXRmb3JtLFxuICBPUyxcbiAgc2VsZWN0LFxufTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBJbWFnZSA9IGZvcndhcmRSZWYoKHsgc3R5bGUsIHNvdXJjZSwgc3JjLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImltYWdlXCIpO1xuXG4gIC8vIFJlYWN0IE5hdGl2ZSB1c2VzICdzb3VyY2UnLCBXZWIgdXNlcyAnc3JjJy5cbiAgLy8gV2Ugc3VwcG9ydCBib3RoIHByb3BzIGZvciB1bml2ZXJzYWwgdXNhZ2UuXG4gIGNvbnN0IGltYWdlU291cmNlID0gc3JjIHx8IChzb3VyY2UgJiYgc291cmNlLnVyaSkgfHwgXCJcIjtcblxuICBjb25zdCBwcm9wcyA9IHtcbiAgICAuLi5yZXN0LFxuICAgIHNyYzogaW1hZ2VTb3VyY2UsXG4gICAgcmVmLFxuICB9O1xuXG4gIGlmIChDb21wb25lbnQgIT09IFwiaW1nXCIgJiYgQ29tcG9uZW50ICE9PSBcImltYWdlXCIpIHtcbiAgICAvLyBJZiBpdCByZWZlcnMgdG8gUmVhY3QgTmF0aXZlIEltYWdlLCBpdCBleHBlY3RzICdzb3VyY2UnXG4gICAgcHJvcHMuc291cmNlID0gc291cmNlIHx8IHsgdXJpOiBzcmMgfTtcbiAgICBkZWxldGUgcHJvcHMuc3JjO1xuICB9XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiA8Q29tcG9uZW50IHN0eWxlPXtmbGF0U3R5bGV9IHsuLi5wcm9wc30gLz47XG59KTtcblxuSW1hZ2UuZGlzcGxheU5hbWUgPSBcIkltYWdlXCI7XG5leHBvcnQgZGVmYXVsdCBJbWFnZTtcbiIsICJmdW5jdGlvbiBjYXBpdGFsaXplKHN0cikge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUVsZW1lbnQodHlwZSkge1xuICBjb25zdCBwbGF0Zm9ybSA9IHR5cGVvZiBQTEFURk9STSAhPT0gXCJ1bmRlZmluZWRcIiA/IFBMQVRGT1JNIDogXCJ3ZWJcIjtcblxuICBpZiAocGxhdGZvcm0gPT09IFwid2ViXCIpIHtcbiAgICBjb25zdCB3ZWJNYXAgPSB7XG4gICAgICB2aWV3OiBcImRpdlwiLFxuICAgICAgdGV4dDogXCJzcGFuXCIsXG4gICAgICBpbWFnZTogXCJpbWdcIixcbiAgICAgIGltYWdlYmFja2dyb3VuZDogXCJkaXZcIiwgLy8gbWFwIGltYWdlLWJhY2tncm91bmQgdG8gZGl2IHdpdGggc3R5bGVcbiAgICAgIHNjcm9sbHZpZXc6IFwiZGl2XCIsXG4gICAgICBmbGF0bGlzdDogXCJkaXZcIixcbiAgICAgIHNlY3Rpb25saXN0OiBcImRpdlwiLFxuICAgICAga2V5Ym9hcmRhdm9pZGluZ3ZpZXc6IFwiZGl2XCIsXG4gICAgICBzYWZlYXJlYXZpZXc6IFwiZGl2XCIsXG4gICAgICBwcmVzc2FibGU6IFwiYnV0dG9uXCIsXG4gICAgICB0b3VjaGFibGVvcGFjaXR5OiBcImJ1dHRvblwiLFxuICAgICAgdG91Y2hhYmxlaGlnaGxpZ2h0OiBcImJ1dHRvblwiLFxuICAgICAgc3dpdGNoOiBcImlucHV0XCIsIC8vIHR5cGU9J2NoZWNrYm94J1xuICAgICAgdGV4dGFyZWE6IFwidGV4dGFyZWFcIixcbiAgICAgIGJ1dHRvbjogXCJidXR0b25cIixcbiAgICAgIG1vZGFsOiBcImRpdlwiLFxuICAgICAgYWN0aXZpdHlpbmRpY2F0b3I6IFwiZGl2XCIsXG4gICAgICByZWZyZXNoY29udHJvbDogXCJkaXZcIixcbiAgICB9O1xuICAgIHJldHVybiB3ZWJNYXBbdHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0vZywgXCJcIildIHx8IFwiZGl2XCI7XG4gIH1cblxuICBpZiAocGxhdGZvcm0gPT09IFwibW9iaWxlXCIpIHtcbiAgICAvLyBJbiBSZWFjdCBOYXRpdmUsIGNvbXBvbmVudHMgYXJlIENhbWVsQ2FzZVxuICAgIC8vIFdlIG5lZWQgdG8gbWFwIGdlbmVyaWMgbmFtZXMgdG8gUk4gbmFtZXNcbiAgICBjb25zdCBtb2JpbGVNYXAgPSB7XG4gICAgICB2aWV3OiBcIlZpZXdcIixcbiAgICAgIHRleHQ6IFwiVGV4dFwiLFxuICAgICAgaW1hZ2U6IFwiSW1hZ2VcIixcbiAgICAgIGltYWdlYmFja2dyb3VuZDogXCJJbWFnZUJhY2tncm91bmRcIixcbiAgICAgIHNjcm9sbHZpZXc6IFwiU2Nyb2xsVmlld1wiLFxuICAgICAgZmxhdGxpc3Q6IFwiRmxhdExpc3RcIixcbiAgICAgIHNlY3Rpb25saXN0OiBcIlNlY3Rpb25MaXN0XCIsXG4gICAgICBrZXlib2FyZGF2b2lkaW5ndmlldzogXCJLZXlib2FyZEF2b2lkaW5nVmlld1wiLFxuICAgICAgc2FmZWFyZWF2aWV3OiBcIlNhZmVBcmVhVmlld1wiLFxuICAgICAgcHJlc3NhYmxlOiBcIlByZXNzYWJsZVwiLFxuICAgICAgdG91Y2hhYmxlb3BhY2l0eTogXCJUb3VjaGFibGVPcGFjaXR5XCIsXG4gICAgICB0b3VjaGFibGVoaWdobGlnaHQ6IFwiVG91Y2hhYmxlSGlnaGxpZ2h0XCIsXG4gICAgICBzd2l0Y2g6IFwiU3dpdGNoXCIsXG4gICAgICBtb2RhbDogXCJNb2RhbFwiLFxuICAgICAgYWN0aXZpdHlpbmRpY2F0b3I6IFwiQWN0aXZpdHlJbmRpY2F0b3JcIixcbiAgICAgIHJlZnJlc2hjb250cm9sOiBcIlJlZnJlc2hDb250cm9sXCIsXG4gICAgICBidXR0b246IFwiQnV0dG9uXCIsXG4gICAgfTtcbiAgICBjb25zdCBybk5hbWUgPVxuICAgICAgbW9iaWxlTWFwW3R5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tL2csIFwiXCIpXSB8fCBjYXBpdGFsaXplKHR5cGUpO1xuXG4gICAgLy8gU2FmZXR5IGNoZWNrIGZvciBSZWFjdCBOYXRpdmUgZW52aXJvbm1lbnRcbiAgICAvLyByZWFjdC1uYXRpdmUtd2ViIG1pZ2h0IGJlIGFsaWFzZWQsIG9yIHdlIG1pZ2h0IGJlIGluIGEgcmVhbCBSTiBlbnZpcm9ubWVudFxuICAgIHRyeSB7XG4gICAgICAvLyBVc2luZyBnbG9iYWwgY2hlY2sgb3Igc2FmZSByZXF1aXJlXG4gICAgICBpZiAodHlwZW9mIHJlcXVpcmUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoXCJyZWFjdC1uYXRpdmVcIilbcm5OYW1lXTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgd2luZG93LlJlYWN0ICYmXG4gICAgICAgIHdpbmRvdy5SZWFjdC5OYXRpdmVcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gd2luZG93LlJlYWN0Lk5hdGl2ZVtybk5hbWVdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihgUmVhY3QgTmF0aXZlIGNvbXBvbmVudCAke3JuTmFtZX0gbm90IGZvdW5kYCk7XG4gICAgfVxuICAgIC8vIEZhbGxiYWNrIHRvIFZpZXcgb3IgZGl2IGRlcGVuZGluZyBvbiBjb250ZXh0LCBidXQgVmlldyBpcyBzYWZlIGVub3VnaCBmb3IgbG9naWNhbCByZXR1cm4gaWYgbW9ja2VkXG4gICAgcmV0dXJuIFwiVmlld1wiO1xuICB9XG5cbiAgcmV0dXJuIFwiZGl2XCI7XG59XG4iLCAiLy8gTW9jayBTdHlsZVNoZWV0IGZvciBjb21wYXRpYmlsaXR5LlxuLy8gSW4gSU5ESlMgd2ViLCB3ZSB1c3VhbGx5IHVzZSBzdGFuZGFyZCBzdHlsZSBvYmplY3RzIG9yIENTUy5cbi8vIFRoaXMgYWxsb3dzIFN0eWxlU2hlZXQuY3JlYXRlKHt9KSB0byByZXR1cm4gdGhlIG9iamVjdHMgYXMtaXMuXG5cbmV4cG9ydCBjb25zdCBTdHlsZVNoZWV0ID0ge1xuICBjcmVhdGU6IChzdHlsZXMpID0+IHN0eWxlcyxcbiAgZmxhdHRlbjogKHN0eWxlcykgPT4ge1xuICAgIGlmICghc3R5bGVzKSByZXR1cm4ge307XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3R5bGVzKSkge1xuICAgICAgcmV0dXJuIHN0eWxlc1xuICAgICAgICAuZmxhdChJbmZpbml0eSlcbiAgICAgICAgLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiAoaXRlbSA/IHsgLi4uYWNjLCAuLi5pdGVtIH0gOiBhY2MpLCB7fSk7XG4gICAgfVxuICAgIHJldHVybiBzdHlsZXM7XG4gIH0sXG4gIGhhaXJsaW5lV2lkdGg6IDEsXG4gIGFic29sdXRlRmlsbDoge1xuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogMCxcbiAgICB0b3A6IDAsXG4gICAgYm90dG9tOiAwLFxuICB9LFxuICBhYnNvbHV0ZUZpbGxPYmplY3Q6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIGJvdHRvbTogMCxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0eWxlU2hlZXQ7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBJTkRKUyBMaW5rIGNvbXBvbmVudCAtIGxpZ2h0d2VpZ2h0IGNsaWVudC1zaWRlIG5hdmlnYXRpb24gaGVscGVyXG4vLyBQZXJmb3JtcyBTUEEtbGlrZSBuYXZpZ2F0aW9uIGZvciBzYW1lLW9yaWdpbiBpbnRlcm5hbCBsaW5rcy5cbi8vIFByb3BzOiBocmVmLCBwcmVmZXRjaCwgcmVwbGFjZSwgc2Nyb2xsIChkZWZhdWx0IHRydWUpLCBvbkNsaWNrLCB0YXJnZXQsIHJlbCwgY2xhc3NOYW1lLCBzdHlsZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGluayh7XG4gIGhyZWYsXG4gIGNoaWxkcmVuLFxuICBwcmVmZXRjaCA9IGZhbHNlLFxuICByZXBsYWNlID0gZmFsc2UsXG4gIHNjcm9sbCA9IHRydWUsXG4gIG9uQ2xpY2ssXG4gIGNsYXNzTmFtZSxcbiAgc3R5bGUsXG4gIHRhcmdldCxcbiAgcmVsLFxuICAuLi5yZXN0XG59KSB7XG4gIC8vIEJhc2ljIHByZWZldGNoOiBoaW50IHRoZSBicm93c2VyIHZpYSA8bGluayByZWw9XCJwcmVmZXRjaFwiPlxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcHJlZmV0Y2ggfHwgIWhyZWYpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICAgICAgbC5yZWwgPSBcInByZWZldGNoXCI7XG4gICAgICBsLmhyZWYgPSBocmVmO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZChsKTtcbiAgICAgICAgfSBjYXRjaCB7fVxuICAgICAgfTtcbiAgICB9IGNhdGNoIHt9XG4gIH0sIFtocmVmLCBwcmVmZXRjaF0pO1xuXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGUpID0+IHtcbiAgICBpZiAob25DbGljaykgb25DbGljayhlKTtcbiAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG4gICAgLy8gT25seSBpbnRlcmNlcHQgc2ltcGxlIGxlZnQtY2xpY2tzIHdpdGhvdXQgbW9kaWZpZXIga2V5c1xuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCB8fCBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkgfHwgZS5hbHRLZXkpXG4gICAgICByZXR1cm47XG4gICAgaWYgKCFocmVmKSByZXR1cm47XG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IFwiX3NlbGZcIikgcmV0dXJuO1xuICAgIGxldCB1cmw7XG4gICAgdHJ5IHtcbiAgICAgIHVybCA9IG5ldyBVUkwoaHJlZiwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJbnZhbGlkIFVSTCwgbGV0IGJyb3dzZXIgaGFuZGxlXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFNraXAgbm9uLWh0dHAocykgcHJvdG9jb2xzIGFuZCBzcGVjaWFsIHNjaGVtZXNcbiAgICBjb25zdCBwcm90byA9IHVybC5wcm90b2NvbDtcbiAgICBpZiAocHJvdG8gJiYgcHJvdG8gIT09IFwiaHR0cDpcIiAmJiBwcm90byAhPT0gXCJodHRwczpcIikgcmV0dXJuO1xuICAgIC8vIEV4dGVybmFsXG4gICAgaWYgKHVybC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHJldHVybjtcbiAgICAvLyBSZXNwZWN0IGRvd25sb2FkIGxpbmtzXG4gICAgaWYgKHJlc3QuZG93bmxvYWQpIHJldHVybjtcbiAgICAvLyBIYXNoLW9ubHkgbmF2aWdhdGlvbiBvcHRpbWl6YXRpb25cbiAgICBjb25zdCBjdXJyZW50ID1cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICBjb25zdCBuZXh0ID0gdXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaCArIHVybC5oYXNoO1xuICAgIGlmIChuZXh0ID09PSBjdXJyZW50KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoc2Nyb2xsKSB7XG4gICAgICAgIGlmICh1cmwuaGFzaCkge1xuICAgICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodXJsLmhhc2guc2xpY2UoMSkpO1xuICAgICAgICAgIGlmIChlbCkgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgICBlbHNlIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIERvIHB1c2gvcmVwbGFjZSBzdGF0ZVxuICAgIGlmIChyZXBsYWNlKSB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICAgIGVsc2Ugd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcbiAgICAvLyBFbWl0IGEgY3VzdG9tIG5hdmlnYXRpb24gZXZlbnQgc28gdGhlIGFwcCBjYW4gbG9hZCB0aGUgdGFyZ2V0IG1vZHVsZVxuICAgIHRyeSB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwiaW5kOm5hdmlnYXRlXCIsIHsgZGV0YWlsOiB7IGhyZWY6IG5leHQgfSB9KSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCB7fVxuICAgIC8vIFNjcm9sbCBiZWhhdmlvclxuICAgIGlmIChzY3JvbGwpIHtcbiAgICAgIGlmICh1cmwuaGFzaCkge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHVybC5oYXNoLnNsaWNlKDEpKTtcbiAgICAgICAgaWYgKGVsKSBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICBlbHNlIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVsRmluYWwgPVxuICAgIHRhcmdldCA9PT0gXCJfYmxhbmtcIlxuICAgICAgPyBbcmVsLCBcIm5vb3BlbmVyXCIsIFwibm9yZWZlcnJlclwiXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIilcbiAgICAgIDogcmVsO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICBcImFcIixcbiAgICB7XG4gICAgICBocmVmLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgc3R5bGUsXG4gICAgICB0YXJnZXQsXG4gICAgICByZWw6IHJlbEZpbmFsLFxuICAgICAgb25DbGljazogaGFuZGxlQ2xpY2ssXG4gICAgICAuLi5yZXN0LFxuICAgIH0sXG4gICAgY2hpbGRyZW4sXG4gICk7XG59XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVmlldyA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidmlld1wiKTtcblxuICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50XG4gICAgICByZWY9e3JlZn1cbiAgICAgIHN0eWxlPXtmbGF0U3R5bGV9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblZpZXcuZGlzcGxheU5hbWUgPSBcIlZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVGV4dCA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidGV4dFwiKTtcblxuICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50XG4gICAgICByZWY9e3JlZn1cbiAgICAgIHN0eWxlPXtmbGF0U3R5bGV9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblRleHQuZGlzcGxheU5hbWUgPSBcIlRleHRcIjtcbmV4cG9ydCBkZWZhdWx0IFRleHQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU2Nyb2xsVmlldyA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlLFxuICAgICAgc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yID0gdHJ1ZSxcbiAgICAgIHNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3IgPSB0cnVlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNjcm9sbHZpZXdcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIC8vIFdlYiBmYWxsYmFja1xuICAgICAgY29uc3QgY29udGFpbmVyU3R5bGUgPSB7XG4gICAgICAgIG92ZXJmbG93WDogaG9yaXpvbnRhbCA/IFwiYXV0b1wiIDogXCJoaWRkZW5cIixcbiAgICAgICAgb3ZlcmZsb3dZOiBob3Jpem9udGFsID8gXCJoaWRkZW5cIiA6IFwiYXV0b1wiLFxuICAgICAgICBXZWJraXRPdmVyZmxvd1Njcm9sbGluZzogXCJ0b3VjaFwiLFxuICAgICAgICBzY3JvbGxiYXJXaWR0aDogKFxuICAgICAgICAgIGhvcml6b250YWxcbiAgICAgICAgICAgID8gIXNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvclxuICAgICAgICAgICAgOiAhc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvclxuICAgICAgICApXG4gICAgICAgICAgPyBcIm5vbmVcIlxuICAgICAgICAgIDogXCJhdXRvXCIsXG4gICAgICAgIG1zT3ZlcmZsb3dTdHlsZTogKFxuICAgICAgICAgIGhvcml6b250YWxcbiAgICAgICAgICAgID8gIXNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvclxuICAgICAgICAgICAgOiAhc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvclxuICAgICAgICApXG4gICAgICAgICAgPyBcIm5vbmVcIlxuICAgICAgICAgIDogXCJhdXRvXCIsXG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuICAgICAgY29uc3QgY29udGVudFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtjb250ZW50Q29udGFpbmVyU3R5bGVdKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtjb250YWluZXJTdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5yZXN0fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtjb250ZW50U3R5bGV9PntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICBzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3I9e3Nob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvcn1cbiAgICAgICAgc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvcj17c2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvcn1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuU2Nyb2xsVmlldy5kaXNwbGF5TmFtZSA9IFwiU2Nyb2xsVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgU2Nyb2xsVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRleHRJbnB1dCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICB2YWx1ZSxcbiAgICAgIGRlZmF1bHRWYWx1ZSxcbiAgICAgIG9uQ2hhbmdlVGV4dCxcbiAgICAgIG9uRm9jdXMsXG4gICAgICBvbkJsdXIsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNlY3VyZVRleHRFbnRyeSA9IGZhbHNlLFxuICAgICAgbXVsdGlsaW5lID0gZmFsc2UsXG4gICAgICBudW1iZXJPZkxpbmVzID0gNCxcbiAgICAgIGVkaXRhYmxlID0gdHJ1ZSxcbiAgICAgIHN0eWxlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgaWYgKG9uQ2hhbmdlVGV4dCkgb25DaGFuZ2VUZXh0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29tbW9uU3R5bGUgPSB7XG4gICAgICBhcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICAgIG91dGxpbmU6IFwibm9uZVwiLFxuICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgfTtcblxuICAgIGlmIChtdWx0aWxpbmUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XG4gICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIHJlYWRPbmx5PXshZWRpdGFibGV9XG4gICAgICAgICAgcm93cz17bnVtYmVyT2ZMaW5lc31cbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdHlsZSwgcmVzaXplOiBcIm5vbmVcIiB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHR5cGU9e3NlY3VyZVRleHRFbnRyeSA/IFwicGFzc3dvcmRcIiA6IFwidGV4dFwifVxuICAgICAgICBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxuICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICByZWFkT25seT17IWVkaXRhYmxlfVxuICAgICAgICBzdHlsZT17Y29tbW9uU3R5bGV9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuVGV4dElucHV0LmRpc3BsYXlOYW1lID0gXCJUZXh0SW5wdXRcIjtcbmV4cG9ydCBkZWZhdWx0IFRleHRJbnB1dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBCdXR0b24gPSBmb3J3YXJkUmVmKFxuICAoeyB0aXRsZSwgb25QcmVzcywgY29sb3IsIGRpc2FibGVkLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgICAge1xuICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvciB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgb3BhY2l0eTogZGlzYWJsZWQgPyAwLjUgOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3Quc3R5bGVcbiAgICAgIF0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgICBzdHlsZT17ZmxhdFN0eWxlfVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge3RpdGxlfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJCdXR0b25cIjtcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBBY3Rpdml0eUluZGljYXRvciA9IGZvcndhcmRSZWYoXG4gICh7IHNpemUgPSBcInNtYWxsXCIsIGNvbG9yID0gXCIjOTk5XCIsIHN0eWxlLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJhY3Rpdml0eWluZGljYXRvclwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgY29uc3QgZGltZW5zaW9uID0gc2l6ZSA9PT0gXCJzbWFsbFwiID8gMjAgOiA0MDtcbiAgICAgIGNvbnN0IHNwaW5uZXJTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGRpbWVuc2lvbixcbiAgICAgICAgaGVpZ2h0OiBkaW1lbnNpb24sXG4gICAgICAgIGJvcmRlcjogYDJweCBzb2xpZCAke2NvbG9yfTMzYCxcbiAgICAgICAgYm9yZGVyVG9wOiBgMnB4IHNvbGlkICR7Y29sb3J9YCxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjUwJVwiLFxuICAgICAgICBhbmltYXRpb246IFwiaW5kanMtc3BpbiAwLjhzIGxpbmVhciBpbmZpbml0ZVwiLFxuICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiLFxuICAgICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgICAgfTtcblxuICAgICAgLy8gSW5qZWN0IGtleWZyYW1lcyBpZiBub3QgcHJlc2VudFxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kanMtc3Bpbi1zdHlsZVwiKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgIHN0eWxlRWwuaWQgPSBcImluZGpzLXNwaW4tc3R5bGVcIjtcbiAgICAgICAgc3R5bGVFbC5pbm5lckhUTUwgPSBgQGtleWZyYW1lcyBpbmRqcy1zcGluIHsgMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfSAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfSB9YDtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtzcGlubmVyU3R5bGV9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHNpemU9e3NpemV9XG4gICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkFjdGl2aXR5SW5kaWNhdG9yLmRpc3BsYXlOYW1lID0gXCJBY3Rpdml0eUluZGljYXRvclwiO1xuZXhwb3J0IGRlZmF1bHQgQWN0aXZpdHlJbmRpY2F0b3I7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU3dpdGNoID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHsgdmFsdWUsIG9uVmFsdWVDaGFuZ2UsIGRpc2FibGVkLCB0cmFja0NvbG9yLCB0aHVtYkNvbG9yLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInN3aXRjaFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiaW5wdXRcIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgY2hlY2tlZD17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvblZhbHVlQ2hhbmdlICYmIG9uVmFsdWVDaGFuZ2UoZS50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIHN0eWxlPXtTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgb25WYWx1ZUNoYW5nZT17b25WYWx1ZUNoYW5nZX1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICB0cmFja0NvbG9yPXt0cmFja0NvbG9yfVxuICAgICAgICB0aHVtYkNvbG9yPXt0aHVtYkNvbG9yfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuU3dpdGNoLmRpc3BsYXlOYW1lID0gXCJTd2l0Y2hcIjtcbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTY3JvbGxWaWV3IGZyb20gXCIuL3Njcm9sbC12aWV3LmpzeFwiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEZsYXRMaXN0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGRhdGEsXG4gICAgICByZW5kZXJJdGVtLFxuICAgICAga2V5RXh0cmFjdG9yLFxuICAgICAgTGlzdEhlYWRlckNvbXBvbmVudCxcbiAgICAgIExpc3RGb290ZXJDb21wb25lbnQsXG4gICAgICBMaXN0RW1wdHlDb21wb25lbnQsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBudW1Db2x1bW5zID0gMSxcbiAgICAgIGhvcml6b250YWwgPSBmYWxzZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJmbGF0bGlzdFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uXG4gICAgICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKExpc3RFbXB0eUNvbXBvbmVudCkge1xuICAgICAgICAgIGNvbnN0IEVtcHR5ID0gUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEVtcHR5Q29tcG9uZW50KSA/IChcbiAgICAgICAgICAgIExpc3RFbXB0eUNvbXBvbmVudFxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8TGlzdEVtcHR5Q29tcG9uZW50IC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge0xpc3RIZWFkZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIHtFbXB0eX1cbiAgICAgICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEZvb3RlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxMaXN0Rm9vdGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpdGVtcyA9IGRhdGEgfHwgW107XG4gICAgICBjb25zdCByZW5kZXJMaXN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGtleUV4dHJhY3RvclxuICAgICAgICAgICAgPyBrZXlFeHRyYWN0b3IoaXRlbSwgaW5kZXgpXG4gICAgICAgICAgICA6IGluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2tleX0+XG4gICAgICAgICAgICAgIHtyZW5kZXJJdGVtKHsgaXRlbSwgaW5kZXggfSl9XG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgZmxhdENvbnRlbnRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbY29udGVudENvbnRhaW5lclN0eWxlXSk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtmbGF0Q29udGVudFN0eWxlfVxuICAgICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAge3JlbmRlckxpc3QoKX1cbiAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgIHJlbmRlckl0ZW09e3JlbmRlckl0ZW19XG4gICAgICAgIGtleUV4dHJhY3Rvcj17a2V5RXh0cmFjdG9yfVxuICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50PXtMaXN0SGVhZGVyQ29tcG9uZW50fVxuICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50PXtMaXN0Rm9vdGVyQ29tcG9uZW50fVxuICAgICAgICBMaXN0RW1wdHlDb21wb25lbnQ9e0xpc3RFbXB0eUNvbXBvbmVudH1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIG51bUNvbHVtbnM9e251bUNvbHVtbnN9XG4gICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuRmxhdExpc3QuZGlzcGxheU5hbWUgPSBcIkZsYXRMaXN0XCI7XG5leHBvcnQgZGVmYXVsdCBGbGF0TGlzdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUb3VjaGFibGVPcGFjaXR5ID0gZm9yd2FyZFJlZihcbiAgKHsgY2hpbGRyZW4sIHN0eWxlLCBvblByZXNzLCBhY3RpdmVPcGFjaXR5ID0gMC4yLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVvcGFjaXR5XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgICAgICAgIHsgY3Vyc29yOiBcInBvaW50ZXJcIiwgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgcGFkZGluZzogMCwgdGV4dEFsaWduOiAnbGVmdCcsIGZvbnQ6ICdpbmhlcml0JywgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC4xNXMgZWFzZScgfSxcbiAgICAgICAgICAgIHN0eWxlXG4gICAgICAgICAgXSl9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gYWN0aXZlT3BhY2l0eSl9XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZU9wYWNpdHkuZGlzcGxheU5hbWUgPSBcIlRvdWNoYWJsZU9wYWNpdHlcIjtcbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZU9wYWNpdHk7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUHJlc3NhYmxlID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIG9uUHJlc3MsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJwcmVzc2FibGVcIik7XG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW1xuICAgICAgeyBjdXJzb3I6IFwicG9pbnRlclwiLCBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLCBwYWRkaW5nOiAwLCB0ZXh0QWxpZ246ICdsZWZ0JywgZm9udDogJ2luaGVyaXQnLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nIH0sXG4gICAgICB0eXBlb2Ygc3R5bGUgPT09IFwiZnVuY3Rpb25cIiA/IHN0eWxlKHsgcHJlc3NlZDogZmFsc2UgfSkgOiBzdHlsZSxcbiAgICBdKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17ZmxhdFN0eWxlfVxuICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHt0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gY2hpbGRyZW4oeyBwcmVzc2VkOiBmYWxzZSB9KVxuICAgICAgICAgIDogY2hpbGRyZW59XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzdHlsZT17c3R5bGV9IG9uUHJlc3M9e29uUHJlc3N9IGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5QcmVzc2FibGUuZGlzcGxheU5hbWUgPSBcIlByZXNzYWJsZVwiO1xuZXhwb3J0IGRlZmF1bHQgUHJlc3NhYmxlO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEltYWdlQmFja2dyb3VuZCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7IGNoaWxkcmVuLCBzdHlsZSwgaW1hZ2VTdHlsZSwgc291cmNlLCBzcmMsIHJlc2l6ZU1vZGUgPSBcImNvdmVyXCIsIC4uLnJlc3QgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiaW1hZ2ViYWNrZ3JvdW5kXCIpO1xuXG4gICAgY29uc3QgaW1hZ2VTb3VyY2UgPSBzcmMgfHwgKHNvdXJjZSAmJiBzb3VyY2UudXJpKSB8fCBcIlwiO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW1xuICAgICAgICB7XG4gICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpbWFnZVNvdXJjZX0pYCxcbiAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogcmVzaXplTW9kZSA9PT0gXCJzdHJldGNoXCIgPyBcIjEwMCUgMTAwJVwiIDogcmVzaXplTW9kZSxcbiAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgYmFja2dyb3VuZFJlcGVhdDogXCJuby1yZXBlYXRcIixcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGUsXG4gICAgICBdKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IHsuLi5yZXN0fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBpbWFnZVN0eWxlPXtpbWFnZVN0eWxlfVxuICAgICAgICBzb3VyY2U9e3NvdXJjZSB8fCB7IHVyaTogc3JjIH19XG4gICAgICAgIHJlc2l6ZU1vZGU9e3Jlc2l6ZU1vZGV9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuSW1hZ2VCYWNrZ3JvdW5kLmRpc3BsYXlOYW1lID0gXCJJbWFnZUJhY2tncm91bmRcIjtcbmV4cG9ydCBkZWZhdWx0IEltYWdlQmFja2dyb3VuZDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcblxuY29uc3QgTW9kYWwgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICB2aXNpYmxlLFxuICAgICAgdHJhbnNwYXJlbnQsXG4gICAgICBhbmltYXRpb25UeXBlLFxuICAgICAgb25SZXF1ZXN0Q2xvc2UsXG4gICAgICBzdHlsZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJtb2RhbFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgaWYgKCF2aXNpYmxlKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3QgbW9kYWxTdHlsZSA9IHtcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIFJlbmRlciBhcyBwb3J0YWwgaWYgcG9zc2libGVcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXttb2RhbFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG5cbiAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLmNyZWF0ZVBvcnRhbChjb250ZW50LCBkb2N1bWVudC5ib2R5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB2aXNpYmxlPXt2aXNpYmxlfVxuICAgICAgICB0cmFuc3BhcmVudD17dHJhbnNwYXJlbnR9XG4gICAgICAgIGFuaW1hdGlvblR5cGU9e2FuaW1hdGlvblR5cGV9XG4gICAgICAgIG9uUmVxdWVzdENsb3NlPXtvblJlcXVlc3RDbG9zZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5Nb2RhbC5kaXNwbGF5TmFtZSA9IFwiTW9kYWxcIjtcbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNhZmVBcmVhVmlldyA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic2FmZWFyZWF2aWV3XCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbXG4gICAgICB7XG4gICAgICAgIHBhZGRpbmdUb3A6ICdlbnYoc2FmZS1hcmVhLWluc2V0LXRvcCknLFxuICAgICAgICBwYWRkaW5nQm90dG9tOiAnZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pJyxcbiAgICAgICAgcGFkZGluZ0xlZnQ6ICdlbnYoc2FmZS1hcmVhLWluc2V0LWxlZnQpJyxcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiAnZW52KHNhZmUtYXJlYS1pbnNldC1yaWdodCknLFxuICAgICAgICBmbGV4OiAxXG4gICAgICB9LFxuICAgICAgc3R5bGVcbiAgICBdKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn0gey4uLnJlc3R9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5TYWZlQXJlYVZpZXcuZGlzcGxheU5hbWUgPSBcIlNhZmVBcmVhVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgU2FmZUFyZWFWaWV3O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XG5cbi8vIFdlYiBtb2NrIG9mIFN0YXR1c0Jhci4gSW4gbmF0aXZlIGl0IHdvdWxkIGNoYW5nZSB0aGUgYmFyIHN0eWxlLlxuLy8gSW4gd2ViLCBtYXliZSBpdCBjaGFuZ2VzIHRoZSBtZXRhIHRoZW1lLWNvbG9yIHRhZy5cblxuZnVuY3Rpb24gU3RhdHVzQmFyKHsgYmFyU3R5bGUgPSBcImRlZmF1bHRcIiwgYmFja2dyb3VuZENvbG9yLCBoaWRkZW4gPSBmYWxzZSB9KSB7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgLy8gQXR0ZW1wdCB0byBzZXQgdGhlbWUtY29sb3IgbWV0YSB0YWcgaWYgYmFja2dyb3VuZENvbG9yIHByb3ZpZGVkXG4gICAgaWYgKGJhY2tncm91bmRDb2xvcikge1xuICAgICAgbGV0IG1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ0aGVtZS1jb2xvclwiXScpO1xuICAgICAgaWYgKCFtZXRhKSB7XG4gICAgICAgIG1ldGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWV0YVwiKTtcbiAgICAgICAgbWV0YS5uYW1lID0gXCJ0aGVtZS1jb2xvclwiO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG1ldGEpO1xuICAgICAgfVxuICAgICAgbWV0YS5jb250ZW50ID0gYmFja2dyb3VuZENvbG9yO1xuICAgIH1cbiAgfSwgW2JhY2tncm91bmRDb2xvcl0pO1xuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0dXNCYXI7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU2Nyb2xsVmlldyBmcm9tIFwiLi9zY3JvbGwtdmlldy5qc3hcIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0LmpzeFwiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNlY3Rpb25MaXN0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIHNlY3Rpb25zLFxuICAgICAgcmVuZGVySXRlbSxcbiAgICAgIHJlbmRlclNlY3Rpb25IZWFkZXIsXG4gICAgICBrZXlFeHRyYWN0b3IsXG4gICAgICBMaXN0SGVhZGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIHN0aWNreVNlY3Rpb25IZWFkZXJzRW5hYmxlZCA9IHRydWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic2VjdGlvbmxpc3RcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIC8vIFdlYiBmYWxsYmFja1xuICAgICAgY29uc3QgcmVuZGVyU2VjdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAoc2VjdGlvbnMgfHwgW10pLm1hcCgoc2VjdGlvbiwgc2VjdGlvbkluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHNlY3Rpb24uZGF0YSB8fCBbXTtcbiAgICAgICAgICBjb25zdCBrZXkgPSBzZWN0aW9uLmtleSB8fCBzZWN0aW9uSW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17a2V5fT5cbiAgICAgICAgICAgICAge3JlbmRlclNlY3Rpb25IZWFkZXIgJiYgcmVuZGVyU2VjdGlvbkhlYWRlcih7IHNlY3Rpb24gfSl9XG4gICAgICAgICAgICAgIHtkYXRhLm1hcCgoaXRlbSwgaXRlbUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUtleSA9IGtleUV4dHJhY3RvclxuICAgICAgICAgICAgICAgICAgPyBrZXlFeHRyYWN0b3IoaXRlbSwgaXRlbUluZGV4KVxuICAgICAgICAgICAgICAgICAgOiBpdGVtLmtleSB8fCBpdGVtLmlkIHx8IGtleSArIFwiLVwiICsgaXRlbUluZGV4O1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtpdGVtS2V5fT5cbiAgICAgICAgICAgICAgICAgICAge3JlbmRlckl0ZW0oeyBpdGVtLCBpbmRleDogaXRlbUluZGV4LCBzZWN0aW9uIH0pfVxuICAgICAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge0xpc3RIZWFkZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIHtyZW5kZXJTZWN0aW9ucygpfVxuICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEZvb3RlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0Rm9vdGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc2VjdGlvbnM9e3NlY3Rpb25zfVxuICAgICAgICByZW5kZXJJdGVtPXtyZW5kZXJJdGVtfVxuICAgICAgICByZW5kZXJTZWN0aW9uSGVhZGVyPXtyZW5kZXJTZWN0aW9uSGVhZGVyfVxuICAgICAgICBrZXlFeHRyYWN0b3I9e2tleUV4dHJhY3Rvcn1cbiAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudD17TGlzdEhlYWRlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudD17TGlzdEZvb3RlckNvbXBvbmVudH1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIHN0aWNreVNlY3Rpb25IZWFkZXJzRW5hYmxlZD17c3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblNlY3Rpb25MaXN0LmRpc3BsYXlOYW1lID0gXCJTZWN0aW9uTGlzdFwiO1xuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbkxpc3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgS2V5Ym9hcmRBdm9pZGluZ1ZpZXcgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIGJlaGF2aW9yLFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAga2V5Ym9hcmRWZXJ0aWNhbE9mZnNldCxcbiAgICAgIGVuYWJsZWQsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwia2V5Ym9hcmRhdm9pZGluZ3ZpZXdcIik7XG5cbiAgICAvLyBPbiB3ZWIsIGtleWJvYXJkIGF2b2lkaW5nIGlzIHVzdWFsbHkgaGFuZGxlZCBieSB0aGUgYnJvd3NlciBkZWZhdWx0IGJlaGF2aW9yXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihbeyBmbGV4OiAxIH0sIHN0eWxlXSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIGJlaGF2aW9yPXtiZWhhdmlvcn1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIGtleWJvYXJkVmVydGljYWxPZmZzZXQ9e2tleWJvYXJkVmVydGljYWxPZmZzZXR9XG4gICAgICAgIGVuYWJsZWQ9e2VuYWJsZWR9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuS2V5Ym9hcmRBdm9pZGluZ1ZpZXcuZGlzcGxheU5hbWUgPSBcIktleWJvYXJkQXZvaWRpbmdWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBLZXlib2FyZEF2b2lkaW5nVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBSZWZyZXNoQ29udHJvbCA9IGZvcndhcmRSZWYoKHsgcmVmcmVzaGluZywgb25SZWZyZXNoLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwicmVmcmVzaGNvbnRyb2xcIik7XG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50XG4gICAgICByZWY9e3JlZn1cbiAgICAgIHJlZnJlc2hpbmc9e3JlZnJlc2hpbmd9XG4gICAgICBvblJlZnJlc2g9e29uUmVmcmVzaH1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICB7Li4ucmVzdH1cbiAgICAvPlxuICApO1xufSk7XG5cblJlZnJlc2hDb250cm9sLmRpc3BsYXlOYW1lID0gXCJSZWZyZXNoQ29udHJvbFwiO1xuZXhwb3J0IGRlZmF1bHQgUmVmcmVzaENvbnRyb2w7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVG91Y2hhYmxlSGlnaGxpZ2h0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBvblByZXNzLFxuICAgICAgdW5kZXJsYXlDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgIGFjdGl2ZU9wYWNpdHkgPSAwLjg1LFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRvdWNoYWJsZWhpZ2hsaWdodFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3sgY3Vyc29yOiBcInBvaW50ZXJcIiB9LCBzdHlsZV0pO1xuXG4gICAgICAvLyBTaW1wbGUgd2ViIGltcGxlbWVudGF0aW9uOiBqdXN0IG9wYWNpdHksIG1pbWlja2luZyBvdmVybGF5IGlzIGhhcmRlciB3aXRob3V0IHN0YXRlXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgc3R5bGU9e2ZsYXRTdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHVuZGVybGF5Q29sb3I7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IGFjdGl2ZU9wYWNpdHk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbk1vdXNlVXA9eyhlKSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cbiAgICAgICAgICAgICAgZmxhdFN0eWxlLmJhY2tncm91bmRDb2xvciB8fCBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhlKSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cbiAgICAgICAgICAgICAgZmxhdFN0eWxlLmJhY2tncm91bmRDb2xvciB8fCBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XG4gICAgICAgIHVuZGVybGF5Q29sb3I9e3VuZGVybGF5Q29sb3J9XG4gICAgICAgIGFjdGl2ZU9wYWNpdHk9e2FjdGl2ZU9wYWNpdHl9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuVG91Y2hhYmxlSGlnaGxpZ2h0LmRpc3BsYXlOYW1lID0gXCJUb3VjaGFibGVIaWdobGlnaHRcIjtcbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZUhpZ2hsaWdodDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgY2xvbmVFbGVtZW50LCBDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2sganVzdCBhY2NlcHRzIG9uUHJlc3MgYW5kIHBhc3NlcyBpdCB0byB0aGUgY2hpbGRcbi8vIEl0IGRvZXMgbm90IGFkZCBhbnkgdmlzdWFsIGZlZWRiYWNrLlxuY29uc3QgVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrID0gKHtcbiAgY2hpbGRyZW4sXG4gIG9uUHJlc3MsXG4gIG9uUHJlc3NJbixcbiAgb25QcmVzc091dCxcbiAgZGlzYWJsZWQsXG4gIC4uLnJlc3Rcbn0pID0+IHtcbiAgY29uc3QgY2hpbGQgPSBDaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTtcblxuICByZXR1cm4gY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgb25DbGljazogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzcykgb25QcmVzcyhlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbkNsaWNrKSBjaGlsZC5wcm9wcy5vbkNsaWNrKGUpO1xuICAgIH0sXG4gICAgb25Nb3VzZURvd246IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NJbikgb25QcmVzc0luKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uTW91c2VEb3duKSBjaGlsZC5wcm9wcy5vbk1vdXNlRG93bihlKTtcbiAgICB9LFxuICAgIG9uTW91c2VVcDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc091dCkgb25QcmVzc091dChlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbk1vdXNlVXApIGNoaWxkLnByb3BzLm9uTW91c2VVcChlKTtcbiAgICB9LFxuICAgIG9uVG91Y2hTdGFydDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc0luKSBvblByZXNzSW4oZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Ub3VjaFN0YXJ0KSBjaGlsZC5wcm9wcy5vblRvdWNoU3RhcnQoZSk7XG4gICAgfSxcbiAgICBvblRvdWNoRW5kOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzT3V0KSBvblByZXNzT3V0KGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uVG91Y2hFbmQpIGNoaWxkLnByb3BzLm9uVG91Y2hFbmQoZSk7XG4gICAgfSxcbiAgICBzdHlsZToge1xuICAgICAgY3Vyc29yOiBkaXNhYmxlZCA/IFwibm90LWFsbG93ZWRcIiA6IFwicG9pbnRlclwiLFxuICAgICAgLi4uY2hpbGQucHJvcHMuc3R5bGUsXG4gICAgfSxcbiAgICAuLi5yZXN0LFxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjaztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBTY3JlZW4gQ29tcG9uZW50XHJcbiAqIEZ1bGwtaGVpZ2h0IHNjcmVlbiBjb250YWluZXIgd2l0aCBiYWNrZ3JvdW5kXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBTY3JlZW4gPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBiYWNrZ3JvdW5kID0gJ2xpZ2h0JywgY2xhc3NOYW1lID0gJycsIHN0eWxlLCAuLi5wcm9wcyB9LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5TY3JlZW4uZGlzcGxheU5hbWUgPSBcIlNjcmVlblwiO1xyXG5leHBvcnQgZGVmYXVsdCBTY3JlZW47XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBDb250YWluZXIgQ29tcG9uZW50XHJcbiAqIFJlc3BvbnNpdmUgY29udGFpbmVyIHdpdGggbWF4LXdpZHRoIGFuZCBjZW50ZXJpbmdcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IENvbnRhaW5lciA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkNvbnRhaW5lci5kaXNwbGF5TmFtZSA9IFwiQ29udGFpbmVyXCI7XHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIENhcmQgQ29tcG9uZW50XHJcbiAqIFN0eWxlZCBjYXJkIGNvbnRhaW5lciB3aXRoIHNoYWRvdyBhbmQgcm91bmRlZCBjb3JuZXJzXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBDYXJkID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuQ2FyZC5kaXNwbGF5TmFtZSA9IFwiQ2FyZFwiO1xyXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgR3JpZCBDb21wb25lbnRcclxuICogUmVzcG9uc2l2ZSBncmlkIGxheW91dCBzeXN0ZW1cclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IEdyaWQgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5HcmlkLmRpc3BsYXlOYW1lID0gXCJHcmlkXCI7XHJcbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBTdGFjayBDb21wb25lbnRcclxuICogVmVydGljYWwgb3IgaG9yaXpvbnRhbCBsYXlvdXQgd2l0aCBzcGFjaW5nXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBTdGFjayA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJyxcclxuICAgIHNwYWNpbmcgPSA0LFxyXG4gICAgYWxpZ24gPSAnc3RhcnQnLFxyXG4gICAganVzdGlmeSA9ICdzdGFydCcsXHJcbiAgICBjbGFzc05hbWUgPSAnJyxcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuU3RhY2suZGlzcGxheU5hbWUgPSBcIlN0YWNrXCI7XHJcbmV4cG9ydCBkZWZhdWx0IFN0YWNrO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dC5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgSWNvbiBDb21wb25lbnRcclxuICogRGlzcGxheXMgZW1vamkgaWNvbnMgY29uc2lzdGVudGx5IGFjcm9zcyBwbGF0Zm9ybXNcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IEljb24gPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBuYW1lLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUZXh0IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge25hbWV9XHJcbiAgICAgICAgPC9UZXh0ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuSWNvbi5kaXNwbGF5TmFtZSA9IFwiSWNvblwiO1xyXG5leHBvcnQgZGVmYXVsdCBJY29uO1xyXG4iLCAiLy8gRGltZW5zaW9ucyBBUEkgZm9yIFdlYlxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5jb25zdCBsaXN0ZW5lcnMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICBsaXN0ZW5lcnMuZW1pdChcImNoYW5nZVwiLCB7IHdpbmRvdzogZ2V0V2luZG93KCksIHNjcmVlbjogZ2V0U2NyZWVuKCkgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3coKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHNjYWxlOiAxLCBmb250U2NhbGU6IDEgfTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgc2NhbGU6IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsXG4gICAgZm9udFNjYWxlOiAxLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTY3JlZW4oKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHNjYWxlOiAxLCBmb250U2NhbGU6IDEgfTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2luZG93LnNjcmVlbi53aWR0aCxcbiAgICBoZWlnaHQ6IHdpbmRvdy5zY3JlZW4uaGVpZ2h0LFxuICAgIHNjYWxlOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLFxuICAgIGZvbnRTY2FsZTogMSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IERpbWVuc2lvbnMgPSB7XG4gIGdldDogKGRpbSkgPT4ge1xuICAgIGlmIChkaW0gPT09IFwid2luZG93XCIpIHJldHVybiBnZXRXaW5kb3coKTtcbiAgICBpZiAoZGltID09PSBcInNjcmVlblwiKSByZXR1cm4gZ2V0U2NyZWVuKCk7XG4gICAgcmV0dXJuIGdldFdpbmRvdygpO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcImNoYW5nZVwiKSB7XG4gICAgICBsaXN0ZW5lcnMub24oXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6ICgpID0+IGxpc3RlbmVycy5vZmYoXCJjaGFuZ2VcIiwgaGFuZGxlciksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyByZW1vdmU6ICgpID0+IHt9IH07XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwiY2hhbmdlXCIpIHtcbiAgICAgIGxpc3RlbmVycy5vZmYoXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGltZW5zaW9ucztcbiIsICJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRzXCI7XG5cbmNvbnN0IGV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuZXhwb3J0IGNvbnN0IExpbmtpbmcgPSB7XG4gIG9wZW5VUkw6ICh1cmwpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgd2luZG93Lm9wZW4odXJsLCBcIl9ibGFua1wiLCBcIm5vb3BlbmVyLG5vcmVmZXJyZXJcIik7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfSxcbiAgY2FuT3BlblVSTDogKHVybCkgPT4gUHJvbWlzZS5yZXNvbHZlKHRydWUpLFxuICBnZXRJbml0aWFsVVJMOiAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcInVybFwiKSB7XG4gICAgICAvLyBJbiBhIHJlYWwgd2ViIGFwcCwgd2UgbWlnaHQgbGlzdGVuIHRvIHBvcHN0YXRlIG9yIGhhc2hjaGFuZ2VcbiAgICAgIC8vIGVuc3VyaW5nIHdlIHJldHVybiBhIHN1YnNjcmlwdGlvbi1saWtlIG9iamVjdFxuICAgICAgY29uc3QgbGlzdGVuZXIgPSAoZSkgPT4gaGFuZGxlcih7IHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGxpc3RlbmVyKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBsaXN0ZW5lciksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyByZW1vdmU6ICgpID0+IHt9IH07XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgLy8gRGVwcmVjYXRlZCBpbiBSTiBidXQgZ29vZCB0byBoYXZlIHNpZ25hdHVyZVxuICB9LFxuICBzZW5kSW50ZW50OiAoYWN0aW9uLCBleHRyYXMpID0+IFByb21pc2UucmVzb2x2ZSgpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlua2luZztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQUEsT0FBT0EsYUFBVzs7O0FDZWxCLE9BQU8sV0FBVzs7O0FDTGxCLElBQU0sWUFBWSxPQUFPLFdBQVc7QUFHN0IsSUFBTSxZQUNYLGNBQ0MsT0FBTyxTQUFTLFNBQVMsY0FDeEIsQ0FBQyxDQUFDLE9BQU8sWUFDVCxVQUFVLFVBQVUsU0FBUyxVQUFVO0FBR3BDLElBQU0sV0FDWCxjQUNDLENBQUMsQ0FBQyxPQUFPLGFBQ1IsQ0FBQyxDQUFDLE9BQU8saUJBQ1QsQ0FBQyxDQUFDLE9BQU8sUUFBUSxpQkFBaUIsVUFDbEMsVUFBVSxVQUFVLFNBQVMsV0FBVztBQUdyQyxJQUFNLFlBQVksWUFBWSxXQUFXLEtBQUssVUFBVSxTQUFTO0FBQ2pFLElBQU0sUUFBUSxZQUFZLG9CQUFvQixLQUFLLFVBQVUsU0FBUztBQU10RSxJQUFNLFlBQVksTUFBTTtBQUM3QixNQUFJLFVBQVcsUUFBTztBQUN0QixNQUFJLFVBQVcsUUFBTztBQUN0QixNQUFJLE1BQU8sUUFBTztBQUNsQixNQUFJLFNBQVUsUUFBTztBQUNyQixTQUFPO0FBQ1QsR0FBRzs7O0FDekNILE9BQU9DLFVBQVMsa0JBQWtCOzs7QUNBbEMsU0FBUyxXQUFXLEtBQUs7QUFDdkIsU0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLFlBQVksSUFBSSxJQUFJLE1BQU0sQ0FBQztBQUNsRDtBQUVPLFNBQVMsZUFBZSxNQUFNO0FBQ25DLFFBQU1DLFlBQVcsT0FBTyxhQUFhLGNBQWMsV0FBVztBQUU5RCxNQUFJQSxjQUFhLE9BQU87QUFDdEIsVUFBTSxTQUFTO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxpQkFBaUI7QUFBQTtBQUFBLE1BQ2pCLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLHNCQUFzQjtBQUFBLE1BQ3RCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLGtCQUFrQjtBQUFBLE1BQ2xCLG9CQUFvQjtBQUFBLE1BQ3BCLFFBQVE7QUFBQTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsbUJBQW1CO0FBQUEsTUFDbkIsZ0JBQWdCO0FBQUEsSUFDbEI7QUFDQSxXQUFPLE9BQU8sS0FBSyxZQUFZLEVBQUUsUUFBUSxNQUFNLEVBQUUsQ0FBQyxLQUFLO0FBQUEsRUFDekQ7QUFFQSxNQUFJQSxjQUFhLFVBQVU7QUFHekIsVUFBTSxZQUFZO0FBQUEsTUFDaEIsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2Isc0JBQXNCO0FBQUEsTUFDdEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsb0JBQW9CO0FBQUEsTUFDcEIsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsbUJBQW1CO0FBQUEsTUFDbkIsZ0JBQWdCO0FBQUEsTUFDaEIsUUFBUTtBQUFBLElBQ1Y7QUFDQSxVQUFNLFNBQ0osVUFBVSxLQUFLLFlBQVksRUFBRSxRQUFRLE1BQU0sRUFBRSxDQUFDLEtBQUssV0FBVyxJQUFJO0FBSXBFLFFBQUk7QUFFRixVQUFJLE9BQU8sY0FBWSxhQUFhO0FBQ2xDLGVBQU8sVUFBUSxjQUFjLEVBQUUsTUFBTTtBQUFBLE1BQ3ZDLFdBQ0UsT0FBTyxXQUFXLGVBQ2xCLE9BQU8sU0FDUCxPQUFPLE1BQU0sUUFDYjtBQUNBLGVBQU8sT0FBTyxNQUFNLE9BQU8sTUFBTTtBQUFBLE1BQ25DO0FBQUEsSUFDRixTQUFTLEdBQUc7QUFDVixjQUFRLEtBQUssMEJBQTBCLE1BQU0sWUFBWTtBQUFBLElBQzNEO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPO0FBQ1Q7OztBQ3pFTyxJQUFNLGFBQWE7QUFBQSxFQUN4QixRQUFRLENBQUMsV0FBVztBQUFBLEVBQ3BCLFNBQVMsQ0FBQyxXQUFXO0FBQ25CLFFBQUksQ0FBQyxPQUFRLFFBQU8sQ0FBQztBQUNyQixRQUFJLE1BQU0sUUFBUSxNQUFNLEdBQUc7QUFDekIsYUFBTyxPQUNKLEtBQUssUUFBUSxFQUNiLE9BQU8sQ0FBQyxLQUFLLFNBQVUsT0FBTyxFQUFFLEdBQUcsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFNLENBQUMsQ0FBQztBQUFBLElBQ2pFO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLGVBQWU7QUFBQSxFQUNmLGNBQWM7QUFBQSxJQUNaLFVBQVU7QUFBQSxJQUNWLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxvQkFBb0I7QUFBQSxJQUNsQixVQUFVO0FBQUEsSUFDVixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUNGO0FBRUEsSUFBTyxzQkFBUTs7O0FGUE47QUFyQlQsSUFBTSxRQUFRLFdBQVcsQ0FBQyxFQUFFLE9BQU8sUUFBUSxLQUFLLEdBQUcsS0FBSyxHQUFHLFFBQVE7QUFDakUsUUFBTSxZQUFZLGVBQWUsT0FBTztBQUl4QyxRQUFNLGNBQWMsT0FBUSxVQUFVLE9BQU8sT0FBUTtBQUVyRCxRQUFNLFFBQVE7QUFBQSxJQUNaLEdBQUc7QUFBQSxJQUNILEtBQUs7QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUVBLE1BQUksY0FBYyxTQUFTLGNBQWMsU0FBUztBQUVoRCxVQUFNLFNBQVMsVUFBVSxFQUFFLEtBQUssSUFBSTtBQUNwQyxXQUFPLE1BQU07QUFBQSxFQUNmO0FBRUEsUUFBTSxZQUFZLG9CQUFXLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFFNUMsU0FBTyxvQkFBQyxhQUFVLE9BQU8sV0FBWSxHQUFHLE9BQU87QUFDakQsQ0FBQztBQUVELE1BQU0sY0FBYzs7O0FHNUJwQixPQUFPQyxZQUFXOzs7QUNBbEIsT0FBT0MsVUFBUyxjQUFBQyxtQkFBa0I7QUFVOUIsZ0JBQUFDLFlBQUE7QUFOSixJQUFNLE9BQU9DLFlBQVcsQ0FBQyxFQUFFLFVBQVUsT0FBTyxXQUFXLEdBQUcsS0FBSyxHQUFHLFFBQVE7QUFDeEUsUUFBTSxZQUFZLGVBQWUsTUFBTTtBQUV2QyxRQUFNLFlBQVksb0JBQVcsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUU1QyxTQUNFLGdCQUFBRDtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0M7QUFBQSxNQUNBLE9BQU87QUFBQSxNQUNQLFdBQVcsYUFBYTtBQUFBLE1BQ3ZCLEdBQUc7QUFBQSxNQUVIO0FBQUE7QUFBQSxFQUNIO0FBRUosQ0FBQztBQUVELEtBQUssY0FBYztBQUNuQixJQUFPLGVBQVE7OztBQ3RCZixPQUFPRSxVQUFTLGNBQUFDLG1CQUFrQjtBQVU5QixnQkFBQUMsWUFBQTtBQU5KLElBQU0sT0FBT0MsWUFBVyxDQUFDLEVBQUUsVUFBVSxPQUFPLFdBQVcsR0FBRyxLQUFLLEdBQUcsUUFBUTtBQUN4RSxRQUFNLFlBQVksZUFBZSxNQUFNO0FBRXZDLFFBQU0sWUFBWSxvQkFBVyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBRTVDLFNBQ0UsZ0JBQUFEO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQztBQUFBLE1BQ0EsT0FBTztBQUFBLE1BQ1AsV0FBVyxhQUFhO0FBQUEsTUFDdkIsR0FBRztBQUFBLE1BRUg7QUFBQTtBQUFBLEVBQ0g7QUFFSixDQUFDO0FBRUQsS0FBSyxjQUFjO0FBQ25CLElBQU8sZUFBUTs7O0FDdEJmLE9BQU9FLFVBQVMsY0FBQUMsbUJBQWtCO0FBNkN4QixnQkFBQUMsWUFBQTtBQXpDVixJQUFNLGFBQWFDO0FBQUEsRUFDakIsQ0FDRTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2IsaUNBQWlDO0FBQUEsSUFDakMsK0JBQStCO0FBQUEsSUFDL0I7QUFBQSxJQUNBLEdBQUc7QUFBQSxFQUNMLEdBQ0EsUUFDRztBQUNILFVBQU0sWUFBWSxlQUFlLFlBQVk7QUFFN0MsUUFBSSxjQUFjLFNBQVMsY0FBYyxRQUFRO0FBRS9DLFlBQU0saUJBQWlCO0FBQUEsUUFDckIsV0FBVyxhQUFhLFNBQVM7QUFBQSxRQUNqQyxXQUFXLGFBQWEsV0FBVztBQUFBLFFBQ25DLHlCQUF5QjtBQUFBLFFBQ3pCLGlCQUNFLGFBQ0ksQ0FBQyxpQ0FDRCxDQUFDLGdDQUVILFNBQ0E7QUFBQSxRQUNKLGtCQUNFLGFBQ0ksQ0FBQyxpQ0FDRCxDQUFDLGdDQUVILFNBQ0E7QUFBQSxRQUNKLEdBQUcsb0JBQVcsUUFBUSxLQUFLO0FBQUEsTUFDN0I7QUFDQSxZQUFNLGVBQWUsb0JBQVcsUUFBUSxDQUFDLHFCQUFxQixDQUFDO0FBQy9ELGFBQ0UsZ0JBQUFELEtBQUMsU0FBSSxLQUFVLE9BQU8sZ0JBQWdCLFdBQXVCLEdBQUcsTUFDOUQsMEJBQUFBLEtBQUMsU0FBSSxPQUFPLGNBQWUsVUFBUyxHQUN0QztBQUFBLElBRUo7QUFHQSxXQUNFLGdCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNDLEdBQUc7QUFBQSxRQUVIO0FBQUE7QUFBQSxJQUNIO0FBQUEsRUFFSjtBQUNGO0FBRUEsV0FBVyxjQUFjO0FBQ3pCLElBQU8sc0JBQVE7OztBQ3JFZixPQUFPRSxVQUFTLGNBQUFDLG1CQUFrQjtBQW1DMUIsZ0JBQUFDLFlBQUE7QUFoQ1IsSUFBTSxZQUFZQztBQUFBLEVBQ2hCLENBQ0U7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGtCQUFrQjtBQUFBLElBQ2xCLFlBQVk7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLElBQ2hCLFdBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0EsR0FBRztBQUFBLEVBQ0wsR0FDQSxRQUNHO0FBQ0gsVUFBTSxlQUFlLENBQUMsTUFBTTtBQUMxQixVQUFJLGFBQWMsY0FBYSxFQUFFLE9BQU8sS0FBSztBQUFBLElBQy9DO0FBRUEsVUFBTSxjQUFjO0FBQUEsTUFDbEIsWUFBWTtBQUFBLE1BQ1osU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsR0FBRyxvQkFBVyxRQUFRLEtBQUs7QUFBQSxJQUM3QjtBQUVBLFFBQUksV0FBVztBQUNiLGFBQ0UsZ0JBQUFEO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxVQUFVO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxVQUFVLENBQUM7QUFBQSxVQUNYLE1BQU07QUFBQSxVQUNOLE9BQU8sRUFBRSxHQUFHLGFBQWEsUUFBUSxPQUFPO0FBQUEsVUFDeEMsV0FBVyxhQUFhO0FBQUEsVUFDdkIsR0FBRztBQUFBO0FBQUEsTUFDTjtBQUFBLElBRUo7QUFFQSxXQUNFLGdCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBLE1BQU0sa0JBQWtCLGFBQWE7QUFBQSxRQUNyQztBQUFBLFFBQ0E7QUFBQSxRQUNBLFVBQVU7QUFBQSxRQUNWO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLFVBQVUsQ0FBQztBQUFBLFFBQ1gsT0FBTztBQUFBLFFBQ1AsV0FBVyxhQUFhO0FBQUEsUUFDdkIsR0FBRztBQUFBO0FBQUEsSUFDTjtBQUFBLEVBRUo7QUFDRjtBQUVBLFVBQVUsY0FBYzs7O0FDdkV4QixPQUFPRSxVQUFTLGNBQUFDLG1CQUFrQjtBQW1CMUIsZ0JBQUFDLFlBQUE7QUFmUixJQUFNLFNBQVNDO0FBQUEsRUFDYixDQUFDLEVBQUUsT0FBTyxTQUFTLE9BQU8sVUFBVSxXQUFXLEdBQUcsS0FBSyxHQUFHLFFBQVE7QUFDaEUsVUFBTSxZQUFZLGVBQWUsUUFBUTtBQUV6QyxRQUFJLGNBQWMsWUFBWSxjQUFjLE9BQU87QUFDakQsWUFBTSxZQUFZLG9CQUFXLFFBQVE7QUFBQSxRQUNuQztBQUFBLFVBQ0UsUUFBUTtBQUFBLFVBQ1IsaUJBQWlCLFNBQVM7QUFBQSxVQUMxQixTQUFTLFdBQVcsTUFBTTtBQUFBLFFBQzVCO0FBQUEsUUFDQSxLQUFLO0FBQUEsTUFDUCxDQUFDO0FBRUQsYUFDRSxnQkFBQUQ7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQSxTQUFTO0FBQUEsVUFDVDtBQUFBLFVBQ0EsV0FBVyxhQUFhO0FBQUEsVUFDeEIsT0FBTztBQUFBLFVBQ1AsTUFBSztBQUFBLFVBQ0osR0FBRztBQUFBLFVBRUg7QUFBQTtBQUFBLE1BQ0g7QUFBQSxJQUVKO0FBRUEsV0FDRSxnQkFBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsV0FBVyxhQUFhO0FBQUEsUUFDdkIsR0FBRztBQUFBO0FBQUEsSUFDTjtBQUFBLEVBRUo7QUFDRjtBQUVBLE9BQU8sY0FBYzs7O0FDL0NyQixPQUFPRSxVQUFTLGNBQUFDLG1CQUFrQjtBQWtDMUIsZ0JBQUFDLFlBQUE7QUE5QlIsSUFBTSxvQkFBb0JDO0FBQUEsRUFDeEIsQ0FBQyxFQUFFLE9BQU8sU0FBUyxRQUFRLFFBQVEsT0FBTyxXQUFXLEdBQUcsS0FBSyxHQUFHLFFBQVE7QUFDdEUsVUFBTSxZQUFZLGVBQWUsbUJBQW1CO0FBRXBELFFBQUksY0FBYyxTQUFTLGNBQWMsUUFBUTtBQUMvQyxZQUFNLFlBQVksU0FBUyxVQUFVLEtBQUs7QUFDMUMsWUFBTSxlQUFlO0FBQUEsUUFDbkIsT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsUUFBUSxhQUFhLEtBQUs7QUFBQSxRQUMxQixXQUFXLGFBQWEsS0FBSztBQUFBLFFBQzdCLGNBQWM7QUFBQSxRQUNkLFdBQVc7QUFBQSxRQUNYLFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLEdBQUcsb0JBQVcsUUFBUSxLQUFLO0FBQUEsTUFDN0I7QUFHQSxVQUNFLE9BQU8sYUFBYSxlQUNwQixDQUFDLFNBQVMsZUFBZSxrQkFBa0IsR0FDM0M7QUFDQSxjQUFNLFVBQVUsU0FBUyxjQUFjLE9BQU87QUFDOUMsZ0JBQVEsS0FBSztBQUNiLGdCQUFRLFlBQVk7QUFDcEIsaUJBQVMsS0FBSyxZQUFZLE9BQU87QUFBQSxNQUNuQztBQUVBLGFBQ0UsZ0JBQUFEO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0EsT0FBTztBQUFBLFVBQ1AsV0FBVyxhQUFhO0FBQUEsVUFDdkIsR0FBRztBQUFBO0FBQUEsTUFDTjtBQUFBLElBRUo7QUFFQSxXQUNFLGdCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLFdBQVcsYUFBYTtBQUFBLFFBQ3ZCLEdBQUc7QUFBQTtBQUFBLElBQ047QUFBQSxFQUVKO0FBQ0Y7QUFFQSxrQkFBa0IsY0FBYzs7O0FDeERoQyxPQUFPRSxXQUFTLGNBQUFDLG1CQUFrQjtBQWExQixnQkFBQUMsWUFBQTtBQVRSLElBQU0sU0FBU0M7QUFBQSxFQUNiLENBQ0UsRUFBRSxPQUFPLGVBQWUsVUFBVSxZQUFZLFlBQVksT0FBTyxXQUFXLEdBQUcsS0FBSyxHQUNwRixRQUNHO0FBQ0gsVUFBTSxZQUFZLGVBQWUsUUFBUTtBQUV6QyxRQUFJLGNBQWMsV0FBVyxjQUFjLE9BQU87QUFDaEQsYUFDRSxnQkFBQUQ7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQSxNQUFLO0FBQUEsVUFDTCxTQUFTO0FBQUEsVUFDVCxVQUFVLENBQUMsTUFBTSxpQkFBaUIsY0FBYyxFQUFFLE9BQU8sT0FBTztBQUFBLFVBQ2hFO0FBQUEsVUFDQSxPQUFPLG9CQUFXLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFBQSxVQUNqQyxXQUFXLGFBQWE7QUFBQSxVQUN2QixHQUFHO0FBQUE7QUFBQSxNQUNOO0FBQUEsSUFFSjtBQUdBLFdBQ0UsZ0JBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsV0FBVyxhQUFhO0FBQUEsUUFDdkIsR0FBRztBQUFBO0FBQUEsSUFDTjtBQUFBLEVBRUo7QUFDRjtBQUVBLE9BQU8sY0FBYzs7O0FDM0NyQixPQUFPRSxXQUFTLGNBQUFDLG1CQUFrQjtBQThCdEIsZ0JBQUFDLE1BR0EsWUFIQTtBQXpCWixJQUFNLFdBQVdDO0FBQUEsRUFDZixDQUNFO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsR0FBRztBQUFBLEVBQ0wsR0FDQSxRQUNHO0FBQ0gsVUFBTSxZQUFZLGVBQWUsVUFBVTtBQUUzQyxRQUFJLGNBQWMsU0FBUyxjQUFjLFFBQVE7QUFFL0MsVUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLEdBQUc7QUFDOUIsWUFBSSxvQkFBb0I7QUFDdEIsZ0JBQU0sUUFBUUMsUUFBTSxlQUFlLGtCQUFrQixJQUNuRCxxQkFFQSxnQkFBQUYsS0FBQyxzQkFBbUI7QUFFdEIsaUJBQ0U7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNDLEdBQUc7QUFBQSxjQUVIO0FBQUEsd0NBQ0VFLFFBQU0sZUFBZSxtQkFBbUIsSUFDdkMsc0JBRUEsZ0JBQUFGLEtBQUMsdUJBQW9CO0FBQUEsZ0JBRXhCO0FBQUEsZ0JBQ0Esd0JBQ0VFLFFBQU0sZUFBZSxtQkFBbUIsSUFDdkMsc0JBRUEsZ0JBQUFGLEtBQUMsdUJBQW9CO0FBQUE7QUFBQTtBQUFBLFVBRTNCO0FBQUEsUUFFSjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFFBQVEsUUFBUSxDQUFDO0FBQ3ZCLFlBQU0sYUFBYSxNQUFNO0FBQ3ZCLGVBQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxVQUFVO0FBQ2hDLGdCQUFNLE1BQU0sZUFDUixhQUFhLE1BQU0sS0FBSyxJQUN4QixNQUFNLFNBQVM7QUFDbkIsaUJBQ0UsZ0JBQUFBLEtBQUNFLFFBQU0sVUFBTixFQUNFLHFCQUFXLEVBQUUsTUFBTSxNQUFNLENBQUMsS0FEUixHQUVyQjtBQUFBLFFBRUosQ0FBQztBQUFBLE1BQ0g7QUFFQSxZQUFNLG1CQUFtQixvQkFBVyxRQUFRLENBQUMscUJBQXFCLENBQUM7QUFFbkUsYUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsdUJBQXVCO0FBQUEsVUFDdkI7QUFBQSxVQUNBO0FBQUEsVUFDQyxHQUFHO0FBQUEsVUFFSDtBQUFBLG9DQUNFQSxRQUFNLGVBQWUsbUJBQW1CLElBQ3ZDLHNCQUVBLGdCQUFBRixLQUFDLHVCQUFvQjtBQUFBLFlBRXhCLFdBQVc7QUFBQSxZQUNYLHdCQUNFRSxRQUFNLGVBQWUsbUJBQW1CLElBQ3ZDLHNCQUVBLGdCQUFBRixLQUFDLHVCQUFvQjtBQUFBO0FBQUE7QUFBQSxNQUUzQjtBQUFBLElBRUo7QUFHQSxXQUNFLGdCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNDLEdBQUc7QUFBQTtBQUFBLElBQ047QUFBQSxFQUVKO0FBQ0Y7QUFFQSxTQUFTLGNBQWM7QUFDdkIsSUFBTyxvQkFBUTs7O0FDckhmLE9BQU9HLFdBQVMsY0FBQUMsb0JBQWtCO0FBVTFCLGdCQUFBQyxhQUFBO0FBTlIsSUFBTSxtQkFBbUJDO0FBQUEsRUFDdkIsQ0FBQyxFQUFFLFVBQVUsT0FBTyxTQUFTLGdCQUFnQixLQUFLLFdBQVcsR0FBRyxLQUFLLEdBQUcsUUFBUTtBQUM5RSxVQUFNLFlBQVksZUFBZSxrQkFBa0I7QUFFbkQsUUFBSSxjQUFjLFlBQVksY0FBYyxPQUFPO0FBQ2pELGFBQ0UsZ0JBQUFEO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0EsT0FBTyxvQkFBVyxRQUFRO0FBQUEsWUFDeEIsRUFBRSxRQUFRLFdBQVcsWUFBWSxRQUFRLFFBQVEsUUFBUSxTQUFTLEdBQUcsV0FBVyxRQUFRLE1BQU0sV0FBVyxTQUFTLFFBQVEsZUFBZSxVQUFVLFlBQVkscUJBQXFCO0FBQUEsWUFDcEw7QUFBQSxVQUNGLENBQUM7QUFBQSxVQUNELFNBQVM7QUFBQSxVQUNULFdBQVcsYUFBYTtBQUFBLFVBQ3hCLE1BQUs7QUFBQSxVQUNMLGFBQWEsQ0FBQyxNQUFPLEVBQUUsY0FBYyxNQUFNLFVBQVU7QUFBQSxVQUNyRCxXQUFXLENBQUMsTUFBTyxFQUFFLGNBQWMsTUFBTSxVQUFVO0FBQUEsVUFDbkQsY0FBYyxDQUFDLE1BQU8sRUFBRSxjQUFjLE1BQU0sVUFBVTtBQUFBLFVBQ3JELEdBQUc7QUFBQSxVQUVIO0FBQUE7QUFBQSxNQUNIO0FBQUEsSUFFSjtBQUVBLFdBQ0UsZ0JBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsV0FBVyxhQUFhO0FBQUEsUUFDdkIsR0FBRztBQUFBLFFBRUg7QUFBQTtBQUFBLElBQ0g7QUFBQSxFQUVKO0FBQ0Y7QUFFQSxpQkFBaUIsY0FBYzs7O0FDNUMvQixPQUFPRSxXQUFTLGNBQUFDLG9CQUFrQjtBQWM1QixnQkFBQUMsYUFBQTtBQVZOLElBQU0sWUFBWUMsYUFBVyxDQUFDLEVBQUUsVUFBVSxPQUFPLFNBQVMsV0FBVyxHQUFHLEtBQUssR0FBRyxRQUFRO0FBQ3RGLFFBQU0sWUFBWSxlQUFlLFdBQVc7QUFFNUMsTUFBSSxjQUFjLFlBQVksY0FBYyxPQUFPO0FBQ2pELFVBQU0sWUFBWSxvQkFBVyxRQUFRO0FBQUEsTUFDbkMsRUFBRSxRQUFRLFdBQVcsWUFBWSxRQUFRLFFBQVEsUUFBUSxTQUFTLEdBQUcsV0FBVyxRQUFRLE1BQU0sV0FBVyxTQUFTLFFBQVEsZUFBZSxTQUFTO0FBQUEsTUFDbEosT0FBTyxVQUFVLGFBQWEsTUFBTSxFQUFFLFNBQVMsTUFBTSxDQUFDLElBQUk7QUFBQSxJQUM1RCxDQUFDO0FBRUQsV0FDRSxnQkFBQUQ7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQSxPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxXQUFXLGFBQWE7QUFBQSxRQUN4QixNQUFLO0FBQUEsUUFDSixHQUFHO0FBQUEsUUFFSCxpQkFBTyxhQUFhLGFBQ2pCLFNBQVMsRUFBRSxTQUFTLE1BQU0sQ0FBQyxJQUMzQjtBQUFBO0FBQUEsSUFDTjtBQUFBLEVBRUo7QUFFQSxTQUNFLGdCQUFBQSxNQUFDLGFBQVUsS0FBVSxPQUFjLFNBQWtCLFdBQVcsYUFBYSxJQUFLLEdBQUcsTUFDbEYsVUFDSDtBQUVKLENBQUM7QUFFRCxVQUFVLGNBQWM7QUFDeEIsSUFBTyxvQkFBUTs7O0FDckNmLE9BQU9FLFdBQVMsY0FBQUMsb0JBQWtCO0FBeUIxQixnQkFBQUMsYUFBQTtBQXJCUixJQUFNLGtCQUFrQkM7QUFBQSxFQUN0QixDQUNFLEVBQUUsVUFBVSxPQUFPLFlBQVksUUFBUSxLQUFLLGFBQWEsU0FBUyxHQUFHLEtBQUssR0FDMUUsUUFDRztBQUNILFVBQU0sWUFBWSxlQUFlLGlCQUFpQjtBQUVsRCxVQUFNLGNBQWMsT0FBUSxVQUFVLE9BQU8sT0FBUTtBQUVyRCxRQUFJLGNBQWMsU0FBUyxjQUFjLFFBQVE7QUFDL0MsWUFBTSxZQUFZLG9CQUFXLFFBQVE7QUFBQSxRQUNuQztBQUFBLFVBQ0UsVUFBVTtBQUFBLFVBQ1YsaUJBQWlCLE9BQU8sV0FBVztBQUFBLFVBQ25DLGdCQUFnQixlQUFlLFlBQVksY0FBYztBQUFBLFVBQ3pELG9CQUFvQjtBQUFBLFVBQ3BCLGtCQUFrQjtBQUFBLFFBQ3BCO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUNELGFBQ0UsZ0JBQUFELE1BQUMsU0FBSSxLQUFVLE9BQU8sV0FBWSxHQUFHLE1BQ2xDLFVBQ0g7QUFBQSxJQUVKO0FBR0EsV0FDRSxnQkFBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLFFBQVEsVUFBVSxFQUFFLEtBQUssSUFBSTtBQUFBLFFBQzdCO0FBQUEsUUFDQyxHQUFHO0FBQUEsUUFFSDtBQUFBO0FBQUEsSUFDSDtBQUFBLEVBRUo7QUFDRjtBQUVBLGdCQUFnQixjQUFjOzs7QUMvQzlCLE9BQU9FLFdBQVMsY0FBQUMsb0JBQWtCO0FBR2xDLE9BQU8sY0FBYztBQTBCYixnQkFBQUMsYUFBQTtBQXhCUixJQUFNLFFBQVFDO0FBQUEsRUFDWixDQUNFO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxHQUFHO0FBQUEsRUFDTCxHQUNBLFFBQ0c7QUFDSCxVQUFNLFlBQVksZUFBZSxPQUFPO0FBRXhDLFFBQUksY0FBYyxTQUFTLGNBQWMsUUFBUTtBQUMvQyxVQUFJLENBQUMsUUFBUyxRQUFPO0FBRXJCLFlBQU0sYUFBYTtBQUFBLFFBQ2pCLEdBQUcsb0JBQVcsUUFBUSxLQUFLO0FBQUEsTUFDN0I7QUFHQSxZQUFNLFVBQ0osZ0JBQUFELE1BQUMsU0FBSSxLQUFVLE9BQU8sWUFBYSxHQUFHLE1BQ25DLFVBQ0g7QUFHRixVQUFJLE9BQU8sYUFBYSxhQUFhO0FBQ25DLGVBQU8sU0FBUyxhQUFhLFNBQVMsU0FBUyxJQUFJO0FBQUEsTUFDckQ7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQ0UsZ0JBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNDLEdBQUc7QUFBQSxRQUVIO0FBQUE7QUFBQSxJQUNIO0FBQUEsRUFFSjtBQUNGO0FBRUEsTUFBTSxjQUFjOzs7QUN2RHBCLE9BQU9FLFdBQVMsY0FBQUMsb0JBQWtCO0FBbUI1QixnQkFBQUMsYUFBQTtBQWZOLElBQU0sZUFBZUMsYUFBVyxDQUFDLEVBQUUsVUFBVSxPQUFPLFdBQVcsR0FBRyxLQUFLLEdBQUcsUUFBUTtBQUNoRixRQUFNLFlBQVksZUFBZSxjQUFjO0FBRS9DLE1BQUksY0FBYyxTQUFTLGNBQWMsUUFBUTtBQUMvQyxVQUFNLFlBQVksb0JBQVcsUUFBUTtBQUFBLE1BQ25DO0FBQUEsUUFDRSxZQUFZO0FBQUEsUUFDWixlQUFlO0FBQUEsUUFDZixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsUUFDZCxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFDRCxXQUNFLGdCQUFBRCxNQUFDLFNBQUksS0FBVSxPQUFPLFdBQVcsV0FBVyxhQUFhLElBQUssR0FBRyxNQUM5RCxVQUNIO0FBQUEsRUFFSjtBQUVBLFNBQ0UsZ0JBQUFBLE1BQUMsYUFBVSxLQUFVLE9BQWMsV0FBVyxhQUFhLElBQUssR0FBRyxNQUNoRSxVQUNIO0FBRUosQ0FBQztBQUVELGFBQWEsY0FBYzs7O0FDaEMzQixPQUFPRSxhQUFXOzs7QUNBbEIsT0FBT0MsV0FBUyxjQUFBQyxvQkFBa0I7QUErQnRCLFNBT00sT0FBQUMsT0FQTixRQUFBQyxhQUFBO0FBeEJaLElBQU0sY0FBY0M7QUFBQSxFQUNsQixDQUNFO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsOEJBQThCO0FBQUEsSUFDOUIsR0FBRztBQUFBLEVBQ0wsR0FDQSxRQUNHO0FBQ0gsVUFBTSxZQUFZLGVBQWUsYUFBYTtBQUU5QyxRQUFJLGNBQWMsU0FBUyxjQUFjLFFBQVE7QUFFL0MsWUFBTSxpQkFBaUIsTUFBTTtBQUMzQixnQkFBUSxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxpQkFBaUI7QUFDckQsZ0JBQU0sT0FBTyxRQUFRLFFBQVEsQ0FBQztBQUM5QixnQkFBTSxNQUFNLFFBQVEsT0FBTyxhQUFhLFNBQVM7QUFDakQsaUJBQ0UsZ0JBQUFELE1BQUNFLFFBQU0sVUFBTixFQUNFO0FBQUEsbUNBQXVCLG9CQUFvQixFQUFFLFFBQVEsQ0FBQztBQUFBLFlBQ3RELEtBQUssSUFBSSxDQUFDLE1BQU0sY0FBYztBQUM3QixvQkFBTSxVQUFVLGVBQ1osYUFBYSxNQUFNLFNBQVMsSUFDNUIsS0FBSyxPQUFPLEtBQUssTUFBTSxNQUFNLE1BQU07QUFDdkMscUJBQ0UsZ0JBQUFILE1BQUNHLFFBQU0sVUFBTixFQUNFLHFCQUFXLEVBQUUsTUFBTSxPQUFPLFdBQVcsUUFBUSxDQUFDLEtBRDVCLE9BRXJCO0FBQUEsWUFFSixDQUFDO0FBQUEsZUFYa0IsR0FZckI7QUFBQSxRQUVKLENBQUM7QUFBQSxNQUNIO0FBRUEsYUFDRSxnQkFBQUY7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQTtBQUFBLFVBQ0MsR0FBRztBQUFBLFVBRUg7QUFBQSxvQ0FDRUUsUUFBTSxlQUFlLG1CQUFtQixJQUN2QyxzQkFFQSxnQkFBQUgsTUFBQyx1QkFBb0I7QUFBQSxZQUV4QixlQUFlO0FBQUEsWUFDZix3QkFDRUcsUUFBTSxlQUFlLG1CQUFtQixJQUN2QyxzQkFFQSxnQkFBQUgsTUFBQyx1QkFBb0I7QUFBQTtBQUFBO0FBQUEsTUFFM0I7QUFBQSxJQUVKO0FBR0EsV0FDRSxnQkFBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNDLEdBQUc7QUFBQTtBQUFBLElBQ047QUFBQSxFQUVKO0FBQ0Y7QUFFQSxZQUFZLGNBQWM7OztBQ3pGMUIsT0FBT0ksV0FBUyxjQUFBQyxvQkFBa0I7QUF1QjFCLGdCQUFBQyxhQUFBO0FBbkJSLElBQU0sdUJBQXVCQztBQUFBLEVBQzNCLENBQ0U7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxHQUFHO0FBQUEsRUFDTCxHQUNBLFFBQ0c7QUFDSCxVQUFNLFlBQVksZUFBZSxzQkFBc0I7QUFHdkQsUUFBSSxjQUFjLFNBQVMsY0FBYyxRQUFRO0FBQy9DLGFBQ0UsZ0JBQUFEO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0EsT0FBTyxvQkFBVyxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUM7QUFBQSxVQUM5QyxXQUFXLGFBQWE7QUFBQSxVQUN2QixHQUFHO0FBQUEsVUFFSDtBQUFBO0FBQUEsTUFDSDtBQUFBLElBRUo7QUFFQSxXQUNFLGdCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsV0FBVyxhQUFhO0FBQUEsUUFDdkIsR0FBRztBQUFBLFFBRUg7QUFBQTtBQUFBLElBQ0g7QUFBQSxFQUVKO0FBQ0Y7QUFFQSxxQkFBcUIsY0FBYzs7O0FDbkRuQyxPQUFPRSxXQUFTLGNBQUFDLG9CQUFrQjtBQVk5QixnQkFBQUMsYUFBQTtBQVJKLElBQU0saUJBQWlCQyxhQUFXLENBQUMsRUFBRSxZQUFZLFdBQVcsV0FBVyxHQUFHLEtBQUssR0FBRyxRQUFRO0FBQ3hGLFFBQU0sWUFBWSxlQUFlLGdCQUFnQjtBQUVqRCxNQUFJLGNBQWMsT0FBTztBQUN2QixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQ0UsZ0JBQUFEO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxXQUFXLGFBQWE7QUFBQSxNQUN2QixHQUFHO0FBQUE7QUFBQSxFQUNOO0FBRUosQ0FBQztBQUVELGVBQWUsY0FBYzs7O0FDdEI3QixPQUFPRSxXQUFTLGNBQUFDLG9CQUFrQjtBQXVCMUIsZ0JBQUFDLGFBQUE7QUFuQlIsSUFBTSxxQkFBcUJDO0FBQUEsRUFDekIsQ0FDRTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsR0FBRztBQUFBLEVBQ0wsR0FDQSxRQUNHO0FBQ0gsVUFBTSxZQUFZLGVBQWUsb0JBQW9CO0FBRXJELFFBQUksY0FBYyxZQUFZLGNBQWMsT0FBTztBQUNqRCxZQUFNLFlBQVksb0JBQVcsUUFBUSxDQUFDLEVBQUUsUUFBUSxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBR25FLGFBQ0UsZ0JBQUFEO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0EsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsYUFBYSxDQUFDLE1BQU07QUFDbEIsY0FBRSxjQUFjLE1BQU0sa0JBQWtCO0FBQ3hDLGNBQUUsY0FBYyxNQUFNLFVBQVU7QUFBQSxVQUNsQztBQUFBLFVBQ0EsV0FBVyxDQUFDLE1BQU07QUFDaEIsY0FBRSxjQUFjLE1BQU0sa0JBQ3BCLFVBQVUsbUJBQW1CO0FBQy9CLGNBQUUsY0FBYyxNQUFNLFVBQVU7QUFBQSxVQUNsQztBQUFBLFVBQ0EsY0FBYyxDQUFDLE1BQU07QUFDbkIsY0FBRSxjQUFjLE1BQU0sa0JBQ3BCLFVBQVUsbUJBQW1CO0FBQy9CLGNBQUUsY0FBYyxNQUFNLFVBQVU7QUFBQSxVQUNsQztBQUFBLFVBQ0MsR0FBRztBQUFBLFVBRUg7QUFBQTtBQUFBLE1BQ0g7QUFBQSxJQUVKO0FBRUEsV0FDRSxnQkFBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0MsR0FBRztBQUFBLFFBRUg7QUFBQTtBQUFBLElBQ0g7QUFBQSxFQUVKO0FBQ0Y7QUFFQSxtQkFBbUIsY0FBYzs7O0FDL0RqQyxPQUFPRSxXQUFTLGNBQWMsZ0JBQWdCOzs7QUNBOUMsT0FBT0MsV0FBUyxjQUFBQyxvQkFBa0I7QUFZMUIsZ0JBQUFDLGFBQUE7QUFKUixJQUFNLFNBQVNDLGFBQVcsQ0FBQyxFQUFFLFVBQVUsYUFBYSxTQUFTLFlBQVksSUFBSSxPQUFPLEdBQUcsTUFBTSxHQUFHLFFBQVE7QUFDcEcsUUFBTSxhQUFhLFVBQVUsS0FBSztBQUVsQyxTQUNJLGdCQUFBRCxNQUFDLGdCQUFLLEtBQVUsV0FBVyxZQUFZLE9BQWUsR0FBRyxPQUNwRCxVQUNMO0FBRVIsQ0FBQztBQUVELE9BQU8sY0FBYzs7O0FDbEJyQixPQUFPRSxXQUFTLGNBQUFDLG9CQUFrQjtBQWlCMUIsZ0JBQUFDLGFBQUE7QUFUUixJQUFNLFlBQVlDLGFBQVcsQ0FBQztBQUFBLEVBQzFCO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWjtBQUFBLEVBQ0EsR0FBRztBQUNQLEdBQUcsUUFBUTtBQUNQLFFBQU0sYUFBYSxVQUFVLEtBQUs7QUFFbEMsU0FDSSxnQkFBQUQsTUFBQyxnQkFBSyxLQUFVLFdBQVcsWUFBWSxPQUFlLEdBQUcsT0FDcEQsVUFDTDtBQUVSLENBQUM7QUFFRCxVQUFVLGNBQWM7OztBQ3ZCeEIsT0FBT0UsV0FBUyxjQUFBQyxvQkFBa0I7QUFpQjFCLGdCQUFBQyxhQUFBO0FBVFIsSUFBTSxPQUFPQyxhQUFXLENBQUM7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsWUFBWTtBQUFBLEVBQ1o7QUFBQSxFQUNBLEdBQUc7QUFDUCxHQUFHLFFBQVE7QUFDUCxRQUFNLGFBQWEsVUFBVSxLQUFLO0FBRWxDLFNBQ0ksZ0JBQUFELE1BQUMsZ0JBQUssS0FBVSxXQUFXLFlBQVksT0FBZSxHQUFHLE9BQ3BELFVBQ0w7QUFFUixDQUFDO0FBRUQsS0FBSyxjQUFjOzs7QUN2Qm5CLE9BQU9FLFdBQVMsY0FBQUMsb0JBQWtCO0FBaUIxQixnQkFBQUMsYUFBQTtBQVRSLElBQU0sT0FBT0MsYUFBVyxDQUFDO0FBQUEsRUFDckI7QUFBQSxFQUNBLFlBQVk7QUFBQSxFQUNaO0FBQUEsRUFDQSxHQUFHO0FBQ1AsR0FBRyxRQUFRO0FBQ1AsUUFBTSxhQUFhLFVBQVUsS0FBSztBQUVsQyxTQUNJLGdCQUFBRCxNQUFDLGdCQUFLLEtBQVUsV0FBVyxZQUFZLE9BQWUsR0FBRyxPQUNwRCxVQUNMO0FBRVIsQ0FBQztBQUVELEtBQUssY0FBYzs7O0FDdkJuQixPQUFPRSxXQUFTLGNBQUFDLG9CQUFrQjtBQXFCMUIsZ0JBQUFDLGFBQUE7QUFiUixJQUFNLFFBQVFDLGFBQVcsQ0FBQztBQUFBLEVBQ3RCO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWixVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUEsRUFDUixVQUFVO0FBQUEsRUFDVixZQUFZO0FBQUEsRUFDWjtBQUFBLEVBQ0EsR0FBRztBQUNQLEdBQUcsUUFBUTtBQUNQLFFBQU0sYUFBYSxVQUFVLEtBQUs7QUFFbEMsU0FDSSxnQkFBQUQsTUFBQyxnQkFBSyxLQUFVLFdBQVcsWUFBWSxPQUFlLEdBQUcsT0FDcEQsVUFDTDtBQUVSLENBQUM7QUFFRCxNQUFNLGNBQWM7OztBQzNCcEIsT0FBT0UsV0FBUyxjQUFBQyxvQkFBa0I7QUFpQjFCLGdCQUFBQyxhQUFBO0FBVFIsSUFBTSxPQUFPQyxhQUFXLENBQUM7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsWUFBWTtBQUFBLEVBQ1o7QUFBQSxFQUNBLEdBQUc7QUFDUCxHQUFHLFFBQVE7QUFDUCxRQUFNLGFBQWEsVUFBVSxLQUFLO0FBRWxDLFNBQ0ksZ0JBQUFELE1BQUMsZ0JBQUssS0FBVSxXQUFXLFlBQVksT0FBZSxHQUFHLE9BQ3BELGdCQUNMO0FBRVIsQ0FBQztBQUVELEtBQUssY0FBYzs7O0FDdEJuQixTQUFTLG9CQUFvQjtBQUU3QixJQUFNLFlBQVksSUFBSSxhQUFhO0FBRW5DLElBQUksT0FBTyxXQUFXLGFBQWE7QUFDakMsU0FBTyxpQkFBaUIsVUFBVSxNQUFNO0FBQ3RDLGNBQVUsS0FBSyxVQUFVLEVBQUUsUUFBUSxVQUFVLEdBQUcsUUFBUSxVQUFVLEVBQUUsQ0FBQztBQUFBLEVBQ3ZFLENBQUM7QUFDSDtBQUVBLFNBQVMsWUFBWTtBQUNuQixNQUFJLE9BQU8sV0FBVztBQUNwQixXQUFPLEVBQUUsT0FBTyxHQUFHLFFBQVEsR0FBRyxPQUFPLEdBQUcsV0FBVyxFQUFFO0FBQ3ZELFNBQU87QUFBQSxJQUNMLE9BQU8sT0FBTztBQUFBLElBQ2QsUUFBUSxPQUFPO0FBQUEsSUFDZixPQUFPLE9BQU8sb0JBQW9CO0FBQUEsSUFDbEMsV0FBVztBQUFBLEVBQ2I7QUFDRjtBQUVBLFNBQVMsWUFBWTtBQUNuQixNQUFJLE9BQU8sV0FBVztBQUNwQixXQUFPLEVBQUUsT0FBTyxHQUFHLFFBQVEsR0FBRyxPQUFPLEdBQUcsV0FBVyxFQUFFO0FBQ3ZELFNBQU87QUFBQSxJQUNMLE9BQU8sT0FBTyxPQUFPO0FBQUEsSUFDckIsUUFBUSxPQUFPLE9BQU87QUFBQSxJQUN0QixPQUFPLE9BQU8sb0JBQW9CO0FBQUEsSUFDbEMsV0FBVztBQUFBLEVBQ2I7QUFDRjs7O0FDL0JBLFNBQVMsZ0JBQUFFLHFCQUFvQjtBQUU3QixJQUFNLGVBQWUsSUFBSUEsY0FBYTs7O0FqQzJDOUIsU0FJSSxPQUFBQyxPQUpKLFFBQUFDLGFBQUE7QUExQ08sU0FBUixRQUF5QjtBQUM1QixRQUFNLFdBQVc7QUFBQSxJQUNiO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsSUFDakI7QUFBQSxJQUNBO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsSUFDakI7QUFBQSxJQUNBO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsSUFDakI7QUFBQSxJQUNBO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsSUFDakI7QUFBQSxJQUNBO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsSUFDakI7QUFBQSxJQUNBO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsSUFDakI7QUFBQSxFQUNKO0FBRUEsUUFBTSxZQUFZO0FBQUEsSUFDZCxFQUFFLE1BQU0sU0FBUyxNQUFNLHNCQUFzQjtBQUFBLElBQzdDLEVBQUUsTUFBTSxZQUFZLE1BQU0sYUFBYTtBQUFBLElBQ3ZDLEVBQUUsTUFBTSxpQkFBaUIsTUFBTSxtQkFBbUI7QUFBQSxJQUNsRCxFQUFFLE1BQU0sZ0JBQWdCLE1BQU0sVUFBVTtBQUFBLEVBQzVDO0FBRUEsUUFBTSxnQkFBZ0IsQ0FBQyxFQUFFLE1BQU0sTUFBTSxNQUNqQyxnQkFBQUE7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUVHLFdBQVU7QUFBQSxNQUVWO0FBQUEsd0JBQUFELE1BQUMsZ0JBQUssV0FBVSxpQkFBaUIsZUFBSyxNQUFLO0FBQUEsUUFDM0MsZ0JBQUFBLE1BQUMsZ0JBQUssV0FBVSx3Q0FBd0MsZUFBSyxPQUFNO0FBQUEsUUFDbkUsZ0JBQUFBLE1BQUMsZ0JBQUssV0FBVSxpQkFBaUIsZUFBSyxhQUFZO0FBQUE7QUFBQTtBQUFBLElBTDdDO0FBQUEsRUFNVDtBQUdKLFFBQU0sYUFBYSxDQUFDLEVBQUUsTUFBTSxNQUFNLE1BQzlCLGdCQUFBQyxNQUFDLGdCQUFpQixXQUFVLDZFQUN4QjtBQUFBLG9CQUFBRCxNQUFDLGdCQUFLLFdBQVUsd0NBQXdDLGVBQUssTUFBSztBQUFBLElBQ2xFLGdCQUFBQSxNQUFDLGdCQUFLLFdBQVUseUJBQXlCLGVBQUssTUFBSztBQUFBLE9BRjVDLEtBR1g7QUFHSixTQUNJLGdCQUFBQSxNQUFDLHVCQUFXLFdBQVUsVUFDbEIsMEJBQUFDLE1BQUMsZ0JBQUssV0FBVSxnQ0FFWjtBQUFBLG9CQUFBQSxNQUFDLGdCQUFLLFdBQVUscUJBQ1o7QUFBQSxzQkFBQUQsTUFBQyxnQkFBSyxXQUFVLHFCQUNaLDBCQUFBQSxNQUFDLGdCQUFLLFdBQVUsNkhBQ1osMEJBQUFBLE1BQUMsU0FBSSxXQUFVLHdCQUF1QixNQUFLLFFBQU8sU0FBUSxhQUFZLFFBQU8sZ0JBQ3pFLDBCQUFBQSxNQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsYUFBYSxHQUFHLEdBQUUsZ0pBQStJLEdBQ3hOLEdBQ0osR0FDSjtBQUFBLE1BQ0EsZ0JBQUFBLE1BQUMsZ0JBQUssV0FBVSxxSEFBb0gsc0JBRXBJO0FBQUEsTUFDQSxnQkFBQUEsTUFBQyxnQkFBSyxXQUFVLDJDQUEwQyxzRkFFMUQ7QUFBQSxPQUNKO0FBQUEsSUFHQSxnQkFBQUEsTUFBQyxnQkFBSyxXQUFVLGtEQUNaLDBCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0csTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osY0FBYyxDQUFDLE1BQU0sVUFBVSxNQUFNLFNBQVM7QUFBQSxRQUM5QyxZQUFZO0FBQUEsUUFDWix1QkFBdUIsRUFBRSxLQUFLLEdBQUc7QUFBQTtBQUFBLElBQ3JDLEdBQ0o7QUFBQSxJQUdBLGdCQUFBQyxNQUFDLGdCQUFLLFdBQVUsNENBQ1o7QUFBQSxzQkFBQUQsTUFBQyxnQkFBSyxXQUFVLHFIQUFvSCx3QkFFcEk7QUFBQSxNQUNBLGdCQUFBQSxNQUFDLGdCQUFLLFdBQVUsNkJBQ1osMEJBQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDRyxNQUFNO0FBQUEsVUFDTixZQUFZO0FBQUEsVUFDWixjQUFjLENBQUMsTUFBTSxVQUFVLE1BQU0sU0FBUztBQUFBLFVBQzlDLFlBQVk7QUFBQSxVQUNaLHVCQUF1QixFQUFFLEtBQUssR0FBRztBQUFBO0FBQUEsTUFDckMsR0FDSjtBQUFBLE9BQ0o7QUFBQSxJQUdBLGdCQUFBQSxNQUFDLGdCQUFLLFdBQVUsZUFDWiwwQkFBQUMsTUFBQyxnQkFBSyxXQUFVLCtFQUNaO0FBQUEsc0JBQUFELE1BQUMsZ0JBQUssV0FBVSxrREFBaUQscUNBRWpFO0FBQUEsTUFDQSxnQkFBQUEsTUFBQyxnQkFBSyxXQUFVLDJDQUEwQyx5REFFMUQ7QUFBQSxNQUNBLGdCQUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0csU0FBUyxNQUFNLE9BQU8sU0FBUyxPQUFPO0FBQUEsVUFDdEMsV0FBVTtBQUFBLFVBRVYsMEJBQUFBLE1BQUMsZ0JBQUssV0FBVSw2QkFBNEIseUJBQVc7QUFBQTtBQUFBLE1BQzNEO0FBQUEsT0FDSixHQUNKO0FBQUEsS0FDSixHQUNKO0FBRVI7IiwKICAibmFtZXMiOiBbIlJlYWN0IiwgIlJlYWN0IiwgInBsYXRmb3JtIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAianN4cyIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIkV2ZW50RW1pdHRlciIsICJqc3giLCAianN4cyJdCn0K
